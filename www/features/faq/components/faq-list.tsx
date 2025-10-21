"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "@/components/icons"

interface FAQItem {
  question: string
  answer: string
}

interface FAQListProps {
  items: FAQItem[]
  title?: string
  className?: string
}

export function FAQList({ items, title = "Frequently Asked Questions", className = "" }: FAQListProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className={`py-16 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{title}</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((faq, index) => (
            <Card key={index} className="bg-card p-0 overflow-hidden">
              <CardContent className="p-0">
                <button
                  className="cursor-pointer w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="font-semibold text-card-foreground">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

