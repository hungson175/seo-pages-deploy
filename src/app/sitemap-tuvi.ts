import { MetadataRoute } from 'next'
import { FORECAST_SLUGS } from '@/content/routes'

export const dynamic = 'force-static'

export default function sitemapTuvi(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.vn'
  const lastmod = '2026-05-01'

  return FORECAST_SLUGS.map((slug) => ({
    url: `${base}/tuvi/${slug}`,
    lastModified: lastmod,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }))
}
