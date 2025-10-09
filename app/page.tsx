import { sanityFetch } from "@/lib/sanity"
import HomePage from "@/components/home-page"

export default async function Page() {
  // Fetch data from Sanity
  let home: any = {}
  try {
    const data = await sanityFetch(
      `*[_type == "homePage"][0]{
        hero{
          kicker,
          headline,
          subheadline
        }
      }`
    )
    home = {
      kicker: data?.hero?.kicker,
      title: data?.hero?.headline,
      subtitle: data?.hero?.subheadline,
    }
  } catch (e) {
    console.error("Home page: Sanity fetch failed", e)
  }

  return <HomePage home={home} />
}