export const CANONICAL_HOST = 'boitoan.com.vn'
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`

const REDIRECT_HOSTS = new Set(['www.boitoan.com.vn', 'seo-pages-team.vercel.app'])

export function shouldRedirectToCanonicalHost(hostname: string): boolean {
  const host = hostname.toLowerCase()

  if (host === CANONICAL_HOST) return false
  if (REDIRECT_HOSTS.has(host)) return true

  return host.endsWith('.vercel.app')
}

export function buildCanonicalRedirectUrl(inputUrl: string): string {
  const url = new URL(inputUrl)
  url.protocol = 'https:'
  url.hostname = CANONICAL_HOST
  url.port = ''
  return url.toString()
}
