import { describe, it, expect } from 'vitest'
import { generateForecastContent } from '../src/lib/pipeline/generate'
import { validateContent } from '../src/lib/pipeline/validate'

describe('generateForecastContent', () => {
  const mockIztroData = {
    palaces: [
      { name: 'Mệnh', stars: [{ name: 'Tử Vi', brightness: 'minh', type: 'major' }] },
      { name: 'Quan Lộc', stars: [{ name: 'Thái Dương', brightness: 'bình', type: 'major' }] },
    ],
    transformations: [
      { name: 'Hóa Lộc', palace: 'Mệnh' },
    ],
    fiveElements: 'Thủy',
    animal: 'ty',
    year: 1996,
    gender: 'male',
  }

  it('generates content with 5-7 sections', () => {
    const content = generateForecastContent(mockIztroData)
    expect(content.sections.length).toBeGreaterThanOrEqual(5)
    expect(content.sections.length).toBeLessThanOrEqual(7)
  })

  it('includes required section headings', () => {
    const content = generateForecastContent(mockIztroData)
    const headings = content.sections.map((s: { heading: string }) => s.heading)
    expect(headings).toContain('Tổng quan năm 1996')
    expect(headings).toContain('Sự nghiệp & Tài lộc')
    expect(headings).toContain('Tình duyên & Gia đạo')
    expect(headings).toContain('Sức khỏe')
    expect(headings).toContain('Lờii khuyên')
  })

  it('generates 1,200-1,500 words total', () => {
    const content = generateForecastContent(mockIztroData)
    const totalText = content.sections.map((s: { content: string }) => s.content).join(' ')
    const wordCount = totalText.split(/\s+/).length
    expect(wordCount).toBeGreaterThanOrEqual(1200)
    expect(wordCount).toBeLessThanOrEqual(1500)
  })

  it('includes FAQ section with 2-4 items', () => {
    const content = generateForecastContent(mockIztroData)
    expect(content.faqs).toBeDefined()
    expect(content.faqs.length).toBeGreaterThanOrEqual(2)
    expect(content.faqs.length).toBeLessThanOrEqual(4)
  })
})

describe('validateContent - Article 320 compliance', () => {
  it('rejects content containing tiên đoán', () => {
    const badContent = {
      sections: [{ heading: 'Test', content: 'Đây là tiên đoán về tương lai.' }],
      faqs: [],
    }
    expect(validateContent(badContent).compliant).toBe(false)
    expect(validateContent(badContent).errors).toContain('Found forbidden term: tiên đoán')
  })

  it('rejects content containing định mệnh', () => {
    const badContent = {
      sections: [{ heading: 'Test', content: 'Đây là định mệnh của bạn.' }],
      faqs: [],
    }
    expect(validateContent(badContent).compliant).toBe(false)
  })

  it('accepts content with tham khảo framing', () => {
    const goodContent = {
      sections: [{ heading: 'Test', content: 'Nội dung này chỉ mang tính tham khảo.' }],
      faqs: [],
    }
    expect(validateContent(goodContent).compliant).toBe(true)
  })

  it('checks for tham khảo in every section', () => {
    const partialContent = {
      sections: [
        { heading: 'A', content: 'Tham khảo nội dung này.' },
        { heading: 'B', content: 'Nội dung không có từ khóa.' },
      ],
      faqs: [],
    }
    expect(validateContent(partialContent).compliant).toBe(false)
  })
})

describe('validateContent - domain rules', () => {
  it('rejects Western astrology terms: zodiac', () => {
    const content = {
      sections: [{ heading: 'Test', content: 'Your zodiac sign is...' }],
      faqs: [],
    }
    expect(validateContent(content).compliant).toBe(false)
  })

  it('rejects Western astrology terms: horoscope', () => {
    const content = {
      sections: [{ heading: 'Test', content: 'This horoscope predicts...' }],
      faqs: [],
    }
    expect(validateContent(content).compliant).toBe(false)
  })

  it('rejects Western astrology terms: sun sign', () => {
    const content = {
      sections: [{ heading: 'Test', content: 'Your sun sign is...' }],
      faqs: [],
    }
    expect(validateContent(content).compliant).toBe(false)
  })

  it('rejects Western astrology terms: ascendant', () => {
    const content = {
      sections: [{ heading: 'Test', content: 'The ascendant is...' }],
      faqs: [],
    }
    expect(validateContent(content).compliant).toBe(false)
  })

  it('accepts Vietnamese Tử Vi terminology', () => {
    const content = {
      sections: [{ heading: 'Test', content: 'Sao Tử Vi ở cung Mệnh cho thấy nhiều điều thú vị. Nội dung chỉ mang tính tham khảo.' }],
      faqs: [],
    }
    expect(validateContent(content).compliant).toBe(true)
  })
})

describe('validateContent - star brightness terminology', () => {
  it('accepts minh/hãm/bình', () => {
    const content = {
      sections: [{ heading: 'Test', content: 'Sao này ở độ sáng minh. Nội dung tham khảo.' }],
      faqs: [],
    }
    expect(validateContent(content).compliant).toBe(true)
  })

  it('flags strong/weak as incorrect terminology', () => {
    const content = {
      sections: [{ heading: 'Test', content: 'Sao này rất strong.' }],
      faqs: [],
    }
    expect(validateContent(content).compliant).toBe(false)
  })
})
