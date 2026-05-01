import { describe, it, expect } from 'vitest'
import { seedPages } from '../src/lib/pipeline/seed'
import type { Page } from '../src/types/database'

describe('seedPages', () => {
  const mockPages: Page[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      slug: 'tuoi-ty-1996-nam',
      page_type: 'forecast',
      title: 'Tử Vi Tuổi Tý 1996 Nam',
      meta_description: 'Xem tử vi tuổi Tý 1996 nam mạng',
      content_json: {
        sections: [{ heading: 'Tổng quan', content: '...' }],
        faqs: [{ question: 'Q1', answer: 'A1' }],
      },
      schema_config: { primary: 'Article', supporting: ['FAQPage'] },
      created_at: '2026-05-01T00:00:00Z',
      updated_at: '2026-05-01T00:00:00Z',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      slug: 'tuoi-ty-1996-nu',
      page_type: 'forecast',
      title: 'Tử Vi Tuổi Tý 1996 Nữ',
      meta_description: 'Xem tử vi tuổi Tý 1996 nữ mạng',
      content_json: {
        sections: [{ heading: 'Tổng quan', content: '...' }],
        faqs: [{ question: 'Q1', answer: 'A1' }],
      },
      schema_config: { primary: 'Article', supporting: ['FAQPage'] },
      created_at: '2026-05-01T00:00:00Z',
      updated_at: '2026-05-01T00:00:00Z',
    },
  ]

  it('seeds pages into Supabase', async () => {
    const result = await seedPages(mockPages)
    expect(result.success).toBe(true)
    expect(result.inserted).toBe(2)
  })

  it('uses UPSERT to avoid duplicates', async () => {
    // Seed same pages twice
    await seedPages(mockPages)
    const result = await seedPages(mockPages)
    expect(result.success).toBe(true)
    expect(result.duplicatesHandled).toBe(true)
  })

  it('validates page_type is forecast', async () => {
    const invalidPage = { ...mockPages[0], page_type: 'hub' as const }
    const result = await seedPages([invalidPage])
    expect(result.success).toBe(false)
    expect(result.errors).toContain('Invalid page_type for forecast pipeline')
  })

  it('validates content_json has sections', async () => {
    const invalidPage = { ...mockPages[0], content_json: {} }
    const result = await seedPages([invalidPage])
    expect(result.success).toBe(false)
    expect(result.errors).toContain('Missing sections in content_json')
  })

  it('validates slug format', async () => {
    const invalidPage = { ...mockPages[0], slug: 'invalid-slug' }
    const result = await seedPages([invalidPage])
    expect(result.success).toBe(false)
    expect(result.errors).toContain('Invalid slug format')
  })
})
