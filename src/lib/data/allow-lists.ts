/**
 * Static allow-lists for build-time validation of dynamic routes.
 * These feed generateStaticParams so only valid slugs produce pages.
 */

export const ANIMALS = [
  'ty', 'suu', 'dan', 'mao', 'thin', 'ty-j',
  'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi',
] as const

export const GENDERS = ['nam', 'nu'] as const

export const YEARS = [1984, 1996, 2008, 2020] as const

/** ~144 forecast pages: 12 animals × 4 years × 2 genders (sample) */
export const FORECAST_SLUGS: string[] = []
for (const animal of ANIMALS) {
  for (const year of YEARS) {
    for (const gender of GENDERS) {
      FORECAST_SLUGS.push(`tuoi-${animal}-${year}-${gender}`)
    }
  }
}

export const STARS = [
  'tu-vi', 'thien-co', 'thai-duong', 'vu-khuc', 'thien-dong',
  'liem-trinh', 'thien-phu', 'thai-am', 'tham-lang', 'cu-mon',
  'thien-luong', 'pha-quan',
  'ta-phu', 'huu-bat', 'thiên-khoi', 'thiên-việt',
  'van-xuong', 'van-khuc', 'thien-ma', 'thien-hinh',
] as const

/** 64 quẻ (sample subset for initial build) */
export const QUE_SLUGS = [
  '1-kien-vi-thien', '2-khon-vi-dia', '3-ton-vi-loi',
  '4-mong-vi-thuy', '5-tung-vi-thuy', '6-tung-vi-thien',
] as const
