import { describe, it, expect } from 'vitest'
import { toSlug } from '../slug'

describe('toSlug', () => {
  it('strips Vietnamese diacritics and lowercases', () => {
    expect(toSlug('Tử Vi')).toBe('tu-vi')
    expect(toSlug('Giáp Tý')).toBe('giap-ty')
    expect(toSlug('tử vi')).toBe('tu-vi')
  })

  it('replaces spaces with hyphens', () => {
    expect(toSlug('lá số tử vi')).toBe('la-so-tu-vi')
    expect(toSlug('  nhiều   khoảng trắng  ')).toBe('nhieu-khoang-trang')
  })

  it('handles special characters gracefully', () => {
    expect(toSlug('tử vi & gieo quẻ!')).toBe('tu-vi-gieo-que')
    expect(toSlug('sao -- tử vi')).toBe('sao-tu-vi')
  })

  it('returns empty string for empty input', () => {
    expect(toSlug('')).toBe('')
  })

  it('handles common Tử Vi terms', () => {
    expect(toSlug('Tử Vi Trọn Đờii')).toBe('tu-vi-tron-doii')
    expect(toSlug('Lá Số Tử Vi')).toBe('la-so-tu-vi')
    expect(toSlug('Xem Tử Vi 2026')).toBe('xem-tu-vi-2026')
    expect(toSlug('Tuổi Tý 1984 Nam')).toBe('tuoi-ty-1984-nam')
    expect(toSlug('Tuổi Tý 1984 Nữ')).toBe('tuoi-ty-1984-nu')
  })
})
