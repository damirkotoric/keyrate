import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "@/components/icons"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "From Rejection to Approval: How We Helped a Self-Employed Client",
      excerpt: "A detailed look at how we secured financing for a freelance consultant after multiple bank rejections",
      date: "Jan 12, 2025",
      readTime: "8 min read",
      region: "Canada",
      savings: "$45,000 saved",
    },
    {
      title: "Cross-Border Investment: Canadian Buying in Dubai",
      excerpt: "How we structured financing for a Toronto investor purchasing luxury property in Dubai Marina",
      date: "Jan 5, 2025",
      readTime: "10 min read",
      region: "UAE",
      savings: "$78,000 saved",
    },
    {
      title: "First-Time Buyer Success: $850K Home with 5% Down",
      excerpt: "Strategic use of government programs to help young professionals enter the Vancouver market",
      date: "Dec 28, 2024",
      readTime: "6 min read",
      region: "Canada",
      savings: "$32,000 saved",
    },
    {
      title: "Portfolio Expansion: From 1 to 5 Properties in 18 Months",
      excerpt: "How we helped an investor scale their portfolio using strategic refinancing and HELOC strategies",
      date: "Dec 20, 2024",
      readTime: "12 min read",
      region: "Global",
      savings: "$125,000 saved",
    },
    {
      title: "Renewal Rescue: Saving $89K Over 5 Years",
      excerpt: "How switching from a big bank to a better rate saved this family thousands at renewal time",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      region: "Canada",
      savings: "$89,000 saved",
    },
    {
      title: "US Market Entry: Canadian Investor's Success Story",
      excerpt: "Navigating cross-border financing to purchase rental properties in Florida",
      date: "Dec 10, 2024",
      readTime: "9 min read",
      region: "USA",
      savings: "$56,000 saved",
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
          <h1 className="text-4xl font-bold mb-4">Client Success Stories</h1>
          <p className="text-xl text-gray-600">
            Real client stories showcasing how we've helped people achieve their mortgage and investment goals
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Case Study
                  </Badge>
                  <Badge variant="outline" className="border-gray-300 text-gray-600">
                    {study.region}
                  </Badge>
                  <Badge variant="outline" className="border-green-300 text-green-600 bg-green-50">
                    {study.savings}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {study.date} • {study.readTime}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 hover:text-primary cursor-pointer">
                <a href={index === 0 ? "/blog/case-studies/from-rejection-to-approval" : "#"}>{study.title}</a>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{study.excerpt}</p>
              <Button variant="outline" size="sm" asChild>
                <a href={index === 0 ? "/blog/case-studies/from-rejection-to-approval" : "#"}>
                  Read Case Study
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
