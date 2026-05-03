import { describe, expect, it } from 'vitest'
import { getRealTuViFontPreloadProxyPath } from '@/proxy'

describe('edge proxy helpers', () => {
  it('rewrites only narrow real-web font preload misses to the real-tuvi asset proxy', () => {
    expect(
      getRealTuViFontPreloadProxyPath('/_next/static/media/00f4982f357db61e-s.p.woff2'),
    ).toBe('/real-tuvi-assets/_next/static/media/00f4982f357db61e-s.p.woff2')
  })

  it('does not proxy broad top-level Next assets or non-font files', () => {
    expect(
      getRealTuViFontPreloadProxyPath('/_next/static/media/625a092f804baad3-s.p.0mrp_qm_8jqq_.woff2'),
    ).toBeNull()
    expect(getRealTuViFontPreloadProxyPath('/_next/static/chunks/app/page.js')).toBeNull()
    expect(getRealTuViFontPreloadProxyPath('/_next/static/media/00f4982f357db61e-s.p.png')).toBeNull()
  })
})
