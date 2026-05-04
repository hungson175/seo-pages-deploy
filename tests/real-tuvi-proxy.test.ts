import { afterEach, describe, expect, it } from 'vitest'
import {
  applyChatVisibilityGate,
  buildReadingServerFallback,
  extractReadingChartId,
  getRealTuViApiOrigin,
  getRealTuViOrigin,
  injectReadingServerFallback,
  isRealTuViChatEnabled,
  lockedReadingFallback,
  mapRealTuViApiPath,
  proxyRealTuViApi,
  proxyRealTuViGet,
  sanitizeRealTuViApiText,
  sanitizeRealTuViAssetText,
  sanitizeRealTuViHtmlText,
  sanitizeRealTuViPrivacyContactText,
} from '../src/lib/real-tuvi-proxy'

describe('real tu vi API proxy mapping', () => {
  const originalPrivacyContactEmail = process.env.PRIVACY_CONTACT_EMAIL
  const originalRealTuViOrigin = process.env.REAL_TUVI_ORIGIN
  const originalRealTuViApiOrigin = process.env.REAL_TUVI_API_ORIGIN
  const originalGeneratedReadingsMode = process.env.REAL_TUVI_GENERATED_READINGS_MODE
  const originalRealTuViChatEnabled = process.env.REAL_TUVI_CHAT_ENABLED
  const originalChatEnabled = process.env.CHAT_ENABLED

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
    if (originalGeneratedReadingsMode === undefined) {
      delete process.env.REAL_TUVI_GENERATED_READINGS_MODE
    } else {
      process.env.REAL_TUVI_GENERATED_READINGS_MODE = originalGeneratedReadingsMode
    }
    if (originalRealTuViChatEnabled === undefined) {
      delete process.env.REAL_TUVI_CHAT_ENABLED
    } else {
      process.env.REAL_TUVI_CHAT_ENABLED = originalRealTuViChatEnabled
    }
    if (originalChatEnabled === undefined) {
      delete process.env.CHAT_ENABLED
    } else {
      process.env.CHAT_ENABLED = originalChatEnabled
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

  it('normalizes Tý sớm/Tý muộn labels and forbids the Tử typo in proxied real app text', () => {
    const upstream = [
      '13 lựa chọn gồm Tý sớm và Tý muộn',
      'Tý sớm 0h-1h',
      'Tý muộn 23h-24h',
      'Nếu chưa nhớ rõ, hãy chọn khung giờ gần nhất và đọc kết quả như bản tham khảo sơ bộ.',
    ].join(' ')
    const sanitized = sanitizeRealTuViAssetText(upstream)

    expect(sanitized).toContain('Tý sớm (00:00-00:59)')
    expect(sanitized).toContain('Tý muộn (23:00-23:59)')
    expect(sanitized).toContain('Tý sớm (00:00-00:59) giữ nguyên ngày âm lịch')
    expect(sanitized).toContain('Tý muộn (23:00-23:59) tính sang ngày âm lịch hôm sau')
    expect(sanitized).not.toContain('0h-1h')
    expect(sanitized).not.toContain('23h-24h')
    expect(sanitized).not.toContain('Tử sớm')
    expect(sanitized).not.toContain('Tử muộn')
    expect(sanitized).not.toContain('tốt hơn')
    expect(sanitized).not.toContain('xấu hơn')
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

  it('keeps reading chat hidden by default until the production feature flag is explicitly enabled', () => {
    delete process.env.REAL_TUVI_CHAT_ENABLED
    delete process.env.CHAT_ENABLED

    const upstream = [
      '<html><body>',
      '<main><h1>Lá số của bạn</h1><aside class="rdg-chat">Gợi ý hỏi Bói Toán Bạn muốn hỏi thêm điều gì?</aside>',
      '<button>命 Hỏi</button></main>',
      '</body></html>',
    ].join('')
    const gated = applyChatVisibilityGate(upstream)

    expect(isRealTuViChatEnabled()).toBe(false)
    expect(gated).toContain('data-boitoan-chat-gate="disabled"')
    expect(gated).toContain('data-boitoan-chat-disabled')
    expect(gated).toContain('.rdg-chat')
    expect(gated).toContain('data-boitoan-chat-hidden')
    expect(gated).not.toContain('Không thể kết nối')
    expect(gated).not.toContain('AI đang lỗi')
  })

  it('does not inject the chat visibility gate when chat is explicitly enabled', () => {
    process.env.REAL_TUVI_CHAT_ENABLED = 'true'
    const upstream = '<html><body><aside class="rdg-chat">Bạn muốn hỏi thêm điều gì?</aside></body></html>'

    expect(isRealTuViChatEnabled()).toBe(true)
    expect(applyChatVisibilityGate(upstream)).toBe(upstream)
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

  it('uses the safe reading fallback when paid generated tabs fail upstream during shadow smoke', async () => {
    const originalFetch = global.fetch
    global.fetch = async () =>
      new Response(JSON.stringify({ detail: '[su_nghiep/tong_quan] all 3 attempts failed' }), {
        status: 503,
        headers: { 'content-type': 'application/json' },
      })

    try {
      const response = await proxyRealTuViApi(
        ['chart', 'abc123', 'luan-giai', 'su-nghiep'],
        {
          method: 'GET',
          headers: new Headers(),
          nextUrl: { search: '' },
          arrayBuffer: async () => new ArrayBuffer(0),
        } as never,
      )
      const text = await response.text()

      expect(response.status).toBe(200)
      expect(response.headers.get('x-boitoan-proxy-fallback')).toBe('locked-reading')
      expect(text).toContain('đang được hoàn thiện cho bản public')
      expect(text).not.toContain('all 3 attempts failed')
      expect(text).not.toContain('suggested_packages')
      expect(text).not.toContain('49000')
    } finally {
      global.fetch = originalFetch
    }
  })

  it('uses the safe reading fallback when tinh-cach generated prefetch fails upstream', async () => {
    const originalFetch = global.fetch
    global.fetch = async () =>
      new Response(JSON.stringify({ detail: '[tinh_cach/tong_quan] all attempts failed' }), {
        status: 503,
        headers: { 'content-type': 'application/json' },
      })

    try {
      const response = await proxyRealTuViApi(
        ['chart', 'abc123', 'luan-giai', 'tinh-cach'],
        {
          method: 'GET',
          headers: new Headers(),
          nextUrl: { search: '' },
          arrayBuffer: async () => new ArrayBuffer(0),
        } as never,
      )
      const text = await response.text()

      expect(response.status).toBe(200)
      expect(response.headers.get('x-boitoan-proxy-fallback')).toBe('locked-reading')
      expect(text).toContain('Tìm hiểu bản thân')
      expect(text).toContain('đang được hoàn thiện')
      expect(text).not.toContain('all attempts failed')
      expect(text).not.toContain('suggested_packages')
      expect(text).not.toContain('49000')
    } finally {
      global.fetch = originalFetch
    }
  })

  it('can short-circuit generated readings to safe fallback without calling upstream', async () => {
    const originalFetch = global.fetch
    process.env.REAL_TUVI_GENERATED_READINGS_MODE = 'safe-fallback'
    global.fetch = async () => {
      throw new Error('fetch should not be called when generated readings are disabled')
    }

    try {
      const response = await proxyRealTuViApi(
        ['chart', 'abc123', 'luan-giai', 'tinh-cach'],
        {
          method: 'GET',
          headers: new Headers(),
          nextUrl: { search: '' },
          arrayBuffer: async () => new ArrayBuffer(0),
        } as never,
      )
      const text = await response.text()

      expect(response.status).toBe(200)
      expect(response.headers.get('x-boitoan-proxy-fallback')).toBe('locked-reading')
      expect(response.headers.get('x-boitoan-proxy-fallback-reason')).toBe('generated-readings-disabled')
      expect(text).toContain('Tìm hiểu bản thân')
      expect(text).not.toContain('suggested_packages')
    } finally {
      global.fetch = originalFetch
    }
  })

  it('extracts reading chart IDs for the SSR safety net only on reading pages', () => {
    expect(extractReadingChartId('/reading/abc123')).toBe('abc123')
    expect(extractReadingChartId('/reading/abc%20123')).toBe('abc 123')
    expect(extractReadingChartId('/api/chart/abc123')).toBeNull()
    expect(extractReadingChartId('/reading/')).toBeNull()
  })

  it('builds a no-JS reading fallback from chart data without leaking legacy Tử Tức naming', () => {
    const fallback = buildReadingServerFallback({
      name: 'Debug',
      gender: 'Nam',
      birthDate: '1990-01-01',
      birthHour: 'Ngo',
      canNam: 'Kỷ',
      chiNam: 'Tỵ',
      cucSo: 'Thổ Ngũ cục',
      menhCung: 'Mệnh ở Mùi',
      thanChi: 'Mùi',
      palaces: [
        {
          name: 'Mệnh',
          chi: 'Mùi',
          stars: [{ name: 'Thiên Lương', type: 'main' }],
          isMenh: true,
          isThan: true,
        },
        {
          name: 'Tử Tức',
          chi: 'Thìn',
          stars: [{ name: 'Tham Lang', type: 'main' }],
        },
      ],
    })

    expect(fallback).toContain('data-boitoan-reading-ssr-fallback')
    expect(fallback).toContain('Lá số đã tạo')
    expect(fallback).toContain('Debug')
    expect(fallback).toContain('Thiên Lương')
    expect(fallback).toContain('Tử Nữ')
    expect(fallback).not.toContain('Tử Tức')
    expect(fallback).toContain('không phải lời tiên đoán hay lời khẳng định tương lai')
  })

  it('injects the reading fallback into the HTML body before the loading-only shell', () => {
    const html = '<html><head></head><body><main>Đang hiển thị lá số…</main></body></html>'
    const injected = injectReadingServerFallback(html, '<section data-boitoan-reading-ssr-fallback>Fallback</section>')

    expect(injected).toContain('<body><section data-boitoan-reading-ssr-fallback>Fallback</section><main>')
    expect(injectReadingServerFallback(injected, '<section>Duplicate</section>')).toBe(injected)
  })

  it('adds a server-rendered reading fallback when proxied reading HTML is loading-only', async () => {
    const originalFetch = global.fetch
    const calls: string[] = []
    process.env.REAL_TUVI_ORIGIN = 'http://real-web:3000'
    process.env.REAL_TUVI_API_ORIGIN = 'http://api:8000'
    global.fetch = async (input) => {
      const url = String(input)
      calls.push(url)
      if (url === 'http://real-web:3000/reading/abc123') {
        return new Response('<html><body><main>Đang hiển thị lá số…</main></body></html>', {
          status: 200,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        })
      }
      if (url === 'http://api:8000/chart/abc123') {
        return new Response(JSON.stringify({
          name: 'Debug',
          gender: 'Nam',
          birthDate: '1990-01-01',
          birthHour: 'Ngo',
          canNam: 'Kỷ',
          chiNam: 'Tỵ',
          cucSo: 'Thổ Ngũ cục',
          menhCung: 'Mệnh ở Mùi',
          thanChi: 'Mùi',
          palaces: [
            { name: 'Mệnh', chi: 'Mùi', stars: [{ name: 'Thiên Lương', type: 'main' }], isMenh: true },
            { name: 'Tử Tức', chi: 'Thìn', stars: [{ name: 'Tham Lang', type: 'main' }] },
          ],
        }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      }
      throw new Error(`unexpected fetch ${url}`)
    }

    try {
      const response = await proxyRealTuViGet('/reading/abc123', {
        headers: new Headers(),
        nextUrl: { search: '' },
      } as never)
      const html = await response.text()

      expect(response.status).toBe(200)
      expect(calls).toEqual(['http://real-web:3000/reading/abc123', 'http://api:8000/chart/abc123'])
      expect(html).toContain('data-boitoan-reading-ssr-fallback')
      expect(html).toContain('data-boitoan-chat-gate="disabled"')
      expect(html).toContain('Lá số đã tạo')
      expect(html).toContain('Tử Nữ')
      expect(html).not.toContain('Tử Tức')
      expect(html.indexOf('data-boitoan-reading-ssr-fallback')).toBeLessThan(html.indexOf('Đang hiển thị lá số'))
    } finally {
      global.fetch = originalFetch
    }
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
