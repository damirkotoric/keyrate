import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsSection, defaultStats } from "@/components/stats-section"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Globe as GlobeIcon, TrendingUp, Shield, Eye, BookOpen } from "@/components/icons"
import { TestimonialBlock } from "@/components/testimonial-block"
import { GlobeSection } from "@/components/globe-section"
import { sanityFetch } from "@/lib/sanity"
import { chooseLocalizedString } from "@/lib/locale"

interface SanityTestimonial {
  quote: any
  authorName: any
  authorTitle: any
}

async function getRandomTestimonial() {
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
    
    // Use global locale for now - could be enhanced to use user's locale
    const locale = "global"
    
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

export default async function AboutPage() {
  const testimonial = await getRandomTestimonial()
  return (
    <div className="min-h-screen">
      <Header position="fixed" />

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-64 pb-16 lg:pb-16">
        {/* Background Image */}
        <div>
          <img
            src="/keyrate-office.jpg"
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
              Global Mortgages, Built for Buyers Not Banks
            </h1>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <img
            src="/danny-burj-khalifa.jpg"
            alt="KeyRate Office"
            className="w-full h-full object-cover rounded-lg border border-border"
          />
          <div className="py-16">
            <h2 className="text-xl font-bold text-primary mb-2">Principal Broker & CEO</h2>
            <h3 className="text-4xl font-bold mb-6">Danny Ibrahim</h3>
            <img
              src="/awards.jpg"
              alt="KeyRate Awards - Top Brokerage 2019, 2021, CMP Hot List 2020, 2021, Global 100 Initiative"
              className="w-full max-w-md h-auto mix-blend-multiply mx-auto lg:mx-0 mb-8"
            />
            <div className="space-y-4 leading-relaxed text-muted-foreground mb-6">
              <p>
                Danny began his mortgage career in California during the financial crisis, later moving to Dubai to arrange luxury mortgages. He returned to Canada in 2011, became a top producer at National Bank, and joined Mortgage Alliance, where KeyRate earned a CMP Top Brokerage award in 2019.
              </p>
              <p>
                Now independent, KeyRate has continued to excel—winning Top Brokerage awards in 2020 and 2021, recognition from Global 100, and Danny named a CMP Top Broker in 2022. He also serves as CEO of Mortgage Fund Capital.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                Book a Call
              </Button>
              <Button variant="outline" size="lg">
                Connect on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-8">
              KeyRate is an independent, performance-driven mortgage brokerage helping homebuyers, homeowners and
              property investors secure the right financing — not just whatever their bank offers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-0">
              We operate globally across <strong>Canada, the United States, and the UAE</strong>, giving our clients
              access to a world of lending options, preferential rates, and strategic guidance no bank can match.
            </p>
            
            <GlobeSection />
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">What Makes Us Different</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden">
              <Users className="absolute -right-2 -bottom-8 size-32 opacity-15" />
              <CardContent className="relative space-y-2 pb-4">
                <h3 className="text-lg font-bold">Client-First Model</h3>
                <p className="text-sm text-muted-foreground">
                  We work for you, not any one bank — so all recommendations are unbiased.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <TrendingUp className="absolute -right-2 -bottom-8 size-32 opacity-15" />
              <CardContent className="relative space-y-2 pb-4">
                <h3 className="text-lg font-bold">Smarter Rates</h3>
                <p className="text-sm text-muted-foreground">
                  We negotiate hard behind the scenes and make multiple lenders compete for you.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CheckCircle className="absolute -right-2 -bottom-8 size-32 opacity-15" />
              <CardContent className="relative space-y-2 pb-4">
                <h3 className="text-lg font-bold">Faster Process</h3>
                <p className="text-sm text-muted-foreground">
                  Digital tools + expert brokers = faster approvals with less paperwork.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <Eye className="absolute -right-2 -bottom-8 size-32 opacity-15" />
              <CardContent className="relative space-y-2 pb-4">
                <h3 className="text-lg font-bold">Complete Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  No hidden surprises. Ever. Everything is explained upfront in plain language.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <Users className="absolute -right-2 -bottom-8 size-32 opacity-15" />
              <CardContent className="relative space-y-2 pb-4">
                <h3 className="text-lg font-bold">Advocacy</h3>
                <p className="text-sm text-muted-foreground">
                  We act in your best interests, always.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden">
              <Shield className="absolute -right-2 -bottom-8 size-32 opacity-15" />
              <CardContent className="relative space-y-2 pb-4">
                <h3 className="text-lg font-bold">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  What we promise is what we deliver.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden">
              <GlobeIcon className="absolute -right-2 -bottom-8 size-32 opacity-15" />
              <CardContent className="relative space-y-2 pb-4">
                <h3 className="text-lg font-bold">Access for All</h3>
                <p className="text-sm text-muted-foreground">
                  First-timers, expats, non-residents, self-employed — we fight for the people the banks often ignore.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden">
              <BookOpen className="absolute -right-2 -bottom-8 size-32 opacity-15" />
              <CardContent className="relative space-y-2 pb-4">
                <h3 className="text-lg font-bold">Education &gt; Sales</h3>
                <p className="text-sm text-muted-foreground">
                  Our job is to advise, not pressure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <StatsSection 
        title="Proven Results"
        subtitle=""
        stats={defaultStats}
        columns={4}
      />

      {/* Why Use Us as Your Mortgage Broker */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Use Us as Your Mortgage Broker</h2>

            <div className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In the past, prospective home buyers turned exclusively to their banks for their mortgage needs. Today,
                you have more options at your disposal with the growing presence of mortgage brokers.
              </p>

              <h3 className="text-2xl font-bold mb-4">Mortgage brokers vs. Banks: What's the difference?</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The difference between banks and mortgage brokers is that banks can only offer you their own products,
                while mortgage brokers can present multiple mortgage options. Independent mortgage brokers are licensed
                mortgage specialists who have access to many lenders and mortgage rates. They essentially negotiate the
                lowest rate for you, and because they acquire high quantities of mortgage products, mortgage brokers can
                pass volume discounts directly on to you.
              </p>
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
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Market Share</td>
                      <td className="px-6 py-4 text-gray-600">53%</td>
                      <td className="px-6 py-4 text-gray-600">47%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Description</td>
                      <td className="px-6 py-4 text-gray-600">
                        Chartered banking institution with personal banking, credit card, loan and mortgage services.
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        Licensed mortgage specialist with access to multiple lenders and mortgage rates. An intermediary
                        whose commission is paid by the lender providing the mortgage product.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Examples</td>
                      <td className="px-6 py-4 text-gray-600">TD, RBC, BMO, CIBC, Scotia, Tangerine</td>
                      <td className="px-6 py-4 text-gray-600 font-semibold text-primary">KeyRate Mortgage</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Pros</td>
                      <td className="px-6 py-4 text-gray-600">
                        Banks allow you to consolidate your services with a provider you have an ongoing relationship
                        with and have deemed trustworthy.
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        Mortgage brokers 'shop' around, negotiate for you, and present the lowest rate on the market.
                        Volume discounts achieved by mortgage brokers are passed directly to you.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Cons</td>
                      <td className="px-6 py-4 text-gray-600">
                        Banks can only access and offer you their own rates and products. Banks will regularly give
                        discounts on their posted mortgage rates; however, you are responsible for this negotiation.
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        Mortgage brokers are a less familiar avenue, and first-time home buyers would not have
                        pre-existing relationships with them.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Trends */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Growing Popularity</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Getting the best mortgage has a strong influence on the decision to use a broker. According to a 2019
                  CMHC survey, mortgage brokers represented <strong>47% of total mortgage originations</strong> in 2019,
                  up from 40% in 2009 and 26% in 2003.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This growth reflects prospective home buyers' inclination to compare rates, a role essentially taken
                  on by a mortgage broker.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Key Advantages</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Access to exclusive deals not available on the open market</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Knowledge of which lenders will consider your specific case</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Specialized access for people with poor credit ratings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Ability to negotiate better rates and lower application fees</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Popular Lenders */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Most Popular Lender Partners</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Many of the major Canadian banks sell through mortgage brokers. Here are the lenders we work with most
                frequently:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "TD Bank",
                  "Scotia Bank",
                  "Home Trust",
                  "MCAP",
                  "Tangerine",
                  "CIBC Firstline",
                  "Merix Financial",
                  "Macquarie",
                ].map((lender, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                    <span className="font-medium text-gray-800">
                      {lender}
                    </span>
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
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-6 text-center">Get Started Today</h3>
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
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
                    Talk to a Mortgage Advisor →
                  </Button>
                </div>
              </form>
            </div>
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
