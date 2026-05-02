import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - SEO Requirements', () => {
  test('all pages have lang="vi"', async ({ page }) => {
    const pages = ['/', '/tuvi/tuoi-ty-1984-nam', '/sao/tu-vi', '/que/1-kien-vi-thien']
    
    for (const url of pages) {
      await page.goto(url)
      const html = page.locator('html')
      await expect(html).toHaveAttribute('lang', 'vi')
    }
  })

  test('forecast pages have proper meta tags', async ({ page }) => {
    await page.goto('/tuvi/tuoi-ty-1984-nam')
    
    // Meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /tử vi/i)
    
    // Canonical or og tags if present
    const ogTitle = page.locator('meta[property="og:title"]')
    // May or may not exist, just check page structure
  })

  test('pages have single H1', async ({ page }) => {
    await page.goto('/tuvi/tuoi-ty-1984-nam')
    
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
  })

  test('Article 320 compliance text present', async ({ page }) => {
    await page.goto('/tuvi/tuoi-ty-1984-nam')
    await page.waitForLoadState('networkidle')
    
    // Should have reference text - check footer disclaimer specifically
    await expect(page.locator('p.text-navy-400')).toContainText('tham khảo')
    await expect(page.locator('p.text-navy-400')).toContainText('tiên đoán')
  })
})
