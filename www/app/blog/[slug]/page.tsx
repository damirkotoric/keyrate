import { notFound } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { getBlogPostBySlug, getAllBlogPosts, formatCategory, formatRegion, calculateReadTime, getImagePosition } from '@/lib/queries/blog'
import { renderPortableText } from '@/lib/portableText'
import { Breadcrumbs } from '@/components/breadcrumbs'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  // Use SEO title if available, otherwise fall back to post title
  const seoTitle = post.seo?.title?.en || post.title.en
  const seoDescription = post.seo?.description?.en || post.subtitle?.en || post.title.en
  
  // Generate OG image URL with 1.91:1 aspect ratio (e.g., 1200x628 for optimal OG image)
  const ogImageUrl = post.coverPhoto?.asset?.url 
    ? `${post.coverPhoto.asset.url}?w=1200&h=628&fit=crop&crop=focalpoint${
        post.coverPhoto.hotspot 
          ? `&fp-x=${post.coverPhoto.hotspot.x}&fp-y=${post.coverPhoto.hotspot.y}` 
          : ''
      }`
    : null
  
  return {
    title: `${seoTitle} | KeyRate Mortgage Broker`,
    description: seoDescription,
    openGraph: {
      title: post.title.en,
      description: post.subtitle?.en || post.title.en,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: ogImageUrl ? [
        {
          url: ogImageUrl,
          width: 1200,
          height: 628,
          alt: post.coverPhoto?.alt || post.title.en,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.en,
      description: post.subtitle?.en || post.title.en,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
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
    if (post.coverPhoto?.asset?.url) {
      return post.coverPhoto.asset.url
    }
    return "/placeholder.svg?height=400&width=1200"
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Article Header */}
      <article className="container mx-auto px-4 pb-16 pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs 
            items={[
              { label: 'Blog', href: '/blog' }
            ]}
          />
        
          {/* Meta */}
          <div className="flex gap-2 mb-4">
            <Badge variant="outline">
              {formatCategory(post.category)}
            </Badge>
            <Badge variant="outline">
              {formatRegion(post.region)}
            </Badge>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title.en}
          </h1>
          
          {/* Subtitle */}
          {post.subtitle?.en && (
            <p className="text-xl text-muted-foreground mb-6">
              {post.subtitle.en}
            </p>
          )}
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span>•</span>
            <span>{calculateReadTime(post.content?.en || [])}</span>
            {post.author && (
              <>
                <span>•</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>
          
          {/* Cover Image */}
          {post.coverPhoto && (
            <div className="relative mb-8 rounded-lg overflow-hidden">
              <img
                src={getImageUrl()}
                alt={post.coverPhoto.alt || post.title.en}
                className="w-full h-auto"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {renderPortableText(post.content?.en)}
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  )
}

