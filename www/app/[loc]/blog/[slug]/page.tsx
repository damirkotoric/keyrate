// This is a thin wrapper that handles locale-specific blog post routes like /ca/blog/my-post
// The actual implementation is in /app/blog/[slug]/page.tsx

export { default, generateMetadata, generateStaticParams } from "@/app/blog/[slug]/page"

