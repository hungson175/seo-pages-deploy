import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import {
  KINH_DICH_PILOT_PAGES,
  getKinhDichPilotPageBySegments,
} from '@/content/kinh-dich-gieo-que-pilot'
import { KinhDichPilotPageView } from '@/components/kinh-dich/kinh-dich-pilot-page'

export const dynamicParams = false

export function generateStaticParams() {
  return KINH_DICH_PILOT_PAGES.map((page) => ({
    slug: page.slugSegments,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const page = getKinhDichPilotPageBySegments(slug)

  if (!page) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/kinh-dich/${slug.join('/')}/`,
      pageType: 'error',
    })
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    pageType: 'hub',
    truncate: false,
  })
}

export default async function KinhDichPilotRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const page = getKinhDichPilotPageBySegments(slug)

  if (!page) {
    notFound()
  }

  return <KinhDichPilotPageView page={page} />
}
