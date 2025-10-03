"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronDown, ChevronUp, ArrowRight } from "@/components/icons"
import { useState } from "react"

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqSections = [
    {
      title: "Buying & Qualifying Questions",
      items: [
        {
          question: "How much can I afford to pay for a home?",
          answer:
            "The amount you can afford depends on your income, debts, down payment, and current interest rates. Generally, your total housing costs shouldn't exceed 32% of your gross monthly income, and your total debt payments shouldn't exceed 40%. We can help you calculate your exact affordability with a pre-approval.",
        },
        {
          question: "What is the minimum down payment needed for a home?",
          answer:
            "In Canada, the minimum down payment is 5% for homes under $500,000, 5% on the first $500,000 and 10% on the portion above $500,000 up to $999,999, and 20% for homes $1 million and above. Requirements vary by country and program.",
        },
        {
          question: "Can I get a mortgage to purchase a home?",
          answer:
            "Most people can qualify for a mortgage with stable income, reasonable debt levels, and a down payment. We work with multiple lenders to find solutions even for unique situations like self-employment, new immigrants, or credit challenges.",
        },
        {
          question: "Can I use gift funds as a down payment?",
          answer:
            "Yes, gift funds from immediate family members are typically acceptable for down payments. The gift must be documented with a gift letter stating it doesn't need to be repaid, and the source of funds may need to be verified.",
        },
        {
          question: "What is a pre-approved mortgage?",
          answer:
            "A pre-approval is a conditional commitment from a lender stating how much they're willing to lend you based on your financial situation. It gives you confidence when house hunting and shows sellers you're a serious buyer.",
        },
        {
          question: "What is a conventional mortgage?",
          answer:
            "A conventional mortgage is a loan that's not insured by the government. In Canada, this typically means mortgages with a down payment of 20% or more, which don't require mortgage default insurance.",
        },
        {
          question: "How does bankruptcy affect qualification for a mortgage?",
          answer:
            "Bankruptcy affects mortgage qualification, but it's not permanent. Generally, you need to wait 2 years after discharge from bankruptcy to qualify for a conventional mortgage, though some programs may be available sooner with larger down payments.",
        },
        {
          question: "How will child support affect mortgage qualification?",
          answer:
            "Child support payments you make are considered debt and reduce your qualifying income. Child support you receive can often be counted as income if it's court-ordered and has a reliable payment history.",
        },
      ],
    },
    {
      title: "Costs & Process",
      items: [
        {
          question: "What are the costs associated with buying a home?",
          answer:
            "Beyond the down payment, expect closing costs of 1.5-4% of the purchase price, including legal fees, home inspection, appraisal, title insurance, land transfer tax, and moving expenses. We provide detailed cost breakdowns during pre-approval.",
        },
        {
          question: "What is a home inspection and should I have one done?",
          answer:
            "A home inspection is a thorough examination of a property's condition by a qualified professional. While not legally required, it's highly recommended to identify potential issues before purchase. Most purchase agreements include an inspection condition.",
        },
        {
          question: "What is mortgage loan insurance?",
          answer:
            "Mortgage default insurance (like CMHC insurance in Canada) protects lenders if borrowers default. It's required for high-ratio mortgages (less than 20% down) and is paid by the borrower but protects the lender.",
        },
        {
          question: "What is a down payment?",
          answer:
            "A down payment is the upfront cash payment you make toward the purchase price of a home. It reduces the amount you need to borrow and affects your mortgage terms, interest rate, and whether you need mortgage insurance.",
        },
      ],
    },
    {
      title: "Mortgage Types & Terms",
      items: [
        {
          question: "What is a fixed rate mortgage?",
          answer:
            "A fixed rate mortgage has an interest rate that remains constant throughout the term. This provides payment stability and protection against rising rates, making budgeting easier.",
        },
        {
          question: "What is a variable rate mortgage?",
          answer:
            "A variable rate mortgage has an interest rate that can change during the term, typically based on the lender's prime rate. Payments may stay the same with more or less going to principal, or payments may fluctuate.",
        },
        {
          question: "What should the length of my mortgage term be?",
          answer:
            "Mortgage terms typically range from 1-10 years, with 5 years being most common. Shorter terms often have lower rates but require more frequent renewals. Longer terms provide rate security but may have higher rates.",
        },
        {
          question: "Should you go with a short- or long-term mortgage?",
          answer:
            "Short-term mortgages (1-3 years) often have lower rates and more flexibility but require frequent renewals. Long-term mortgages (7-10 years) provide stability but may have higher rates. Your choice depends on your risk tolerance and rate outlook.",
        },
      ],
    },
    {
      title: "Renewals & Payoff",
      items: [
        {
          question: "Should I wait for my mortgage to mature?",
          answer:
            "Don't just accept your lender's renewal offer. Shop around 4-6 months before maturity to compare rates and terms. We can help negotiate better terms or find a new lender if beneficial.",
        },
        {
          question: "How can you pay off your mortgage sooner?",
          answer:
            "Strategies include: making extra principal payments, increasing payment frequency (bi-weekly vs monthly), using lump sum payments from bonuses or tax refunds, and choosing shorter amortization periods when renewing.",
        },
      ],
    },
    {
      title: "First-Time Buyer Programs",
      items: [
        {
          question: "How can you acquire a home with as little as 5% down?",
          answer:
            "First-time buyer programs, high-ratio mortgages with default insurance, and some specialized lender programs allow purchases with 5% down. We can help you understand all available options and their requirements.",
        },
        {
          question: "How can you use your RRSP to help you buy your first home?",
          answer:
            "The Home Buyers' Plan (HBP) in Canada allows first-time buyers to withdraw up to $35,000 from RRSPs tax-free for a home purchase. The funds must be repaid over 15 years to avoid tax consequences.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Not the first person to ask — and that's a good thing. Below are answers to the most common questions we
            hear from buyers, homeowners, and investors. Tap a question to expand the answer and get clarity fast.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6 border-b border-gray-200 pb-3">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => {
                  const globalIndex = sectionIndex * 100 + itemIndex
                  const isOpen = openItems.includes(globalIndex)

                  return (
                    <div key={itemIndex} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-black pr-4">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Still have questions? We'd love to answer them directly.
          </h2>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors">
            Ask Us Anything
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
