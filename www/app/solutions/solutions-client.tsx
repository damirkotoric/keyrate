"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, TrendingUp, DollarSign, FileText, ArrowRight, Home, Users, PiggyBank, MapPin, Shield } from "@/components/icons"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SolutionCard from "@/components/solution-card"
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
  
  // Fallback hardcoded solutions if API fails
  const fallbackSolutions = [
    // Global solutions (available everywhere)
    {
      icon: FileText,
      title: "Mortgage Pre-Approval",
      description: "Get pre-qualified before you shop — fast approvals so you know exactly how much you can afford.",
      features: ["No credit check required", "Results in 2 minutes", "Know your budget before shopping"],
      buttonText: "Start My Pre-Approval",
      href: "/solutions/mortgage-preapproval",
      regions: ["Canada", "UAE", "USA"],
    },
    {
      icon: RefreshCw,
      title: "Mortgage Renewals",
      description:
        "Your bank's renewal offer is rarely its best offer. Let us negotiate a better rate and term before you sign.",
      features: ["Better rates than your bank", "No fees to switch", "Save thousands over your term"],
      buttonText: "Check Renewal Options",
      href: "/solutions/mortgage-renewals",
      regions: ["Canada", "UAE", "USA"],
    },
    {
      icon: TrendingUp,
      title: "Mortgage Refinancing",
      description: "Lower your payments, consolidate debt, or pull out equity — restructuring your mortgage made easy.",
      features: ["Lower monthly payments", "Consolidate high-interest debt", "Access home equity"],
      buttonText: "Refinance & Save",
      regions: ["Canada", "UAE", "USA"],
    },
    {
      icon: DollarSign,
      title: "Equity Release / Second Mortgages",
      description:
        "Access the value tied up in your property without selling — perfect for renovations, investments or growth.",
      features: ["Unlock property value", "Keep your existing mortgage", "Flexible repayment terms"],
      buttonText: "Unlock My Equity",
      regions: ["Canada", "UAE", "USA"],
    },
    // Canada-specific solutions
    {
      icon: Home,
      title: "First-Time Home Buyer Mortgages",
      description: "Government-approved products designed for Canadian renters ready to become homeowners.",
      features: ["Low down payment options", "CMHC insured", "First-time buyer incentives"],
      buttonText: "View Buyer Programs",
      regions: ["Canada"],
    },
    {
      icon: Users,
      title: "Self-Employed Borrower Mortgages",
      description:
        "Use stated-income programs and alternative documentation to qualify even without traditional payslips.",
      features: ["Stated income programs", "Alternative documentation", "Flexible qualification"],
      buttonText: "I'm Self-Employed",
      regions: ["Canada"],
    },
    {
      icon: MapPin,
      title: "New-to-Canada Mortgages",
      description: "Recently relocated? Get insured mortgage financing even without a long Canadian credit footprint.",
      features: ["No Canadian credit needed", "Insured financing", "Newcomer programs"],
      buttonText: "Learn More",
      regions: ["Canada"],
    },
    {
      icon: PiggyBank,
      title: "Investment & Rental Mortgages",
      description: "Financing for second homes, rental properties, and multi-unit income real estate across Canada.",
      features: ["Multi-unit properties", "Rental income qualification", "Investment property rates"],
      buttonText: "Start Investing",
      regions: ["Canada"],
    },
    // UAE-specific solutions
    {
      icon: Home,
      title: "Expat & Resident Mortgages",
      description:
        "Home finance solutions designed specifically for salaried expats and UAE nationals — backed by local lenders and EIBOR-linked products.",
      features: ["EIBOR-linked rates", "Up to 80% LTV", "Flexible terms for expats"],
      buttonText: "Learn More",
      regions: ["UAE"],
    },
    {
      icon: Shield,
      title: "Islamic Finance (Murabaha & Ijara)",
      description: "Sharia-compliant, interest-free mortgage alternatives for clients seeking ethical home financing.",
      features: ["100% Sharia-compliant", "No interest charges", "Ethical financing options"],
      buttonText: "Explore Islamic Options",
      regions: ["UAE"],
    },
    {
      icon: MapPin,
      title: "Non-Resident / Overseas Buyer Mortgages",
      description:
        "Buy UAE property from abroad — we secure mortgages for non-resident investors without a UAE bank account.",
      features: ["No UAE bank account needed", "Remote application", "International buyers welcome"],
      buttonText: "Check Eligibility",
      regions: ["UAE"],
    },
    {
      icon: Users,
      title: "Golden Visa Mortgage Financing",
      description:
        "Property-linked solutions for investors seeking long-term UAE residency under the Golden Visa program.",
      features: ["Long-term residency", "Property investment", "Family visa options"],
      buttonText: "Apply Now",
      regions: ["UAE"],
    },
    // USA-specific solutions
    {
      icon: Home,
      title: "U.S. Home Purchase Mortgages",
      description:
        "Residential mortgages for primary, vacation or second homes across the USA — available to citizens, residents, and foreign nationals.",
      features: ["30-year fixed rates", "Foreign national programs", "Primary & vacation homes"],
      buttonText: "See U.S. Programs",
      regions: ["USA"],
    },
    {
      icon: TrendingUp,
      title: "U.S. Investment & DSCR Loans",
      description: "Investor-focused solutions for income-producing properties using cash-flow based underwriting.",
      features: ["DSCR-based qualification", "No income verification", "Cash flow underwriting"],
      buttonText: "Grow My Portfolio",
      regions: ["USA"],
    },
  ]

  // Use CMS solutions or fallback to hardcoded
  const allSolutions = solutions.length > 0 ? solutions : fallbackSolutions
  
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
            <p className="text-muted-foreground">
              {filteredSolutions.length} solution{filteredSolutions.length !== 1 ? 's' : ''} available{locale !== 'global' ? ` in ${countryName}` : ' across all markets'}
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

      {/* Closing CTA */}
      <section className="pt-16 pb-32 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Talk to one of our licensed global mortgage advisors and receive personalised recommendations tailored to
            your country, property goals, and financial profile.
          </p>
          <Button className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3">
            Book a call
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

