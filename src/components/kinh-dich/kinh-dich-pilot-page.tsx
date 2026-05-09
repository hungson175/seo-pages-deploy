import Link from 'next/link'
import {
  ArticleSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  HowToSchema,
  JsonLd,
} from '@/components/json-ld/json-ld'
import type { KinhDichPilotPage } from '@/content/kinh-dich-gieo-que-pilot'

const SITE_URL = 'https://boitoan.com.vn'

function isRenderableLink(href: string): boolean {
  return !href.startsWith('/blog/')
}

function webApplicationSchemaFor(page: KinhDichPilotPage) {
  if (!page.schemaTypes.includes('WebApplication')) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: page.h1,
    url: `${SITE_URL}${page.path}`,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    inLanguage: 'vi',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
    },
    description: page.description,
  }
}

function CtaStack({ page }: { page: KinhDichPilotPage }) {
  const [primary, secondary, tertiary] = page.ctas

  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link className="mv-button-primary" href={primary.href}>
        {primary.label}
      </Link>
      <Link className="mv-button-secondary bg-[rgba(245,240,225,0.72)]" href={secondary.href}>
        {secondary.label}
      </Link>
      <Link className="mv-button-secondary bg-[rgba(245,240,225,0.72)]" href={tertiary.href}>
        {tertiary.label}
      </Link>
    </div>
  )
}

function Section({ section }: { section: KinhDichPilotPage['sections'][number] }) {
  return (
    <section className="mv-card mt-8">
      <h2 className="mv-section-title">{section.heading}</h2>
      <div className="mv-body">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.bullets ? (
          <ul className="mt-5 list-disc space-y-2 pl-5">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

function FreeFlowPreview({ page }: { page: KinhDichPilotPage }) {
  return (
    <section id="gieo-que-mien-phi" className="mv-cta mt-10 text-left">
      <p className="mv-kicker">Trên web trước</p>
      <h2 className="mv-section-title-light mt-3">Bắt đầu trên web</h2>
      <p className="mt-4 text-base leading-7">
        Nhập một câu hỏi cụ thể, lập quẻ trên web, rồi đọc gợi ý theo ngôn ngữ có điều kiện.
        App chỉ xuất hiện sau đó nếu bạn muốn lưu kết quả.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="rounded-2xl border border-[rgba(201,169,97,0.45)] bg-[rgba(245,240,225,0.08)] p-4 text-sm text-[rgba(245,240,225,0.78)]">
          Ví dụ câu hỏi: “Có nên chọn hướng này trong tháng tới không?”
        </div>
        <Link className="mv-button-primary" href={page.ctas[0].href}>
          {page.ctas[0].label}
        </Link>
      </div>
      <p className="mt-4 text-sm text-[rgba(245,240,225,0.66)]">{page.ctas[0].note}</p>
    </section>
  )
}

function HexagramHub({ page }: { page: KinhDichPilotPage }) {
  if (!page.reviewedHexagramLinks || !page.unrevisedHexagramNames) return null

  return (
    <>
      <section className="mv-card mt-8">
        <h2 className="mv-section-title">Quẻ đã có nội dung đã rà soát</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {page.reviewedHexagramLinks.map((que) => (
            <Link className="mv-link-card" href={que.href} key={que.href}>
              <span className="mv-meta">Đã rà soát</span>
              <span className="mt-1 block font-serif text-xl text-[var(--indigo)]">{que.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mv-card mt-8">
        <h2 className="mv-section-title">Tên quẻ đang chờ rà soát</h2>
        <p className="mv-body">
          Chỉ hiển thị tên để giữ cấu trúc 64 quẻ; chưa có bài diễn giải công khai cho nhóm này.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {page.unrevisedHexagramNames.map((que) => (
            <div className="rounded-xl border border-[rgba(212,199,163,0.72)] bg-[rgba(236,229,210,0.56)] p-3 text-sm" key={que.number}>
              <span className="mv-muted">#{que.number}</span> {que.name}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export function KinhDichPilotPageView({ page }: { page: KinhDichPilotPage }) {
  const appSchema = webApplicationSchemaFor(page)

  return (
    <main className="mv-page">
      {page.schemaTypes.includes('Article') ? (
        <ArticleSchema
          headline={page.h1}
          description={page.description}
          url={`${SITE_URL}${page.path}`}
          datePublished="2026-05-09"
          dateModified="2026-05-09"
          authorName="Bói Toán"
        />
      ) : null}
      {appSchema ? <JsonLd data={appSchema} /> : null}
      {page.schemaTypes.includes('HowTo') && page.howToSteps ? (
        <HowToSchema name={page.h1} description={page.description} steps={page.howToSteps} />
      ) : null}
      <FAQPageSchema faqs={page.faqs} />
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: `${SITE_URL}/` },
          { name: 'Kinh Dịch', url: `${SITE_URL}/kinh-dich/gieo-que/` },
          { name: page.h1, url: `${SITE_URL}${page.path}` },
        ]}
      />

      <article className="mv-article">
        <header className="mv-hero-card">
          <div className="mb-5 mv-seal">易</div>
          <p className="mv-kicker">{page.kicker}</p>
          <h1 className="mv-h1">{page.h1}</h1>
          <div className="mv-lede">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <CtaStack page={page} />
        </header>

        <section className="mv-card mt-8">
          <h2 className="mv-section-title">Ranh giới Gieo quẻ và Giải quẻ</h2>
          <p className="mv-body">{page.splitNote}</p>
        </section>

        {page.sections.map((section) => (
          <Section key={section.heading} section={section} />
        ))}

        <HexagramHub page={page} />
        <FreeFlowPreview page={page} />

        <section id="luu-ket-qua" className="mv-card mt-8">
          <h2 className="mv-section-title">Sau khi có kết quả</h2>
          <div className="mv-body">
            <p>{page.ctas[1].note}</p>
            <p>{page.ctas[2].note}</p>
          </div>
        </section>

        <section className="mv-card mt-8">
          <h2 className="mv-section-title">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-4">
            {page.faqs.map((faq) => (
              <div className="mv-faq" key={faq.question}>
                <h3 className="font-semibold text-[var(--indigo)]">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mv-card mt-8">
          <h2 className="mv-section-title">Liên kết liên quan</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.relatedLinks.filter((link) => isRenderableLink(link.href)).map((link) => (
              <Link className="mv-link-card" href={link.href} key={`${link.href}-${link.label}`}>
                <span className="mv-meta">{link.relation}</span>
                <span className="mt-1 block font-semibold">{link.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <p className="mv-disclaimer mt-10">
          * {page.topDisclaimer} Nội dung không phải lời tiên đoán và không khẳng định tương lai.
        </p>
      </article>
    </main>
  )
}
