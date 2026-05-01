import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { toTitleCase } from '@/lib/casing'
import { FORECAST_SLUGS } from '@/lib/data/allow-lists'
import {
  ArticleSchema,
  FAQPageSchema,
  BreadcrumbListSchema,
} from '@/components/json-ld/json-ld'

export function generateStaticParams() {
  return FORECAST_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!FORECAST_SLUGS.includes(slug)) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/tuvi/${slug}`,
    })
  }
  const displayName = toTitleCase(slug.replace(/-/g, ' '))
  return buildMetadata({
    title: `Tử Vi ${displayName} - Xem Chi Tiết`,
    description: `Xem tử vi chi tiết cho ${displayName}. Luận giải vận mệnh, công danh, tài lộc, tình duyên và sức khỏe năm 2026.`,
    path: `/tuvi/${slug}`,
  })
}

export default async function ForecastPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!FORECAST_SLUGS.includes(slug)) {
    notFound()
  }

  const displayName = toTitleCase(slug.replace(/-/g, ' '))

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <ArticleSchema
        headline={`Tử Vi ${displayName} - Xem Chi Tiết`}
        description={`Luận giải tử vi ${displayName} năm 2026.`}
        url={`https://boitoan.vn/tuvi/${slug}`}
        datePublished="2026-05-01"
        dateModified="2026-05-01"
        authorName="Bói Toán"
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: 'https://boitoan.vn/' },
          { name: 'Tử vi', url: 'https://boitoan.vn/tuvi' },
          { name: displayName, url: `https://boitoan.vn/tuvi/${slug}` },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
        Tử Vi {displayName}
      </h1>
      <p className="text-navy-200 mb-8">
        Xem tử vi chi tiết cho {displayName}. Nội dung đang được cập nhật.
      </p>

      <section className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
          Tổng Quan Năm 2026
        </h2>
        <p className="text-navy-300">
          Năm 2026 mang đến nhiều biến động cho {displayName}. Cần chú ý đến
          sức khỏe và các mối quan hệ xung quanh.
        </p>

        <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
          Công Danh & Tài Lộc
        </h2>
        <p className="text-navy-300">
          Công việc có nhiều cơ hội mới, nhưng cần cân nhắc kỹ trước khi quyết định.
        </p>

        <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
          Tình Duyên & Gia Đạo
        </h2>
        <p className="text-navy-300">
          Tình cảm có thể gặp sóng gió nhỏ, cần kiên nhẫn và thấu hiểu.
        </p>
      </section>

      <FAQPageSchema
        faqs={[
          {
            question: `Tử vi ${displayName} năm 2026 có tốt không?`,
            answer:
              'Tử vi chỉ mang tính chất tham khảo. Vận mệnh phụ thuộc vào nhiều yếu tố, trong đó quan trọng nhất là nỗ lực của bản thân.',
          },
          {
            question: 'Làm sao để xem lá số tử vi chi tiết?',
            answer:
              'Bạn có thể sử dụng công cụ lập lá số miễn phí tại /lap-la-so để xem chi tiết.',
          },
        ]}
      />

      <p className="mt-12 text-sm text-navy-400">
        * Nội dung chỉ mang tính chất tham khảo, không phải lờii tiên đoán.
      </p>
    </main>
  )
}
