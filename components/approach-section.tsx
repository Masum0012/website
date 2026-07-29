const steps = [
  {
    number: "01",
    title: "Get to know you",
    desc: "We talk through your interests, strengths, and the goals you're working toward.",
  },
  {
    number: "02",
    title: "Build a plan",
    desc: "Together we map out subjects, pathways, and the milestones that matter.",
  },
  {
    number: "03",
    title: "Apply with confidence",
    desc: "I guide you through applications, personal statements, and every deadline.",
  },
  {
    number: "04",
    title: "Stay supported",
    desc: "Regular check-ins keep you motivated and on track from start to finish.",
  },
]

export function ApproachSection() {
  return (
    <section id="approach" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-primary-foreground sm:px-12">
          <div className="blob-1 absolute -right-16 -top-16 size-72 bg-primary-foreground/10" />
          <div className="blob-2 absolute -bottom-20 -left-16 size-72 bg-primary-foreground/10" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              How we&apos;ll work together
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              A clear, supportive process
            </h2>
          </div>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl bg-primary-foreground/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary-foreground/20"
              >
                <p className="font-heading text-3xl font-bold text-primary-foreground/60">
                  {step.number}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
