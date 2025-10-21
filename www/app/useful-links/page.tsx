import { Header } from "@features/marketing/components/layout/header"
import { Footer } from "@features/marketing/components/layout/footer"
import { ExternalLink, Shield, Building, FileText, TrendingUp, Award } from "@/components/icons"

export default function UsefulLinksPage() {
  const resources = [
    {
      name: "Equifax",
      description:
        "Equifax provides access to your personal credit file and FICO score, allowing you to track your credit health, verify your information and protect yourself from identity theft — especially before making major purchases like a home or vehicle.",
      url: "https://www.equifax.ca",
      icon: Shield,
      category: "Credit Monitoring",
    },
    {
      name: "Genworth (Sagen)",
      description:
        "Genworth Financial (now branded Sagen) is a leading mortgage insurance provider in Canada, helping families secure insured home financing with low down payments.",
      url: "https://www.sagen.ca",
      icon: Building,
      category: "Mortgage Insurance",
    },
    {
      name: "CMHC (Canada Mortgage & Housing Corporation)",
      description:
        "Canada's federal housing agency. CMHC supports housing affordability, offers mortgage insurance for high-ratio mortgages and provides research, tools and programs for homebuyers.",
      url: "https://www.cmhc-schl.gc.ca",
      icon: Building,
      category: "Government Agency",
    },
    {
      name: "Canada Revenue Agency (CRA)",
      description:
        "Regulates and administers Canadian tax law, including programs like the Home Buyers' Plan (HBP), which allows first-time buyers to use RRSP funds toward a down payment.",
      url: "https://www.canada.ca/en/revenue-agency.html",
      icon: FileText,
      category: "Government Agency",
    },
    {
      name: "TransUnion Canada",
      description:
        "A national credit bureau that enables consumers to access their credit report and score and offers tools to help manage credit and prevent fraud.",
      url: "https://www.transunion.ca",
      icon: Shield,
      category: "Credit Monitoring",
    },
    {
      name: "Bank of Canada",
      description:
        "Canada's central bank. Sets the policy interest rate that influences mortgage rates, inflation and the overall economic environment.",
      url: "https://www.bankofcanada.ca",
      icon: TrendingUp,
      category: "Government Agency",
    },
    {
      name: "Appraisal Institute of Canada",
      description:
        "The regulatory body for real estate appraisers in Canada, promoting professional practice and standards in property valuation.",
      url: "https://www.aicanada.ca",
      icon: Award,
      category: "Professional Body",
    },
  ]

  const categories = [...new Set(resources.map((resource) => resource.category))]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-black mb-6">Useful Links & External Resources</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Below you'll find a curated list of trusted organisations, tools and agencies we frequently reference
              throughout the mortgage process. These resources can help you better understand your credit, the real
              estate market and the regulations that impact homeownership.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              Have questions along the way? We're here to help — just{" "}
              <a href="/about" className="text-primary hover:underline">
                get in touch
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {categories.map((category) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-6 border-b border-gray-200 pb-3">{category}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {resources
                    .filter((resource) => resource.category === category)
                    .map((resource) => {
                      const IconComponent = resource.icon
                      return (
                        <div
                          key={resource.name}
                          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-xl font-bold text-black">{resource.name}</h3>
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                              </div>
                              <p className="text-gray-600 mb-4 leading-relaxed">{resource.description}</p>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                              >
                                Visit Website
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6">Need Help Navigating Your Mortgage Journey?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our mortgage experts are here to guide you through every step of the process and help you understand how
              these resources apply to your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/solutions/mortgage-preapproval"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get Pre-Approved
              </a>
              <a
                href="/about"
                className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
