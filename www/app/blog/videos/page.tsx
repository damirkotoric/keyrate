import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardCover } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play } from '@/components/icons'
import { getAllVideos, getYouTubeEmbedUrl } from '@/lib/queries/videos'
import { Breadcrumbs } from '@/components/breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Library | KeyRate Mortgage Broker',
  description: 'Watch our collection of mortgage advice videos and educational content.',
}

export default async function VideosPage() {
  const videos = await getAllVideos()
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex justify-center mb-6">
            <Breadcrumbs 
              items={[
                { label: 'Blog', href: '/blog' }
              ]}
            />
          </div>
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Library</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch our educational videos to learn about mortgages, buying tips, and market insights.
            </p>
          </div>
          
          {/* Videos Grid */}
          {videos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => {
                const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl)
                
                return (
                  <Card key={video._id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
      </div>
      
      <Footer />
    </div>
  )
}

