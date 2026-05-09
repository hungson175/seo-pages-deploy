import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { render } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from '../src/app/(main)/kinh-dich/[...slug]/page'
import { KinhDichPilotPageView } from '../src/components/kinh-dich/kinh-dich-pilot-page'
import { QUE_CONTENT } from '../src/content/que'
import rootSitemap from '../src/app/sitemap'
import {
  KING_WEN_HEXAGRAM_NAMES,
  KINH_DICH_PILOT_PAGES,
  KINH_DICH_PILOT_PATHS,
  getKinhDichPilotPageByPath,
  pilotBodyText,
  type KinhDichPilotPage,
} from '../src/content/kinh-dich-gieo-que-pilot'

const PILOT_ARTIFACT_JSON = '/tmp/po_kinh_dich_gieo_que_pilot_pages_202605091836.json'
const PILOT_ARTIFACT_MD = '/tmp/po_kinh_dich_gieo_que_pilot_pages_202605091836.md'
const PILOT_INPUT_PAYLOAD_JSON = '/tmp/po_kinh_dich_gieo_que_pilot_inputs_202605091836.json'
const PILOT_SCAN_JSON = '/tmp/po_kinh_dich_gieo_que_pilot_scan_202605091836.json'
const DUPLICATE_THRESHOLD_WORDS = 10

const EXPECTED_PATHS = [
  '/kinh-dich/gieo-que/',
  '/kinh-dich/gieo-que/luc-hao/',
  '/kinh-dich/hoi/cong-viec/',
  '/kinh-dich/hoi/tinh-duyen/',
  '/kinh-dich/64-que/',
]

const SEO_SPEC: Record<string, { title: string; description: string; links: string[]; schema: string[] }> = {
  '/kinh-dich/gieo-que/': {
    title: 'Gieo Quẻ Kinh Dịch — Miễn Phí, Không Cần Ngày Sinh | Bói Toán',
    description:
      'Gieo quẻ Kinh Dịch miễn phí trên Bói Toán: đặt câu hỏi, nhận góc nhìn trong 30 giây. Không cần ngày sinh. Thuật toán AI + 50+ cổ thư.',
    links: [
      '/kinh-dich/gieo-que/luc-hao/',
      '/kinh-dich/hoi/cong-viec/',
      '/kinh-dich/hoi/tinh-duyen/',
      '/kinh-dich/64-que/',
      '/tu-vi/',
    ],
    schema: ['WebApplication', 'FAQPage'],
  },
  '/kinh-dich/gieo-que/luc-hao/': {
    title: 'Kinh Dịch Lục Hào — Gieo Quẻ 3 Đồng Xu Chuẩn Xác | Bói Toán',
    description:
      'Hướng dẫn gieo quẻ Kinh Dịch Lục Hào bằng 3 đồng xu: cách tung, cách đọc hào động, quẻ chủ và quẻ biến. Tham khảo, không thay thế tư vấn.',
    links: [
      '/kinh-dich/gieo-que/',
      '/kinh-dich/64-que/',
      '/blog/kinh-dich/cach-gieo-que-3-dong-xu/',
    ],
    schema: ['HowTo', 'FAQPage'],
  },
  '/kinh-dich/hoi/cong-viec/': {
    title: 'Gieo Quẻ Kinh Dịch Hỏi Việc — Nên Đổi Việc Không? | Bói Toán',
    description:
      'Gieo quẻ Kinh Dịch hỏi việc: nên đổi công việc, nhận offer hay giữ chỗ? Đặt câu hỏi cụ thể, nhận góc nhìn từ 64 quẻ Dịch.',
    links: [
      '/kinh-dich/gieo-que/',
      '/kinh-dich/hoi/tinh-duyen/',
      '/kinh-dich/64-que/',
      '/tu-vi/',
    ],
    schema: ['Article', 'FAQPage'],
  },
  '/kinh-dich/hoi/tinh-duyen/': {
    title: 'Gieo Quẻ Kinh Dịch Tình Duyên — Có Quay Lại Không? | Bói Toán',
    description:
      'Gieo quẻ Kinh Dịch tình duyên: người ấy có quay lại không? Nên tiến hay dừng? Đặt câu hỏi, nhận đáp án từ quẻ Dịch.',
    links: [
      '/kinh-dich/gieo-que/',
      '/kinh-dich/hoi/cong-viec/',
      '/kinh-dich/64-que/',
      '/tu-vi/',
    ],
    schema: ['Article', 'FAQPage'],
  },
  '/kinh-dich/64-que/': {
    title: '64 Quẻ Kinh Dịch — Ý Nghĩa & Cách Gieo Quẻ | Bói Toán',
    description:
      '64 quẻ Kinh Dịch: 6 quẻ đã rà soát + danh sách đầy đủ, cách gieo và luận giải theo nguồn kiểm chứng. Tra cứu an toàn.',
    links: [
      '/kinh-dich/gieo-que/',
      '/kinh-dich/gieo-que/luc-hao/',
    ],
    schema: ['Article', 'FAQPage'],
  },
}

const FORBIDDEN_PATTERNS = [
  /chắc chắn/iu,
  /nhất định/iu,
  /bảo đảm/iu,
  /sẽ xảy ra/iu,
  /mua bùa/iu,
  /cúng giải/iu,
  /giải hạn/iu,
  /thay thế tư vấn chuyên môn[^.]*$/iu,
]
const PUBLIC_META_PATTERNS = [
  /\bpilot\b/iu,
  /review-gated/iu,
  /\bhotfix\b/iu,
  /\bprovider\b/iu,
  /\bsitemap\b/iu,
  /\bindexable\b/iu,
  /\bplaceholder\b/iu,
  /coming soon/iu,
  /\breviewed\b/iu,
  /domain QA/iu,
  /web flow/iu,
  /\btemplate\b/iu,
  /year articles/iu,
  /Sắp ra mắt/iu,
  /Hub này/iu,
]

function countPattern(text: string, pattern: RegExp): number {
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
  return text.match(new RegExp(pattern.source, flags))?.length ?? 0
}

function normalizeSentence(sentence: string): string {
  return sentence
    .toLowerCase()
    .normalize('NFC')
    .replace(/[“"”'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function splitSentences(text: string): string[] {
  return (text.replace(/\s+/g, ' ').match(/[^.!?。！？]+[.!?。！？]+/g) ?? [])
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function sentenceMapFor(text: string): Map<string, string> {
  const map = new Map<string, string>()
  for (const sentence of splitSentences(text)) {
    if (countWords(sentence) < DUPLICATE_THRESHOLD_WORDS) continue
    map.set(normalizeSentence(sentence), sentence)
  }
  return map
}

function existingQueText() {
  return Object.values(QUE_CONTENT)
    .map((que) => [
      que.name,
      que.meaning,
      que.judgment,
      que.application,
      que.advice,
      que.changingLines,
    ].join(' '))
}

function scanDuplicateSentences(pages: KinhDichPilotPage[]) {
  const pageSentenceMaps = new Map(
    pages.map((page) => [page.path, sentenceMapFor(pilotBodyText(page))]),
  )
  const existingSentenceMaps = new Map(
    existingQueText().map((text, index) => [`existing:/que/${index + 1}`, sentenceMapFor(text)]),
  )
  const findings: Array<{ pagePath: string; comparedPath: string; sentence: string; wordCount: number }> = []
  const seenPairs = new Set<string>()

  for (const page of pages) {
    const pageSentences = pageSentenceMaps.get(page.path)!
    for (const [normalizedSentence, originalSentence] of pageSentences.entries()) {
      for (const [otherPath, otherSentences] of [
        ...pageSentenceMaps.entries(),
        ...existingSentenceMaps.entries(),
      ]) {
        if (otherPath === page.path) continue
        const pairKey = [page.path, otherPath, normalizedSentence].sort().join('::')
        if (seenPairs.has(pairKey)) continue
        if (otherSentences.has(normalizedSentence)) {
          seenPairs.add(pairKey)
          findings.push({
            pagePath: page.path,
            comparedPath: otherPath,
            sentence: originalSentence,
            wordCount: countWords(originalSentence),
          })
        }
      }
    }
  }

  return findings
}

function renderedJsonLdTypes(page: KinhDichPilotPage): string[] {
  return renderedJsonLdData(page)
    .map((data) => data['@type'])
    .filter((type): type is string => typeof type === 'string')
}

function renderedJsonLdData(page: KinhDichPilotPage): Array<Record<string, unknown>> {
  const { container } = render(createElement(KinhDichPilotPageView, { page }))
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => JSON.parse(script.textContent ?? '{}') as Record<string, unknown>)
    .filter((data) => typeof data['@type'] === 'string')
}

function renderedVisibleText(page: KinhDichPilotPage): string {
  const { container } = render(createElement(KinhDichPilotPageView, { page }))
  return container.textContent?.replace(/\s+/g, ' ').trim() ?? ''
}

function renderMarkdown(pages: KinhDichPilotPage[]): string {
  return pages
    .map((page) => [
      `# ${page.h1}`,
      '',
      `Path: ${page.path}`,
      `Review status: ${page.reviewStatus}`,
      `Meta: ${page.title}`,
      `Description: ${page.description}`,
      `Disclaimer: ${page.topDisclaimer}`,
      '',
      '## Intro',
      ...page.intro,
      '',
      '## Split note',
      page.splitNote,
      '',
      '## CTAs',
      ...page.ctas.map((cta) => `- ${cta.role}: ${cta.label} → ${cta.href} (${cta.note})`),
      '',
      ...page.sections.flatMap((section) => [
        `## ${section.heading}`,
        ...section.paragraphs,
        ...(section.bullets ?? []).map((bullet) => `- ${bullet}`),
        '',
      ]),
      '## FAQ',
      ...page.faqs.flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
    ].join('\n'))
    .join('\n---\n')
}

function writeJson(path: string, payload: unknown): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(payload, null, 2)}\n`)
}

describe('Kinh Dịch gieo quẻ 5-page pilot', () => {
  it('defines exactly the approved 5 review-gated pilot pages', () => {
    expect(KINH_DICH_PILOT_PATHS).toEqual(EXPECTED_PATHS)
    expect(KINH_DICH_PILOT_PAGES).toHaveLength(5)

    for (const path of EXPECTED_PATHS) {
      const page = getKinhDichPilotPageByPath(path)
      expect(page, path).not.toBeNull()
      expect(page?.reviewStatus, path).toBe('blocked_pending_cmo_boitoan_seo_review')
      expect(page?.indexable, path).toBe(false)
    }
  })

  it('applies SEO addendum exact titles, H1s, unique descriptions, link matrix, and schema specs', () => {
    const titles = new Set<string>()
    const descriptions = new Set<string>()
    const h1s = new Set<string>()

    for (const page of KINH_DICH_PILOT_PAGES) {
      const spec = SEO_SPEC[page.path]
      expect(spec, page.path).toBeDefined()
      expect(page.title, page.path).toBe(spec.title)
      expect(page.h1, page.path).toBe(spec.title)
      expect(page.description, page.path).toBe(spec.description)
      expect(page.schemaTypes, page.path).toEqual(spec.schema)
      expect(page.description.length, `${page.path} meta length`).toBeGreaterThanOrEqual(110)
      expect(page.description.length, `${page.path} meta length`).toBeLessThanOrEqual(160)
      for (const href of spec.links) {
        if (href === '/tu-vi/') {
          expect(page.ctas.map((cta) => cta.href).concat(page.relatedLinks.map((link) => link.href)), page.path).toContain(href)
        } else {
          expect(page.relatedLinks.map((link) => link.href), `${page.path} link matrix`).toContain(href)
        }
      }
      titles.add(page.title)
      descriptions.add(page.description)
      h1s.add(page.h1)
    }

    expect(titles.size).toBe(KINH_DICH_PILOT_PAGES.length)
    expect(descriptions.size).toBe(KINH_DICH_PILOT_PAGES.length)
    expect(h1s.size).toBe(KINH_DICH_PILOT_PAGES.length)
  })

  it('renders only the schema types approved by SEO addendum for each page', () => {
    for (const page of KINH_DICH_PILOT_PAGES) {
      const jsonLdTypes = renderedJsonLdTypes(page)
      for (const schemaType of SEO_SPEC[page.path].schema) {
        expect(jsonLdTypes, page.path).toContain(schemaType)
      }

      expect(jsonLdTypes, `${page.path} no aggregate rating schema`).not.toContain('AggregateRating')
      if (!SEO_SPEC[page.path].schema.includes('Article')) {
        expect(jsonLdTypes, `${page.path} no unrequested Article schema`).not.toContain('Article')
      }
      if (!SEO_SPEC[page.path].schema.includes('HowTo')) {
        expect(jsonLdTypes, `${page.path} no unrequested HowTo schema`).not.toContain('HowTo')
      }
      if (!SEO_SPEC[page.path].schema.includes('WebApplication')) {
        expect(jsonLdTypes, `${page.path} no unrequested WebApplication schema`).not.toContain('WebApplication')
      }
    }
  })

  it('verifies publication-prep JSON-LD field details without flipping indexation', () => {
    for (const page of KINH_DICH_PILOT_PAGES) {
      const schemas = renderedJsonLdData(page)

      if (page.path === '/kinh-dich/gieo-que/luc-hao/') {
        const howTo = schemas.find((schema) => schema['@type'] === 'HowTo')
        expect(howTo, page.path).toBeDefined()
        expect(howTo?.name, page.path).toBe(page.h1)
        expect(howTo?.description, page.path).toBe(page.description)
        expect(howTo?.inLanguage, page.path).toBe('vi')

        const steps = (howTo?.step ?? []) as Array<Record<string, unknown>>
        expect(steps, page.path).toHaveLength(5)
        expect(steps.map((step) => step.name), page.path).toEqual([
          'Chuẩn bị ba đồng xu',
          'Tập trung câu hỏi',
          'Tung sáu lần',
          'Ghi kết quả',
          'Tra quẻ',
        ])
        for (const step of steps) {
          expect(step['@type'], page.path).toBe('HowToStep')
          expect(typeof step.name, page.path).toBe('string')
          expect(String(step.name).length, page.path).toBeGreaterThan(0)
          expect(typeof step.text, page.path).toBe('string')
          expect(String(step.text).length, page.path).toBeGreaterThan(20)
        }
      }

      if (page.schemaTypes.includes('Article')) {
        const article = schemas.find((schema) => schema['@type'] === 'Article')
        expect(article, page.path).toBeDefined()
        expect(article?.headline, page.path).toBe(page.h1)
        expect(article?.description, page.path).toBe(page.description)
        expect(article?.url, page.path).toBe(`https://boitoan.com.vn${page.path}`)
        expect(article?.datePublished, page.path).toBe('2026-05-09')
        expect(article?.dateModified, page.path).toBe('2026-05-09')
        expect(article?.inLanguage, page.path).toBe('vi')
        expect((article?.author as Record<string, unknown>)?.name, page.path).toBe('Bói Toán')
        expect((article?.publisher as Record<string, unknown>)?.name, page.path).toBe('Bói Toán')
      }

      const faqPage = schemas.find((schema) => schema['@type'] === 'FAQPage')
      expect(faqPage, page.path).toBeDefined()
      const mainEntity = (faqPage?.mainEntity ?? []) as Array<Record<string, unknown>>
      expect(mainEntity, page.path).toHaveLength(page.faqs.length)
      expect(mainEntity.map((entry) => entry.name), page.path).toEqual(
        page.faqs.map((faq) => faq.question),
      )
      expect(JSON.stringify(faqPage), page.path).not.toContain(page.topDisclaimer)
      for (const [index, entry] of mainEntity.entries()) {
        expect(entry['@type'], page.path).toBe('Question')
        expect((entry.acceptedAnswer as Record<string, unknown>)?.['@type'], page.path).toBe('Answer')
        expect((entry.acceptedAnswer as Record<string, unknown>)?.text, page.path).toBe(
          page.faqs[index].answer,
        )
      }
    }
  })

  it('publishes the approved pilot: static allow-list, self-canonical, index/follow, sitemap included', async () => {
    expect(dynamicParams).toBe(false)
    expect(generateStaticParams()).toEqual(
      KINH_DICH_PILOT_PAGES.map((page) => ({ slug: page.slugSegments })),
    )

    for (const page of KINH_DICH_PILOT_PAGES) {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: page.slugSegments }),
      })
      expect(metadata.title, page.path).toBe(page.title)
      expect(metadata.description, page.path).toBe(page.description)
      expect(metadata.robots, page.path).toEqual({ index: true, follow: true })
      expect(metadata.alternates?.canonical?.toString(), page.path).toBe(`https://boitoan.com.vn${page.path}`)
    }

    const sitemapUrls = rootSitemap().map((entry) => entry.url)
    for (const path of EXPECTED_PATHS) {
      expect(sitemapUrls, `${path} should be in the root sitemap`).toContain(`https://boitoan.com.vn${path}`)
    }
  })

  it('enforces CMO CTA hierarchy: web flow first, app second, Tu Vi tertiary', () => {
    for (const page of KINH_DICH_PILOT_PAGES) {
      expect(page.ctas.map((cta) => cta.role), page.path).toEqual([
        'primary-web-flow',
        'secondary-app-save',
        'tertiary-tu-vi',
      ])
      expect(page.ctas[0].label, page.path).toBe('Gieo quẻ miễn phí')
      expect(page.ctas[0].href, page.path).toBe('/kinh-dich/gieo-que/#gieo-que-mien-phi')
      expect(page.ctas[1].label, page.path).toMatch(/app Bói Toán/)
      expect(page.ctas[2].href, page.path).toBe('/tu-vi/')
    }
  })

  it('keeps Gieo que casting separate from Giai que interpretation', () => {
    for (const page of KINH_DICH_PILOT_PAGES) {
      const text = pilotBodyText(page)
      expect(text, page.path).toMatch(/Gieo|lập quẻ|hỏi quẻ|web flow/)
      expect(page.splitNote, page.path).toMatch(/Gieo|gieo|lập quẻ/)
      expect(page.splitNote, page.path).toMatch(/Giải|diễn giải|giải nghĩa/)
      expect(text, page.path).not.toMatch(/tự phán|phán chắc|khẳng định tương lai/i)
    }
  })

  it('uses existing reviewed que content only for the 64-que hub', () => {
    const hub = getKinhDichPilotPageByPath('/kinh-dich/64-que/')
    expect(hub).not.toBeNull()
    expect(KING_WEN_HEXAGRAM_NAMES).toHaveLength(64)
    expect(hub?.reviewedHexagramLinks).toHaveLength(Object.keys(QUE_CONTENT).length)
    expect(hub?.unrevisedHexagramNames).toHaveLength(64 - Object.keys(QUE_CONTENT).length)
    expect(hub?.unrevisedHexagramNames?.every((que) => que.status === 'name-only-pending-review')).toBe(true)
    expect(pilotBodyText(hub!), 'hub copy should not claim full 64 interpretations').not.toMatch(/đầy đủ 64 bài giải|diễn giải đầy đủ 64/i)
    for (const link of hub?.reviewedHexagramLinks ?? []) {
      expect(link.href).toMatch(/^\/que\/[a-z0-9-]+\/$/)
    }
  })

  it('passes anti-template and legal-safe guards before generation artifacts are accepted', () => {
    const duplicateFindings = scanDuplicateSentences(KINH_DICH_PILOT_PAGES)
    const scanPayload = {
      generatedAt: '2026-05-09T18:36:00+07:00',
      pageCount: KINH_DICH_PILOT_PAGES.length,
      comparedExistingQuePages: Object.keys(QUE_CONTENT).length,
      thresholdWords: DUPLICATE_THRESHOLD_WORDS,
      duplicateFindingCount: duplicateFindings.length,
      duplicateFindings,
      pages: KINH_DICH_PILOT_PAGES.map((page) => {
        const body = pilotBodyText(page)
        const visibleText = renderedVisibleText(page)
        return {
          path: page.path,
          schemaTypes: page.schemaTypes,
          outboundLinks: page.relatedLinks.map((link) => link.href),
          gieoQueCount: countPattern(body, /gieo quẻ/iu),
          kinhDichCount: countPattern(body, /kinh dịch/iu),
          primaryCtaCount: countPattern(visibleText, /Gieo quẻ miễn phí/iu),
          forbiddenPatterns: FORBIDDEN_PATTERNS
            .filter((pattern) => pattern.test(body))
            .map((pattern) => pattern.source),
          publicMetaPatterns: PUBLIC_META_PATTERNS
            .filter((pattern) => pattern.test(visibleText))
            .map((pattern) => pattern.source),
        }
      }),
    }

    for (const pageScan of scanPayload.pages) {
      expect(pageScan.gieoQueCount, `${pageScan.path} gieo quẻ density`).toBeLessThanOrEqual(5)
      expect(pageScan.kinhDichCount, `${pageScan.path} Kinh Dịch density`).toBeLessThanOrEqual(5)
      expect(pageScan.primaryCtaCount, `${pageScan.path} primary CTA repetition`).toBeLessThanOrEqual(2)
      expect(pageScan.forbiddenPatterns, `${pageScan.path} forbidden patterns`).toEqual([])
      expect(pageScan.publicMetaPatterns, `${pageScan.path} public meta language`).toEqual([])
    }
    expect(duplicateFindings).toEqual([])

    if (process.env.WRITE_KINH_DICH_PILOT_ARTIFACTS === '1') {
      writeJson(PILOT_ARTIFACT_JSON, KINH_DICH_PILOT_PAGES)
      writeFileSync(PILOT_ARTIFACT_MD, renderMarkdown(KINH_DICH_PILOT_PAGES))
      writeJson(PILOT_INPUT_PAYLOAD_JSON, KINH_DICH_PILOT_PAGES.map((page) => ({
        path: page.path,
        kind: page.kind,
        primaryKeyword: page.primaryKeyword,
        splitNote: page.splitNote,
        reviewStatus: page.reviewStatus,
        ctaRoles: page.ctas.map((cta) => cta.role),
        seoSchemaTypes: page.schemaTypes,
        relatedLinks: page.relatedLinks,
      })))
      writeJson(PILOT_SCAN_JSON, scanPayload)
    }
  })
})
