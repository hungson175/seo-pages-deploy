import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - Core Pages', () => {
  test('home page renders with key elements', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/Bói Toán/)
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Bói Toán')
    
    await expect(page.locator('a[href="/lap-la-so/"]')).toBeVisible()
    await expect(page.locator('a[href="/tu-vi/"]')).toBeVisible()
    await expect(page.locator('text=Xem tử vi trọn đời')).toBeVisible()
  })

  test('/tu-vi hub renders static SEO content', async ({ page }) => {
    await page.goto('/tu-vi/')

    await expect(page).toHaveTitle(/Tử Vi 2026 - Xem Lá Số Tử Vi Online/)
    await expect(page.locator('h1')).toHaveText('Tử Vi 2026 - Xem Lá Số Tử Vi Online')
    await expect(page.locator('a[href^="/tu-vi/tuoi-ty-1984-nam"]')).toBeVisible()
    await expect(page.locator('text=Câu hỏi thường gặp')).toBeVisible()
    await expect(page.locator('main')).toContainText('chỉ mang tính chất tham khảo')
  })

  test('new static forecast page renders with real content', async ({ page }) => {
    await page.goto('/tu-vi/tuoi-ty-1984-nam')
    
    await expect(page).toHaveTitle(/Tử vi tuổi Tý 1984 nam mạng năm 2026/)
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Xem tử vi tuổi Tý 1984 nam mạng năm 2026')
    
    await expect(page.locator('text=Công danh và sự nghiệp')).toBeVisible()
    await expect(page.locator('text=Tài lộc và tiền bạc')).toBeVisible()
    await expect(page.locator('text=Tình duyên và gia đạo')).toBeVisible()
    await expect(page.locator('text=Sức khỏe và tinh thần')).toBeVisible()
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.locator('text=Nội dung đang được cập nhật')).toHaveCount(0)
  })

  test('second static forecast page renders with real content', async ({ page }) => {
    await page.goto('/tu-vi/tuoi-dan-1986-nu')
    
    await expect(page).toHaveTitle(/Tử vi tuổi Dần 1986 nữ mạng năm 2026/)
    await expect(page.locator('h1')).toContainText('tuổi Dần 1986 nữ mạng')
    await expect(page.locator('main')).toContainText('Lư Trung Hỏa')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
  })

  test('star page renders', async ({ page }) => {
    await page.goto('/sao/tu-vi')
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Sao')
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

  test('lap-la-so page renders as static landing content', async ({ page }) => {
    await page.goto('/lap-la-so/')
    
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Lập Lá Số Tử Vi Online')
    await expect(page.locator('text=Trang này giải thích cách lập lá số tử vi')).toBeVisible()
    await expect(page.locator('form')).toHaveCount(0)
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
  })
})
