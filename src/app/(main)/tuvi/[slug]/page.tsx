import { notFound, permanentRedirect } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { getSeoForecastPage, SEO_FORECAST_SLUGS } from '@/content/seo-forecasts'

export function generateStaticParams() {
  return SEO_FORECAST_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getSeoForecastPage(slug)
  return buildMetadata({
    title: 'Trang đã chuyển sang /tu-vi-2026/',
    description: 'Trang tử vi đã được chuyển sang URL Can Chi chuẩn SEO.',
    path: page?.urlPath ?? `/tuvi/${slug}/`,
    pageType: 'error',
  })
}

export default async function LegacyTuviRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getSeoForecastPage(slug)
  if (!page) notFound()
  permanentRedirect(page.urlPath)
}
