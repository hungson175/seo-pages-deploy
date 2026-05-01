import { describe, it, expect } from 'vitest'
import { extractChartData, type ChartData } from '../chart-extractor'

describe('extractChartData', () => {
  const mockIztro = {
    palaces: [
      {
        name: 'Menh',
        majorStars: [{ name: 'Tu Vi', brightness: 'minh' }],
        minorStars: ['Ta Phu'],
        transformation: 'Hoa Loc',
      },
      {
        name: 'Phu Mau',
        majorStars: [{ name: 'Thien Co', brightness: 'ham' }],
        minorStars: [],
      },
      {
        name: 'Phuc Duc',
        majorStars: [],
        minorStars: ['Thien Khoi'],
      },
      {
        name: 'Dien Trach',
        majorStars: [{ name: 'Thai Duong', brightness: 'binh' }],
        minorStars: [],
      },
      {
        name: 'Quan Loc',
        majorStars: [{ name: 'Vu Khuc', brightness: 'minh' }],
        minorStars: [],
      },
      {
        name: 'No Boc',
        majorStars: [],
        minorStars: [],
      },
      {
        name: 'Thien Di',
        majorStars: [{ name: 'Thien Dong', brightness: 'binh' }],
        minorStars: [],
      },
      {
        name: 'Tat Ach',
        majorStars: [],
        minorStars: ['Thien Hinh'],
      },
      {
        name: 'Tai Bach',
        majorStars: [{ name: 'Liem Trinh', brightness: 'minh' }],
        minorStars: [],
      },
      {
        name: 'Tu Tuc',
        majorStars: [],
        minorStars: [],
      },
      {
        name: 'Phu The',
        majorStars: [{ name: 'Thai Am', brightness: 'ham' }],
        minorStars: [],
      },
      {
        name: 'Huynh De',
        majorStars: [],
        minorStars: [],
      },
    ],
    yearElement: 'Kim',
    fateElement: 'Thuy',
  }

  it('extracts 12 palaces', () => {
    const data = extractChartData(mockIztro)
    expect(data.palaces).toHaveLength(12)
  })

  it('extracts palace names correctly', () => {
    const data = extractChartData(mockIztro)
    expect(data.palaces[0].name).toBe('Menh')
    expect(data.palaces[4].name).toBe('Quan Loc')
    expect(data.palaces[10].name).toBe('Phu The')
  })

  it('extracts major stars with brightness', () => {
    const data = extractChartData(mockIztro)
    expect(data.palaces[0].majorStars[0]).toEqual({ name: 'Tu Vi', brightness: 'minh' })
    expect(data.palaces[1].majorStars[0]).toEqual({ name: 'Thien Co', brightness: 'ham' })
  })

  it('extracts transformations', () => {
    const data = extractChartData(mockIztro)
    expect(data.palaces[0].transformation).toBe('Hoa Loc')
  })

  it('extracts year element', () => {
    const data = extractChartData(mockIztro)
    expect(data.yearElement).toBe('Kim')
  })

  it('extracts fate element', () => {
    const data = extractChartData(mockIztro)
    expect(data.fateElement).toBe('Thuy')
  })
})
