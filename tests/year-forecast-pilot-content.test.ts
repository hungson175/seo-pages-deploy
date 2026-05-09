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
  getYearForecastPilotArticle,
  getYearForecastPilotWordCount,
  type YearForecastPilotArticle,
} from '../src/content/year-forecast-pilot-content'

const PILOT_ARTIFACT_JSON = '/tmp/po_year_articles_phase2_pilot_articles_202605091024.json'
const PILOT_ARTIFACT_MD = '/tmp/po_year_articles_phase2_pilot_articles_202605091024.md'
const PILOT_PROMPT_PAYLOAD_JSON = '/tmp/po_year_articles_phase2_prompt_payloads_202605091024.json'
const PILOT_REQ10_SCAN_JSON = '/tmp/po_year_articles_phase2_req10_scan_202605091024.json'

function seedFor(slug: string): SeoForecastSeed {
  const seed = SEO_FORECAST_SEEDS.find((item) => item.slug === slug)
  expect(seed, slug).toBeDefined()
  return seed!
}

function pilotArticles(): YearForecastPilotArticle[] {
  return YEAR_FORECAST_PHASE2_PILOT_SLUGS.map((slug) => {
    const article = getYearForecastPilotArticle(seedFor(slug))
    expect(article, slug).not.toBeNull()
    return article!
  })
}

function visiblePilotText(article: YearForecastPilotArticle): string {
  return [
    article.h1,
    article.description,
    article.methodNote,
    ...article.intro,
    ...article.summaryRows.flatMap((row) => [row.aspect, row.trend, row.action]),
    ...article.sections.flatMap((section) => [section.heading, ...section.content]),
    ...article.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ')
}

function visibleLegacyPageText(slug: string): string {
  const page = getSeoForecastPage(slug)
  expect(page, slug).not.toBeNull()
  return [
    page!.h1,
    page!.description,
    page!.methodNote,
    ...page!.intro,
    ...page!.summaryRows.flatMap((row) => [row.aspect, row.trend, row.action]),
    ...page!.sections.flatMap((section) => [section.heading, ...section.content]),
    ...page!.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ')
}

function normalizeSentence(sentence: string): string {
  return sentence
    .toLowerCase()
    .normalize('NFC')
    .replace(/[“”"'`]/g, '')
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

function sentenceMapFor(text: string): Map<string, string> {
  const map = new Map<string, string>()
  for (const sentence of splitSentences(text)) {
    if (countWords(sentence) <= 25) continue
    map.set(normalizeSentence(sentence), sentence)
  }
  return map
}

interface DuplicateSentenceFinding {
  pilotSlug: string
  comparedSlug: string
  sentence: string
  wordCount: number
}

function scanReq10Duplicates(articles: YearForecastPilotArticle[]): DuplicateSentenceFinding[] {
  const existingSentenceMaps = new Map(
    SEO_FORECAST_SLUGS.map((slug) => [slug, sentenceMapFor(visibleLegacyPageText(slug))]),
  )
  const pilotSentenceMaps = new Map(
    articles.map((article) => [article.slug, sentenceMapFor(visiblePilotText(article))]),
  )
  const findings: DuplicateSentenceFinding[] = []

  for (const article of articles) {
    const pilotSentences = pilotSentenceMaps.get(article.slug)!
    for (const [normalizedSentence, originalSentence] of pilotSentences.entries()) {
      for (const [legacySlug, legacySentences] of existingSentenceMaps.entries()) {
        if (legacySentences.has(normalizedSentence)) {
          findings.push({
            pilotSlug: article.slug,
            comparedSlug: `legacy:${legacySlug}`,
            sentence: originalSentence,
            wordCount: countWords(originalSentence),
          })
        }
      }

      for (const [otherPilotSlug, otherPilotSentences] of pilotSentenceMaps.entries()) {
        if (otherPilotSlug === article.slug) continue
        if (otherPilotSentences.has(normalizedSentence)) {
          findings.push({
            pilotSlug: article.slug,
            comparedSlug: `pilot:${otherPilotSlug}`,
            sentence: originalSentence,
            wordCount: countWords(originalSentence),
          })
        }
      }
    }
  }

  return findings
}

function renderPilotMarkdown(articles: YearForecastPilotArticle[]): string {
  return articles
    .map((article) => [
      `# ${article.h1}`,
      '',
      `Slug: ${article.slug}`,
      `Status: ${article.contentOrigin}; ${article.reviewStatus}`,
      `Method: ${article.methodNote}`,
      '',
      '## Intro',
      ...article.intro.map((paragraph) => `${paragraph}\n`),
      '## Summary',
      ...article.summaryRows.map((row) => `- ${row.aspect}: ${row.trend} Action: ${row.action}`),
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

describe('year forecast phase 2 pilot content', () => {
  it('prepares exactly three offline pilot articles and no full-batch content', () => {
    expect(YEAR_FORECAST_PHASE2_PILOT_SLUGS).toEqual([
      'tuoi-ty-1984-nam',
      'tuoi-suu-1985-nu',
      'tuoi-dan-1986-nam',
    ])
    expect(pilotArticles()).toHaveLength(3)
    expect(getYearForecastPilotArticle(seedFor('tuoi-ty-1984-nu'))).toBeNull()
    expect(getYearForecastPilotArticle(seedFor('tuoi-suu-1985-nam'))).toBeNull()
  })

  it('uses deterministic domain evidence/regeneration inputs instead of legacy seed prose', () => {
    for (const article of pilotArticles()) {
      const seed = seedFor(article.slug)
      const text = visiblePilotText(article)

      expect(article.contentOrigin).toBe('phase2-pilot-offline-regenerated')
      expect(article.reviewStatus).toBe('needs-domain-copy-seo-review')
      expect(article.regenerationInput.slug).toBe(article.slug)
      expect(article.domainEvidence.canChi).toBe(seed.canChi)
      expect(article.domainEvidence.napAm.name).toBe(seed.element)
      for (const legacySeedFragment of [seed.tone, seed.career, seed.money, seed.love, seed.health, seed.advice]) {
        expect(text, `${article.slug} should not copy legacy seed fragment`).not.toContain(legacySeedFragment)
      }
    }
  })

  it('includes REQ-1..REQ-9 evidence in every pilot article body and FAQ', () => {
    for (const article of pilotArticles()) {
      const evidence = article.domainEvidence
      const text = visiblePilotText(article)

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
      expect(text).toContain(evidence.napAm.careerLens)
      expect(text).toContain(evidence.napAm.moneyLens)
      expect(text).toContain('Tam Hợp Phái')
      expect(text).toContain('紫微斗数全书')
      expect(article.faqs.map((faq) => `${faq.question} ${faq.answer}`).join(' ')).toContain(evidence.canChi)
    }
  })

  it('keeps pilot prose substantial enough for human review without route deployment', () => {
    for (const article of pilotArticles()) {
      const words = getYearForecastPilotWordCount(article)
      expect(words, `${article.slug} word count`).toBeGreaterThanOrEqual(1300)
      expect(words, `${article.slug} word count`).toBeLessThanOrEqual(2200)
    }
  })

  it('passes prepared REQ-10 duplicate sentence scan against pilot and existing year pages', () => {
    const articles = pilotArticles()
    const findings = scanReq10Duplicates(articles)

    if (process.env.WRITE_YEAR_PILOT_ARTIFACTS === '1') {
      const articlePayload = articles.map((article) => ({
        ...article,
        wordCount: getYearForecastPilotWordCount(article),
      }))
      writeJson(PILOT_ARTIFACT_JSON, articlePayload)
      writeFileSync(PILOT_ARTIFACT_MD, renderPilotMarkdown(articles))
      writeJson(PILOT_PROMPT_PAYLOAD_JSON, articles.map((article) => article.regenerationInput))
      writeJson(PILOT_REQ10_SCAN_JSON, {
        generatedAt: '2026-05-09T10:24:00+07:00',
        pilotSlugs: YEAR_FORECAST_PHASE2_PILOT_SLUGS,
        comparedAgainstExistingYearPages: SEO_FORECAST_SLUGS.length,
        rule: 'No sentence with more than 25 words may be identical across pilot articles or existing year pages.',
        findingCount: findings.length,
        findings,
      })
    }

    expect(findings).toEqual([])
  })
})
