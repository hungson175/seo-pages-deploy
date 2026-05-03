import { existsSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { PALACE_SLUGS } from '../src/content/palaces'
import {
  PALACE_IMAGE_ASSETS,
  PALACE_IMAGE_LIST,
  getPalaceImageForForecastSection,
} from '../src/content/palace-images'

describe('reusable palace images', () => {
  it('ships exactly one image for each approved 12-cung slug', () => {
    expect(PALACE_IMAGE_LIST).toHaveLength(12)
    expect(PALACE_IMAGE_LIST.map((asset) => asset.slug)).toEqual(PALACE_SLUGS)
    expect(Object.keys(PALACE_IMAGE_ASSETS)).not.toContain('tu-tuc')
  })

  it('keeps every generated asset local, small, and present on disk', () => {
    for (const asset of PALACE_IMAGE_LIST) {
      expect(asset.src).toBe(`/images/palaces/tu-vi-cung-${asset.slug}.webp`)
      expect(asset.width).toBe(800)
      expect(asset.height).toBe(600)
      expect(asset.alt.length).toBeGreaterThan(30)
      expect(asset.alt).not.toMatch(/chắc chắn|phát tài|khỏi bệnh|sống lâu|Tử Tức|đồng tiền|tiền mặt/i)
      expect(asset.caption).not.toMatch(/chắc chắn|phát tài|khỏi bệnh|sống lâu|Tử Tức|đồng tiền|tiền mặt/i)

      const path = `public${asset.src}`
      expect(existsSync(path), `${path} exists`).toBe(true)
      const size = statSync(path).size
      expect(size, `${path} size`).toBeGreaterThan(5_000)
      expect(size, `${path} size`).toBeLessThan(80_000)
    }
  })

  it('maps forecast article sections to reusable palace visuals', () => {
    expect(getPalaceImageForForecastSection('Tổng quan năm 2026')?.slug).toBe('menh')
    expect(getPalaceImageForForecastSection('Công danh và sự nghiệp tuổi Giáp Tý năm 2026')?.slug).toBe('quan-loc')
    expect(getPalaceImageForForecastSection('Tài lộc và kế hoạch tiền bạc')?.slug).toBe('tai-bach')
    expect(getPalaceImageForForecastSection('Tình duyên, gia đạo và các mối quan hệ')?.slug).toBe('phu-the')
    expect(getPalaceImageForForecastSection('Sức khỏe, tinh thần và nhịp sống cần chú ý')?.slug).toBe('tat-ach')
    expect(getPalaceImageForForecastSection('Lời khuyên thực tế')).toBeNull()
  })
})
