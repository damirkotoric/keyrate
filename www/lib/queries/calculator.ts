import { sanityFetch } from '@/lib/sanity'

export interface CalculatorPage {
  _id: string
  title: { en: string }
  subtitle?: { en: string }
  seo?: {
    title?: any
    description?: any
  }
}

export async function getCalculatorPage(locale: string = 'en') {
  const query = `*[_type == "calculatorPage"][0] {
    _id,
    title,
    subtitle,
    seo
  }`

  return sanityFetch<CalculatorPage>(query)
}

