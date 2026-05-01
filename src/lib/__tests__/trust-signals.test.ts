/**
 * TDD Tests for STORY-019: Trust Signals
 * RED phase — write failing tests first
 */

import { describe, it, expect } from 'vitest'
import { buildAuthorInfo, buildArt320Badge } from '../trust-signals'

describe('buildAuthorInfo', () => {
  it('returns expert author info', () => {
    const info = buildAuthorInfo('2026-05-01')
    expect(info.name).toBeTruthy()
    expect(info.title).toBeTruthy()
    expect(info.credentials).toBeTruthy()
  })

  it('includes publish date', () => {
    const info = buildAuthorInfo('2026-05-01')
    expect(info.publishDate).toBe('2026-05-01')
  })

  it('includes update date if provided', () => {
    const info = buildAuthorInfo('2026-05-01', '2026-05-15')
    expect(info.updateDate).toBe('2026-05-15')
  })

  it('defaults updateDate to publishDate', () => {
    const info = buildAuthorInfo('2026-05-01')
    expect(info.updateDate).toBe('2026-05-01')
  })
})

describe('buildArt320Badge', () => {
  it('returns Art.320 disclaimer text', () => {
    const badge = buildArt320Badge()
    expect(badge.text).toContain('tham khảo')
    expect(badge.text).toContain('không phải')
  })

  it('returns visual badge class', () => {
    const badge = buildArt320Badge()
    expect(badge.className).toContain('rounded-full')
  })
})
