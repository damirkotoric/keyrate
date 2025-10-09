import { sanityFetch } from "@/lib/sanity"
import { headers } from "next/headers"
import HomePage from "@/components/home-page"
import { cookies } from "next/headers"
import { chooseLocalizedString, getPreferredLocaleFromHeaders, LOCALE_COOKIE, normalizeLocaleParam, type AppLocale } from "@/lib/locale"

export const dynamic = "force-dynamic"

export default async function Page() {
  // Fetch data from Sanity
  let home: any = {}
  let debug: any = null
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
    }
    const data = await sanityFetch<HomeQuery>(
      `*[_type == "homePage" && (!defined(__i18n_lang) || __i18n_lang in [$lang, $langShort])] | order(_updatedAt desc)[0]{
        hero{
          kicker,
          headline,
          subheadline
        }
      }`,
      { lang: langFull, langShort }
    )
    console.log("[Home] Sanity home data", { langFull, langShort, data })

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

    const keys = {
      kicker: (data as any)?.hero?.kicker && typeof (data as any).hero.kicker === 'object' ? Object.keys((data as any).hero.kicker) : null,
      headline: (data as any)?.hero?.headline && typeof (data as any).hero.headline === 'object' ? Object.keys((data as any).hero.headline) : null,
      subheadline: (data as any)?.hero?.subheadline && typeof (data as any).hero.subheadline === 'object' ? Object.keys((data as any).hero.subheadline) : null,
    }

    debug = { keys, selected, appLocale }

    home = {
      kicker: selected.kicker,
      title: selected.headline,
      subtitle: selected.subheadline,
    }
  } catch (e) {
    console.error("Home page: Sanity fetch failed", e)
  }

  return (
    <>
      <HomePage home={home} />
      {process.env.NODE_ENV !== 'production' && (
        <div className="container mx-auto px-4 my-6">
          <pre className="text-xs text-muted-foreground">{JSON.stringify({ langFull, langShort, debug }, null, 2)}</pre>
        </div>
      )}
    </>
  )
}