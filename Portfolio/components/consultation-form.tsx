"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const QUALIFICATIONS = [
  "O Level / SSC",
  "A Level / HSC",
  "Diploma",
  "University Dropout",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
] as const

type Status = "idle" | "submitting" | "success" | "error"

const initialForm = {
  fullName: "",
  contactNumber: "",
  email: "",
  qualification: "",
  message: "",
}

export function ConsultationForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function update(field: keyof typeof initialForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "submitting") return

    setStatus("submitting")
    setErrorMessage("")

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (res.ok && data?.ok) {
        setStatus("success")
        setForm(initialForm)
      } else {
        setStatus("error")
        setErrorMessage(data?.error || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-card p-10 text-center shadow-xl shadow-primary/5">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-9" />
        </span>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Request received</h2>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          Thank you for reaching out. I&apos;ve received your consultation request and will get back to you shortly to
          arrange a time. A confirmation has been sent to your email.
        </p>
        <Button className="mt-2 rounded-full px-6" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8"
      noValidate
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name <span className="text-primary">*</span>
          </label>
          <Input
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Your full name"
            className="h-11 rounded-xl"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contactNumber" className="text-sm font-medium text-foreground">
              Contact Number <span className="text-primary">*</span>
            </label>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              required
              autoComplete="tel"
              placeholder="e.g. +880 1XXX XXXXXX"
              className="h-11 rounded-xl"
              value={form.contactNumber}
              onChange={(e) => update("contactNumber", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address <span className="text-primary">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="h-11 rounded-xl"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="qualification" className="text-sm font-medium text-foreground">
            Last Academic Qualification <span className="text-primary">*</span>
          </label>
          <Select value={form.qualification} onValueChange={(value) => update("qualification", (value as string) ?? "")}>
            <SelectTrigger id="qualification" className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Select your qualification" />
            </SelectTrigger>
            <SelectContent>
              {QUALIFICATIONS.map((q) => (
                <SelectItem key={q} value={q}>
                  {q}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            What would you like to discuss?
          </label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell me a little about your goals, questions, or what you'd like guidance on..."
            className="rounded-xl"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>

        {status === "error" && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="mt-1 h-12 rounded-full text-base font-semibold"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Book my consultation
            </>
          )}
        </Button>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          Your details are only used to arrange your consultation and are never shared.
        </p>
      </div>
    </form>
  )
}
