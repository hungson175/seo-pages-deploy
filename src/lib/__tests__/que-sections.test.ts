import { describe, it, expect } from 'vitest'

export interface QueSection {
  id: string
  heading: string
  required: boolean
}

export const QUE_SECTIONS: QueSection[] = [
  { id: 'y-nghia', heading: 'Ý Nghĩa Quẻ', required: true },
  { id: 'luc-hao', heading: 'Lục Hào', required: true },
  { id: 'ung-dung', heading: 'Ứng Dụng', required: true },
  { id: 'bien-que', heading: 'Biến Quẻ', required: false },
  { id: 'faq', heading: 'Câu Hỏi Thường Gặp', required: true },
  { id: 'cta', heading: 'Gieo Quẻ Ngay', required: true },
]

export function validateQueSections(sections: QueSection[]): { valid: boolean; errors: string[] } {
  // TODO: implement
  throw new Error('Not implemented')
}

describe('validateQueSections', () => {
  it('validates all 6 required sections present', () => {
    const result = validateQueSections(QUE_SECTIONS)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('rejects missing required sections', () => {
    const incomplete = QUE_SECTIONS.filter((s) => s.id !== 'y-nghia')
    const result = validateQueSections(incomplete)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Thiếu section: Ý Nghĩa Quẻ')
  })

  it('accepts optional sections missing', () => {
    const withoutOptional = QUE_SECTIONS.filter((s) => s.id !== 'bien-que')
    const result = validateQueSections(withoutOptional)
    expect(result.valid).toBe(true)
  })

  it('validates 5-7 semantic H2s', () => {
    const result = validateQueSections(QUE_SECTIONS)
    expect(result.valid).toBe(true)
  })

  it('rejects fewer than 5 sections', () => {
    const tooFew = QUE_SECTIONS.slice(0, 3)
    const result = validateQueSections(tooFew)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Cần ít nhất 5 sections')
  })

  it('rejects more than 7 sections', () => {
    const tooMany = [
      ...QUE_SECTIONS,
      { id: 'extra1', heading: 'Extra 1', required: false },
      { id: 'extra2', heading: 'Extra 2', required: false },
    ]
    const result = validateQueSections(tooMany)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Tối đa 7 sections')
  })
})
