import { notFound } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { getGuideBySlug, getAllGuides } from '@/lib/queries/guides'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { GuideDownloadForm } from '@/components/guide-download-form'
import { GetInTouchSection } from '@/components/get-in-touch-section'

interface GuidePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all guides
export async function generateStaticParams() {
  const guides = await getAllGuides()
  
  return guides.map((guide) => ({
    slug: guide.slug.current,
  }))
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)
  
  if (!guide) {
    return {
      title: 'Guide Not Found',
    }
  }
  
  // Use SEO title if available, otherwise fall back to guide title
  const seoTitle = guide.seo?.title?.en || guide.title.en
  const seoDescription = guide.seo?.description?.en || guide.subtitle?.en || guide.title.en
  
  // Generate OG image URL with 1.91:1 aspect ratio (e.g., 1200x628 for optimal OG image)
  const ogImageUrl = guide.coverImage?.asset?.url 
    ? `${guide.coverImage.asset.url}?w=1200&h=628&fit=crop&crop=focalpoint${
        guide.coverImage.hotspot 
          ? `&fp-x=${guide.coverImage.hotspot.x}&fp-y=${guide.coverImage.hotspot.y}` 
          : ''
      }`
    : null
  
  return {
    title: `${seoTitle} | KeyRate Mortgage Broker`,
    description: seoDescription,
    openGraph: {
      title: guide.title.en,
      description: guide.subtitle?.en || guide.title.en,
      type: 'article',
      images: ogImageUrl ? [
        {
          url: ogImageUrl,
          width: 1200,
          height: 628,
          alt: guide.coverImage?.alt || guide.title.en,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title.en,
      description: guide.subtitle?.en || guide.title.en,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)
  
  if (!guide) {
    notFound()
  }
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  
  function getImageUrl(): string {
    if (guide.coverImage?.asset?.url) {
      return guide.coverImage.asset.url
    }
    return "/placeholder.svg?height=400&width=1200"
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Guide Header */}
      <article className="container mx-auto px-4 pb-16 pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs 
            items={[
              { label: 'Guides', href: '/guides' }
            ]}
          />
        
          {/* Meta */}
          {guide.region && (
            <div className="flex gap-2 mb-4">
              <Badge variant="outline">
                {guide.region.charAt(0).toUpperCase() + guide.region.slice(1)}
              </Badge>
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {guide.title.en}
          </h1>
          
          {/* Subtitle */}
          {guide.subtitle?.en && (
            <p className="text-xl text-muted-foreground mb-6">
              {guide.subtitle.en}
            </p>
          )}
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <time dateTime={guide.publishedAt}>
              {formatDate(guide.publishedAt)}
            </time>
          </div>
          
          {/* Cover Image */}
          {guide.coverImage && (
            <div className="relative mb-8 rounded-lg overflow-hidden">
              <img
                src={getImageUrl()}
                alt={guide.coverImage.alt || guide.title.en}
                className="w-full h-auto"
              />
            </div>
          )}
          
          {/* Download CTA */}
          {guide.pdfFile?.asset?.url && (
            <GuideDownloadForm 
              guideTitle={guide.title.en}
              pdfUrl={guide.pdfFile.asset.url}
            />
          )}
          
        </div>
      </article>

      <GetInTouchSection />
      
      <Footer />
    </div>
  )
}

