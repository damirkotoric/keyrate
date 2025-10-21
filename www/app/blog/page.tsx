import { cookies } from "next/headers"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardCover } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight } from "@/components/icons"
import Header from "@features/marketing/components/layout/header"
import Footer from "@features/marketing/components/layout/footer"
import BlogPageClient from "@features/blog/components/blog-page-client"
import InstagramSection from "@features/marketing/components/sections/instagram-section"
import { GuideCard } from "@features/guides/components/guide-card"
import { getAllBlogPosts } from "@features/blog/lib/queries"
import { getFeaturedGuides } from "@features/guides/lib/queries"
import { getFeaturedVideos, getYouTubeEmbedUrl } from "@/lib/queries/videos"
import { LOCALE_COOKIE, normalizeLocaleParam, type AppLocale } from "@/lib/locale"
import type { Metadata } from 'next'

// Map locale to blog region
function localeToRegion(locale: AppLocale): string | null {
  const mapping: Record<AppLocale, string | null> = {
    'ca': 'canada',
    'ae': 'uae',
    'us': 'usa',
    'global': null, // null means show all regions
  }
  return mapping[locale] || null
}

export const metadata: Metadata = {
  title: 'Blog | KeyRate Mortgage Broker',
  description: 'Read the latest mortgage news, tips, and insights from KeyRate Mortgage experts.',
}

export default async function BlogPage({ params }: { params?: Promise<{ loc?: string }> }) {
  // Get locale - either from URL param (for /ca/blog) or from cookies (for /blog)
  const resolvedParams = params ? await params : undefined
  const urlLocale = resolvedParams?.loc
  
  const cookieStore = await cookies()
  const locale: AppLocale = urlLocale 
    ? normalizeLocaleParam(urlLocale)
    : (normalizeLocaleParam(cookieStore.get(LOCALE_COOKIE)?.value) || 'global')

  // Get all posts (we'll let the client handle filtering based on initial region)
  const posts = await getAllBlogPosts()
  
  // Get featured guides
  const guides = await getFeaturedGuides(4)
  
  // Get featured videos
  const videos = await getFeaturedVideos(3)
  
  // Get the region filter to pass as initial state to client
  const regionFilter = localeToRegion(locale)

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



  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{"Think Like a Mortgage Insider"}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-0">
            Real-world advice, rate updates, videos, guides & more.
          </p>
        </div>
      </section>

      {/* Latest Posts */}
      <BlogPageClient posts={posts} initialRegion={regionFilter || 'all'} locale={locale} />

      {/* Guides & Free Downloads */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Guides & Free Downloads</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Comprehensive resources to help you make informed mortgage decisions.
            </p>
            <Button variant="outline" asChild>
              <Link href="/guides">
                View All Guides
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          {guides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No guides available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Videos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Watch & Learn</h2>
            <p className="text-xl text-muted-foreground mb-6">Educational videos to help you understand mortgages better.</p>
            <Button variant="outline" asChild>
              <Link href="/videos">
                View All Videos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          {videos.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {videos.map((video) => {
                const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl)
                
                return (
                  <Card key={video._id} className="overflow-hidden transition-shadow">
                    <CardCover>
                      <div className="aspect-video relative">
                        <iframe
                          src={embedUrl || undefined}
                          title={video.title.en}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </CardCover>
                    <CardContent className="p-4">
                      <h3 className="font-bold">{video.title.en}</h3>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* From Instagram */}
      <InstagramSection />

      <Footer />
    </div>
  )
}
