import { describe, it, expect } from 'vitest'
import { generateInsights, type Insight } from '../insights'

describe('generateInsights', () => {
  const mockChart = {
    palaces: [
      {
        name: 'Mệnh',
        majorStars: [{ name: 'Tử Vi', brightness: 'minh' as const }],
        transformation: 'Hóa Lộc',
      },
      {
        name: 'Quan Lộc',
        majorStars: [{ name: 'Vũ Khúc', brightness: 'minh' as const }],
      },
      {
        name: 'Tài Bạch',
        majorStars: [{ name: 'Liêm Trinh', brightness: 'ham' as const }],
      },
      {
        name: 'Phu Thê',
        majorStars: [{ name: 'Thái Âm', brightness: 'binh' as const }],
      },
      {
        name: 'Tật Ách',
        majorStars: [],
      },
    ],
    yearElement: 'Kim',
  }

  it('returns exactly 3 insights', () => {
    const insights = generateInsights(mockChart)
    expect(insights).toHaveLength(3)
  })

  it('first insight is Menh Cung Verdict', () => {
    const insights = generateInsights(mockChart)
    expect(insights[0].type).toBe('menh')
    expect(insights[0].title).toContain('Mệnh')
  })

  it('second insight is Life Area Teaser', () => {
    const insights = generateInsights(mockChart)
    expect(insights[1].type).toBe('life-area')
  })

  it('third insight is Lucky Element', () => {
    const insights = generateInsights(mockChart)
    expect(insights[2].type).toBe('lucky-element')
    expect(insights[2].title).toContain('Ngũ Hành')
  })

  it('Menh insight references primary star and brightness', () => {
    const insights = generateInsights(mockChart)
    expect(insights[0].content).toContain('Tử Vi')
    expect(insights[0].content).toContain('sáng rõ')
  })

  it('Menh insight references transformation', () => {
    const insights = generateInsights(mockChart)
    expect(insights[0].content).toContain('Hóa Lộc')
  })

  it('Life Area insight references specific palace', () => {
    const insights = generateInsights(mockChart)
    expect(insights[1].content).toMatch(/Quan Lộc|Tài Bạch|Phu Thê|Tật Ách/)
  })

  it('Lucky Element insight references year element', () => {
    const insights = generateInsights(mockChart)
    expect(insights[2].content).toContain('Kim')
  })

  it('insights do not contain Western astrology terms', () => {
    const insights = generateInsights(mockChart)
    const forbidden = ['zodiac', 'horoscope', 'sun sign', 'ascendant']
    const allText = insights.map((i) => i.content).join(' ').toLowerCase()
    for (const term of forbidden) {
      expect(allText).not.toContain(term)
    }
  })

  it('insights are 2-3 sentences max', () => {
    const insights = generateInsights(mockChart)
    for (const insight of insights) {
      const sentences = insight.content.split(/[.!?]/).filter((s) => s.trim().length > 0)
      expect(sentences.length).toBeLessThanOrEqual(3)
    }
  })
})
