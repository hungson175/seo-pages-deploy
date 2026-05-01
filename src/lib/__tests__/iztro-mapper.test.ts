import { describe, it, expect } from 'vitest'
import { mapFormToIztro } from '../iztro-mapper'

describe('mapFormToIztro', () => {
  it('maps nam to male', () => {
    const result = mapFormToIztro({
      birth_date: '1990-05-15',
      birth_time: '0',
      gender: 'nam',
    })
    expect(result.gender).toBe('male')
  })

  it('maps nu to female', () => {
    const result = mapFormToIztro({
      birth_date: '1990-05-15',
      birth_time: '6',
      gender: 'nu',
    })
    expect(result.gender).toBe('female')
  })

  it('passes date and timeIndex directly', () => {
    const result = mapFormToIztro({
      birth_date: '1984-02-15',
      birth_time: '3',
      gender: 'nam',
    })
    expect(result.date).toBe('1984-02-15')
    expect(result.timeIndex).toBe(3)
  })

  it('ignores name field', () => {
    const result = mapFormToIztro({
      name: 'Nguyen Van A',
      birth_date: '2000-01-01',
      birth_time: '11',
      gender: 'nu',
    })
    expect(result).not.toHaveProperty('name')
  })

  it('parses all 12 time periods correctly', () => {
    for (let i = 0; i < 12; i++) {
      const result = mapFormToIztro({
        birth_date: '2000-01-01',
        birth_time: String(i),
        gender: 'nam',
      })
      expect(result.timeIndex).toBe(i)
    }
  })
})
