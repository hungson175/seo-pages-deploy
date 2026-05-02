import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { STARS } from '@/content/routes'
import { STAR_CONTENT } from '@/content'
import { buildH1 } from '@/lib/h1-optimization'
import { buildMetaTemplate } from '@/lib/meta-templates'
import {
  ArticleSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
} from '@/components/json-ld/json-ld'

function paragraphs(text: string) {
  return text.split('\n\n').filter(Boolean)
}

function Section({ heading, children }: { heading: string; children: string }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
        {heading}
      </h2>
      {paragraphs(children).map((paragraph) => (
        <p key={paragraph} className="text-navy-300 mb-4 leading-7">
          {paragraph}
        </p>
      ))}
    </section>
  )
}

export function generateStaticParams() {
  return STARS.map((star) => ({ star }))
}

export async function generateMetadata({ params }: { params: Promise<{ star: string }> }) {
  const { star } = await params
  const content = STAR_CONTENT[star]

  if (!STARS.includes(star as (typeof STARS)[number]) || !content) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/sao/${star}`,
    })
  }

  const meta = buildMetaTemplate(
    'star',
    `Sao ${content.name}`,
    'Ý Nghĩa Và Ứng Dụng'
  )

  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/sao/${star}`,
  })
}

export default async function StarPage({
  params,
}: {
  params: Promise<{ star: string }>
}) {
  const { star } = await params
  const content = STAR_CONTENT[star]

  if (!STARS.includes(star as (typeof STARS)[number]) || !content) {
    notFound()
  }

  const h1 = buildH1('Tìm Hiểu', `Sao ${content.name}`, 'Ý Nghĩa, Vị Trí Và Ứng Dụng')

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <ArticleSchema
        headline={h1}
        description={`Tìm hiểu ý nghĩa sao ${content.name} trong lá số tử vi.`}
        url={`https://boitoan.vn/sao/${star}`}
        datePublished="2026-05-01"
        dateModified="2026-05-02"
        authorName="Bói Toán"
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: 'https://boitoan.vn/' },
          { name: 'Sao', url: 'https://boitoan.vn/sao' },
          { name: content.name, url: `https://boitoan.vn/sao/${star}` },
        ]}
      />
      <FAQPageSchema
        faqs={[
          {
            question: `Sao ${content.name} trong tử vi có ý nghĩa gì?`,
            answer: content.overview,
          },
          {
            question: `Có nên kết luận vận mệnh chỉ từ sao ${content.name} không?`,
            answer:
              'Không nên. Một sao chỉ là một phần của lá số. Cần xem cung, tam phương tứ chính, chính tinh, phụ tinh và đại vận. Nội dung này chỉ nên dùng để tham khảo.',
          },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
        {h1}
      </h1>
      <p className="text-navy-200 mb-8 leading-7">
        Sao {content.name} là một điểm quan trọng khi đọc lá số tử vi. Bài này giải thích
        ý nghĩa, vị trí, tính cách thường gặp, tổ hợp sao và lời khuyên thực tế để bạn
        đối chiếu mà không biến tử vi thành lời khẳng định tuyệt đối.
      </p>

      <article className="prose prose-invert max-w-none">
        <Section heading="Tổng Quan">{content.overview}</Section>
        <Section heading="Vị Trí Trong Lá Số">{content.position}</Section>
        <Section heading="Tính Cách Thường Gặp">{content.characteristics}</Section>
        <Section heading="Ảnh Hưởng Theo Từng Cung">{content.influence}</Section>
        <Section heading="Tổ Hợp Với Các Sao Khác">{content.combinations}</Section>
        <Section heading="Lời Khuyên Thực Tế">{content.advice}</Section>

        <section>
          <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
            Cách Đọc Sao {content.name} Cho Đúng
          </h2>
          <p className="text-navy-300 mb-4 leading-7">
            Khi xem sao {content.name}, đừng tách riêng một sao rồi kết luận ngay tốt hay xấu.
            Một lá số cần đọc theo toàn cục: cung sao đang tọa thủ, các sao hội chiếu, trạng thái
            miếu vượng hay hãm, đại vận đang đi qua cung nào, và câu hỏi thực tế của người xem.
            Cùng một sao nhưng đi với cát tinh thì dễ thành điểm mạnh; gặp sát tinh hoặc bại tinh
            thì cần đọc như lời nhắc để điều chỉnh hành vi.
          </p>
          <p className="text-navy-300 mb-4 leading-7">
            Vì vậy, phần luận giải này nên được dùng như một bản đồ gợi ý. Nếu thấy mô tả đúng
            với mình, hãy lấy đó làm gợi ý để hiểu tính cách và lựa chọn tốt hơn. Nếu thấy chưa
            đúng, hãy xem thêm toàn bộ lá số trước khi kết luận.
          </p>
        </section>
      </article>

      <p className="mt-12 text-sm text-navy-400">
        * Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán hay căn cứ để thay thế quyết định chuyên môn.
      </p>
    </main>
  )
}
