import { strapiFetch } from "@/lib/strapi"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const res = await strapiFetch<{ data: Array<{ attributes: { quote: string; name: string; caption: string } }> }>(
      "/api/testimonials?pagination[pageSize]=50&publicationState=live&sort=id:asc"
    )
    const items = res.data.map((t) => ({
      testimonial: t.attributes.quote,
      author: t.attributes.name,
      role: t.attributes.caption,
    }))
    return Response.json({ items })
  } catch (e: any) {
    const payload = {
      error: true,
      message: e?.message || "Failed to load testimonials",
      hint: "Check STRAPI_URL and STRAPI_API_TOKEN env vars. Also ensure /api/testimonials collection exists and is published.",
      url: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
      hasToken: Boolean(process.env.STRAPI_API_TOKEN && process.env.STRAPI_API_TOKEN.length > 0),
    }
    return new Response(JSON.stringify(payload), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}


