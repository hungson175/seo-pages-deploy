/**
 * Build Next.js metadata with SEO optimization templates.
 */

import type { Metadata } from 'next'

export type PageType = 'forecast' | 'star' | 'que' | 'tool' | 'hub' | 'form' | 'error'

interface PageMetaInput {
  title: string
  description: string
  path: string
  ogImage?: string
  pageType?: PageType
}

const BASE_URL = 'https://boitoan.vn'
const SITE_NAME = 'Bói Toán'

function getRobots(pageType?: PageType): Metadata['robots'] {
  switch (pageType) {
    case 'form':
      return { index: false, follow: true }
    case 'error':
      return { index: false, follow: false }
    case 'forecast':
    case 'star':
    case 'que':
    case 'tool':
    case 'hub':
    default:
      return { index: true, follow: true }
  }
}

function buildTitle(title: string): string {
  return `${title} | ${SITE_NAME}`
}

function truncateDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description
  return description.slice(0, maxLength - 3) + '...'
}

function buildFullUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${BASE_URL}${path}`
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  pageType,
}: PageMetaInput): Metadata {
  const fullTitle = buildTitle(title)
  const truncatedDesc = truncateDescription(description)
  const fullUrl = buildFullUrl(path)

  return {
    title: fullTitle,
    description: truncatedDesc,
    robots: getRobots(pageType),
    openGraph: {
      title: fullTitle,
      description: truncatedDesc,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      type: 'website',
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: truncatedDesc,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}
