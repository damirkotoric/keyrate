import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@features/marketing/components/layout/header'
import Footer from '@features/marketing/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getVideoBySlug, getAllVideos, getYouTubeEmbedUrl } from '@/lib/queries/videos'
import { Breadcrumbs } from '@features/marketing/components/layout/breadcrumbs'

interface VideoPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all videos
export async function generateStaticParams() {
  const videos = await getAllVideos()
  
  return videos.map((video) => ({
    slug: video.slug.current,
  }))
}

export async function generateMetadata({ params }: VideoPageProps) {
  const { slug } = await params
  const video = await getVideoBySlug(slug)
  
  if (!video) {
    return {
      title: 'Video Not Found',
    }
  }
  
  // Use SEO title if available, otherwise fall back to video title
  const seoTitle = video.seo?.title?.en || video.title.en
  const seoDescription = video.seo?.description?.en || video.title.en
  
  return {
    title: `${seoTitle} | KeyRate Mortgage Broker`,
    description: seoDescription,
    openGraph: {
      title: video.title.en,
      description: video.title.en,
      type: 'video.other',
      videos: video.youtubeUrl ? [video.youtubeUrl] : undefined,
    },
    twitter: {
      card: 'player',
      title: video.title.en,
      description: video.title.en,
    },
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params
  const video = await getVideoBySlug(slug)
  
  if (!video) {
    notFound()
  }
  
  const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl)
  
  if (!embedUrl) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-muted-foreground">Invalid YouTube URL</p>
        </div>
        <Footer />
      </div>
    )
  }
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Article/Video Container */}
      <article className="container mx-auto px-4 pb-16 pt-16">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: 'Videos', href: '/videos' }
            ]}
          />
        
          {/* Meta */}
          <div className="flex gap-2 mb-4">
            <Badge variant="outline">Video</Badge>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {video.title.en}
          </h1>
          
          {/* YouTube Video Embed */}
          <div className="aspect-video relative mb-8 rounded-lg overflow-hidden bg-black">
            <iframe
              src={embedUrl}
              title={video.title.en}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          
          {/* Watch on YouTube */}
          <div className="flex justify-center mb-8">
            <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                Watch on YouTube
              </Button>
            </a>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  )
}

