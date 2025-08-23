"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NewsPage() {
  const newsArticles = [
    {
      date: "2025-07-30",
      title: "Young families are shrinking their mortgages. But does this mean they are priced out?",
      excerpt:
        "Analysis of how younger demographics are adapting their mortgage strategies in response to market conditions.",
      readTime: "4 min read",
    },
    {
      date: "2025-07-30",
      title: "July 30, 2025 - Bank of Canada holds policy rate at 2.75%",
      excerpt: "The central bank maintains its current stance amid economic uncertainty and inflation concerns.",
      readTime: "3 min read",
    },
    {
      date: "2025-07-28",
      title: "Bank of Canada expected to hold interest rates steady for the third time",
      excerpt: "Market analysts predict continued rate stability as economic indicators remain mixed.",
      readTime: "3 min read",
    },
    {
      date: "2025-07-17",
      title: "How the 'Bank of Mom and Dad' has become essential for homebuying",
      excerpt: "Family financial support increasingly necessary for first-time homebuyers in today's market.",
      readTime: "5 min read",
    },
    {
      date: "2025-06-09",
      title: "Who is the typical first-time home buyer in Canada and how much money do they need?",
      excerpt: "Comprehensive analysis of first-time buyer demographics and financial requirements.",
      readTime: "6 min read",
    },
    {
      date: "2025-06-04",
      title: "Bank of Canada holds policy rate at 2.75%",
      excerpt: "Continued monetary policy stability as the central bank monitors economic conditions.",
      readTime: "2 min read",
    },
    {
      date: "2025-04-16",
      title: "April 16 - 2025 - Bank of Canada holds policy rate at 2.75%",
      excerpt: "Another month of rate stability as the Bank of Canada maintains its cautious approach.",
      readTime: "3 min read",
    },
    {
      date: "2025-03-12",
      title: "March 12-2025 - Bank of Canada reduces policy rate by 25 basis points to 2.75%",
      excerpt: "First rate cut of the year signals shift in monetary policy direction.",
      readTime: "4 min read",
    },
    {
      date: "2025-03-01",
      title: "Bank of Canada will freeze rates at 2.75% if Trump imposes blanket tariffs, say economists",
      excerpt: "Economic experts weigh in on potential policy responses to trade policy changes.",
      readTime: "5 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <a href="/blog" className="text-gray-600 hover:text-primary">
                Back to Blog
              </a>
            </Button>
          </div>
          <div className="text-center">
            <Badge className="bg-primary text-white mb-4">News</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest News & Updates</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest mortgage industry news, rate updates, and market insights.
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {newsArticles.map((article, index) => (
                <article
                  key={index}
                  className="py-8 border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors -mx-4 px-4 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      News
                    </Badge>
                    <div className="text-sm text-gray-500">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      • {article.readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 hover:text-primary cursor-pointer">{article.title}</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                  <Button variant="outline" size="sm">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Load More News
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
