import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import nextConfig from '../next.config'
import { PALACE_SLUGS } from '../src/content/palaces'
import { APPROVED_STAR_PALACE_COMBINATIONS } from '../src/content/star-palace'
import { PRIORITY_STAR_SLUGS } from '../src/content/stars'
import { STARS } from '../src/content/routes'

const base = 'https://boitoan.com.vn'

function locsFromPublicXml(fileName: string): string[] {
  const xml = readFileSync(join(process.cwd(), 'public', fileName), 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
}

describe('segmented sitemap parity with allow-lists', () => {
  beforeAll(() => {
    execFileSync('node', ['scripts/generate-sitemaps.js'], { stdio: 'pipe' })
  })

  it('public/stars.xml contains exactly PRIORITY_STAR_SLUGS', () => {
    expect(locsFromPublicXml('stars.xml')).toEqual(
      PRIORITY_STAR_SLUGS.map((slug) => `${base}/sao/${slug}/`),
    )
  })

  it('public/palaces.xml contains exactly PALACE_SLUGS', () => {
    expect(locsFromPublicXml('palaces.xml')).toEqual(
      PALACE_SLUGS.map((slug) => `${base}/cung/${slug}/`),
    )
  })

  it('public/star-palace.xml contains exactly approved star×cung combinations and no drafts', () => {
    expect(locsFromPublicXml('star-palace.xml')).toEqual(
      APPROVED_STAR_PALACE_COMBINATIONS.map(
        ({ star, palace }) => `${base}/sao/${star}/cung/${palace}/`,
      ),
    )
  })
})

describe('legacy star redirect parity with priority-star allow-list', () => {
  it('redirects every non-priority legacy star to /tu-vi/', async () => {
    const redirects = await nextConfig.redirects?.()
    const redirectBySource = new Map(
      (redirects ?? []).map((redirect) => [redirect.source, redirect]),
    )

    const nonPriorityStars = STARS.filter(
      (slug) => !(PRIORITY_STAR_SLUGS as readonly string[]).includes(slug),
    )

    for (const slug of nonPriorityStars) {
      expect(redirectBySource.get(`/sao/${slug}`)).toMatchObject({
        destination: '/tu-vi/',
        statusCode: 301,
      })
    }
  })
})
