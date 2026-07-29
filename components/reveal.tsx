"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  /** Delay in ms before the reveal transition starts once in view. */
  delay?: number
  /** Optional wrapper className. */
  className?: string
  /** Render as a different element (defaults to div). */
  as?: "div" | "li" | "section"
}

/**
 * Lightweight scroll-reveal wrapper.
 *
 * - Uses a single IntersectionObserver per instance and disconnects after the
 *   first reveal, so there is zero ongoing scroll/observer cost.
 * - Animates only `opacity` and `transform` (GPU-friendly, no layout thrash).
 * - Fully respects `prefers-reduced-motion`: the content is shown immediately
 *   with no transform, so accessibility and stability are preserved.
 * - Content is always in the DOM (never conditionally unmounted), so text is
 *   crawlable and the page can never end up blank if JS is slow.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect reduced-motion: reveal instantly, skip the observer entirely.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]",
        visible
          ? "opacity-100 translate-y-0"
          : "motion-safe:opacity-0 motion-safe:translate-y-6",
        className,
      )}
      style={visible && delay ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
