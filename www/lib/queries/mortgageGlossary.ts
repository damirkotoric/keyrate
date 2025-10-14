import { sanityFetch } from '@/lib/sanity'

export interface GlossaryTerm {
  term: { en: string }
  definition: { en: string }
}

export interface MortgageGlossaryPage {
  _id: string
  title: { en: string }
  subtitle?: { en: string }
  terms: GlossaryTerm[]
}

export async function getMortgageGlossary(locale: string = 'en') {
  const query = `*[_type == "mortgageGlossary"][0] {
    _id,
    title,
    subtitle,
    terms[] {
      term,
      definition
    }
  }`
  
  return sanityFetch<MortgageGlossaryPage>(query)
}

