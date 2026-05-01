/**
 * Supabase database schema types for SEO Pages.
 * Mirrors the minimal schema defined in STORY-001 spec.
 */

export type PageType = 'forecast' | 'star' | 'que' | 'tool' | 'hub'

export interface Page {
  id: string // uuid
  slug: string
  page_type: PageType
  title: string
  meta_description: string
  content_json: Record<string, unknown>
  schema_config: Record<string, unknown>
  created_at: string // timestamptz
  updated_at: string // timestamptz
}

export interface PageMetadataCache {
  slug: string // PK
  metadata: Record<string, unknown>
  last_generated_at: string // timestamptz
}
