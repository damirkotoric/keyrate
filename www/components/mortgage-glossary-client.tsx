"use client"

import { useState, useMemo } from "react"
import { Search } from "@/components/icons"
import { chooseLocalizedString, type AppLocale } from "@/lib/locale"

interface GlossaryTerm {
  term: any
  definition: any
}

interface MortgageGlossaryClientProps {
  terms: GlossaryTerm[]
  locale: AppLocale
}

export function MortgageGlossaryClient({ terms, locale }: MortgageGlossaryClientProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTerms = useMemo(() => {
    if (!searchTerm) return terms

    return terms.filter((item) => {
      const term = chooseLocalizedString(item.term, locale) || ""
      const definition = chooseLocalizedString(item.definition, locale) || ""
      return (
        term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [searchTerm, terms, locale])

  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: GlossaryTerm[] } = {}

    filteredTerms.forEach((term) => {
      const termText = chooseLocalizedString(term.term, locale) || ""
      const firstLetter = termText.charAt(0).toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(term)
    })

    // Sort each group alphabetically
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => {
        const aText = chooseLocalizedString(a.term, locale) || ""
        const bText = chooseLocalizedString(b.term, locale) || ""
        return aText.localeCompare(bText)
      })
    })

    return groups
  }, [filteredTerms, locale])

  return (
    <>
      {/* Search Box */}
      <div className="max-w-md mx-auto relative mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search terms or definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
        {searchTerm && (
          <p className="mt-4 text-gray-600 text-center">
            Found {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""} matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* Glossary Terms */}
      <div className="container mx-auto px-4">
        {Object.keys(groupedTerms)
          .sort()
          .map((letter) => (
            <div key={letter} className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">{letter}</h2>
              <div className="space-y-6">
                {groupedTerms[letter].map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-xl font-bold text-black mb-3">{chooseLocalizedString(item.term, locale)}</h3>
                    <p className="text-gray-700 leading-relaxed">{chooseLocalizedString(item.definition, locale)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No terms found matching "{searchTerm}"</p>
            <p className="text-gray-500 mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </>
  )
}

