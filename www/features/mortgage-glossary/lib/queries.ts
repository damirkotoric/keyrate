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
  seo?: {
    title?: any
    description?: any
  }
}

export async function getMortgageGlossary(locale: string = 'en') {
  const query = `*[_type == "mortgageGlossary"][0] {
    _id,
    title,
    subtitle,
    seo,
    terms[] {
      term,
      definition
    }
  }`
  
  return sanityFetch<MortgageGlossaryPage>(query)
}

