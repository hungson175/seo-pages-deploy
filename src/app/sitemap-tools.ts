import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemapTools(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.com.vn'
  const lastmod = '2026-05-01'

  return [
    {
      url: `${base}/lap-la-so`,
      lastModified: lastmod,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]
}
