import { describe, expect, it } from 'vitest'
import { generateForecastContent } from '@/lib/pipeline/generate'
import { validateComplianceContent } from '../policy'

describe('canonical compliance policy', () => {
  it('allows approved negated disclaimer language with lời tiên đoán', () => {
    const result = validateComplianceContent(
      'Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán.',
    )

    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it.each([
    'Nội dung này tiên đoán rằng bạn sẽ giàu trong tháng tới.',
    'Bạn sẽ chắc chắn đổi đời trong năm nay.',
    'Định mệnh buộc bạn phải đi theo hướng này.',
    'Kết quả đúng 100% cho mọi lá số.',
  ])('rejects deterministic claim: %s', (text) => {
    const result = validateComplianceContent(text)

    expect(result.valid).toBe(false)
    expect(result.errors.join('\n')).toMatch(/deterministic|tiên đoán|chắc chắn|định mệnh|100%/i)
  })

  it.each(['zodiac', 'horoscope', 'sun sign', 'ascendant', 'moon sign'])(
    'rejects Western astrology term: %s',
    (term) => {
      const result = validateComplianceContent(
        `Nội dung tham khảo nhưng có thuật ngữ ${term}.`,
      )

      expect(result.valid).toBe(false)
      expect(result.errors.join('\n')).toContain(term)
    },
  )

  it('accepts deterministic generator output through the canonical validator', () => {
    const content = generateForecastContent({
      palaces: [
        { name: 'Mệnh', stars: [{ name: 'Tử Vi', brightness: 'minh' }] },
        { name: 'Quan Lộc', stars: [{ name: 'Thái Dương', brightness: 'bình' }] },
      ],
      transformations: [
        { name: 'Hóa Lộc', palace: 'Mệnh' },
        { name: 'Hóa Quyền', palace: 'Quan Lộc' },
        { name: 'Hóa Khoa', palace: 'Tài Bạch' },
        { name: 'Hóa Kỵ', palace: 'Tật Ách' },
      ],
      fiveElements: 'Thủy',
      animal: 'ty',
      year: 1996,
      gender: 'male',
    })

    const result = validateComplianceContent(content)

    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('allows Tử Vi technical phrase xác định Mệnh Cung', () => {
    const result = validateComplianceContent(
      'Cần ngày sinh, giờ sinh và giới tính để xác định Mệnh Cung, Thân Cung và vị trí sao. Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán.',
      { requireThamKhaoIfSubstantial: true },
    )

    expect(result.errors).toEqual([])
  })
})
