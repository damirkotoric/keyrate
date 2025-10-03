import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "@/components/icons"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function RatesPage() {
  const ratesPosts = [
    {
      title: "Bank of Canada Holds Rates Steady in January",
      excerpt: "Analysis of the latest rate decision and what it means for your mortgage renewal",
      date: "Jan 15, 2025",
      readTime: "3 min read",
      region: "Canada",
      slug: "bank-of-canada-holds-rates-steady-january",
    },
    {
      title: "2025 Rate Predictions: What Experts Say",
      excerpt: "Industry insights on where mortgage rates are heading this year",
      date: "Jan 10, 2025",
      readTime: "5 min read",
      region: "Global",
    },
    {
      title: "Fixed vs Variable: Which Rate Type Wins in 2025?",
      excerpt: "Comparing rate options and strategies for different market conditions",
      date: "Jan 5, 2025",
      readTime: "4 min read",
      region: "Global",
    },
    {
      title: "UAE Central Bank Rate Changes: Impact on Mortgages",
      excerpt: "How recent policy changes affect mortgage rates in the UAE market",
      date: "Dec 28, 2024",
      readTime: "4 min read",
      region: "UAE",
    },
    {
      title: "US Federal Reserve Policy and Mortgage Rate Trends",
      excerpt: "Understanding how Fed decisions influence US mortgage rates",
      date: "Dec 22, 2024",
      readTime: "6 min read",
      region: "USA",
    },
    {
      title: "Rate Shopping: How to Find the Best Mortgage Rate",
      excerpt: "Strategies for comparing rates and negotiating better terms with lenders",
      date: "Dec 18, 2024",
      readTime: "5 min read",
      region: "Global",
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
          <h1 className="text-4xl font-bold mb-4">Rates & Market Updates</h1>
          <p className="text-xl text-gray-600">
            Stay informed with the latest mortgage rate trends, central bank decisions, and market analysis
          </p>
        </div>

        <div className="space-y-8">
          {ratesPosts.map((post, index) => (
            <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Rates
                  </Badge>
                  <Badge variant="outline" className="border-gray-300 text-gray-600">
                    {post.region}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {post.date} • {post.readTime}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 hover:text-primary cursor-pointer">
                {index === 0 ? <a href={`/blog/rates/${post.slug}`}>{post.title}</a> : post.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
              <Button variant="outline" size="sm">
                {index === 0 ? (
                  <a href={`/blog/rates/${post.slug}`} className="flex items-center">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                ) : (
                  <>
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
