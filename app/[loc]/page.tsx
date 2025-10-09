import { sanityFetch } from "@/lib/sanity"
import HomePage from "@/components/home-page"
import { chooseLocalizedString, type AppLocale, normalizeLocaleParam } from "@/lib/locale"

export const dynamic = "force-dynamic"

type HomeQuery = {
  hero?: {
    kicker?: any
    headline?: any
    subheadline?: any
  }
}

export default async function Page({ params }: { params: Promise<{ loc: string }> }) {
  const { loc } = await params
  const appLocale: AppLocale = normalizeLocaleParam(loc)
  const data = await sanityFetch<HomeQuery>(
    `*[_type == "homePage"] | order(_updatedAt desc)[0]{
      hero{ kicker, headline, subheadline }
    }`
  )
  const home = {
    kicker: chooseLocalizedString((data as any)?.hero?.kicker, appLocale),
    title: chooseLocalizedString((data as any)?.hero?.headline, appLocale),
    subtitle: chooseLocalizedString((data as any)?.hero?.subheadline, appLocale),
  }
  return <HomePage home={home} locale={appLocale} />
}


