"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe, ChevronDown } from "lucide-react"

export { Header }
export default function Header() {
  const [isGlobalDropdownOpen, setIsGlobalDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("Global")

  return (
    <>
      {/* Contact Banner */}
      <div className="bg-primary text-white py-3 relative z-[60]">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a className="flex items-center gap-2" href="tel:+18332222027">
              <Phone className="w-4 h-4" />
              <span>Canada: 1-833-222-2027</span>
            </a>
            <a className="flex items-center gap-2" href="tel:+971585828202">
              <Phone className="w-4 h-4" />
              <span>UAE: +971 585 828 202</span>
            </a>
            <a className="flex items-center gap-2" href="tel:18005550123">
              <Phone className="w-4 h-4" />
              <span>USA: 1-800-555-0123</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a className="flex items-center gap-2" href="mailto:info@keyrate.com">
              <Mail className="w-4 h-4" />
              <span>info@keyrate.com</span>
            </a>
            <div className="relative">
              <button
                onClick={() => setIsGlobalDropdownOpen(!isGlobalDropdownOpen)}
                className="flex items-center gap-2 hover:text-white/80 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{selectedCountry}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isGlobalDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg py-2 min-w-[120px] z-[70]">
                  {["Global", "Canada", "UAE", "USA"].map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country)
                        setIsGlobalDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg text-black sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="/">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8HoOfDEVwu3pIaXIz9GbX7cQYhuUjP.png"
                alt="KeyRate Dubai Logo"
                className="h-8 mt-1 w-auto"
              />
            </a>
          </div>
            <nav className="flex-1 md:flex items-center justify-between space-x-8 mx-24 h-full">
            <a href="/" className="block p-4 text-black hover:text-black/80 transition-colors">
              Home
            </a>
            <a href="/solutions" className="block p-4 text-black hover:text-black/80 transition-colors">
              Solutions
            </a>
            <a href="/about" className="block p-4 text-black hover:text-black/80 transition-colors">
              About
            </a>
            <a href="/blog" className="block p-4 text-black hover:text-black/80 transition-colors">
              Blog
            </a>
            <a href="/contact" className="block p-4 text-black hover:text-black/80 transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
            >
              Broker Portal
            </Button>
            <Button
              onClick={() => (window.location.href = "/solutions/mortgage-preapproval")}
            >
              Get Pre-Approved
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
