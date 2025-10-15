import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight } from "@/components/icons"
import { FAQAccordion } from "@/components/faq-accordion"
import { getFAQPage } from "@/lib/queries/faq"
import { GetInTouchSection } from "@/components/get-in-touch-section"
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
  
  const faqData = await getFAQPage()

  if (!faqData) {
    return {
      title: 'FAQ | KeyRate Mortgage Broker',
    }
  }

  // Use SEO title if available, otherwise fall back to page title
  const seoTitle = chooseLocalizedString(faqData.seo?.title, locale)
  const pageTitle = chooseLocalizedString(faqData.title, locale)
  const title = seoTitle || pageTitle
  
  // Use SEO description if available, otherwise fall back to subtitle
  const seoDescription = chooseLocalizedString(faqData.seo?.description, locale)
  const pageDescription = chooseLocalizedString(faqData.subtitle, locale)
  const description = seoDescription || pageDescription || title

  return {
    title: `${title} | KeyRate Mortgage Broker`,
    description,
  }
}

export default async function FAQPage({
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
  
  const faqData = await getFAQPage()

  if (!faqData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-black mb-4">FAQ Page Not Found</h1>
            <p className="text-gray-600">Please configure the FAQ page in the CMS.</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">{chooseLocalizedString(faqData.title, locale)}</h1>
          {faqData.subtitle && (
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {chooseLocalizedString(faqData.subtitle, locale)}
            </p>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16 max-w-4xl mx-auto">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQAccordion faqs={faqData.faqs} locale={locale} />
        </div>
      </section>

      <GetInTouchSection />

      <Footer />
    </div>
  )
}
