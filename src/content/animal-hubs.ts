import { SEO_FORECAST_SEEDS, getAnimalHubSlug, getSeoForecastPage } from './seo-forecasts'

export interface AnimalHubPage {
  slug: string
  animal: string
  title: string
  h1: string
  description: string
  urlPath: string
  linkedForecasts: Array<{
    title: string
    href: string
    canChi: string
    year: number
    genderLabel: string
    summary: string
  }>
  faqs: Array<{ question: string; answer: string }>
}

const animalOrder = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn']

export const ANIMAL_HUB_SLUGS = animalOrder
  .map((animal) => SEO_FORECAST_SEEDS.find((seed) => seed.animal === animal))
  .filter(Boolean)
  .map((seed) => getAnimalHubSlug(seed!))

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
    urlPath: `/tu-vi/${slug}/`,
    linkedForecasts,
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
