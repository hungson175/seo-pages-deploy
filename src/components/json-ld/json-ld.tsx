import React from 'react'

export interface JsonLdData {
  '@context': string
  '@type': string
  [key: string]: unknown
}

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/* ─── WebSite ─── */
export function WebSiteSchema({ name, url }: { name: string; url: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        inLanguage: 'vi',
      }}
    />
  )
}

/* ─── Article ─── */
export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  image,
}: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  authorName: string
  image?: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        url,
        datePublished,
        dateModified,
        author: {
          '@type': 'Organization',
          name: authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: authorName,
        },
        inLanguage: 'vi',
        ...(image ? { image } : {}),
      }}
    />
  )
}

/* ─── FAQPage ─── */
export function FAQPageSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: 'vi',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

/* ─── HowTo ─── */
export function HowToSchema({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; url?: string }>
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        inLanguage: 'vi',
        step: steps.map((step) => ({
          '@type': 'HowToStep',
          name: step.name,
          text: step.text,
          ...(step.url ? { url: step.url } : {}),
        })),
      }}
    />
  )
}

/* ─── Service ─── */
export function ServiceSchema({
  name,
  description,
  url,
  provider,
}: {
  name: string
  description: string
  url: string
  provider: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url,
        provider: {
          '@type': 'Organization',
          name: provider,
        },
        inLanguage: 'vi',
        areaServed: {
          '@type': 'Country',
          name: 'Vietnam',
        },
      }}
    />
  )
}

/* ─── BreadcrumbList ─── */
export function BreadcrumbListSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        inLanguage: 'vi',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': item.url,
            name: item.name,
          },
        })),
      }}
    />
  )
}
