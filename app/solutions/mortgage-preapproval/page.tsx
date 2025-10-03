"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreApprovalForm } from "@/components/pre-approval-form" // Added import for reusable form component
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Shield, FileText, Users, TrendingUp, ChevronDown } from "@/components/icons"
import { useState } from "react"

export default function ServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/30 mb-6">Pre-Approval Service</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Mortgage Pre-Approval</h1>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Know your budget — and lock in your rate — before you start shopping.
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6 text-center">Why Get Pre-Approved First?</h2>
            <p className="text-lg text-black/80 mb-8 text-center max-w-3xl mx-auto">
              A mortgage pre-approval does more than give you a number — it gives you power. Power to negotiate, power
              to shop confidently, and power to lock your rate before the market moves.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black mb-4">With a KeyRate pre-approval, you get:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-black/80">
                      A fully assessed pre-approval letter you can show to real estate agents & sellers
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-black/80">A rate hold for up to 120 days to protect you from increases</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-black/80">Exact clarity on how much you can spend and what you'll owe</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-black/80">Personalised advice so you never buy more than you should</p>
                  </div>
                </div>
              </div>

              <PreApprovalForm />
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
              <h3 className="font-semibold text-black mb-2">Fill out our 2-minute form</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-2">We match you to the best lender & rate</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-2">Receive your pre-approval letter</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-2">Shop with confidence (your rate is protected)</h3>
            </div>
          </div>
          <p className="text-center text-black/60 mt-8 max-w-2xl mx-auto">
            <strong>Note:</strong> your pre-approval is obligation-free. Final approval only happens once you've chosen
            a property.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-2 text-center">What Our Clients Say</h2>
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
                  "We got pre-approved in under 24 hours and ended up buying below our max — thanks to KeyRate's honest
                  advice."
                </p>
                <p className="font-semibold text-black">— Daniel L.</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white">
              <CardContent className="p-0">
                <p className="text-black/80 mb-4">
                  "As new expats in Dubai, we weren't even sure we qualified. KeyRate made it happen — fast."
                </p>
                <p className="font-semibold text-black">— Cara & Tim</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expert Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Expert Tips from KeyRate Advisors</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-2">Start early.</h3>
                <p className="text-black/80">
                  Don't wait until you find a property ��� you want your approval before you bid.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-2">Self-employed or expat?</h3>
                <p className="text-black/80">There are documents we'll need — apply early so we can work with them.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black mb-2">Don't over-borrow.</h3>
                <p className="text-black/80">
                  Just because you're approved for a number doesn't mean you should spend it.
                </p>
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
                question: "How long is my pre-approval valid for?",
                answer: "60–120 days depending on the lender. We can extend it if you need more time.",
              },
              {
                question: "Does applying hurt my credit score?",
                answer: "No. We use a single soft check that can be used with multiple lenders.",
              },
              {
                question: "Is it free?",
                answer: "Yes — our pre-approvals and advice are 100% free to clients.",
              },
              {
                question: "What happens when I find a property?",
                answer:
                  "We'll move your pre-approval into final underwriting, lock your new rate (if needed), order valuation, and carry you through to closing.",
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

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-2xl text-black/80 mb-6 italic">
              "KeyRate made our home buying process incredibly smooth. Their pre-approval was fast, accurate, and gave
              us the confidence to negotiate effectively. We couldn't have asked for a more favourable experience and we
              were very impressed with his frankness and proactivity."
            </blockquote>
            <div className="border-t pt-6 max-w-sm mx-auto">
              <p className="font-semibold text-black">Cara & Ted</p>
              <p className="text-sm text-gray-500">First Time Home Buyers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Related Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Mortgage Renewals</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Don't auto-renew. Shop around and save thousands with better rates and terms.
                </p>
                <a href="/solutions/mortgage-renewals" className="w-full">
                  <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                    Learn More
                  </button>
                </a>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">First-Time Buyers</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Stop paying rent. We'll help you buy your first home with as little as 5% down.
                </p>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Get Started
                </button>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Refinancing</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Lower your rate, consolidate debt, or access your home's equity.
                </p>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Calculate Savings
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
