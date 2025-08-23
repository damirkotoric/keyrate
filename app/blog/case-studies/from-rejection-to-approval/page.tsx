import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function FromRejectionToApprovalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Button variant="ghost" className="mb-8 p-0 h-auto text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <a href="/blog/case-studies">Back to Case Studies</a>
          </Button>

          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">
              From Rejection to Approval: How We Helped a Self-Employed Client
            </h1>
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                Canada
              </Badge>
              <Badge variant="outline" className="border-green-300 text-green-600 bg-green-50">
                $45,000 saved
              </Badge>
              <Badge variant="outline" className="border-blue-300 text-blue-600 bg-blue-50">
                January 12, 2025
              </Badge>
              <Badge variant="outline" className="border-purple-300 text-purple-600 bg-purple-50">
                8 min read
              </Badge>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* The Challenge */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-black">The Challenge: When "No" Becomes the Norm</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Our client, a freelance consultant, faced the same frustrating wall that many self-employed Canadians
                  encounter: repeated mortgage rejections from banks. Despite steady income and a healthy financial
                  profile, their irregular pay structure and lack of traditional employment history flagged them as
                  "high risk."
                </p>
                <p>
                  After three straight rejections, the client felt defeated — unsure if homeownership was even possible.
                </p>
              </div>
            </section>

            {/* Our Approach */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-black">Our Approach: Looking Beyond the Banks</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                At KeyRate, we believe your work style shouldn't stop you from owning a home. Here's how we turned
                things around:
              </p>

              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-black">Deep-Dive Financial Review</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• We went beyond surface-level credit checks.</li>
                    <li>• Analyzed business income, contracts, and long-term earning potential.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-black">Tapping Our Lender Network</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Instead of relying on one or two banks, we accessed dozens of lenders.</li>
                    <li>• Matched the client with flexible programs designed for entrepreneurs.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-black">Negotiating the Best Terms</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Structured the mortgage in a way that reflected the client's true financial strength.</li>
                    <li>• Secured a competitive fixed rate that other lenders hadn't even considered.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The Result */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-black">The Result: Approval + $45,000 Saved</h2>
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Mortgage approved within 21 days</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Competitive fixed rate locked in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">
                      $45,000 saved over the life of the loan compared to original bank offers
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-6">
                For our client, this wasn't just about buying a home. It was about reclaiming confidence after rejection
                — and proving that self-employed Canadians deserve better options.
              </p>
            </section>

            {/* Client Testimonial */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-black">Client Testimonial</h2>
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                  "I felt like every door was slamming in my face until I met the KeyRate team. They didn't treat me
                  like a risk — they treated me like a person with goals. Thanks to them, I own my dream home and saved
                  more than I ever thought possible."
                </blockquote>
                <cite className="text-gray-600 font-medium">— Freelance Consultant, Ontario</cite>
              </div>
            </section>

            {/* Why This Story Matters */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-black">Why This Story Matters</h2>
              <p className="text-gray-700 leading-relaxed">
                Self-employed professionals are the backbone of the modern economy, yet traditional lenders often shut
                them out. At KeyRate, we're rewriting the narrative — making sure freelancers, contractors, and
                entrepreneurs can access the same opportunities as salaried employees.
              </p>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Approval?</h2>
              <p className="text-xl mb-6 text-white/90">Don't let rejections stop you from moving forward.</p>
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">
                Get Your Free Quote Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
