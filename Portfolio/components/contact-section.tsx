"use client"

import Link from "next/link"
import { Mail, Phone, CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const EMAIL = "itsmasum111@gmail.com"
const PHONE_DISPLAY = "+880 1647 067173"
const PHONE_HREF = "tel:+8801647067173"
const MAILTO_HREF = `mailto:${EMAIL}`

// mailto:/tel: navigations are blocked inside sandboxed preview iframes, which
// surfaces the "This content is blocked" message. Opening from the top-level
// window (or a new tab when embedded) makes these links work everywhere.
function openExternal(href: string) {
  if (typeof window === "undefined") return
  try {
    if (window.self !== window.top) {
      window.open(href, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = href
    }
  } catch {
    window.open(href, "_blank", "noopener,noreferrer")
  }
}

export function ContactSection() {
  return (
    <section id="contact" className="pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-8 text-center shadow-xl shadow-primary/5 sm:p-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Get in touch
          </span>
          <h2 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Ready to plan your next step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Whether you&apos;re a student or a parent, I&apos;m happy to talk
            through your options. Reach out and I&apos;ll get back to you to
            arrange a consultation.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              className="rounded-full px-7 text-base"
              render={<Link href="/consultation" />}
            >
              <CalendarCheck className="size-4" />
              Book a consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 text-base"
              aria-label="Email Masum Ahmod"
              onClick={() => openExternal(MAILTO_HREF)}
            >
              <Mail className="size-4" />
              Email me
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 text-base"
              aria-label="Call Masum Ahmod"
              onClick={() => openExternal(PHONE_HREF)}
            >
              <Phone className="size-4" />
              Call me
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => openExternal(MAILTO_HREF)}
              aria-label={`Send an email to ${EMAIL}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail className="size-3.5" /> {EMAIL}
            </button>
            <button
              type="button"
              onClick={() => openExternal(PHONE_HREF)}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Phone className="size-3.5" /> {PHONE_DISPLAY}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
