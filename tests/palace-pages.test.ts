import { describe, expect, it } from 'vitest'
import {
  PALACE_FOUNDATION_PAGES,
  PALACE_SLUGS,
  getPalaceFoundationPage,
  getPalaceTamHop,
  isPalaceSlug,
} from '../src/content/palaces'

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function pageText(page: NonNullable<ReturnType<typeof getPalaceFoundationPage>>): string {
  return [
    page.h1,
    page.title,
    page.description,
    page.methodNote,
    ...page.intro,
    ...page.summaryRows.flatMap((row) => [row.aspect, row.meaning, row.readingCue]),
    ...page.sections.flatMap((section) => [section.heading, ...section.content]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...page.internalLinks.flatMap((link) => [link.label, link.relation, link.href]),
    page.disclaimer,
  ].join(' ')
}

describe('12 cung foundation pages', () => {
  it('ships all 12 traditional palace pages with Bói Toán terminology', () => {
    expect(PALACE_SLUGS).toEqual([
      'menh',
      'phu-mau',
      'phuc-duc',
      'dien-trach',
      'quan-loc',
      'no-boc',
      'thien-di',
      'tat-ach',
      'tai-bach',
      'tu-nu',
      'phu-the',
      'huynh-de',
    ])
    expect(PALACE_FOUNDATION_PAGES).toHaveLength(12)
    expect(isPalaceSlug('tu-nu')).toBe(true)
    expect(isPalaceSlug('tu-tuc')).toBe(false)
  })

  it('generates complete 1,500+ word pages with SEO fields', () => {
    for (const slug of PALACE_SLUGS) {
      const page = getPalaceFoundationPage(slug)
      expect(page, `${slug} page`).not.toBeNull()
      expect(page?.urlPath).toBe(`/cung/${slug}/`)
      expect(page?.h1).toBe(`Cung ${page?.name} Trong Tử Vi — Ý Nghĩa, Sao Chiếu Và Cách Đọc`)
      expect(page?.description.length).toBeGreaterThan(90)
      expect(page?.summaryRows.length).toBeGreaterThanOrEqual(5)
      expect(page?.sections.length).toBeGreaterThanOrEqual(8)
      expect(page?.faqs.length).toBeGreaterThanOrEqual(5)
      expect(page?.internalLinks.length).toBeGreaterThanOrEqual(10)
      expect(wordCount(pageText(page!)), `${slug} word count`).toBeGreaterThanOrEqual(1500)
    }
  })

  it('keeps visible method citation and Art.320 framing', () => {
    for (const slug of PALACE_SLUGS) {
      const text = pageText(getPalaceFoundationPage(slug)!)
      expect(text).toContain('Tam Hợp Phái')
      expect(text).toContain('紫微斗数全书')
      expect(text).toContain('giải trí')
      expect(text).toContain('thuật toán tham khảo')
      expect(text).toContain('không dùng bài viết này để thay thế tư vấn y tế')
      expect(text).toContain('không phải lời tiên đoán')
    }
  })

  it('uses Tử Nữ terminology and never exposes Tử Tức', () => {
    for (const slug of PALACE_SLUGS) {
      const text = pageText(getPalaceFoundationPage(slug)!)
      expect(text).toContain('Tử Nữ')
      expect(text).not.toContain('Tử Tức')
      expect(text).not.toContain('tu-tuc')
    }
  })

  it('uses the audited 4-apart tam hợp geometry for all 12 palaces', () => {
    const expectedTamHop: Record<string, string> = {
      menh: 'Mệnh - Quan Lộc - Tài Bạch',
      'phu-mau': 'Phụ Mẫu - Nô Bộc - Tử Nữ',
      'phuc-duc': 'Phúc Đức - Thiên Di - Phu Thê',
      'dien-trach': 'Điền Trạch - Tật Ách - Huynh Đệ',
      'quan-loc': 'Quan Lộc - Tài Bạch - Mệnh',
      'no-boc': 'Nô Bộc - Tử Nữ - Phụ Mẫu',
      'thien-di': 'Thiên Di - Phu Thê - Phúc Đức',
      'tat-ach': 'Tật Ách - Huynh Đệ - Điền Trạch',
      'tai-bach': 'Tài Bạch - Mệnh - Quan Lộc',
      'tu-nu': 'Tử Nữ - Phụ Mẫu - Nô Bộc',
      'phu-the': 'Phu Thê - Phúc Đức - Thiên Di',
      'huynh-de': 'Huynh Đệ - Điền Trạch - Tật Ách',
    }

    for (const slug of PALACE_SLUGS) {
      const page = getPalaceFoundationPage(slug)!
      const tamHopRow = page.summaryRows.find((row) => row.aspect === 'Tam hợp cần xem')
      expect(getPalaceTamHop(slug), `${slug} generated tam hợp`).toBe(expectedTamHop[slug])
      expect(tamHopRow?.meaning, `${slug} tam hợp`).toBe(expectedTamHop[slug])
    }
  })

  it('does not repeat Mệnh as both the active palace and the linked root palace', () => {
    const text = pageText(getPalaceFoundationPage('menh')!)
    expect(text).not.toContain('cung Mệnh có vai trò riêng nhưng luôn liên hệ với Mệnh Cung')
    expect(text).not.toContain('cung Mệnh liên hệ với Mệnh Cung')
    expect(text).toContain('cung Mệnh là trục gốc của toàn lá số')
  })


  it('uses accurate hub labels for /tu-vi/ links', () => {
    for (const slug of PALACE_SLUGS) {
      const page = getPalaceFoundationPage(slug)!
      const hubLink = page.internalLinks.find((link) => link.href === '/tu-vi/')
      expect(hubLink?.label).toBe('Hub Tử Vi 2026')
      expect(hubLink?.label).not.toContain('Xem Lá Số Online')
    }
  })

  it('avoids deterministic, medical, and finance-promise wording', () => {
    const forbiddenPatterns = [
      /chắc chắn/i,
      /dự đoán chính xác/i,
      /cực kỳ tốt/i,
      /giàu sang/i,
      /phát tài/i,
      /tài chính dồi dào/i,
      /đầu tư mạo hiểm/i,
      /sống lâu/i,
      /khỏi bệnh/i,
      /bệnh tật/i,
      /tim mạch/i,
      /huyết áp/i,
      /\bgan\b/i,
      /dạ dày/i,
    ]

    for (const slug of PALACE_SLUGS) {
      const text = pageText(getPalaceFoundationPage(slug)!)
      for (const pattern of forbiddenPatterns) {
        expect(text, `${slug} should avoid ${pattern}`).not.toMatch(pattern)
      }
    }
  })
})
