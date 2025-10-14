import { sanityFetch } from '@/lib/sanity'

export interface BlogPost {
  _id: string
  title: { en: string }
  subtitle?: { en: string }
  slug: { current: string }
  category: string
  region: string
  content: { en: any[] }
  coverPhoto?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  publishedAt: string
  author?: string
}

export async function getAllBlogPosts(locale: string = 'en') {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    category,
    region,
    content,
    coverPhoto {
      asset-> {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    author
  }`
  
  return sanityFetch<BlogPost[]>(query)
}

export async function getBlogPostBySlug(slug: string, locale: string = 'en') {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    category,
    region,
    content,
    coverPhoto {
      asset-> {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    author
  }`
  
  return sanityFetch<BlogPost>(query, { slug })
}

export async function getBlogPostsByCategory(category: string, locale: string = 'en') {
  const query = `*[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    category,
    region,
    coverPhoto {
      asset-> {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    author
  }`
  
  return sanityFetch<BlogPost[]>(query, { category })
}

export async function getBlogPostsByRegion(region: string, locale: string = 'en') {
  const query = `*[_type == "blogPost" && region == $region] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    category,
    region,
    coverPhoto {
      asset-> {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    author
  }`
  
  return sanityFetch<BlogPost[]>(query, { region })
}

export async function getLatestBlogPosts(limit: number = 6, locale: string = 'en') {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    subtitle,
    slug,
    category,
    region,
    coverPhoto {
      asset-> {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    author
  }`
  
  return sanityFetch<BlogPost[]>(query)
}

// Helper function to format category for display
export function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'news': 'News',
    'videos': 'Videos',
    'buying-tips': 'Buying Tips',
    'investing': 'Investing',
    'rates': 'Rates',
    'case-studies': 'Case Studies',
  }
  
  return categoryMap[category] || category
}

// Helper function to format region for display
export function formatRegion(region: string): string {
  const regionMap: Record<string, string> = {
    'global': 'Global',
    'canada': 'Canada',
    'uae': 'UAE',
    'usa': 'USA',
  }
  
  return regionMap[region] || region
}

// Helper function to calculate read time
export function calculateReadTime(content: any[]): string {
  if (!content || content.length === 0) return '1 min read'
  
  const wordsPerMinute = 200
  let totalWords = 0
  
  content.forEach(block => {
    if (block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          totalWords += child.text.split(/\s+/).length
        }
      })
    }
  })
  
  const minutes = Math.ceil(totalWords / wordsPerMinute)
  return `${minutes} min read`
}

// Helper function to get object-position from hotspot data
export function getImagePosition(hotspot?: { x: number; y: number }): string {
  if (!hotspot) return 'center'
  
  // Convert Sanity hotspot (0-1 range) to CSS percentage
  const x = Math.round(hotspot.x * 100)
  const y = Math.round(hotspot.y * 100)
  
  return `${x}% ${y}%`
}

