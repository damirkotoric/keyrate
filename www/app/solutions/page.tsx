"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, RefreshCw, TrendingUp, DollarSign, FileText, ArrowRight } from "@/components/icons"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ServicesPage() {
  const [isGlobalDropdownOpen, setIsGlobalDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("Global")

  const globalServices = [
    {
      icon: FileText,
      title: "Mortgage Pre-Approval",
      description: "Get pre-qualified before you shop — fast approvals so you know exactly how much you can afford.",
      cta: "Start My Pre-Approval",
    },
    {
      icon: RefreshCw,
      title: "Mortgage Renewals",
      description:
        "Your bank's renewal offer is rarely its best offer. Let us negotiate a better rate and term before you sign.",
      cta: "Check Renewal Options",
    },
    {
      icon: TrendingUp,
      title: "Mortgage Refinancing",
      description: "Lower your payments, consolidate debt, or pull out equity — restructuring your mortgage made easy.",
      cta: "Refinance & Save",
    },
    {
      icon: DollarSign,
      title: "Equity Release / Second Mortgages",
      description:
        "Access the value tied up in your property without selling — perfect for renovations, investments or growth.",
      cta: "Unlock My Equity",
    },
  ]

  const uaeServices = [
    {
      title: "Expat & Resident Mortgages",
      description:
        "Home finance solutions designed specifically for salaried expats and UAE nationals — backed by local lenders and EIBOR-linked products.",
      cta: "Learn More",
    },
    {
      title: "Islamic Finance (Murabaha & Ijara)",
      description: "Sharia-compliant, interest-free mortgage alternatives for clients seeking ethical home financing.",
      cta: "Explore Islamic Options",
    },
    {
      title: "Non-Resident / Overseas Buyer Mortgages",
      description:
        "Buy UAE property from abroad — we secure mortgages for non-resident investors without a UAE bank account.",
      cta: "Check Eligibility",
    },
    {
      title: "Golden Visa Mortgage Financing",
      description:
        "Property-linked solutions for investors seeking long-term UAE residency under the Golden Visa program.",
      cta: "Apply Now",
    },
  ]

  const canadaServices = [
    {
      title: "First-Time Home Buyer Mortgages",
      description: "Government-approved products designed for Canadian renters ready to become homeowners.",
      cta: "View Buyer Programs",
    },
    {
      title: "Self-Employed Borrower Mortgages",
      description:
        "Use stated-income programs and alternative documentation to qualify even without traditional payslips.",
      cta: "I'm Self-Employed",
    },
    {
      title: "New-to-Canada Mortgages",
      description: "Recently relocated? Get insured mortgage financing even without a long Canadian credit footprint.",
      cta: "Learn More",
    },
    {
      title: "Investment & Rental Mortgages",
      description: "Financing for second homes, rental properties, and multi-unit income real estate across Canada.",
      cta: "Start Investing",
    },
  ]

  const usaServices = [
    {
      title: "U.S. Home Purchase Mortgages",
      description:
        "Residential mortgages for primary, vacation or second homes across the USA — available to citizens, residents, and foreign nationals.",
      cta: "See U.S. Programs",
    },
    {
      title: "U.S. Investment & DSCR Loans",
      description: "Investor-focused solutions for income-producing properties using cash-flow based underwriting.",
      cta: "Grow My Portfolio",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Find the Right Mortgage Solution for Your Next Move
            </h1>
            <p className="text-xl text-black/80 mb-8 leading-relaxed">
              Whether you're buying, investing, or leveraging equity — at home or across borders — KeyRate helps you
              secure the mortgage that matches your goals. Serving clients in{" "}
              <strong>Canada, the United States, and the UAE</strong>, we work with top lenders globally to get you
              better rates, smarter products, and faster approvals.
            </p>
            <div className="flex justify-center mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aqZEge5SGX2nqEeSe8gLioLh0AvIWc.png"
                alt="KeyRate Awards - Top Brokerage 2019, 2021, CMP Hot List 2020, 2021, Global 100 Initiative"
                className="max-w-md h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-black">Global Mortgage Solutions</h2>
            </div>
            <p className="text-gray-600">Available in all markets</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalServices.map((service, index) => (
              <Card key={index} className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => {
                      if (index === 0) {
                        window.location.href = "/solutions/mortgage-preapproval"
                      }
                      if (index === 1) {
                        window.location.href = "/solutions/mortgage-renewals"
                      }
                    }}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* UAE Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🇦🇪</span>
              <h2 className="text-3xl font-bold text-black">United Arab Emirates</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {uaeServices.map((service, index) => (
              <Card key={index} className="p-6 bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Canada Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🇨🇦</span>
              <h2 className="text-3xl font-bold text-black">Canada</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {canadaServices.map((service, index) => (
              <Card key={index} className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* USA Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🇺🇸</span>
              <h2 className="text-3xl font-bold text-black">United States</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {usaServices.map((service, index) => (
              <Card key={index} className="p-6 bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-8">What Our Clients Say</h2>
            <Card className="p-8 bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-primary" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                  "KeyRate made our international property purchase seamless. As Canadian residents buying in Dubai, we
                  thought the process would be complicated, but their team handled everything from pre-approval to
                  closing. The rates they secured were better than what local banks offered, and their knowledge of
                  cross-border financing was invaluable."
                </blockquote>
                <div className="border-t pt-6">
                  <p className="font-semibold text-black">Sarah & Michael Chen</p>
                  <p className="text-sm text-gray-500">International Property Investors</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 text-white bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Talk to one of our licensed global mortgage advisors and receive personalised recommendations tailored to
            your country, property goals, and financial profile.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3">
            Get My Free Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
