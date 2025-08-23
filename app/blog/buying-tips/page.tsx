import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function BuyingTipsPage() {
  const buyingTipsPosts = [
    {
      title: "Pre-Approval vs Pre-Qualification: Know the Difference",
      excerpt: "Understanding these terms can save you time and strengthen your offer when house hunting",
      date: "Jan 12, 2025",
      readTime: "5 min read",
      region: "Global",
    },
    {
      title: "First-Time Buyer Programs in Canada: Complete Guide",
      excerpt: "Explore government programs and incentives available to first-time homebuyers",
      date: "Jan 8, 2025",
      readTime: "7 min read",
      region: "Canada",
    },
    {
      title: "Dubai Property Market: What First-Time Buyers Need to Know",
      excerpt: "Essential insights for purchasing your first property in Dubai's dynamic market",
      date: "Jan 5, 2025",
      readTime: "6 min read",
      region: "UAE",
    },
    {
      title: "Down Payment Strategies: Save Faster for Your Home",
      excerpt: "Proven methods to accelerate your down payment savings and reach homeownership sooner",
      date: "Dec 28, 2024",
      readTime: "4 min read",
      region: "Global",
    },
    {
      title: "Home Inspection Checklist: What to Look For",
      excerpt: "Critical items to examine during your home inspection to avoid costly surprises",
      date: "Dec 22, 2024",
      readTime: "8 min read",
      region: "Global",
    },
    {
      title: "Closing Costs Explained: Budget for the Unexpected",
      excerpt: "Complete breakdown of closing costs and how to prepare financially",
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
          <h1 className="text-4xl font-bold mb-4">Buying Tips</h1>
          <p className="text-xl text-gray-600">
            Expert advice and strategies to help you navigate the home buying process with confidence
          </p>
        </div>

        <div className="space-y-8">
          {buyingTipsPosts.map((post, index) => (
            <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Buying Tips
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
