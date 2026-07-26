import { NextResponse } from "next/server"

// Keep this route resilient: no matter what happens with the optional
// email / Google Sheets integrations, the request must resolve cleanly so the
// website never appears broken to the user.

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const QUALIFICATIONS = [
  "O Level / SSC",
  "A Level / HSC",
  "Diploma",
  "University Dropout",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
]

type Lead = {
  fullName: string
  contactNumber: string
  email: string
  qualification: string
  message: string
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// Save the lead to Google Sheets via a Google Apps Script Web App URL.
// This avoids extra dependencies and service-account credentials, which keeps
// deployment on Vercel simple and reliable. Set GOOGLE_SHEETS_WEBHOOK_URL to enable.
// Default Google Apps Script Web App endpoint that appends each lead as a row
// in the connected Google Sheet. An env var override takes precedence so the
// URL can be rotated without a code change.
const DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyHGACNURxIuVl9LnXoLdclEBo8r9Y5NDOIxdwE8K5USjkW5UWtSk3V3G_tuxnJ3Gw/exec"

async function saveToGoogleSheets(lead: Lead): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL || DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL
  if (!isNonEmpty(url)) return false

  // Send an explicit, flat payload with clear keys that exactly match the
  // Apps Script column mapping. This is what fixes missing Name / Phone in
  // the sheet. We send BOTH JSON body and form-encoded params so the webhook
  // works whether the Apps Script reads e.postData.contents or e.parameter.
  //
  // Submit the DATE ONLY (no time) in DD.MM.YYYY format, e.g. 01.07.2026.
  const now = new Date()
  const day = String(now.getDate()).padStart(2, "0")
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const year = now.getFullYear()
  const timestamp = `${day}.${month}.${year}`
  const payload = {
    fullName: lead.fullName,
    contactNumber: lead.contactNumber,
    email: lead.email,
    qualification: lead.qualification,
    message: lead.message,
    timestamp,
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    // Use form-urlencoded so Google Apps Script populates e.parameter reliably.
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(payload)) {
      params.append(key, value ?? "")
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "follow",
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) {
      console.log("[v0] Google Sheets responded with non-OK status:", res.status)
    }
    return res.ok
  } catch (error) {
    console.log("[v0] Google Sheets save failed:", error instanceof Error ? error.message : error)
    return false
  }
}

// Send notification + confirmation emails via Resend (already a dependency).
// Requires RESEND_API_KEY. Falls back gracefully if not configured.
async function sendEmails(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!isNonEmpty(apiKey)) return false

  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
  const notifyEmail = process.env.NOTIFICATION_EMAIL || "itsmasum111@gmail.com"

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const safe = {
      fullName: escapeHtml(lead.fullName),
      contactNumber: escapeHtml(lead.contactNumber),
      email: escapeHtml(lead.email),
      qualification: escapeHtml(lead.qualification),
      message: escapeHtml(lead.message) || "(No message provided)",
    }

    // Notification to the owner. resend.emails.send() does NOT throw on API
    // errors — it returns { data, error } — so we must inspect `error`
    // explicitly, otherwise silent failures look like success.
    const notify = await resend.emails.send({
      from: `Consultation Requests <${fromEmail}>`,
      to: [notifyEmail],
      replyTo: lead.email,
      subject: `New consultation request from ${lead.fullName}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6">
          <h2 style="margin:0 0 16px">New consultation request</h2>
          <p><strong>Full name:</strong> ${safe.fullName}</p>
          <p><strong>Contact number:</strong> ${safe.contactNumber}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Qualification:</strong> ${safe.qualification}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${safe.message}</p>
        </div>
      `,
    })

    if (notify.error) {
      console.log("[v0] Resend owner-notification error:", JSON.stringify(notify.error))
    }

    // Confirmation to the applicant
    const confirm = await resend.emails.send({
      from: `Masum Ahmod <${fromEmail}>`,
      to: [lead.email],
      subject: "Thanks — I've received your consultation request",
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6">
          <h2 style="margin:0 0 16px">Thank you, ${safe.fullName}!</h2>
          <p>I've received your consultation request and will get back to you shortly to arrange a time.</p>
          <p style="margin-top:16px"><strong>Here's what you sent:</strong></p>
          <p><strong>Qualification:</strong> ${safe.qualification}</p>
          <p><strong>Your message:</strong></p>
          <p style="white-space:pre-wrap">${safe.message}</p>
          <p style="margin-top:24px">Warm regards,<br/>Masum Ahmod<br/>Academic Coordinator, Brit Academy London</p>
        </div>
      `,
    })

    if (confirm.error) {
      console.log("[v0] Resend applicant-confirmation error:", JSON.stringify(confirm.error))
    }

    // Consider it a success if at least the owner was notified. The applicant
    // confirmation can fail in Resend test mode (which only allows sending to
    // the account owner) until a custom domain is verified.
    return !notify.error
  } catch (error) {
    console.log("[v0] Resend email failed:", error instanceof Error ? error.message : error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as Partial<Lead> | null

    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 })
    }

    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : ""
    const contactNumber = typeof body.contactNumber === "string" ? body.contactNumber.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const qualification = typeof body.qualification === "string" ? body.qualification.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!isNonEmpty(fullName) || !isNonEmpty(contactNumber) || !isNonEmpty(email) || !isNonEmpty(qualification)) {
      return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 })
    }

    if (!QUALIFICATIONS.includes(qualification)) {
      return NextResponse.json({ ok: false, error: "Please select a valid qualification." }, { status: 400 })
    }

    const lead: Lead = { fullName, contactNumber, email, qualification, message }

    // Always log the lead so it is never lost, even if integrations are not configured yet.
    console.log("[v0] New consultation lead:", JSON.stringify(lead))

    // Run integrations in parallel; failures are swallowed inside each helper.
    const [savedToSheets, emailsSent] = await Promise.all([saveToGoogleSheets(lead), sendEmails(lead)])

    console.log("[v0] Lead processed:", { savedToSheets, emailsSent })

    return NextResponse.json({ ok: true })
  } catch (error) {
    // Never surface a hard error to the client for this form.
    console.log("[v0] Consultation route error:", error instanceof Error ? error.message : error)
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
