/**
 * TDD Tests for STORY-018: Meta Tag Template System
 * RED phase — write failing tests first
 */

import { describe, it, expect } from 'vitest'
import { buildMetaTemplate } from '../meta-templates'

describe('buildMetaTemplate', () => {
  it('builds forecast page meta', () => {
    const meta = buildMetaTemplate('forecast', 'Tuổi Tý 2026', 'Luận Giải Chi Tiết')
    expect(meta.title).toContain('Xem Tuổi Tý 2026')
    expect(meta.title).toContain('Bói Toán')
    expect(meta.description).toContain('chi tiết')
    expect(meta.description.length).toBeLessThanOrEqual(160)
  })

  it('builds star page meta', () => {
    const meta = buildMetaTemplate('star', 'Sao Tử Vi', 'Ý Nghĩa & Vị Trí')
    expect(meta.title).toContain('Tìm Hiểu Sao Tử Vi')
    expect(meta.description).toContain('ý nghĩa')
  })

  it('builds que page meta', () => {
    const meta = buildMetaTemplate('que', 'Quẻ Càn Vi Thiên', 'Ý Nghĩa & Ứng Dụng')
    expect(meta.title).toContain('Khám Phá Quẻ Càn Vi Thiên')
  })

  it('builds tool page meta', () => {
    const meta = buildMetaTemplate('tool', 'Lá Số Tử Vi', 'Miễn Phí')
    expect(meta.title).toContain('Lập Lá Số Tử Vi')
    expect(meta.description).toContain('miễn phí')
  })

  it('builds homepage meta', () => {
    const meta = buildMetaTemplate('homepage', 'Bói Toán')
    expect(meta.title).toContain('Bói Toán')
    expect(meta.description).toContain('tử vi')
  })

  it('title does not exceed 60 characters', () => {
    const meta = buildMetaTemplate('forecast', 'Tuổi Tý 2026')
    expect(meta.title.length).toBeLessThanOrEqual(60)
  })

  it('description does not exceed 160 characters', () => {
    const meta = buildMetaTemplate('forecast', 'Tuổi Tý 2026')
    expect(meta.description.length).toBeLessThanOrEqual(160)
  })
})
