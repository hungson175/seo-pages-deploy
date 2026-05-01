import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // ISR is handled via generateStaticParams + revalidate in page components
}

export default nextConfig
