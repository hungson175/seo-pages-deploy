import { NextRequest, NextResponse } from 'next/server'
import {
  buildCanonicalRedirectUrl,
  shouldRedirectToCanonicalHost,
} from '@/lib/canonical-host'

const REAL_TUVI_FONT_PRELOAD_PATTERN = /^\/_next\/static\/media\/[0-9a-f]{16}-s\.p\.woff2$/i

export function getRealTuViFontPreloadProxyPath(pathname: string): string | null {
  if (!REAL_TUVI_FONT_PRELOAD_PATTERN.test(pathname)) return null
  return `/real-tuvi-assets${pathname}`
}

export function proxy(request: NextRequest) {
  if (shouldRedirectToCanonicalHost(request.nextUrl.hostname)) {
    return NextResponse.redirect(buildCanonicalRedirectUrl(request.url), 308)
  }

  const realTuViFontPreloadPath = getRealTuViFontPreloadProxyPath(request.nextUrl.pathname)
  if (realTuViFontPreloadPath) {
    const url = request.nextUrl.clone()
    url.pathname = realTuViFontPreloadPath
    return NextResponse.rewrite(url)
  }

  if (request.nextUrl.pathname === '/lap-la-so/') {
    const url = request.nextUrl.clone()
    url.pathname = '/lap-la-so'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
