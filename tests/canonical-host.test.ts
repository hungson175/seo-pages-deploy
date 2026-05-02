import { describe, expect, it } from 'vitest'
import {
  buildCanonicalRedirectUrl,
  shouldRedirectToCanonicalHost,
} from '@/lib/canonical-host'

describe('canonical host enforcement', () => {
  it('does not redirect the canonical apex domain', () => {
    expect(shouldRedirectToCanonicalHost('boitoan.com.vn')).toBe(false)
  })

  it('redirects www and Vercel hosts', () => {
    expect(shouldRedirectToCanonicalHost('www.boitoan.com.vn')).toBe(true)
    expect(shouldRedirectToCanonicalHost('seo-pages-team.vercel.app')).toBe(true)
    expect(shouldRedirectToCanonicalHost('seo-pages-team-abc-hung-son-phams-projects.vercel.app')).toBe(true)
  })

  it('does not claim unrelated domains such as boitoan.vn', () => {
    expect(shouldRedirectToCanonicalHost('boitoan.vn')).toBe(false)
  })

  it('preserves path and query when building canonical URL', () => {
    expect(
      buildCanonicalRedirectUrl('https://seo-pages-team.vercel.app/tu-vi/?utm=test')
    ).toBe('https://boitoan.com.vn/tu-vi/?utm=test')
  })
})
