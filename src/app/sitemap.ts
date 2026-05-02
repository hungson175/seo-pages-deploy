import { MetadataRoute } from 'next'
import { PRIORITY_STAR_SLUGS } from '@/content/stars'
import { PALACE_SLUGS } from '@/content/palaces'
import { SEO_FORECAST_SEEDS, getForecastCanonicalPath } from '@/content/seo-forecasts'
import { ANIMAL_HUB_SLUGS } from '@/content/animal-hubs'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.com.vn'
  const lastmod = '2026-05-02'

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: lastmod, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/tu-vi/`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/lap-la-so/`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.85 },
  ]

  const animalHubPages: MetadataRoute.Sitemap = ANIMAL_HUB_SLUGS.map((slug) => ({
    url: `${base}/tu-vi/${slug}/`,
    lastModified: lastmod,
    changeFrequency: 'weekly' as const,
    priority: 0.86,
  }))

  const forecastPages: MetadataRoute.Sitemap = SEO_FORECAST_SEEDS.map((seed) => ({
    url: `${base}${getForecastCanonicalPath(seed)}`,
    lastModified: lastmod,
    changeFrequency: 'yearly' as const,
    priority: 0.82,
  }))

  const saoPages: MetadataRoute.Sitemap = PRIORITY_STAR_SLUGS.map((star) => ({
    url: `${base}/sao/${star}/`,
    lastModified: lastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const palacePages: MetadataRoute.Sitemap = PALACE_SLUGS.map((palace) => ({
    url: `${base}/cung/${palace}/`,
    lastModified: lastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.74,
  }))

  return [...staticPages, ...animalHubPages, ...forecastPages, ...saoPages, ...palacePages]
}
