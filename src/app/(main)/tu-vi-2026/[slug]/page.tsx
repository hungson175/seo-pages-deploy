import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { getSeoForecastPage, SEO_FORECAST_CANONICAL_SLUGS } from '@/content/seo-forecasts'
import {
  ArticleSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  JsonLd,
} from '@/components/json-ld/json-ld'

const BASE_URL = 'https://boitoan.vn'
const LAST_UPDATED = '2026-05-02'

export function generateStaticParams() {
  return SEO_FORECAST_CANONICAL_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getSeoForecastPage(slug)

  if (!page) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/tu-vi-2026/${slug}/`,
      pageType: 'error',
    })
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.urlPath,
    pageType: 'forecast',
  })
}

export default async function TuViForecastPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getSeoForecastPage(slug)

  if (!page) notFound()

  const pageUrl = `${BASE_URL}${page.urlPath}`
  const breadcrumbItems = [
    { name: 'Trang chủ', url: `${BASE_URL}/` },
    { name: 'Tử vi 2026', url: `${BASE_URL}/tu-vi/` },
    { name: `Tuổi ${page.canChi} ${page.year} ${page.genderLabel}`, url: pageUrl },
  ]

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#17243b_0,#0a1628_46%,#050914_100%)] text-white">
      <ArticleSchema
        headline={page.h1}
        description={page.description}
        url={pageUrl}
        datePublished={LAST_UPDATED}
        dateModified={LAST_UPDATED}
        authorName="Bói Toán"
      />
      <FAQPageSchema faqs={page.faqs} />
      <BreadcrumbListSchema items={breadcrumbItems} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: page.h1,
          description: page.description,
          url: pageUrl,
          inLanguage: 'vi',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Bói Toán',
            url: BASE_URL,
          },
          datePublished: LAST_UPDATED,
          dateModified: LAST_UPDATED,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '#tom-tat-nhanh'],
          },
        }}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-white/60">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-gold-light">Trang chủ</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/tu-vi/" className="hover:text-gold-light">Tử vi 2026</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gold-light">{page.canChi} {page.year} {page.genderLabel}</li>
          </ol>
        </nav>

        <header className="mt-6 rounded-3xl border border-gold/30 bg-white/[0.04] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            {page.canChi} • Nạp âm {page.element}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gold-light sm:text-4xl lg:text-5xl">
            {page.h1}
          </h1>
          <div className="mt-5 space-y-4 text-lg leading-8 text-white/75">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-navy/70 p-4">
              <p className="text-xs uppercase tracking-wide text-white/45">Con giáp</p>
              <p className="mt-1 font-bold text-white">Tuổi {page.animal}</p>
            </div>
            <div className="rounded-2xl bg-navy/70 p-4">
              <p className="text-xs uppercase tracking-wide text-white/45">Can chi</p>
              <p className="mt-1 font-bold text-white">{page.canChi}</p>
            </div>
            <div className="rounded-2xl bg-navy/70 p-4">
              <p className="text-xs uppercase tracking-wide text-white/45">Giới tính</p>
              <p className="mt-1 font-bold text-white">{page.genderLabel}</p>
            </div>
          </div>
        </header>

        <section id="tom-tat-nhanh" className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Bảng nhanh các phương diện chính trong năm 2026</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm leading-6">
              <thead>
                <tr className="border-b border-white/15 text-gold-light">
                  <th className="py-3 pr-4 font-semibold">Phương diện</th>
                  <th className="px-4 py-3 font-semibold">Xu hướng tham khảo</th>
                  <th className="py-3 pl-4 font-semibold">Gợi ý hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/75">
                {page.summaryRows.map((row) => (
                  <tr key={row.aspect}>
                    <th className="py-4 pr-4 align-top font-semibold text-white">{row.aspect}</th>
                    <td className="px-4 py-4 align-top">{row.trend}</td>
                    <td className="py-4 pl-4 align-top">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/10 p-4 text-sm leading-7 text-gold-light">
            Bài này mới xem theo tuổi và giới tính. Muốn đọc theo ngày giờ sinh của riêng bạn, hãy xem trang{' '}
            <Link href="/lap-la-so/" className="font-bold underline underline-offset-4 hover:text-white">
              lập lá số Tử Vi online
            </Link>{' '}
            để hiểu thông tin cần chuẩn bị trước khi đọc lá số cá nhân.
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Vì sao bài theo tuổi chỉ là tổng quan?</h2>
          <p className="mt-4 leading-8 text-white/75">
            Bài theo tuổi chỉ có năm sinh và giới tính, nên không thể xác định chính xác Mệnh Cung, Thân Cung, Cục và vị trí sao trong 12 cung. Lá số cá nhân cần ngày sinh và giờ sinh để an cung đúng hơn. Vì vậy trang này dùng để đọc tổng quan, còn phần cá nhân hóa phải đi qua dữ liệu ngày giờ sinh riêng.
          </p>
          <p className="mt-4 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm leading-7 text-gold-light">
            {page.methodNote}
          </p>
        </section>

        <div className="mt-8 space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gold-light">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-white/75">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white">Liên kết nội bộ nên đọc tiếp</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-navy/70 p-4 transition hover:border-gold/60 hover:bg-gold/10"
              >
                <p className="text-sm font-semibold text-gold-light">{link.relation}</p>
                <p className="mt-1 font-bold text-white">{link.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-3">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl bg-navy/70 p-4">
                <summary className="cursor-pointer list-none font-semibold text-gold-light marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-7 text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-gold/30 bg-gold/10 p-6 text-center">
          <h2 className="text-2xl font-bold text-gold-light">Lập lá số cá nhân hóa theo ngày giờ sinh</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/75">
            Bài viết này mới là bản tổng quan theo tuổi. Lập lá số miễn phí để xem Mệnh Cung, Thân Cung và 3 insight đầu tiên theo dữ liệu ngày giờ sinh của bạn.
          </p>
          <Link
            href="/lap-la-so/"
            className="mt-5 inline-flex rounded-lg bg-gold px-6 py-3 font-bold text-navy transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-navy"
          >
            Lập lá số Tử Vi miễn phí
          </Link>
        </section>

        <p className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-gold-light">
          * Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Bói Toán là nội dung giải trí và thuật toán tham khảo theo văn hóa Tử Vi; không dùng bài viết này để thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.
        </p>
      </article>
    </main>
  )
}
