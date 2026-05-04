import { SEO_FORECAST_SEEDS, getAnimalHubSlug, getSeoForecastPage } from './seo-forecasts'

export interface AnimalHubPage {
  slug: string
  animal: string
  title: string
  h1: string
  description: string
  methodNote: string
  urlPath: string
  linkedForecasts: Array<{
    title: string
    href: string
    canChi: string
    year: number
    genderLabel: string
    summary: string
  }>
  clusterInsights: string[]
  faqs: Array<{ question: string; answer: string }>
}

const animalOrder = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']

export const ANIMAL_HUB_SLUGS = animalOrder
  .map((animal) => SEO_FORECAST_SEEDS.find((seed) => seed.animal === animal))
  .filter(Boolean)
  .map((seed) => getAnimalHubSlug(seed!))

function buildClusterInsights(animal: string, seeds: typeof SEO_FORECAST_SEEDS): string[] {
  if (seeds.length < 4) return []

  const sortedSeeds = [...seeds].sort((a, b) => a.year - b.year)
  const years = sortedSeeds.map((seed) => seed.year)
  const canChiList = [...new Set(sortedSeeds.map((seed) => seed.canChi))].join(', ')
  const elements = [...new Set(sortedSeeds.map((seed) => seed.element))].join(', ')

  return [
    `Cụm tuổi ${animal} hiện có ${seeds.length} bài theo năm sinh và giới tính, trải từ ${Math.min(...years)} đến ${Math.max(...years)}. Các bài đã tách Can Chi ${canChiList} để người đọc không bị gộp nhầm mọi người cùng con giáp vào một khuôn chung.`,
    `Nạp âm trong cụm này gồm ${elements}. Đây là lớp tham khảo theo năm sinh, giúp đặt bối cảnh tổng quan về công việc, tài chính, gia đạo và nhịp sống; không phải lá số cá nhân và không dùng để kết luận Mệnh, Thân, Cục hay vị trí sao.`,
    `Nếu chỉ biết năm sinh, hãy đọc bài theo tuổi như bản định hướng mềm. Khi cần xem kỹ hơn, hãy chuyển sang lập lá số theo ngày giờ sinh để có đủ dữ kiện trước khi tự đối chiếu với trải nghiệm thực tế.`,
  ]
}

export function getAnimalHubPage(slug: string): AnimalHubPage | null {
  const seeds = SEO_FORECAST_SEEDS.filter((seed) => getAnimalHubSlug(seed) === slug)
  if (seeds.length === 0) return null

  const animal = seeds[0].animal
  const linkedForecasts = seeds
    .map((seed) => {
      const page = getSeoForecastPage(seed.slug)
      if (!page) return null
      return {
        title: page.h1,
        href: page.urlPath,
        canChi: page.canChi,
        year: page.year,
        genderLabel: page.genderLabel,
        summary: `${page.canChi} ${page.year} ${page.genderLabel}: ${page.advice}.`,
      }
    })
    .filter(Boolean) as AnimalHubPage['linkedForecasts']

  return {
    slug,
    animal,
    title: `Tử vi tuổi ${animal} năm 2026`,
    h1: `Tử vi tuổi ${animal} năm 2026`,
    description: `Tổng hợp tử vi tuổi ${animal} năm 2026 theo năm sinh và giới tính. Đọc tổng quan công việc, tài chính, tình duyên và link đến từng bài chi tiết.`,
    methodNote:
      'Tham khảo thuật ngữ Tam Hợp Phái / 《紫微斗数全书》; không an sao cá nhân khi chưa có ngày giờ sinh.',
    urlPath: `/tu-vi/${slug}/`,
    linkedForecasts,
    clusterInsights: buildClusterInsights(animal, seeds),
    faqs: [
      {
        question: `Tử vi tuổi ${animal} năm 2026 nên đọc thế nào?`,
        answer: `Bạn nên bắt đầu từ tổng quan tuổi ${animal}, sau đó chọn đúng năm sinh và giới tính để đọc bài chi tiết hơn.`,
      },
      {
        question: `Các bài tuổi ${animal} có phải lá số cá nhân không?`,
        answer: 'Không. Đây là nội dung tổng quan theo tuổi, năm sinh và giới tính. Lá số cá nhân cần ngày sinh và giờ sinh để an Mệnh, Thân, Cục và vị trí sao.',
      },
      {
        question: 'Nội dung này có phải lời tiên đoán không?',
        answer: 'Không. Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán và không thay thế tư vấn chuyên môn.',
      },
    ],
  }
}
