"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import InstagramSection from "@/components/instagram-section"
import PreApprovalForm from "@/components/pre-approval-form"
import {
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Shield,
  TrendingUp,
  Home,
  RefreshCw,
  PiggyBank,
  Users,
  DollarSign,
  Clock,
  Star,
} from "lucide-react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

import { GetStaticProps } from "next"
import Link from "next/link"
import { strapiFetch } from "@/lib/strapi"

type HomePage = {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    kicker: string;
    publishedAt: string;
  };
};

type HomeData = {
  data: {
    attributes: {
      title?: string;
      subtitle?: string;
      kicker: string;
    };
  };
};

export default function HomePage({ home }: { home: HomeData['data']['attributes'] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Pre-Approval Form */}
      <section className="text-black py-16 hero">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-4">
                <Badge variant="outline">{home?.kicker ?? "Award-Winning Brokerage"}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-pretty">
                {home?.title ?? "Lowest Rates. No Lender Fees. No, Really."}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-lg font-medium text-pretty">
                {home?.subtitle ?? "We work for you, not the bank. Get pre-approved in minutes with a globally trusted mortgage broker. Over $2 billion processed for 10,000+ happy clients."}
              </p>
              <div className="mb-6">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/awards.jpg-8ofGDJdfmvGcbgqXZ9Wyj24CMCdFr4.jpeg"
                  alt="KeyRate Awards - Top Brokerage 2019, 2021, CMP Hot List 2020, 2021, Global 100 Initiative"
                  className="max-w-md h-auto"
                />
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No Bank Fees</span>
                </div>
              </div>
            </div>

            {/* Right - Pre-Approval Form */}
            <PreApprovalForm />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-pretty">
              Our track record speaks for itself. Join thousands of satisfied clients across Canada and the UAE.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-black">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-black">$2B+</h3>
              <p className="text-gray-600 font-medium">Mortgages Processed</p>
              <p className="text-sm text-gray-500">Helping clients achieve billions in property ownership</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-black">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-black">10,000+</h3>
              <p className="text-gray-600 font-medium">Happy Clients</p>
              <p className="text-sm text-gray-500">Families we've helped achieve homeownership</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-black">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-black">1.2K</h3>
              <p className="text-gray-600 font-medium">Likes</p>
              <p className="text-sm text-gray-500">From our followers on our Facebook page</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-black">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-black">2 Min</h3>
              <p className="text-gray-600 font-medium">Pre-Approval Time</p>
              <p className="text-sm text-gray-500">Get approved faster than anywhere else</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Are Saying</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their KeyRate experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic flex-grow">
                  "We couldn't have asked for a more favourable experience and we were very impressed with his frankness
                  and proactivity. All in all, a positive venture and one we will be eager to revisit."
                </p>
                <div className="border-t pt-4 mt-auto">
                  <p className="font-semibold text-black">Cara & Ted</p>
                  <p className="text-sm text-gray-500">First Time Home Buyers</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic flex-grow">
                  "Great service, Danny and Stephanie got me the best rate on the market and helped me through every
                  step of the way. They answered all of my questions professionally and efficiently. They worked at all
                  hours of the day and night for me! If I could give more than 5 stars, I would!"
                </p>
                <div className="border-t pt-4 mt-auto">
                  <p className="font-semibold text-black">Daniel Lucente</p>
                  <p className="text-sm text-gray-500">Satisfied Client</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic flex-grow">
                  "Highly responsive and sensitive to our needs with a keen understanding of the market. Recommended
                  beyond a doubt."
                </p>
                <div className="border-t pt-4 mt-auto">
                  <p className="font-semibold text-black">Trisha & Alex</p>
                  <p className="text-sm text-gray-500">First-time Home Buyers</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic flex-grow">
                  "I must say I have used brokers in the past but at Keyrate I was beyond Happy and Satisfied with the
                  services provided. They were extremely Prompt and organized. Also very informative and knowledgeable.
                  I Highly recommend Keyrate my standards were met and exceeded."
                </p>
                <div className="border-t pt-4 mt-auto">
                  <p className="font-semibold text-black">Sarah Viau</p>
                  <p className="text-sm text-gray-500">Returning Client</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic flex-grow">
                  "Remarkably well-informed, truly the best in the business. We looked around and no one can compare!"
                </p>
                <div className="border-t pt-4 mt-auto">
                  <p className="font-semibold text-black">Anaïs & Jay</p>
                  <p className="text-sm text-gray-500">Returning Clients</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic flex-grow">
                  "I can't say enough about Danny and Stephanie!! They were efficient, friendly, and made us feel like
                  family! Would recommend them over all else!"
                </p>
                <div className="border-t pt-4 mt-auto">
                  <p className="font-semibold text-black">Renee Cooper</p>
                  <p className="text-sm text-gray-500">Happy Client</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Read More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Awards & Recognition + Licensed Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Awards & Recognition */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Awards & Recognition</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">2021</div>
                  <div>
                    <h3 className="font-semibold">Top Mortgage Brokerage</h3>
                    <p className="text-sm text-gray-600">Canadian Mortgage Professional</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">2020</div>
                  <div>
                    <h3 className="font-semibold">Excellence in Service</h3>
                    <p className="text-sm text-gray-600">Mortgage Broker News</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">2019</div>
                  <div>
                    <h3 className="font-semibold">Innovation Award</h3>
                    <p className="text-sm text-gray-600">Canadian Mortgage Awards</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Licensed & Regulated */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Licensed & Regulated</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">🇨🇦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Canada</h3>
                    <p className="text-sm text-gray-600">Regulated by Financial Services Regulatory Authority</p>
                    <Badge variant="outline" className="mt-1">
                      FSRA #13191
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">🇦🇪</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">UAE</h3>
                    <p className="text-sm text-gray-600">Regulated by Dubai Financial Services Authority</p>
                    <Badge variant="outline" className="mt-1">
                      DFSA Regulated
                    </Badge>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold text-orange-800">Your Protection</h3>
                  </div>
                  <p className="text-sm text-orange-700">
                    Professional liability insurance and regulatory oversight ensure your interests are protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-16 text-white bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Promise to You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Rates</h3>
              <p className="text-white/90">We shop 50+ lenders to find your lowest rate.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Lender Fees</h3>
              <p className="text-white/90">Lenders pay us directly - you pay nothing.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Client Advocacy</h3>
              <p className="text-white/90">We work for you, not the bank.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Mortgage Solutions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Mortgage Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From first-time buyers to seasoned investors, we have specialized mortgage products for every situation in
              Canada and the UAE.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-xl bg-gray-50">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      Canada
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      UAE
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">First-Time Buyers</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stop paying rent. We'll help you buy your first home with as little as 5% down.
                </p>
                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Pre-approval in minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Down payment programs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    First-time buyer incentives
                  </li>
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-black text-black hover:bg-black hover:text-white"
                >
                  Get Pre-Approved
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-xl bg-gray-50">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      Canada
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">Mortgage Renewals</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Don't auto-renew. Shop around and save thousands with better rates.
                </p>
                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Rate comparison
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    No penalties to switch
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Renewal optimization
                  </li>
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-black text-black hover:bg-black hover:text-white"
                >
                  <a href="/solutions/mortgage-renewals" className="w-full h-full flex items-center justify-center">
                    Check Renewal Options
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-xl bg-gray-50">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      Canada
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      UAE
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">Refinancing</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Lower your rate, consolidate debt, or access your home's equity.
                </p>
                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Debt consolidation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Cash-out options
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Rate reductions
                  </li>
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-black text-black hover:bg-black hover:text-white"
                >
                  Calculate Savings
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-xl bg-gray-50">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      Canada
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">Self-Employed</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Alternative income verification for entrepreneurs and freelancers.
                </p>
                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Stated income programs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Bank statement approval
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Flexible documentation
                  </li>
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-black text-black hover:bg-black hover:text-white"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-xl bg-gray-50">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <PiggyBank className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      Canada
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      UAE
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">Investment Properties</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Build wealth through real estate. Buy to let and investment financing.
                </p>
                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Rental income consideration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Portfolio lending
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Investment strategies
                  </li>
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-black text-black hover:bg-black hover:text-white"
                >
                  Explore Options
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-xl bg-gray-50">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                      Canada
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-black">New to Canada</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Special programs for newcomers with limited Canadian credit history.
                </p>
                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Newcomer programs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Foreign income accepted
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Minimal credit required
                  </li>
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-black text-black hover:bg-black hover:text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View All Solutions
            </Button>
          </div>
        </div>
      </section>

      <InstagramSection />

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to secure your mortgage? Contact our expert team today for personalized service across Canada and
              the UAE.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Canada</p>
                      <p className="text-gray-600">1-833-222-2027</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">UAE</p>
                      <p className="text-gray-600">+971 585 828 202</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">USA</p>
                      <p className="text-gray-600">1-800-555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">info@keyrate.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6">Office Locations</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Canada</p>
                      <p className="text-gray-600">Ottawa & Toronto</p>
                      <p className="text-sm text-gray-500">Licensed in all provinces</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">UAE</p>
                      <p className="text-gray-600">Dubai</p>
                      <p className="text-sm text-gray-500">DFSA Regulated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">USA</p>
                      <p className="text-gray-600">New York & Miami</p>
                      <p className="text-sm text-gray-500">Licensed in multiple states</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="John" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Doe" className="h-12" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input placeholder="john@example.com" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input placeholder="+1 (555) 123-4567" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">Select your location</option>
                    <option value="canada">Canada</option>
                    <option value="uae">UAE</option>
                    <option value="usa">USA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us about your mortgage needs..."
                  ></textarea>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">Send Message</Button>
                <p className="text-xs text-gray-500 text-center">
                  We'll respond within 24 hours. Your information is kept confidential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
