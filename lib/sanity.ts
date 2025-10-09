import { createClient } from "@sanity/client"

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "").trim()
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production").trim()
const apiVersion = (process.env.SANITY_API_VERSION || "2023-10-01").trim()
const token = (process.env.SANITY_READ_TOKEN || "").trim()

if (!projectId) {
  throw new Error(
    "SANITY projectId is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID."
  )
}

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: token || undefined,
})

export async function sanityFetch<T = any>(query: string, params?: Record<string, unknown>) {
  try {
    return await sanity.fetch<T>(query, params)
  } catch (err: any) {
    const reason = err?.message || String(err)
    throw new Error(
      `Failed to fetch from Sanity. Cause: ${reason}. Check SANITY env vars (projectId=${projectId}, dataset=${dataset}).`
    )
  }
}


