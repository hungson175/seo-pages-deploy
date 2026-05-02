import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { getSeoForecastPage, SEO_FORECAST_SLUGS } from '@/content/seo-forecasts'
import {
  ArticleSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
} from '@/components/json-ld/json-ld'

const BASE_URL = 'https://boitoan.vn'
const LAST_UPDATED = '2026-05-02'

export function generateStaticParams() {
  return SEO_FORECAST_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getSeoForecastPage(slug)

  if (!page) {
    return buildMetadata({
      title: 'Không tìm thấy',
      description: 'Trang bạn tìm không tồn tại.',
      path: `/tu-vi/${slug}/`,
      pageType: 'error',
    })
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/tu-vi/${slug}/`,
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

  const pageUrl = `${BASE_URL}/tu-vi/${page.slug}/`

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
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: `${BASE_URL}/` },
          { name: 'Tử vi 2026', url: `${BASE_URL}/tu-vi/` },
          { name: `Tuổi ${page.animal} ${page.year} ${page.genderLabel}`, url: pageUrl },
        ]}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Link href="/tu-vi/" className="text-sm font-semibold text-gold-light hover:text-gold">
          ← Tử vi 2026
        </Link>

        <header className="mt-6 rounded-3xl border border-gold/30 bg-white/[0.04] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">{page.canChi} • {page.element}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gold-light sm:text-4xl lg:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/75">{page.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-navy/70 p-4">
              <p className="text-xs uppercase tracking-wide text-white/45">Con giáp</p>
              <p className="mt-1 font-bold text-white">Tuổi {page.animal}</p>
            </div>
            <div className="rounded-2xl bg-navy/70 p-4">
              <p className="text-xs uppercase tracking-wide text-white/45">Năm sinh</p>
              <p className="mt-1 font-bold text-white">{page.year}</p>
            </div>
            <div className="rounded-2xl bg-navy/70 p-4">
              <p className="text-xs uppercase tracking-wide text-white/45">Giới tính</p>
              <p className="mt-1 font-bold text-white">{page.genderLabel}</p>
            </div>
          </div>
        </header>

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

        <p className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-gold-light">
          * Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Không dùng bài viết này để thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.
        </p>
      </article>
    </main>
  )
}
