import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { QUE_SLUGS } from '@/lib/data/allow-lists'
import {
  ArticleSchema,
  FAQPageSchema,
  BreadcrumbListSchema,
} from '@/components/json-ld/json-ld'

export function generateStaticParams() {
  return QUE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!QUE_SLUGS.includes(slug as (typeof QUE_SLUGS)[number])) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/que/${slug}`,
    })
  }
  return buildMetadata({
    title: `Quẻ ${slug.replace(/-/g, ' ').toUpperCase()} - Kinh Dịch`,
    description: `Luận giải quẻ ${slug.replace(/-/g, ' ')} trong Kinh Dịch. Ý nghĩa, biến quẻ và ứng dụng trong cuộc sống.`,
    path: `/que/${slug}`,
  })
}

export default async function QuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!QUE_SLUGS.includes(slug as (typeof QUE_SLUGS)[number])) {
    notFound()
  }

  const displayName = slug.replace(/-/g, ' ')

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <ArticleSchema
        headline={`Quẻ ${displayName} - Kinh Dịch`}
        description={`Luận giải quẻ ${displayName} trong Kinh Dịch.`}
        url={`https://boitoan.vn/que/${slug}`}
        datePublished="2026-05-01"
        dateModified="2026-05-01"
        authorName="Bói Toán"
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: 'https://boitoan.vn/' },
          { name: 'Quẻ', url: 'https://boitoan.vn/que' },
          { name: displayName, url: `https://boitoan.vn/que/${slug}` },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
        Quẻ {displayName}
      </h1>
      <p className="text-navy-200 mb-8">
        Luận giải quẻ {displayName} trong Kinh Dịch — ý nghĩa, biến quẻ và ứng dụng.
      </p>

      <section className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
          Ý Nghĩa Quẻ
        </h2>
        <p className="text-navy-300">
          Quẻ {displayName} mang thông điệp sâu sắc về sự thay đổi và thích nghi.
          Nội dung chi tiết đang được biên soạn.
        </p>

        <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
          Biến Quẻ
        </h2>
        <p className="text-navy-300">
          Các hào biến của quẻ {displayName} cho thấy những khả năng phát triển khác nhau.
        </p>
      </section>

      <FAQPageSchema
        faqs={[
          {
            question: `Quẻ ${displayName} là tốt hay xấu?`,
            answer:
              'Không có quẻ nào hoàn toàn tốt hay xấu. Mỗi quẻ đều mang thông điệp phù hợp với hoàn cảnh cụ thể.',
          },
          {
            question: 'Cách gieo quẻ Kinh Dịch như thế nào?',
            answer:
              'Bạn có thể gieo quẻ bằng cách tập trung vào câu hỏi, sau đó sử dụng phương pháp xuất quẻ để nhận được quẻ chỉ dẫn.',
          },
        ]}
      />

      <p className="mt-12 text-sm text-navy-400">
        * Nội dung chỉ mang tính chất tham khảo, không phải lờii tiên đoán.
      </p>
    </main>
  )
}
