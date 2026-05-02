import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import {
  PRIORITY_STAR_SLUGS,
  getStarFoundationPage,
  isPriorityStarSlug,
} from '@/content/stars'
import {
  ArticleSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  JsonLd,
} from '@/components/json-ld/json-ld'

const BASE_URL = 'https://boitoan.vn'
const LAST_UPDATED = '2026-05-02'

export const dynamicParams = false

export function generateStaticParams() {
  return PRIORITY_STAR_SLUGS.map((star) => ({ star }))
}

export async function generateMetadata({ params }: { params: Promise<{ star: string }> }) {
  const { star } = await params
  const page = getStarFoundationPage(star)

  if (!isPriorityStarSlug(star) || !page) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/sao/${star}/`,
      pageType: 'error',
    })
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.urlPath,
    pageType: 'star',
  })
}

export default async function StarPage({
  params,
}: {
  params: Promise<{ star: string }>
}) {
  const { star } = await params
  const page = getStarFoundationPage(star)

  if (!isPriorityStarSlug(star) || !page) {
    notFound()
  }

  const pageUrl = `${BASE_URL}${page.urlPath}`
  const breadcrumbItems = [
    { name: 'Trang chủ', url: `${BASE_URL}/` },
    { name: 'Tử vi', url: `${BASE_URL}/tu-vi/` },
    { name: `Sao ${page.name}`, url: pageUrl },
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
            cssSelector: ['h1', '#tom-tat-sao'],
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
              <Link href="/tu-vi/" className="hover:text-gold-light">Tử vi</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gold-light">Sao {page.name}</li>
          </ol>
        </nav>

        <header className="mt-6 rounded-3xl border border-gold/30 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            Thư viện chính tinh • Tử Vi Đẩu Số
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gold-light sm:text-4xl lg:text-5xl">
            {page.h1}
          </h1>
          <div className="mt-5 space-y-4 text-lg leading-8 text-white/75">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <section id="tom-tat-sao" className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Bảng nhanh ý nghĩa sao {page.name}</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm leading-6">
              <thead>
                <tr className="border-b border-white/15 text-gold-light">
                  <th className="py-3 pr-4 font-semibold">Góc đọc</th>
                  <th className="px-4 py-3 font-semibold">Ý nghĩa tham khảo</th>
                  <th className="py-3 pl-4 font-semibold">Cách kiểm chứng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/75">
                {page.summaryRows.map((row) => (
                  <tr key={row.aspect}>
                    <th className="py-4 pr-4 align-top font-semibold text-white">{row.aspect}</th>
                    <td className="px-4 py-4 align-top">{row.meaning}</td>
                    <td className="py-4 pl-4 align-top">{row.readingCue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-gold/25 bg-gold/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Phương pháp đọc sao</h2>
          <p className="mt-4 leading-8 text-gold-light">{page.methodNote}</p>
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
                className="rounded-2xl border border-white/10 bg-navy/70 p-4 transition hover:border-gold/60 hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold-light"
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
          <h2 className="text-2xl font-bold text-gold-light">Muốn đọc sao {page.name} trong lá số cá nhân?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/75">
            Hãy xem cách lập lá số theo ngày giờ sinh để hiểu vì sao cần Mệnh Cung, Thân Cung, Cục và vị trí sao trong đủ 12 cung trước khi luận riêng cho một người.
          </p>
          <Link
            href="/lap-la-so/"
            className="mt-5 inline-flex rounded-lg bg-gold px-6 py-3 font-bold text-navy transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-navy"
          >
            Tìm hiểu cách lập lá số Tử Vi
          </Link>
        </section>

        <p className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-gold-light">
          {page.disclaimer}
        </p>
      </article>
    </main>
  )
}
