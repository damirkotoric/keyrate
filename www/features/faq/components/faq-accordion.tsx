"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "@/components/icons"
import { renderPortableText } from '@/lib/portableText'
import { chooseLocalizedString, type AppLocale } from "@/lib/locale"

interface FAQItem {
  question: any
  answer: any
}

interface FAQAccordionProps {
  faqs: FAQItem[]
  locale: AppLocale
}

export function FAQAccordion({ faqs, locale }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="space-y-4">
      {faqs.map((item, index) => {
        const isOpen = openItems.includes(index)

        return (
          <div key={index} className="bg-card border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-black pr-4">{chooseLocalizedString(item.question, locale)}</span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {isOpen && (
              <div className="px-6 pb-4 prose prose-gray max-w-none">
                {renderPortableText(item.answer?.[locale] || item.answer?.en)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

