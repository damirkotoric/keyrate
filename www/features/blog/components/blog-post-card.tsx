import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  _id: string
  title: { en: string }
  subtitle?: { en?: string }
  slug: { current: string }
  category: string
  region?: string
  publishedAt: string
  coverPhoto?: {
    asset: { url: string }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  content?: { en?: any[] }
}

interface BlogPostCardProps {
  post: BlogPost
}

function formatCategory(category: string): string {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function formatRegion(region?: string): string {
  if (!region) return 'Global'
  return region.charAt(0).toUpperCase() + region.slice(1).toLowerCase()
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

function calculateReadTime(content: any[]): string {
  if (!content || content.length === 0) return '5 min read'
  
  const text = content
    .filter((block: any) => block._type === 'block')
    .map((block: any) => 
      block.children
        ?.filter((child: any) => child._type === 'span')
        .map((child: any) => child.text)
        .join(' ')
    )
    .join(' ')
  
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  
  return `${minutes} min read`
}

function getImageUrl(post: BlogPost): string {
  if (post.coverPhoto?.asset?.url) {
    return post.coverPhoto.asset.url
  }
  return "/placeholder.svg?height=200&width=400"
}

function getImagePosition(hotspot?: { x: number; y: number }): string {
  if (!hotspot) return 'center'
  const x = Math.round(hotspot.x * 100)
  const y = Math.round(hotspot.y * 100)
  return `${x}% ${y}%`
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link key={post._id} href={`/blog/${post.slug.current}`}>
      <article className="py-6 border-b last:border-b-0 hover:bg-muted/50 transition-colors -mx-4 px-4 rounded-lg cursor-pointer">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {post.coverPhoto && (
            <div className="w-full sm:w-48 sm:flex-shrink-0 sm:order-2">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={getImageUrl(post)}
                  alt={post.coverPhoto.alt || post.title.en}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: getImagePosition(post.coverPhoto.hotspot) }}
                />
              </div>
            </div>
          )}
          <div className="flex-1 sm:order-1">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-1">
              <div className="flex gap-2">
                <Badge variant="outline">
                  {formatCategory(post.category)}
                </Badge>
                <Badge variant="outline">
                  {formatRegion(post.region)}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDate(post.publishedAt)} • {calculateReadTime(post.content?.en || [])}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 hover:text-accent transition-colors">
              {post.title.en}
            </h3>
            {post.subtitle?.en && (
              <p className="text-muted-foreground line-clamp-2">{post.subtitle.en}</p>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

