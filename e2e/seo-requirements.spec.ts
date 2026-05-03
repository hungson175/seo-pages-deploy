import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - SEO Requirements', () => {
  test('all pages have lang="vi"', async ({ page }) => {
    const pages = ['/', '/tu-vi/', '/tu-vi-2026/giap-ty-1984-nam-mang', '/sao/tu-vi', '/que/1-kien-vi-thien']
    
    for (const url of pages) {
      await page.goto(url)
      await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    }
  })

  test('/tu-vi hub has proper meta tags', async ({ page }) => {
    await page.goto('/tu-vi/')
    
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /tử vi 2026/i)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Tử Vi 2026 - Xem Lá Số Tử Vi Online/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://boitoan.com.vn/tu-vi/')
  })

  test('home metadata avoids unsupported product promises', async ({ page }) => {
    await page.goto('/')

    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /tham khảo/)
    await expect(description).not.toHaveAttribute('content', /trọn đời|miễn phí|vận mệnh/i)
  })

  test('home page exposes WebSite and Organization JSON-LD', async ({ page }) => {
    await page.goto('/')

    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
    const jsonLd = scripts.map((script) => JSON.parse(script))

    expect(jsonLd.some((schema) => schema['@type'] === 'WebSite' && schema['@id'] === 'https://boitoan.com.vn/#website')).toBe(true)
    expect(jsonLd.some((schema) => schema['@type'] === 'Organization' && schema['@id'] === 'https://boitoan.com.vn/#organization')).toBe(true)
  })

  test('forecast pages have proper meta tags', async ({ page }) => {
    await page.goto('/tu-vi-2026/giap-ty-1984-nam-mang')
    
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /công việc/i)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://boitoan.com.vn/tu-vi-2026/giap-ty-1984-nam-mang/')
  })

  test('que metadata uses cultural-reference framing', async ({ page }) => {
    await page.goto('/que/1-kien-vi-thien')

    await expect(page).toHaveTitle(/Bói Toán$/)
    await expect(page).not.toHaveTitle(/\| Bói Toán \| Bói Toán/)
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /Tìm hiểu tinh thần/)
    await expect(description).toHaveAttribute('content', /tham khảo/)
    await expect(description).not.toHaveAttribute('content', /Luận giải/i)
  })

  test('pages have single H1', async ({ page }) => {
    for (const url of ['/', '/tu-vi/', '/tu-vi-2026/giap-ty-1984-nam-mang', '/lap-la-so/']) {
      await page.goto(url)
      await expect(page.locator('h1')).toHaveCount(1)
    }
  })

  test('Article 320 compliance text present', async ({ page }) => {
    for (const url of ['/tu-vi/', '/tu-vi-2026/giap-ty-1984-nam-mang', '/lap-la-so/']) {
      await page.goto(url)
      await expect(page.locator('main')).toContainText('tham khảo')
      await expect(page.locator('main')).toContainText('tiên đoán')
    }
  })
})
