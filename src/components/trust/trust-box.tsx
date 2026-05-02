/**
 * TrustBox — method-first trust explanation
 * Reusable across forecast, star, star×cung, and paywall pages.
 * Based on CMO copy pack: concepts/vietnamese-divination-trust-conversion.md
 */

interface TrustBoxProps {
  variant?: 'full' | 'short'
  className?: string
}

const FULL_STEPS = [
  'Dựng lá số theo ngày giờ sinh bằng quy tắc Tử Vi Tam Hợp Phái.',
  'Hiển thị Mệnh, Thân, Cục, 12 cung và các sao liên quan.',
  'AI giải thích các yếu tố này bằng tiếng Việt dễ hiểu.',
  'Nội dung dùng để tham khảo và tự suy ngẫm, không phải lời khẳng định chắc tương lai.',
]

const SHORT_TEXT =
  'Bói Toán dựng lá số theo quy tắc Tử Vi, rồi dùng AI để giải thích rõ hơn các cung, sao và gợi ý hành động. Đây là nội dung tham khảo, không thay thế tư vấn chuyên môn.'

export function TrustBox({ variant = 'full', className = '' }: TrustBoxProps) {
  if (variant === 'short') {
    return (
      <div className={`mv-note ${className}`}>
        <p>{SHORT_TEXT}</p>
      </div>
    )
  }

  return (
    <section className={`mv-card ${className}`}>
      <h3 className="mv-section-title">Cách Bói Toán đọc lá số</h3>
      <ol className="mt-4 space-y-2 list-decimal list-inside text-ink-soft leading-7">
        {FULL_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  )
}
