import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin } from "@/components/icons"

export function GetInTouchSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to secure your mortgage? Contact our expert team today for personalized service across Canada and
            the UAE.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Canada</p>
                    <p className="text-muted-foreground">1-833-222-2027</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">UAE</p>
                    <p className="text-muted-foreground">+971 585 828 202</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">USA</p>
                    <p className="text-muted-foreground">1-800-555-0123</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@keyrate.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Office Locations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Canada</p>
                    <p className="text-muted-foreground">Ottawa & Toronto</p>
                    <p className="text-sm text-muted-foreground/80">Licensed in all provinces</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">UAE</p>
                    <p className="text-muted-foreground">Dubai</p>
                    <p className="text-sm text-muted-foreground/80">DFSA Regulated</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">USA</p>
                    <p className="text-muted-foreground">New York & Miami</p>
                    <p className="text-sm text-muted-foreground/80">Licensed in multiple states</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input placeholder="John Doe" className="h-12" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input placeholder="john@example.com" className="h-12" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input placeholder="+1 (555) 123-4567" className="h-12" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select className="w-full h-12 rounded-md border border-input bg-card px-3 text-foreground">
                  <option value="">Select your location</option>
                  <option value="canada">Canada</option>
                  <option value="uae">UAE</option>
                  <option value="usa">USA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full h-24 resize-none rounded-md border border-input bg-card px-3 py-2 text-foreground"
                  placeholder="Tell us about your mortgage needs..."
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">Send Message</Button>
              <p className="text-xs text-muted-foreground/80 text-center">
                We'll respond within 24 hours. Your information is kept confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

