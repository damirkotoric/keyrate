import { Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export { Footer }
export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="mb-12">
            <a href="/">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zgHhkpWHr9ussH7CQwIP5MQodorHWQ.png"
                alt="KeyRate Dubai Logo"
                className="h-16 w-auto mb-6"
              />
            </a>
            <p className="text-white/80 mb-6">
              Canada, UAE and USA's most trusted mortgage broker. We work for you, not the bank.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p>Canada License: FSRA #13181</p>
              <p>UAE Registration: #123</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Solutions</h3>
              <ul className="space-y-3 text-white/80">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mortgage Pre-Approval
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    First-Time Buyers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mortgage Renewals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Refinancing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Investment Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Islamic Mortgages
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Self-Employed
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Blog</h3>
              <ul className="space-y-3 text-white/80">
                <li>
                  <a href="/blog" className="hover:text-white transition-colors">
                    All Posts
                  </a>
                </li>
                <li>
                  <a href="/blog/news" className="hover:text-white transition-colors">
                    News
                  </a>
                </li>
                <li>
                  <a href="/blog/videos" className="hover:text-white transition-colors">
                    Videos
                  </a>
                </li>
                <li>
                  <a href="/blog/buying-tips" className="hover:text-white transition-colors">
                    Buying Tips
                  </a>
                </li>
                <li>
                  <a href="/blog/investing" className="hover:text-white transition-colors">
                    Investing
                  </a>
                </li>
                <li>
                  <a href="/blog/rates" className="hover:text-white transition-colors">
                    Rates
                  </a>
                </li>
                <li>
                  <a href="/blog/case-studies" className="hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Resources</h3>
              <ul className="space-y-3 text-white/80">
                <li>
                  <a href="/calculators" className="hover:text-white transition-colors">
                    Calculators
                  </a>
                </li>
                <li>
                  <a href="/mortgage-glossary" className="hover:text-white transition-colors">
                    Mortgage Glossary
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/guides-ebooks" className="hover:text-white transition-colors">
                    Guides & eBooks
                  </a>
                </li>
                <li>
                  <a href="/useful-links" className="hover:text-white transition-colors">
                    Useful Links
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <div className="space-y-4 text-white/80 mb-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>1-833-222-2027</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+971 585 828 202</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>1-800-555-0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@keyrate.com</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p className="text-sm">
            © 2025 KeyRate Corp. All rights reserved. Licensed mortgage broker serving Canada, UAE and USA.
          </p>
        </div>
      </div>
    </footer>
  )
}
