import { sanityFetch } from "@/lib/sanity"
import { headers } from "next/headers"
import HomePage from "@/components/home-page"
import { cookies } from "next/headers"
import { chooseLocalizedString, getPreferredLocaleFromHeaders, LOCALE_COOKIE, normalizeLocaleParam, type AppLocale } from "@/lib/locale"

export const dynamic = "force-dynamic"

export default async function Page() {
  // Fetch data from Sanity
  let home: any = {}
  let langFull = "en"
  let langShort = "en"
  let appLocale: AppLocale = 'global'
  try {
    const hdrs = await headers()
    const acceptLanguage = hdrs.get("accept-language") || ""
    langFull = acceptLanguage.split(",")[0]?.trim() || "en"
    langShort = langFull.split("-")[0] || "en"
    const cookieStore = await cookies()
    const cookieLocale = normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value)
    appLocale = cookieLocale || getPreferredLocaleFromHeaders(acceptLanguage)
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

    const selected = {
      kicker: chooseLocalizedString((data as any)?.hero?.kicker, appLocale) || getLocalized((data as any)?.hero?.kicker),
      headline: chooseLocalizedString((data as any)?.hero?.headline, appLocale) || getLocalized((data as any)?.hero?.headline),
      subheadline: chooseLocalizedString((data as any)?.hero?.subheadline, appLocale) || getLocalized((data as any)?.hero?.subheadline),
    }

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
  } catch (e) {
    console.error("Home page: Sanity fetch failed", e)
  }

  return (
    <>
      <HomePage home={home} locale={appLocale} />
    </>
  )
}