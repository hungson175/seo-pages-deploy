import { notFound, permanentRedirect } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { SEO_FORECAST_SLUGS } from '@/content/seo-forecasts'

export function generateStaticParams() {
  return SEO_FORECAST_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return buildMetadata({
    title: 'Trang đã chuyển sang /tu-vi/',
    description: 'Trang tử vi đã được chuyển sang đường dẫn mới /tu-vi/ để chuẩn hóa SEO.',
    path: `/tuvi/${slug}/`,
    pageType: 'error',
  })
}

export default async function LegacyTuviRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!SEO_FORECAST_SLUGS.includes(slug)) notFound()
  permanentRedirect(`/tu-vi/${slug}/`)
}
