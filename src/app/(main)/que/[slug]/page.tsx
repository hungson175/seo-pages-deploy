import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { QUE_SLUGS } from '@/content/routes'
import { QUE_CONTENT } from '@/content'
import { buildH1 } from '@/lib/h1-optimization'
import { buildMetaTemplate } from '@/lib/meta-templates'
import {
  ArticleSchema,
  FAQPageSchema,
  BreadcrumbListSchema,
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
  return QUE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = QUE_CONTENT[slug]

  if (!QUE_SLUGS.includes(slug as (typeof QUE_SLUGS)[number]) || !content) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/que/${slug}`,
    })
  }

  const meta = buildMetaTemplate('que', `Quẻ ${content.name}`, 'Luận Giải Kinh Dịch')
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/que/${slug}`,
  })
}

export default async function QuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = QUE_CONTENT[slug]

  if (!QUE_SLUGS.includes(slug as (typeof QUE_SLUGS)[number]) || !content) {
    notFound()
  }

  const h1 = buildH1('Khám Phá', `Quẻ ${content.name}`, 'Luận Giải Và Ứng Dụng')

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <ArticleSchema
        headline={h1}
        description={`Luận giải quẻ ${content.name} trong Kinh Dịch.`}
        url={`https://boitoan.vn/que/${slug}`}
        datePublished="2026-05-01"
        dateModified="2026-05-02"
        authorName="Bói Toán"
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: 'https://boitoan.vn/' },
          { name: 'Quẻ', url: 'https://boitoan.vn/que' },
          { name: content.name, url: `https://boitoan.vn/que/${slug}` },
        ]}
      />
      <FAQPageSchema
        faqs={[
          {
            question: `Quẻ ${content.name} là tốt hay xấu?`,
            answer:
              'Không có quẻ nào tuyệt đối tốt hoặc xấu. Mỗi quẻ là một lời nhắc theo hoàn cảnh, thời điểm và cách người hỏi hành động.',
          },
          {
            question: 'Có nên dùng quẻ để quyết định thay chuyên gia không?',
            answer:
              'Không nên. Luận quẻ chỉ mang tính tham khảo văn hóa và tinh thần, không thay thế tư vấn pháp lý, y tế, tài chính hoặc quyết định chuyên môn.',
          },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
        {h1}
      </h1>
      <p className="text-navy-200 mb-8 leading-7">
        Luận giải quẻ {content.name} theo tinh thần Kinh Dịch: xem tượng quẻ,
        lời đoán, ứng dụng trong công việc, tình cảm, tài chính, sức khỏe và cách hành động
        khôn ngoan.
      </p>

      <article className="prose prose-invert max-w-none">
        <Section heading="Ý Nghĩa Quẻ">{content.meaning}</Section>
        <Section heading="Lời Đoán Và Tinh Thần Chính">{content.judgment}</Section>
        <Section heading="Ứng Dụng Trong Đời Sống">{content.application}</Section>
        <Section heading="Lời Khuyên Cho Người Hỏi">{content.advice}</Section>
        <Section heading="Các Hào Biến Cần Chú Ý">{content.changingLines}</Section>

        <section>
          <h2 className="text-2xl font-semibold text-gold-300 mt-8 mb-4">
            Cách Hiểu Quẻ {content.name} Cho Đúng
          </h2>
          <p className="text-navy-300 mb-4 leading-7">
            Khi đọc quẻ, điều quan trọng không phải là tìm một câu trả lời cứng nhắc, mà là
            nhận ra xu hướng của hoàn cảnh. Quẻ cho thấy thế đang mạnh hay yếu, nên tiến hay
            nên chờ, cần mềm mỏng hay cần dứt khoát. Vì vậy, hãy đối chiếu lời quẻ với tình
            huống thực tế của mình rồi chọn cách hành động thận trọng.
          </p>
          <p className="text-navy-300 mb-4 leading-7">
            Nội dung này được viết theo hướng dễ hiểu cho người mới tìm hiểu Kinh Dịch. Bạn
            có thể dùng như một lớp gợi ý ban đầu, sau đó xem thêm biến quẻ, hào động và
            bối cảnh câu hỏi để có góc nhìn đầy đủ hơn.
          </p>
        </section>
      </article>

      <p className="mt-12 text-sm text-navy-400">
        * Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán hay căn cứ để thay thế quyết định chuyên môn.
      </p>
    </main>
  )
}
