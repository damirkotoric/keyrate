"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Phone, Mail, MapPin, ArrowRight } from "@/components/icons"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Talk to a Real Mortgage Expert — Anytime</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a question, need advice, or want to get started?
            <br />
            Our team is here to help — no pressure, no obligation, just honest guidance.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-8">📍 Contact Information</h2>

                {/* Canada */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Canada (Head Office — Ottawa)</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p>45 O'Connor Street, Suite 828</p>
                        <p>Ottawa, ON K1P 1A4</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p>
                          <strong>Toll-Free:</strong> 1-833-222-2027
                        </p>
                        <p>
                          <strong>Phone:</strong> 613-800-0000
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <p>info@keyrate.com</p>
                    </div>
                  </div>
                </div>

                {/* United States */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">United States</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <p>Advisors nationwide</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <p>1-800-555-0123</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <p>usa@keyrate.com</p>
                    </div>
                  </div>
                </div>

                {/* UAE */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">United Arab Emirates (Dubai Office)</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p>Capital Golden Tower, Business Bay</p>
                        <p>Dubai, UAE</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <p>+971 585 828 202</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <p>dubai@keyrate.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Leave Us a Message</h2>
              <p className="text-gray-600 mb-6">All fields required</p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input placeholder="Enter your full name" className="h-12" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input placeholder="Enter your phone number" className="h-12" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input type="email" placeholder="Enter your email address" className="h-12" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Select>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">What can we help you with?</label>
                  <textarea
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us about your mortgage needs, questions, or how we can assist you..."
                    required
                  ></textarea>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Contact CTA */}
      <section className="py-16 text-white bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">💬 Prefer to Speak Immediately?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Call us now and we'll connect you to a licensed mortgage advisor in your region.
          </p>
          <Button
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => window.open("tel:1-833-222-2027", "_self")}
          >
            Speak to Someone Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
