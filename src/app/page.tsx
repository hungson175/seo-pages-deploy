import Link from 'next/link'
import { Metadata } from 'next'
import { HomeChartForm } from '@/components/home/home-chart-form'
import { OrganizationSchema, WebSiteSchema } from '@/components/json-ld/json-ld'

export const metadata: Metadata = {
  title: 'Lập lá số Tử Vi ngay lập tức - Bói Toán',
  description:
    'Lập lá số Tử Vi nhanh theo ngày giờ sinh trên Bói Toán. Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán hay lời khẳng định tương lai.',
}

export default function HomePage() {
  const baseUrl = 'https://boitoan.com.vn'

  return (
    <main className="mv-page">
      <WebSiteSchema name="Bói Toán" url={baseUrl} />
      <OrganizationSchema
        name="Bói Toán"
        url={baseUrl}
        description="Nội dung Tử Vi, lá số và Kinh Dịch bằng tiếng Việt theo tinh thần tham khảo, rõ nguồn, không hù dọa."
      />

      <section className="mv-container pb-10 pt-4 sm:pt-6 lg:pb-14" data-testid="home-instant-chart-hero">
        <div className="mv-hero-card mx-auto grid max-w-6xl gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <div className="mb-5 mv-seal">命</div>
            <p className="mv-kicker">Bói Toán • Lập lá số Tử Vi</p>
            <h1 className="mv-h1-large mt-4">Lập lá số ngay lập tức</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
              Nhập ngày sinh và giờ sinh ngay tại đây để mở lá số và phần luận giải nền. SEO content và thư viện học Tử Vi được đưa xuống dưới để bạn không phải bấm vòng quanh.
            </p>
            <div className="mt-5 grid gap-3 text-sm text-ink-soft sm:grid-cols-3">
              <p className="rounded-2xl border border-rule bg-ivory/70 p-3"><strong className="text-ink">1.</strong> Nhập ngày giờ sinh</p>
              <p className="rounded-2xl border border-rule bg-ivory/70 p-3"><strong className="text-ink">2.</strong> Bấm lập lá số</p>
              <p className="rounded-2xl border border-rule bg-ivory/70 p-3"><strong className="text-ink">3.</strong> Xem trang luận giải</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gold/30 bg-white/35 p-3">
            <HomeChartForm />
            <Link href="/lap-la-so/" className="mt-3 inline-flex text-sm font-semibold text-vermillion underline underline-offset-4">
              Mở bản lập lá số chi tiết
            </Link>
          </div>
        </div>
      </section>

      <section id="home-seo-links" className="mv-container pb-14" data-testid="home-seo-content">
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/tu-vi/" className="mv-link-card">
            <p className="mv-meta">Thư viện Tử Vi</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">Đọc Tử Vi 2026</h2>
            <p className="mt-3 leading-7 text-ink-soft">Các bài nền, cung vị và chính tinh để bạn hiểu lá số sau khi lập.</p>
          </Link>
          <Link href="/cung/menh/" className="mv-link-card">
            <p className="mv-meta">Bắt đầu từ cung Mệnh</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">Hiểu 12 cung</h2>
            <p className="mt-3 leading-7 text-ink-soft">Nội dung nền đặt dưới fold để ưu tiên thao tác lập lá số trước.</p>
          </Link>
          <Link href="/sao/tu-vi/" className="mv-link-card">
            <p className="mv-meta">Chính tinh</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">Tra cứu sao Tử Vi</h2>
            <p className="mt-3 leading-7 text-ink-soft">Đọc thêm sau khi biết vị trí sao trong lá số của bạn.</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
