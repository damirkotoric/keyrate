import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function InvestingPage() {
  const investingPosts = [
    {
      title: "Building Wealth Through Real Estate Investment",
      excerpt: "Strategies for growing your property portfolio and creating passive income streams",
      date: "Jan 8, 2025",
      readTime: "6 min read",
      region: "Global",
    },
    {
      title: "US Market Entry: What Canadian Investors Need to Know",
      excerpt: "Cross-border investment opportunities and tax considerations for Canadian investors",
      date: "Jan 3, 2025",
      readTime: "7 min read",
      region: "USA",
    },
    {
      title: "Dubai Investment Properties: ROI Analysis 2025",
      excerpt: "Market analysis and return on investment projections for Dubai real estate",
      date: "Dec 30, 2024",
      readTime: "8 min read",
      region: "UAE",
    },
    {
      title: "BRRRR Strategy: Buy, Rehab, Rent, Refinance, Repeat",
      excerpt: "How to use the BRRRR method to scale your real estate investment portfolio",
      date: "Dec 25, 2024",
      readTime: "9 min read",
      region: "Global",
    },
    {
      title: "Commercial vs Residential: Which Investment is Right for You?",
      excerpt: "Comparing commercial and residential real estate investments for different investor profiles",
      date: "Dec 20, 2024",
      readTime: "6 min read",
      region: "Global",
    },
    {
      title: "Tax Benefits of Real Estate Investment in Canada",
      excerpt: "Understanding depreciation, deductions, and tax strategies for Canadian property investors",
      date: "Dec 15, 2024",
      readTime: "7 min read",
      region: "Canada",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 p-0 h-auto text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <a href="/blog">Back to Blog</a>
          </Button>
          <h1 className="text-4xl font-bold mb-4">Real Estate Investing</h1>
          <p className="text-xl text-gray-600">
            Investment strategies, market analysis, and wealth-building insights for property investors
          </p>
        </div>

        <div className="space-y-8">
          {investingPosts.map((post, index) => (
            <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Investing
                  </Badge>
                  <Badge variant="outline" className="border-gray-300 text-gray-600">
                    {post.region}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {post.date} • {post.readTime}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 hover:text-primary cursor-pointer">{post.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
              <Button variant="outline" size="sm">
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
