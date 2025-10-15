import { sanityFetch } from '@/lib/sanity'

export interface Video {
  _id: string
  title: { en: string }
  slug: { current: string }
  youtubeUrl: string
  publishedAt: string
  featured?: boolean
  seo?: {
    title?: any
    description?: any
  }
}

export async function getAllVideos(locale: string = 'en') {
  const query = `*[_type == "video"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    youtubeUrl,
    publishedAt,
    featured,
    seo
  }`
  
  return sanityFetch<Video[]>(query)
}

export async function getVideoBySlug(slug: string, locale: string = 'en') {
  const query = `*[_type == "video" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    youtubeUrl,
    publishedAt,
    featured,
    seo
  }`
  
  return sanityFetch<Video>(query, { slug })
}

export async function getFeaturedVideos(limit: number = 3, locale: string = 'en') {
  const query = `*[_type == "video" && featured == true] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    youtubeUrl,
    publishedAt,
    featured
  }`
  
  return sanityFetch<Video[]>(query)
}

// Helper function to extract YouTube video ID from URL
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  
  // Handle youtube.com/watch?v=xxxxx
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) return watchMatch[1]
  
  // Handle youtu.be/xxxxx
  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) return shortMatch[1]
  
  // Handle youtube.com/embed/xxxxx
  const embedMatch = url.match(/youtube\.com\/embed\/([^?]+)/)
  if (embedMatch) return embedMatch[1]
  
  return null
}

// Helper function to get YouTube thumbnail URL
export function getYouTubeThumbnail(url: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'maxres'): string | null {
  const videoId = getYouTubeVideoId(url)
  if (!videoId) return null
  
  const qualityMap = {
    'default': 'default',
    'mq': 'mqdefault',
    'hq': 'hqdefault',
    'sd': 'sddefault',
    'maxres': 'maxresdefault',
  }
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`
}

// Helper function to get YouTube embed URL
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url)
  if (!videoId) return null
  
  return `https://www.youtube.com/embed/${videoId}`
}


