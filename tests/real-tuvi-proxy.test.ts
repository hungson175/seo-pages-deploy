import { describe, expect, it } from 'vitest'
import {
  mapRealTuViApiPath,
  sanitizeRealTuViApiText,
  sanitizeRealTuViAssetText,
  sanitizeRealTuViHtmlText,
} from '../src/lib/real-tuvi-proxy'

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

  it('normalizes proxied HTML disclaimers to the approved Article 320 phrase', () => {
    const upstream = '<main><p>Tử Tức — không phải lời khẳng định tương lai.</p></main>'
    const sanitized = sanitizeRealTuViHtmlText(upstream)

    expect(sanitized).toContain('Tử Nữ')
    expect(sanitized).not.toContain('Tử Tức')
    expect(sanitized).not.toContain('không phải lời khẳng định tương lai')
    expect(sanitized).toContain('không phải lời tiên đoán hay lời khẳng định tương lai')
  })

  it('normalizes real app JavaScript asset text so hydrated copy matches SSR', () => {
    const upstream = [
      '"Nội dung dùng để tham khảo và tự suy ngẫm, không phải lời khẳng định tương lai."',
      '"Nội dung d\\xf9ng để tham khảo v\\xe0 tự suy ngẫm, kh\\xf4ng phải lời khẳng định tương lai."',
      'self.__next_public_path__="/_next/"',
    ].join(';')
    const sanitized = sanitizeRealTuViAssetText(upstream)

    expect(sanitized).toContain('không phải lời tiên đoán hay lời khẳng định tương lai')
    expect(sanitized).not.toContain('không phải lời khẳng định tương lai."')
    expect(sanitized).toContain('/real-tuvi-assets/_next/')
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
