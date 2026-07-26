import Image from "next/image"
import { Compass, GraduationCap, FileText, HeartHandshake, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Compass,
    title: "Academic Counselling",
    desc: "One-to-one guidance to choose the right subjects, pathways, and career direction.",
  },
  {
    icon: GraduationCap,
    title: "Course & University Selection",
    desc: "Expert guidance in selecting the perfect course, university, and campus that aligns with your goals.",
  },
  {
    icon: FileText,
    title: "Study Planning",
    desc: "Structured support to organize your studies and create a roadmap for academic success.",
  },
  {
    icon: HeartHandshake,
    title: "Pastoral Support",
    desc: "Ongoing encouragement and study planning to keep students motivated and on track.",
  },
]

const features = [
  {
    eyebrow: "Personal guidance",
    title: "A plan shaped around each student",
    desc: "I take the time to understand each student's strengths, interests, and goals, then map out a clear academic pathway — from subject choices to long-term career options — so they always know their next step.",
    image: "/services-strategy.png",
    alt: "Academic coordinator advising a student at a desk",
    reverse: false,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            How I help
          </span>
          <h2 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Support at every stage of the journey
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            From choosing subjects to securing a university place, I&apos;m here
            to guide students every step of the way.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 space-y-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <div className={feature.reverse ? "lg:order-2" : ""}>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {feature.eyebrow}
                </span>
                <h3 className="mt-3 text-balance font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Let&apos;s talk about it
                  <ArrowRight className="size-4" />
                </a>
              </div>

              <div
                className={`relative ${feature.reverse ? "lg:order-1" : ""}`}
              >
                <div
                  className={`blob-1 absolute -z-10 size-80 bg-primary/15 blur-2xl ${
                    feature.reverse ? "-left-8 top-6" : "-right-8 top-6"
                  }`}
                />
                <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.alt}
                    width={640}
                    height={480}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
