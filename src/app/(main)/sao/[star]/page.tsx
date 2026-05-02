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

const BASE_URL = 'https://boitoan.com.vn'
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
    <main className="mv-page">
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

      <article className="mv-article">
        <nav aria-label="Breadcrumb" className="mv-breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/tu-vi/">Tử vi</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Sao {page.name}</li>
          </ol>
        </nav>

        <header className="mv-hero-card">
          <div className="mb-5 mv-seal">星</div>
          <p className="mv-kicker">
            Thư viện chính tinh • Tử Vi Đẩu Số
          </p>
          <h1 className="mv-h1">
            {page.h1}
          </h1>
          <div className="mv-lede">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <section id="tom-tat-sao" className="mv-card mt-8">
          <h2 className="mv-section-title">Bảng nhanh ý nghĩa sao {page.name}</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="mv-table min-w-[720px]">
              <thead>
                <tr>
                  <th className="py-3 pr-4 font-semibold">Góc đọc</th>
                  <th className="px-4 py-3 font-semibold">Ý nghĩa tham khảo</th>
                  <th className="py-3 pl-4 font-semibold">Cách kiểm chứng</th>
                </tr>
              </thead>
              <tbody>
                {page.summaryRows.map((row) => (
                  <tr key={row.aspect}>
                    <th className="py-4 pr-4 align-top font-semibold">{row.aspect}</th>
                    <td className="px-4 py-4 align-top">{row.meaning}</td>
                    <td className="py-4 pl-4 align-top">{row.readingCue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mv-card mt-8">
          <h2 className="mv-section-title">Phương pháp đọc sao</h2>
          <p className="mv-note mt-4">{page.methodNote}</p>
        </section>

        <div className="mt-8 space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading} className="mv-card">
              <h2 className="mv-section-title">{section.heading}</h2>
              <div className="mv-body">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mv-card mt-10">
          <h2 className="mv-section-title">Liên kết nội bộ nên đọc tiếp</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mv-link-card"
              >
                <p className="mv-meta">{link.relation}</p>
                <p className="mt-1 font-bold text-ink">{link.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mv-card mt-10">
          <h2 className="mv-section-title">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-3">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="mv-faq">
                <summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-7 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mv-cta mt-10">
          <h2 className="mv-section-title-light">Muốn đọc sao {page.name} trong lá số cá nhân?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7">
            Hãy xem cách lập lá số theo ngày giờ sinh để hiểu vì sao cần Mệnh Cung, Thân Cung, Cục và vị trí sao trong đủ 12 cung trước khi luận riêng cho một người.
          </p>
          <Link
            href="/lap-la-so/"
            className="mv-button-primary mt-5"
          >
            Tìm hiểu cách lập lá số Tử Vi
          </Link>
        </section>

        <p className="mv-disclaimer mt-10">
          {page.disclaimer}
        </p>
      </article>
    </main>
  )
}
