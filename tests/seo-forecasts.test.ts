import { describe, expect, it } from 'vitest'
import {
  SEO_FORECAST_SEEDS,
  SEO_FORECAST_SLUGS,
  SEO_FORECAST_CANONICAL_SLUGS,
  getSeoForecastPage,
  getSeoForecastSeed,
} from '../src/content/seo-forecasts'
import { getAnimalHubPage } from '../src/content/animal-hubs'
import sitemapTuvi from '../src/app/sitemap-tuvi'
import robots from '../src/app/robots'

const BY2A_EXPECTED_SEEDS = [
  { slug: 'tuoi-ty-1996-nam', canonical: 'binh-ty-1996-nam-mang', canChi: 'Bính Tý', year: 1996, animal: 'Tý', element: 'Giản Hạ Thủy' },
  { slug: 'tuoi-ty-1996-nu', canonical: 'binh-ty-1996-nu-mang', canChi: 'Bính Tý', year: 1996, animal: 'Tý', element: 'Giản Hạ Thủy' },
  { slug: 'tuoi-suu-1997-nam', canonical: 'dinh-suu-1997-nam-mang', canChi: 'Đinh Sửu', year: 1997, animal: 'Sửu', element: 'Giản Hạ Thủy' },
  { slug: 'tuoi-suu-1997-nu', canonical: 'dinh-suu-1997-nu-mang', canChi: 'Đinh Sửu', year: 1997, animal: 'Sửu', element: 'Giản Hạ Thủy' },
  { slug: 'tuoi-dan-1998-nam', canonical: 'mau-dan-1998-nam-mang', canChi: 'Mậu Dần', year: 1998, animal: 'Dần', element: 'Thành Đầu Thổ' },
  { slug: 'tuoi-dan-1998-nu', canonical: 'mau-dan-1998-nu-mang', canChi: 'Mậu Dần', year: 1998, animal: 'Dần', element: 'Thành Đầu Thổ' },
  { slug: 'tuoi-mao-1999-nam', canonical: 'ky-mao-1999-nam-mang', canChi: 'Kỷ Mão', year: 1999, animal: 'Mão', element: 'Thành Đầu Thổ' },
  { slug: 'tuoi-mao-1999-nu', canonical: 'ky-mao-1999-nu-mang', canChi: 'Kỷ Mão', year: 1999, animal: 'Mão', element: 'Thành Đầu Thổ' },
  { slug: 'tuoi-thin-2000-nam', canonical: 'canh-thin-2000-nam-mang', canChi: 'Canh Thìn', year: 2000, animal: 'Thìn', element: 'Bạch Lạp Kim' },
  { slug: 'tuoi-thin-2000-nu', canonical: 'canh-thin-2000-nu-mang', canChi: 'Canh Thìn', year: 2000, animal: 'Thìn', element: 'Bạch Lạp Kim' },
  { slug: 'tuoi-ti-2001-nam', canonical: 'tan-ty-2001-nam-mang', canChi: 'Tân Tỵ', year: 2001, animal: 'Tỵ', element: 'Bạch Lạp Kim' },
  { slug: 'tuoi-ti-2001-nu', canonical: 'tan-ty-2001-nu-mang', canChi: 'Tân Tỵ', year: 2001, animal: 'Tỵ', element: 'Bạch Lạp Kim' },
]

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function visiblePageText(page: NonNullable<ReturnType<typeof getSeoForecastPage>>): string {
  return [
    page.h1,
    page.methodNote,
    ...page.intro,
    ...page.summaryRows.flatMap((row) => [row.aspect, row.trend, row.action]),
    ...page.sections.flatMap((section) => [section.heading, ...section.content]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ')
}

function extractNgrams(text: string, n = 4): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  const ngrams = new Set<string>()
  for (let i = 0; i <= words.length - n; i += 1) {
    ngrams.add(words.slice(i, i + n).join(' '))
  }
  return ngrams
}

function jaccardSimilarity(textA: string, textB: string, n = 4): number {
  const a = extractNgrams(textA, n)
  const b = extractNgrams(textB, n)
  const intersection = [...a].filter((item) => b.has(item)).length
  const union = new Set([...a, ...b]).size
  return union === 0 ? 0 : intersection / union
}

describe('static SEO forecast content', () => {
  it('ships 36 real birth-year pages after BY-2A across all 12 animal signs', () => {
    expect(SEO_FORECAST_SLUGS).toHaveLength(36)
    expect(new Set(SEO_FORECAST_SLUGS).size).toBe(36)
    expect(SEO_FORECAST_SLUGS).toContain('tuoi-ty-1984-nam')
    expect(SEO_FORECAST_SLUGS).toContain('tuoi-thin-1988-nu')
    expect(SEO_FORECAST_SLUGS).toContain('tuoi-ti-1989-nam')
    expect(SEO_FORECAST_SLUGS).toContain('tuoi-hoi-1995-nu')
    expect(SEO_FORECAST_CANONICAL_SLUGS).toContain('giap-ty-1984-nam-mang')
    expect(SEO_FORECAST_CANONICAL_SLUGS).toContain('mau-thin-1988-nu-mang')
    expect(SEO_FORECAST_CANONICAL_SLUGS).toContain('ky-ty-1989-nam-mang')
    expect(SEO_FORECAST_CANONICAL_SLUGS).toContain('at-hoi-1995-nu-mang')
    for (const seed of BY2A_EXPECTED_SEEDS) {
      expect(SEO_FORECAST_SLUGS).toContain(seed.slug)
      expect(SEO_FORECAST_CANONICAL_SLUGS).toContain(seed.canonical)
    }
  })

  it('uses the approved BY-2A Can Chi and nạp âm seed table', () => {
    for (const expected of BY2A_EXPECTED_SEEDS) {
      const seed = getSeoForecastSeed(expected.slug)
      expect(seed, expected.slug).not.toBeNull()
      expect(seed).toMatchObject({
        animal: expected.animal,
        year: expected.year,
        canChi: expected.canChi,
        element: expected.element,
      })
      expect(getSeoForecastPage(expected.canonical)?.urlPath).toBe(`/tu-vi-2026/${expected.canonical}/`)
    }
  })

  it('keeps BY-2A tone/career/money/love/health/advice seeds unique per page', () => {
    const fields = ['tone', 'career', 'money', 'love', 'health', 'advice'] as const

    for (const field of fields) {
      const values = BY2A_EXPECTED_SEEDS.map((expected) => {
        const seed = getSeoForecastSeed(expected.slug)
        expect(seed, expected.slug).not.toBeNull()
        return seed![field]
      })

      expect(new Set(values).size, `BY-2A unique ${field} seeds`).toBe(values.length)
    }
  })

  it('adds BY-2A URLs to tuvi.xml sitemap and exposes tuvi.xml directly in robots', () => {
    const entries = sitemapTuvi()
    const urls = entries.map((entry) => entry.url)

    expect(urls).toHaveLength(49)
    for (const expected of BY2A_EXPECTED_SEEDS) {
      expect(urls).toContain(`https://boitoan.com.vn/tu-vi-2026/${expected.canonical}/`)
    }
    expect(entries.every((entry) => entry.lastModified === '2026-05-05')).toBe(true)
    expect(robots().sitemap).toContain('https://boitoan.com.vn/tuvi.xml')
  })

  it('enriches Tý through Tỵ animal hubs once they reach four linked forecasts', () => {
    for (const slug of ['tuoi-ty', 'tuoi-suu', 'tuoi-dan', 'tuoi-mao', 'tuoi-thin', 'tuoi-ti']) {
      const hub = getAnimalHubPage(slug)
      expect(hub, slug).not.toBeNull()
      expect(hub?.linkedForecasts).toHaveLength(4)
      expect(hub?.clusterInsights.length, `${slug} cluster insights`).toBeGreaterThanOrEqual(3)
      expect(hub?.clusterInsights.join(' ')).toContain('không phải lá số cá nhân')
    }
  })

  it('maps every seed to a complete static page', () => {
    for (const seed of SEO_FORECAST_SEEDS) {
      const page = getSeoForecastPage(seed.slug)
      expect(page).not.toBeNull()
      expect(page?.h1).toBe(`Tử vi tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} năm 2026`)
      expect(page?.title).toContain(`${seed.canChi} ${seed.year}`)
      expect(page?.description).toContain('công việc')
      expect(page?.methodNote).toContain('Tam Hợp Phái')
      expect(page?.methodNote).toContain('紫微斗数全书')
      expect(page?.intro.length).toBeGreaterThanOrEqual(2)
      expect(page?.summaryRows).toHaveLength(5)
      expect(page?.sections).toHaveLength(7)
      expect(page?.sections[0].heading).toBe('Tổng quan năm 2026')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Công danh')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Tài lộc')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Tình duyên')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Sức khỏe')
      expect(page?.sections.map((section) => section.heading).join(' ')).toContain('Lời khuyên')
      expect(page?.faqs.length).toBeGreaterThanOrEqual(4)
      expect(page?.internalLinks.length).toBeGreaterThanOrEqual(6)
      expect(page?.urlPath).toMatch(/^\/tu-vi-2026\/[a-z0-9-]+-\d{4}-(nam|nu)-mang\/$/)
      expect(page?.legacyUrlPath).toBe(`/tu-vi/${seed.slug}/`)
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

  it('keeps male and female versions from becoming duplicate pages', () => {
    const groupedByYear = new Map<number, { nam?: string; nu?: string }>()

    for (const seed of SEO_FORECAST_SEEDS) {
      const entry = groupedByYear.get(seed.year) ?? {}
      if (seed.gender === 'nam') entry.nam = seed.slug
      if (seed.gender === 'nu') entry.nu = seed.slug
      groupedByYear.set(seed.year, entry)
    }

    for (const [year, pair] of groupedByYear.entries()) {
      expect(pair.nam, `${year} nam page exists`).toBeDefined()
      expect(pair.nu, `${year} nu page exists`).toBeDefined()

      const male = visiblePageText(getSeoForecastPage(pair.nam!)!)
      const female = visiblePageText(getSeoForecastPage(pair.nu!)!)
      const similarity = jaccardSimilarity(male, female)
      expect(similarity, `${year} male/female similarity`).toBeLessThan(0.72)
    }
  })

  it('keeps BY-2A pages distinct from the existing 1984-1995 cohort', () => {
    const existingSlugs = SEO_FORECAST_SLUGS.filter(
      (slug) => !BY2A_EXPECTED_SEEDS.some((seed) => seed.slug === slug),
    )

    for (const expected of BY2A_EXPECTED_SEEDS) {
      const newText = visiblePageText(getSeoForecastPage(expected.slug)!)
      for (const existingSlug of existingSlugs) {
        const existingText = visiblePageText(getSeoForecastPage(existingSlug)!)
        const similarity = jaccardSimilarity(newText, existingText)
        expect(similarity, `${expected.slug} vs ${existingSlug}`).toBeLessThan(0.84)
      }
    }
  })

  it('keeps Tật Ách/health copy in wellbeing-only framing', () => {
    const forbiddenHealthPatterns = [
      /tim mạch/,
      /huyết áp/,
      /\bgan\b/,
      /nội tiết/,
      /\bda\b/,
      /dạ dày/,
    ]

    for (const slug of SEO_FORECAST_SLUGS) {
      const page = getSeoForecastPage(slug)
      expect(page).not.toBeNull()
      const text = visiblePageText(page!).toLowerCase()

      for (const pattern of forbiddenHealthPatterns) {
        expect(text, `${slug} should not mention ${pattern}`).not.toMatch(pattern)
      }
      expect(text).toContain('không thay thế tư vấn y tế')
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
