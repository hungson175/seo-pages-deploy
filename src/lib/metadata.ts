import type { Metadata } from 'next'

interface PageMetaInput {
  title: string
  description: string
  path: string
  ogImage?: string
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    alternates: {
      canonical: path,
    },
  }
}
