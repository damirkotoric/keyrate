import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { LOCALE_COOKIE, normalizeLocaleParam } from './lib/locale'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  
  // Skip middleware for API routes entirely
  if (url.pathname.startsWith('/api/')) {
    console.log('[MIDDLEWARE] Skipping API route:', url.pathname)
    return NextResponse.next()
  }

  // Protect /portal routes with Supabase auth
  if (url.pathname.startsWith('/portal')) {
    // Allow login page without auth check
    if (url.pathname.startsWith('/portal/login')) {
      return NextResponse.next()
    }

    let response = NextResponse.next({ request: req })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => 
              req.cookies.set(name, value)
            )
            response = NextResponse.next({ request: req })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        }
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/portal/login', req.url))
    }

    return response
  }
  
  // 1) Handle query param → redirect to path for canonical URLs
  const locParam = url.searchParams.get('loc') || url.searchParams.get('locale')
  if (locParam) {
    console.log('[MIDDLEWARE] Redirecting due to locale param:', { pathname: url.pathname, locParam })
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


