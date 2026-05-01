/**
 * Allow-list for validated URL slugs.
 * All dynamic route segments must match an entry here at build time.
 */

// 12 zodiac animals
const ZODIAC_ANIMALS = [
  'ty', 'su', 'suu', 'dan', 'mao', 'thin', 'tyj', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi',
]

// Common years for forecasts (2024-2030)
const YEARS = ['2024', '2025', '2026', '2027', '2028', '2029', '2030']

// Genders
const GENDERS = ['nam', 'nu']

// Generate forecast slugs: tuoi-{animal}-{year}-{gender}
const FORECAST_SLUGS: string[] = []
ZODIAC_ANIMALS.forEach((animal) => {
  YEARS.forEach((year) => {
    GENDERS.forEach((gender) => {
      FORECAST_SLUGS.push(`tuoi-${animal}-${year}-${gender}`)
    })
  })
})

// 14 major + 20 minor star slugs (subset for initial launch)
const STAR_SLUGS = [
  // Major stars (14)
  'tu-vi', 'thien-phu', 'thai-duong', 'thai-am', 'liem-trinh',
  'thiên-đồng', 'vu-khuc', 'tu-khuc', 'thai-am-star', 'thai-duong-star',
  'co-than', 'qua-tu', 'loc-ton', 'bac-si',
  // Minor stars (common ones)
  'van-xuong', 'van-khuc', 'ta-phu', 'huu-bat', 'thien-khoi',
  'thien-viet', 'thien-hinh', 'thien-ri', 'thien-y', 'tam-thai',
  'bat-toa', 'an-quan', 'thien-quan', 'thien-phuc', 'dao-hoa',
  'hong-loan', 'thien-hy', 'thien-dao', 'thien-tai', 'thien-tho',
]

// Tool slugs
const TOOL_SLUGS = ['lap-la-so']

// Hub / educational slugs
const HUB_SLUGS = ['tu-vi', 'sao', 'cung', 'menh', 'than', 'tai-bach']

// Que slugs (I Ching - 64 hexagrams, initial subset)
const QUE_SLUGS = [
  'que-1', 'que-2', 'que-3', 'que-4', 'que-5', 'que-6', 'que-7', 'que-8',
  // ... full 64 would be expanded in production
]

export const SLUG_ALLOW_LIST: string[] = [
  ...new Set([
    ...FORECAST_SLUGS,
    ...STAR_SLUGS,
    ...TOOL_SLUGS,
    ...HUB_SLUGS,
    ...QUE_SLUGS,
  ]),
]

const ALLOWED_SET = new Set(SLUG_ALLOW_LIST)

/**
 * Validate a slug against the allow-list.
 * Also rejects slugs with path traversal, special chars, uppercase, or leading/trailing hyphens.
 */
export function validateSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false

  // Reject path traversal attempts
  if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) return false

  // Reject special characters (only lowercase a-z, 0-9, hyphens allowed)
  if (!/^[a-z0-9-]+$/.test(slug)) return false

  // Reject leading/trailing hyphens
  if (slug.startsWith('-') || slug.endsWith('-')) return false

  // Check allow-list
  return ALLOWED_SET.has(slug)
}

/** Convenience alias for validateSlug. */
export function isAllowedSlug(slug: string): boolean {
  return validateSlug(slug)
}
