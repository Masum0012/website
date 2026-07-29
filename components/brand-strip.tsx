'use client'

import { memo } from 'react'
import Image from 'next/image'

const brands = [
  {
    name: "OTHM",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/othm-Nx9HvMN45ALFgxNmetYwMSTP1IWU1W.png",
    alt: "OTHM Qualifications Logo"
  },
  {
    name: "Qualifi",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Qualifi-bt52X4AKDO2IQMoFrEAoZCzW75cuoT.png",
    alt: "Qualifi Logo"
  },
  {
    name: "NCC Education",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NCC-xxuY6H2aXJObkJFjUyPfh6sGHqZSHI.png",
    alt: "NCC Education Logo"
  },
  {
    name: "Brit Academy London",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brit%20Academy%20London%20logo-rBuQgE9oL9y1cgwwk6VUARnbiNtvcO.png",
    alt: "Brit Academy London Logo"
  },
]

function BrandStripComponent() {
  return (
    <section className="border-y border-border bg-muted/40 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mx-auto mb-8 max-w-2xl text-balance text-center text-sm font-medium uppercase tracking-wider text-muted-foreground transition-all duration-500 hover:grayscale hover:saturate-50">
          Guided Students to Successfully Complete Their Studies Through
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="relative flex h-16 w-32 items-center justify-center opacity-100 saturate-100 grayscale-0 transition-all duration-500 hover:opacity-90 hover:grayscale hover:saturate-50"
            >
              <Image
                src={brand.logo}
                alt={brand.alt}
                fill
                loading="lazy"
                className="object-contain"
                sizes="(max-width: 640px) 100px, 150px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const BrandStrip = memo(BrandStripComponent)
