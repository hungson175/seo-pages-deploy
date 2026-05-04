import { MetadataRoute } from 'next'
import { getApprovedStarPalacePages } from '@/content/star-palace'

export const dynamic = 'force-static'

export default function sitemapStarPalace(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.com.vn'
  const lastmod = '2026-05-04'

  return getApprovedStarPalacePages().map((page) => ({
    url: `${base}${page.urlPath}`,
    lastModified: lastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.68,
  }))
}
