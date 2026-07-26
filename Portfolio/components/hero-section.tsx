import Image from "next/image"
import Link from "next/link"
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main%20cover%20pic%20of%20my%20website-edUXqYXQapPEt1sE14GNnRrLpND5B1.webp"
          alt="Students celebrating graduation at Brit Academy London"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        {/* Layered overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          <span
            className="animate-hero-rise mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
            style={{ animationDelay: "0ms" }}
          >
            <Sparkles className="size-4 text-amber-300" />
            Academic Coordinator · Brit Academy London
          </span>

          <h1
            className="animate-hero-rise max-w-4xl text-balance font-heading text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            Study decisions made with{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              clarity and confidence
            </span>
            .
          </h1>

          <p
            className="animate-hero-rise mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/85 sm:text-xl"
            style={{ animationDelay: "220ms" }}
          >
            Hi, I&apos;m <span className="font-semibold text-white">Masum Ahmod</span>. I help students plan their
            studies, choose the right pathways, and select the{" "}
            <span className="font-semibold text-amber-200">perfect course and university</span> — so every next step
            feels certain.
          </p>

          <div
            className="animate-hero-rise mt-9 flex flex-col items-center gap-3 sm:flex-row"
            style={{ animationDelay: "340ms" }}
          >
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 rounded-full bg-amber-400 px-7 text-base font-semibold text-black transition-colors hover:bg-amber-300"
              render={<Link href="/consultation" />}
            >
              <GraduationCap className="size-5" />
              Book a consultation
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-12 rounded-full border-white/30 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
              render={<a href="#services" />}
            >
              How I can help
            </Button>
          </div>

          <div
            className="animate-hero-rise mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70"
            style={{ animationDelay: "460ms" }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-300" />
              Personalised guidance
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-300" />
              Course &amp; university selection
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-300" />
              Trusted by students &amp; parents
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
