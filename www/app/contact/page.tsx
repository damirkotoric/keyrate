import Header from "@/components/header"
import Footer from "@/components/footer"
import { GetInTouchSection } from "@/components/get-in-touch-section"
import { getContactPage } from "@/lib/queries/contact"
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
  
  const contactPage = await getContactPage()

  if (!contactPage) {
    return {
      title: 'Contact Us | KeyRate Mortgage Broker',
    }
  }

  // Use SEO title if available, otherwise fall back to page title
  const seoTitle = chooseLocalizedString(contactPage.seo?.title, locale)
  const pageTitle = chooseLocalizedString(contactPage.title, locale)
  const title = seoTitle || pageTitle || 'Contact Us'
  
  // Use SEO description if available, otherwise fall back to subtitle
  const seoDescription = chooseLocalizedString(contactPage.seo?.description, locale)
  const pageDescription = chooseLocalizedString(contactPage.subtitle, locale)
  const description = seoDescription || pageDescription

  return {
    title: `${title} | KeyRate Mortgage Broker`,
    description,
  }
}

export default async function ContactPage({
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
  
  const contactPage = await getContactPage()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {chooseLocalizedString(contactPage?.title, locale) || "Get In Touch"}
          </h1>
          {contactPage?.subtitle && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {chooseLocalizedString(contactPage.subtitle, locale)}
            </p>
          )}
        </div>
      </section>

      {/* Get In Touch Section */}
      <GetInTouchSection hideHeader />

      <Footer />
    </div>
  )
}
