/**
 * ConversionCTA — configurable call-to-action for chart personalization
 * Used across forecast, star, star×cung pages to drive /lap-la-so/ conversion.
 * Based on CMO copy pack: concepts/vietnamese-divination-trust-conversion.md
 */

import Link from 'next/link'

type PageType = 'forecast' | 'star' | 'star-palace'

interface ConversionCTAProps {
  pageType: PageType
  star?: string
  palace?: string
  className?: string
}

const CTA_CONFIG: Record<
  PageType,
  { title: string | ((star: string, palace: string) => string); body: string; button: string }
> = {
  forecast: {
    title: 'Muốn xem theo ngày giờ sinh của bạn?',
    body: 'Lập lá số cá nhân hóa để biết Mệnh, Thân, Cục và các cung trọng tâm trong lá số của bạn. Không hù dọa, không khẳng định chắc tương lai — chỉ là bản tham khảo để bạn nhìn lại công việc, tiền bạc, quan hệ và nhịp sống.',
    button: 'Lập lá số Tử Vi cá nhân hóa',
  },
  star: {
    title: (star: string) => `Xem sao ${star} nằm ở đâu trong lá số của bạn`,
    body: 'Một sao không đủ để kết luận. Lập lá số cá nhân hóa để biết sao này có thật sự xuất hiện trong lá số của bạn, nằm ở cung nào, và tam phương tứ chính ra sao.',
    button: 'Lập lá số Tử Vi cá nhân hóa',
  },
  'star-palace': {
    title: (star: string, palace: string) =>
      `Kiểm tra tổ hợp sao ${star} ở cung ${palace} trong lá số cá nhân`,
    body: 'Để biết tổ hợp này có xuất hiện trong lá số của bạn không, cần giờ sinh chính xác và đủ 12 cung trong lá số cá nhân.',
    button: 'Lập lá số Tử Vi cá nhân hóa',
  },
}

export function ConversionCTA({
  pageType,
  star,
  palace,
  className = '',
}: ConversionCTAProps) {
  const config = CTA_CONFIG[pageType]

  const title =
    typeof config.title === 'function'
      ? config.title(star ?? '', palace ?? '')
      : config.title

  return (
    <section className={`mv-cta ${className}`}>
      <h2 className="mv-section-title-light">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl leading-7">{config.body}</p>
      <Link href="/lap-la-so/" className="mv-button-primary mt-5">
        {config.button}
      </Link>
    </section>
  )
}
