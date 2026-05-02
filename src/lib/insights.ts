export interface Insight {
  title: string
  content: string
  type: 'menh' | 'life-area' | 'lucky-element'
}

export function generateInsights(chartData: {
  palaces: Array<{
    name: string
    majorStars: Array<{ name: string;         brightness: 'minh' | 'hãm' | 'bình' }>
    transformation?: string
  }>
  yearElement: string
}): Insight[] {
  const menh = chartData.palaces.find((p) => p.name === 'Mệnh' || p.name === 'Menh')
  const primaryStar = menh?.majorStars[0]
  const transformation = menh?.transformation || ''

  // Life area: pick first palace with a major star (excluding Mệnh)
  const lifeAreaPalaces = chartData.palaces.filter(
    (p) => (p.name !== 'Mệnh' && p.name !== 'Menh') && p.majorStars.length > 0
  )
  const lifeArea = lifeAreaPalaces[0] || chartData.palaces[1]

  const insights: Insight[] = [
    {
      type: 'menh',
      title: 'Mệnh Cung — Tổng Quan Vận Mệnh',
      content: `Sao ${primaryStar?.name || 'chủ mệnh'} ${primaryStar?.brightness === 'minh' ? 'sáng rõ' : primaryStar?.brightness === 'hãm' ? 'bị hãm' : 'bình hòa'} tại Mệnh cung, ${transformation ? `có Hóa ${transformation.replace('Hoa ', '')} chiếu` : 'không có Hóa chiếu'}. Đây là nền tảng vận mệnh cả đời, cần xem xét kỹ cùng các cung liên quan.`,
    },
    {
      type: 'life-area',
      title: `${lifeArea?.name || 'Quan Lộc'} — Điểm Nhấn Cuộc Sống`,
      content: `Cung ${lifeArea?.name || ''} có ${lifeArea?.majorStars.map((s) => s.name).join(', ') || 'nhiều sao tốt'}. Đây là lĩnh vực cần chú ý trong năm nay. Xem chi tiết 12 cung trong luận giải đầy đủ.`,
    },
    {
      type: 'lucky-element',
      title: 'Ngũ Hành — Mệnh Cách & Vận Khí',
      content: `Mệnh cách thuộc hành ${chartData.yearElement}. Năm nay nên ưu tiên màu sắc và hướng phù hợp với hành ${chartData.yearElement === 'Kim' ? 'Thổ' : chartData.yearElement === 'Moc' ? 'Thủy' : chartData.yearElement === 'Thuy' ? 'Kim' : chartData.yearElement === 'Hoa' ? 'Mộc' : 'Hỏa'}.`,
    },
  ]

  return insights
}
