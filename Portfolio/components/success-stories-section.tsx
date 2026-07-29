'use client'

import { memo } from 'react'
import Image from 'next/image'
import { Award } from 'lucide-react'

const successStories = [
  {
    name: "Mehrab Tashlim",
    achievement: "Successfully completed BRIT Academy London qualification",
    institution: "BRIT Academy London",
    image: "/success-stories/mehrab-tashlim.jpeg",
    alt: "Mehrab Tashlim receiving achievement certificate"
  },
  {
    name: "Rafayat Tahmin Rahi",
    achievement: "Earned BRIT Academy London certification with distinction",
    institution: "BRIT Academy London",
    image: "/success-stories/rafayat-tahmin-rahi.jpeg",
    alt: "Rafayat Tahmin Rahi with achievement award"
  },
  {
    name: "Jubayer Ahmed Rakib",
    achievement: "Completed BRIT Academy London university pathway program",
    institution: "BRIT Academy London",
    image: "/success-stories/jubayer-ahmed-rakib.jpeg",
    alt: "Jubayer Ahmed Rakib receiving certification"
  },
  {
    name: "MD Redwan Husen Jihad",
    achievement: "Achieved BRIT Academy London university admission certificate",
    institution: "BRIT Academy London",
    image: "/success-stories/md-redwan-husen-jihad.jpeg",
    alt: "MD Redwan Husen Jihad with certification"
  },
]

function SuccessStoriesComponent() {
  return (
    <section id="success-stories" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Success Stories
          </span>
          <h2 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Students Achieving Their Goals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Meet students who have successfully completed their qualifications and advanced their academic careers through our guidance and support.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {successStories.map((story) => (
            <div
              key={story.name}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex items-start gap-2">
                  <Award className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {story.name}
                  </h3>
                </div>

                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  {story.achievement}
                </p>

                <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {story.institution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const SuccessStoriesSection = memo(SuccessStoriesComponent)
