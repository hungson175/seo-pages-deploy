import { describe, it, expect } from 'vitest'
import { generateInsights, type Insight } from '../insights'

describe('generateInsights', () => {
  const mockChart = {
    palaces: [
      {
        name: 'Menh',
        majorStars: [{ name: 'Tu Vi', brightness: 'minh' as const }],
        transformation: 'Hoa Loc',
      },
      {
        name: 'Quan Loc',
        majorStars: [{ name: 'Vu Khuc', brightness: 'minh' as const }],
      },
      {
        name: 'Tai Bach',
        majorStars: [{ name: 'Liem Trinh', brightness: 'ham' as const }],
      },
      {
        name: 'Phu The',
        majorStars: [{ name: 'Thai Am', brightness: 'binh' as const }],
      },
      {
        name: 'Tat Ach',
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
    expect(insights[0].title).toContain('Menh')
  })

  it('second insight is Life Area Teaser', () => {
    const insights = generateInsights(mockChart)
    expect(insights[1].type).toBe('life-area')
  })

  it('third insight is Lucky Element', () => {
    const insights = generateInsights(mockChart)
    expect(insights[2].type).toBe('lucky-element')
    expect(insights[2].title).toContain('Ngu Hanh')
  })

  it('Menh insight references primary star and brightness', () => {
    const insights = generateInsights(mockChart)
    expect(insights[0].content).toContain('Tu Vi')
    expect(insights[0].content).toContain('minh')
  })

  it('Menh insight references transformation', () => {
    const insights = generateInsights(mockChart)
    expect(insights[0].content).toContain('Hoa Loc')
  })

  it('Life Area insight references specific palace', () => {
    const insights = generateInsights(mockChart)
    expect(insights[1].content).toMatch(/Quan Loc|Tai Bach|Phu The|Tat Ach/)
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
