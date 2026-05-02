import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Bói Toán - Xem Tử Vi, Gieo Quẻ Kinh Dịch Online',
  description:
    'Xem tử vi trọn đời, lập lá số tử vi, gieo quẻ Kinh Dịch online miễn phí. Tham khảo vận mệnh, sự nghiệp, tình duyên theo phương pháp cổ truyền Việt Nam.',
  metadataBase: new URL('https://boitoan.vn'),
  openGraph: {
    title: 'Bói Toán - Xem Tử Vi, Gieo Quẻ Kinh Dịch Online',
    description:
      'Xem tử vi trọn đời, lập lá số tử vi, gieo quẻ Kinh Dịch online miễn phí.',
    url: 'https://boitoan.vn',
    siteName: 'Bói Toán',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bói Toán - Xem Tử Vi, Gieo Quẻ Kinh Dịch Online',
    description:
      'Xem tử vi trọn đời, lập lá số tử vi, gieo quẻ Kinh Dịch online miễn phí.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://boitoan.vn',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-ivory text-ink">
        {children}
      </body>
    </html>
  )
}
