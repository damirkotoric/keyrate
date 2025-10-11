// This is a thin wrapper that handles locale-specific routes like /ca/solutions/[slug]
// The actual implementation is in /app/solutions/[slug]/page.tsx which handles both
// locale-prefixed and non-prefixed routes automatically

export { default } from "@/app/solutions/[slug]/page"

