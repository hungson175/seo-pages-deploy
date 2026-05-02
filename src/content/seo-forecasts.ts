import rawForecasts from './seo-forecasts.json'
import { toSlug } from '@/lib/slug'

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

export interface SummaryRow {
  aspect: string
  trend: string
  action: string
}

export interface InternalLink {
  href: string
  label: string
  relation: string
}

export interface SeoForecastPage extends SeoForecastSeed {
  title: string
  h1: string
  description: string
  canonicalSlug: string
  urlPath: string
  legacyUrlPath: string
  animalHubSlug: string
  animalHubPath: string
  intro: string[]
  summaryRows: SummaryRow[]
  sections: Array<{ heading: string; content: string[] }>
  faqs: Array<{ question: string; answer: string }>
  internalLinks: InternalLink[]
}

export const SEO_FORECAST_SEEDS = rawForecasts as SeoForecastSeed[]

export function getCanonicalForecastSlug(seed: SeoForecastSeed): string {
  return `${toSlug(seed.canChi)}-${seed.year}-${seed.gender}-mang`
}

export function getAnimalHubSlug(seed: SeoForecastSeed): string {
  return seed.slug.split('-').slice(0, 2).join('-')
}

export function getForecastCanonicalPath(seed: SeoForecastSeed): string {
  return `/tu-vi-2026/${getCanonicalForecastSlug(seed)}/`
}

export function getForecastLegacyPath(seed: SeoForecastSeed): string {
  return `/tu-vi/${seed.slug}/`
}

export const SEO_FORECAST_SLUGS = SEO_FORECAST_SEEDS.map((item) => item.slug)
export const SEO_FORECAST_CANONICAL_SLUGS = SEO_FORECAST_SEEDS.map(getCanonicalForecastSlug)

const seedByLegacySlug = new Map(SEO_FORECAST_SEEDS.map((item) => [item.slug, item]))
const seedByCanonicalSlug = new Map(
  SEO_FORECAST_SEEDS.map((item) => [getCanonicalForecastSlug(item), item])
)

function vietnameseAge(seed: SeoForecastSeed): number {
  return 2026 - seed.year + 1
}

function relationshipFocus(seed: SeoForecastSeed): string {
  return seed.gender === 'nam'
    ? 'trách nhiệm với gia đình, cách nói chuyện khi áp lực công việc tăng, và khả năng giữ lời hứa trong những việc nhỏ'
    : 'nhu cầu được lắng nghe, ranh giới cảm xúc, và cách chia sẻ việc nhà hoặc việc gia đình mà không tự gánh quá nhiều'
}

function workAction(seed: SeoForecastSeed): string {
  return seed.gender === 'nam'
    ? 'làm rõ vai trò, đo kết quả bằng con số, giữ uy tín với cấp trên hoặc khách hàng, và tránh ôm việc chỉ để chứng minh năng lực'
    : 'chọn việc đúng ưu tiên, bảo vệ thời gian tập trung, nói rõ kỳ vọng với người cùng làm, và tránh để cảm xúc nhất thời kéo lệch kế hoạch'
}

function moneyAction(seed: SeoForecastSeed): string {
  return seed.gender === 'nam'
    ? 'tách tiền sinh hoạt, tiền dự phòng và tiền đầu tư; khoản lớn nên có người kiểm tra chéo trước khi xuống tiền'
    : 'ghi lại dòng tiền đều đặn, đặt giới hạn cho mua sắm theo cảm xúc, và ưu tiên khoản dự phòng giúp mình an tâm hơn'
}

function buildInternalLinks(seed: SeoForecastSeed): InternalLink[] {
  const canonical = (item: SeoForecastSeed) => getForecastCanonicalPath(item)
  const currentIndex = SEO_FORECAST_SEEDS.findIndex((item) => item.slug === seed.slug)
  const siblingGender = SEO_FORECAST_SEEDS.find(
    (item) => item.year === seed.year && item.animal === seed.animal && item.gender !== seed.gender
  )
  const previous = SEO_FORECAST_SEEDS[currentIndex - 1]
  const next = SEO_FORECAST_SEEDS[currentIndex + 1]
  const sameAnimal = SEO_FORECAST_SEEDS.find(
    (item) => item.animal === seed.animal && item.slug !== seed.slug && item.slug !== siblingGender?.slug
  )

  const links: InternalLink[] = [
    { href: '/tu-vi/', label: 'Tử vi 2026 theo năm sinh', relation: 'Hub chính' },
    {
      href: `/tu-vi/${getAnimalHubSlug(seed)}/`,
      label: `Tử vi tuổi ${seed.animal}`,
      relation: 'Animal cluster',
    },
    { href: '/lap-la-so/', label: 'Lập lá số Tử Vi miễn phí', relation: 'Cá nhân hóa theo ngày giờ sinh' },
    { href: '/sao/tu-vi/', label: 'Ý nghĩa sao Tử Vi', relation: 'Nền tảng sao' },
    { href: '/sao/thai-duong/', label: 'Ý nghĩa sao Thái Dương', relation: 'Nền tảng sao' },
  ]

  if (siblingGender) {
    links.push({
      href: canonical(siblingGender),
      label: `Tử vi tuổi ${siblingGender.canChi} ${siblingGender.year} ${siblingGender.genderLabel}`,
      relation: 'Cùng tuổi khác giới tính',
    })
  }

  for (const item of [previous, next, sameAnimal]) {
    if (!item || item.slug === seed.slug || links.some((link) => link.href === canonical(item))) continue
    links.push({
      href: canonical(item),
      label: `Tử vi tuổi ${item.canChi} ${item.year} ${item.genderLabel}`,
      relation: item.animal === seed.animal ? `Cùng tuổi ${item.animal}` : 'Tuổi lân cận',
    })
  }

  return links.slice(0, 7)
}

export function getSeoForecastSeed(slug: string): SeoForecastSeed | null {
  return seedByLegacySlug.get(slug) ?? seedByCanonicalSlug.get(slug) ?? null
}

export function getSeoForecastPage(slug: string): SeoForecastPage | null {
  const seed = getSeoForecastSeed(slug)
  if (!seed) return null

  const age = vietnameseAge(seed)
  const canonicalSlug = getCanonicalForecastSlug(seed)
  const animalHubSlug = getAnimalHubSlug(seed)
  const title = `Tử vi tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} năm 2026`
  const h1 = `Tử vi tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} năm 2026`
  const description = `Xem tử vi tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} năm 2026: tổng quan công việc, tài chính, tình duyên, sức khỏe và gợi ý hành động. Lập lá số cá nhân hóa theo ngày giờ sinh.`

  const summaryRows: SummaryRow[] = [
    {
      aspect: 'Công việc',
      trend: `Thuận cho ${seed.career.split(',')[0].toLowerCase()} nếu biết đi chắc và giữ uy tín.`,
      action: workAction(seed),
    },
    {
      aspect: 'Tài chính',
      trend: seed.money,
      action: moneyAction(seed),
    },
    {
      aspect: 'Tình duyên / gia đạo',
      trend: seed.love,
      action: 'Nói rõ nhu cầu, tránh im lặng kéo dài và ưu tiên sự tử tế trong các cuộc đối thoại khó.',
    },
    {
      aspect: 'Sức khỏe / tinh thần',
      trend: `Cần chú ý ${seed.health}.`,
      action: 'Giữ nhịp ngủ nghỉ, vận động vừa sức và tìm chuyên gia phù hợp khi có dấu hiệu bất thường.',
    },
    {
      aspect: 'Trọng tâm năm',
      trend: seed.advice,
      action: 'Chọn ít mục tiêu hơn, làm sâu hơn, rồi kiểm tra lại kết quả theo từng quý.',
    },
  ]

  return {
    ...seed,
    title,
    h1,
    description,
    canonicalSlug,
    urlPath: getForecastCanonicalPath(seed),
    legacyUrlPath: getForecastLegacyPath(seed),
    animalHubSlug,
    animalHubPath: `/tu-vi/${animalHubSlug}/`,
    intro: [
      `Bài viết này phân tích xu hướng Tử Vi năm 2026 cho tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} theo khung tham khảo truyền thống. Đây là bản xem theo năm sinh, giới tính và con giáp, không phải lá số cá nhân đã an đủ 12 cung. Một lá số riêng còn cần ngày sinh, giờ sinh, Mệnh Cung, Thân Cung, Cục và vị trí các sao. Vì vậy nội dung dưới đây nên được dùng như bản tổng quan giúp bạn tự soi lại công việc, tiền bạc, gia đạo và sức khỏe trong năm mới.`,
      `Người sinh năm ${seed.year} thuộc tuổi ${seed.canChi}, nạp âm ${seed.element}; trong năm Bính Ngọ 2026 bước vào khoảng ${age} tuổi theo cách tính tuổi âm. Ở giai đoạn này, câu hỏi quan trọng không còn là “năm nay tốt hay xấu” một cách tuyệt đối, mà là phần nào cần chủ động, phần nào nên đi chậm, phần nào phải đặt ranh giới rõ.`,
    ],
    summaryRows,
    sections: [
      {
        heading: 'Tổng quan năm 2026',
        content: [
          `Tuổi ${seed.canChi} mang khí chất ${seed.tone}. Khi gặp nhịp 2026, điểm mạnh của bản mệnh là khả năng quan sát tình thế và tự điều chỉnh để không bị cuốn theo biến động bên ngoài. Tuy nhiên, chính vì quen tự xử lý, ${seed.genderLabel} tuổi ${seed.animal} cũng dễ giữ mọi thứ trong lòng, đến lúc mệt mới nhận ra mình đã ôm quá nhiều việc. Năm này vì thế hợp với cách sống có kế hoạch: biết việc nào cần tiến, việc nào cần tạm dừng, việc nào nên nhờ người khác cùng gánh.`,
          `Về tổng thể, đây không phải năm nên chạy theo các lời hứa quá lớn. Cát nằm ở chỗ bền bỉ, biết tích lũy, biết sửa thói quen nhỏ mỗi ngày. Hung thường đến từ sự nóng vội, cả nể hoặc giữ một vai trò không còn phù hợp chỉ vì sợ thay đổi. Nếu đang có nhiều mục tiêu cùng lúc, hãy chọn ra một đến hai trọng tâm: công việc chính, sức khỏe nền tảng, hoặc một kế hoạch tài chính cần hoàn thành trước cuối năm.`,
        ],
      },
      {
        heading: `Công danh và sự nghiệp tuổi ${seed.canChi} năm 2026`,
        content: [
          `Về công việc, tuổi ${seed.canChi} ${seed.genderLabel} hợp với hướng ${seed.career}. Những lĩnh vực này có điểm chung là đòi hỏi sự đều đặn, khả năng quan sát chi tiết và uy tín cá nhân. Năm 2026 thuận cho việc củng cố vị trí hơn là đổi hướng liên tục. Nếu đang làm trong tổ chức, nên làm rõ trách nhiệm, phạm vi quyết định và tiêu chí đánh giá kết quả. Nếu làm tự do hoặc kinh doanh, nên rà lại sản phẩm, khách hàng, quy trình giao việc và cách chăm sóc sau bán.`,
          `Điểm thuận lợi là tuổi ${seed.animal} thường biết nhìn xa hơn lợi ích ngắn hạn. Khi đã tin một hướng đi, bản mệnh có thể làm rất sâu và chịu khó học. Nhưng rủi ro là đôi khi quá tin vào kinh nghiệm cũ, hoặc ngại hỏi lại khi bối cảnh đã đổi. Trong năm Bính Ngọ, hãy xem mọi kế hoạch lớn như một dự án cần chia giai đoạn: chuẩn bị dữ liệu, thử nhỏ, đo phản hồi, rồi mới mở rộng. Cách đi này giúp tránh tình trạng mất sức vì quyết định nóng.`,
        ],
      },
      {
        heading: 'Tài lộc và kế hoạch tiền bạc',
        content: [
          `Tài lộc của tuổi ${seed.canChi} ${seed.year} trong năm 2026 nghiêng về xu hướng: ${seed.money}. Cách hiểu an toàn là tiền đến từ năng lực đã tích lũy, từ kỷ luật chi tiêu và từ việc chọn đúng người để hợp tác. Không nên xem đây là lời hứa về khoản tiền bất ngờ. Trong tử vi ứng dụng, tài lộc tốt trước hết là dòng tiền có trật tự: biết mình kiếm từ đâu, chi cho việc gì, giữ lại bao nhiêu và rủi ro lớn nhất nằm ở điểm nào.`,
          `Nếu có ý định đầu tư, mua tài sản, đổi công việc vì thu nhập hoặc góp vốn cùng người quen, hãy đi qua ba câu hỏi: mình hiểu mô hình này đến đâu, thời gian thu hồi vốn có thực tế không, và nếu kế hoạch chậm lại thì gia đình có bị áp lực không. Tuổi ${seed.animal} có thể rất kiên trì, nhưng khi đã tin người thì đôi khi bỏ qua dấu hiệu nhỏ. Năm 2026 nên ưu tiên văn bản rõ ràng, dữ liệu rõ ràng và giới hạn rõ ràng.`,
        ],
      },
      {
        heading: 'Tình duyên, gia đạo và các mối quan hệ',
        content: [
          `Trong chuyện tình cảm, điểm cần chú ý của ${seed.genderLabel} tuổi ${seed.canChi} là ${seed.love}. Với người độc thân, năm 2026 hợp với cách tìm hiểu chậm, nhìn hành động đều đặn hơn là lời nói đẹp lúc ban đầu. Một người phù hợp không chỉ tạo cảm xúc mạnh, mà còn khiến nhịp sống của bạn bớt rối và giúp cả hai tôn trọng ranh giới của nhau. Đừng vội gán nhãn một mối quan hệ chỉ vì sợ bỏ lỡ.`,
          `Với người đã có gia đình hoặc đang trong mối quan hệ ổn định, trọng tâm là ${relationshipFocus(seed)}. Nhiều khúc mắc không đến từ chuyện lớn, mà từ việc một bên nghĩ mình đã hy sinh đủ, còn bên kia lại không biết điều đó. Tuổi ${seed.animal} khi mệt thường có xu hướng im lặng hoặc nói vòng, khiến người thân khó hiểu. Năm này nên tập nói thẳng nhưng mềm: mình cần gì, mình đang lo gì, và việc nào cả hai có thể thống nhất lại.`,
        ],
      },
      {
        heading: 'Sức khỏe, tinh thần và nhịp sống cần chú ý',
        content: [
          `Về sức khỏe theo nghĩa nhịp sống, tuổi ${seed.canChi} năm 2026 nên chú ý ${seed.health}. Đây là nhóm vấn đề dễ bị xem nhẹ vì không phải lúc nào cũng hiện thành dấu hiệu lớn ngay lập tức. Người ở độ tuổi ${age} thường vừa phải giữ công việc, vừa lo gia đình, vừa nghĩ đến tương lai tài chính. Khi nhiều trách nhiệm chồng lên nhau, cơ thể có thể phản ứng bằng mệt mỏi, thiếu tập trung hoặc dễ cáu hơn bình thường.`,
          `Trong khung Tử Vi, mảng này thường liên hệ đến cung Tật Ách; nhưng trang theo năm sinh không có đủ dữ liệu để đọc cung này của riêng bạn. Vì vậy, phần này chỉ nên xem như lời nhắc giữ nền. Hãy ưu tiên ngủ đúng giờ hơn, giảm thức khuya kéo dài, đi bộ hoặc vận động nhẹ, ăn uống bớt thất thường và kiểm tra định kỳ khi có dấu hiệu bất thường. Nội dung này không thay thế tư vấn y tế.`,
        ],
      },
      {
        heading: `Lời khuyên thực tế cho tuổi ${seed.canChi} trong năm 2026`,
        content: [
          `Lời khuyên chính cho tuổi ${seed.canChi} ${seed.genderLabel} là: ${seed.advice}. Câu này nghe đơn giản nhưng nếu áp dụng nghiêm túc sẽ giúp năm 2026 bớt phân tán. Hãy viết ra ba việc quan trọng nhất của năm: một việc về nghề nghiệp, một việc về tiền bạc, một việc về thân tâm hoặc gia đình. Sau đó, với mỗi việc, chọn hành động nhỏ có thể làm hằng tuần. Tử vi chỉ có giá trị khi nó dẫn về hành động cụ thể, không phải chỉ đọc để lo hoặc để hy vọng.`,
          `Thời điểm trong năm nên được chia thành các nhịp ngắn. Quý đầu phù hợp để rà soát, dọn các cam kết cũ và chỉnh lại kế hoạch. Quý giữa nên tập trung triển khai việc đã chọn, tránh đổi mục tiêu liên tục. Quý cuối là lúc nhìn lại kết quả, đóng các việc còn dang dở và chuẩn bị nền cho năm sau. Cách chia này không phải lịch vận hạn tuyệt đối, mà là phương pháp quản trị năng lượng để bản mệnh không bị cuốn theo quá nhiều lời mời hoặc áp lực.`,
        ],
      },
      {
        heading: 'Lá số cá nhân khác gì so với bài xem theo tuổi?',
        content: [
          `Bài viết này chỉ dùng năm sinh, giới tính và nhóm tuổi, nên không thể kết luận về sao tại Mệnh Cung, Thân Cung, Quan Lộc, Tài Bạch, Phu Thê hay Tật Ách. Theo cấu trúc của lá số, chỉ cần khác giờ sinh thì vị trí cung và sao đã có thể khác. Vì vậy hai người cùng tuổi ${seed.canChi} vẫn có cách đi nghề nghiệp, tình duyên và sức khỏe tinh thần không giống nhau. Đây là lý do Bói Toán tách rõ nội dung SEO theo tuổi với phần lập lá số cá nhân.`,
        ],
      },
    ],
    faqs: [
      {
        question: `Tử vi tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} năm 2026 có tốt không?`,
        answer: `Năm 2026 có cả điểm thuận và điểm cần chú ý. Với tuổi ${seed.canChi}, trọng tâm là ${seed.advice}. Mức độ tốt xấu còn phụ thuộc lựa chọn cá nhân, môi trường sống và lá số theo ngày giờ sinh.`,
      },
      {
        question: `Tuổi ${seed.canChi} nên chú ý điều gì nhất trong năm 2026?`,
        answer: `Nên chú ý ${seed.health}, đồng thời giữ kỷ luật tài chính và giao tiếp rõ ràng trong gia đạo. Nếu có vấn đề chuyên môn, hãy hỏi chuyên gia phù hợp.`,
      },
      {
        question: 'Bài tử vi theo tuổi có khác lá số cá nhân không?',
        answer: 'Có. Bài theo tuổi chỉ là tổng quan theo năm sinh và giới tính. Lá số cá nhân cần ngày sinh, giờ sinh để an Mệnh Cung, Thân Cung, Cục và các sao tại 12 cung.',
      },
      {
        question: 'Bài tử vi này có phải lời tiên đoán không?',
        answer: 'Không. Đây là nội dung tham khảo theo văn hóa tử vi, không phải lời tiên đoán và không thay thế tư vấn chuyên môn.',
      },
    ],
    internalLinks: buildInternalLinks(seed),
  }
}
