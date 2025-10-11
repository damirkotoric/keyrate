import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { LOCALE_COOKIE, normalizeLocaleParam } from './lib/locale'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  // 1) Handle query param → redirect to path for canonical URLs
  const locParam = url.searchParams.get('loc') || url.searchParams.get('locale')
  if (locParam) {
    const locale = normalizeLocaleParam(locParam)
    const newUrl = new URL(url.toString())
    newUrl.searchParams.delete('loc')
    newUrl.searchParams.delete('locale')
    newUrl.pathname = locale === 'global' ? '/' : `/${locale}`
    const res = NextResponse.redirect(newUrl, 308)
    res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return res
  }

  // 2) If path already contains locale, set cookie for server usage
  const path = url.pathname.toLowerCase()
  
  if (path.startsWith('/ca')) {
    const res = NextResponse.next()
    res.cookies.set(LOCALE_COOKIE, 'ca', { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return res
  }
  if (path.startsWith('/ae') || path.startsWith('/uae')) {
    const res = NextResponse.next()
    res.cookies.set(LOCALE_COOKIE, 'ae', { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return res
  }
  if (path.startsWith('/us') || path.startsWith('/usa')) {
    const res = NextResponse.next()
    res.cookies.set(LOCALE_COOKIE, 'us', { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return res
  }

  // All other paths (including /, /solutions, /about, etc.) are global
  const res = NextResponse.next()
  res.cookies.set(LOCALE_COOKIE, 'global', { path: '/', maxAge: 60 * 60 * 24 * 365 })
  return res
}

export const config = {
  matcher: ['/((?!api/|_next/|.*\.(?:ico|png|jpg|jpeg|svg|gif|webp|css|js)).*)'],
}


