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

const BASE_URL = 'https://boitoan.com.vn'
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
    <main className="mv-page">
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
        <nav aria-label="Breadcrumb" className="mv-breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/">Trang chủ</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tu-vi/">Tử vi 2026</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Tuổi {animalHub.animal}</li>
          </ol>
        </nav>

        <header className="mv-hero-card">
          <div className="mb-5 mv-seal">支</div>
          <p className="mv-kicker">Animal hub • Tử vi 2026</p>
          <h1 className="mv-h1-large">{animalHub.h1}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">
            Tổng hợp các bài tử vi tuổi {animalHub.animal} theo năm sinh và giới tính. Trang này giúp bạn chọn đúng bài chi tiết, hiểu giới hạn của bản xem theo tuổi, và chuyển sang lập lá số cá nhân khi cần đọc theo ngày giờ sinh.
          </p>
        </header>

        <section className="mv-card mt-8">
          <h2 className="mv-section-title">Các bài tử vi tuổi {animalHub.animal} đã có</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {animalHub.linkedForecasts.map((forecast) => (
              <Link
                key={forecast.href}
                href={forecast.href}
                className="mv-link-card p-5"
              >
                <p className="mv-meta">{forecast.canChi} • {forecast.year} • {forecast.genderLabel}</p>
                <h2 className="mt-2 font-serif text-xl font-semibold text-navy">{forecast.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{forecast.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mv-card mt-8">
          <h2 className="mv-section-title">Vì sao nên chọn đúng năm sinh và giới tính?</h2>
          <div className="mv-body">
            <p>
              Cùng là tuổi {animalHub.animal}, mỗi năm sinh lại có Can Chi và nạp âm khác nhau. Nam mạng và nữ mạng cũng được người đọc tìm kiếm theo bối cảnh đời sống khác nhau. Vì vậy hub này không gộp tất cả thành một bài chung, mà dẫn bạn đến từng trang năm sinh để nội dung cụ thể hơn.
            </p>
            <p>
              Dù vậy, các bài theo tuổi vẫn chỉ là tổng quan. Lá số cá nhân cần ngày sinh và giờ sinh để xác định Mệnh Cung, Thân Cung, Cục và vị trí sao. Bói Toán không giả lập sao/cung khi chưa có đủ dữ liệu ngày giờ sinh.
            </p>
            <p className="mv-note">
              {animalHub.methodNote}
            </p>
          </div>
        </section>

        <section className="mv-cta mt-8">
          <h2 className="mv-section-title-light">Muốn đọc sâu hơn tuổi {animalHub.animal}?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7">
            Hãy xem cách lập lá số theo ngày giờ sinh để hiểu vì sao Mệnh Cung, Thân Cung, Cục và vị trí sao không thể suy ra chỉ từ năm sinh.
          </p>
          <Link href="/lap-la-so/" className="mv-button-primary mt-5">
            Tìm hiểu cách lập lá số Tử Vi
          </Link>
        </section>

        <section className="mv-card mt-10">
          <h2 className="mv-section-title">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-3">
            {animalHub.faqs.map((faq) => (
              <details key={faq.question} className="mv-faq">
                <summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">{faq.question}</summary>
                <p className="mt-3 leading-7 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mv-disclaimer mt-10">
          * Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Bói Toán là nội dung giải trí và thuật toán tham khảo theo văn hóa Tử Vi; không dùng bài viết này để thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.
        </p>
      </article>
    </main>
  )
}
