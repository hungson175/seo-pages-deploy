import { describe, it, expect } from 'vitest'
import { toTitleCase } from '../casing'

describe('toTitleCase', () => {
  it('capitalizes first letter of each word', () => {
    expect(toTitleCase('tuoi ty 1984 nam')).toBe('Tuoi Ty 1984 Nam')
    expect(toTitleCase('la so tu vi')).toBe('La So Tu Vi')
  })

  it('handles single word', () => {
    expect(toTitleCase('tuvi')).toBe('Tuvi')
  })

  it('handles empty string', () => {
    expect(toTitleCase('')).toBe('')
  })
})
