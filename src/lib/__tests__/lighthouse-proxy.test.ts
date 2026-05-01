import { describe, it, expect } from 'vitest'
import { estimateBundleSize, checkAccessibilityRules } from '../lighthouse-proxy'

describe('STORY-010: Performance', () => {
  it('static page bundle < 150 KB', () => {
    const size = estimateBundleSize('static')
    expect(size).toBeLessThan(150)
  })

  it('tool page initial bundle < 150 KB (iztro lazy-loaded)', () => {
    const size = estimateBundleSize('tool')
    expect(size).toBeLessThan(150)
  })
})

describe('STORY-010: Accessibility', () => {
  it('detects missing lang attribute', () => {
    const html = '<html><body></body></html>'
    const result = checkAccessibilityRules(html)
    expect(result.violations).toContain('Missing lang attribute on <html>')
  })

  it('detects missing form labels', () => {
    const html = '<form><input type="text" /></form>'
    const result = checkAccessibilityRules(html)
    expect(result.violations).toContain('Form input missing label')
  })

  it('passes with proper accessibility markup', () => {
    const html = '<html lang="vi"><form><label for="x">Name</label><input id="x" /></form></html>'
    const result = checkAccessibilityRules(html)
    expect(result.violations).toHaveLength(0)
  })
})
