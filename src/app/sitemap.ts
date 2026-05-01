import { MetadataRoute } from 'next'
import {
  FORECAST_SLUGS,
  STARS,
  QUE_SLUGS,
} from '@/lib/data/allow-lists'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.vn'
  const lastmod = '2026-05-01'

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: lastmod, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/lap-la-so`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const tuviPages: MetadataRoute.Sitemap = FORECAST_SLUGS.map((slug) => ({
    url: `${base}/tuvi/${slug}`,
    lastModified: lastmod,
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  const saoPages: MetadataRoute.Sitemap = STARS.map((star) => ({
    url: `${base}/sao/${star}`,
    lastModified: lastmod,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const quePages: MetadataRoute.Sitemap = QUE_SLUGS.map((slug) => ({
    url: `${base}/que/${slug}`,
    lastModified: lastmod,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...tuviPages, ...saoPages, ...quePages]
}
