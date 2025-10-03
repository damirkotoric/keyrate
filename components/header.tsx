"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe, ChevronDown } from "@/components/icons"
import { useClickOutside } from "@/hooks/use-click-outside"

export { Header }
export default function Header() {
  const [isGlobalDropdownOpen, setIsGlobalDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("Global")
  const [hideTopBar, setHideTopBar] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const hiddenRef = useRef(false)

  useClickOutside(dropdownRef, () => {
    if (isGlobalDropdownOpen) {
      setIsGlobalDropdownOpen(false)
    }
  })

  useEffect(() => {
    const HIDE_AFTER = 80
    const SHOW_BEFORE = 24
    const onScroll = () => {
      const y = window.scrollY
      if (!hiddenRef.current && y > HIDE_AFTER) {
        hiddenRef.current = true
        setHideTopBar(true)
      } else if (hiddenRef.current && y < SHOW_BEFORE) {
        hiddenRef.current = false
        setHideTopBar(false)
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <div className="container container-extend-32 mx-auto pt-4">
        <div className="bg-card/90 backdrop-blur-lg shadow-sm rounded-xl px-4 box-content will-change-transform">
          {/* Contact Banner (collapses on scroll) */}
          <div className={`border-b border-border/20 transition-[max-height,opacity] duration-300 ${hideTopBar ? "max-h-0 opacity-0 border-b-0 overflow-hidden" : "max-h-14 opacity-100 overflow-visible"}`}>
            <div className="flex items-center justify-between text-sm pt-3 pb-4 text-muted-foreground">
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
                <div className="relative overflow-visible" ref={dropdownRef}>
                  <Button
                    onClick={() => setIsGlobalDropdownOpen(!isGlobalDropdownOpen)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{selectedCountry}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  {isGlobalDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-card text-card-foreground rounded-lg shadow-lg py-2 min-w-[160px] z-[80]">
                      {["Global", "Canada", "UAE", "USA"].map((country) => (
                        <Button
                          key={country}
                          onClick={() => {
                            setSelectedCountry(country)
                            setIsGlobalDropdownOpen(false)
                          }}
                          variant="ghost"
                          size="lg"
                          className="w-full justify-start"
                        >
                          {country}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Row */}
          <div className="h-16 flex items-center justify-between px-0 text-foreground">
            <div className="flex items-center space-x-2">
              <a className="flex-none" href="/">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8HoOfDEVwu3pIaXIz9GbX7cQYhuUjP.png"
                  alt="KeyRate Dubai Logo"
                  className="h-8 mt-1 w-auto"
                />
              </a>
            </div>
            <nav className="flex-1 md:flex items-center justify-between space-x-8 mx-24 h-full">
              <a href="/" className="block p-4 text-foreground hover:text-foreground/80 transition-colors">Home</a>
              <a href="/solutions" className="block p-4 text-foreground hover:text-foreground/80 transition-colors">Solutions</a>
              <a href="/about" className="block p-4 text-foreground hover:text-foreground/80 transition-colors">About</a>
              <a href="/blog" className="block p-4 text-foreground hover:text-foreground/80 transition-colors">Blog</a>
              <a href="/contact" className="block p-4 text-foreground hover:text-foreground/80 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="outline">Broker Portal</Button>
              <Button onClick={() => (window.location.href = "/solutions/mortgage-preapproval")}>Get Pre-Approved</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
