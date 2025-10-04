import { strapiFetch } from "@/lib/strapi"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const res = await strapiFetch<any>(
      "/api/testimonials?pagination[pageSize]=50&publicationState=live&sort=id:asc"
    )
    if (!res || !res.data) {
      return new Response(
        JSON.stringify({ error: true, message: "Unexpected Strapi response: missing data", raw: res }),
        { status: 500, headers: { "content-type": "application/json" } }
      )
    }
    if (!Array.isArray(res.data)) {
      return new Response(
        JSON.stringify({ error: true, message: "Unexpected Strapi response: data is not an array", rawKeys: Object.keys(res), rawDataType: typeof res.data, rawData: res.data }),
        { status: 500, headers: { "content-type": "application/json" } }
      )
    }
    const first = res.data?.[0] || {}
    const sourceForKeys = first?.attributes ?? first
    const attributeKeys = Object.keys(sourceForKeys || {})
    const items = res.data
      .map((t: any) => {
        const s = t?.attributes ?? t ?? {}
        const testimonial = s.quote ?? s.Quote ?? s.testimonial ?? s.Testimonial ?? s.text ?? s.Text
        const author = s.name ?? s.Name ?? s.author ?? s.Author
        const role = s.caption ?? s.Caption ?? s.role ?? s.Role
        return { testimonial, author, role }
      })
      .filter((i: any) => typeof i.testimonial === 'string' && i.testimonial.trim().length > 0)
    return Response.json({ items, count: items.length, debug: { attributeKeys } })
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


