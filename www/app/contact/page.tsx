import Header from "@/components/header"
import Footer from "@/components/footer"
import { GetInTouchSection } from "@/components/get-in-touch-section"
import { getContactPage } from "@/lib/queries/contact"

export default async function ContactPage() {
  const contactPage = await getContactPage()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {contactPage?.title?.en || "Get In Touch"}
          </h1>
          {contactPage?.subtitle?.en && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {contactPage.subtitle.en}
            </p>
          )}
        </div>
      </section>

      {/* Get In Touch Section */}
      <GetInTouchSection hideHeader />

      <Footer />
    </div>
  )
}
