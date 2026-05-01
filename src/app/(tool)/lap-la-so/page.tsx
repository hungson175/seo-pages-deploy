'use client'

import { useState } from 'react'
import {
  HowToSchema,
  FAQPageSchema,
  BreadcrumbListSchema,
} from '@/components/json-ld/json-ld'

const TIME_PERIODS = [
  'Tý (23h-01h)', 'Sửu (01h-03h)', 'Dần (03h-05h)', 'Mão (05h-07h)',
  'Thìn (07h-09h)', 'Tỵ (09h-11h)', 'Ngọ (11h-13h)', 'Mùi (13h-15h)',
  'Thân (15h-17h)', 'Dậu (17h-19h)', 'Tuất (19h-21h)', 'Hợi (21h-23h)',
]

const FAQS = [
  {
    question: 'Lập lá số tử vi có mất phí không?',
    answer:
      'Công cụ lập lá số tử vi cơ bản trên Bói Toán là miễn phí. Bạn có thể xem lá số và 3 luận giải đầu tiên không mất phí.',
  },
  {
    question: 'Thông tin cá nhân có được bảo mật không?',
    answer:
      'Chúng tôi không lưu trữ thông tin cá nhân của bạn. Dữ liệu chỉ được sử dụng để tạo lá số trong phiên làm việc hiện tại.',
  },
  {
    question: 'Lá số tử vi có chính xác không?',
    answer:
      'Lá số được tạo dựa trên thuật toán tử vi truyền thống. Tuy nhiên, kết quả chỉ mang tính chất tham khảo và không phải là lờii tiên đoán tuyệt đối.',
  },
  {
    question: 'Tôi có thể xem lá số của người thân không?',
    answer:
      'Có, bạn có thể nhập thông tin của người thân để xem lá số. Tuy nhiên, hãy tôn trọng quyền riêng tư của họ.',
  },
  {
    question: 'Làm sao để hiểu lá số tử vi?',
    answer:
      'Mỗi lá số bao gồm 12 cung và các sao. Bói Toán cung cấp luận giải chi tiết cho từng cung để bạn dễ dàng hiểu.',
  },
]

export default function LapLaSoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newErrors: Record<string, string> = {}

    const birthDate = form.get('birth_date') as string
    const birthTime = form.get('birth_time') as string
    const gender = form.get('gender') as string

    if (!birthDate) newErrors.birth_date = 'Vui lòng chọn ngày sinh'
    if (!birthTime) newErrors.birth_time = 'Vui lòng chọn giờ sinh'
    if (!gender) newErrors.gender = 'Vui lòng chọn giới tính'

    if (birthDate) {
      const d = new Date(birthDate)
      const now = new Date()
      if (d.getFullYear() < 1900 || d > now) {
        newErrors.birth_date = 'Ngày sinh không hợp lệ'
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <BreadcrumbListSchema
        items={[
          { name: 'Trang chủ', url: 'https://boitoan.vn/' },
          { name: 'Lập lá số', url: 'https://boitoan.vn/lap-la-so' },
        ]}
      />
      <HowToSchema
        name="Cách lập lá số tử vi"
        description="Hướng dẫn lập lá số tử vi online miễn phí"
        steps={[
          {
            name: 'Nhập thông tin',
            text: 'Điền họ tên, ngày sinh, giờ sinh và giới tính',
            url: 'https://boitoan.vn/lap-la-so#form',
          },
          {
            name: 'Xem lá số',
            text: 'Hệ thống tự động tạo lá số tử vi dựa trên thông tin',
            url: 'https://boitoan.vn/lap-la-so#chart',
          },
          {
            name: 'Đọc luận giải',
            text: 'Xem 3 luận giải miễn phí về vận mệnh, công danh và tình duyên',
            url: 'https://boitoan.vn/lap-la-so#insights',
          },
        ]}
      />

      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
          Lập Lá Số Tử Vi
        </h1>
        <p className="text-navy-200 max-w-xl mx-auto">
          Nhập thông tin để xem lá số tử vi chi tiết — miễn phí. 3 luận giải đầu tiên không tốn phí.
        </p>
      </section>

      {/* Form */}
      <section id="form" className="mb-12">
        <form
          onSubmit={handleSubmit}
          className="bg-navy-800 border border-navy-700 rounded-xl p-6 md:p-8 space-y-6"
          noValidate
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy-200 mb-1">
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nguyễn Văn A"
              className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-3 text-white placeholder-navy-500 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="birth_date" className="block text-sm font-medium text-navy-200 mb-1">
              Ngày sinh <span className="text-gold-400">*</span>
            </label>
            <input
              id="birth_date"
              name="birth_date"
              type="date"
              className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
            />
            {errors.birth_date && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.birth_date}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="birth_time" className="block text-sm font-medium text-navy-200 mb-1">
              Giờ sinh <span className="text-gold-400">*</span>
            </label>
            <select
              id="birth_time"
              name="birth_time"
              defaultValue=""
              className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
            >
              <option value="" disabled>
                Chọn giờ sinh
              </option>
              {TIME_PERIODS.map((t, i) => (
                <option key={i} value={i}>
                  {t}
                </option>
              ))}
            </select>
            {errors.birth_time && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.birth_time}
              </p>
            )}
          </div>

          <div>
            <span className="block text-sm font-medium text-navy-200 mb-2">
              Giới tính <span className="text-gold-400">*</span>
            </span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="nam"
                  className="accent-gold-500"
                />
                <span className="text-navy-200">Nam</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="nu"
                  className="accent-gold-500"
                />
                <span className="text-navy-200">Nữ</span>
              </label>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.gender}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gold-500 text-navy-950 font-semibold py-3 hover:bg-gold-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300"
          >
            Xem Lá Số
          </button>
        </form>
      </section>

      {/* Chart Placeholder */}
      {submitted && (
        <section id="chart" className="mb-12">
          <div className="bg-navy-800 border border-navy-700 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-gold-300 mb-2">
              Lá Số Tử Vi
            </h2>
            <p className="text-navy-300">
              Đang tạo lá số... (iztro chart integration — Sprint 2)
            </p>
          </div>
        </section>
      )}

      {/* Insights Placeholder */}
      {submitted && (
        <section id="insights" className="mb-12">
          <div className="bg-navy-800 border border-navy-700 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-gold-300 mb-2">
              Luận Giải
            </h2>
            <p className="text-navy-300">
              Nhập thông tin để xem luận giải chi tiết. (LLM insights — Sprint 2)
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-navy-800 to-navy-900 border border-gold-700 rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-xl font-semibold text-gold-300 mb-2">
            Luận Giải Sâu — Chỉ 99.000đ
          </h2>
          <p className="text-navy-200 mb-4">
            Nhận báo cáo tử vi đầy đủ 12 cung với luận giải chi tiết từ chuyên gia.
          </p>
          <button className="rounded-lg bg-gold-500 text-navy-950 font-semibold px-6 py-2 hover:bg-gold-400 transition-colors">
            Mua Ngay
          </button>
          <p className="mt-3 text-xs text-navy-400">
            * Kết quả chỉ mang tính chất tham khảo, không phải lờii tiên đoán.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gold-400 mb-6">
          Câu Hỏi Thường Gặp
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="bg-navy-800 border border-navy-700 rounded-lg group"
            >
              <summary className="px-4 py-3 cursor-pointer font-medium text-navy-200 hover:text-gold-300 transition-colors list-none flex justify-between items-center">
                {faq.question}
                <span className="text-gold-500 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="px-4 pb-4 text-navy-300">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <FAQPageSchema faqs={FAQS} />

      <p className="text-sm text-navy-400 text-center">
        * Nội dung chỉ mang tính chất tham khảo, không phải lờii tiên đoán.
      </p>
    </main>
  )
}
