import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import {
  getApprovedStarPalacePages,
  getStarPalacePage,
} from '@/content/star-palace'
import {
  ArticleSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  JsonLd,
} from '@/components/json-ld/json-ld'

const BASE_URL = 'https://boitoan.com.vn'
const LAST_UPDATED = '2026-05-04'

export const dynamicParams = false

export function generateStaticParams() {
  return getApprovedStarPalacePages().map((page) => ({
    star: page.star,
    palace: page.palace,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ star: string; palace: string }>
}) {
  const { star, palace } = await params
  const page = getStarPalacePage(star, palace)

  if (!page) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/sao/${star}/cung/${palace}/`,
      pageType: 'error',
    })
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.urlPath,
    pageType: 'star-palace',
  })
}

export default async function StarPalacePage({
  params,
}: {
  params: Promise<{ star: string; palace: string }>
}) {
  const { star, palace } = await params
  const page = getStarPalacePage(star, palace)

  if (!page) {
    notFound()
  }

  const pageUrl = `${BASE_URL}${page.urlPath}`
  const starName = page.h1.match(/^Sao (.+?) Ở Cung/)?.[1] ?? 'Sao'
  const palaceName = page.h1.match(/Ở Cung (.+?) —/)?.[1] ?? 'Cung'
  const breadcrumbItems = [
    { name: 'Trang chủ', url: `${BASE_URL}/` },
    { name: 'Tử vi', url: `${BASE_URL}/tu-vi/` },
    { name: `Sao ${starName}`, url: `${BASE_URL}/sao/${page.star}/` },
    { name: `Cung ${palaceName}`, url: `${BASE_URL}/cung/${page.palace}/` },
    { name: `Sao ${starName} ở Cung ${palaceName}`, url: pageUrl },
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
            cssSelector: ['h1', '#tom-tat-to-hop'],
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
            <li>
              <Link href={`/sao/${page.star}/`}>Sao {starName}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/cung/${page.palace}/`}>Cung {palaceName}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Tổ hợp sao×cung</li>
          </ol>
        </nav>

        <header className="mv-hero-card">
          <div className="mb-5 mv-seal">星宮</div>
          <p className="mv-kicker">Sao × Cung • Tử Vi Đẩu Số</p>
          <h1 className="mv-h1">{page.h1}</h1>
          <div className="mv-lede">
            <p>{page.intersectionThesis}</p>
            <p>
              Trang này là bài nền tham khảo, không phải lá số cá nhân. Để đọc riêng cho một người cần ngày sinh, giờ sinh, Mệnh Cung, Thân Cung, Cục, vị trí sao trong đủ 12 cung và bối cảnh thực tế.
            </p>
          </div>
        </header>

        <section id="tom-tat-to-hop" className="mv-card mt-8">
          <h2 className="mv-section-title">Bảng nhanh sao {starName} ở cung {palaceName}</h2>
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
          <h2 className="mv-section-title">Cách đọc an toàn</h2>
          <p className="mv-note mt-4">{page.methodNote}</p>
          <p className="mv-body mt-4">{page.misreadWarning}</p>
        </section>

        <section className="mv-card mt-8">
          <h2 className="mv-section-title">Cần kiểm tra thêm trong lá số</h2>
          <ul className="mv-body mt-4 list-disc space-y-2 pl-5">
            {page.contextChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="mt-8 space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading} className="mv-card">
              <h2 className="mv-section-title">{section.heading}</h2>
              <div className="mv-body">
                {(section.content ?? []).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mv-card mt-10">
          <h2 className="mv-section-title">Câu hỏi tự kiểm chứng</h2>
          <ul className="mv-body mt-4 list-disc space-y-2 pl-5">
            {page.selfCheckQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </section>

        <section className="mv-card mt-10">
          <h2 className="mv-section-title">Ví dụ cách đọc đúng và sai</h2>
          <div className="mv-body">
            {page.wrongVsBetterExamples.map((example) => (
              <div key={example.wrong} className="rounded-xl border border-gold/30 bg-ivory/60 p-4">
                <p><strong>Không nên:</strong> {example.wrong}</p>
                <p><strong>Nên đọc:</strong> {example.better}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mv-card mt-10">
          <h2 className="mv-section-title">Liên kết nội bộ nên đọc tiếp</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.internalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="mv-link-card">
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
          <h2 className="mv-section-title-light">Muốn biết tổ hợp này nằm ở đâu trong toàn lá số?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7">
            Trước hết hãy hiểu cách lập lá số theo ngày giờ sinh, vì một tổ hợp sao×cung chỉ có ý nghĩa khi đặt trong toàn bộ Mệnh, Thân, Cục, 12 cung và Tứ Hóa.
          </p>
          <Link href="/lap-la-so/" className="mv-button-primary mt-5">
            Tìm hiểu cách lập lá số Tử Vi
          </Link>
        </section>
      </article>
    </main>
  )
}
