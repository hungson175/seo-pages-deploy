import { MetadataRoute } from 'next'
import { SEO_FORECAST_SEEDS, getForecastCanonicalPath } from '@/content/seo-forecasts'
import { ANIMAL_HUB_SLUGS } from '@/content/animal-hubs'

export const dynamic = 'force-static'

export default function sitemapTuvi(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.com.vn'
  const lastmod = '2026-05-05'

  return [
    {
      url: `${base}/tu-vi/`,
      lastModified: lastmod,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    ...ANIMAL_HUB_SLUGS.map((slug) => ({
      url: `${base}/tu-vi/${slug}/`,
      lastModified: lastmod,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    })),
    ...SEO_FORECAST_SEEDS.map((seed) => ({
      url: `${base}${getForecastCanonicalPath(seed)}`,
      lastModified: lastmod,
      changeFrequency: 'yearly' as const,
      priority: 0.82,
    })),
  ]
}
