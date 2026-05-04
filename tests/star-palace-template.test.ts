import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { PALACE_SLUGS } from '../src/content/palaces'
import { PRIORITY_STAR_SLUGS } from '../src/content/stars'
import { validateComplianceContent } from '../src/lib/compliance/policy'
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

const BATCH_2A_APPROVED_COMBINATIONS = [
  { star: 'tu-vi', palace: 'menh' },
  { star: 'tu-vi', palace: 'quan-loc' },
  { star: 'thai-duong', palace: 'menh' },
  { star: 'thai-am', palace: 'menh' },
  { star: 'vu-khuc', palace: 'menh' },
] as const

function draftText(
  page:
    | NonNullable<ReturnType<typeof getStarPalaceDraftPage>>
    | NonNullable<ReturnType<typeof getStarPalacePage>>
): string {
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

  it('stages only the explicitly approved Batch 2A star×cung allow-list', () => {
    expect(APPROVED_STAR_PALACE_COMBINATIONS).toEqual(BATCH_2A_APPROVED_COMBINATIONS)
    expect(getApprovedStarPalacePages().map((page) => page.urlPath)).toEqual([
      '/sao/tu-vi/cung/menh/',
      '/sao/tu-vi/cung/quan-loc/',
      '/sao/thai-duong/cung/menh/',
      '/sao/thai-am/cung/menh/',
      '/sao/vu-khuc/cung/menh/',
    ])
    expect(generateStaticParams()).toEqual(BATCH_2A_APPROVED_COMBINATIONS)
    expect(getStarPalacePage('tu-vi', 'menh')?.indexable).toBe(true)
    expect(getStarPalacePage('tu-vi', 'quan-loc')?.indexable).toBe(true)
    expect(getStarPalacePage('thai-duong', 'menh')?.indexable).toBe(true)
    expect(getStarPalacePage('thai-am', 'menh')?.indexable).toBe(true)
    expect(getStarPalacePage('vu-khuc', 'menh')?.indexable).toBe(true)

    // Bói-Toán/SEO approved Batch 2B and sensitive combinations stay gated
    // until source support and separate reviews are complete.
    expect(getStarPalacePage('thien-phu', 'menh')).toBeNull()
    expect(getStarPalacePage('cu-mon', 'menh')).toBeNull()
    expect(getStarPalacePage('thien-dong', 'menh')).toBeNull()
    expect(getStarPalacePage('liem-trinh', 'menh')).toBeNull()
    expect(getStarPalacePage('tham-lang', 'phu-the')).toBeNull()
    expect(getStarPalacePage('that-sat', 'menh')).toBeNull()
    expect(getStarPalacePage('pha-quan', 'menh')).toBeNull()
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

  it('keeps every approved Batch 2A page deep, compliant, and domain-safe', () => {
    for (const combo of APPROVED_STAR_PALACE_COMBINATIONS) {
      const page = getStarPalacePage(combo.star, combo.palace)

      expect(page, `${combo.star}×${combo.palace} should be approved`).not.toBeNull()

      const text = draftText(page!)
      const compliance = validateComplianceContent(text, {
        requireThamKhaoIfSubstantial: true,
        substantialContentLength: 300,
      })

      expect(getStarPalaceWordCount(page!), `${combo.star}×${combo.palace}`).toBeGreaterThanOrEqual(MIN_STAR_PALACE_WORDS)
      expect(compliance.errors, `${combo.star}×${combo.palace}`).toEqual([])
      expect(text).toContain('tham khảo')
      expect(text).toContain('không phải lời tiên đoán')
      expect(text).toContain('Tam Hợp Phái')
      expect(text).toContain('tam phương')
      expect(text).not.toContain('Tử Tức')
      expect(text).not.toContain('子息')
      expect(text).not.toContain('tu_tuc')
      expect(page!.internalLinks.map((link) => link.href)).toContain(`/sao/${combo.star}/`)
      expect(page!.internalLinks.map((link) => link.href)).toContain(`/cung/${combo.palace}/`)
      expect(page!.internalLinks.map((link) => link.href)).toContain('/lap-la-so/')
    }
  })

  it('publishes only approved star×cung sitemap entries', () => {
    const rootUrls = rootSitemap().map((entry) => entry.url)
    const starPalaceUrls = starPalaceSitemap().map((entry) => entry.url)

    expect(starPalaceUrls).toEqual([
      'https://boitoan.com.vn/sao/tu-vi/cung/menh/',
      'https://boitoan.com.vn/sao/tu-vi/cung/quan-loc/',
      'https://boitoan.com.vn/sao/thai-duong/cung/menh/',
      'https://boitoan.com.vn/sao/thai-am/cung/menh/',
      'https://boitoan.com.vn/sao/vu-khuc/cung/menh/',
    ])
    expect(rootUrls.filter((url) => url.includes('/sao/') && url.includes('/cung/'))).toEqual([
      'https://boitoan.com.vn/sao/tu-vi/cung/menh/',
      'https://boitoan.com.vn/sao/tu-vi/cung/quan-loc/',
      'https://boitoan.com.vn/sao/thai-duong/cung/menh/',
      'https://boitoan.com.vn/sao/thai-am/cung/menh/',
      'https://boitoan.com.vn/sao/vu-khuc/cung/menh/',
    ])
  })

  it('exposes star-palace.xml in robots and approved hub backlinks only', () => {
    const robotSitemaps = robots().sitemap

    expect(robotSitemaps).toContain('https://boitoan.com.vn/star-palace.xml')
    expect(getApprovedStarPalaceLinksForStar('tu-vi').map((link) => link.href)).toEqual([
      '/sao/tu-vi/cung/menh/',
      '/sao/tu-vi/cung/quan-loc/',
    ])
    expect(getApprovedStarPalaceLinksForStar('thai-duong').map((link) => link.href)).toEqual([
      '/sao/thai-duong/cung/menh/',
    ])
    expect(getApprovedStarPalaceLinksForStar('thai-am').map((link) => link.href)).toEqual([
      '/sao/thai-am/cung/menh/',
    ])
    expect(getApprovedStarPalaceLinksForStar('vu-khuc').map((link) => link.href)).toEqual([
      '/sao/vu-khuc/cung/menh/',
    ])
    expect(getApprovedStarPalaceLinksForPalace('menh').map((link) => link.href)).toEqual([
      '/sao/tu-vi/cung/menh/',
      '/sao/thai-duong/cung/menh/',
      '/sao/thai-am/cung/menh/',
      '/sao/vu-khuc/cung/menh/',
    ])
    expect(getApprovedStarPalaceLinksForPalace('quan-loc').map((link) => link.href)).toEqual([
      '/sao/tu-vi/cung/quan-loc/',
    ])
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

  it('rejects non-priority legacy stars and invalid public terminology', () => {
    expect(getStarPalaceDraftPage('tham-lang', 'menh')).toBeNull()
    expect(getStarPalaceDraftPage('that-sat', 'menh')).toBeNull()
    expect(getStarPalaceDraftPage('pha-quan', 'menh')).toBeNull()
    expect(getStarPalaceDraftPage('tu-vi', 'tu-tuc')).toBeNull()
  })

  it('uses stable nested route paths for future internal linking', () => {
    expect(buildStarPalacePath('thai-duong', 'quan-loc')).toBe('/sao/thai-duong/cung/quan-loc/')
    expect(buildStarPalacePath('thien-luong', 'tu-nu')).toBe('/sao/thien-luong/cung/tu-nu/')
  })
})
