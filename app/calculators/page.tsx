"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, DollarSign, Calendar, TrendingUp, Home, ArrowRight } from "lucide-react"

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null)

  const calculators = [
    {
      id: "maximum-mortgage",
      title: "Maximum Mortgage Calculator",
      description: "Find out how much mortgage you could qualify for based on your income and down payment.",
      icon: DollarSign,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "mortgage-payment",
      title: "Mortgage Payment Calculator",
      description: "Estimate your monthly mortgage payments and see how they change with different rates and terms.",
      icon: Calculator,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "payment-frequency",
      title: "Payment Frequency Analyzer",
      description:
        "Compare weekly, bi-weekly and monthly payment schedules — find out how much faster you could be mortgage-free.",
      icon: Calendar,
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: "prepayment",
      title: "Prepayment Simulator",
      description: "See how a lump-sum payment could shorten your amortisation and save thousands in interest.",
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: "rent-vs-buy",
      title: "Rent vs. Buy Calculator",
      description:
        "Analyse the financial trade-off between renting and buying in today's market — and see which puts you ahead.",
      icon: Home,
      color: "bg-red-50 text-red-600",
    },
  ]

  const MortgagePaymentCalculator = () => {
    const [loanAmount, setLoanAmount] = useState("")
    const [interestRate, setInterestRate] = useState("")
    const [loanTerm, setLoanTerm] = useState("")
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)

    const calculatePayment = () => {
      const principal = Number.parseFloat(loanAmount)
      const rate = Number.parseFloat(interestRate) / 100 / 12
      const payments = Number.parseFloat(loanTerm) * 12

      if (principal && rate && payments) {
        const payment = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)
        setMonthlyPayment(payment)
      }
    }

    return (
      <Card className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-6">Mortgage Payment Calculator</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="loan-amount">Loan Amount ($)</Label>
              <Input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="500,000"
              />
            </div>
            <div>
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="5.25"
              />
            </div>
            <div>
              <Label htmlFor="loan-term">Loan Term (years)</Label>
              <Input
                id="loan-term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="25"
              />
            </div>
            <Button onClick={calculatePayment} className="w-full bg-primary hover:bg-primary/90">
              Calculate Payment
            </Button>
          </div>
          <div className="flex items-center justify-center">
            {monthlyPayment ? (
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Monthly Payment</h4>
                <p className="text-3xl font-bold text-primary">
                  ${monthlyPayment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter your details to calculate</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Calculate Smarter — Buy Smarter</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Not sure what you can afford? Curious how much a new rate would save you? Our free mortgage calculators help
            you test scenarios, crunch numbers and plan with confidence — whether you're buying, refinancing or just
            getting your budget in place.
          </p>
        </div>
      </section>

      {/* Calculator Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {calculators.map((calculator) => {
              const IconComponent = calculator.icon
              return (
                <Card
                  key={calculator.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20"
                  onClick={() => setActiveCalculator(calculator.id)}
                >
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${calculator.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{calculator.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{calculator.description}</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Try Calculator
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Active Calculator */}
          {activeCalculator === "mortgage-payment" && <MortgagePaymentCalculator />}

          {activeCalculator && activeCalculator !== "mortgage-payment" && (
            <Card className="p-8 bg-gray-50 text-center">
              <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">Calculator Coming Soon</h3>
              <p className="text-gray-600">This calculator is currently under development. Check back soon!</p>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need help understanding your results or what steps to take next?</h2>
          <Button
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg"
            onClick={() => (window.location.href = "/about")}
          >
            Talk to one of our advisors
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
