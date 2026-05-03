import { Metadata } from 'next'
import { OrganizationSchema, WebSiteSchema } from '@/components/json-ld/json-ld'

export const metadata: Metadata = {
  title: 'Bói Toán - Trang chủ',
}

export default function HomePage() {
  const baseUrl = 'https://boitoan.com.vn'

  return (
    <main className="mv-page flex min-h-screen items-center justify-center p-8">
      <WebSiteSchema name="Bói Toán" url={baseUrl} />
      <OrganizationSchema
        name="Bói Toán"
        url={baseUrl}
        description="Nội dung Tử Vi, lá số và Kinh Dịch bằng tiếng Việt theo tinh thần tham khảo, rõ nguồn, không hù dọa."
      />
      <section className="mv-hero-card max-w-3xl text-center">
        <div className="mx-auto mb-6 mv-seal">命</div>
        <p className="mv-kicker">Bói Toán • Tử Vi Đẩu Số</p>
        <h1 className="mv-h1-large mt-4">Bói Toán</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ink-soft">
          Đọc Tử Vi 2026, tìm hiểu lá số Tử Vi và tra cứu Kinh Dịch theo tinh thần tham khảo, rõ nguồn, không hù dọa.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/tu-vi/" className="mv-button-primary">
            Xem Tử Vi 2026
          </a>
          <a href="/lap-la-so/" className="mv-button-secondary">
            Tìm hiểu lá số
          </a>
        </div>
      </section>
    </main>
  )
}
