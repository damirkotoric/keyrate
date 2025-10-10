"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Globe, TrendingUp, Shield } from "@/components/icons"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Your Global Mortgage Partner —<br /> Built for Buyers, Not Banks
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Smarter mortgages. Tailored advice. Real results.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Who We Are</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
              KeyRate is an independent, performance-driven mortgage brokerage helping homebuyers, homeowners and
              property investors secure the right financing — not just whatever their bank offers.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              We operate globally across <strong>Canada, the United States, and the UAE</strong>, giving our clients
              access to a world of lending options, preferential rates, and strategic guidance no bank can match.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">What Makes Us Different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Client-First Model</h3>
                <p className="text-gray-600">
                  We work for you, not any one bank — so all recommendations are unbiased.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Smarter Rates</h3>
                <p className="text-gray-600">
                  We negotiate hard behind the scenes and make multiple lenders compete for you.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Faster Process</h3>
                <p className="text-gray-600">Digital tools + expert brokers = faster approvals with less paperwork.</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Complete Transparency</h3>
                <p className="text-gray-600">
                  No hidden surprises. Ever. Everything is explained upfront in plain language.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proven Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Proven Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$2B+</div>
              <p className="text-gray-600">in mortgages funded globally</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-gray-600">clients served across Canada, USA & UAE</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-gray-600">mortgage funding success rate through our process</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Multi-Award</div>
              <p className="text-gray-600">winning brokerage (CMP Top Brokerage 2021, Global 100, Hot List)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-3">Advocacy</h3>
              <p className="text-gray-600">we act in your best interests, always</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-3">Integrity</h3>
              <p className="text-gray-600">what we promise is what we deliver</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-3">Access for All</h3>
              <p className="text-gray-600">
                first-timers, expats, non-residents, self-employed — we fight for the people the banks often ignore
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-3">Education &gt; Sales</h3>
              <p className="text-gray-600">our job is to advise, not pressure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Operate */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Where We Operate</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-white border border-gray-200">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Canada</h3>
                </div>
                <p className="text-gray-600">Ottawa & Toronto — nationally licensed, coast-to-coast lending programs</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black">USA</h3>
                </div>
                <p className="text-gray-600">
                  Based in Florida — serving citizens, residents and foreign investors nationwide
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black">UAE</h3>
                </div>
                <p className="text-gray-600">
                  Dubai (Capital Golden Tower, Business Bay) — servicing residents, expats & NRIs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Use Us as Your Mortgage Broker */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Why Use Us as Your Mortgage Broker</h2>

            <div className="mb-12">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                In the past, prospective home buyers turned exclusively to their banks for their mortgage needs. Today,
                you have more options at your disposal with the growing presence of mortgage brokers.
              </p>

              <h3 className="text-2xl font-bold text-black mb-4">Mortgage brokers vs. Banks: What's the difference?</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
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
                <h3 className="text-2xl font-bold text-black mb-4">Growing Popularity</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Getting the best mortgage has a strong influence on the decision to use a broker. According to a 2019
                  CMHC survey, mortgage brokers represented <strong>47% of total mortgage originations</strong> in 2019,
                  up from 40% in 2009 and 26% in 2003.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  This growth reflects prospective home buyers' inclination to compare rates, a role essentially taken
                  on by a mortgage broker.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-black mb-4">Key Advantages</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Access to exclusive deals not available on the open market</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Knowledge of which lenders will consider your specific case</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Specialized access for people with poor credit ratings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Ability to negotiate better rates and lower application fees</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Popular Lenders */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Our Most Popular Lender Partners</h3>
              <p className="text-gray-600 mb-6 text-center">
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

      {/* Meet Our Founder */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-12 text-center">Meet Our Founder</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-08-19%20at%2018.15.45%402x-dxxVqq5Dorp2EdK0MvLA5gi2QdYmKt.png"
                  alt="Danny Ibrahim - Principal Broker & CEO"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <h3 className="text-3xl font-bold text-primary mb-2">PRINCIPAL BROKER & CEO</h3>
                  <h4 className="text-2xl font-bold text-black mb-6">DANNY IBRAHIM, PRINCIPAL BROKER & CEO</h4>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Danny started his mortgage career 15 years ago in California. There he learned the ropes while
                      navigating the financial crisis and a recession, before gaining international mortgage experience
                      in Dubai, placing high-end luxury mortgages. He moved back to Canada in 2011, where he quickly
                      rose to become a top producer at National Bank of Canada. He then moved into the broker channel
                      with Mortgage Alliance. Under that umbrella, KeyRate was recognized by CMP as a Top Brokerage in
                      2019.
                    </p>

                    <p>
                      Now independent, KeyRate has achieved the Top Brokerage award for 2020, has been recognized by the
                      Global 100 and is once again recognized as a CMP Top Brokerage for 2021. Danny has been recognized
                      as a CMP Top Broker for 2022. He is also the CEO of Mortgage Fund Capital.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Our Promise to You</h2>
            <p className="text-xl text-gray-600 leading-relaxed text-center mb-12">
              Whether you're moving across town or across borders, we'll help you make confident decisions, get a better
              rate than the banks will offer, and structure your mortgage to build real wealth — not just pay interest.
            </p>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Get Started Today</h3>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-0 text-center">
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-primary" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                  "KeyRate made our international property investment seamless. Danny and his team navigated complex
                  cross-border financing with expertise and transparency we'd never experienced before. They truly work
                  for you, not the banks."
                </blockquote>
                <div className="border-t pt-6">
                  <p className="font-semibold text-black">Sarah & Michael Chen</p>
                  <p className="text-sm text-gray-500">International Property Investors</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
