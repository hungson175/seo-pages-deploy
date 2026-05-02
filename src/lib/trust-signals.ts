/**
 * STORY-019: Trust Signals
 * Author expertise, Art.320 badge, update dates
 */

export interface AuthorInfo {
  name: string
  title: string
  credentials: string
  publishDate: string
  updateDate: string
}

export function buildAuthorInfo(
  publishDate: string,
  updateDate?: string
): AuthorInfo {
  return {
    name: 'Chuyên Gia Tử Vi Bói Toán',
    title: 'Chuyên Gia Phân Tích Lá Số Tử Vi',
    credentials: '10+ năm nghiên cứu Tử Vi Việt Nam, Kinh Dịch và Ngũ Hành',
    publishDate,
    updateDate: updateDate || publishDate,
  }
}

export function buildArt320Badge(): { text: string; className: string } {
  return {
    text: 'Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán.',
    className:
      'inline-flex items-center px-3 py-1 rounded-full text-sm bg-navy-700 text-navy-300 border border-navy-600',
  }
}
