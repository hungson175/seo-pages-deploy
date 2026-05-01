import { MetadataRoute } from 'next'
import { STARS } from '@/lib/data/allow-lists'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.vn'
  const lastmod = '2026-05-01'

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: lastmod, changeFrequency: 'daily', priority: 1 },
  ]

  const saoPages: MetadataRoute.Sitemap = STARS.map((star) => ({
    url: `${base}/sao/${star}`,
    lastModified: lastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...saoPages]
}
