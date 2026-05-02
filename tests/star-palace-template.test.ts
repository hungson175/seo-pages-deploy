import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { PALACE_SLUGS } from '../src/content/palaces'
import { PRIORITY_STAR_SLUGS } from '../src/content/stars'
import {
  APPROVED_STAR_PALACE_COMBINATIONS,
  CMO_FIRST_BATCH_STAR_PALACE_COMBINATIONS,
  MIN_STAR_PALACE_WORDS,
  buildStarPalacePath,
  getApprovedStarPalaceLinksForPalace,
  getApprovedStarPalaceLinksForStar,
  getApprovedStarPalacePages,
  getFirstBatchStarPalaceDrafts,
  getStarPalaceDraftPage,
  getStarPalacePage,
  getStarPalaceTemplateMatrix,
  getStarPalaceWordCount,
  isStarPalaceReadyForIndex,
} from '../src/content/star-palace'
import robots from '../src/app/robots'
import rootSitemap from '../src/app/sitemap'
import starPalaceSitemap from '../src/app/sitemap-star-palace'
import { generateStaticParams } from '../src/app/(main)/sao/[star]/cung/[palace]/page'

function draftText(page: NonNullable<ReturnType<typeof getStarPalaceDraftPage>>): string {
  return [
    page.h1,
    page.title,
    page.description,
    page.methodNote,
    page.intersectionThesis,
    page.misreadWarning,
    ...page.contextChecklist,
    ...page.selfCheckQuestions,
    ...page.contrastNotes,
    ...page.summaryRows.flatMap((row) => [row.aspect, row.meaning, row.readingCue]),
    ...page.wrongVsBetterExamples.flatMap((example) => [example.wrong, example.better]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...page.internalLinks.flatMap((link) => [link.label, link.relation, link.href]),
    ...page.sections.flatMap((section) => [
      section.heading,
      section.writingBrief,
      ...section.requiredLinks,
      ...(section.content ?? []),
    ]),
  ].join(' ')
}

describe('star×cung expansion template', () => {
  it('prepares a full draft matrix for reviewed priority stars and 12 palaces', () => {
    const matrix = getStarPalaceTemplateMatrix()

    expect(matrix).toHaveLength(PRIORITY_STAR_SLUGS.length * PALACE_SLUGS.length)
    expect(matrix.every((page) => page.status === 'draft-template')).toBe(true)
    expect(matrix.every((page) => page.indexable === false)).toBe(true)
  })

  it('stages only Tử Vi×Mệnh for first release', () => {
    expect(APPROVED_STAR_PALACE_COMBINATIONS).toEqual([{ star: 'tu-vi', palace: 'menh' }])
    expect(getApprovedStarPalacePages().map((page) => page.urlPath)).toEqual([
      '/sao/tu-vi/cung/menh/',
    ])
    expect(generateStaticParams()).toEqual([{ star: 'tu-vi', palace: 'menh' }])
    expect(getStarPalacePage('tu-vi', 'menh')?.indexable).toBe(true)
    expect(getStarPalacePage('thai-duong', 'quan-loc')).toBeNull()
    expect(getStarPalacePage('vu-khuc', 'tai-bach')).toBeNull()
  })

  it('builds a safe draft for a valid star×cung pair', () => {
    const draft = getStarPalaceDraftPage('tu-vi', 'menh')

    expect(draft).not.toBeNull()
    expect(draft?.h1).toBe('Sao Tử Vi Ở Cung Mệnh — Ý Nghĩa, Cách Đọc Và Lưu Ý')
    expect(draft?.urlPath).toBe('/sao/tu-vi/cung/menh/')
    expect(draft?.canonicalWhenApproved).toBe('/sao/tu-vi/cung/menh/')
    expect(draft?.qualityGate.join(' ')).toContain('Bói-Toán domain review')
    expect(draft?.qualityGate.join(' ')).toContain('CMO compliance review')
    expect(draft?.qualityGate.join(' ')).toContain('SEO review')
    expect(draft?.methodNote).toContain('Tam Hợp Phái')
    expect(draft?.methodNote).toContain('không suy diễn từ một sao hoặc một cung riêng lẻ')
    expect(draft?.sections.length).toBeGreaterThanOrEqual(4)
  })

  it('implements CMO first-batch drafts with intersection-specific fields', () => {
    const firstBatch = getFirstBatchStarPalaceDrafts()

    expect(firstBatch).toHaveLength(CMO_FIRST_BATCH_STAR_PALACE_COMBINATIONS.length)

    for (const draft of firstBatch) {
      const starName = draft.h1.match(/^Sao (.+?) Ở Cung/)?.[1]
      const palaceName = draft.h1.match(/Ở Cung (.+?) —/)?.[1]
      const sectionContentCount = draft.sections.flatMap((section) => section.content ?? []).length

      expect(draft.indexable).toBe(false)
      expect(draft.intersectionThesis).toContain(starName)
      expect(draft.intersectionThesis).toContain(palaceName)
      expect(draft.misreadWarning.length).toBeGreaterThan(80)
      expect(draft.contextChecklist.length).toBeGreaterThanOrEqual(6)
      expect(draft.selfCheckQuestions.length).toBeGreaterThanOrEqual(3)
      expect(draft.contrastNotes.length).toBeGreaterThanOrEqual(2)
      expect(draft.summaryRows.map((row) => row.aspect)).toEqual([
        'Từ khóa chính',
        'Khi đọc thuận',
        'Khi cần cân bằng',
        'Không nên hiểu là',
        'Cần kiểm tra thêm',
      ])
      expect(draft.wrongVsBetterExamples.length).toBeGreaterThanOrEqual(2)
      expect(sectionContentCount, `${draft.star}×${draft.palace} content sections`).toBeGreaterThanOrEqual(7)
    }
  })

  it('keeps first-batch copy compliant and specific', () => {
    const forbiddenPatterns = [
      /đúng 100%/i,
      /dự đoán chính xác/i,
      /chắc chắn giàu/i,
      /phát tài/i,
      /giải hạn/i,
      /chữa bệnh/i,
      /sống lâu/i,
      /ít bệnh/i,
      /khỏi bệnh/i,
      /miễn phí/i,
      /mở khóa ngay/i,
    ]

    for (const draft of getFirstBatchStarPalaceDrafts()) {
      const text = draftText(draft)

      for (const pattern of forbiddenPatterns) {
        expect(text, `${draft.star}×${draft.palace} should avoid ${pattern}`).not.toMatch(pattern)
      }

      expect(text).toContain('không phải lá số cá nhân')
      expect(text).toContain('Tam Hợp Phái')
      expect(text).toContain('紫微斗数全书')
      expect(text).toContain('không phải lời tiên đoán')
      expect(text).toContain('không suy diễn từ một sao hoặc một cung riêng lẻ')
      expect(text).not.toContain('Tử Tức')
    }
  })

  it('flags sensitive first-batch topics for extra compliance review', () => {
    expect(getStarPalaceDraftPage('vu-khuc', 'tai-bach')?.sensitiveTopicFlags).toContain(
      'resource-management'
    )
    expect(getStarPalaceDraftPage('thien-luong', 'tat-ach')?.sensitiveTopicFlags).toContain(
      'wellbeing'
    )
    expect(getStarPalaceDraftPage('thai-am', 'phuc-duc')?.sensitiveTopicFlags).toContain(
      'wellbeing'
    )
  })

  it('has rendered word-count verification before index approval', () => {
    for (const draft of getFirstBatchStarPalaceDrafts()) {
      const wordCount = getStarPalaceWordCount(draft)

      expect(wordCount, `${draft.star}×${draft.palace} draft should meet SEO depth`).toBeGreaterThanOrEqual(MIN_STAR_PALACE_WORDS)
      expect(isStarPalaceReadyForIndex(draft)).toBe(true)
    }
  })

  it('publishes only approved star×cung sitemap entries', () => {
    const rootUrls = rootSitemap().map((entry) => entry.url)
    const starPalaceUrls = starPalaceSitemap().map((entry) => entry.url)

    expect(starPalaceUrls).toEqual(['https://boitoan.com.vn/sao/tu-vi/cung/menh/'])
    expect(rootUrls.filter((url) => url.includes('/sao/') && url.includes('/cung/'))).toEqual([
      'https://boitoan.com.vn/sao/tu-vi/cung/menh/',
    ])
  })

  it('exposes star-palace.xml in robots and approved hub backlinks only', () => {
    const robotSitemaps = robots().sitemap

    expect(robotSitemaps).toContain('https://boitoan.com.vn/star-palace.xml')
    expect(getApprovedStarPalaceLinksForStar('tu-vi').map((link) => link.href)).toEqual([
      '/sao/tu-vi/cung/menh/',
    ])
    expect(getApprovedStarPalaceLinksForStar('thai-duong')).toEqual([])
    expect(getApprovedStarPalaceLinksForPalace('menh').map((link) => link.href)).toEqual([
      '/sao/tu-vi/cung/menh/',
    ])
    expect(getApprovedStarPalaceLinksForPalace('quan-loc')).toEqual([])
  })

  it('has Phase 0 route/schema/linking infrastructure in code', () => {
    const routeSource = readFileSync(
      'src/app/(main)/sao/[star]/cung/[palace]/page.tsx',
      'utf8'
    )
    const starSource = readFileSync('src/app/(main)/sao/[star]/page.tsx', 'utf8')
    const palaceSource = readFileSync('src/app/(main)/cung/[palace]/page.tsx', 'utf8')

    expect(routeSource).toContain('dynamicParams = false')
    expect(routeSource).toContain('ArticleSchema')
    expect(routeSource).toContain('FAQPageSchema')
    expect(routeSource).toContain('BreadcrumbListSchema')
    expect(routeSource).toContain("'@type': 'WebPage'")
    expect(routeSource).toContain('getApprovedStarPalacePages')
    expect(starSource).toContain('getApprovedStarPalaceLinksForStar')
    expect(palaceSource).toContain('getApprovedStarPalaceLinksForPalace')
  })

  it('rejects legacy stars and invalid public terminology', () => {
    expect(getStarPalaceDraftPage('thien-phu', 'menh')).toBeNull()
    expect(getStarPalaceDraftPage('tu-vi', 'tu-tuc')).toBeNull()
  })

  it('uses stable nested route paths for future internal linking', () => {
    expect(buildStarPalacePath('thai-duong', 'quan-loc')).toBe('/sao/thai-duong/cung/quan-loc/')
    expect(buildStarPalacePath('thien-luong', 'tu-nu')).toBe('/sao/thien-luong/cung/tu-nu/')
  })
})
