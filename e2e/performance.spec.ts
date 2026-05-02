import { test, expect } from '@playwright/test'

test.describe('Sprint 2 - Performance', () => {
  test('home page loads under 3 seconds', async ({ page }) => {
    const start = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - start
    
    console.log(`Home page load time: ${loadTime}ms`)
    expect(loadTime).toBeLessThan(3000)
  })

  test('hub page loads under 3 seconds', async ({ page }) => {
    const start = Date.now()
    await page.goto('/tu-vi/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - start
    
    console.log(`Hub page load time: ${loadTime}ms`)
    expect(loadTime).toBeLessThan(3000)
  })

  test('forecast page loads under 3 seconds', async ({ page }) => {
    const start = Date.now()
    await page.goto('/tu-vi-2026/giap-ty-1984-nam-mang')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - start
    
    console.log(`Forecast page load time: ${loadTime}ms`)
    expect(loadTime).toBeLessThan(3000)
  })

  test('no console errors on forecast page', async ({ page }) => {
    const errors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.goto('/tu-vi-2026/giap-ty-1984-nam-mang')
    await page.waitForLoadState('networkidle')
    expect(errors).toHaveLength(0)
  })

  test('no console errors on home page', async ({ page }) => {
    const errors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(errors).toHaveLength(0)
  })
})
