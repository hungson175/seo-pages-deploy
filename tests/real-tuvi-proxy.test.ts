import { afterEach, describe, expect, it } from 'vitest'
import {
  getRealTuViApiOrigin,
  getRealTuViOrigin,
  lockedReadingFallback,
  mapRealTuViApiPath,
  sanitizeRealTuViApiText,
  sanitizeRealTuViAssetText,
  sanitizeRealTuViHtmlText,
  sanitizeRealTuViPrivacyContactText,
} from '../src/lib/real-tuvi-proxy'

describe('real tu vi API proxy mapping', () => {
  const originalPrivacyContactEmail = process.env.PRIVACY_CONTACT_EMAIL
  const originalRealTuViOrigin = process.env.REAL_TUVI_ORIGIN
  const originalRealTuViApiOrigin = process.env.REAL_TUVI_API_ORIGIN

  afterEach(() => {
    if (originalPrivacyContactEmail === undefined) {
      delete process.env.PRIVACY_CONTACT_EMAIL
    } else {
      process.env.PRIVACY_CONTACT_EMAIL = originalPrivacyContactEmail
    }
    if (originalRealTuViOrigin === undefined) {
      delete process.env.REAL_TUVI_ORIGIN
    } else {
      process.env.REAL_TUVI_ORIGIN = originalRealTuViOrigin
    }
    if (originalRealTuViApiOrigin === undefined) {
      delete process.env.REAL_TUVI_API_ORIGIN
    } else {
      process.env.REAL_TUVI_API_ORIGIN = originalRealTuViApiOrigin
    }
  })

  it('maps frontend API routes directly to the Railway backend root', () => {
    expect(mapRealTuViApiPath(['chart'])).toBe('/chart')
    expect(mapRealTuViApiPath(['chart', 'abc123'])).toBe('/chart/abc123')
    expect(mapRealTuViApiPath(['can-chi'])).toBe('/can-chi')
    expect(mapRealTuViApiPath(['chat'])).toBe('/chat')
    expect(mapRealTuViApiPath(['feedback'])).toBe('/feedback')
  })

  it('allows OCI-SG containers to override real app upstream origins via env', () => {
    delete process.env.REAL_TUVI_ORIGIN
    delete process.env.REAL_TUVI_API_ORIGIN
    expect(getRealTuViOrigin()).toBe('https://web-neon-tau-79.vercel.app')
    expect(getRealTuViApiOrigin()).toBe('https://horoscope-production-987b.up.railway.app')

    process.env.REAL_TUVI_ORIGIN = 'http://real-web:3000'
    process.env.REAL_TUVI_API_ORIGIN = 'http://api:8000'

    expect(getRealTuViOrigin()).toBe('http://real-web:3000')
    expect(getRealTuViApiOrigin()).toBe('http://api:8000')
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

  it('keeps the default privacy contact unchanged unless an approved override is configured', () => {
    delete process.env.PRIVACY_CONTACT_EMAIL
    const upstream = [
      'href="mailto:privacy@boitoan.com.vn?subject=Yeu%20cau%20xoa%20du%20lieu%20la%20so"',
      'Bói Toán sẽ phản hồi qua kênh liên hệ bạn cung cấp sau khi kiểm tra đủ thông tin để xác định đúng dữ liệu cần xóa.',
    ].join(' ')

    const sanitized = sanitizeRealTuViPrivacyContactText(upstream)

    expect(sanitized).toContain('mailto:privacy@boitoan.com.vn')
    expect(sanitized).not.toContain('giai đoạn đầu sau khi ra mắt')
  })

  it('can switch the privacy deletion contact to an approved monitored substitute', () => {
    process.env.PRIVACY_CONTACT_EMAIL = 'support@example.com'
    const upstream = [
      'href="mailto:privacy@boitoan.com.vn?subject=Yeu%20cau%20xoa%20du%20lieu%20la%20so"',
      'Bói Toán sẽ phản hồi qua kênh liên hệ bạn cung cấp sau khi kiểm tra đủ thông tin để xác định đúng dữ liệu cần xóa.',
    ].join(' ')

    const sanitized = sanitizeRealTuViPrivacyContactText(upstream)

    expect(sanitized).toContain('mailto:support@example.com')
    expect(sanitized).not.toContain('privacy@boitoan.com.vn')
    expect(sanitized).toContain('giai đoạn đầu sau khi ra mắt')
    expect(sanitized).not.toContain('2 ngày làm việc')
    expect(sanitized).not.toContain('7 ngày làm việc')
  })

  it('builds a safe public placeholder for locked reading tabs', () => {
    const fallback = lockedReadingFallback(['chart', 'abc123', 'luan-giai', 'su-nghiep'])

    expect(fallback).toMatchObject({
      locked: true,
      hero: {
        headline: 'Sự nghiệp & nguồn lực đang được mở sau',
      },
    })
    expect(JSON.stringify(fallback)).toContain('đang được hoàn thiện cho bản public')
    expect(JSON.stringify(fallback)).not.toContain('Đọc bản thân')
    expect(JSON.stringify(fallback)).not.toContain('49000')
    expect(JSON.stringify(fallback)).not.toContain('2 ngày làm việc')
    expect(JSON.stringify(fallback)).not.toContain('7 ngày làm việc')
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
