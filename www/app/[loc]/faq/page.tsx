// This is a thin wrapper that handles locale-specific routes like /ca/faq
// The actual implementation is in /app/faq/page.tsx which handles both
// locale-prefixed and non-prefixed routes automatically

export { default, generateMetadata } from "@/app/faq/page"

