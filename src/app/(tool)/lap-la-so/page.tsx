import type { Metadata } from 'next'
import LapLaSoClient from './client'

export const metadata: Metadata = {
  title: 'Lập Lá Số Tử Vi Online Miễn Phí - Bói Toán',
  description:
    'Lập lá số tử vi online miễn phí. Nhập ngày sinh, giờ sinh, giới tính để xem lá số chi tiết và 3 luận giải đầu tiên không tốn phí.',
  openGraph: {
    title: 'Lập Lá Số Tử Vi Online Miễn Phí - Bói Toán',
    description:
      'Lập lá số tử vi online miễn phí. Nhập ngày sinh, giờ sinh, giới tính để xem lá số chi tiết.',
    url: 'https://boitoan.vn/lap-la-so',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lập Lá Số Tử Vi Online Miễn Phí - Bói Toán',
    description:
      'Lập lá số tử vi online miễn phí. Nhập ngày sinh, giờ sinh, giới tính để xem lá số chi tiết.',
  },
  alternates: {
    canonical: 'https://boitoan.vn/lap-la-so',
  },
}

export default function LapLaSoPage() {
  return <LapLaSoClient />
}
