import type { NextConfig } from 'next'

const LEGACY_STAR_REDIRECT_SLUGS = [
  'thien-dong',
  'liem-trinh',
  'thien-phu',
  'tham-lang',
  'cu-mon',
  'pha-quan',
  'ta-phu',
  'huu-bat',
  'thien-khoi',
  'thien-viet',
  'van-xuong',
  'van-khuc',
  'thien-ma',
  'thien-hinh',
]

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT_STANDALONE === 'true' ? 'standalone' : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  // ISR is handled via generateStaticParams + revalidate in page components
  async redirects() {
    return LEGACY_STAR_REDIRECT_SLUGS.map((slug) => ({
      source: `/sao/${slug}`,
      destination: '/tu-vi/',
      statusCode: 301,
    }))
  },
}

export default nextConfig
