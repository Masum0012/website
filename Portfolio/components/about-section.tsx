import { Check } from "lucide-react"
import Image from "next/image"

const highlights = [
  "Academic Coordinator at Brit Academy London",
  "One-to-one counselling on course choice and academic pathways",
  "Expert guidance on course and university selection",
  "Pastoral support to keep students motivated and on track",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              About me
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Every student deserves a clear path forward.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                {
                  "I'm passionate about helping young people navigate the choices that shape their future. At Brit Academy London, I coordinate academic programmes and work closely with students at every step of their journey."
                }
              </p>
              <p>
                {
                  "Beyond timetables and coursework, I counsel students on their academic careers — from picking the right subjects to selecting the perfect university and campus. My goal is simple: help each student make confident, informed decisions about what comes next."
                }
              </p>
            </div>

            <ul className="mt-8 grid gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-4" />
                  </span>
                  <span className="leading-relaxed text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="blob-2 absolute -right-6 -top-8 -z-10 size-64 bg-primary/10 blur-2xl" />
            <div className="space-y-6">
              {/* Profile Image */}
              <div className="group relative overflow-hidden rounded-3xl border border-border shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masum%20profile%20pic.jfif-41rGmHsUH5m4akXfr28ICkqAKjV7dn.jpeg"
                  alt="Masum Ahmod, Academic Coordinator"
                  width={400}
                  height={500}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={80}
                />
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
                  <p className="font-heading text-2xl font-bold">1,500+</p>
                  <p className="mt-1 text-xs leading-relaxed text-primary-foreground/90">
                    Students supported
                  </p>
                </div>
                <div className="rounded-2xl bg-secondary p-4">
                  <p className="font-heading text-2xl font-bold text-foreground">
                    95%
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Success rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
