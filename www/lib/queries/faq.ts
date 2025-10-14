import { sanityFetch } from '@/lib/sanity'

export interface FAQ {
  question: { en: string }
  answer: { en: any[] }
}

export interface FAQPage {
  _id: string
  title: { en: string }
  subtitle?: { en: string }
  slug: { current: string }
  faqs: FAQ[]
}

export async function getFAQPage(locale: string = 'en') {
  const query = `*[_type == "faqPage"][0] {
    _id,
    title,
    subtitle,
    slug,
    faqs[] {
      question,
      answer
    }
  }`
  
  return sanityFetch<FAQPage>(query)
}

