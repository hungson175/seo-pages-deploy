import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { STARS } from '@/lib/data/allow-lists'
import {
  ArticleSchema,
  BreadcrumbListSchema,
} from '@/components/json-ld/json-ld'

export function generateStaticParams() {
  return STARS.map((star) => ({ star }))
}

export async function generateMetadata({ params }: { params: Promise<{ star: string }> }) {
  const { star } = await params
  if (!STARS.includes(star as (typeof STARS)[number])) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/sao/${star}`,
    })
  }
  return buildMetadata({
    title: `Sao ${star.replace(/-/g, ' ').toUpperCase()} - Ý Nghĩa Chi Tiết`,
    description: `Tìm hiểu ý nghĩa sao ${star.replace(/-/g, ' ')} trong lá số tử vi. Vị trí, tính chất và ảnh hưởng đến vận mệnh.`,
    path: `/sao/${star}`,
  })
}

export default async function StarPage({
  params,
}: {
  params: Promise<{ star: string }>
}) {
  const { star } = await params
  if (!STARS.includes(star as (typeof STARS)[number])) {
    notFound()
  }

  const displayName = star.replace(/-/g, ' ')

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <ArticleSchema
        headline={`Sao ${displayName} - Ý Nghĩa Chi Tiết`}
        description={`Tìm hiểu ý nghĩa sao ${displayName} trong lá số tử vi.`}
        url={`https://boitoan.vn/sao/${star}`}
        datePublished="2026-05-01"
        dateModified="2026-05-01"
        authorName="Bói Toán"
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: 'https://boitoan.vn/' },
          { name: 'Sao', url: 'https://boitoan.vn/sao' },
          { name: displayName, url: `https://boitoan.vn/sao/${star}` },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
        Sao {displayName}
      </h1>
      <p className="text-navy-200 mb-8">
        Tìm hiểu ý nghĩa, vị trí và ảnh hưởng của sao {displayName} trong lá số tử vi.
      </p>

      <section className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
          Tổng Quan
        </h2>
        <p className="text-navy-300">
          Sao {displayName} là một trong những sao quan trọng trong hệ thống tử vi.
          Nội dung chi tiết đang được biên soạn.
        </p>

        <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
          Vị Trí Trong Lá Số
        </h2>
        <p className="text-navy-300">
          Vị trí của sao {displayName} trong các cung khác nhau sẽ tạo ra những ảnh hưởng khác biệt.
        </p>
      </section>

      <p className="mt-12 text-sm text-navy-400">
        * Nội dung chỉ mang tính chất tham khảo, không phải lờii tiên đoán.
      </p>
    </main>
  )
}
