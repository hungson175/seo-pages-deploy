import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - Core Pages', () => {
  test('home page renders instant chart form before SEO links', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/Lập lá số Tử Vi ngay lập tức/)
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Lập lá số ngay lập tức')

    const form = page.getByTestId('home-chart-form')
    const seoContent = page.getByTestId('home-seo-content')
    await expect(form).toBeVisible()
    await expect(page.getByLabel('Ngày sinh dương lịch')).toBeVisible()
    await expect(page.getByLabel('Giờ sinh')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Lập lá số ngay' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Lập lá số ngay' })).toBeEnabled()
    await expect(seoContent).toBeVisible()

    const formBox = await form.boundingBox()
    const seoBox = await seoContent.boundingBox()
    expect(formBox?.y ?? 0).toBeLessThan(seoBox?.y ?? 0)
    
    await expect(page.locator('a[href="/lap-la-so/"]').first()).toBeVisible()
    await expect(page.locator('a[href="/tu-vi/"]')).toBeVisible()
    await expect(page.locator('text=Đọc Tử Vi 2026')).toBeVisible()
    await expect(page.locator('main')).toContainText('tham khảo')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.locator('main')).not.toContainText('trọn đời')
    await expect(page.locator('main')).not.toContainText('miễn phí')
  })

  test('/tu-vi hub renders static SEO content', async ({ page }) => {
    await page.goto('/tu-vi/')

    await expect(page).toHaveTitle(/Tử Vi 2026 - Xem Lá Số Tử Vi Online/)
    await expect(page.locator('h1')).toHaveText('Tử Vi 2026 - Xem Lá Số Tử Vi Online')
    await expect(page.locator('a[href^="/tu-vi-2026/giap-ty-1984-nam-mang"]')).toBeVisible()
    await expect(page.locator('text=Câu hỏi thường gặp')).toBeVisible()
    await expect(page.locator('main')).toContainText('chỉ mang tính chất tham khảo')
  })

  test('new static forecast page renders with real content', async ({ page }) => {
    await page.goto('/tu-vi-2026/giap-ty-1984-nam-mang')
    
    await expect(page).toHaveTitle(/Tử vi tuổi Giáp Tý 1984 nam mạng năm 2026/)
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Tử vi tuổi Giáp Tý 1984 nam mạng năm 2026')
    
    await expect(page.locator('text=Công danh và sự nghiệp tuổi Giáp Tý')).toBeVisible()
    await expect(page.locator('text=Tài lộc và kế hoạch tiền bạc')).toBeVisible()
    await expect(page.locator('text=Tình duyên, gia đạo')).toBeVisible()
    await expect(page.locator('text=Sức khỏe, tinh thần')).toBeVisible()
    await expect(page.locator('main')).toContainText('Tam Hợp Phái')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.locator('text=Nội dung đang được cập nhật')).toHaveCount(0)
  })

  test('second static forecast page renders with real content', async ({ page }) => {
    await page.goto('/tu-vi-2026/binh-dan-1986-nu-mang')
    
    await expect(page).toHaveTitle(/Tử vi tuổi Bính Dần 1986 nữ mạng năm 2026/)
    await expect(page.locator('h1')).toContainText('tuổi Bính Dần 1986 nữ mạng')
    await expect(page.locator('main')).toContainText('Lư Trung Hỏa')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
  })


  test('animal hub page renders with links to canonical birth-year pages', async ({ page }) => {
    await page.goto('/tu-vi/tuoi-ty/')

    await expect(page).toHaveTitle(/Tử vi tuổi Tý năm 2026/)
    await expect(page.locator('h1')).toContainText('Tử vi tuổi Tý năm 2026')
    await expect(page.locator('a[href^="/tu-vi-2026/giap-ty-1984-nam-mang"]')).toBeVisible()
    await expect(page.locator('a[href^="/tu-vi-2026/giap-ty-1984-nu-mang"]')).toBeVisible()
    await expect(page.locator('main')).toContainText('Tam Hợp Phái')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
  })

  test('legacy birth-year URL redirects to canonical Can Chi URL', async ({ page }) => {
    await page.goto('/tu-vi/tuoi-ty-1984-nam')
    await expect(page).toHaveURL(/\/tu-vi-2026\/giap-ty-1984-nam-mang\/?$/)
  })

  test('star page renders', async ({ page }) => {
    await page.goto('/sao/tu-vi')
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Sao')
    await expect(h1).toContainText('Tử Vi')
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('main')).toContainText('Tam Hợp Phái')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.getByRole('link', { name: 'Tìm hiểu cách lập lá số Tử Vi', exact: true })).toBeVisible()
  })

  test('Batch 2B foundation Liêm Trinh page renders and sensitive non-Mệnh combo stays gated', async ({ page }) => {
    const response = await page.goto('/sao/liem-trinh/')

    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveText('Sao Liêm Trinh Trong Tử Vi — Ý Nghĩa, Cung Vị Và Cách Đọc')
    await expect(page.locator('main')).toContainText('Tam Hợp Phái')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.locator('main')).not.toContainText('Tử Tức')
    await expect(page.getByRole('link', { name: 'Tìm hiểu cách lập lá số Tử Vi', exact: true })).toBeVisible()

    const approvedCombo = await page.goto('/sao/liem-trinh/cung/menh/')
    expect(approvedCombo?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveText('Sao Liêm Trinh Ở Cung Mệnh — Ý Nghĩa, Cách Đọc Và Lưu Ý')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.locator('main')).toContainText('tam phương')
    await expect(page.locator('main')).not.toContainText('Tử Tức')

    const gatedCombo = await page.goto('/sao/liem-trinh/cung/phu-the/')
    expect(gatedCombo?.status()).toBe(404)
  })


  test('palace foundation page renders', async ({ page }) => {
    await page.goto('/cung/menh')

    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toHaveText('Cung Mệnh Trong Tử Vi — Ý Nghĩa, Sao Chiếu Và Cách Đọc')
    await expect(page.locator('main')).toContainText('Tam Hợp Phái')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.locator('main')).toContainText('Tử Nữ')
    await expect(page.locator('main')).not.toContainText('Tử Tức')
    await expect(page.locator('a[href="/sao/tu-vi/"]').first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Tìm hiểu cách lập lá số Tử Vi', exact: true })).toBeVisible()
  })

  test('legacy non-priority star page redirects to preserve equity', async ({ page }) => {
    await page.goto('/sao/tham-lang/')
    await expect(page).toHaveURL(/\/tu-vi\/?$/)
    await expect(page.locator('h1')).toHaveText('Tử Vi 2026 - Xem Lá Số Tử Vi Online')
  })

  test('approved star×cung pages render and unapproved combos stay gated', async ({ page }) => {
    const approvedResponse = await page.goto('/sao/tu-vi/cung/menh/')

    expect(approvedResponse?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveText('Sao Tử Vi Ở Cung Mệnh — Ý Nghĩa, Cách Đọc Và Lưu Ý')
    await expect(page.locator('main')).toContainText('Tam Hợp Phái')
    await expect(page.locator('main')).toContainText('紫微斗数全书')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.locator('main')).not.toContainText('Tử Tức')

    const batch2Response = await page.goto('/sao/tu-vi/cung/quan-loc/')

    expect(batch2Response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveText('Sao Tử Vi Ở Cung Quan Lộc — Ý Nghĩa, Cách Đọc Và Lưu Ý')
    await expect(page.locator('main')).toContainText('tam phương')
    await expect(page.locator('a[href="/sao/tu-vi/"]').first()).toBeVisible()
    await expect(page.locator('a[href="/cung/quan-loc/"]').first()).toBeVisible()
    await expect(page.locator('a[href="/lap-la-so/"]').first()).toBeVisible()

    const batch2b1Response = await page.goto('/sao/thien-phu/cung/menh/')

    expect(batch2b1Response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveText('Sao Thiên Phủ Ở Cung Mệnh — Ý Nghĩa, Cách Đọc Và Lưu Ý')
    await expect(page.locator('main')).toContainText('tam phương')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
    await expect(page.locator('main')).not.toContainText('Tử Tức')
    await expect(page.locator('a[href="/sao/thien-phu/"]').first()).toBeVisible()
    await expect(page.locator('a[href="/cung/menh/"]').first()).toBeVisible()
    await expect(page.locator('a[href="/lap-la-so/"]').first()).toBeVisible()
    await expect(page.locator('a[href="/sao/tu-vi/cung/menh/"]').first()).toBeVisible()

    const unapprovedResponse = await page.goto('/sao/vu-khuc/cung/tai-bach/')

    expect(unapprovedResponse?.status()).toBe(404)
    await expect(page.locator('body')).not.toContainText('Sao Vũ Khúc Ở Cung Tài Bạch')
  })

  test('que page renders', async ({ page }) => {
    await page.goto('/que/1-kien-vi-thien')
    
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Quẻ')
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('main')).toContainText('tham khảo')
    await expect(page.locator('main')).not.toContainText('lời đoán')
    await expect(page.locator('main')).not.toContainText('đầu tư mạo hiểm')
  })

  test('lap-la-so page renders approved real Tu Vi landing content', async ({ page }) => {
    await page.goto('/lap-la-so/')
    
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Lập lá số Tử Vi')
    await expect(page.locator('h1')).toContainText('theo ngày giờ sinh')
    await expect(page.locator('main')).toContainText('Tử Vi Đẩu Số')
    await expect(page.locator('main')).toContainText('Thông tin cơ bản')
    await expect(page.locator('main')).toContainText('Bạn sẽ nhận được gì?')
    await expect(page.locator('main')).toContainText('không phải lời tiên đoán')
  })
})
