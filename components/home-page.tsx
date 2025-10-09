"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { NumberTicker } from "@/components/ui/number-ticker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle, Phone, Mail, MapPin, Shield, TrendingUp, Home, RefreshCw, PiggyBank, Users, DollarSign, Clock, Star } from "@/components/icons"
import InstagramSection from "@/components/instagram-section"
import PreApprovalForm from "@/components/pre-approval-form"
import TestimonialsSection from "@/components/testimonials-section"
import { Marquee } from "@/components/ui/marquee"
import SolutionCard from "@/components/solution-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Highlighter } from "@/components/ui/highlighter"
import { FlickeringGrid } from "@/components/ui/flickering-grid"

type HomeHero = {
  title?: string
  subtitle?: string
  kicker?: string
}

type AppLocale = "global" | "ca" | "uae" | "usa"

export default function HomePage({ home, locale = 'global' }: { home: HomeHero, locale?: AppLocale }) {
  const fallbackTitle = "Lowest Rates. No Lender Fees. No, Really."
  const rawTitleCandidate: unknown = (home as any)?.title
  const rawTitle: string = typeof rawTitleCandidate === 'string' && rawTitleCandidate.trim().length > 0
    ? rawTitleCandidate
    : fallbackTitle
  const flagCodeByLocale: Record<AppLocale, string | null> = { global: null, ca: 'ca', uae: 'ae', usa: 'us' }
  const flagCode = flagCodeByLocale[locale] || null
  const lineParts = rawTitle
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
  const titleSegments = lineParts.length > 0 ? lineParts : (rawTitle.match(/[^.!?]+[.!?]?/g) ?? [rawTitle])

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Pre-Approval Form */}
      <section className="text-foreground py-16 hero">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <Badge variant="default" size="lg">
                  {flagCode && (
                    <img
                      src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/1x1/${flagCode}.svg`}
                      alt={`${locale.toUpperCase()} flag`}
                      className="inline-block w-5 h-5 -ml-1 mr-1 align-[-2px] rounded-full border border-border/50"
                    />
                  )}
                  {typeof home?.kicker === 'string' && home.kicker.trim().length > 0 ? home.kicker : "Award-Winning Brokerage"}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-pretty">
                {titleSegments.map((sentence, index) => {
                  const delays = [400, 800, 1600] // ms
                  const delayMs = delays[index] ?? 0
                  return (
                    <span key={index} className="block">
                      <Highlighter delayMs={delayMs}>{sentence.trim()}</Highlighter>
                    </span>
                  )
                })}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium text-pretty">
                {typeof home?.subtitle === 'string' && home.subtitle.trim().length > 0
                  ? home.subtitle
                  : "We work for you, not the bank. Get pre-approved in minutes with a globally trusted mortgage broker. Over $2 billion processed for 10,000+ happy clients."}
              </p>
              <div className="mb-6">
                <img
                  src="/awards.jpg"
                  alt="KeyRate Awards - Top Brokerage 2019, 2021, CMP Hot List 2020, 2021, Global 100 Initiative"
                  className="w-full max-w-md h-auto mix-blend-multiply mx-auto lg:mx-0"
                />
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground justify-center lg:justify-start">
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
            <h2 className="text-3xl font-bold text-foreground mb-2">Trusted by Thousands</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Proven results, trusted by clients in Canada and the UAE.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:text-center">
            <div className="flex flex-row sm:flex-col items-center">
              <div className="w-20 h-20 rounded-full flex aspect-square items-center justify-center mr-4 sm:mr-0 sm:mb-4 bg-gradient-to-br from-foreground/50 to-foreground">
                <DollarSign className="w-10 h-10 text-background" />
              </div>
              <div className="">
                <h3 className="text-3xl font-bold mb-0 sm:mb-2 text-foreground flex sm:justify-center sm:items-center">
                  $
                  <NumberTicker value={2} decimalPlaces={1} />
                  B+
                </h3>
                <p className="text-muted-foreground font-medium">Mortgages Processed</p>
                <p className="text-sm text-muted-foreground/80">Helping clients invest in high-value property</p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center">
              <div className="w-20 h-20 rounded-full flex aspect-square items-center justify-center mr-4 sm:mr-0 sm:mb-4 bg-gradient-to-br from-foreground/50 to-foreground">
                <Users className="w-10 h-10 text-background" />
              </div>
              <div className="">
                <h3 className="text-3xl font-bold mb-0 sm:mb-2 text-foreground flex sm:justify-center items-center">
                  <NumberTicker value={10} decimalPlaces={1} />K+
                </h3>
                <p className="text-muted-foreground font-medium">Happy Clients</p>
                <p className="text-sm text-muted-foreground/80">Families we've helped achieve homeownership</p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center">
              <div className="w-20 h-20 rounded-full flex aspect-square items-center justify-center mr-4 sm:mr-0 sm:mb-4 bg-gradient-to-br from-foreground/50 to-foreground">
                <Star className="w-10 h-10 text-background" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-0 sm:mb-2 text-foreground flex sm:justify-center items-center">
                  <NumberTicker value={1.1} decimalPlaces={1} />K
                </h3>
                <p className="text-muted-foreground font-medium">Likes</p>
                <p className="text-sm text-muted-foreground/80">From our followers on our <a href="https://www.facebook.com/keyrate" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">Facebook page</a></p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center">
              <div className="w-20 h-20 rounded-full flex aspect-square items-center justify-center mr-4 sm:mr-0 sm:mb-4 bg-gradient-to-br from-foreground/50 to-foreground">
                <Clock className="w-10 h-10 text-background" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-0 sm:mb-2 text-foreground flex sm:justify-center items-center">
                  <NumberTicker value={2} decimalPlaces={1} />
                  &nbsp;Min
                </h3>
                <p className="text-muted-foreground font-medium">Pre-Approval Time</p>
                <p className="text-sm text-muted-foreground/80">Get approved faster than anywhere else</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Awards & Recognition + Licensed Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Awards & Recognition */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Awards & Recognition</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="border border-border rounded-full relative w-16 h-16 flex items-center justify-center overflow-hidden flex-none">
                    <img
                      src="/2021-top-brokerage.jpg"
                      alt="CMP Top Brokerage 2021 medal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-xl">2021 Top Mortgage Brokerage</h3>
                    <p className="text-sm text-muted-foreground">Canadian Mortgage Professional</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="border border-border rounded-full relative w-16 h-16 flex items-center justify-center overflow-hidden flex-none">
                    <img
                      src="/2020-hot-list.jpg"
                      alt="CMP Top Brokerage 2021 medal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-xl">2020 Excellence in Service</h3>
                    <p className="text-sm text-muted-foreground">Mortgage Broker News</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="border border-border rounded-full relative w-16 h-16 flex items-center justify-center overflow-hidden flex-none">
                    <img
                      src="/2019-top-brokerage.jpg"
                      alt="CMP Top Brokerage 2021 medal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-xl">Innovation Award</h3>
                    <p className="text-sm text-muted-foreground">Canadian Mortgage Awards</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Licensed & Regulated */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Licensed & Regulated</h2>
              <div className="space-y-6">
                <div className="relative flex items-center gap-4 bg-secondary rounded-lg overflow-hidden">
                  <img
                    src="/photo-canada.jpg"
                    alt=""
                    className="absolute w-full h-full object-cover z-0"
                  />
                  <div className="relative dark z-10 p-4 m-4 z-10 bg-background/30 backdrop-blur-md rounded-md w-full max-w-80">
                    <h3 className="font-medium text-foreground">Canada</h3>
                    <p className="text-xs text-foreground/70">Regulated by Financial Services Regulatory Authority</p>
                    <Badge variant="outline" className="mt-3">
                      FSRA #13191
                    </Badge>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 bg-secondary rounded-lg overflow-hidden">
                  <img
                    src="/photo-uae.jpg"
                    alt=""
                    className="absolute w-full h-full object-cover z-0"
                  />
                  <div className="relative dark z-10 p-4 m-4 z-10 bg-background/30 backdrop-blur-md rounded-md w-full max-w-80">
                    <h3 className="font-medium text-foreground">United Arab Emirates</h3>
                    <p className="text-xs text-foreground/70">Regulated by Dubai Financial Services Authority</p>
                    <Badge variant="outline" className="mt-3">
                      DFSA Regulated
                    </Badge>
                  </div>
                </div>
                <Alert shine className="rounded-lg">
                  <Shield className="w-4 h-4" />
                  <AlertTitle>Your Protection</AlertTitle>
                  <AlertDescription>
                    Professional liability insurance and regulatory oversight ensure your interests are protected.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="dark container">
        <div className="mx-auto my-8 py-12 sm:py-24 text-primary-foreground bg-background relative overflow-hidden rounded-xl shadow-xl">
          {/* Background: Flickering Grid */}
          <FlickeringGrid
            className="absolute inset-0 z-0 opacity-60"
            squareSize={20}
            gridGap={6}
            color="rgba(255,255,255,0.95)"
            maxOpacity={0.25}
            flickerChance={0.2}
            speed={0.001}
          />
          <div className="px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">Our Promise to You</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <TrendingUp weight="duotone" className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Best Rates</h3>
                <p className="text-primary-foreground/90">We shop 50+ lenders to find your lowest rate.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <DollarSign weight="duotone" className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Lender Fees</h3>
                <p className="text-primary-foreground/90">Lenders pay us directly - you pay nothing.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Users weight="duotone" className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Client Advocacy</h3>
                <p className="text-primary-foreground/90">We work for you, not the bank.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Mortgage Solutions */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Complete Mortgage Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From first-time buyers to seasoned investors, we have <Highlighter isView={true} delayMs={500}>specialized mortgage products for every situation in Canada and the UAE.</Highlighter>
            </p>
            <Button size="sm" variant="outline" className="mt-6">
              View All Solutions
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SolutionCard
              className="bg-card"
              icon={Home}
              title="First-Time Buyers"
              description="Stop paying rent. We'll help you buy your first home with as little as 5% down."
              features={["Pre-approval in minutes", "Down payment programs", "First-time buyer incentives"]}
              regions={["Canada", "UAE"]}
              buttonText="Get Pre-Approved"
            />
            <SolutionCard
              className="bg-card"
              icon={RefreshCw}
              title="Mortgage Renewals"
              description="Don't auto-renew. Shop around and save thousands with better rates."
              features={["Rate comparison", "No penalties to switch", "Renewal optimization"]}
              regions={["Canada"]}
              buttonText="Check Renewal Options"
              href="/solutions/mortgage-renewals"
            />
            <SolutionCard
              className="bg-card"
              icon={TrendingUp}
              title="Refinancing"
              description="Lower your rate, consolidate debt, or access your home's equity."
              features={["Debt consolidation", "Cash-out options", "Rate reductions"]}
              regions={["Canada", "UAE"]}
              buttonText="Calculate Savings"
            />
            <SolutionCard
              className="bg-card"
              icon={Users}
              title="Self-Employed"
              description="Alternative income verification for entrepreneurs and freelancers."
              features={["Stated income programs", "Bank statement approval", "Flexible documentation"]}
              regions={["Canada"]}
              buttonText="Apply Now"
            />
            <SolutionCard
              className="bg-card hidden sm:block"
              icon={PiggyBank}
              title="Investment Properties"
              description="Build wealth through real estate. Buy to let and investment financing."
              features={["Rental income consideration", "Portfolio lending", "Investment strategies"]}
              regions={["Canada", "UAE"]}
              buttonText="Explore Options"
            />
            <SolutionCard
              className="bg-card hidden sm:block"
              icon={MapPin}
              title="New to Canada"
              description="Special programs for newcomers with limited Canadian credit history."
              features={["Newcomer programs", "Foreign income accepted", "Minimal credit required"]}
              regions={["Canada"]}
              buttonText="Learn More"
            />
          </div>
        </div>
      </section>

      <InstagramSection />

      {/* Contact Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to secure your mortgage? Contact our expert team today for personalized service across Canada and
              the UAE.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Canada</p>
                      <p className="text-muted-foreground">1-833-222-2027</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">UAE</p>
                      <p className="text-muted-foreground">+971 585 828 202</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">USA</p>
                      <p className="text-muted-foreground">1-800-555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">info@keyrate.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6">Office Locations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Canada</p>
                      <p className="text-muted-foreground">Ottawa & Toronto</p>
                      <p className="text-sm text-muted-foreground/80">Licensed in all provinces</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">UAE</p>
                      <p className="text-muted-foreground">Dubai</p>
                      <p className="text-sm text-muted-foreground/80">DFSA Regulated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">USA</p>
                      <p className="text-muted-foreground">New York & Miami</p>
                      <p className="text-sm text-muted-foreground/80">Licensed in multiple states</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input placeholder="John Doe" className="h-12" />
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
                  <Select>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    className="w-full h-24 resize-none"
                    placeholder="Tell us about your mortgage needs..."
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">Send Message</Button>
                <p className="text-xs text-muted-foreground/80 text-center">
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
