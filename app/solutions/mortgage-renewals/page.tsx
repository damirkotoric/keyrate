"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Clock, Shield, FileText, Users, TrendingUp, ChevronDown, RefreshCw } from "lucide-react"
import { useState } from "react"

export default function MortgageRenewalsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/30 mb-6">Renewal Service</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Mortgage Renewals</h1>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Your renewal date is your chance to save — not your cue to settle.
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6 text-center">Don't Just Sign Your Bank's Offer</h2>
            <p className="text-lg text-black/80 mb-8 text-center max-w-3xl mx-auto">
              When your mortgage term ends, your lender will send you a renewal letter — but that "offer" usually comes
              with a higher-than-necessary rate. Most homeowners sign it anyway without shopping around… and end up
              overpaying for years.
            </p>
            <p className="text-lg text-black/80 mb-8 text-center max-w-3xl mx-auto font-semibold">
              That's where we step in.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black mb-4">With a KeyRate renewal strategy, you get:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-black/80">Access to multiple lenders competing for your business</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-black/80">A better interest rate — not just your bank's posted offer</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-black/80">Expert guidance before you lock into a new term</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-black/80">
                      The option to consolidate debt or pull out equity at renewal with no penalties
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Renewal Check Form */}
              <Card className="p-6 bg-white border border-gray-200 shadow-xl">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-black mb-4">Quick Renewal Check</h3>
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
                    <p className="text-xs text-gray-500 text-center">Compare offers — no cost, no obligations.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-black mb-4">Is Your Renewal Coming Up?</h3>
              <p className="text-lg text-black/80 mb-6">
                If your term expires within the next 6 months, now is the time to act.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Check My Renewal Options →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-2">Send us your renewal date & current mortgage info</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-2">
                We compare offers from banks, credit unions & alternative lenders
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-2">You choose from our top 2–3 renewal recommendations</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-2">We help you switch seamlessly & at no cost</h3>
            </div>
          </div>
          <p className="text-center text-black/60 mt-8 max-w-2xl mx-auto">
            In many cases, we can even cover legal or transfer fees.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-2 text-center">Why Clients Love Us</h2>
          <div className="flex justify-center mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-white">
              <CardContent className="p-0">
                <p className="text-black/80 mb-4">
                  "We almost signed the renewal letter from our bank — KeyRate helped us beat it by 1.15% and pay off
                  our car loan at the same time."
                </p>
                <p className="font-semibold text-black">— Renee C.</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white">
              <CardContent className="p-0">
                <p className="text-black/80 mb-4">
                  "Friendly, upfront, and fast. We switched our mortgage at renewal using KeyRate and saved thousands."
                </p>
                <p className="font-semibold text-black">— Marlon & Luka</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* When Renewal is Perfect Time */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">When Renewal is the Perfect Time to…</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <RefreshCw className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-2">Refinance into a lower rate</h3>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-2">
                  Adjust your amortization (to pay off faster or lower monthly payments)
                </h3>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-2">Consolidate high-interest debt</h3>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-2">Access equity for renovations or investments</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Can I renew early?",
                answer:
                  "Yes — many lenders allow early renewal up to 120–180 days before the end of term with no penalty.",
              },
              {
                question: "Do I have to pay to switch lenders?",
                answer:
                  "Not usually. In most cases we cover legal and discharge fees when we place you with a new lender.",
              },
              {
                question: "What if my income/credit has changed since I got the original mortgage?",
                answer:
                  "No problem — send us your latest income and we'll match you with lenders who can work with your current situation.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="font-semibold text-black">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-black/80">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-2 text-center">Related Solutions</h2>
          <p className="text-black/60 text-center mb-12">Explore other mortgage solutions that might interest you</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Mortgage Pre-Approval</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get pre-approved in minutes and shop with confidence knowing your budget and rate.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white" asChild>
                  <a href="/solutions/mortgage-preapproval">
                    Get Pre-Approved
                    <Check className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">First-Time Buyers</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Special programs and guidance for first-time homebuyers with low down payment options.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Learn More
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Refinancing</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Lower your rate, consolidate debt, or access your home's equity through refinancing.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Calculate Savings
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
