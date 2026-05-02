import { describe, expect, it } from 'vitest'
import { PALACE_SLUGS } from '../src/content/palaces'
import { PRIORITY_STAR_SLUGS } from '../src/content/stars'
import {
  APPROVED_STAR_PALACE_COMBINATIONS,
  buildStarPalacePath,
  getStarPalaceDraftPage,
  getStarPalacePage,
  getStarPalaceTemplateMatrix,
} from '../src/content/star-palace'

describe('star×cung expansion template', () => {
  it('prepares a full draft matrix for reviewed priority stars and 12 palaces', () => {
    const matrix = getStarPalaceTemplateMatrix()

    expect(matrix).toHaveLength(PRIORITY_STAR_SLUGS.length * PALACE_SLUGS.length)
    expect(matrix.every((page) => page.status === 'draft-template')).toBe(true)
    expect(matrix.every((page) => page.indexable === false)).toBe(true)
  })

  it('does not publish or index star×cung pages until approved', () => {
    expect(APPROVED_STAR_PALACE_COMBINATIONS).toHaveLength(0)
    expect(getStarPalacePage('tu-vi', 'menh')).toBeNull()
    expect(getStarPalacePage('thai-duong', 'quan-loc')).toBeNull()
  })

  it('builds a safe draft for a valid star×cung pair', () => {
    const draft = getStarPalaceDraftPage('tu-vi', 'menh')

    expect(draft).not.toBeNull()
    expect(draft?.h1).toBe('Sao Tử Vi Ở Cung Mệnh — Ý Nghĩa Và Cách Đọc')
    expect(draft?.urlPath).toBe('/sao/tu-vi/cung/menh/')
    expect(draft?.canonicalWhenApproved).toBe('/sao/tu-vi/cung/menh/')
    expect(draft?.qualityGate.join(' ')).toContain('Bói-Toán domain review')
    expect(draft?.qualityGate.join(' ')).toContain('CMO compliance review')
    expect(draft?.qualityGate.join(' ')).toContain('SEO review')
    expect(draft?.methodNote).toContain('Tam Hợp Phái')
    expect(draft?.methodNote).toContain('không suy diễn từ một sao hoặc một cung riêng lẻ')
    expect(draft?.sections.length).toBeGreaterThanOrEqual(4)
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
