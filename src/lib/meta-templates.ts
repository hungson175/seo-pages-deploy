/**
 * STORY-018: Meta Tag Template System
 * Templates per page type with action + benefit
 */

export interface MetaTemplate {
  title: string
  description: string
}

export function buildMetaTemplate(
  pageType: 'forecast' | 'star' | 'que' | 'tool' | 'homepage',
  topic: string,
  benefit?: string,
  year?: number
): MetaTemplate {
  const yearStr = year ? ` ${year}` : ''
  const benefitStr = benefit ? ` — ${benefit}` : ''

  const templates: Record<typeof pageType, () => MetaTemplate> = {
    forecast: () => ({
      title: truncate(`Xem ${topic}${yearStr}${benefitStr} | Bói Toán`, 60),
      description: truncate(
        `Xem tử vi ${topic}${yearStr} ${benefit ? benefit.toLowerCase() : 'chi tiết'}. Luận giải vận mệnh, công danh, tài lộc, tình duyên. Tham khảo miễn phí tại Bói Toán.`,
        160
      ),
    }),
    star: () => ({
      title: truncate(`Tìm Hiểu ${topic}${benefitStr} | Bói Toán`, 60),
      description: truncate(
        `Tìm hiểu ý nghĩa ${topic} trong lá số tử vi. Vị trí, tính chất và ảnh hưởng đến vận mệnh.`,
        160
      ),
    }),
    que: () => ({
      title: truncate(`Khám Phá ${topic}${benefitStr} | Bói Toán`, 60),
      description: truncate(
        `Luận giải ${topic} trong Kinh Dịch. Ý nghĩa, biến quẻ và ứng dụng trong cuộc sống.`,
        160
      ),
    }),
    tool: () => ({
      title: truncate(`Lập ${topic}${benefitStr} | Bói Toán`, 60),
      description: truncate(
        `Lập ${topic} online ${benefit ? benefit.toLowerCase() : 'miễn phí'}. Nhập thông tin để xem lá số chi tiết.`,
        160
      ),
    }),
    homepage: () => ({
      title: truncate(`${topic} — Xem Tử Vi, Gieo Quẻ Kinh Dịch Online`, 60),
      description: truncate(
        'Xem tử vi trọn đời, lập lá số tử vi, gieo quẻ Kinh Dịch online miễn phí. Tham khảo vận mệnh theo phương pháp cổ truyền Việt Nam.',
        160
      ),
    }),
  }

  return templates[pageType]()
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}
