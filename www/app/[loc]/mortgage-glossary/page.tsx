// This is a thin wrapper that handles locale-specific routes like /ca/mortgage-glossary
// The actual implementation is in /app/mortgage-glossary/page.tsx which handles both
// locale-prefixed and non-prefixed routes automatically

export { default, generateMetadata } from "@/app/mortgage-glossary/page"

