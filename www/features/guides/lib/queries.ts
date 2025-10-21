import { sanityFetch } from '@/lib/sanity'

export interface Guide {
  _id: string
  title: { en: string }
  subtitle: { en: string }
  slug: { current: string }
  region?: string
  coverImage?: {
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
  pdfFile?: {
    asset: {
      _ref: string
      url: string
      originalFilename?: string
      size?: number
    }
  }
  publishedAt: string
  featured?: boolean
  seo?: {
    title?: any
    description?: any
  }
}

export async function getAllGuides(locale: string = 'en') {
  const query = `*[_type == "guide"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    region,
    coverImage {
      asset-> {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    pdfFile {
      asset-> {
        _ref,
        url,
        originalFilename,
        size
      }
    },
    publishedAt,
    featured,
    seo
  }`
  
  return sanityFetch<Guide[]>(query)
}

export async function getGuideBySlug(slug: string, locale: string = 'en') {
  const query = `*[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    region,
    coverImage {
      asset-> {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    pdfFile {
      asset-> {
        _ref,
        url,
        originalFilename,
        size
      }
    },
    publishedAt,
    featured,
    seo
  }`
  
  return sanityFetch<Guide>(query, { slug })
}

export async function getFeaturedGuides(limit: number = 4, locale: string = 'en') {
  const query = `*[_type == "guide" && featured == true] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    subtitle,
    slug,
    region,
    coverImage {
      asset-> {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    pdfFile {
      asset-> {
        _ref,
        url,
        originalFilename,
        size
      }
    },
    publishedAt,
    featured
  }`
  
  return sanityFetch<Guide[]>(query)
}

// Helper function to format file size
export function formatFileSize(bytes?: number): string {
  if (!bytes) return ''
  
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}

