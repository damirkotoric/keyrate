"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import TestimonialCard from "@features/testimonials/components/testimonial-card"
import { Marquee } from "@/components/ui/marquee"

type Testimonial = {
  testimonial: string
  author: string
  role: string
}

export interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function TestimonialsSection({
  title = "Don't just take our word for it.",
  subtitle = "Here's what our satisfied clients have to say about their KeyRate experience.",
  className,
}: TestimonialsSectionProps) {
  const [rows, setRows] = useState<Testimonial[][]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" })
        if (!mounted) return
        if (!res.ok) {
          let detail = ""
          try {
            const errJson = await res.json()
            detail = ` message=${errJson?.message || ''} hasToken=${String(errJson?.hasToken)} url=${errJson?.url || ''}`
          } catch {}
          throw new Error(`Failed to fetch testimonials: ${res.status}.${detail}`)
        }
        const json: { items: Testimonial[] } = await res.json()
        const items = json.items
        const midpoint = Math.ceil(items.length / 2)
        setRows([items.slice(0, midpoint), items.slice(midpoint)])
        setError(null)
      } catch (e: any) {
        setRows([])
        setError(e?.message || "Unknown error")
      } finally {
        setLoaded(true)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const count = rows.flat().length
  if (!loaded && process.env.NODE_ENV === 'production') return null
  if (count === 0 && process.env.NODE_ENV === 'production') return null
  return (
    <section className={cn("py-16 bg-background overflow-hidden", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{subtitle}</p>
        </div>
        {(count === 0 || error) && (
          <Alert className="mb-6" data-loaded={String(loaded)} data-error={error || ""} data-count={count}>
            <AlertTitle>Diagnostics: Testimonials</AlertTitle>
            <AlertDescription>
              {loaded ? (count === 0 ? "Loaded but 0 items from /api/testimonials" : `Loaded ${count} items`) : "Loading..."}
              {error ? ` Error: ${error}` : ""}
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-6">
          {rows.map((row, idx) => (
            <Marquee key={idx} reverse={idx === 1} className="[--duration:250s]">
              <div className="flex gap-4">
                {row.map((t, i) => (
                  <TestimonialCard key={`${idx}-${i}`} testimonial={t.testimonial} author={t.author} role={t.role} />
                ))}
              </div>
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  )
}


