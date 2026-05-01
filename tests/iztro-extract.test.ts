import { describe, it, expect } from 'vitest'
import { extractIztroData } from '../src/lib/iztro/extract'

describe('extractIztroData', () => {
  it('returns astrolabe JSON for valid birth data', () => {
    const data = extractIztroData({
      date: '1996-02-15',
      timeIndex: 2, // Dần
      gender: 'male',
    })
    expect(data).toBeDefined()
    expect(data.palaces).toBeDefined()
    expect(data.palaces).toHaveLength(12)
  })

  it('maps 12 palace names correctly', () => {
    const data = extractIztroData({
      date: '1996-02-15',
      timeIndex: 2,
      gender: 'male',
    })
    const palaceNames = data.palaces.map((p: { name: string }) => p.name)
    const required = [
      'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
      'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ',
    ]
    required.forEach((name) => {
      expect(palaceNames).toContain(name)
    })
  })

  it('includes major stars with brightness levels', () => {
    const data = extractIztroData({
      date: '1996-02-15',
      timeIndex: 2,
      gender: 'male',
    })
    const allStars = data.palaces.flatMap((p: { stars: unknown[] }) => p.stars)
    const majorStars = allStars.filter((s: { type: string }) => s.type === 'major')
    expect(majorStars.length).toBeGreaterThan(0)
    majorStars.forEach((star: { brightness: string }) => {
      expect(['minh', 'hãm', 'bình']).toContain(star.brightness)
    })
  })

  it('includes four transformations (Tứ Hóa)', () => {
    const data = extractIztroData({
      date: '1996-02-15',
      timeIndex: 2,
      gender: 'male',
    })
    expect(data.transformations).toBeDefined()
    const names = data.transformations.map((t: { name: string }) => t.name)
    expect(names).toContain('Hóa Lộc')
    expect(names).toContain('Hóa Quyền')
    expect(names).toContain('Hóa Khoa')
    expect(names).toContain('Hóa Kỵ')
  })

  it('includes Five Elements class (Ngũ Hành)', () => {
    const data = extractIztroData({
      date: '1996-02-15',
      timeIndex: 2,
      gender: 'male',
    })
    expect(data.fiveElements).toBeDefined()
    expect(['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ']).toContain(data.fiveElements)
  })

  it('throws for invalid date', () => {
    expect(() =>
      extractIztroData({ date: 'invalid', timeIndex: 0, gender: 'male' })
    ).toThrow()
  })
})
