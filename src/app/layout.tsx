import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Bói Toán - Xem Tử Vi, Gieo Quẻ Kinh Dịch Online',
  description:
    'Xem tử vi trọn đờii, lập lá số tử vi, gieo quẻ Kinh Dịch online miễn phí. Tham khảo vận mệnh, sự nghiệp, tình duyên theo phương pháp cổ truyền Việt Nam.',
  metadataBase: new URL('https://boitoan.vn'),
  openGraph: {
    title: 'Bói Toán - Xem Tử Vi, Gieo Quẻ Kinh Dịch Online',
    description:
      'Xem tử vi trọn đờii, lập lá số tử vi, gieo quẻ Kinh Dịch online miễn phí.',
    url: 'https://boitoan.vn',
    siteName: 'Bói Toán',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bói Toán - Xem Tử Vi, Gieo Quẻ Kinh Dịch Online',
    description:
      'Xem tử vi trọn đờii, lập lá số tử vi, gieo quẻ Kinh Dịch online miễn phí.',
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
    <html lang="vi">
      <body className={`${inter.variable} font-sans bg-navy text-white`}>
        {children}
      </body>
    </html>
  )
}
