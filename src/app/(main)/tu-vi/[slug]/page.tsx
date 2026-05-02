import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { getAnimalHubPage, ANIMAL_HUB_SLUGS } from '@/content/animal-hubs'
import { getSeoForecastPage, SEO_FORECAST_SLUGS } from '@/content/seo-forecasts'
import {
  BreadcrumbListSchema,
  FAQPageSchema,
  JsonLd,
} from '@/components/json-ld/json-ld'

const BASE_URL = 'https://boitoan.vn'
const LAST_UPDATED = '2026-05-02'

export function generateStaticParams() {
  return [...ANIMAL_HUB_SLUGS, ...SEO_FORECAST_SLUGS].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const animalHub = getAnimalHubPage(slug)

  if (animalHub) {
    return buildMetadata({
      title: animalHub.title,
      description: animalHub.description,
      path: animalHub.urlPath,
      pageType: 'hub',
    })
  }

  const legacyForecast = getSeoForecastPage(slug)
  if (legacyForecast) {
    return buildMetadata({
      title: 'Trang đã chuyển sang /tu-vi-2026/',
      description: 'Trang tử vi năm sinh đã được chuyển sang URL Can Chi chuẩn SEO.',
      path: legacyForecast.legacyUrlPath,
      pageType: 'error',
    })
  }

  return buildMetadata({
    title: 'Không tìm thấy',
    description: 'Trang bạn tìm không tồn tại.',
    path: `/tu-vi/${slug}/`,
    pageType: 'error',
  })
}

export default async function TuViAnimalOrLegacyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const legacyForecast = getSeoForecastPage(slug)
  const animalHub = getAnimalHubPage(slug)

  if (legacyForecast && !animalHub) {
    permanentRedirect(legacyForecast.urlPath)
  }

  if (!animalHub) notFound()

  const pageUrl = `${BASE_URL}${animalHub.urlPath}`
  const breadcrumbItems = [
    { name: 'Trang chủ', url: `${BASE_URL}/` },
    { name: 'Tử vi 2026', url: `${BASE_URL}/tu-vi/` },
    { name: `Tuổi ${animalHub.animal}`, url: pageUrl },
  ]

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#17243b_0,#0a1628_46%,#050914_100%)] text-white">
      <BreadcrumbListSchema items={breadcrumbItems} />
      <FAQPageSchema faqs={animalHub.faqs} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: animalHub.h1,
          description: animalHub.description,
          url: pageUrl,
          inLanguage: 'vi',
          datePublished: LAST_UPDATED,
          dateModified: LAST_UPDATED,
          isPartOf: {
            '@type': 'WebSite',
            name: 'Bói Toán',
            url: BASE_URL,
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: animalHub.linkedForecasts.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${BASE_URL}${item.href}`,
              name: item.title,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: animalHub.h1,
          description: animalHub.description,
          url: pageUrl,
          inLanguage: 'vi',
        }}
      />

      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-white/60">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/" className="hover:text-gold-light">Trang chủ</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tu-vi/" className="hover:text-gold-light">Tử vi 2026</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gold-light">Tuổi {animalHub.animal}</li>
          </ol>
        </nav>

        <header className="mt-6 rounded-3xl border border-gold/30 bg-white/[0.04] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Animal hub • Tử vi 2026</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gold-light sm:text-5xl">{animalHub.h1}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
            Tổng hợp các bài tử vi tuổi {animalHub.animal} theo năm sinh và giới tính. Trang này giúp bạn chọn đúng bài chi tiết, hiểu giới hạn của bản xem theo tuổi, và chuyển sang lập lá số cá nhân khi cần đọc theo ngày giờ sinh.
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Các bài tử vi tuổi {animalHub.animal} đã có</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {animalHub.linkedForecasts.map((forecast) => (
              <Link
                key={forecast.href}
                href={forecast.href}
                className="rounded-2xl border border-white/10 bg-navy/70 p-5 transition hover:border-gold/60 hover:bg-gold/10"
              >
                <p className="text-sm font-semibold text-gold-light">{forecast.canChi} • {forecast.year} • {forecast.genderLabel}</p>
                <h2 className="mt-2 text-xl font-bold text-white">{forecast.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/65">{forecast.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gold-light">Vì sao nên chọn đúng năm sinh và giới tính?</h2>
          <div className="mt-4 space-y-4 leading-8 text-white/75">
            <p>
              Cùng là tuổi {animalHub.animal}, mỗi năm sinh lại có Can Chi và nạp âm khác nhau. Nam mạng và nữ mạng cũng được người đọc tìm kiếm theo bối cảnh đời sống khác nhau. Vì vậy hub này không gộp tất cả thành một bài chung, mà dẫn bạn đến từng trang năm sinh để nội dung cụ thể hơn.
            </p>
            <p>
              Dù vậy, các bài theo tuổi vẫn chỉ là tổng quan. Lá số cá nhân cần ngày sinh và giờ sinh để xác định Mệnh Cung, Thân Cung, Cục và vị trí sao. Bói Toán không giả lập sao/cung khi chưa có đủ dữ liệu ngày giờ sinh.
            </p>
            <p className="rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm leading-7 text-gold-light">
              {animalHub.methodNote}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-gold/30 bg-gold/10 p-6 text-center">
          <h2 className="text-2xl font-bold text-gold-light">Muốn đọc sâu hơn tuổi {animalHub.animal}?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/75">
            Hãy lập lá số cá nhân hóa theo ngày giờ sinh để xem Mệnh Cung, Thân Cung và các insight đầu tiên thay vì chỉ đọc bản tổng quan theo tuổi.
          </p>
          <Link href="/lap-la-so/" className="mt-5 inline-flex rounded-lg bg-gold px-6 py-3 font-bold text-navy transition hover:bg-gold-light">
            Lập lá số Tử Vi miễn phí
          </Link>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-3">
            {animalHub.faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl bg-navy/70 p-4">
                <summary className="cursor-pointer list-none font-semibold text-gold-light marker:hidden">{faq.question}</summary>
                <p className="mt-3 leading-7 text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-gold-light">
          * Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Bói Toán là nội dung giải trí và thuật toán tham khảo theo văn hóa Tử Vi; không dùng bài viết này để thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.
        </p>
      </article>
    </main>
  )
}
