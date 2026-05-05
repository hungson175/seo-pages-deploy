import { describe, expect, it } from 'vitest'
import {
  PRIORITY_STAR_SLUGS,
  getStarFoundationPage,
  isPriorityStarSlug,
} from '../src/content/stars'

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function pageText(page: NonNullable<ReturnType<typeof getStarFoundationPage>>): string {
  return [
    page.h1,
    page.title,
    page.description,
    page.methodNote,
    ...page.intro,
    ...page.summaryRows.flatMap((row) => [row.aspect, row.meaning, row.readingCue]),
    ...page.sections.flatMap((section) => [section.heading, ...section.content]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...page.internalLinks.flatMap((link) => [link.label, link.relation]),
    page.disclaimer,
  ].join(' ')
}

describe('priority star foundation pages', () => {
  it('ships the requested P1 plus Batch 2B foundation star pages', () => {
    expect(PRIORITY_STAR_SLUGS).toEqual([
      'tu-vi',
      'thai-duong',
      'thai-am',
      'thien-co',
      'vu-khuc',
      'thien-luong',
      'thien-phu',
      'cu-mon',
      'thien-dong',
      'liem-trinh',
    ])
  })

  it('keeps legacy unsafe star pages disabled until rewritten', () => {
    expect(isPriorityStarSlug('tu-vi')).toBe(true)
    expect(isPriorityStarSlug('thien-phu')).toBe(true)
    expect(isPriorityStarSlug('cu-mon')).toBe(true)
    expect(isPriorityStarSlug('thien-dong')).toBe(true)
    expect(isPriorityStarSlug('liem-trinh')).toBe(true)
    expect(isPriorityStarSlug('tham-lang')).toBe(false)
    expect(getStarFoundationPage('tham-lang')).toBeNull()
    expect(getStarFoundationPage('that-sat')).toBeNull()
    expect(getStarFoundationPage('pha-quan')).toBeNull()
  })

  it('generates complete 1,500+ word pages with SEO fields', () => {
    for (const slug of PRIORITY_STAR_SLUGS) {
      const page = getStarFoundationPage(slug)
      expect(page, `${slug} page`).not.toBeNull()
      expect(page?.urlPath).toBe(`/sao/${slug}/`)
      expect(page?.h1).toContain('Sao')
      expect(page?.description.length).toBeGreaterThan(90)
      expect(page?.summaryRows.length).toBeGreaterThanOrEqual(5)
      expect(page?.sections.length).toBeGreaterThanOrEqual(7)
      expect(page?.faqs.length).toBeGreaterThanOrEqual(5)
      expect(page?.internalLinks.length).toBeGreaterThanOrEqual(6)
      expect(wordCount(pageText(page!)), `${slug} word count`).toBeGreaterThanOrEqual(1500)
    }
  })

  it('keeps visible method citation and Article 320 framing', () => {
    for (const slug of PRIORITY_STAR_SLUGS) {
      const text = pageText(getStarFoundationPage(slug)!)
      expect(text).toContain('Tam Hợp Phái')
      expect(text).toContain('紫微斗数全书')
      expect(text).toContain('giải trí')
      expect(text).toContain('thuật toán tham khảo')
      expect(text).toContain('không dùng bài viết này để thay thế tư vấn y tế')
      expect(text).toContain('không phải lời tiên đoán')
    }
  })

  it('does not expose internal writer notes on public star pages', () => {
    const leakedWriterNotes = [
      'Bài viết dùng cho SEO tĩnh và người mới học Tử Vi',
      'không giả lập lá số cá nhân khi chưa có ngày sinh, giờ sinh',
      'Chỉ xem là ví dụ về cách đọc chính tinh; mỗi lá số có bộ sao riêng.',
      'Nội dung được viết cho SEO tĩnh và người mới học Tử Vi',
      'SEO tĩnh',
    ]

    for (const slug of PRIORITY_STAR_SLUGS) {
      const text = pageText(getStarFoundationPage(slug)!)
      for (const note of leakedWriterNotes) {
        expect(text, `${slug} should not leak ${note}`).not.toContain(note)
      }
    }
  })

  it('avoids deterministic, medical, and financial-promise wording', () => {
    const forbiddenPatterns = [
      /chắc chắn/i,
      /dự đoán chính xác/i,
      /cực kỳ tốt/i,
      /giàu sang/i,
      /phát tài/i,
      /tài chính dồi dào/i,
      /sống lâu/i,
      /khỏi bệnh/i,
      /bệnh tật/i,
      /tim mạch/i,
      /huyết áp/i,
      /\bgan\b/i,
      /dạ dày/i,
    ]

    for (const slug of PRIORITY_STAR_SLUGS) {
      const text = pageText(getStarFoundationPage(slug)!)
      for (const pattern of forbiddenPatterns) {
        expect(text, `${slug} should avoid ${pattern}`).not.toMatch(pattern)
      }
    }
  })

  it('keeps Liêm Trinh foundation language away from crime and legal claims', () => {
    const text = pageText(getStarFoundationPage('liem-trinh')!)
    const forbiddenPatterns = [
      /dễ phạm pháp/i,
      /dính tù tội/i,
      /số có án/i,
      /kiện tụng/i,
      /bạo lực/i,
      /tội phạm/i,
      /hình phạt/i,
      /chắc chắn.*pháp lý/i,
    ]

    for (const pattern of forbiddenPatterns) {
      expect(text, `liem-trinh should avoid ${pattern}`).not.toMatch(pattern)
    }
    expect(text).toContain('liêm chính')
    expect(text).toContain('ranh giới')
    expect(text).toContain('không phải lời tiên đoán')
  })
})
