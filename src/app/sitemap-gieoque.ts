import { MetadataRoute } from 'next'
import { QUE_SLUGS } from '@/lib/data/allow-lists'

export const dynamic = 'force-static'

export default function sitemapGieoque(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.vn'
  const lastmod = '2026-05-01'

  return QUE_SLUGS.map((slug) => ({
    url: `${base}/que/${slug}`,
    lastModified: lastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
}
