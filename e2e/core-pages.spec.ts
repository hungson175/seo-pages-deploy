import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - Core Pages', () => {
  test('home page renders with key elements', async ({ page }) => {
    await page.goto('/')
    
    // Page title
    await expect(page).toHaveTitle(/Bói Toán/)
    
    // H1 heading
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Bói Toán')
    
    // Key CTAs
    await expect(page.locator('a[href="/lap-la-so/"]')).toBeVisible()
    await expect(page.locator('a[href="/tuvi/"]')).toBeVisible()
    
    // Body text
    await expect(page.locator('text=Xem tử vi trọn đời')).toBeVisible()
  })

  test('forecast page - tuoi-ty-1984-nam renders with content', async ({ page }) => {
    await page.goto('/tuvi/tuoi-ty-1984-nam')
    
    // Page title
    await expect(page).toHaveTitle(/Tử Vi Tuoi Ty 1984 Nam/)
    
    // H1
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Tử Vi')
    
    // Content sections
    await expect(page.locator('text=Tổng Quan Năm 2026')).toBeVisible()
    await expect(page.locator('text=Công Danh \& Tài Lộc')).toBeVisible()
    await expect(page.locator('text=Tình Duyên \& Gia Đạo')).toBeVisible()
    
    // Article 320 compliance
    await expect(page.locator('p.text-navy-400')).toContainText('tham khảo')
    
    // JSON-LD not directly visible but page structure is correct
    await expect(page.locator('main')).toBeVisible()
  })

  test('forecast page - tuoi-dan-1996-nu renders with content', async ({ page }) => {
    await page.goto('/tuvi/tuoi-dan-1996-nu')
    
    await expect(page).toHaveTitle(/Tử Vi Tuoi Dan 1996 Nu/)
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Tử Vi')
    
    await expect(page.locator('text=Tổng Quan Năm 2026')).toBeVisible()
    await expect(page.locator('p.text-navy-400')).toContainText('tham khảo')
  })

  test('star page renders', async ({ page }) => {
    await page.goto('/sao/tu-vi')
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Sao')
    
    // Should have star-related content
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('text=tham khảo')).toBeVisible()
  })

  test('que page renders', async ({ page }) => {
    await page.goto('/que/1-kien-vi-thien')
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Quẻ')
    
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('text=tham khảo')).toBeVisible()
  })

  test('lap-la-so page renders', async ({ page }) => {
    await page.goto('/lap-la-so/')
    
    await expect(page.locator('main, [data-testid]')).toBeVisible()
    
    // Page should load without errors
    await expect(page.locator('text=error', { hasText: /error/i })).not.toBeVisible()
  })
})
