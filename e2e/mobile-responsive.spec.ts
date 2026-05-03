import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - Mobile Responsiveness', () => {
  test('home page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    const body = page.locator('body')
    const bodyWidth = await body.evaluate(el => el.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1)
    await expect(page.getByTestId('home-chart-form')).toBeVisible()
    await expect(page.locator('a[href="/lap-la-so/"]')).toBeVisible()
    await expect(page.locator('a[href="/tu-vi/"]')).toBeVisible()
  })

  test('hub page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/tu-vi/')

    await expect(page.locator('h1')).toBeVisible()
    const bodyWidth = await page.locator('body').evaluate(el => el.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1)
  })

  test('forecast page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/tu-vi-2026/giap-ty-1984-nam-mang')
    
    await expect(page.locator('h1')).toBeVisible()
    const bodyWidth = await page.locator('body').evaluate(el => el.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1)
  })
})
