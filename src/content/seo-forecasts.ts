import rawForecasts from './seo-forecasts.json'

export interface SeoForecastSeed {
  slug: string
  animal: string
  year: number
  gender: 'nam' | 'nu'
  genderLabel: string
  canChi: string
  element: string
  tone: string
  career: string
  money: string
  love: string
  health: string
  advice: string
}

export interface SeoForecastPage extends SeoForecastSeed {
  title: string
  h1: string
  description: string
  sections: Array<{ heading: string; content: string[] }>
  faqs: Array<{ question: string; answer: string }>
}

export const SEO_FORECAST_SEEDS = rawForecasts as SeoForecastSeed[]
export const SEO_FORECAST_SLUGS = SEO_FORECAST_SEEDS.map((item) => item.slug)

const seedBySlug = new Map(SEO_FORECAST_SEEDS.map((item) => [item.slug, item]))

export function getSeoForecastSeed(slug: string): SeoForecastSeed | null {
  return seedBySlug.get(slug) ?? null
}

export function getSeoForecastPage(slug: string): SeoForecastPage | null {
  const seed = getSeoForecastSeed(slug)
  if (!seed) return null

  const title = `Tử vi tuổi ${seed.animal} ${seed.year} ${seed.genderLabel} năm 2026`
  const h1 = `Xem tử vi tuổi ${seed.animal} ${seed.year} ${seed.genderLabel} năm 2026 — luận giải chi tiết`
  const description = `Xem tử vi tuổi ${seed.animal} ${seed.year} ${seed.genderLabel} năm 2026: công danh, tài lộc, tình duyên, sức khỏe và lời khuyên thực tế.`

  return {
    ...seed,
    title,
    h1,
    description,
    sections: [
      {
        heading: `Tổng quan tuổi ${seed.animal} ${seed.year} ${seed.genderLabel} năm 2026`,
        content: [
          `Người tuổi ${seed.animal} sinh năm ${seed.year}, tức ${seed.canChi}, thuộc nạp âm ${seed.element}. Khi xem tử vi năm 2026, điểm quan trọng không phải là gán một kết luận tốt xấu cứng nhắc, mà là nhìn cách tính cách, tuổi vận và hoàn cảnh hiện tại đang gặp nhau. Với khí chất ${seed.tone}, bản mệnh thường có cách phản ứng riêng trước áp lực: có lúc linh hoạt, có lúc cố chấp, có lúc âm thầm chịu đựng để giữ thế ổn định.`,
          `Năm 2026 nên được xem như một năm chỉnh lại nhịp sống. Những việc đã tích lũy từ các năm trước bắt đầu cho thấy kết quả, nhưng cũng lộ ra điểm yếu nếu bản mệnh đi quá nhanh hoặc quá chậm so với thực lực. Nội dung này chỉ mang tính tham khảo, giúp bạn có thêm góc nhìn để chủ động hơn trong lựa chọn công việc, tiền bạc, gia đạo và sức khỏe.`,
        ],
      },
      {
        heading: 'Công danh và sự nghiệp',
        content: [
          `Về sự nghiệp, tuổi ${seed.animal} ${seed.year} ${seed.genderLabel} hợp với hướng ${seed.career}. Năm 2026 không nên chỉ chạy theo danh vị bên ngoài; điều cần ưu tiên là vị trí nào giúp bản mệnh tăng năng lực thật, mở quan hệ tốt và giảm các việc tiêu hao vô ích. Nếu đang làm công ăn lương, đây là thời điểm nên làm rõ vai trò, trách nhiệm và kết quả đo được. Nếu làm kinh doanh, nên kiểm tra lại quy trình, dòng tiền và chất lượng khách hàng.`,
          `Thầy nhìn năm này như một năm cần đi bằng sự chắc chắn. Cơ hội có, nhưng cơ hội tốt thường đi kèm yêu cầu mới. Đừng nhận thêm việc chỉ vì sợ mất lòng, cũng đừng bỏ việc cũ chỉ vì một lời hứa hấp dẫn. Hãy chọn hướng có dữ liệu, có người đồng hành đáng tin và có khả năng tích lũy kỹ năng lâu dài.`,
        ],
      },
      {
        heading: 'Tài lộc và tiền bạc',
        content: [
          `Tài lộc của tuổi ${seed.animal} ${seed.year} trong năm 2026 nghiêng về hướng: ${seed.money}. Đây không phải vận nên đánh cược bằng cảm hứng. Tiền đến tốt nhất khi bản mệnh biết tách rõ tiền sinh hoạt, tiền dự phòng và tiền đầu tư. Những khoản chi nhỏ lặp đi lặp lại cần được kiểm soát, vì hao tài trong năm này thường không đến từ một lần mất lớn mà từ nhiều quyết định thiếu để ý.`,
          `Nếu có ý định đầu tư, hùn vốn hoặc mở rộng kinh doanh, nên hỏi kỹ ba điều: mình hiểu lĩnh vực này đến đâu, người hợp tác có minh bạch không, và nếu chậm thu hồi vốn thì gia đình có bị ảnh hưởng không. Với tử vi, tài lộc tốt không chỉ là kiếm nhiều, mà còn là giữ được và dùng tiền đúng chỗ.`,
        ],
      },
      {
        heading: 'Tình duyên và gia đạo',
        content: [
          `Đường tình cảm của ${seed.genderLabel} tuổi ${seed.animal} năm 2026 cần chú ý: ${seed.love}. Người độc thân nên quan sát hành động đều đặn hơn là lời nói ban đầu. Người đã có gia đình hoặc đang trong mối quan hệ lâu dài nên tránh để công việc, tiền bạc hoặc chuyện họ hàng chen vào quá sâu mà không có nguyên tắc chung.`,
          `Năm này thuận cho việc nói chuyện thật lòng, nhưng không thuận cho kiểu im lặng rồi tự suy diễn. Nếu có khúc mắc, hãy chọn lúc cả hai bình tĩnh để nói. Tình duyên không phải cứ nhẫn là tốt; có khi biết nói đúng lúc mới giữ được sự ấm áp lâu dài.`,
        ],
      },
      {
        heading: 'Sức khỏe và tinh thần',
        content: [
          `Sức khỏe năm 2026 nên chú ý nhiều đến ${seed.health}. Đây là nhóm vấn đề dễ bị xem nhẹ vì chưa thành bệnh rõ ràng, nhưng lại ảnh hưởng trực tiếp đến năng lượng làm việc và chất lượng quan hệ. Người tuổi ${seed.animal} thường cố gắng giữ hình ảnh ổn, nên đôi khi cơ thể đã mệt mà miệng vẫn nói không sao.`,
          `Hãy ưu tiên ngủ đủ, vận động vừa sức và kiểm tra sức khỏe định kỳ nếu có dấu hiệu bất thường. Tử vi chỉ là một lớp tham khảo văn hóa; những vấn đề y tế cần được bác sĩ hoặc chuyên gia phù hợp tư vấn. Muốn vận tốt hơn, trước hết thân tâm phải có nền vững.`,
        ],
      },
      {
        heading: 'Lời khuyên thực tế cho năm 2026',
        content: [
          `Lời khuyên chính cho tuổi ${seed.animal} ${seed.year} ${seed.genderLabel}: ${seed.advice}. Đừng cố thắng mọi việc trong cùng một năm. Hãy chọn một vài mục tiêu quan trọng nhất rồi làm tới nơi tới chốn. Việc gì không còn hợp thời, không còn nuôi dưỡng mình, hoặc chỉ giữ lại vì thói quen thì nên được xem xét lại.`,
          `Năm 2026 tốt khi bản mệnh biết sống chủ động nhưng không hấp tấp. Cẩn trọng không có nghĩa là sợ hãi; linh hoạt không có nghĩa là thiếu nguyên tắc. Dùng tử vi như một tấm gương để soi mình, rồi vẫn phải tự quyết định bằng hiểu biết, đạo đức và trách nhiệm cá nhân.`,
        ],
      },
    ],
    faqs: [
      {
        question: `Tử vi tuổi ${seed.animal} ${seed.year} ${seed.genderLabel} năm 2026 có tốt không?`,
        answer: `Năm 2026 có cả cơ hội và áp lực. Mức độ tốt xấu phụ thuộc vào lựa chọn công việc, tài chính, sức khỏe và cách bản mệnh xử lý quan hệ. Nội dung chỉ nên dùng để tham khảo.`,
      },
      {
        question: `Tuổi ${seed.animal} ${seed.year} nên chú ý điều gì nhất trong năm 2026?`,
        answer: `Nên chú ý ${seed.health}, đồng thời giữ kỷ luật tài chính và giao tiếp rõ ràng trong gia đạo.`,
      },
      {
        question: 'Bài tử vi này có phải lời tiên đoán không?',
        answer: 'Không. Đây là nội dung tham khảo theo văn hóa tử vi, không phải lời tiên đoán và không thay thế tư vấn chuyên môn.',
      },
    ],
  }
}
