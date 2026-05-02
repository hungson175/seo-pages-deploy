import {
  PRIORITY_STAR_SLUGS,
  type PriorityStarSlug,
  getStarFoundationPage,
  isPriorityStarSlug,
} from './stars'
import {
  PALACE_SLUGS,
  type PalaceSlug,
  getPalaceFoundationPage,
  isPalaceSlug,
} from './palaces'

export interface StarPalaceCombinationKey {
  star: PriorityStarSlug
  palace: PalaceSlug
}

export interface StarPalaceTemplateSection {
  heading: string
  writingBrief: string
  requiredLinks: string[]
}

export interface StarPalaceDraftPage extends StarPalaceCombinationKey {
  status: 'draft-template'
  indexable: false
  h1: string
  title: string
  description: string
  urlPath: string
  canonicalWhenApproved: string
  methodNote: string
  qualityGate: string[]
  sections: StarPalaceTemplateSection[]
}

export interface StarPalaceApprovedPage extends Omit<StarPalaceDraftPage, 'status' | 'indexable'> {
  status: 'approved'
  indexable: true
}

export type StarPalacePage = StarPalaceApprovedPage

// Keep this empty until a specific star×cung article has rich 1,500+ word copy
// plus Bói-Toán, CMO, and SEO review. This prevents accidental pSEO thin pages.
export const APPROVED_STAR_PALACE_COMBINATIONS: readonly StarPalaceCombinationKey[] = []

export function buildStarPalacePath(star: PriorityStarSlug, palace: PalaceSlug): string {
  return `/sao/${star}/cung/${palace}/`
}

export function isApprovedStarPalaceCombination(
  star: string,
  palace: string
): star is PriorityStarSlug {
  return APPROVED_STAR_PALACE_COMBINATIONS.some(
    (combo) => combo.star === star && combo.palace === palace
  )
}

export function getStarPalaceDraftPage(
  star: string,
  palace: string
): StarPalaceDraftPage | null {
  if (!isPriorityStarSlug(star) || !isPalaceSlug(palace)) return null

  const starPage = getStarFoundationPage(star)
  const palacePage = getPalaceFoundationPage(palace)
  if (!starPage || !palacePage) return null

  const starName = starPage.name
  const palaceName = palacePage.name
  const urlPath = buildStarPalacePath(star, palace)

  return {
    star,
    palace,
    status: 'draft-template',
    indexable: false,
    h1: `Sao ${starName} Ở Cung ${palaceName} — Ý Nghĩa Và Cách Đọc`,
    title: `Sao ${starName} ở Cung ${palaceName}: ý nghĩa và cách đọc`,
    description: `Khung biên tập cho bài Sao ${starName} ở Cung ${palaceName}: đọc theo cung, tam phương tứ chính và bối cảnh tham khảo.`,
    urlPath,
    canonicalWhenApproved: urlPath,
    methodNote:
      'Chỉ xuất bản sau khi có bài viết riêng theo Tam Hợp Phái / 《紫微斗数全书》, không suy diễn từ một sao hoặc một cung riêng lẻ.',
    qualityGate: [
      '1,500+ words of unique, non-template educational content',
      'Bói-Toán domain review for star meaning in this palace',
      'CMO compliance review: no deterministic, medical, finance-promise, fearbait, or fake exact-chart claims',
      'SEO review: title/meta/schema/internal links and no index-bloat risk',
      'Visible Art.320 disclaimer and method citation',
      'At least 6 contextual internal links to star, palace, hub, and related foundation pages',
      'Unit tests plus Playwright coverage before adding to sitemap',
    ],
    sections: [
      {
        heading: `Sao ${starName} ở Cung ${palaceName} đọc như thế nào?`,
        writingBrief:
          'Explain how the star archetype changes when the life-area context is this palace. Avoid copying the generic star page or generic palace page.',
        requiredLinks: [starPage.urlPath, palacePage.urlPath],
      },
      {
        heading: `Tam phương tứ chính khi đọc ${starName} tại ${palaceName}`,
        writingBrief:
          'Use the palace xung chiếu and generated tam hợp context. Discuss why one palace alone is insufficient for personal conclusions.',
        requiredLinks: [palacePage.urlPath, '/tu-vi/'],
      },
      {
        heading: `Điểm mạnh, điểm cần cân bằng và câu hỏi tự kiểm chứng`,
        writingBrief:
          'Frame as reflective guidance and practical observation. Use “gợi ý/nghiêng về/nên kiểm tra thêm”; do not make promises.',
        requiredLinks: ['/lap-la-so/'],
      },
      {
        heading: 'Giới hạn và cách đọc an toàn',
        writingBrief:
          'State that exact reading needs date/time/gender, Mệnh Cung, Thân Cung, Cục, full star positions, Tứ Hóa, and real-life context.',
        requiredLinks: [starPage.urlPath, palacePage.urlPath],
      },
    ],
  }
}

export function getStarPalacePage(star: string, palace: string): StarPalacePage | null {
  if (!isApprovedStarPalaceCombination(star, palace)) return null

  const draft = getStarPalaceDraftPage(star, palace)
  if (!draft) return null

  return {
    ...draft,
    status: 'approved',
    indexable: true,
  }
}

export function getStarPalaceTemplateMatrix(): StarPalaceDraftPage[] {
  return PRIORITY_STAR_SLUGS.flatMap((star) =>
    PALACE_SLUGS.map((palace) => getStarPalaceDraftPage(star, palace))
  ).filter((page): page is StarPalaceDraftPage => Boolean(page))
}
