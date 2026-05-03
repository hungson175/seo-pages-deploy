import { describe, expect, it } from 'vitest'
import { mapRealTuViApiPath, sanitizeRealTuViApiText } from '../src/lib/real-tuvi-proxy'

describe('real tu vi API proxy mapping', () => {
  it('maps frontend API routes directly to the Railway backend root', () => {
    expect(mapRealTuViApiPath(['chart'])).toBe('/chart')
    expect(mapRealTuViApiPath(['chart', 'abc123'])).toBe('/chart/abc123')
    expect(mapRealTuViApiPath(['can-chi'])).toBe('/can-chi')
    expect(mapRealTuViApiPath(['chat'])).toBe('/chat')
    expect(mapRealTuViApiPath(['feedback'])).toBe('/feedback')
  })

  it('rewrites frontend hyphen route names to backend underscore endpoints', () => {
    expect(mapRealTuViApiPath(['chart', 'abc123', 'luan-giai', 'tinh-cach'])).toBe('/chart/abc123/luan_giai/tinh_cach')
    expect(mapRealTuViApiPath(['chart', 'abc123', 'luan-giai', 'tinh-duyen'])).toBe('/chart/abc123/luan_giai/tinh_duyen')
    expect(mapRealTuViApiPath(['chart', 'abc123', 'luan-giai', 'su-nghiep'])).toBe('/chart/abc123/luan_giai/su_nghiep')
    expect(mapRealTuViApiPath(['chart', 'abc123', 'luan-giai', 'dai-van', '2'])).toBe('/chart/abc123/luan_giai/dai_van/2')
    expect(mapRealTuViApiPath(['chart', 'abc123', 'luan-giai', 'tieu-han', '2', '3'])).toBe('/chart/abc123/luan_giai/tieu_han/2/3')
    expect(mapRealTuViApiPath(['chart', 'abc123', 'tieu-han-all'])).toBe('/chart/abc123/tieu_han_all')
    expect(mapRealTuViApiPath(['chart', 'abc123', 'tieu-han', '2'])).toBe('/chart/abc123/tieu_han/2')
  })

  it('url-encodes dynamic palace chi segments safely', () => {
    expect(mapRealTuViApiPath(['chart', 'abc123', 'luan-giai', 'cung', 'Tý'])).toBe('/chart/abc123/luan_giai/cung/T%C3%BD')
  })

  it('sanitizes legacy backend palace naming leaks while Railway catches up', () => {
    const legacy = JSON.stringify({
      palaces: [{ name: 'Tử Tức', slug: 'tu_tuc', url: '/cung/tu-tuc', cjk: '子息' }],
      note: 'Tu Tuc legacy spelling',
    })

    const sanitized = sanitizeRealTuViApiText(legacy)

    expect(sanitized).not.toContain('Tử Tức')
    expect(sanitized).not.toContain('tu_tuc')
    expect(sanitized).not.toContain('tu-tuc')
    expect(sanitized).not.toContain('子息')
    expect(sanitized).toContain('Tử Nữ')
    expect(sanitized).toContain('tu_nu')
    expect(sanitized).toContain('tu-nu')
    expect(sanitized).toContain('子女')
  })
})
