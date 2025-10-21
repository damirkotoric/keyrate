"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe, ChevronDown, List, X } from "@/components/icons"
import { useClickOutside } from "@/hooks/use-click-outside"
import { createClient } from "@/lib/supabase/client"

interface HeaderProps {
  position?: "sticky" | "fixed"
}

export default function Header({ position = "sticky" }: HeaderProps = {}) {
  const [isGlobalDropdownOpen, setIsGlobalDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("Global")
  const [hideTopBar, setHideTopBar] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const desktopDropdownRef = useRef<HTMLDivElement | null>(null)
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null)
  const hiddenRef = useRef(false)

  useEffect(() => setMounted(true), [])
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])
  
  const localize = (href: string) => {
    try {
      if (!mounted) return href
      const match = document.cookie.match(/(?:^|; )kr_locale=([^;]+)/)
      const loc = match ? decodeURIComponent(match[1]) : "global"
      if (!href.startsWith("/")) return href
      const known = new Set(["ca", "ae", "us"]) 
      const parts = href.split("/").filter(Boolean)
      const first = parts[0] || ""
      const tail = known.has(first) ? parts.slice(1).join("/") : parts.join("/")
      return loc === "global" ? `/${tail}` : `/${loc}/${tail}`
    } catch { return href }
  }

  useClickOutside([desktopDropdownRef, mobileDropdownRef], () => {
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

  // Sync initial selection from URL prefix first. If on root, force Global (ignore cookie)
  useEffect(() => {
    try {
      const seg = (window.location.pathname.split("/").filter(Boolean)[0] || "").toLowerCase()
      const fromPath = seg === "ca" ? "Canada" : (seg === "ae" || seg === "uae") ? "UAE" : (seg === "us" || seg === "usa") ? "USA" : ""
      if (fromPath) {
        setSelectedCountry(fromPath)
        return
      }
      // On global root we explicitly set Global regardless of any cookie
      setSelectedCountry("Global")
      return
    } catch {}
  }, [])

  const flagCodeFor = (country: string): string | null => {
    if (country === "Canada") return "ca"
    if (country === "UAE") return "ae"
    if (country === "USA") return "us"
    return null
  }

  const FlagOrGlobe = ({ country, size = "w-4 h-4" }: { country: string; size?: string }) => {
    const code = flagCodeFor(country)
    if (!code) return <Globe className={size} />
    return (
      <img
        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/1x1/${code}.svg`}
        alt={`${country} flag`}
        className={`${size} rounded-[3px] rounded-full border border-border`}
      />
    )
  }

  const onSelectCountry = (country: string) => {
    setSelectedCountry(country)
    const map: Record<string, string> = { Global: "global", Canada: "ca", UAE: "ae", USA: "us" }
    const locale = map[country] || "global"
    const known = new Set(["ca", "ae", "us"]) 
    const pathname = window.location.pathname || "/"
    const parts = pathname.split("/").filter(Boolean)
    const first = parts[0] || ""
    const rest = new Set(["ca","ae","us"]).has(first) ? "/" + parts.slice(1).join("/") : pathname
    const newPath = locale === "global" ? (rest || "/") : `/${locale}${rest === "/" ? "" : rest}`
    const search = window.location.search || ""
    const hash = window.location.hash || ""
    document.cookie = `kr_locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`
    window.location.assign(`${newPath}${search}${hash}`)
  }

  const localizeHref = (href: string) => {
    const map: Record<string, string> = { Global: "global", Canada: "ca", UAE: "ae", USA: "us" }
    const locale = map[selectedCountry] || "global"
    const known = new Set(["ca", "ae", "us"]) 
    if (!href.startsWith("/")) return href
    const parts = href.split("/").filter(Boolean)
    const first = parts[0] || ""
    const tail = known.has(first) ? parts.slice(1).join("/") : parts.join("/")
    return locale === "global" ? `/${tail}` : `/${locale}/${tail}`.replace(/\/+$/, "")
  }

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const pathname = window.location.pathname || "/"
    const seg = (pathname.split("/").filter(Boolean)[0] || "").toLowerCase()
    const known = new Set(["ca", "ae", "us"]) 
    const locFromPath = known.has(seg) ? seg : "global"
    const map: Record<string, string> = { Global: "global", Canada: "ca", UAE: "ae", USA: "us" }
    const locFromSelected = map[selectedCountry] || "global"
    const loc = locFromPath !== "global" ? locFromPath : locFromSelected
    const target = href.startsWith("/") ? href : `/${href}`
    const tail = target.split("/").filter(Boolean)
    const first = tail[0] || ""
    const finalTail = known.has(first) ? tail.slice(1).join("/") : tail.join("/")
    const dest = loc === "global" ? `/${finalTail}` : `/${loc}/${finalTail}`.replace(/\/+$/, "")
    window.location.assign(dest)
  }

  return (
    <div className={`${position} w-full top-0 z-50`}>
      <div className="container container-extend-32 mx-auto pt-4">
        <div className="bg-card/90 backdrop-blur-lg shadow-sm rounded-xl px-4 box-content">
          {/* Contact Banner (collapses on scroll) */}
          <div className={`hidden lg:flex border-b border-border/50 transition-[max-height,opacity] duration-300 ${hideTopBar ? "max-h-0 opacity-0 border-b-0 overflow-hidden" : "max-h-14 opacity-100 overflow-visible"}`}>
            <div className="flex items-center justify-between text-sm pt-4 pb-4 gap-6 text-muted-foreground w-full">
              <div className="flex items-center gap-6">
                <span className="text-muted-foreground">Award-winning broker servicing Canada, UAE and the United States</span>
              </div>
              <div className="flex items-center gap-6">
                <a className="flex items-center gap-2" href="mailto:info@keyrate.com">
                  <Mail className="w-4 h-4" />
                  <span>info@keyrate.com</span>
                </a>
                <div className="relative overflow-visible" ref={desktopDropdownRef}>
                  <Button
                    onClick={() => setIsGlobalDropdownOpen(!isGlobalDropdownOpen)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FlagOrGlobe country={selectedCountry} />
                    <span>{selectedCountry}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  {isGlobalDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-card text-card-foreground rounded-lg shadow-lg p-2 min-w-[160px] z-[80]">
                      {["Global", "Canada", "UAE", "USA"].map((country) => (
                        <Button
                          key={country}
                          onClick={() => {
                            setIsGlobalDropdownOpen(false)
                            onSelectCountry(country)
                          }}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start my-1 flex items-center gap-2"
                        >
                          <FlagOrGlobe country={country} />
                          <span>{country}</span>
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
              <a className="flex-none" href={localize("/")}>
                {/* <img
                  src="/logo-favicon.svg"
                  alt="KeyRate Dubai Logo"
                  className="h-8 mt-1 w-auto block sm:hidden"
                /> */}
                <img
                  src="/logo-wordmark.svg"
                  alt="KeyRate Dubai Logo"
                  className="h-6 sm:h-8 mt-1 w-auto block"
                />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative lg:hidden" ref={mobileDropdownRef}>
                <Button
                  onClick={() => setIsGlobalDropdownOpen(!isGlobalDropdownOpen)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 mr-4"
                >
                  <FlagOrGlobe country={selectedCountry} />
                  <span>{selectedCountry}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                {isGlobalDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-card text-card-foreground rounded-lg shadow-lg p-2 min-w-[160px] z-[80]">
                    {["Global", "Canada", "UAE", "USA"].map((country) => (
                      <Button
                        key={country}
                        onClick={() => {
                          setIsGlobalDropdownOpen(false)
                          onSelectCountry(country)
                        }}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start my-1 flex items-center gap-2"
                      >
                        <FlagOrGlobe country={country} />
                        <span>{country}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <nav className="hidden lg:flex flex-1 items-center justify-between space-x-2 xl:space-x-8 mx-8 h-full">
                <a href={localizeHref("/")} onClick={(e) => go(e, "/")} className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">Home</a>
                <a href={localizeHref("/solutions")} onClick={(e) => go(e, "/solutions")} className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">Solutions</a>
                <a href={localizeHref("/about")} onClick={(e) => go(e, "/about")} className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">About</a>
                <a href={localizeHref("/blog")} onClick={(e) => go(e, "/blog")} className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">Blog</a>
                <a href={localizeHref("/contact")} onClick={(e) => go(e, "/contact")} className="block p-4 lg:p-5 xl:p-6 text-foreground hover:text-foreground/80 transition-colors">Contact</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-4">
                <Button variant="outline" onClick={() => (window.location.href = isAuthenticated ? "/portal/dashboard" : "/portal/login")}>Broker Portal</Button>
                <Button onClick={() => (window.location.href = localizeHref("/solutions/mortgage-preapproval"))}>Get Pre-Approved</Button>
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
                <a href={localizeHref("/")} onClick={(e) => { e.preventDefault(); setMobileOpen(false); go(e, "/") }} className="py-4">Home</a>
                <a href={localizeHref("/solutions")} onClick={(e) => { e.preventDefault(); setMobileOpen(false); go(e, "/solutions") }} className="py-4">Solutions</a>
                <a href={localizeHref("/about")} onClick={(e) => { e.preventDefault(); setMobileOpen(false); go(e, "/about") }} className="py-4">About</a>
                <a href={localizeHref("/blog")} onClick={(e) => { e.preventDefault(); setMobileOpen(false); go(e, "/blog") }} className="py-4">Blog</a>
                <a href={localizeHref("/contact")} onClick={(e) => { e.preventDefault(); setMobileOpen(false); go(e, "/contact") }} className="py-4">Contact</a>
              </nav>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => { setMobileOpen(false); window.location.href = isAuthenticated ? "/portal/dashboard" : "/portal/login" }}>Broker Portal</Button>
                <Button onClick={() => { setMobileOpen(false); window.location.href = localizeHref("/solutions/mortgage-preapproval") }}>Get Pre-Approved</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { Header }
