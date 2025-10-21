"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, TrendingUp, DollarSign, FileText, ArrowRight, Home, Users, PiggyBank, MapPin, Shield } from "@/components/icons"
import Header from "@features/marketing/components/layout/header"
import Footer from "@features/marketing/components/layout/footer"
import SolutionCard from "@features/solutions/components/solution-card"
import { Highlighter } from "@/components/ui/highlighter"
import { GetInTouchSection } from "@features/marketing/components/sections/get-in-touch-section"
import type { AppLocale } from "@/lib/locale"

interface SolutionsPageClientProps {
  locale: AppLocale
  pageData?: {
    hero: {
      title: string
      subtitle: string
    }
  } | null
}

interface Solution {
  slug: string
  icon: string
  title: string
  description: string
  features: string[]
  regions: string[]
  buttonText: string
}

export default function SolutionsPageClient({ locale, pageData }: SolutionsPageClientProps) {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSolutions() {
      try {
        const response = await fetch(`/api/solutions${locale !== 'global' ? `?locale=${locale}` : ''}`)
        if (response.ok) {
          const data = await response.json()
          setSolutions(data.solutions || [])
        }
      } catch (error) {
        console.error("Failed to fetch solutions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSolutions()
  }, [locale])

  // Sort solutions
  const sortedSolutions = [...solutions].sort((a, b) => {
    if (locale === 'global') {
      // Global locale: global solutions first, then by region, then alphabetically
      const isGlobal = (sol: any) => 
        sol.regions.length === 3 && 
        sol.regions.includes('Canada') && 
        sol.regions.includes('UAE') && 
        sol.regions.includes('USA')
      
      const aIsGlobal = isGlobal(a)
      const bIsGlobal = isGlobal(b)
      
      // Global solutions come first
      if (aIsGlobal && !bIsGlobal) return -1
      if (!aIsGlobal && bIsGlobal) return 1
      
      // Both global or both regional - sort by primary region alphabetically
      if (!aIsGlobal && !bIsGlobal) {
        const aRegion = [...a.regions].sort()[0]
        const bRegion = [...b.regions].sort()[0]
        const regionCompare = aRegion.localeCompare(bRegion)
        if (regionCompare !== 0) return regionCompare
      }
      
      // Within same category, sort by title alphabetically
      return a.title.localeCompare(b.title)
    } else {
      // Country-specific locale: sort alphabetically by title only
      return a.title.localeCompare(b.title)
    }
  })
  
  const allSolutions = sortedSolutions
  
  // Filter solutions based on locale
  const localeMap: Record<AppLocale, string> = {
    'ca': 'Canada',
    'ae': 'UAE',
    'us': 'USA',
    'global': ''
  }

  const filteredSolutions = locale === 'global' 
    ? allSolutions 
    : allSolutions.filter(solution => {
        return solution.regions.includes(localeMap[locale])
      })

  const countryName = localeMap[locale]
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading solutions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageData?.hero?.title || "Find the Right Mortgage Solution for Your Next Move"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {pageData?.hero?.subtitle || "KeyRate helps you secure the right mortgage—whether you're buying, investing, or leveraging equity at home or abroad. We serve clients in Canada, the U.S., and the UAE, working with top global lenders for better rates and faster approvals."}
            </p>
            <div className="flex justify-center mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aqZEge5SGX2nqEeSe8gLioLh0AvIWc.png"
                alt="KeyRate Awards - Top Brokerage 2019, 2021, CMP Hot List 2020, 2021, Global 100 Initiative"
                className="max-w-md h-auto mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Solutions Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 border-t border-border pt-8">
            <p className="text-lg text-muted-foreground">
              <Highlighter isView={true} delayMs={300}>
                {filteredSolutions.length} solution{filteredSolutions.length !== 1 ? 's' : ''} available{locale !== 'global' ? ` in ${countryName}` : ' across all markets'}
              </Highlighter>
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((solution: any, index) => {
              // Construct href based on locale
              const href = solution.slug 
                ? (locale === 'global' ? `/solutions/${solution.slug}` : `/${locale}/solutions/${solution.slug}`)
                : solution.href // fallback for hardcoded solutions
              
              return (
                <SolutionCard
                  key={solution.slug || index}
                  icon={solution.icon}
                  title={solution.title}
                  description={solution.description}
                  features={solution.features}
                  buttonText={solution.buttonText}
                  href={href}
                  regions={solution.regions}
                  locale={locale}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
            <Card className="p-8 bg-card border-border shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-primary" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl text-foreground mb-6 leading-relaxed italic">
                  "KeyRate made our international property purchase seamless. As Canadian residents buying in Dubai, we
                  thought the process would be complicated, but their team handled everything from pre-approval to
                  closing. The rates they secured were better than what local banks offered, and their knowledge of
                  cross-border financing was invaluable."
                </blockquote>
                <div className="border-t border-border pt-6">
                  <p className="font-semibold">Sarah & Michael Chen</p>
                  <p className="text-sm text-muted-foreground">International Property Investors</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <GetInTouchSection />

      <Footer />
    </div>
  )
}

