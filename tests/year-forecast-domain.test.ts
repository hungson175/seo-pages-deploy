import { describe, expect, it } from 'vitest'
import {
  SEO_FORECAST_SEEDS,
  getSeoForecastPage,
  isSeoForecastReadyForPublication,
} from '../src/content/seo-forecasts'
import {
  REQUIREMENT_IDS,
  buildYearForecastRegenerationInput,
  deriveYearForecastDomainEvidence,
} from '../src/content/year-forecast-domain'

const PHASE1_SEEDS_1984_1995 = SEO_FORECAST_SEEDS.filter((seed) => seed.year >= 1984 && seed.year <= 1995)
const PHASE1_SLUGS_1984_1995 = PHASE1_SEEDS_1984_1995.map((seed) => seed.slug)

describe('year forecast domain evidence phase 1', () => {
  it('covers the expected 1984-1995 year x gender cohort', () => {
    expect(PHASE1_SEEDS_1984_1995).toHaveLength(24)
    expect(PHASE1_SLUGS_1984_1995).toContain('tuoi-ty-1984-nam')
    expect(PHASE1_SLUGS_1984_1995).toContain('tuoi-ty-1984-nu')
    expect(PHASE1_SLUGS_1984_1995).toContain('tuoi-hoi-1995-nam')
    expect(PHASE1_SLUGS_1984_1995).toContain('tuoi-hoi-1995-nu')
  })

  it('derives the seven required domain-unique inputs for every 1984-1995 page', () => {
    for (const seed of PHASE1_SEEDS_1984_1995) {
      const evidence = deriveYearForecastDomainEvidence(seed)

      expect(evidence.canChi, `${seed.slug} Can Chi`).toBe(seed.canChi)
      expect(evidence.thienCan, `${seed.slug} Thiên Can`).toBeTruthy()
      expect(evidence.diaChi, `${seed.slug} Địa Chi`).toBeTruthy()
      expect(evidence.napAm.name, `${seed.slug} nạp âm`).toBe(seed.element)
      expect(evidence.napAm.element, `${seed.slug} nạp âm element`).toMatch(/Kim|Mộc|Thủy|Hỏa|Thổ/)
      expect(evidence.cungMenh.name, `${seed.slug} Cung mệnh`).toBeTruthy()
      expect(evidence.cungMenh.element, `${seed.slug} Cung mệnh element`).toMatch(/Kim|Mộc|Thủy|Hỏa|Thổ/)
      expect(evidence.thienCanRelationToBinh.label, `${seed.slug} Can↔Bính`).toMatch(/Tương sinh|Tỷ kiên|Tương khắc/)
      expect(evidence.diaChiRelationToNgo.label, `${seed.slug} Chi↔Ngọ`).toMatch(
        /Tương xung|Tương hại|Tam hợp|Tương phá|Trung tính|Tự hình|Tương hợp/,
      )
      expect(evidence.lifeStage.age, `${seed.slug} age`).toBe(2026 - seed.year + 1)
      expect(evidence.lifeStage.focus, `${seed.slug} life stage`).toBeTruthy()
      expect(evidence.animalTraits.traits, `${seed.slug} animal traits`).toHaveLength(3)
      expect(evidence.animalTraits.sentences, `${seed.slug} animal trait sentences`).toHaveLength(3)
      expect(evidence.cungMenh.validationStatus, `${seed.slug} Cung mệnh validation`).toBe('boi_toan_spec')
    }
  })

  it('materializes REQ-1..REQ-10 evidence for every 1984-1995 page', () => {
    for (const seed of PHASE1_SEEDS_1984_1995) {
      const evidence = deriveYearForecastDomainEvidence(seed)
      const requirementIds = Object.keys(evidence.requirementEvidence).sort()

      expect(requirementIds, `${seed.slug} requirement ids`).toEqual([...REQUIREMENT_IDS].sort())
      for (const req of REQUIREMENT_IDS) {
        expect(evidence.requirementEvidence[req], `${seed.slug} ${req}`).toBeTruthy()
      }

      expect(evidence.requirementEvidence['REQ-1']).toContain(evidence.canChi)
      expect(evidence.requirementEvidence['REQ-1']).toContain(evidence.napAm.name)
      expect(evidence.requirementEvidence['REQ-2']).toContain(evidence.genderLabel)
      expect(evidence.requirementEvidence['REQ-2']).toContain(evidence.cungMenh.name)
      expect(evidence.requirementEvidence['REQ-3']).toContain(evidence.thienCan)
      expect(evidence.requirementEvidence['REQ-3']).toContain('Bính')
      expect(evidence.requirementEvidence['REQ-4']).toContain(evidence.diaChi)
      expect(evidence.requirementEvidence['REQ-4']).toContain('Ngọ')
      expect(evidence.requirementEvidence['REQ-5']).toContain(evidence.animalTraits.traits[0])
      expect(evidence.requirementEvidence['REQ-6']).toContain(String(evidence.lifeStage.age))
      expect(evidence.requirementEvidence['REQ-7']).toContain(evidence.napAm.careerLens)
      expect(evidence.requirementEvidence['REQ-7']).toContain(evidence.napAm.moneyLens)
      expect(evidence.requirementEvidence['REQ-8']).toContain('Tam Hợp Phái')
      expect(evidence.requirementEvidence['REQ-8']).toContain('紫微斗数全书')
      expect(evidence.requirementEvidence['REQ-9']).toContain(evidence.canChi)
      expect(evidence.requirementEvidence['REQ-10']).toContain('25 từ')
    }
  })

  it('matches Bói-Toán spec spot checks for 1984-1995 male rows and supplied female examples', () => {
    expect(deriveYearForecastDomainEvidence(SEO_FORECAST_SEEDS.find((seed) => seed.slug === 'tuoi-ty-1984-nam')!)).toMatchObject({
      thienCan: 'Giáp',
      diaChi: 'Tý',
      napAm: { name: 'Hải Trung Kim', element: 'Kim' },
      cungMenh: { name: 'Đoài', element: 'Kim', validationStatus: 'boi_toan_spec' },
      lifeStage: { age: 43, bucket: '36-45' },
      thienCanRelationToBinh: { label: 'Tương sinh' },
      diaChiRelationToNgo: { label: 'Tương xung' },
    })

    expect(deriveYearForecastDomainEvidence(SEO_FORECAST_SEEDS.find((seed) => seed.slug === 'tuoi-suu-1985-nu')!)).toMatchObject({
      thienCan: 'Ất',
      diaChi: 'Sửu',
      napAm: { name: 'Hải Trung Kim', element: 'Kim' },
      cungMenh: { name: 'Ly', element: 'Hỏa', validationStatus: 'boi_toan_spec' },
      lifeStage: { age: 42, bucket: '36-45' },
      thienCanRelationToBinh: { label: 'Tương sinh' },
      diaChiRelationToNgo: { label: 'Tương hại' },
    })

    expect(deriveYearForecastDomainEvidence(SEO_FORECAST_SEEDS.find((seed) => seed.slug === 'tuoi-dan-1986-nam')!)).toMatchObject({
      cungMenh: { name: 'Khôn', element: 'Thổ', validationStatus: 'boi_toan_spec' },
      thienCanRelationToBinh: { label: 'Tỷ kiên' },
      diaChiRelationToNgo: { label: 'Tam hợp' },
    })

    expect(deriveYearForecastDomainEvidence(SEO_FORECAST_SEEDS.find((seed) => seed.slug === 'tuoi-hoi-1995-nam')!)).toMatchObject({
      cungMenh: { name: 'Khôn', element: 'Thổ', validationStatus: 'boi_toan_spec' },
      lifeStage: { age: 32, bucket: '26-35' },
      diaChiRelationToNgo: { label: 'Tương hại' },
    })

    expect(deriveYearForecastDomainEvidence(SEO_FORECAST_SEEDS.find((seed) => seed.slug === 'tuoi-thin-2000-nam')!)).toMatchObject({
      cungMenh: { name: 'Ly', element: 'Hỏa', validationStatus: 'boi_toan_spec' },
    })
    expect(deriveYearForecastDomainEvidence(SEO_FORECAST_SEEDS.find((seed) => seed.slug === 'tuoi-thin-2000-nu')!)).toMatchObject({
      cungMenh: { name: 'Càn', element: 'Kim', validationStatus: 'boi_toan_spec' },
    })
    expect(deriveYearForecastDomainEvidence(SEO_FORECAST_SEEDS.find((seed) => seed.slug === 'tuoi-ti-2001-nam')!)).toMatchObject({
      cungMenh: { name: 'Cấn', element: 'Thổ', validationStatus: 'boi_toan_spec' },
    })
    expect(deriveYearForecastDomainEvidence(SEO_FORECAST_SEEDS.find((seed) => seed.slug === 'tuoi-ti-2001-nu')!)).toMatchObject({
      cungMenh: { name: 'Đoài', element: 'Kim', validationStatus: 'boi_toan_spec' },
    })

  })

  it('builds offline regeneration inputs without calling any LLM provider', () => {
    const seed = SEO_FORECAST_SEEDS.find((item) => item.slug === 'tuoi-ty-1984-nam')!
    const input = buildYearForecastRegenerationInput(seed)

    expect(input).toMatchObject({
      slug: 'tuoi-ty-1984-nam',
      targetYear: 2026,
      targetYearCanChi: 'Bính Ngọ',
      canChi: 'Giáp Tý',
      thienCan: 'Giáp',
      diaChi: 'Tý',
      napAm: { name: 'Hải Trung Kim' },
      cungMenh: { name: 'Đoài' },
      methodCitation: 'Tam Hợp Phái / 《紫微斗数全书》',
    })
    expect(input.generationInstruction).toContain('do not copy')
    expect(input.generationInstruction).toContain('spin')
  })

  it('keeps the 1984-1995 cohort blocked from publication after Phase 3 route integration', () => {
    for (const seed of PHASE1_SEEDS_1984_1995) {
      const page = getSeoForecastPage(seed.slug)
      expect(page, seed.slug).not.toBeNull()
      expect(page?.contentOrigin, seed.slug).toBe('regenerated-domain-content')
      expect(page?.regenerationStatus, seed.slug).toBe('phase3-batch-review-ready')
      expect(page?.publicationGate.status, seed.slug).toBe('blocked_pending_review')
      expect(page?.publicationGate.blockers, seed.slug).toContain('domain_copy_seo_review_required')
      expect(page?.publicationGate.blockers, seed.slug).toContain('intentional_publication_flip_required')
      expect(page?.publicationGate.evidenceReady, seed.slug).toEqual(REQUIREMENT_IDS)
      expect(page?.publicationGate.reason, seed.slug).toContain('route-integrated for review only')
      expect(isSeoForecastReadyForPublication(page!), seed.slug).toBe(false)
    }
  })
})
