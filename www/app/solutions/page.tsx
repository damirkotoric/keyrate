import { cookies, headers } from "next/headers"
import { LOCALE_COOKIE, normalizeLocaleParam, type AppLocale, chooseLocalizedString, getPreferredLocaleFromHeaders } from "@/lib/locale"
import { sanityFetch } from "@/lib/sanity"
import SolutionsPageClient from "@/app/solutions/solutions-client"
import type { Metadata } from 'next'

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params
}: {
  params?: Promise<{ loc?: string }>
}): Promise<Metadata> {
  const resolvedParams = params ? await params : undefined
  const urlLocale = resolvedParams?.loc
  
  const cookieStore = await cookies()
  const locale: AppLocale = urlLocale 
    ? normalizeLocaleParam(urlLocale)
    : (normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value) || 'global')

  try {
    const pageData = await sanityFetch<any>(
      `*[_type == "solutionsPage" && _id == "solutionsPage"][0]{
        hero,
        seo
      }`
    )

    if (pageData) {
      // Use SEO title if available, otherwise fall back to hero title
      const seoTitle = chooseLocalizedString(pageData.seo?.title, locale)
      const pageTitle = chooseLocalizedString(pageData.hero?.title, locale)
      const title = seoTitle || pageTitle || 'Mortgage Solutions'
      
      // Use SEO description if available, otherwise fall back to hero subtitle
      const seoDescription = chooseLocalizedString(pageData.seo?.description, locale)
      const pageDescription = chooseLocalizedString(pageData.hero?.subtitle, locale)
      const description = seoDescription || pageDescription

      return {
        title: `${title} | KeyRate Mortgage Broker`,
        description,
      }
    }
  } catch (error) {
    console.error('Failed to fetch solutions page metadata:', error)
  }

  return {
    title: 'Mortgage Solutions | KeyRate Mortgage Broker',
    description: 'Explore our comprehensive range of mortgage solutions tailored to your needs.',
  }
}

export default async function SolutionsPage({ params }: { params?: Promise<{ loc?: string }> }) {
  // Get locale - either from URL param (for /ca/solutions) or from cookies (for /solutions)
  const resolvedParams = params ? await params : undefined
  const urlLocale = resolvedParams?.loc
  
  const cookieStore = await cookies()
  const locale: AppLocale = urlLocale 
    ? normalizeLocaleParam(urlLocale)
    : (normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value) || 'global')

  // Fetch data from Sanity
  let pageData = null
  try {
    const hdrs = await headers()
    const acceptLanguage = hdrs.get("accept-language") || ""
    const langFull = acceptLanguage.split(",")[0]?.trim() || "en"
    const langShort = langFull.split("-")[0] || "en"
    const cookieLocale = normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value)
    const appLocale = urlLocale ? locale : (cookieLocale || getPreferredLocaleFromHeaders(acceptLanguage))

    const data = await sanityFetch<any>(
      `*[_type == "solutionsPage" && _id == "solutionsPage"][0]{
        hero{
          title,
          subtitle
        }
      }`
    )

    if (data?.hero) {
      const title = chooseLocalizedString(data.hero.title, appLocale) || "Find the Right Mortgage Solution for Your Next Move"
      const subtitle = chooseLocalizedString(data.hero.subtitle, appLocale) || "KeyRate helps you secure the right mortgage—whether you're buying, investing, or leveraging equity at home or abroad. We serve clients in Canada, the U.S., and the UAE, working with top global lenders for better rates and faster approvals."
      
      pageData = {
        hero: {
          title,
          subtitle
        }
      }
    }
  } catch (e) {
    console.error("Solutions page: Sanity fetch failed", e)
  }

  return <SolutionsPageClient locale={locale} pageData={pageData} />
}
