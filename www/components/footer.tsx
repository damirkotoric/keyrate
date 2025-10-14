"use client"
import { useEffect, useState } from "react"
import { Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "@/components/icons"
import { GridPattern } from "@/components/ui/grid-pattern"

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const localize = (href: string) => {
    try {
      if (!mounted) return href
      const match = document.cookie.match(/(?:^|; )kr_locale=([^;]+)/)
      const loc = match ? decodeURIComponent(match[1]) : "global"
      if (!href.startsWith("/")) return href
      const known = new Set(["ca", "uae", "usa"]) 
      const parts = href.split("/").filter(Boolean)
      const first = parts[0] || ""
      const tail = known.has(first) ? parts.slice(1).join("/") : parts.join("/")
      return loc === "global" ? `/${tail}` : `/${loc}/${tail}`
    } catch { return href }
  }
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground py-12">
      <GridPattern
        width={24}
        height={24}
        x={-1}
        y={-1}
        className="dark w-full h-full pointer-events-none absolute inset-0 text-primary-foreground/35 [mask-image:linear-gradient(200deg,white,transparent)]"
      />
      <div className="relative container mx-auto px-4">
        <div className="sm:mx-4 xl:mx-0 mb-12">
          <div className="mb-12">
            <a href={localize("/")}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zgHhkpWHr9ussH7CQwIP5MQodorHWQ.png"
                alt="KeyRate Dubai Logo"
                className="h-16 w-auto mb-6"
              />
            </a>
            <p className="text-primary-foreground/80 mb-6">
              Canada, UAE and USA's most trusted mortgage broker. We work for you, not the bank.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Solutions</h3>
              <ul className="space-y-3 text-primary-foreground/80">
                <li>
                  <a href={localize("/solutions/mortgage-preapproval")} className="hover:text-primary-foreground transition-colors">
                    Mortgage Pre-Approval
                  </a>
                </li>
                <li>
                  <a href={localize("/solutions/first-time-home-buyer-mortgages")} className="hover:text-primary-foreground transition-colors">
                    First-Time Buyers
                  </a>
                </li>
                <li>
                  <a href={localize("/solutions/mortgage-renewals")} className="hover:text-primary-foreground transition-colors">
                    Mortgage Renewals
                  </a>
                </li>
                <li>
                  <a href={localize("/solutions/mortgage-refinancing")} className="hover:text-primary-foreground transition-colors">
                    Refinancing
                  </a>
                </li>
                <li>
                  <a href={localize("/solutions/investment-and-rental-mortgages")} className="hover:text-primary-foreground transition-colors">
                    Investment Properties
                  </a>
                </li>
                <li>
                  <a href={localize("/solutions/islamic-finance-murabaha-ijara")} className="hover:text-primary-foreground transition-colors">
                    Islamic Mortgages
                  </a>
                </li>
                <li>
                  <a href={localize("/solutions/self-employed-borrower-mortgages")} className="hover:text-primary-foreground transition-colors">
                    Self-Employed
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Company</h3>
              <ul className="space-y-3 text-primary-foreground/80">
                <li>
                  <a href={localize("/about")} className="hover:text-primary-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href={localize("/blog")} className="hover:text-primary-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href={localize("/contact")} className="hover:text-primary-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Resources</h3>
              <ul className="space-y-3 text-primary-foreground/80">
                <li>
                  <a href={localize("/calculators")} className="hover:text-primary-foreground transition-colors">
                    Calculators
                  </a>
                </li>
                <li>
                  <a href={localize("/mortgage-glossary")} className="hover:text-primary-foreground transition-colors">
                    Mortgage Glossary
                  </a>
                </li>
                <li>
                  <a href={localize("/faq")} className="hover:text-primary-foreground transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href={localize("/guides")} className="hover:text-primary-foreground transition-colors">
                    Guides & eBooks
                  </a>
                </li>
                {/* <li>
                  <a href={localize("/useful-links")} className="hover:text-primary-foreground transition-colors">
                    Useful Links
                  </a>
                </li> */}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <div className="space-y-4 text-primary-foreground/80 mb-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span><a href="tel:1-833-222-2027">1-833-222-2027</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span><a href="tel:+971585828202">+971 585 828 202</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span><a href="tel:1-800-555-0123">1-800-555-0123</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span><a href="mailto:info@keyrate.com">info@keyrate.com</a></span>
                </div>
              </div>

              <div className="flex gap-4 -ml-2">
                <a href="https://www.facebook.com/keyrate" target="_blank" className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://x.com/KeyRateMortgage" target="_blank" className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/keyrate/" target="_blank" className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/keyratedubai/" target="_blank" className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p className="text-sm">
            © 2025 KeyRate Corp. All rights reserved. Licensed mortgage broker serving Canada, UAE and USA. Canada License: FSRA #13181
          </p>
        </div>
      </div>
    </footer>
  )
}
