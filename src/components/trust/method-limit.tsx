/**
 * MethodLimitModule — page-type-aware limit disclaimer
 * Shows appropriate method limitation text based on page context.
 * Based on CMO copy pack: concepts/vietnamese-divination-trust-conversion.md
 */

type PageType = 'forecast' | 'star' | 'star-palace'

interface MethodLimitModuleProps {
  pageType: PageType
  star?: string
  palace?: string
  className?: string
}

const FORECAST_DISCLAIMER =
  'Bài này mới xem theo tuổi, giới tính và năm 2026 nên chỉ là phần tổng quan. Muốn đọc đúng lá số của riêng bạn, cần ngày sinh, giờ sinh, Mệnh Cung, Thân Cung, Cục và vị trí sao trong đủ 12 cung.'

const STAR_DISCLAIMER = (star: string) =>
  `Một sao không đủ để kết luận một lá số. Khi đọc sao ${star}, cần xem sao đó nằm ở cung nào, tam phương tứ chính ra sao, có Tứ Hóa hay phụ tinh nào đi cùng, và bối cảnh đời sống thực tế của người xem.`

const STAR_PALACE_DISCLAIMER = (star: string, palace: string) =>
  `Trang này chỉ giải thích tổ hợp sao ${star} ở cung ${palace} như một bài nền tham khảo. Để biết tổ hợp này có xuất hiện trong lá số của bạn không, cần giờ sinh chính xác và đủ 12 cung trong lá số cá nhân.`

const MISREAD_GUARD =
  'Không nên dùng một sao hoặc một cung để đóng khung tính cách, nghề nghiệp, hôn nhân, sức khỏe hay tiền bạc của một người.'

export function MethodLimitModule({
  pageType,
  star,
  palace,
  className = '',
}: MethodLimitModuleProps) {
  let disclaimer: string

  switch (pageType) {
    case 'forecast':
      disclaimer = FORECAST_DISCLAIMER
      break
    case 'star':
      disclaimer = STAR_DISCLAIMER(star ?? 'này')
      break
    case 'star-palace':
      disclaimer = STAR_PALACE_DISCLAIMER(star ?? 'này', palace ?? 'này')
      break
  }

  return (
    <div className={`mv-note ${className}`}>
      <p>{disclaimer}</p>
      {pageType !== 'forecast' && <p className="mt-2">{MISREAD_GUARD}</p>}
    </div>
  )
}
