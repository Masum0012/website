import type { Metadata } from "next"
import { CalendarCheck, Compass, GraduationCap, MessageCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ConsultationForm } from "@/components/consultation-form"

export const metadata: Metadata = {
  title: "Book a Consultation — Masum Ahmod",
  description:
    "Book a one-to-one consultation with Masum Ahmod, Academic Coordinator at Brit Academy London. Get clear, personalised guidance on your studies, course, and university choices.",
}

const highlights = [
  {
    icon: Compass,
    title: "Clear direction",
    description: "Understand your best study pathways and next steps.",
  },
  {
    icon: GraduationCap,
    title: "Right course & university",
    description: "Find the course and institution that truly fit your goals.",
  },
  {
    icon: MessageCircle,
    title: "One-to-one guidance",
    description: "A personal conversation focused entirely on you.",
  },
]

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Intro */}
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <CalendarCheck className="size-4" />
                Book a consultation
              </span>
              <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                Let&apos;s plan your <span className="text-primary">academic journey</span> together
              </h1>
              <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                Share a few details and I&apos;ll get back to you to arrange a personal consultation. Whether you&apos;re a
                student or a parent, we&apos;ll work through your options with clarity and confidence.
              </p>

              <ul className="mt-10 flex flex-col gap-6">
                {highlights.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <item.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="lg:pt-4">
              <ConsultationForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
