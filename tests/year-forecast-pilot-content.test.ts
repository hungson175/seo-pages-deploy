import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  SEO_FORECAST_SEEDS,
  SEO_FORECAST_SLUGS,
  getSeoForecastPage,
  type SeoForecastSeed,
} from '../src/content/seo-forecasts'
import {
  YEAR_FORECAST_PHASE2_PILOT_SLUGS,
  YEAR_FORECAST_PHASE3_COHORT_YEARS,
  getYearForecastPilotArticle,
  getYearForecastRegeneratedArticle,
  getYearForecastRegeneratedWordCount,
  isYearForecastPhase3CohortSeed,
  type YearForecastRegeneratedArticle,
} from '../src/content/year-forecast-pilot-content'

const BATCH_ARTIFACT_JSON = '/tmp/po_year_articles_phase3_batch_articles_202605091421.json'
const BATCH_ARTIFACT_MD = '/tmp/po_year_articles_phase3_batch_articles_202605091421.md'
const BATCH_PROMPT_PAYLOAD_JSON = '/tmp/po_year_articles_phase3_batch_prompt_payloads_202605091421.json'
const BATCH_REQ10_SCAN_JSON = '/tmp/po_year_articles_phase3_batch_req10_scan_202605091421.json'
const SHORT_DUPLICATE_THRESHOLD_WORDS = 10

function seedFor(slug: string): SeoForecastSeed {
  const seed = SEO_FORECAST_SEEDS.find((item) => item.slug === slug)
  expect(seed, slug).toBeDefined()
  return seed!
}

function cohortSeeds(): SeoForecastSeed[] {
  return SEO_FORECAST_SEEDS.filter(isYearForecastPhase3CohortSeed)
}

function cohortArticles(): YearForecastRegeneratedArticle[] {
  return cohortSeeds().map((seed) => {
    const article = getYearForecastRegeneratedArticle(seed)
    expect(article, seed.slug).not.toBeNull()
    return article!
  })
}

function visibleArticleText(article: YearForecastRegeneratedArticle): string {
  return [
    article.h1,
    article.description,
    article.topDisclaimer,
    article.aiNativeWrapper,
    article.methodNote,
    ...article.intro,
    ...article.summaryRows.flatMap((row) => [row.aspect, row.trend, row.action]),
    ...article.ctaModules.flatMap((cta) => [cta.heading, cta.body, cta.buttonLabel, cta.complianceNote]),
    ...article.sections.flatMap((section) => [section.heading, ...section.content]),
    ...article.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ')
}

function visibleRoutePageText(slug: string): string {
  const page = getSeoForecastPage(slug)
  expect(page, slug).not.toBeNull()
  return [
    page!.h1,
    page!.description,
    page!.topDisclaimer ?? '',
    page!.aiNativeWrapper ?? '',
    page!.methodNote,
    ...page!.intro,
    ...page!.summaryRows.flatMap((row) => [row.aspect, row.trend, row.action]),
    ...(page!.ctaModules ?? []).flatMap((cta) => [cta.heading, cta.body, cta.buttonLabel, cta.complianceNote]),
    ...page!.sections.flatMap((section) => [section.heading, ...section.content]),
    ...page!.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ')
}

function normalizeSentence(sentence: string): string {
  return sentence
    .toLowerCase()
    .normalize('NFC')
    .replace(/[“"”'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function splitSentences(text: string): string[] {
  return (text.replace(/\s+/g, ' ').match(/[^.!?。！？]+[.!?。！？]+/g) ?? [])
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function sentenceMapFor(text: string, thresholdWords = SHORT_DUPLICATE_THRESHOLD_WORDS): Map<string, string> {
  const map = new Map<string, string>()
  for (const sentence of splitSentences(text)) {
    if (countWords(sentence) < thresholdWords) continue
    map.set(normalizeSentence(sentence), sentence)
  }
  return map
}

interface DuplicateSentenceFinding {
  articleSlug: string
  comparedSlug: string
  sentence: string
  wordCount: number
}

function scanReq10Duplicates(articles: YearForecastRegeneratedArticle[]): DuplicateSentenceFinding[] {
  const cohortSlugs = new Set(articles.map((article) => article.slug))
  const existingSentenceMaps = new Map(
    SEO_FORECAST_SLUGS
      .filter((slug) => !cohortSlugs.has(slug))
      .map((slug) => [slug, sentenceMapFor(visibleRoutePageText(slug))]),
  )
  const articleSentenceMaps = new Map(
    articles.map((article) => [article.slug, sentenceMapFor(visibleArticleText(article))]),
  )
  const findings: DuplicateSentenceFinding[] = []
  const seenPairs = new Set<string>()

  for (const article of articles) {
    const articleSentences = articleSentenceMaps.get(article.slug)!
    for (const [normalizedSentence, originalSentence] of articleSentences.entries()) {
      for (const [legacySlug, legacySentences] of existingSentenceMaps.entries()) {
        if (legacySentences.has(normalizedSentence)) {
          findings.push({
            articleSlug: article.slug,
            comparedSlug: `existing:${legacySlug}`,
            sentence: originalSentence,
            wordCount: countWords(originalSentence),
          })
        }
      }

      for (const [otherArticleSlug, otherArticleSentences] of articleSentenceMaps.entries()) {
        if (otherArticleSlug === article.slug) continue
        const pairKey = [article.slug, otherArticleSlug, normalizedSentence].sort().join('::')
        if (seenPairs.has(pairKey)) continue
        if (otherArticleSentences.has(normalizedSentence)) {
          seenPairs.add(pairKey)
          findings.push({
            articleSlug: article.slug,
            comparedSlug: `batch:${otherArticleSlug}`,
            sentence: originalSentence,
            wordCount: countWords(originalSentence),
          })
        }
      }
    }
  }

  return findings
}

function renderBatchMarkdown(articles: YearForecastRegeneratedArticle[]): string {
  return articles
    .map((article) => [
      `# ${article.h1}`,
      '',
      `Slug: ${article.slug}`,
      `Review status: ${article.reviewStatus}`,
      `Disclaimer: ${article.topDisclaimer}`,
      `AI wrapper: ${article.aiNativeWrapper}`,
      `Method: ${article.methodNote}`,
      '',
      '## Intro',
      ...article.intro.map((paragraph) => `${paragraph}\n`),
      '## Summary',
      ...article.summaryRows.map((row) => `- ${row.aspect}: ${row.trend} Action: ${row.action}`),
      '',
      '## CTA modules',
      ...article.ctaModules.map((cta) => `- ${cta.placement}: ${cta.heading} — ${cta.body} [${cta.buttonLabel}](${cta.href}) ${cta.complianceNote}`),
      '',
      ...article.sections.flatMap((section) => [
        `## ${section.heading}`,
        ...section.content.map((paragraph) => `${paragraph}\n`),
      ]),
      '## FAQ',
      ...article.faqs.flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
    ].join('\n'))
    .join('\n---\n')
}

function writeJson(path: string, payload: unknown): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(payload, null, 2)}\n`)
}

describe('year forecast phase 3 batch content', () => {
  it('prepares exactly the 1984-1995 cohort and preserves the three approved pilot slugs', () => {
    const seeds = cohortSeeds()
    expect(YEAR_FORECAST_PHASE3_COHORT_YEARS).toEqual({ start: 1984, end: 1995 })
    expect(seeds).toHaveLength(24)
    expect(new Set(seeds.map((seed) => seed.slug)).size).toBe(24)
    for (const slug of YEAR_FORECAST_PHASE2_PILOT_SLUGS) {
      expect(seeds.map((seed) => seed.slug)).toContain(slug)
      expect(getYearForecastPilotArticle(seedFor(slug))).not.toBeNull()
    }
    expect(getYearForecastRegeneratedArticle(seedFor('tuoi-ty-1996-nam'))).toBeNull()
  })

  it('uses deterministic domain evidence and route-integrates regenerated content for the cohort', () => {
    for (const article of cohortArticles()) {
      const seed = seedFor(article.slug)
      const text = visibleArticleText(article)
      const page = getSeoForecastPage(article.slug)

      expect(article.contentOrigin).toBe('phase3-batch-offline-regenerated')
      expect(article.reviewStatus).toBe('needs-domain-copy-seo-review')
      expect(article.regenerationInput.slug).toBe(article.slug)
      expect(article.domainEvidence.canChi).toBe(seed.canChi)
      expect(article.domainEvidence.napAm.name).toBe(seed.element)
      expect(page?.contentOrigin, article.slug).toBe('regenerated-domain-content')
      expect(page?.regenerationStatus, article.slug).toBe('phase3-batch-review-ready')
      expect(page?.h1, article.slug).toBe(article.h1)
      expect(page?.sections[0].heading, article.slug).toBe(article.sections[0].heading)
      expect(text).not.toMatch(/bài pilot|pilot này|hotfix|deploy|regeneration/i)
      for (const legacySeedFragment of [seed.tone, seed.career, seed.money, seed.love, seed.health, seed.advice]) {
        expect(text, `${article.slug} should not copy legacy seed fragment`).not.toContain(legacySeedFragment)
      }
    }
  })

  it('includes REQ-1..REQ-9 evidence in every regenerated article body and FAQ', () => {
    for (const article of cohortArticles()) {
      const evidence = article.domainEvidence
      const text = visibleArticleText(article)

      expect(text).toContain(evidence.canChi)
      expect(text).toContain(evidence.napAm.name)
      expect(text).toContain(evidence.cungMenh.name)
      expect(text).toContain(evidence.genderLabel)
      expect(text).toContain(evidence.thienCan)
      expect(text).toContain('Bính')
      expect(text).toContain(evidence.diaChi)
      expect(text).toContain('Ngọ')
      for (const trait of evidence.animalTraits.traits) {
        expect(text).toContain(trait)
      }
      expect(text).toContain(String(evidence.lifeStage.age))
      expect(text).toContain(evidence.lifeStage.focus)
      expect(text).toMatch(/công việc|nghề|vai trò|kỹ năng/)
      expect(text).toMatch(/tài chính|tiền|dòng tiền|ngân sách/)
      expect(text).toContain('Tam Hợp Phái')
      expect(text).toContain('紫微斗数全书')
      expect(article.faqs.map((faq) => `${faq.question} ${faq.answer}`).join(' ')).toContain(evidence.canChi)
    }
  })

  it('adds AI-native wrapper, top disclaimer, app FAQ, and conversion CTAs', () => {
    for (const article of cohortArticles()) {
      const allCtas = article.ctaModules
      const text = visibleArticleText(article)

      expect(article.topDisclaimer).toContain('Ứng dụng giải trí')
      expect(article.topDisclaimer).toContain('không phải lời tiên đoán')
      expect(article.aiNativeWrapper).toContain('Thuật toán Bói Toán')
      expect(article.aiNativeWrapper).toContain('50+ cổ thư')
      expect(allCtas.map((cta) => cta.placement).sort()).toEqual([
        'after-summary',
        'end-of-article',
        'mid-article',
        'sticky-mobile',
      ])
      expect(allCtas.every((cta) => cta.href === '/lap-la-so/')).toBe(true)
      expect(article.stickyMobileCta.placement).toBe('sticky-mobile')
      expect(article.stickyMobileCta.complianceNote).toBe('Tham khảo, không thay thế tư vấn chuyên môn.')
      expect(text).toContain('lá số cá nhân trên app Bói Toán')
      expect(text).toMatch(/thuật toán phát hiện/i)
      expect(text).toMatch(/miễn phí/i)
    }
  })

  it('varies career-lens phrasing by gender even when nạp âm is shared', () => {
    const grouped = new Map<string, YearForecastRegeneratedArticle[]>()
    for (const article of cohortArticles()) {
      const group = grouped.get(article.domainEvidence.napAm.name) ?? []
      group.push(article)
      grouped.set(article.domainEvidence.napAm.name, group)
    }

    for (const [napAm, articles] of grouped.entries()) {
      const male = articles.find((article) => article.domainEvidence.gender === 'nam')
      const female = articles.find((article) => article.domainEvidence.gender === 'nu')
      if (!male || !female) continue
      const maleCareer = male.summaryRows.find((row) => row.aspect === 'Công việc')?.trend
      const femaleCareer = female.summaryRows.find((row) => row.aspect === 'Công việc')?.trend
      expect(maleCareer, `${napAm} male career`).toBeTruthy()
      expect(femaleCareer, `${napAm} female career`).toBeTruthy()
      expect(maleCareer, `${napAm} gender phrasing differs`).not.toBe(femaleCareer)
    }
  })

  it('keeps regenerated cohort prose in reviewable SEO length range', () => {
    for (const article of cohortArticles()) {
      const words = getYearForecastRegeneratedWordCount(article)
      expect(words, `${article.slug} word count`).toBeGreaterThanOrEqual(1500)
      expect(words, `${article.slug} word count`).toBeLessThanOrEqual(2600)
    }
  })

  it('passes prepared REQ-10 duplicate sentence scan against batch and existing year pages', () => {
    const articles = cohortArticles()
    const findings = scanReq10Duplicates(articles)

    if (process.env.WRITE_YEAR_BATCH_ARTIFACTS === '1') {
      const articlePayload = articles.map((article) => ({
        ...article,
        wordCount: getYearForecastRegeneratedWordCount(article),
      }))
      writeJson(BATCH_ARTIFACT_JSON, articlePayload)
      writeFileSync(BATCH_ARTIFACT_MD, renderBatchMarkdown(articles))
      writeJson(BATCH_PROMPT_PAYLOAD_JSON, articles.map((article) => article.regenerationInput))
      writeJson(BATCH_REQ10_SCAN_JSON, {
        generatedAt: '2026-05-09T14:21:00+07:00',
        cohortYears: YEAR_FORECAST_PHASE3_COHORT_YEARS,
        articleCount: articles.length,
        comparedAgainstExistingYearPages: SEO_FORECAST_SLUGS.length - articles.length,
        thresholdWords: SHORT_DUPLICATE_THRESHOLD_WORDS,
        rule: `No sentence with ${SHORT_DUPLICATE_THRESHOLD_WORDS}+ words may be identical across regenerated cohort articles or existing non-cohort year pages.`,
        findingCount: findings.length,
        findings,
      })
    }

    expect(findings).toEqual([])
  })
})
