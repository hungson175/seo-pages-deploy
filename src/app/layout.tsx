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
  title: 'Bói Toán - Đọc Tử Vi 2026, Lá Số Và Kinh Dịch',
  description:
    'Đọc Tử Vi 2026, tìm hiểu lá số Tử Vi và tra cứu Kinh Dịch theo tinh thần tham khảo, rõ nguồn, không hù dọa.',
  metadataBase: new URL('https://boitoan.com.vn'),
  openGraph: {
    title: 'Bói Toán - Đọc Tử Vi 2026, Lá Số Và Kinh Dịch',
    description:
      'Đọc Tử Vi 2026, tìm hiểu lá số Tử Vi và tra cứu Kinh Dịch theo tinh thần tham khảo, rõ nguồn, không hù dọa.',
    url: 'https://boitoan.com.vn',
    siteName: 'Bói Toán',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bói Toán - Đọc Tử Vi 2026, Lá Số Và Kinh Dịch',
    description:
      'Đọc Tử Vi 2026, tìm hiểu lá số Tử Vi và tra cứu Kinh Dịch theo tinh thần tham khảo, rõ nguồn, không hù dọa.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://boitoan.com.vn',
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
