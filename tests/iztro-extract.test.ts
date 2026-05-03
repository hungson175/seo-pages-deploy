import { describe, it, expect } from 'vitest'
import fixture1989 from './fixtures/iztro/extract-1989-02-15.json'
import { ANIMALS } from '../src/content/routes'
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
      'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Nữ', 'Phu Thê', 'Huynh Đệ',
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


  it('maps Tỵ years to canonical slug ti, not tyj or ty-j', () => {
    const data = extractIztroData({
      date: '1989-02-15',
      timeIndex: 5,
      gender: 'male',
    })

    expect(data?.animal).toBe('ti')
    expect(data?.animal).not.toBe('tyj')
    expect(data?.animal).not.toBe('ty-j')
  })

  it('uses the same 12 animal slugs as the route allow-list', () => {
    const years = Array.from({ length: 12 }, (_, index) => 1984 + index)
    const extracted = years.map((year) => extractIztroData({
      date: `${year}-02-15`,
      timeIndex: 0,
      gender: 'male',
    })?.animal)

    expect(extracted).toEqual(ANIMALS)
    expect(extracted).toContain('ti')
    expect(extracted).not.toContain('tyj')
    expect(extracted).not.toContain('ty-j')
  })

  it('matches the approved iztro v2.5.8 fixture shape used by the generation pipeline', () => {
    const data = extractIztroData({
      date: '1989-02-15',
      timeIndex: 5,
      gender: 'male',
    })

    expect(data).toMatchObject({
      animal: fixture1989.animal,
      year: fixture1989.year,
      gender: fixture1989.gender,
      fiveElements: fixture1989.fiveElements,
      transformations: fixture1989.transformations,
    })
    expect(data?.palaces.map((palace) => palace.name)).toEqual(fixture1989.palaceNames)
  })

  it('returns null for invalid date', () => {
    expect(
      extractIztroData({ date: 'invalid', timeIndex: 0, gender: 'male' })
    ).toBeNull()
  })
})
