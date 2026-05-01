import { describe, it, expect } from 'vitest'
import { validateQueSections, QUE_SECTIONS, type QueSection } from '../que-sections'

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
    expect(result.errors).toContain('Thieu section: Ý Nghĩa Quẻ')
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
    expect(result.errors).toContain('Can it nhat 5 sections')
  })

  it('rejects more than 7 sections', () => {
    const tooMany: QueSection[] = [
      ...QUE_SECTIONS,
      { id: 'extra1', heading: 'Extra 1', required: false },
      { id: 'extra2', heading: 'Extra 2', required: false },
    ]
    const result = validateQueSections(tooMany)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Toi da 7 sections')
  })
})
