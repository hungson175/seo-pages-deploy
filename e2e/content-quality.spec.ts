import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - Content Quality', () => {
  test('forecast page has sufficient content length', async ({ page }) => {
    await page.goto('/tu-vi-2026/giap-ty-1984-nam-mang')
    
    const main = page.locator('main')
    const text = await main.textContent()
    
    expect(text).not.toBeNull()
    const wordCount = text!.trim().split(/\s+/).filter(Boolean).length
    expect(wordCount).toBeGreaterThanOrEqual(1500)
    const h2s = page.locator('h2')
    expect(await h2s.count()).toBeGreaterThanOrEqual(8)
  })

  test('hub page has FAQ, HowTo, Breadcrumb, and CollectionPage schema', async ({ page }) => {
    await page.goto('/tu-vi/')
    
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
    expect(scripts.some((script) => script.includes('FAQPage'))).toBe(true)
    expect(scripts.some((script) => script.includes('HowTo'))).toBe(true)
    expect(scripts.some((script) => script.includes('BreadcrumbList'))).toBe(true)
    expect(scripts.some((script) => script.includes('CollectionPage'))).toBe(true)
  })

  test('forecast page has Article, FAQ, Breadcrumb, and WebPage schema', async ({ page }) => {
    await page.goto('/tu-vi-2026/giap-ty-1984-nam-mang')
    
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
    expect(scripts.some((script) => script.includes('Article'))).toBe(true)
    expect(scripts.some((script) => script.includes('FAQPage'))).toBe(true)
    expect(scripts.some((script) => script.includes('BreadcrumbList'))).toBe(true)
    expect(scripts.some((script) => script.includes('WebPage'))).toBe(true)
  })

  test('no Western astrology terms used', async ({ page }) => {
    await page.goto('/tu-vi-2026/giap-ty-1984-nam-mang')
    
    const main = page.locator('main')
    const text = await main.textContent()
    
    expect(text?.toLowerCase()).not.toContain('aries')
    expect(text?.toLowerCase()).not.toContain('taurus')
    expect(text?.toLowerCase()).not.toContain('gemini')
    expect(text?.toLowerCase()).not.toContain('horoscope')
    expect(text?.toLowerCase()).not.toContain('zodiac')
  })
})
