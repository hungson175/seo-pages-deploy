import { NextRequest, NextResponse } from 'next/server'
import {
  buildCanonicalRedirectUrl,
  shouldRedirectToCanonicalHost,
} from '@/lib/canonical-host'

export function proxy(request: NextRequest) {
  if (shouldRedirectToCanonicalHost(request.nextUrl.hostname)) {
    return NextResponse.redirect(buildCanonicalRedirectUrl(request.url), 308)
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
