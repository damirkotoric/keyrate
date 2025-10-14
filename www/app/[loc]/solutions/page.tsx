// This is a thin wrapper that handles locale-specific routes like /ca/solutions
// The actual implementation is in /app/solutions/page.tsx which handles both
// locale-prefixed and non-prefixed routes automatically

export { default, dynamic, metadata } from "@/app/solutions/page"
