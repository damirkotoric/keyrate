import { NextRequest, NextResponse } from "next/server"
import { sanityFetch } from "@/lib/sanity"
import { chooseLocalizedString } from "@/lib/locale"
import { cookies } from "next/headers"
import { LOCALE_COOKIE, normalizeLocaleParam, type AppLocale } from "@/lib/locale"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // Get locale from query parameter or cookie
    const { searchParams } = new URL(request.url)
    const queryLocale = searchParams.get('locale')
    const cookieStore = await cookies()
    const locale: AppLocale = queryLocale 
      ? normalizeLocaleParam(queryLocale)
      : (normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value) || 'global')

    // Fetch solution from Sanity
    const data = await sanityFetch<any>(
      `*[_type == "solution" && slug.current == $slug][0]{
        slug,
        regions,
        hero{
          title,
          subtitle
        },
        formSection{
          form,
          title,
          description,
          benefitsTitle,
          benefits[]{
            text
          }
        },
        howItWorks{
          steps[]{
            title
          }
        },
        expertTips{
          tips[]{
            icon,
            title,
            description
          }
        },
        faq{
          items[]{
            question,
            answer
          }
        }
      }`,
      { slug }
    )

    if (!data) {
      return NextResponse.json({ error: "Solution not found" }, { status: 404 })
    }

    // Localize all content
    const localizedData = {
      slug: data.slug?.current || slug,
      regions: data.regions || [],
      hero: {
        title: chooseLocalizedString(data.hero?.title, locale) || "",
        subtitle: chooseLocalizedString(data.hero?.subtitle, locale) || "",
      },
      formSection: {
        form: data.formSection?.form || "none",
        title: chooseLocalizedString(data.formSection?.title, locale) || "",
        description: chooseLocalizedString(data.formSection?.description, locale) || "",
        benefitsTitle: data.formSection?.benefitsTitle 
          ? chooseLocalizedString(data.formSection.benefitsTitle, locale)
          : undefined,
        benefits: (data.formSection?.benefits || []).map((benefit: any) => ({
          text: chooseLocalizedString(benefit.text, locale) || "",
        })),
      },
      howItWorks: {
        steps: (data.howItWorks?.steps || []).map((step: any) => ({
          title: chooseLocalizedString(step.title, locale) || "",
        })),
      },
      expertTips: data.expertTips?.tips
        ? {
            tips: data.expertTips.tips.map((tip: any) => ({
              icon: tip.icon || "FileText",
              title: chooseLocalizedString(tip.title, locale) || "",
              description: chooseLocalizedString(tip.description, locale) || "",
            })),
          }
        : undefined,
      faq: data.faq?.items
        ? {
            items: data.faq.items.map((item: any) => ({
              question: chooseLocalizedString(item.question, locale) || "",
              answer: chooseLocalizedString(item.answer, locale) || "",
            })),
          }
        : undefined,
    }

    return NextResponse.json(localizedData)
  } catch (error) {
    console.error("Error fetching solution:", error)
    return NextResponse.json(
      { error: "Failed to fetch solution" },
      { status: 500 }
    )
  }
}

