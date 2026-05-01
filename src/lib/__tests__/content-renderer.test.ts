import { describe, it, expect } from 'vitest'
import { validateContent, renderContentSections, type ForecastContent } from '../content-renderer'

describe('validateContent', () => {
  const validContent: ForecastContent = {
    sections: [
      { heading: 'Tong Quan Nam 2026', content: 'Nam nay co nhieu bien dong, chi mang tinh tham khao.' },
      { heading: 'Su Nghiep & Tai Loc', content: 'Cong viec on dinh, chi mang tinh tham khao.' },
      { heading: 'Tinh Duyen & Gia Dao', content: 'Tinh cam tot dep, chi mang tinh tham khao.' },
      { heading: 'Suc Khoe', content: 'Suc khoe can chu y, chi mang tinh tham khao.' },
      { heading: 'Loi Khuyen', content: 'Hay binh tinh, chi mang tinh tham khao.' },
    ],
    faqItems: [
      { question: 'Cau hoi 1?', answer: 'Tra loi 1.' },
      { question: 'Cau hoi 2?', answer: 'Tra loi 2.' },
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
        { heading: 'Tong Quan', content: 'Your zodiac sign is...' },
      ],
      faqItems: [],
    }
    const result = validateContent(badContent)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.includes('zodiac'))).toBe(true)
  })

  it('rejects content missing tham khao framing', () => {
    const badContent = {
      ...validContent,
      sections: [
        { heading: 'Tong Quan', content: 'Ban se thanh cong tuyet doi trong nam nay. Day la mot doan van dai de vuot qua nguong 100 ky tu. Moi thu deu tot dep.' },
      ],
      faqItems: [],
    }
    const result = validateContent(badContent)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.includes('tham khảo') || e.includes('tien doan'))).toBe(true)
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
      { heading: 'Tong Quan', content: 'Nam nay...' },
      { heading: 'Su Nghiep', content: 'Cong viec...' },
    ],
    faqItems: [],
  }

  it('renders all sections as HTML', () => {
    const html = renderContentSections(content)
    expect(html).toContain('Tong Quan')
    expect(html).toContain('Su Nghiep')
    expect(html).toContain('Nam nay...')
    expect(html).toContain('Cong viec...')
  })

  it('wraps headings in h2 tags', () => {
    const html = renderContentSections(content)
    expect(html).toContain('<h2>')
  })
})
