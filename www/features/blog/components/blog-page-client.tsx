"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "@/components/icons"
import { formatCategory, formatRegion, type BlogPost } from "@features/blog/lib/queries"
import { BlogPostCard } from "@features/blog/components/blog-post-card"

interface BlogPageClientProps {
  posts: BlogPost[]
  initialRegion?: string
  locale?: string
}

export default function BlogPageClient({ posts, initialRegion = 'all', locale = 'global' }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All categories")
  
  // Set initial region based on locale
  const getInitialRegion = () => {
    if (initialRegion === 'canada') return 'Canada'
    if (initialRegion === 'uae') return 'UAE'
    if (initialRegion === 'usa') return 'USA'
    return 'All regions'
  }
  
  const [selectedRegion, setSelectedRegion] = useState(getInitialRegion())
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All categories", "News", "Buying Tips", "Investing", "Rates", "Case Studies"]
  const regions = ["All regions", "Global", "Canada", "UAE", "USA"]

  const filteredPosts = posts.filter((post) => {
    const categoryMatch = selectedCategory === "All categories" || formatCategory(post.category) === selectedCategory
    const regionMatch = selectedRegion === "All regions" || formatRegion(post.region) === selectedRegion
    const searchMatch = searchQuery === "" || 
      post.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle?.en?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return categoryMatch && regionMatch && searchMatch
  })


  return (
    <>
      {/* Latest Posts */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h2 className="text-3xl font-bold mb-4 sm:mb-0">Latest Posts</h2>
                <div className="flex flex-row gap-4">
                  <div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="min-w-[140px]">
                        <SelectValue placeholder="Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="min-w-[120px]">
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No posts found matching your filters.
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <BlogPostCard key={post._id} post={post} />
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* Search */}
              <Card className="p-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search blog..." 
                    className="p-6 pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </Card>

              {/* Newsletter Signup */}
              <Card className="p-6 bg-primary text-primary-foreground">
                <div className="flex flex-col gap-2 mb-6">
                  <h3 className="text-lg font-bold mb-0">Subscribe for Free Mortgage Strategies</h3>
                  <p className="text-primary-foreground/90 text-sm">
                    Get insider tips, rate updates, and exclusive guides delivered to your inbox.
                  </p>
                </div>
                <div className="space-y-3">
                  <Input placeholder="Your email address" />
                  <Button variant="secondary" className="w-full">Subscribe Now</Button>
                </div>
              </Card>

              <div>
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-muted transition-colors ${
                        selectedCategory === category 
                          ? 'bg-muted text-accent' 
                          : 'text-foreground hover:text-accent'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Regions</h3>
                <div className="space-y-1">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-muted transition-colors ${
                        selectedRegion === region 
                          ? 'bg-muted text-accent' 
                          : 'text-foreground hover:text-accent'
                      }`}
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
    </>
  )
}

