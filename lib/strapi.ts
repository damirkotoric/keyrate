// lib/strapi.ts
const configuredUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || '').trim();
export const STRAPI_URL = (() => {
  if (!configuredUrl) {
    throw new Error(
      'STRAPI_URL is not configured. Set NEXT_PUBLIC_STRAPI_URL or STRAPI_URL to your PRODUCTION Strapi base URL.'
    );
  }
  return configuredUrl.replace(/\/$/, '');
})();

export async function strapiFetch<T = any>(path: string) {
  const token = process.env.STRAPI_API_TOKEN;
  const headers: Record<string, string> = {};
  if (token && token.trim().length > 0) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${STRAPI_URL}${path}`, {
    headers,
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Upstream Strapi error ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}
