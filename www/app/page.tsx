import { sanityFetch } from "@/lib/sanity"
import { headers } from "next/headers"
import HomePage from "@/components/home-page"
import { cookies } from "next/headers"
import { chooseLocalizedString, getPreferredLocaleFromHeaders, LOCALE_COOKIE, normalizeLocaleParam, type AppLocale } from "@/lib/locale"
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

  console.log('=== METADATA DEBUG ===')
  console.log('urlLocale:', urlLocale)
  console.log('cookieLocale:', cookieStore.get(LOCALE_COOKIE)?.value)
  console.log('Final locale:', locale)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID)

  try {
    const homeData = await sanityFetch<any>(
      `*[_type == "homePage" && _id == "homePage"][0]{
        hero,
        seo
      }`
    )

    if (homeData) {
      console.log('Metadata - homeData.seo?.title:', homeData.seo?.title)
      console.log('Metadata - homeData.hero?.headline:', homeData.hero?.headline)
      
      // Use SEO title if available, otherwise fall back to hero headline
      const seoTitle = chooseLocalizedString(homeData.seo?.title, locale)
      const pageTitle = chooseLocalizedString(homeData.hero?.headline, locale)
      const title = seoTitle || pageTitle || 'KeyRate Mortgage Broker'
      
      console.log('Metadata - seoTitle:', seoTitle)
      console.log('Metadata - pageTitle:', pageTitle)
      console.log('Metadata - final title:', title)
      
      // Use SEO description if available, otherwise fall back to hero subheadline
      const seoDescription = chooseLocalizedString(homeData.seo?.description, locale)
      const pageDescription = chooseLocalizedString(homeData.hero?.subheadline, locale)
      const description = seoDescription || pageDescription

      return {
        title,
        description,
      }
    }
  } catch (error) {
    console.error('Failed to fetch home page metadata:', error)
  }

  return {
    title: 'KeyRate Mortgage Broker | Lowest Rates. No Lender Fees. No, Really.',
    description: 'We work for you, not the bank. Get pre-approved in minutes with a globally trusted mortgage broker. Over $2 billion processed for 10,000+ happy clients.',
  }
}

export default async function Page({ params }: { params?: Promise<{ loc?: string }> }) {
  // Fetch data from Sanity
  let home: any = {}
  let langFull = "en"
  let langShort = "en"
  let appLocale: AppLocale = 'global'
  
  // Get locale - either from URL param (for /ca) or from cookies (for /)
  const resolvedParams = params ? await params : undefined
  const urlLocale = resolvedParams?.loc
  
  try {
    const hdrs = await headers()
    const acceptLanguage = hdrs.get("accept-language") || ""
    langFull = acceptLanguage.split(",")[0]?.trim() || "en"
    langShort = langFull.split("-")[0] || "en"
    const cookieStore = await cookies()
    const cookieLocale = normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value)
    appLocale = urlLocale 
      ? normalizeLocaleParam(urlLocale)
      : (cookieLocale || getPreferredLocaleFromHeaders(acceptLanguage))
    
    console.log('=== PAGE RENDER DEBUG ===')
    console.log('urlLocale:', urlLocale)
    console.log('cookieLocale:', cookieLocale)
    console.log('acceptLanguage:', acceptLanguage)
    console.log('Final appLocale:', appLocale)
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production')
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID)
    
    type HomeQuery = {
      hero?: {
        kicker?: string
        headline?: string
        subheadline?: string
      }
      solutions?: {
        title?: any
        heading?: any
        subtitle?: any
        description?: any
      }
      solutionsTitle?: any
      solutionsSubtitle?: any
    }
    const data = await sanityFetch<HomeQuery>(
      `*[_type == "homePage" && (!defined(__i18n_lang) || __i18n_lang in [$lang, $langShort])] | order(_updatedAt desc)[0]{
        hero{
          kicker,
          headline,
          subheadline
        },
        solutions{ title, heading, subtitle, description },
        solutionsTitle,
        solutionsSubtitle
      }`,
      { lang: langFull, langShort }
    )
    const getLocalized = (value: unknown): string | undefined => {
      if (typeof value === 'string') return value
      if (value && typeof value === 'object') {
        const v: any = value
        return (
          v[langShort] ||
          v[langFull] ||
          v.en ||
          v['en_US'] ||
          v['en-GB'] ||
          Object.values(v).find((x: unknown) => typeof x === 'string')
        )
      }
      return undefined
    }

    console.log('Page - data.hero?.headline (raw):', (data as any)?.hero?.headline)
    console.log('Page - data.hero?.kicker (raw):', (data as any)?.hero?.kicker)
    
    const selected = {
      kicker: chooseLocalizedString((data as any)?.hero?.kicker, appLocale) || getLocalized((data as any)?.hero?.kicker),
      headline: chooseLocalizedString((data as any)?.hero?.headline, appLocale) || getLocalized((data as any)?.hero?.headline),
      subheadline: chooseLocalizedString((data as any)?.hero?.subheadline, appLocale) || getLocalized((data as any)?.hero?.subheadline),
    }

    console.log('Page - selected.headline:', selected.headline)
    console.log('Page - selected.kicker:', selected.kicker)

    // Solutions content (robust to different schema field names and localized objects)
    const solTitleObj: any = (data as any)?.solutions?.title ?? (data as any)?.solutions?.heading ?? (data as any)?.solutionsTitle
    const solSubtitleObj: any = (data as any)?.solutions?.subtitle ?? (data as any)?.solutions?.description ?? (data as any)?.solutionsSubtitle
    const solutions = {
      title: chooseLocalizedString(solTitleObj, appLocale) || 'Complete Mortgage Solutions',
      subtitle: chooseLocalizedString(solSubtitleObj, appLocale) || 'From first-time buyers to seasoned investors, we have specialized mortgage products for every situation in Canada and the UAE.',
    }

    home = {
      kicker: selected.kicker,
      title: selected.headline,
      subtitle: selected.subheadline,
      solutionsTitle: solutions.title,
      solutionsSubtitle: solutions.subtitle,
    }
    
    console.log('Page - final home.title:', home.title)
    console.log('=========================')
  } catch (e) {
    console.error("Home page: Sanity fetch failed", e)
  }

  return (
    <>
      <HomePage home={home} locale={appLocale} />
    </>
  )
}