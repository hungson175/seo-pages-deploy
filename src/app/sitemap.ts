import { MetadataRoute } from 'next'
import { PRIORITY_STAR_SLUGS } from '@/content/stars'
import { PALACE_SLUGS } from '@/content/palaces'
import { ANIMAL_HUB_SLUGS } from '@/content/animal-hubs'
import { getApprovedStarPalacePages } from '@/content/star-palace'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://boitoan.com.vn'
  const lastmod = '2026-05-02'
  const starPalaceLastmod = '2026-05-04'

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

  const starPalacePages: MetadataRoute.Sitemap = getApprovedStarPalacePages().map((page) => ({
    url: `${base}${page.urlPath}`,
    lastModified: starPalaceLastmod,
    changeFrequency: 'monthly' as const,
    priority: 0.68,
  }))

  return [...staticPages, ...animalHubPages, ...saoPages, ...palacePages, ...starPalacePages]
}
