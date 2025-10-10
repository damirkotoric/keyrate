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
  solutions?: {
    title?: any
    heading?: any
    subtitle?: any
    description?: any
  }
  solutionsTitle?: any
  solutionsSubtitle?: any
}

export default async function Page({ params }: { params: { loc: string } }) {
  const { loc } = params
  const appLocale: AppLocale = normalizeLocaleParam(loc)
  const data = await sanityFetch<HomeQuery>(
    `*[_type == "homePage"] | order(_updatedAt desc)[0]{
      hero{ kicker, headline, subheadline },
      solutions{ title, heading, subtitle, description },
      solutionsTitle,
      solutionsSubtitle
    }`
  )
  const home = {
    kicker: chooseLocalizedString((data as any)?.hero?.kicker, appLocale),
    title: chooseLocalizedString((data as any)?.hero?.headline, appLocale),
    subtitle: chooseLocalizedString((data as any)?.hero?.subheadline, appLocale),
    solutionsTitle: chooseLocalizedString(((data as any)?.solutions?.title ?? (data as any)?.solutions?.heading ?? (data as any)?.solutionsTitle), appLocale),
    solutionsSubtitle: chooseLocalizedString(((data as any)?.solutions?.subtitle ?? (data as any)?.solutions?.description ?? (data as any)?.solutionsSubtitle), appLocale),
  }
  return <HomePage home={home} locale={appLocale} />
}


