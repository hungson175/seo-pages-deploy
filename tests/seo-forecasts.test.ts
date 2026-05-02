import { describe, expect, it } from 'vitest'
import {
  SEO_FORECAST_SEEDS,
  SEO_FORECAST_SLUGS,
  getSeoForecastPage,
  getSeoForecastSeed,
} from '../src/content/seo-forecasts'

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
      expect(page?.title).toContain('Tử vi tuổi')
      expect(page?.description).toContain('công danh')
      expect(page?.sections).toHaveLength(6)
      expect(page?.faqs.length).toBeGreaterThanOrEqual(3)
      expect(page?.sections.flatMap((section) => section.content).join(' ').length).toBeGreaterThan(2500)
    }
  })

  it('does not expose placeholder or deterministic prediction wording', () => {
    const page = getSeoForecastPage('tuoi-ty-1984-nam')
    const text = JSON.stringify(page).toLowerCase()

    expect(text).not.toContain('nội dung đang được cập nhật')
    expect(text).not.toContain('coming soon')
    expect(text).not.toContain('chắc chắn xảy ra')
    expect(text).toContain('tham khảo')
    expect(text).toContain('không phải lời tiên đoán')
  })

  it('returns null for unknown slugs', () => {
    expect(getSeoForecastSeed('unknown')).toBeNull()
    expect(getSeoForecastPage('unknown')).toBeNull()
  })
})
