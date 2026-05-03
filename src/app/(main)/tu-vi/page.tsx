import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { SEO_FORECAST_SEEDS, getSeoForecastPage, type SeoForecastPage } from '@/content/seo-forecasts'
import { PALACE_IMAGE_LIST } from '@/content/palace-images'
import {
  BreadcrumbListSchema,
  FAQPageSchema,
  HowToSchema,
  JsonLd,
} from '@/components/json-ld/json-ld'
import { PalaceImageFigure } from '@/components/seo/palace-image'

const BASE_URL = 'https://boitoan.com.vn'

const META_DESCRIPTION =
  'Tử vi 2026, xem lá số tử vi online theo tuổi: công danh, tài lộc, tình duyên, sức khỏe. Nội dung tham khảo, dễ đọc và có cấu trúc.'

const FAQS = [
  {
    question: 'Tử vi 2026 trên Bói Toán xem theo thông tin nào?',
    answer:
      'Các trang tử vi 2026 hiện được tổ chức theo tuổi, năm sinh và giới tính để người đọc nhanh chóng tìm được nội dung phù hợp với mình.',
  },
  {
    question: 'Xem lá số tử vi online có cần đăng nhập không?',
    answer:
      'Không. Các trang SEO của Bói Toán là nội dung tĩnh, đọc trực tiếp trên trình duyệt, không yêu cầu đăng nhập hoặc tạo tài khoản.',
  },
  {
    question: 'Nội dung tử vi có phải lời tiên đoán chắc chắn không?',
    answer:
      'Không. Nội dung chỉ mang tính chất tham khảo theo văn hóa tử vi, không phải lời tiên đoán và không thay thế quyết định cá nhân hoặc tư vấn chuyên môn.',
  },
  {
    question: 'Nên đọc phần nào trước khi xem tử vi theo tuổi?',
    answer:
      'Bạn nên đọc tổng quan trước, sau đó đối chiếu các phần công danh, tài lộc, tình duyên, sức khỏe và lời khuyên thực tế cho năm 2026.',
  },
  {
    question: 'Bói Toán có bán giải hạn hoặc hù dọa vận xấu không?',
    answer:
      'Không. Bói Toán định hướng nội dung lành mạnh: giải thích dễ hiểu, khuyến khích sống chủ động, không hù dọa và không bán dịch vụ giải hạn.',
  },
  {
    question: 'Khi nào nên dùng công cụ lập lá số chi tiết?',
    answer:
      'Khi cần đọc sâu theo ngày giờ sinh và 12 cung, bạn có thể tìm hiểu công cụ lập lá số. Trang hiện tại ưu tiên nội dung tử vi theo tuổi để Google dễ lập chỉ mục.',
  },
]

const HOW_TO_STEPS = [
  {
    name: 'Chọn đúng tuổi và giới tính',
    text: 'Bắt đầu bằng trang tử vi theo năm sinh và nam mạng hoặc nữ mạng để tránh đọc nhầm nhóm nội dung.',
    url: `${BASE_URL}/tu-vi/`,
  },
  {
    name: 'Đọc tổng quan trước',
    text: 'Phần tổng quan giúp nắm khí chất, can chi, nạp âm và bối cảnh chính của năm 2026.',
  },
  {
    name: 'Đối chiếu từng chủ đề',
    text: 'Sau tổng quan, hãy đọc công danh, tài lộc, tình duyên và sức khỏe để biết điểm nào cần ưu tiên.',
  },
  {
    name: 'Biến lời khuyên thành hành động',
    text: 'Dùng phần lời khuyên như gợi ý tự kiểm điểm, lập kế hoạch và ra quyết định có trách nhiệm.',
  },
]

export const metadata = buildMetadata({
  title: 'Tử Vi 2026 - Xem Lá Số Tử Vi Online',
  description: META_DESCRIPTION,
  path: '/tu-vi/',
  pageType: 'hub',
})

export default function TuViHubPage() {
  const featuredPages = SEO_FORECAST_SEEDS
    .map((seed) => getSeoForecastPage(seed.slug))
    .filter((page): page is SeoForecastPage => Boolean(page))

  return (
    <main className="mv-page">
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: `${BASE_URL}/` },
          { name: 'Tử vi 2026', url: `${BASE_URL}/tu-vi/` },
        ]}
      />
      <FAQPageSchema faqs={FAQS} />
      <HowToSchema
        name="How to read birth chart - Cách đọc lá số tử vi theo tuổi"
        description="Quy trình đọc trang tử vi 2026 theo tuổi, từ chọn đúng năm sinh đến biến lời khuyên thành hành động thực tế."
        steps={HOW_TO_STEPS}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Tử Vi 2026 - Xem Lá Số Tử Vi Online',
          description: META_DESCRIPTION,
          url: `${BASE_URL}/tu-vi/`,
          inLanguage: 'vi',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Bói Toán',
            url: BASE_URL,
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: featuredPages.map((page, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${BASE_URL}${page.urlPath}`,
              name: `Tử vi tuổi ${page.animal} ${page.year} ${page.genderLabel} năm 2026`,
            })),
          },
        }}
      />

      <section className="mv-container py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="mv-hero-card">
            <div className="mb-5 mv-seal">命</div>
            <p className="mv-kicker">
              Tử vi 2026 theo tuổi • Nội dung tĩnh cho Google indexing
            </p>
            <h1 className="mv-h1-large">
              Tử Vi 2026 - Xem Lá Số Tử Vi Online
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              Tra cứu tử vi 2026 theo năm sinh, con giáp và giới tính. Mỗi bài tập trung vào công danh,
              tài lộc, tình duyên, sức khỏe và lời khuyên thực tế để bạn đọc nhanh, hiểu đúng, không bị
              cuốn vào mê tín hoặc hù dọa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#danh-sach-tuoi"
                className="mv-button-primary"
              >
                Xem tử vi theo tuổi
              </a>
              <a
                href="#cach-doc"
                className="mv-button-secondary"
              >
                Cách đọc lá số
              </a>
            </div>
          </div>

          <aside className="mv-cta">
            <p className="mv-kicker text-gold-300">Tử Vi Đẩu Số</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-ivory">Trọng tâm nội dung</h2>
            <dl className="mt-6 grid gap-4">
              {[
                ['Công danh', 'Hướng nghề nghiệp, cách xử lý áp lực và cơ hội mới.'],
                ['Tài lộc', 'Kỷ luật tiền bạc, tích lũy, đầu tư và rủi ro cần tránh.'],
                ['Tình duyên', 'Giao tiếp, gia đạo, ranh giới và cách giữ hòa khí.'],
                ['Sức khỏe', 'Nhịp sống, tinh thần và dấu hiệu nên chăm sóc sớm.'],
              ].map(([term, desc]) => (
                <div key={term} className="rounded-2xl border border-gold/30 bg-ivory/10 p-4">
                  <dt className="font-semibold text-gold-300">{term}</dt>
                  <dd className="mt-1 text-sm leading-6 text-ivory/75">{desc}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="mv-container pb-14">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mv-kicker">Thư viện minh họa 12 cung</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">12 hình ảnh dùng lại cho hệ nội dung Tử Vi</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-ink-soft">
            Bộ hình minh họa được tạo theo phong cách editorial mềm, không chữ trong ảnh, dùng lại cho các bài cung và các phần đọc theo công việc, tài chính, quan hệ, nhịp sống.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PALACE_IMAGE_LIST.map((asset) => (
            <PalaceImageFigure key={asset.slug} asset={asset} compact linkToPalace />
          ))}
        </div>
      </section>

      <section id="danh-sach-tuoi" className="mv-container pb-14">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mv-kicker">Danh sách theo 12 con giáp</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-navy">Tử vi 2026 theo năm sinh</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-ink-soft">
            24 trang theo năm sinh và giới tính đã có đủ cho 12 con giáp, mỗi trang có nội dung riêng, meta, schema và liên kết nội bộ để Google đọc được cấu trúc chủ đề.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPages.map((page) => (
            <Link
              key={page.slug}
              href={page.urlPath}
              className="mv-link-card group p-5"
            >
              <p className="mv-meta">{page.canChi} • {page.element}</p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-navy group-hover:text-vermillion">
                Tử vi tuổi {page.animal} {page.year} {page.genderLabel}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Luận giải {page.career.split(',')[0].toLowerCase()}, tài lộc, tình duyên và sức khỏe năm 2026.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="cach-doc" className="mv-container pb-14">
        <div className="mv-card">
          <h2 className="font-serif text-3xl font-semibold text-navy">Cách đọc lá số tử vi online đúng tinh thần tham khảo</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {HOW_TO_STEPS.map((step, index) => (
              <article key={step.name} className="mv-step-card">
                <p className="mv-kicker text-xs">Bước {index + 1}</p>
                <h3 className="mt-2 font-semibold text-ink">{step.name}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-14 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold text-navy">Câu hỏi thường gặp</h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((faq) => (
            <details key={faq.question} className="mv-faq group p-5">
              <summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mv-disclaimer">
          <strong>Lưu ý pháp lý:</strong> Kết quả và nội dung trên Bói Toán chỉ mang tính chất tham khảo, không phải lời tiên đoán. Không dùng nội dung này thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng của cá nhân.
        </div>
      </section>
    </main>
  )
}
