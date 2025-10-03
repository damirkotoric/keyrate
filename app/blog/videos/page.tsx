import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Clock, Eye } from "@/components/icons"

const videoContent = [
  {
    id: 1,
    title: "2025 Mortgage Market Outlook: What Borrowers Need to Know",
    description: "Danny Ibrahim discusses key trends and predictions for the Canadian mortgage market in 2025.",
    date: "2025-01-15",
    duration: "12:45",
    views: "2.1K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 2,
    title: "First-Time Home Buyer Guide: Step-by-Step Process",
    description: "Complete walkthrough of the home buying process for first-time buyers in Canada and UAE.",
    date: "2025-01-10",
    duration: "18:30",
    views: "3.5K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 3,
    title: "Understanding Mortgage Pre-Approval: Benefits and Process",
    description: "Learn why pre-approval is crucial and how to get approved faster with KeyRate.",
    date: "2025-01-05",
    duration: "8:15",
    views: "1.8K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 4,
    title: "Investment Property Financing in Dubai: Complete Guide",
    description: "Expert insights on financing investment properties in the UAE market.",
    date: "2024-12-28",
    duration: "15:20",
    views: "4.2K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 5,
    title: "Mortgage Renewal Strategies: Don't Auto-Renew",
    description: "Why you should shop around at renewal time and how to negotiate better rates.",
    date: "2024-12-20",
    duration: "10:45",
    views: "2.7K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 6,
    title: "Self-Employed Mortgage Solutions: Getting Approved",
    description: "Special considerations and documentation needed for self-employed borrowers.",
    date: "2024-12-15",
    duration: "14:30",
    views: "1.9K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 7,
    title: "Client Success Story: Cross-Border Financing",
    description: "How we helped a Canadian family secure financing for their Dubai property investment.",
    date: "2024-12-10",
    duration: "6:45",
    views: "1.2K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 8,
    title: "Interest Rate Trends: What's Coming in 2025",
    description: "Analysis of current rate environment and predictions for the coming year.",
    date: "2024-12-05",
    duration: "11:20",
    views: "3.1K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
]

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <a href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </a>
            </Button>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-black mb-4">Video Library</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Watch our expert mortgage advice, market insights, and client success stories. Get the knowledge you need
              to make informed mortgage decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoContent.map((video) => (
              <Card key={video.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-t-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>
                      {new Date(video.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views} views
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-black mb-3 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">Load More Videos</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
