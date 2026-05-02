import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - SEO Requirements', () => {
  test('all pages have lang="vi"', async ({ page }) => {
    const pages = ['/', '/tu-vi/', '/tu-vi/tuoi-ty-1984-nam', '/sao/tu-vi', '/que/1-kien-vi-thien']
    
    for (const url of pages) {
      await page.goto(url)
      await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    }
  })

  test('/tu-vi hub has proper meta tags', async ({ page }) => {
    await page.goto('/tu-vi/')
    
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /tử vi 2026/i)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Tử Vi 2026 - Xem Lá Số Tử Vi Online/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://boitoan.vn/tu-vi/')
  })

  test('forecast pages have proper meta tags', async ({ page }) => {
    await page.goto('/tu-vi/tuoi-ty-1984-nam')
    
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /công việc/i)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://boitoan.vn/tu-vi/tuoi-ty-1984-nam/')
  })

  test('pages have single H1', async ({ page }) => {
    for (const url of ['/tu-vi/', '/tu-vi/tuoi-ty-1984-nam', '/lap-la-so/']) {
      await page.goto(url)
      await expect(page.locator('h1')).toHaveCount(1)
    }
  })

  test('Article 320 compliance text present', async ({ page }) => {
    for (const url of ['/tu-vi/', '/tu-vi/tuoi-ty-1984-nam', '/lap-la-so/']) {
      await page.goto(url)
      await expect(page.locator('main')).toContainText('tham khảo')
      await expect(page.locator('main')).toContainText('tiên đoán')
    }
  })
})
