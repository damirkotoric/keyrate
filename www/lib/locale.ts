export type AppLocale = "global" | "ca" | "ae" | "us"

export const LOCALE_COOKIE = "kr_locale"

export const localeToSanityKeys: Record<AppLocale, string[]> = {
  global: ["en", "global"],
  ca: ["en_CA", "ca", "en"],
  ae: ["en_AE", "ae", "uae", "en"],
  us: ["en_US", "us", "usa", "en"],
}

export function normalizeLocaleParam(value: string | null | undefined): AppLocale {
  const v = (value || "").toLowerCase()
  if (v === "ca" || v === "canada") return "ca"
  if (v === "uae" || v === "ae" || v === "dubai") return "ae"
  if (v === "usa" || v === "us" || v === "united-states") return "us"
  return "global"
}

export function getPreferredLocaleFromHeaders(acceptLanguage: string | null | undefined): AppLocale {
  const s = (acceptLanguage || "").toLowerCase()
  if (s.includes("en-ca")) return "ca"
  if (s.includes("en-ae") || s.includes("ar-ae") || s.includes("en-gb")) return "ae"
  if (s.includes("en-us")) return "us"
  return "global"
}

export function chooseLocalizedString(obj: unknown, locale: AppLocale): string | undefined {
  if (typeof obj === "string") return obj
  if (!obj || typeof obj !== "object") return undefined
  const keys = localeToSanityKeys[locale]
  const o: any = obj
  for (const k of keys) {
    if (typeof o[k] === "string" && o[k].trim().length > 0) return o[k]
  }
  // fallback to any first string
  for (const v of Object.values(o)) {
    if (typeof v === "string" && v.trim().length > 0) return v
  }
  return undefined
}


