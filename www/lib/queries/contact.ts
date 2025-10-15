import { sanityFetch } from '@/lib/sanity'

export interface ContactPage {
  _id: string
  title: { en: string }
  subtitle?: { en: string }
  seo?: {
    title?: any
    description?: any
  }
}

export async function getContactPage(locale: string = 'en') {
  const query = `*[_type == "contactPage"][0] {
    _id,
    title,
    subtitle,
    seo
  }`

  return sanityFetch<ContactPage>(query)
}

