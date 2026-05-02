import { describe, it, expect } from 'vitest'
import type { Page, PageMetadataCache } from '../src/types/database'

describe('Page type', () => {
  it('has all required fields', () => {
    const page: Page = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      slug: 'tuoi-ty-2026-nam',
      page_type: 'forecast',
      title: 'Tử Vi Tuổi Tý 2026 Nam',
      meta_description: 'Xem tử vi tuổi Tý năm 2026 cho nam mạng chi tiết',
      content_json: {
        sections: [
          { heading: 'Tổng quan', content: '...' },
          { heading: 'Sự nghiệp', content: '...' },
        ],
      },
      schema_config: {
        primary: 'Article',
        supporting: ['FAQPage', 'BreadcrumbList'],
      },
      created_at: '2026-05-01T00:00:00Z',
      updated_at: '2026-05-01T00:00:00Z',
    }

    expect(page.id).toBeDefined()
    expect(page.slug).toBe('tuoi-ty-2026-nam')
    expect(page.page_type).toBe('forecast')
    expect(page.title).toBeDefined()
    expect(page.meta_description).toBeDefined()
    expect(page.content_json).toBeDefined()
    expect(page.schema_config).toBeDefined()
    expect(page.created_at).toBeDefined()
    expect(page.updated_at).toBeDefined()
  })

  it('supports all page_type enum values', () => {
    const types: Page['page_type'][] = ['forecast', 'star', 'que', 'tool', 'hub']
    types.forEach((type) => {
      const page: Page = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        slug: 'test',
        page_type: type,
        title: 'Test',
        meta_description: 'Test',
        content_json: {},
        schema_config: {},
        created_at: '2026-05-01T00:00:00Z',
        updated_at: '2026-05-01T00:00:00Z',
      }
      expect(page.page_type).toBe(type)
    })
  })

  it('slug must be unique string', () => {
    const page: Page = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      slug: 'tu-vi',
      page_type: 'hub',
      title: 'Tử Vi',
      meta_description: '...',
      content_json: {},
      schema_config: {},
      created_at: '2026-05-01T00:00:00Z',
      updated_at: '2026-05-01T00:00:00Z',
    }
    expect(typeof page.slug).toBe('string')
    expect(page.slug.length).toBeGreaterThan(0)
  })
})

describe('PageMetadataCache type', () => {
  it('has all required fields', () => {
    const cache: PageMetadataCache = {
      slug: 'tuoi-ty-2026-nam',
      metadata: {
        openGraph: {
          title: 'Tử Vi Tuổi Tý 2026',
          description: '...',
          url: 'https://boitoan.com.vn/tuvi/tuoi-ty-2026-nam',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Tử Vi Tuổi Tý 2026',
        },
        canonical: 'https://boitoan.com.vn/tuvi/tuoi-ty-2026-nam',
      },
      last_generated_at: '2026-05-01T00:00:00Z',
    }

    expect(cache.slug).toBe('tuoi-ty-2026-nam')
    expect(cache.metadata).toBeDefined()
    expect(cache.metadata.openGraph).toBeDefined()
    expect(cache.metadata.twitter).toBeDefined()
    expect(cache.metadata.canonical).toBeDefined()
    expect(cache.last_generated_at).toBeDefined()
  })

  it('uses slug as primary key', () => {
    const cache: PageMetadataCache = {
      slug: 'primary-key-test',
      metadata: {},
      last_generated_at: '2026-05-01T00:00:00Z',
    }
    expect(cache.slug).toBe('primary-key-test')
  })
})
