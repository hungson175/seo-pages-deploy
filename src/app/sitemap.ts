import { MetadataRoute } from 'next'
import { STARS } from '@/content/routes'
import { SEO_FORECAST_SLUGS } from '@/content/seo-forecasts'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.vn'
  const lastmod = '2026-05-02'

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: lastmod, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/tu-vi/`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/lap-la-so/`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.85 },
  ]

  const forecastPages: MetadataRoute.Sitemap = SEO_FORECAST_SLUGS.map((slug) => ({
    url: `${base}/tu-vi/${slug}/`,
    lastModified: lastmod,
    changeFrequency: 'yearly' as const,
    priority: 0.82,
  }))

  const saoPages: MetadataRoute.Sitemap = STARS.map((star) => ({
    url: `${base}/sao/${star}/`,
    lastModified: lastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...forecastPages, ...saoPages]
}
