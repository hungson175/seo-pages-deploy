import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bói Toán - Trang chủ',
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
        Bói Toán
      </h1>
      <p className="text-lg text-gray-300 max-w-xl text-center mb-8">
        Xem tử vi trọn đời, lập lá số tử vi, gieo quẻ Kinh Dịch online.
      </p>
      <div className="flex gap-4">
        <a
          href="/lap-la-so/"
          className="px-6 py-3 bg-gold text-navy font-semibold rounded hover:bg-gold-light transition"
        >
          Lập Lá Số Tử Vi
        </a>
        <a
          href="/tuvi/"
          className="px-6 py-3 border border-gold text-gold font-semibold rounded hover:bg-gold/10 transition"
        >
          Xem Tử Vi
        </a>
      </div>
    </main>
  )
}
