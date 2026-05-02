import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      'https://boitoan.com.vn/sitemap.xml',
      'https://boitoan.com.vn/sitemap-index.xml',
      'https://boitoan.com.vn/stars.xml',
      'https://boitoan.com.vn/palaces.xml',
      'https://boitoan.com.vn/star-palace.xml',
    ],
  }
}
