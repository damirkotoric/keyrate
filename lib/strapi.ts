// lib/strapi.ts
export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function strapiFetch<T = any>(path: string) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ''}` },
    // Homepage rarely needs per-request freshness; let ISR handle it.
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}
