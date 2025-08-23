import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, TrendingUp, Home, Calculator } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function BankOfCanadaRateAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Button variant="ghost" className="mb-6 p-0 h-auto text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <a href="/blog/rates">Back to Rates</a>
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Rates
              </Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                Canada
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Bank of Canada Holds Rates Steady in January</h1>
            <p className="text-xl text-gray-600 mb-6">
              Analysis of the latest rate decision and what it means for your mortgage renewal
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6">
              <span>Published: January 2025</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              The Announcement
            </h2>
            <p className="mb-6 leading-relaxed">
              The Bank of Canada (BoC) has chosen to hold its benchmark interest rate steady this January, keeping it at
              2.75%. This decision comes after months of speculation about whether the central bank would pivot toward
              cuts or continue with hikes to fight inflation.
            </p>
            <p className="mb-8 leading-relaxed">
              For homeowners, buyers, and anyone approaching a mortgage renewal, the news carries big implications.
            </p>

            <h2 className="text-2xl font-bold mb-4">Why the Bank of Canada Held Rates</h2>
            <p className="mb-4">Several key factors shaped this decision:</p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-3">Inflation Cooling, But Not Gone</h3>
              <p className="mb-4">
                Inflation has eased from its peak but remains above the BoC's 2% target. Holding rates allows more time
                for inflationary pressures to decline.
              </p>

              <h3 className="text-xl font-semibold mb-3">Economic Growth Slowing</h3>
              <p className="mb-4">
                Canada's economy is showing signs of slower growth, and higher borrowing costs have already cooled
                consumer spending and housing demand.
              </p>

              <h3 className="text-xl font-semibold mb-3">Global Uncertainty</h3>
              <p>
                With global markets facing volatility and U.S. Federal Reserve policy shifts, the BoC is balancing
                domestic needs against international trends.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-primary" />
              What This Means for You
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">If You're Renewing a Mortgage</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Expect renewal offers to remain relatively stable compared to last quarter</li>
                  <li>
                    • Fixed-rate mortgages will likely hold steady, while variable rates remain tied closely to the
                    BoC's stance
                  </li>
                  <li>• If you're up for renewal this year, locking in early may protect you from volatility</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">If You're Buying a Home</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Affordability remains challenging, but the lack of another hike offers predictability</li>
                  <li>• Pre-approval is still crucial: lenders may tighten qualification criteria</li>
                  <li>• Consider your long-term strategy beyond today's rates</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">If You're a Variable-Rate Borrower</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Your payments should stay the same in the short term</li>
                  <li>• However, the BoC hasn't ruled out future moves</li>
                  <li>• Flexibility in your budget is still important</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Looking Ahead: What's Next?</h2>
            <p className="mb-6 leading-relaxed">
              Economists remain split on the BoC's next move. Some predict potential rate cuts later in 2025 if
              inflation continues to cool, while others warn of a possible rebound that could force another hike.
            </p>
            <p className="mb-8 leading-relaxed">
              For now, the central bank has signaled a "wait and see" approach — steadying the ship while monitoring
              incoming data.
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3">Key Takeaways</h3>
              <ul className="space-y-2">
                <li>✓ Rates remain unchanged this January at 2.75%</li>
                <li>✓ Stability is good news for renewals and new buyers, but uncertainty remains</li>
                <li>
                  ✓ Strategic planning (pre-approval, budgeting, and lender comparison) is more important than ever
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Need Expert Guidance?</h3>
              <p className="text-lg text-gray-600 mb-6">
                A mortgage isn't just about today's rate — it's about the strategy behind it.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
                Book a Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500 mt-3">Let us help you secure the best deal in an uncertain market.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
