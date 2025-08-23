"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Play, Download, ArrowRight, Instagram } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All categories")
  const [selectedRegion, setSelectedRegion] = useState("All regions")

  const categories = ["All categories", "News", "Videos", "Buying Tips", "Investing", "Rates", "Case Studies"]
  const regions = ["All regions", "Global", "Canada", "UAE", "USA"]

  const featuredContent = [
    {
      tag: "Guide",
      title: "Complete First-Time Buyer's Guide 2025",
      hook: "Everything you need to know about buying your first home",
      cta: "Download",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      tag: "Video",
      title: "5 Mortgage Mistakes That Cost You Thousands",
      hook: "Avoid these common pitfalls when getting a mortgage",
      cta: "Watch",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      tag: "Article",
      title: "2025 Rate Predictions: What Experts Say",
      hook: "Industry insights on where mortgage rates are heading",
      cta: "Read",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const latestPosts = [
    {
      category: "Rates",
      region: "Canada",
      title: "Bank of Canada Holds Rates Steady in January",
      excerpt: "What this means for your mortgage renewal and new applications",
      date: "Jan 15, 2025",
      readTime: "3 min read",
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      category: "Buying Tips",
      region: "Global",
      title: "Pre-Approval vs Pre-Qualification: Know the Difference",
      excerpt: "Understanding these terms can save you time and strengthen your offer",
      date: "Jan 12, 2025",
      readTime: "5 min read",
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      category: "Buying Tips",
      region: "UAE",
      title: "Dubai Property Market Update: Q1 2025",
      excerpt: "Latest trends and opportunities in Dubai's real estate market",
      date: "Jan 10, 2025",
      readTime: "4 min read",
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      category: "Investing",
      region: "Global",
      title: "Building Wealth Through Real Estate Investment",
      excerpt: "Strategies for growing your property portfolio in 2025",
      date: "Jan 8, 2025",
      readTime: "6 min read",
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      category: "Rates",
      region: "Canada",
      title: "New Mortgage Rules: What Changed in 2025",
      excerpt: "Recent regulatory updates affecting Canadian homebuyers",
      date: "Jan 5, 2025",
      readTime: "4 min read",
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      category: "Investing",
      region: "USA",
      title: "US Market Entry: What Canadian Investors Need to Know",
      excerpt: "Cross-border investment opportunities and considerations",
      date: "Jan 3, 2025",
      readTime: "7 min read",
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
  ]

  const guides = [
    {
      title: "First-Time Buyer Guide",
      description: "Complete roadmap to homeownership",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      title: "Mortgage Renewal Tips",
      description: "Maximize savings at renewal time",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      title: "Refinancing Mistakes to Avoid",
      description: "Common pitfalls and how to avoid them",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      title: "Investment Property Financing",
      description: "Build wealth through real estate",
      image: "/placeholder.svg?height=150&width=200",
    },
  ]

  const videos = [
    {
      title: "Mortgage Pre-Approval Process Explained",
      duration: "8:32",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      title: "Fixed vs Variable Rates: Which is Better?",
      duration: "6:15",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      title: "How to Improve Your Credit Score Fast",
      duration: "5:47",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
  ]

  const filteredPosts = latestPosts.filter((post) => {
    const categoryMatch = selectedCategory === "All categories" || post.category === selectedCategory
    const regionMatch = selectedRegion === "All regions" || post.region === selectedRegion
    return categoryMatch && regionMatch
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{"Think Like a Mortgage Insider"}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-0">
            Real-world advice, rate updates, videos, guides & more.
          </p>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {featuredContent.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">{item.tag}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.hook}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    {item.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h2 className="text-3xl font-bold mb-4 sm:mb-0">Latest Posts</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div>
                    <label htmlFor="category-select" className="sr-only">
                      Categories
                    </label>
                    <select
                      id="category-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-w-[140px]"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="region-select" className="sr-only">
                      Region
                    </label>
                    <select
                      id="region-select"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-w-[120px]"
                    >
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <article
                    key={index}
                    className="py-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors -mx-4 px-4 rounded-lg cursor-pointer"
                  >
                    <div className="flex gap-6 items-start">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {post.category}
                            </Badge>
                            <Badge variant="outline" className="border-gray-300 text-gray-600">
                              {post.region}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {post.date} • {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-gray-600">{post.excerpt}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <img
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          className="w-40 h-30 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Show All Button */}
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="px-8 bg-transparent">
                  Show All Posts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* Search */}
              <Card className="p-6 bg-white px-0 py-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search blog..." className="p-6 pl-10" />
                </div>
              </Card>

              {/* Newsletter Signup */}
              <Card className="p-6 bg-primary text-white">
                <h3 className="text-lg font-bold mb-0">Subscribe for Free Mortgage Strategies</h3>
                <p className="text-white/90 text-sm -mt-1 mb-4">
                  Get insider tips, rate updates, and exclusive guides delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Your email address" className="bg-white text-black border-white" />
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">Subscribe Now</Button>
                </div>
              </Card>

              <div>
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.slice(1).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="block w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Regions</h3>
                <div className="space-y-1">
                  {regions.slice(1).map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className="block w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary"
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides & Free Downloads */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Guides & Free Downloads</h2>
            <p className="text-xl text-gray-600">
              Comprehensive resources to help you make informed mortgage decisions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative">
                  <img
                    src={guide.image || "/placeholder.svg"}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">{guide.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                  </div>
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Videos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Watch & Learn</h2>
            <p className="text-xl text-gray-600">Educational videos to help you understand mortgages better</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative group cursor-pointer">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-4 right-4 bg-black/70 text-white">{video.duration}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">{video.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* From Instagram */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Follow Our Journey @keyrate</h2>
            <p className="text-xl text-gray-600">Behind-the-scenes content, tips, and client success stories</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={`/placeholder.svg?height=300&width=300&query=instagram post ${item}`}
                    alt={`Instagram post ${item}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Instagram className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              <Instagram className="w-5 h-5 mr-2" />
              See More on Instagram
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
