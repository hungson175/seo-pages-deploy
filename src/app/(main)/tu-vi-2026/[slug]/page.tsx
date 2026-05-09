import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { getSeoForecastPage, SEO_FORECAST_CANONICAL_SLUGS } from '@/content/seo-forecasts'
import {
  PALACE_IMAGE_ASSETS,
  getPalaceImageForForecastSection,
} from '@/content/palace-images'
import {
  ArticleSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  JsonLd,
} from '@/components/json-ld/json-ld'
import { MethodLimitModule } from '@/components/trust/method-limit'
import { ConversionCTA } from '@/components/trust/conversion-cta'
import { TrustBox } from '@/components/trust/trust-box'
import { PalaceImageFigure } from '@/components/seo/palace-image'

const BASE_URL = 'https://boitoan.com.vn'
const LAST_UPDATED = '2026-05-05'
type ForecastPage = NonNullable<ReturnType<typeof getSeoForecastPage>>
type ForecastCta = NonNullable<ForecastPage['ctaModules']>[number]

function ForecastCtaCard({ cta, className = '' }: { cta: ForecastCta; className?: string }) {
  return (
    <section className={`mv-cta ${className}`}>
      <h2 className="mv-section-title-light">{cta.heading}</h2>
      <p className="mx-auto mt-3 max-w-2xl leading-7">{cta.body}</p>
      <Link href={cta.href} className="mv-button-primary mt-5">
        {cta.buttonLabel}
      </Link>
      <p className="mt-3 text-xs text-ivory/70">{cta.complianceNote}</p>
    </section>
  )
}

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
    <main className="mv-page">
      <ArticleSchema
        headline={page.h1}
        description={page.description}
        url={pageUrl}
        datePublished={LAST_UPDATED}
        dateModified={LAST_UPDATED}
        authorName="Bói Toán"
        image={`${BASE_URL}${PALACE_IMAGE_ASSETS.menh.src}`}
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
          image: `${BASE_URL}${PALACE_IMAGE_ASSETS.menh.src}`,
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

      <article className="mv-article">
        <nav aria-label="Breadcrumb" className="mv-breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/tu-vi/">Tử vi 2026</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{page.canChi} {page.year} {page.genderLabel}</li>
          </ol>
        </nav>

        <header className="mv-hero-card">
          <div className="mb-5 mv-seal">命</div>
          <p className="mv-kicker">
            {page.canChi} • Nạp âm {page.element}
          </p>
          <h1 className="mv-h1">
            {page.h1}
          </h1>
          {page.topDisclaimer && (
            <p className="mv-note mt-5">
              {page.topDisclaimer}
            </p>
          )}
          {page.aiNativeWrapper && (
            <p className="mt-4 leading-8 text-ivory/80">
              {page.aiNativeWrapper}
            </p>
          )}
          <div className="mv-lede">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="mv-card-indigo">
              <p className="text-xs uppercase tracking-wide text-ivory/45">Con giáp</p>
              <p className="mt-1 font-bold text-ivory">Tuổi {page.animal}</p>
            </div>
            <div className="mv-card-indigo">
              <p className="text-xs uppercase tracking-wide text-ivory/45">Can chi</p>
              <p className="mt-1 font-bold text-ivory">{page.canChi}</p>
            </div>
            <div className="mv-card-indigo">
              <p className="text-xs uppercase tracking-wide text-ivory/45">Giới tính</p>
              <p className="mt-1 font-bold text-ivory">{page.genderLabel}</p>
            </div>
          </div>
        </header>

        <section id="tom-tat-nhanh" className="mv-card mt-8">
          <h2 className="mv-section-title">Bảng nhanh các phương diện chính trong năm 2026</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="mv-table min-w-[680px]">
              <thead>
                <tr>
                  <th className="py-3 pr-4 font-semibold">Phương diện</th>
                  <th className="px-4 py-3 font-semibold">Xu hướng tham khảo</th>
                  <th className="py-3 pl-4 font-semibold">Gợi ý hành động</th>
                </tr>
              </thead>
              <tbody>
                {page.summaryRows.map((row) => (
                  <tr key={row.aspect}>
                    <th className="py-4 pr-4 align-top font-semibold">{row.aspect}</th>
                    <td className="px-4 py-4 align-top">{row.trend}</td>
                    <td className="py-4 pl-4 align-top">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mv-note mt-6">
            Bài này mới xem theo tuổi và giới tính. Muốn đọc theo ngày giờ sinh của riêng bạn, hãy xem trang{' '}
            <Link href="/lap-la-so/" className="font-bold text-vermillion underline underline-offset-4">
              lập lá số Tử Vi online
            </Link>{' '}
            để hiểu thông tin cần chuẩn bị trước khi đọc lá số cá nhân.
          </div>
        </section>

        {page.ctaModules
          ?.filter((cta) => cta.placement === 'after-summary')
          .map((cta) => (
            <ForecastCtaCard key={cta.placement} cta={cta} className="mt-8" />
          ))}

        <section className="mv-card mt-8">
          <h2 className="mv-section-title">Vì sao bài theo tuổi chỉ là tổng quan?</h2>
          <p className="mt-4 leading-8 text-ink-soft">
            Bài theo tuổi chỉ có năm sinh và giới tính, nên không thể xác định chính xác Mệnh Cung, Thân Cung, Cục và vị trí sao trong 12 cung. Lá số cá nhân cần ngày sinh và giờ sinh để an cung đúng hơn. Vì vậy trang này dùng để đọc tổng quan, còn phần cá nhân hóa phải đi qua dữ liệu ngày giờ sinh riêng.
          </p>
          <p className="mv-note mt-4">
            {page.methodNote}
          </p>
        </section>

        <MethodLimitModule pageType="forecast" className="mt-8" />

        <div className="mt-8 space-y-8">
          {page.sections.map((section, index) => {
            const palaceImage = getPalaceImageForForecastSection(section.heading)

            return (
              <div key={section.heading} className="space-y-8">
                <section className="mv-card">
                  <h2 className="mv-section-title">{section.heading}</h2>
                  {palaceImage && (
                    <PalaceImageFigure
                      asset={palaceImage}
                      compact
                      linkToPalace
                      className="mt-5"
                    />
                  )}
                  <div className="mv-body">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
                {index === 2 && page.ctaModules
                  ?.filter((cta) => cta.placement === 'mid-article')
                  .map((cta) => (
                    <ForecastCtaCard key={cta.placement} cta={cta} />
                  ))}
              </div>
            )
          })}
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

        {page.ctaModules
          ?.filter((cta) => cta.placement === 'end-of-article')
          .map((cta) => (
            <ForecastCtaCard key={cta.placement} cta={cta} className="mt-10" />
          ))}

        <ConversionCTA pageType="forecast" className="mt-10" />

        <TrustBox variant="short" className="mt-8" />

        <p className="mv-disclaimer mt-10">
          * Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Bói Toán là nội dung giải trí và thuật toán tham khảo theo văn hóa Tử Vi; không dùng bài viết này để thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.
        </p>

        {page.stickyMobileCta && (
          <div className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-gold/30 bg-navy/95 p-3 shadow-2xl md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ivory">{page.stickyMobileCta.heading}</p>
                <p className="text-xs text-ivory/70">{page.stickyMobileCta.complianceNote}</p>
              </div>
              <Link href={page.stickyMobileCta.href} className="mv-button-primary shrink-0 px-3 py-2 text-xs">
                {page.stickyMobileCta.buttonLabel}
              </Link>
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
