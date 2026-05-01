import { describe, it, expect } from 'vitest'
import { validateSlug, isAllowedSlug, SLUG_ALLOW_LIST } from '../src/lib/allow-list'

describe('validateSlug', () => {
  it('returns true for allowed forecast slugs', () => {
    expect(validateSlug('tuoi-ty-2026-nam')).toBe(true)
    expect(validateSlug('tuoi-ty-2026-nu')).toBe(true)
    expect(validateSlug('tuoi-su-2026-nam')).toBe(true)
    expect(validateSlug('tuoi-dan-2026-nu')).toBe(true)
  })

  it('returns true for allowed star slugs', () => {
    expect(validateSlug('tu-vi')).toBe(true)
    expect(validateSlug('thai-duong')).toBe(true)
    expect(validateSlug('thai-am')).toBe(true)
    expect(validateSlug('liem-trinh')).toBe(true)
  })

  it('returns true for allowed tool slugs', () => {
    expect(validateSlug('lap-la-so')).toBe(true)
  })

  it('returns false for unknown slugs', () => {
    expect(validateSlug('unknown-slug')).toBe(false)
    expect(validateSlug('random-page')).toBe(false)
    expect(validateSlug('')).toBe(false)
  })

  it('returns false for potentially dangerous slugs', () => {
    expect(validateSlug('../../../etc/passwd')).toBe(false)
    expect(validateSlug('slug<script>')).toBe(false)
    expect(validateSlug('slug%20encoded')).toBe(false)
  })

  it('returns false for slugs with uppercase letters', () => {
    expect(validateSlug('Tuoi-Ty-2026')).toBe(false)
    expect(validateSlug('TUVI')).toBe(false)
  })

  it('returns false for slugs with trailing/leading hyphens', () => {
    expect(validateSlug('-tuoi-ty')).toBe(false)
    expect(validateSlug('tuoi-ty-')).toBe(false)
  })
})

describe('isAllowedSlug', () => {
  it('is a convenience alias for validateSlug', () => {
    expect(isAllowedSlug('tuoi-ty-2026-nam')).toBe(true)
    expect(isAllowedSlug('invalid')).toBe(false)
  })
})

describe('SLUG_ALLOW_LIST', () => {
  it('contains at least 12 animal zodiac entries', () => {
    const animals = ['ty', 'suu', 'dan', 'mao', 'thin', 'tyj', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi']
    animals.forEach((animal) => {
      expect(SLUG_ALLOW_LIST.some((s) => s.includes(animal))).toBe(true)
    })
  })

  it('contains common star names', () => {
    expect(SLUG_ALLOW_LIST).toContain('tu-vi')
    expect(SLUG_ALLOW_LIST).toContain('thai-duong')
    expect(SLUG_ALLOW_LIST).toContain('thai-am')
  })

  it('contains the free tool slug', () => {
    expect(SLUG_ALLOW_LIST).toContain('lap-la-so')
  })

  it('has no duplicates', () => {
    const unique = new Set(SLUG_ALLOW_LIST)
    expect(unique.size).toBe(SLUG_ALLOW_LIST.length)
  })
})
