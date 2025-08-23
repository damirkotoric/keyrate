"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ArrowRight, FileText, CreditCard, RefreshCw, RotateCcw, TrendingUp } from "lucide-react"

export default function GuidesEBooksPage() {
  const guides = [
    {
      title: "First-Time Home Buyer Guide",
      description:
        "From saving your down payment to closing day — learn every step of the buying process in simple, jargon-free language.",
      icon: FileText,
      downloadUrl: "#",
    },
    {
      title: "Getting a Mortgage with Bad or Poor Credit",
      description:
        "Worried your credit score will hold you back? Learn how brokers structure approvals for bruised-credit clients.",
      icon: CreditCard,
      downloadUrl: "#",
    },
    {
      title: "5 Biggest Mistakes People Make When Refinancing",
      description:
        "Thinking about refinancing into a better rate? Make sure you avoid the common traps that cost homeowners thousands.",
      icon: RefreshCw,
      downloadUrl: "#",
    },
    {
      title: "7 Things You Need to Know Before Renewing Your Mortgage",
      description:
        "Your renewal date is your chance to renegotiate — not just re-sign. Use this guide to get a better deal from your lender.",
      icon: RotateCcw,
      downloadUrl: "#",
    },
    {
      title: "Investor's Playbook for Rental Properties",
      description:
        "A tactical guide to growing wealth through investment properties — includes worksheets, sample ROI calculations and best-practice tips.",
      icon: TrendingUp,
      downloadUrl: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Free Mortgage Guides & Tools to Help You Borrow Smarter
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            These downloadable guides are packed with straight-talking advice, practical checklists and insider tips
            from our expert mortgage advisors. Whether you're buying your first home, looking to renew, or thinking
            about investing — take the guesswork out of your next move with our free resources.
          </p>
        </div>
      </section>

      {/* Available Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Available Guides & Downloads</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {guides.map((guide, index) => {
              const IconComponent = guide.icon
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-black flex-1">{guide.title}</h3>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{guide.description}</p>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      onClick={() => window.open(guide.downloadUrl, "_blank")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 text-white bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want a personalised assessment instead of a guide?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get tailored advice specific to your situation with a free mortgage strategy call from our expert advisors.
          </p>
          <Button
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => (window.location.href = "/contact")}
          >
            Get a Free Mortgage Strategy Call
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
