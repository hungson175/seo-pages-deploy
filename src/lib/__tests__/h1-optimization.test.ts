/**
 * TDD Tests for STORY-016: H1 Optimization
 * RED phase — write failing tests first
 */

import { describe, it, expect } from 'vitest'

export function buildH1(
  action: string,
  keyword: string,
  benefit?: string
): string {
  // TODO: implement
  throw new Error('Not implemented')
}

export function getActionVerb(pageType: 'forecast' | 'star' | 'que' | 'tool'): string {
  // TODO: implement
  throw new Error('Not implemented')
}

describe('buildH1', () => {
  it('formats H1 with action + keyword', () => {
    const h1 = buildH1('Xem', 'Tử Vi Tuổi Tý 2026')
    expect(h1).toBe('Xem Tử Vi Tuổi Tý 2026')
  })

  it('formats H1 with action + keyword + benefit', () => {
    const h1 = buildH1('Xem', 'Tử Vi Tuổi Tý 2026', 'Luận Giải Chi Tiết')
    expect(h1).toBe('Xem Tử Vi Tuổi Tý 2026 — Luận Giải Chi Tiết')
  })

  it('formats H1 with tool action', () => {
    const h1 = buildH1('Lập', 'Lá Số Tử Vi', 'Miễn Phí')
    expect(h1).toBe('Lập Lá Số Tử Vi — Miễn Phí')
  })

  it('formats H1 with educational action', () => {
    const h1 = buildH1('Tìm Hiểu', 'Sao Tử Vi', 'Ý Nghĩa & Vị Trí')
    expect(h1).toBe('Tìm Hiểu Sao Tử Vi — Ý Nghĩa & Vị Trí')
  })
})

describe('getActionVerb', () => {
  it('returns "Xem" for forecast pages', () => {
    expect(getActionVerb('forecast')).toBe('Xem')
  })

  it('returns "Tìm Hiểu" for star pages', () => {
    expect(getActionVerb('star')).toBe('Tìm Hiểu')
  })

  it('returns "Khám Phá" for que pages', () => {
    expect(getActionVerb('que')).toBe('Khám Phá')
  })

  it('returns "Lập" for tool pages', () => {
    expect(getActionVerb('tool')).toBe('Lập')
  })
})
