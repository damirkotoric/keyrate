import { NextRequest, NextResponse } from "next/server"
import { sanityFetch } from "@/lib/sanity"
import { chooseLocalizedString } from "@/lib/locale"
import { cookies } from "next/headers"
import { LOCALE_COOKIE, normalizeLocaleParam, type AppLocale } from "@/lib/locale"

export async function GET(request: NextRequest) {
  try {
    // Get locale from query parameter or cookie
    const { searchParams } = new URL(request.url)
    const queryLocale = searchParams.get('locale')
    const cookieStore = await cookies()
    const locale: AppLocale = queryLocale 
      ? normalizeLocaleParam(queryLocale)
      : (normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value) || 'global')

    // Fetch all solutions from Sanity
    const data = await sanityFetch<any[]>(
      `*[_type == "solution"] | order(_createdAt asc) {
        slug,
        regions,
        icon,
        ctaText,
        hero{
          title,
          subtitle
        },
        formSection{
          benefits[]{
            text
          }
        }
      }`
    )

    if (!data) {
      return NextResponse.json({ solutions: [] })
    }

    // Localize and format all solutions
    const localizedSolutions = data.map((solution: any) => ({
      slug: solution.slug?.current || "",
      regions: solution.regions || [],
      icon: solution.icon || "FileText",
      title: chooseLocalizedString(solution.hero?.title, locale) || "",
      description: chooseLocalizedString(solution.hero?.subtitle, locale) || "",
      features: (solution.formSection?.benefits || [])
        .slice(0, 3) // Take first 3 benefits for card display
        .map((benefit: any) => chooseLocalizedString(benefit.text, locale) || ""),
      buttonText: chooseLocalizedString(solution.ctaText, locale) || "Learn More",
    }))

    return NextResponse.json({ solutions: localizedSolutions })
  } catch (error) {
    console.error("Error fetching solutions:", error)
    return NextResponse.json(
      { error: "Failed to fetch solutions" },
      { status: 500 }
    )
  }
}

