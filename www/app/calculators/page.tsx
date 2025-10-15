import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { GetInTouchSection } from "@/components/get-in-touch-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, DollarSign, Calendar, TrendingUp, Home, ArrowRight } from "@/components/icons"
import { getCalculatorPage } from "@/lib/queries/calculator"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCalculatorPage()
  
  const title = page?.seo?.title?.en || page?.title?.en || "Mortgage Calculators"
  const description = page?.seo?.description?.en || page?.subtitle?.en || "Free mortgage calculators to help you plan your home purchase"

  return {
    title,
    description,
  }
}

export default async function CalculatorsPage() {
  const page = await getCalculatorPage()

  const calculators = [
    {
      id: "maximum-mortgage",
      title: "Maximum Mortgage Calculator",
      description: "Find out how much mortgage you could qualify for based on your income and down payment.",
      icon: DollarSign,
    },
    {
      id: "mortgage-payment",
      title: "Mortgage Payment Calculator",
      description: "Estimate your monthly mortgage payments and see how they change with different rates and terms.",
      icon: Calculator,
    },
    {
      id: "payment-frequency",
      title: "Payment Frequency Analyzer",
      description:
        "Compare weekly, bi-weekly and monthly payment schedules — find out how much faster you could be mortgage-free.",
      icon: Calendar,
    },
    {
      id: "prepayment",
      title: "Prepayment Simulator",
      description: "See how a lump-sum payment could shorten your amortisation and save thousands in interest.",
      icon: TrendingUp,
    },
    {
      id: "rent-vs-buy",
      title: "Rent vs. Buy Calculator",
      description:
        "Analyse the financial trade-off between renting and buying in today's market — and see which puts you ahead.",
      icon: Home,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{page?.title?.en || "Mortgage Calculators"}</h1>
          {page?.subtitle?.en && (
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {page.subtitle.en}
            </p>
          )}
        </div>
      </section>

      {/* Calculator Tools Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {calculators.map((calculator) => {
              const IconComponent = calculator.icon
              return (
                <Card
                  key={calculator.id}
                  className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary/20"
                >
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{calculator.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{calculator.description}</p>
                    <Button variant="outline" className="w-full">
                      Try Calculator
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <GetInTouchSection />

      <Footer />
    </div>
  )
}

