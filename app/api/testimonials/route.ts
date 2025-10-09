import { sanityFetch } from "@/lib/sanity"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Query up to 50 testimonials from Sanity
    const results = await sanityFetch<any[]>(
      `*[_type == "testimonial"] | order(_createdAt asc)[0...50]{
        "testimonial": quote,
        "author": authorName,
        "role": authorTitle
      }`
    )
    const items = (results || [])
      .map((s: any) => ({
        testimonial: s?.testimonial,
        author: s?.author,
        role: s?.role,
      }))
      .filter((i: any) => typeof i.testimonial === 'string' && i.testimonial.trim().length > 0)
    return Response.json({ items, count: items.length })
  } catch (e: any) {
    const payload = {
      error: true,
      message: e?.message || "Failed to load testimonials",
      hint: "Check SANITY env vars (projectId, dataset, token) and that testimonial documents exist.",
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
      hasToken: Boolean(process.env.SANITY_READ_TOKEN && process.env.SANITY_READ_TOKEN.length > 0),
    }
    return new Response(JSON.stringify(payload), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}


