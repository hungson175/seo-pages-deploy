import { MetadataRoute } from 'next'
import { PALACE_SLUGS } from '@/content/palaces'

export const dynamic = 'force-static'

export default function sitemapPalaces(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.com.vn'
  const lastmod = '2026-05-02'

  return PALACE_SLUGS.map((slug) => ({
    url: `${base}/cung/${slug}/`,
    lastModified: lastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.74,
  }))
}
