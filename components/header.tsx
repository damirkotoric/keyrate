"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe, ChevronDown, List, X } from "@/components/icons"
import { useClickOutside } from "@/hooks/use-click-outside"

export { Header }
export default function Header() {
  const [isGlobalDropdownOpen, setIsGlobalDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("Global")
  const [hideTopBar, setHideTopBar] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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

  // Close mobile menu on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <div className="container container-extend-32 mx-auto pt-4">
        <div className="bg-card/90 backdrop-blur-lg shadow-sm rounded-xl px-4 box-content">
          {/* Contact Banner (collapses on scroll) */}
          <div className={`hidden lg:flex border-b border-border/20 transition-[max-height,opacity] duration-300 ${hideTopBar ? "max-h-0 opacity-0 border-b-0 overflow-hidden" : "max-h-14 opacity-100 overflow-visible"}`}>
            <div className="flex items-center justify-between text-sm pt-3 pb-4 gap-6 text-muted-foreground w-full">
              <div className="flex items-center gap-6">
                <span className="text-muted-foreground">Award-winning broker servicing Canada, UAE and USA</span>
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
            <div className="flex flex-1 lg:flex-none items-center space-x-2">
              <a className="flex-none" href="/">
                <img
                  src="/logo-favicon.svg"
                  alt="KeyRate Dubai Logo"
                  className="h-8 mt-1 w-auto block sm:hidden"
                />
                <img
                  src="/logo-wordmark.svg"
                  alt="KeyRate Dubai Logo"
                  className="h-8 mt-1 w-auto hidden sm:block"
                />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsGlobalDropdownOpen(!isGlobalDropdownOpen)}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 lg:hidden mr-4"
              >
                <Globe className="w-4 h-4" />
                <span>{selectedCountry}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <nav className="hidden lg:flex flex-1 items-center justify-between space-x-2 xl:space-x-8 mx-8 h-full">
                <a href="/" className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">Home</a>
                <a href="/solutions" className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">Solutions</a>
                <a href="/about" className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">About</a>
                <a href="/blog" className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">Blog</a>
                <a href="/contact" className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">Contact</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-4">
                <Button variant="outline">Broker Portal</Button>
                <Button onClick={() => (window.location.href = "/solutions/mortgage-preapproval")}>Get Pre-Approved</Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <List />
              </Button>
            </div>
          </div>
          {/* Mobile Drawer */}
        </div>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[90]">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div
              role="dialog"
              aria-modal="true"
              className="absolute inset-2 rounded-xl bg-card text-card-foreground shadow-2xl border border-border p-4 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Menu</span>
                <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                  <X />
                </Button>
              </div>
              <nav className="flex flex-col divide-y divide-border text-base">
                <a href="/" className="py-4" onClick={() => setMobileOpen(false)}>Home</a>
                <a href="/solutions" className="py-4" onClick={() => setMobileOpen(false)}>Solutions</a>
                <a href="/about" className="py-4" onClick={() => setMobileOpen(false)}>About</a>
                <a href="/blog" className="py-4" onClick={() => setMobileOpen(false)}>Blog</a>
                <a href="/contact" className="py-4" onClick={() => setMobileOpen(false)}>Contact</a>
              </nav>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => { setMobileOpen(false); window.location.href = "/broker" }}>Broker Portal</Button>
                <Button onClick={() => { setMobileOpen(false); window.location.href = "/solutions/mortgage-preapproval" }}>Get Pre-Approved</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
