// lib/sanity.server.ts (no "use client")
import { createClient } from '@sanity/client'

const projectId =
  process.env.SANITY_API_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!

const dataset =
  process.env.SANITY_API_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'
const token = process.env.SANITY_API_READ_TOKEN // server-side only

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  // never use CDN when a token is present (private/authorized fetches)
  useCdn: !token && process.env.NODE_ENV === 'production',
  token: token || undefined,
  perspective: 'published',
})

export async function sanityFetch<T>(query: string): Promise<T>
export async function sanityFetch<T>(query: string, params: Record<string, any>): Promise<T>
export async function sanityFetch<T>(query: string, params?: Record<string, any>): Promise<T> {
  try {
    if (params) {
      return await sanity.fetch<T>(query, params)
    }
    return await sanity.fetch<T>(query)
  } catch (err: any) {
    const reason = err?.message || String(err)
    throw new Error(
      `Failed to fetch from Sanity. Cause: ${reason}. Check SANITY env vars (projectId=${projectId}, dataset=${dataset}).`
    )
  }
}
