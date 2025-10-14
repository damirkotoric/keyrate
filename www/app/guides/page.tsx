import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "@/components/icons"
import { getAllGuides } from "@/lib/queries/guides"
import { GuideCard } from "@/components/guide-card"
import { GetInTouchSection } from "@/components/get-in-touch-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mortgage Guides & Resources | KeyRate Mortgage Broker',
  description: 'Download free mortgage guides packed with expert advice, checklists and insider tips.',
}

export default async function GuidesPage() {
  const guides = await getAllGuides()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 max-w-4xl mx-auto">
            Free Mortgage Guides to Help You Borrow Smarter
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            These downloadable guides are packed with straight-talking advice, practical checklists and insider tips
            from our expert mortgage advisors. Whether you're buying your first home, looking to renew, or thinking
            about investing — take the guesswork out of your next move with our free resources.
          </p>
        </div>
      </section>

      {/* Available Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Available Guides & Downloads</h2>

          {guides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {guides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No guides available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <GetInTouchSection />

      <Footer />
    </div>
  )
}

