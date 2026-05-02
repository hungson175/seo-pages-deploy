import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - Mobile Responsiveness', () => {
  test('home page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Layout should not overflow horizontally
    const body = page.locator('body')
    const bodyWidth = await body.evaluate(el => el.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1) // Allow 1px rounding
    
    // CTAs should be visible and clickable
    await expect(page.locator('a[href="/lap-la-so/"]')).toBeVisible()
    await expect(page.locator('a[href="/tuvi/"]')).toBeVisible()
  })

  test('forecast page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/tuvi/tuoi-ty-1984-nam')
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    
    // Content should not overflow
    const body = page.locator('body')
    const bodyWidth = await body.evaluate(el => el.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1)
  })
})
