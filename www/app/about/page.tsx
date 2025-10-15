import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, TrendingUp, Eye, Heart, Shield, Globe, BookOpen } from "@/components/icons"
import { TestimonialBlock } from "@/components/testimonial-block"
import { GlobeSection } from "@/components/globe-section"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { sanityFetch, urlFor } from "@/lib/sanity"
import { chooseLocalizedString, normalizeLocaleParam, LOCALE_COOKIE, type AppLocale } from "@/lib/locale"
import { renderPortableText } from "@/lib/portableText"
import { IconProps } from "@/components/icons"
import { cookies } from "next/headers"
import type { Metadata } from 'next'

// Map icon names to icon components for What Makes Us Different section
const featureIconMap: Record<string, React.ComponentType<IconProps>> = {
  Users,
  TrendingUp,
  CheckCircle,
  Eye,
  Heart,
  Shield,
  Globe,
  BookOpen,
}

function getFeatureIcon(iconName: string): React.ComponentType<IconProps> {
  return featureIconMap[iconName] || CheckCircle
}

interface SanityTestimonial {
  quote: any
  authorName: any
  authorTitle: any
}

interface AboutPageData {
  hero: {
    title: any
    backgroundImage?: any
  }
  founder: {
    image?: any
    role: any
    name: any
    awardsImage?: any
    bio: any // Block content
    primaryCtaText: any
    primaryCtaUrl: string
    secondaryCtaText: any
    secondaryCtaUrl: string
  }
  whoWeAre: {
    title: any
    content: any // Block content
  }
  whatMakesUsDifferent: {
    title: any
    items: Array<{
      icon: string
      title: any
      description: any
    }>
  }
  whyUseUs: {
    title: any
    intro: any // Block content
    comparisonTitle: any
    comparisonDescription: any // Block content
  }
  comparisonTable: {
    rows: Array<{
      aspect: any
      bankValue: any
      brokerValue: any
    }>
  }
  growingPopularity: {
    title: any
    content: any // Block content
  }
  keyAdvantages: {
    title: any
    advantages: Array<{ text: any }>
  }
  lenderPartners: {
    title: any
    description: any
    partners: Array<{
      name: string
      logo?: any
    }>
  }
  getStarted: {
    title: any
  }
  seo?: {
    title?: any
    description?: any
  }
}

async function getAboutPageData() {
  try {
    const result = await sanityFetch<AboutPageData>(
      `*[_type == "aboutPage" && _id == "aboutPage"][0]{
        hero,
        founder,
        whoWeAre,
        whatMakesUsDifferent,
        whyUseUs,
        comparisonTable,
        growingPopularity,
        keyAdvantages,
        lenderPartners,
        getStarted,
        seo
      }`
    )
    return result
  } catch (error) {
    console.error("Failed to fetch about page data:", error)
    return null
  }
}

async function getRandomTestimonial(locale: AppLocale) {
  try {
    const results = await sanityFetch<SanityTestimonial[]>(
      `*[_type == "testimonial"] | order(_createdAt desc)[0...50]{
        quote,
        authorName,
        authorTitle
      }`
    )
    
    if (!results || results.length === 0) {
      return null
    }
    
    // Pick a random testimonial
    const random = results[Math.floor(Math.random() * results.length)]
    
    return {
      quote: chooseLocalizedString(random.quote, locale) || "",
      author: chooseLocalizedString(random.authorName, locale) || "",
      role: chooseLocalizedString(random.authorTitle, locale) || "",
    }
  } catch (error) {
    console.error("Failed to fetch testimonial:", error)
    return null
  }
}

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
  
  const aboutData = await getAboutPageData()

  if (!aboutData) {
    return {
      title: 'About Us | KeyRate Mortgage Broker',
    }
  }

  // Use SEO title if available, otherwise fall back to hero title
  const seoTitle = chooseLocalizedString(aboutData.seo?.title, locale)
  const pageTitle = chooseLocalizedString(aboutData.hero.title, locale)
  const title = seoTitle || pageTitle
  
  // Use SEO description if available, otherwise fall back to who we are title
  const seoDescription = chooseLocalizedString(aboutData.seo?.description, locale)
  const pageDescription = chooseLocalizedString(aboutData.whoWeAre.title, locale)
  const description = seoDescription || pageDescription

  return {
    title: `${title} | KeyRate Mortgage Broker`,
    description,
  }
}

export default async function AboutPage({
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
  
  const aboutData = await getAboutPageData()
  const testimonial = await getRandomTestimonial(locale)
  
  if (!aboutData) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Failed to load About page data</h1>
        <p className="text-muted-foreground">CMS data could not be fetched</p>
      </div>
    </div>
  }
  
  return (
    <div className="min-h-screen">
      <Header position="fixed" />

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-64 pb-16 lg:pb-16">
        {/* Background Image */}
        <div>
          <img
            src={aboutData.hero.backgroundImage ? urlFor(aboutData.hero.backgroundImage).url() : "/keyrate-office.jpg"}
            alt="KeyRate Office"
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge size="lg">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight text-white">
              {chooseLocalizedString(aboutData.hero.title, locale)}
            </h1>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <img
            src={aboutData.founder.image ? urlFor(aboutData.founder.image).url() : "/danny-burj-khalifa.jpg"}
            alt="KeyRate Founder"
            className="w-full h-full object-cover rounded-lg border border-border"
          />
          <div className="py-16">
            <h2 className="text-xl font-bold text-primary mb-2">
              {chooseLocalizedString(aboutData.founder.role, locale)}
            </h2>
            <h3 className="text-4xl font-bold mb-6">
              {chooseLocalizedString(aboutData.founder.name, locale)}
            </h3>
            <img
              src={aboutData.founder.awardsImage ? urlFor(aboutData.founder.awardsImage).url() : "/awards.jpg"}
              alt="KeyRate Awards - Top Brokerage 2019, 2021, CMP Hot List 
              2020, 2021, Global 100 Initiative"
              className="w-full max-w-md h-auto mix-blend-multiply mx-auto lg:mx-0 mb-8"
            />
            <div className="leading-relaxed text-muted-foreground mb-6">
              {renderPortableText(aboutData.founder.bio?.[locale] || aboutData.founder.bio?.en)}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href={aboutData.founder.primaryCtaUrl}>
                  {chooseLocalizedString(aboutData.founder.primaryCtaText, locale)}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={aboutData.founder.secondaryCtaUrl}>
                  {chooseLocalizedString(aboutData.founder.secondaryCtaText, locale)}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {chooseLocalizedString(aboutData.whoWeAre.title, locale)}
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed text-center">
              {renderPortableText(aboutData.whoWeAre.content?.[locale] || aboutData.whoWeAre.content?.en)}
            </div>
            
            <GlobeSection />
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {chooseLocalizedString(aboutData.whatMakesUsDifferent.title, locale)}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.whatMakesUsDifferent.items?.map((item, index) => {
              const IconComponent = getFeatureIcon(item.icon)
              return (
                <Card key={index} className="relative">
                  <GlowingEffect disabled={false} variant="brand" proximity={120} spread={40} borderWidth={2} inactiveZone={0.3} />
                  <div className="overflow-hidden rounded-xl absolute inset-0 pointer-events-none">
                    <IconComponent className="absolute -right-2 -bottom-8 size-32 opacity-15" />
                  </div>
                  <CardContent className="relative space-y-2 pb-12 pt-4">
                    <h3 className="text-lg font-bold">
                      {chooseLocalizedString(item.title, locale)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {chooseLocalizedString(item.description, locale)}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Use Us as Your Mortgage Broker */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {chooseLocalizedString(aboutData.whyUseUs.title, locale)}
            </h2>

            <div className="mb-12">
              <div className="text-lg text-muted-foreground leading-relaxed mb-6">
                {renderPortableText(aboutData.whyUseUs.intro?.[locale] || aboutData.whyUseUs.intro?.en)}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {chooseLocalizedString(aboutData.whyUseUs.comparisonTitle, locale)}
              </h3>
              <div className="text-lg text-muted-foreground leading-relaxed mb-8">
                {renderPortableText(aboutData.whyUseUs.comparisonDescription?.[locale] || aboutData.whyUseUs.comparisonDescription?.en)}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Aspect</th>
                      <th className="px-6 py-4 text-left font-semibold">Bank</th>
                      <th className="px-6 py-4 text-left font-semibold">Mortgage Broker</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {aboutData.comparisonTable.rows?.map((row, index) => (
                      <tr key={index} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {chooseLocalizedString(row.aspect, locale)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {chooseLocalizedString(row.bankValue, locale)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {chooseLocalizedString(row.brokerValue, locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Trends */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {chooseLocalizedString(aboutData.growingPopularity.title, locale)}
                </h3>
                <div className="text-muted-foreground leading-relaxed">
                  {renderPortableText(aboutData.growingPopularity.content?.[locale] || aboutData.growingPopularity.content?.en)}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {chooseLocalizedString(aboutData.keyAdvantages.title, locale)}
                </h3>
                <ul className="space-y-3">
                  {aboutData.keyAdvantages.advantages?.map((advantage, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {chooseLocalizedString(advantage.text, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Popular Lenders */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                {chooseLocalizedString(aboutData.lenderPartners.title, locale)}
              </h3>
              <p className="text-muted-foreground mb-6 text-center">
                {chooseLocalizedString(aboutData.lenderPartners.description, locale)}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {aboutData.lenderPartners.partners?.map((partner, index) => (
                  <div key={index} className="flex p-4 text-center space-y-3 items-center justify-center">
                    <img
                      src={partner.logo ? urlFor(partner.logo).url() : ""}
                      alt={`${partner.name} logo`}
                      className="min-h-10 min-w-12 max-h-12 max-w-40 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-center">
                  {chooseLocalizedString(aboutData.getStarted.title, locale)}
                </h3>
                <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select your location</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                    <option value="uae">UAE</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    How can we help you?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your mortgage needs..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <Button type="submit" size="xl">
                    Talk to a Mortgage Advisor
                  </Button>
                </div>
              </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {testimonial && (
        <section className="py-16 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <TestimonialBlock
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                rating={5}
              />
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
