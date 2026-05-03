'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

const BIRTH_HOURS = [
  { value: 'Ty', label: 'Tý (23h-01h)' },
  { value: 'Suu', label: 'Sửu (01h-03h)' },
  { value: 'Dan', label: 'Dần (03h-05h)' },
  { value: 'Mao', label: 'Mão (05h-07h)' },
  { value: 'Thin', label: 'Thìn (07h-09h)' },
  { value: 'Ti', label: 'Tỵ (09h-11h)' },
  { value: 'Ngo', label: 'Ngọ (11h-13h)' },
  { value: 'Mui', label: 'Mùi (13h-15h)' },
  { value: 'Than', label: 'Thân (15h-17h)' },
  { value: 'Dau', label: 'Dậu (17h-19h)' },
  { value: 'Tuat', label: 'Tuất (19h-21h)' },
  { value: 'Hoi', label: 'Hợi (21h-23h)' },
]

export function HomeChartForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [gender, setGender] = useState('Nam')
  const [birthDate, setBirthDate] = useState('')
  const [birthHour, setBirthHour] = useState('Ngo')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!birthDate || !birthHour) {
      setError('Vui lòng nhập ngày sinh và giờ sinh để lập lá số.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/chart', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Bạn',
          gender,
          birthDate,
          birthHour,
        }),
      })

      const data = await response.json().catch(() => null)
      const chartId = data?.chartId

      if (!response.ok || !chartId) {
        throw new Error('chart_create_failed')
      }

      router.push(`/reading/${chartId}`)
    } catch {
      setError('Chưa thể lập lá số lúc này. Bạn thử lại sau ít phút hoặc mở trang lập lá số chi tiết.')
      setIsSubmitting(false)
    }
  }

  return (
    <form
      aria-label="Lập lá số Tử Vi nhanh"
      className="mt-6 rounded-3xl border border-gold/40 bg-ivory/95 p-4 text-left shadow-[0_18px_50px_rgba(42,36,24,0.12)] sm:p-5"
      data-testid="home-chart-form"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3 md:grid-cols-[1.1fr_0.85fr_0.95fr_1fr]">
        <label className="block text-sm font-semibold text-ink" htmlFor="home-name">
          Tên gọi
          <input
            id="home-name"
            name="name"
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-rule bg-white/80 px-3 py-3 text-base text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
            onChange={(event) => setName(event.target.value)}
            placeholder="Bạn"
            type="text"
            value={name}
          />
        </label>

        <label className="block text-sm font-semibold text-ink" htmlFor="home-gender">
          Giới tính
          <select
            id="home-gender"
            name="gender"
            className="mt-2 w-full rounded-xl border border-rule bg-white/80 px-3 py-3 text-base text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
            onChange={(event) => setGender(event.target.value)}
            value={gender}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-ink" htmlFor="home-birth-date">
          Ngày sinh
          <input
            id="home-birth-date"
            name="birthDate"
            aria-label="Ngày sinh dương lịch"
            className="mt-2 w-full rounded-xl border border-rule bg-white/80 px-3 py-3 text-base text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
            onChange={(event) => setBirthDate(event.target.value)}
            required
            type="date"
            value={birthDate}
          />
        </label>

        <label className="block text-sm font-semibold text-ink" htmlFor="home-birth-hour">
          Giờ sinh
          <select
            id="home-birth-hour"
            name="birthHour"
            className="mt-2 w-full rounded-xl border border-rule bg-white/80 px-3 py-3 text-base text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
            onChange={(event) => setBirthHour(event.target.value)}
            value={birthHour}
          >
            {BIRTH_HOURS.map((hour) => (
              <option key={hour.value} value={hour.value}>{hour.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-ink-soft">
          Dùng Dương lịch trong bản ra mắt. Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán hay lời khẳng định tương lai.
        </p>
        <button
          className="mv-button-primary min-h-12 cursor-pointer whitespace-nowrap disabled:cursor-wait disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Đang lập lá số…' : 'Lập lá số ngay'}
        </button>
      </div>

      {error ? (
        <p className="mt-3 rounded-xl border border-vermillion/30 bg-vermillion/10 px-3 py-2 text-sm text-vermillion" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}
