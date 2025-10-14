// This is a thin wrapper that handles locale-specific routes like /ca/contact
// The actual implementation is in /app/contact/page.tsx which handles both
// locale-prefixed and non-prefixed routes automatically

export { default, generateMetadata } from "@/app/contact/page"

