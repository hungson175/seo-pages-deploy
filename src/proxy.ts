import { NextRequest, NextResponse } from 'next/server'
import {
  buildCanonicalRedirectUrl,
  shouldRedirectToCanonicalHost,
} from '@/lib/canonical-host'

export function proxy(request: NextRequest) {
  if (!shouldRedirectToCanonicalHost(request.nextUrl.hostname)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(buildCanonicalRedirectUrl(request.url), 308)
}

export const config = {
  matcher: '/:path*',
}
