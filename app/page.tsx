import { strapiFetch } from "@/lib/strapi"
import HomePage from "@/components/home-page"

export default async function Page() {
  // Fetch data from Strapi
  const res = await strapiFetch("/api/home-page?populate=*")
  console.log(res) // <-- Add this line
  const home = res?.data || {}

  return <HomePage home={home} />
}