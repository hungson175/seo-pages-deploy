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
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // ISR is handled via generateStaticParams + revalidate in page components
  async rewrites() {
    const realTuViAppOrigin = 'https://horoscope-theta-ten.vercel.app'
    return {
      beforeFiles: [
        {
          source: '/lap-la-so/:path*',
          destination: `${realTuViAppOrigin}/lap-la-so/:path*`,
        },
        {
          source: '/quyen-rieng-tu/:path*',
          destination: `${realTuViAppOrigin}/quyen-rieng-tu/:path*`,
        },
        {
          source: '/reading/:path*',
          destination: `${realTuViAppOrigin}/reading/:path*`,
        },
        {
          source: '/api/:path*',
          destination: `${realTuViAppOrigin}/api/:path*`,
        },
      ],
      fallback: [
        {
          source: '/_next/static/:path*',
          destination: `${realTuViAppOrigin}/_next/static/:path*`,
        },
        {
          source: '/assets/:path*',
          destination: `${realTuViAppOrigin}/assets/:path*`,
        },
        {
          source: '/icon.png',
          destination: `${realTuViAppOrigin}/icon.png`,
        },
        {
          source: '/apple-icon.png',
          destination: `${realTuViAppOrigin}/apple-icon.png`,
        },
      ],
    }
  },
  async redirects() {
    return LEGACY_STAR_REDIRECT_SLUGS.map((slug) => ({
      source: `/sao/${slug}`,
      destination: '/tu-vi/',
      statusCode: 301,
    }))
  },
}

export default nextConfig
