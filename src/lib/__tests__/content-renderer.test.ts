import { describe, it, expect } from 'vitest'

export interface ContentSection {
  heading: string
  content: string
}

export interface ForecastContent {
  sections: ContentSection[]
  faqItems: Array<{ question: string; answer: string }>
}

export function renderContentSections(content: ForecastContent): string {
  // TODO: implement
  throw new Error('Not implemented')
}

export function validateContent(content: ForecastContent): { valid: boolean; errors: string[] } {
  // TODO: implement
  throw new Error('Not implemented')
}

describe('validateContent', () => {
  const validContent: ForecastContent = {
    sections: [
      { heading: 'Tổng Quan Năm 2026', content: 'Năm nay có nhiều biến động...' },
      { heading: 'Sự Nghiệp & Tài Lộc', content: 'Công việc ổn định...' },
      { heading: 'Tình Duyên & Gia Đạo', content: 'Tình cảm tốt đẹp...' },
      { heading: 'Sức Khỏe', content: 'Sức khỏe cần chú ý...' },
    ],
    faqItems: [
      { question: 'Câu hỏi 1?', answer: 'Trả lờii 1.' },
      { question: 'Câu hỏi 2?', answer: 'Trả lờii 2.' },
    ],
  }

  it('validates content with 5-7 sections', () => {
    const result = validateContent(validContent)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('rejects content with fewer than 5 sections', () => {
    const badContent = { ...validContent, sections: validContent.sections.slice(0, 3) }
    const result = validateContent(badContent)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Cần ít nhất 5 sections')
  })

  it('rejects content with more than 7 sections', () => {
    const badContent = {
      ...validContent,
      sections: [...validContent.sections, ...validContent.sections],
    }
    const result = validateContent(badContent)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Tối đa 7 sections')
  })

  it('rejects content with Western astrology terms', () => {
    const badContent = {
      ...validContent,
      sections: [
        { heading: 'Tổng Quan', content: 'Your zodiac sign is...' },
      ],
      faqItems: [],
    }
    const result = validateContent(badContent)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.includes('zodiac'))).toBe(true)
  })

  it('rejects content missing tham khảo framing', () => {
    const badContent = {
      ...validContent,
      sections: [
        { heading: 'Tổng Quan', content: 'Bạn sẽ thành công tuyệt đối.' },
      ],
      faqItems: [],
    }
    const result = validateContent(badContent)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.includes('tham khảo') || e.includes('tiên đoán'))).toBe(true)
  })

  it('validates FAQ items count (2-4)', () => {
    const result = validateContent(validContent)
    expect(result.valid).toBe(true)
  })

  it('rejects content with fewer than 2 FAQ items', () => {
    const badContent = { ...validContent, faqItems: [] }
    const result = validateContent(badContent)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Cần ít nhất 2 FAQ items')
  })

  it('rejects content with more than 4 FAQ items', () => {
    const badContent = {
      ...validContent,
      faqItems: [
        { question: 'Q1?', answer: 'A1.' },
        { question: 'Q2?', answer: 'A2.' },
        { question: 'Q3?', answer: 'A3.' },
        { question: 'Q4?', answer: 'A4.' },
        { question: 'Q5?', answer: 'A5.' },
      ],
    }
    const result = validateContent(badContent)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Tối đa 4 FAQ items')
  })
})

describe('renderContentSections', () => {
  const content: ForecastContent = {
    sections: [
      { heading: 'Tổng Quan', content: 'Năm nay...' },
      { heading: 'Sự Nghiệp', content: 'Công việc...' },
    ],
    faqItems: [],
  }

  it('renders all sections as HTML', () => {
    const html = renderContentSections(content)
    expect(html).toContain('Tổng Quan')
    expect(html).toContain('Sự Nghiệp')
    expect(html).toContain('Năm nay...')
    expect(html).toContain('Công việc...')
  })

  it('wraps headings in h2 tags', () => {
    const html = renderContentSections(content)
    expect(html).toContain('<h2')
  })
})
