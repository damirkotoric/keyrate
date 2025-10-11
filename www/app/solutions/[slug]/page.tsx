"use client"

import { useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { normalizeLocaleParam, type AppLocale } from "@/lib/locale"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreApprovalForm } from "@/components/pre-approval-form"
import { FAQList } from "@/components/faq-list"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as PhosphorIcons from "phosphor-react"
import { CaretRight } from "@/components/icons"

// Helper function to dynamically get icon component
const getIconComponent = (iconName: string) => {
  // Default to FileText if icon name is not provided
  if (!iconName) return PhosphorIcons.FileText
  
  // Try to find the icon in PhosphorIcons
  const IconComponent = (PhosphorIcons as any)[iconName]
  
  // Fallback to FileText if icon not found
  return IconComponent || PhosphorIcons.FileText
}

// Helper function to get flag code from region name
const getFlagCode = (region: string) => {
  if (region === "Canada") return "ca"
  if (region === "UAE") return "ae"
  if (region === "USA") return "us"
  return null
}

interface SolutionData {
  slug: string
  regions: string[]
  hero: {
    title: string
    subtitle: string
  }
  formSection: {
    form: string
    title: string
    description: string
    benefitsTitle?: string
    benefits: Array<{ text: string }>
  }
  howItWorks: {
    steps: Array<{ title: string }>
  }
  expertTips?: {
    tips: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  faq?: {
    items: Array<{
      question: string
      answer: string
    }>
  }
}

// Form component mapping
const FormComponents: Record<string, any> = {
  preapproval: PreApprovalForm,
  renewal: RenewalCheckForm,
  none: null,
}

function RenewalCheckForm() {
  return (
    <Card className="p-6 bg-card border-border shadow-xl">
      <CardContent className="p-0">
        <h3 className="text-xl font-semibold text-card-foreground mb-4">Quick Renewal Check</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Mortgage Balance</label>
            <Input placeholder="$500,000" className="h-12" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Renewal Date</label>
            <Input type="date" className="h-12" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Current Lender</label>
            <Input placeholder="Your current bank" className="h-12" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input placeholder="your@email.com" className="h-12" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input placeholder="+1 (555) 123-4567" className="h-12" />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">
            See My Renewal Options
          </Button>
          <p className="text-xs text-muted-foreground text-center">Compare offers — no cost, no obligations.</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SolutionPage() {
  const params = useParams()
  const pathname = usePathname()
  const slug = params.slug as string
  
  // Detect if we're on a locale-specific route (e.g., /ca/solutions/slug vs /solutions/slug)
  const pathParts = pathname?.split('/').filter(Boolean) || []
  const hasLocalePrefix = pathParts.length >= 3 && ['ca', 'ae', 'us'].includes(pathParts[0])
  const loc = hasLocalePrefix ? pathParts[0] : null
  const locale: AppLocale = loc ? normalizeLocaleParam(loc) : 'global'
  
  const [solutionData, setSolutionData] = useState<SolutionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSolution() {
      try {
        const response = await fetch(`/api/solutions/${slug}${locale !== 'global' ? `?locale=${locale}` : ''}`)
        if (response.ok) {
          const data = await response.json()
          setSolutionData(data)
        }
      } catch (error) {
        console.error("Failed to fetch solution:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchSolution()
    }
  }, [slug, locale])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!solutionData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Solution Not Found</h1>
          <p className="text-muted-foreground mb-8">The solution you're looking for doesn't exist.</p>
          <Button asChild>
            <a href={loc ? `/${loc}/solutions` : "/solutions"}>View All Solutions</a>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const FormComponent = FormComponents[solutionData.formSection.form]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-muted-foreground justify-center">
            <a href={loc ? `/${loc}/solutions` : "/solutions"} className="hover:text-foreground transition-colors">
              Solutions
            </a>
            <CaretRight className="w-4 h-4" />
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {solutionData.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {solutionData.hero.subtitle}
            </p>

            {/* Region Badges - Only show on global locale pages */}
            {locale === 'global' && solutionData.regions && solutionData.regions.length > 0 && (
              <div className="flex gap-2 justify-center mt-8">
                {solutionData.regions.map((region) => {
                  const flagCode = getFlagCode(region)
                  return (
                    <Badge key={region} variant="default" className="bg-muted text-muted-foreground text-sm flex items-center gap-2 px-3 py-1">
                      {flagCode && (
                        <img
                          src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/1x1/${flagCode}.svg`}
                          alt={`${region} flag`}
                          className="w-4 h-4 rounded-full border border-border"
                        />
                      )}
                      {region}
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Form Section with Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              {solutionData.formSection.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
              {solutionData.formSection.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Benefits List */}
              {solutionData.formSection.benefits && solutionData.formSection.benefits.length > 0 && (
                <div className="space-y-6">
                  {solutionData.formSection.benefitsTitle && (
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {solutionData.formSection.benefitsTitle}
                    </h3>
                  )}
                  <div className="space-y-4">
                    {solutionData.formSection.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <PhosphorIcons.Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground">{benefit.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Component */}
              {FormComponent && <FormComponent initialRegion="GLOBAL" />}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {solutionData.howItWorks?.steps && solutionData.howItWorks.steps.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {solutionData.howItWorks.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">{index + 1}</span>
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{step.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Recommendations Section */}
      {solutionData.expertTips?.tips && solutionData.expertTips.tips.length > 0 && (
        <>
          <div className="container mx-auto px-4">
            <div className="border-t border-border"></div>
          </div>
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Recommendations</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {solutionData.expertTips.tips.map((tip, index) => {
                  const IconComponent = getIconComponent(tip.icon)
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <IconComponent className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                        <p className="text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
          <div className="container mx-auto px-4">
            <div className="border-t border-border"></div>
          </div>
        </>
      )}

      {/* FAQ Section */}
      <FAQList items={solutionData.faq?.items || []} />

      <Footer />
    </div>
  )
}

