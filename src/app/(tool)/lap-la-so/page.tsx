import { buildMetadata } from '@/lib/metadata'
import {
  BreadcrumbListSchema,
  FAQPageSchema,
  HowToSchema,
  ServiceSchema,
} from '@/components/json-ld/json-ld'

const BASE_URL = 'https://boitoan.vn'

const FAQS = [
  {
    question: 'Lập lá số tử vi online cần những thông tin gì?',
    answer:
      'Thông thường cần ngày sinh, giờ sinh, giới tính và lịch âm dương phù hợp. Trang này hiện là landing page SEO tĩnh, không thu thập dữ liệu cá nhân.',
  },
  {
    question: 'Bói Toán có lưu thông tin ngày sinh của tôi không?',
    answer:
      'Không trên trang tĩnh này. Nội dung hiện chỉ giải thích cách lập và đọc lá số, chưa có biểu mẫu nhập dữ liệu.',
  },
  {
    question: 'Lá số tử vi có thay thế tư vấn chuyên môn không?',
    answer:
      'Không. Lá số và luận giải tử vi chỉ mang tính chất tham khảo văn hóa, không thay thế tư vấn y tế, pháp lý, tài chính hoặc tâm lý.',
  },
  {
    question: 'Khi nào công cụ tương tác được mở lại?',
    answer:
      'Bói Toán ưu tiên hoàn thiện hệ thống trang SEO tĩnh trước. Công cụ tương tác sẽ được triển khai riêng khi có yêu cầu sản phẩm rõ ràng.',
  },
]

const HOW_TO_STEPS = [
  {
    name: 'Chuẩn bị ngày giờ sinh',
    text: 'Ghi rõ ngày sinh, tháng sinh, năm sinh và giờ sinh gần đúng nhất trước khi lập lá số.',
  },
  {
    name: 'Xác định giới tính và lịch sinh',
    text: 'Các trường phái tử vi thường cần giới tính và quy đổi lịch âm dương để an sao đúng cách.',
  },
  {
    name: 'Đọc 12 cung theo thứ tự',
    text: 'Không chỉ nhìn một sao riêng lẻ; nên đọc cung Mệnh, Thân, Quan Lộc, Tài Bạch, Phu Thê và các cung liên quan.',
  },
  {
    name: 'Dùng kết quả như gợi ý tham khảo',
    text: 'Kết luận tử vi nên được đối chiếu với hoàn cảnh thật và quyết định bằng trách nhiệm cá nhân.',
  },
]

export const metadata = buildMetadata({
  title: 'Lập Lá Số Tử Vi Online - Hướng Dẫn Xem Lá Số',
  description:
    'Tìm hiểu cách lập lá số tử vi online, ý nghĩa 12 cung, thông tin ngày giờ sinh cần chuẩn bị và lưu ý khi đọc luận giải tử vi.',
  path: '/lap-la-so/',
  pageType: 'tool',
})

export default function LapLaSoPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#17243b_0,#0a1628_46%,#050914_100%)] text-white">
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: `${BASE_URL}/` },
          { name: 'Lập lá số tử vi', url: `${BASE_URL}/lap-la-so/` },
        ]}
      />
      <HowToSchema
        name="Cách lập và đọc lá số tử vi online"
        description="Các bước chuẩn bị thông tin và đọc lá số tử vi theo tinh thần tham khảo."
        steps={HOW_TO_STEPS}
      />
      <ServiceSchema
        name="Lập Lá Số Tử Vi Online"
        description="Trang hướng dẫn lập lá số tử vi online, giải thích thông tin cần chuẩn bị và cách đọc 12 cung."
        url={`${BASE_URL}/lap-la-so/`}
        provider="Bói Toán"
      />
      <FAQPageSchema faqs={FAQS} />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="rounded-3xl border border-gold/30 bg-white/[0.04] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Landing page tĩnh</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gold-light sm:text-5xl">
            Lập Lá Số Tử Vi Online
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Trang này giải thích cách lập lá số tử vi, những thông tin cần chuẩn bị và cách đọc 12 cung theo hướng dễ hiểu. Bói Toán hiện ưu tiên nội dung tĩnh, tải nhanh, có cấu trúc rõ ràng cho người đọc và công cụ tìm kiếm.
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Lá số tử vi gồm những gì?</h2>
          <div className="mt-4 space-y-4 leading-8 text-white/75">
            <p>
              Lá số tử vi là một bản đồ biểu tượng gồm 12 cung, trong đó thường được quan tâm nhiều nhất là Mệnh, Thân, Quan Lộc, Tài Bạch, Phu Thê, Phúc Đức và Tật Ách. Mỗi cung có nhóm sao và mối liên hệ riêng, nên không nên kết luận chỉ dựa trên một sao tốt hoặc xấu.
            </p>
            <p>
              Khi đọc lá số, hãy xem đây là cách soi lại khuynh hướng tính cách, cách xử lý công việc, tiền bạc và quan hệ. Một bài luận giải tốt cần giúp người đọc sống chủ động hơn, không tạo sợ hãi hoặc phụ thuộc.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Cách đọc lá số tử vi online</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-2">
            {HOW_TO_STEPS.map((step, index) => (
              <li key={step.name} className="rounded-2xl bg-navy/70 p-5">
                <p className="text-sm font-bold text-gold">Bước {index + 1}</p>
                <h3 className="mt-2 font-semibold text-white">{step.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-2xl bg-navy/70 p-5">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 leading-7 text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-gold-light">
          * Kết quả và nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Không dùng nội dung này thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng của cá nhân.
        </p>
      </article>
    </main>
  )
}
