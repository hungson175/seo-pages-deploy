import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - Content Quality', () => {
  test('forecast page has sufficient content length', async ({ page }) => {
    await page.goto('/tuvi/tuoi-ty-1984-nam')
    
    // Get all text content from main
    const main = page.locator('main')
    const text = await main.textContent()
    
    // Should have substantial content (at least a few hundred characters)
    expect(text?.length).toBeGreaterThan(200)
    
    // Should have multiple sections (h2 tags)
    const h2s = page.locator('h2')
    await expect(h2s).toHaveCount(3)
  })

  test('forecast page has FAQ schema', async ({ page }) => {
    await page.goto('/tuvi/tuoi-ty-1984-nam')
    
    // Check for FAQPage JSON-LD schema
    const faqScript = page.locator('script[type="application/ld+json"]')
    const scripts = await faqScript.allTextContents()
    const hasFaqSchema = scripts.some(script => script.includes('FAQPage'))
    expect(hasFaqSchema).toBe(true)
  })

  test('no Western astrology terms used', async ({ page }) => {
    await page.goto('/tuvi/tuoi-ty-1984-nam')
    
    const main = page.locator('main')
    const text = await main.textContent()
    
    // Should NOT contain Western zodiac terms (check only visible content)
    expect(text?.toLowerCase()).not.toContain('aries')
    expect(text?.toLowerCase()).not.toContain('taurus')
    expect(text?.toLowerCase()).not.toContain('gemini')
    expect(text?.toLowerCase()).not.toContain('horoscope')
    expect(text?.toLowerCase()).not.toContain('zodiac')
  })
})
