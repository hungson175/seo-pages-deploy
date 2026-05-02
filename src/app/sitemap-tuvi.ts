import { MetadataRoute } from 'next'
import { SEO_FORECAST_SLUGS } from '@/content/seo-forecasts'

export const dynamic = 'force-static'

export default function sitemapTuvi(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.vn'
  const lastmod = '2026-05-02'

  return [
    {
      url: `${base}/tu-vi/`,
      lastModified: lastmod,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    ...SEO_FORECAST_SLUGS.map((slug) => ({
      url: `${base}/tu-vi/${slug}/`,
      lastModified: lastmod,
      changeFrequency: 'yearly' as const,
      priority: 0.82,
    })),
  ]
}
