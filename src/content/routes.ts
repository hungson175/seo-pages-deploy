import routes from './routes.json'

/** Canonical route/content allow-lists for all generated SEO pages. */
export const ANIMALS = routes.animals
export const GENDERS = routes.genders
export const YEARS = routes.years
export const STARS = routes.stars
export const QUE_SLUGS = routes.queSlugs
export const TOOL_SLUGS = routes.toolSlugs
export const HUB_SLUGS = routes.hubSlugs

export const FORECAST_SLUGS = ANIMALS.flatMap((animal) =>
  YEARS.flatMap((year) =>
    GENDERS.map((gender) => `tuoi-${animal}-${year}-${gender}`)
  )
)

export const SLUG_ALLOW_LIST = [
  ...new Set([
    ...FORECAST_SLUGS,
    ...STARS,
    ...QUE_SLUGS,
    ...TOOL_SLUGS,
    ...HUB_SLUGS,
  ]),
]

const ALLOWED_SET = new Set(SLUG_ALLOW_LIST)

export function validateSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false
  if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) return false
  if (!/^[a-z0-9-]+$/.test(slug)) return false
  if (slug.startsWith('-') || slug.endsWith('-')) return false
  return ALLOWED_SET.has(slug)
}

export function isAllowedSlug(slug: string): boolean {
  return validateSlug(slug)
}
