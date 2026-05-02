import { describe, it, expect } from 'vitest'
import { buildMetadata } from '../src/lib/metadata'

describe('buildMetadata — robots directive', () => {
  it('indexes forecast pages by default', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/tuvi/tuoi-ty-2026-nam',
      pageType: 'forecast',
    })
    expect(meta.robots).toEqual({ index: true, follow: true })
  })

  it('indexes star pages', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/sao/tu-vi',
      pageType: 'star',
    })
    expect(meta.robots).toEqual({ index: true, follow: true })
  })

  it('indexes palace pages', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/cung/menh',
      pageType: 'palace',
    })
    expect(meta.robots).toEqual({ index: true, follow: true })
  })

  it('indexes approved star×cung pages', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/sao/tu-vi/cung/menh/',
      pageType: 'star-palace',
    })
    expect(meta.robots).toEqual({ index: true, follow: true })
  })

  it('indexes que pages', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/que/kien-vi-thien',
      pageType: 'que',
    })
    expect(meta.robots).toEqual({ index: true, follow: true })
  })

  it('indexes tool page (has content, schema, FAQ)', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/lap-la-so',
      pageType: 'tool',
    })
    expect(meta.robots).toEqual({ index: true, follow: true })
  })

  it('noindexes form-only pages', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/contact',
      pageType: 'form',
    })
    expect(meta.robots).toEqual({ index: false, follow: true })
  })

  it('noindexes 404/error pages', () => {
    const meta = buildMetadata({
      title: 'Not Found',
      description: 'Page not found',
      path: '/404',
      pageType: 'error',
    })
    expect(meta.robots).toEqual({ index: false, follow: false })
  })

  it('defaults to index if pageType not specified', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/',
    })
    expect(meta.robots).toEqual({ index: true, follow: true })
  })
})

describe('buildMetadata — title templates', () => {
  it('uses forecast title template', () => {
    const meta = buildMetadata({
      title: 'Xem tử vi tuổi Tý 2026 nam',
      description: 'Test',
      path: '/tuvi/tuoi-ty-2026-nam',
      pageType: 'forecast',
    })
    expect(meta.title).toBe('Xem tử vi tuổi Tý 2026 nam | Bói Toán')
  })

  it('uses star title template', () => {
    const meta = buildMetadata({
      title: 'Sao Tử Vi',
      description: 'Test',
      path: '/sao/tu-vi',
      pageType: 'star',
    })
    expect(meta.title).toBe('Sao Tử Vi | Bói Toán')
  })

  it('uses palace title template', () => {
    const meta = buildMetadata({
      title: 'Cung Mệnh trong Tử Vi',
      description: 'Test',
      path: '/cung/menh',
      pageType: 'palace',
    })
    expect(meta.title).toBe('Cung Mệnh trong Tử Vi | Bói Toán')
  })

  it('uses que title template', () => {
    const meta = buildMetadata({
      title: 'Quẻ Kiển Vì Thiên',
      description: 'Test',
      path: '/que/kien-vi-thien',
      pageType: 'que',
    })
    expect(meta.title).toBe('Quẻ Kiển Vì Thiên | Bói Toán')
  })

  it('does not duplicate site suffix when title already includes it', () => {
    const meta = buildMetadata({
      title: 'Khám Phá Quẻ Càn Vi Thiên | Bói Toán',
      description: 'Test',
      path: '/que/1-kien-vi-thien',
      pageType: 'que',
    })

    expect(meta.title).toBe('Khám Phá Quẻ Càn Vi Thiên | Bói Toán')
    expect(meta.openGraph?.title).toBe('Khám Phá Quẻ Càn Vi Thiên | Bói Toán')
    expect(meta.twitter?.title).toBe('Khám Phá Quẻ Càn Vi Thiên | Bói Toán')
  })

  it('uses tool title template', () => {
    const meta = buildMetadata({
      title: 'Lập lá số tử vi online',
      description: 'Test',
      path: '/lap-la-so',
      pageType: 'tool',
    })
    expect(meta.title).toBe('Lập lá số tử vi online | Bói Toán')
  })
})

describe('buildMetadata — description templates', () => {
  it('description includes benefit + CTA', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Xem tử vi chi tiết, miễn phí. Tham khảo ngay!',
      path: '/tuvi/tuoi-ty-2026-nam',
      pageType: 'forecast',
    })
    expect(meta.description).toBe('Xem tử vi chi tiết, miễn phí. Tham khảo ngay!')
  })

  it('description is ≤ 160 characters', () => {
    const longDesc = 'A'.repeat(200)
    const meta = buildMetadata({
      title: 'Test',
      description: longDesc,
      path: '/test',
      pageType: 'forecast',
    })
    expect(meta.description!.length).toBeLessThanOrEqual(160)
  })
})

describe('buildMetadata — canonical URLs', () => {
  it('sets canonical to full URL', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/tuvi/tuoi-ty-2026-nam',
      pageType: 'forecast',
    })
    expect(meta.alternates?.canonical).toBe('https://boitoan.com.vn/tuvi/tuoi-ty-2026-nam')
  })
})

describe('buildMetadata — Open Graph', () => {
  it('includes og:title matching page title', () => {
    const meta = buildMetadata({
      title: 'Xem tử vi tuổi Tý',
      description: 'Test desc',
      path: '/tuvi/tuoi-ty',
      pageType: 'forecast',
    })
    expect(meta.openGraph?.title).toBe('Xem tử vi tuổi Tý | Bói Toán')
  })

  it('includes og:description', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test description',
      path: '/test',
      pageType: 'forecast',
    })
    expect(meta.openGraph?.description).toBe('Test description')
  })

  it('includes og:url with full path', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test',
      path: '/tuvi/tuoi-ty',
      pageType: 'forecast',
    })
    expect(meta.openGraph?.url).toBe('https://boitoan.com.vn/tuvi/tuoi-ty')
  })
})
