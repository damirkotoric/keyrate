import Header from "@features/marketing/components/layout/header"
import Footer from "@features/marketing/components/layout/footer"
import { getMortgageGlossary } from "@features/mortgage-glossary/lib/queries"
import { MortgageGlossaryClient } from "@features/mortgage-glossary/components/mortgage-glossary-client"
import { chooseLocalizedString, normalizeLocaleParam, LOCALE_COOKIE, type AppLocale } from "@/lib/locale"
import { cookies } from "next/headers"
import type { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<{ loc?: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const urlLocale = resolvedParams?.loc
  
  const cookieStore = await cookies()
  const locale: AppLocale = urlLocale 
    ? normalizeLocaleParam(urlLocale)
    : (normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value) || 'global')
  
  const glossaryData = await getMortgageGlossary()

  if (!glossaryData) {
    return {
      title: 'Mortgage Glossary',
    }
  }

  // Use SEO title if available, otherwise fall back to page title
  const seoTitle = chooseLocalizedString(glossaryData.seo?.title, locale)
  const pageTitle = chooseLocalizedString(glossaryData.title, locale)
  const title = seoTitle || pageTitle
  
  // Use SEO description if available, otherwise fall back to subtitle
  const seoDescription = chooseLocalizedString(glossaryData.seo?.description, locale)
  const pageDescription = chooseLocalizedString(glossaryData.subtitle, locale)
  const description = seoDescription || pageDescription || title

  return {
    title: `${title} | KeyRate Mortgage Broker`,
    description,
  }
}

export default async function MortgageGlossary({
  params
}: {
  params: Promise<{ loc?: string }>
}) {
  const resolvedParams = await params
  const urlLocale = resolvedParams?.loc
  
  const cookieStore = await cookies()
  const locale: AppLocale = urlLocale 
    ? normalizeLocaleParam(urlLocale)
    : (normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value) || 'global')
  
  const glossaryData = await getMortgageGlossary()

  if (!glossaryData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-black mb-4">Mortgage Glossary Not Found</h1>
            <p className="text-gray-600">Please configure the Mortgage Glossary page in the CMS.</p>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">{chooseLocalizedString(glossaryData.title, locale)}</h1>
          {glossaryData.subtitle && (
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {chooseLocalizedString(glossaryData.subtitle, locale)}
            </p>
          )}
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-16 bg-white">
        <div className="mx-auto px-4 max-w-4xl">
          <MortgageGlossaryClient terms={glossaryData.terms} locale={locale} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
