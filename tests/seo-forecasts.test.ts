import { describe, expect, it } from 'vitest'
import {
  SEO_FORECAST_SEEDS,
  SEO_FORECAST_SLUGS,
  getSeoForecastPage,
  getSeoForecastSeed,
} from '../src/content/seo-forecasts'

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function visiblePageText(page: NonNullable<ReturnType<typeof getSeoForecastPage>>): string {
  return [
    page.h1,
    ...page.intro,
    ...page.summaryRows.flatMap((row) => [row.aspect, row.trend, row.action]),
    ...page.sections.flatMap((section) => [section.heading, ...section.content]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...page.relatedLinks.flatMap((link) => [link.label, link.relation]),
  ].join(' ')
}

describe('static SEO forecast content', () => {
  it('ships the first 10 real P0 birth-year pages', () => {
    expect(SEO_FORECAST_SLUGS).toHaveLength(10)
    expect(new Set(SEO_FORECAST_SLUGS).size).toBe(10)
    expect(SEO_FORECAST_SLUGS).toContain('tuoi-ty-1984-nam')
    expect(SEO_FORECAST_SLUGS).toContain('tuoi-thin-1988-nu')
  })

  it('maps every seed to a complete static page', () => {
    for (const seed of SEO_FORECAST_SEEDS) {
      const page = getSeoForecastPage(seed.slug)
      expect(page).not.toBeNull()
      expect(page?.h1).toBe(`Tử vi tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} năm 2026`)
      expect(page?.title).toContain(`${seed.canChi} ${seed.year}`)
      expect(page?.description).toContain('công việc')
      expect(page?.intro.length).toBeGreaterThanOrEqual(2)
      expect(page?.summaryRows).toHaveLength(5)
      expect(page?.sections).toHaveLength(7)
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Tổng quan')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Công danh')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Tài lộc')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Tình duyên')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Sức khỏe')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Lời khuyên')
      expect(page?.faqs.length).toBeGreaterThanOrEqual(4)
      expect(page?.relatedLinks.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('keeps each birth-year page in the requested 1,500-2,000 word range', () => {
    for (const slug of SEO_FORECAST_SLUGS) {
      const page = getSeoForecastPage(slug)
      expect(page).not.toBeNull()
      const count = wordCount(visiblePageText(page!))
      expect(count, `${slug} word count`).toBeGreaterThanOrEqual(1500)
      expect(count, `${slug} word count`).toBeLessThanOrEqual(2000)
    }
  })

  it('does not expose placeholder, fake exact-chart, or deterministic prediction wording', () => {
    const page = getSeoForecastPage('tuoi-ty-1984-nam')
    const text = JSON.stringify(page).toLowerCase()

    expect(text).not.toContain('nội dung đang được cập nhật')
    expect(text).not.toContain('coming soon')
    expect(text).not.toContain('chắc chắn xảy ra')
    expect(text).not.toContain('dự đoán chính xác')
    expect(text).not.toContain('sẽ phát tài')
    expect(text).not.toContain('gieo quẻ')
    expect(text).toContain('tham khảo')
    expect(text).toContain('không phải lời tiên đoán')
    expect(text).toContain('không thể kết luận về sao tại mệnh cung')
  })

  it('returns null for unknown slugs', () => {
    expect(getSeoForecastSeed('unknown')).toBeNull()
    expect(getSeoForecastPage('unknown')).toBeNull()
  })
})
