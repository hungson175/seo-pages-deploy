/**
 * Canonical compliance policy for Bói Toán SEO/generated content.
 *
 * This module is intentionally phrase-aware: approved disclaimer language such
 * as "không phải lời tiên đoán" is allowed, while deterministic claims like
 * "tiên đoán rằng" or "sẽ chắc chắn" are rejected.
 */

export interface ComplianceValidationResult {
  valid: boolean
  compliant: boolean
  errors: string[]
}

export interface ComplianceSection {
  heading?: string
  content: string
}

export interface ComplianceFaq {
  question: string
  answer: string
}

export interface ComplianceContentObject {
  sections?: ComplianceSection[]
  faqs?: ComplianceFaq[]
  faqItems?: ComplianceFaq[]
}

export interface ComplianceOptions {
  requireThamKhaoPerSection?: boolean
  requireThamKhaoIfSubstantial?: boolean
  substantialContentLength?: number
  rejectIncorrectBrightnessTerms?: boolean
}

const WESTERN_ASTROLOGY_TERMS = ['zodiac', 'horoscope', 'sun sign', 'ascendant', 'moon sign']
const INCORRECT_BRIGHTNESS_TERMS = ['strong', 'weak']

const DETERMINISTIC_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'tiên đoán rằng', pattern: /tiên\s*đoán\s*rằng/iu },
  { label: 'sẽ chắc chắn', pattern: /sẽ\s*chắc\s*chắn/iu },
  { label: 'định mệnh buộc', pattern: /định\s*mệnh\s*buộc/iu },
  { label: 'đúng 100%', pattern: /đúng\s*100\s*%/iu },
  { label: 'dự đoán chính xác', pattern: /dự\s*đoán\s*chính\s*xác/iu },
  { label: 'số này chắc chắn', pattern: /số\s*này\s*chắc\s*chắn/iu },
  { label: 'đầu tư tháng này sẽ thắng', pattern: /đầu\s*tư\s*tháng\s*này\s*sẽ\s*thắng/iu },
  { label: 'hóa giải bệnh', pattern: /hóa\s*giải\s*bệnh/iu },
  { label: 'hóa giải vận hạn', pattern: /hóa\s*giải\s*vận\s*hạn/iu },
  { label: 'cúng giải hạn', pattern: /cúng\s*giải\s*hạn/iu },
]

const ALLOWED_TIEN_DOAN_DISCLAIMERS = [
  /không\s*phải\s*lời\s*tiên\s*đoán/giu,
  /không\s*phải\s*tiên\s*đoán/giu,
]

function stripDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

function hasThamKhao(text: string): boolean {
  const lower = text.toLowerCase()
  const plain = stripDiacritics(lower)
  return lower.includes('tham khảo') || plain.includes('tham khao')
}

function extractParts(input: string | ComplianceContentObject): {
  allText: string
  sections: ComplianceSection[]
  faqs: ComplianceFaq[]
} {
  if (typeof input === 'string') {
    return { allText: input, sections: [{ content: input }], faqs: [] }
  }

  const sections = input.sections ?? []
  const faqs = input.faqs ?? input.faqItems ?? []
  const allText = [
    ...sections.map((section) => `${section.heading ?? ''} ${section.content}`),
    ...faqs.map((faq) => `${faq.question} ${faq.answer}`),
  ].join(' ')

  return { allText, sections, faqs }
}

function containsUnapprovedTienDoan(text: string): boolean {
  if (!/tiên\s*đoán/iu.test(text)) {
    return false
  }

  const sanitized = ALLOWED_TIEN_DOAN_DISCLAIMERS.reduce(
    (current, allowed) => current.replace(allowed, ' '),
    text,
  )

  return /tiên\s*đoán/iu.test(sanitized)
}

export function validateComplianceContent(
  input: string | ComplianceContentObject,
  options: ComplianceOptions = {},
): ComplianceValidationResult {
  const errors: string[] = []
  const { allText, sections } = extractParts(input)
  const lower = allText.toLowerCase()

  for (const { label, pattern } of DETERMINISTIC_PATTERNS) {
    if (pattern.test(allText)) {
      errors.push(`Found deterministic claim: ${label}`)
    }
  }

  if (containsUnapprovedTienDoan(allText)) {
    errors.push('Found forbidden term: tiên đoán')
  }

  // Phrase-aware: reject "định mệnh" fatalism, but allow normal domain
  // wording such as "xác định Mệnh Cung" where "định" belongs to
  // "xác định" and "Mệnh" is the palace name.
  const fatalismText = allText.replace(/xác\s*định\s*Mệnh/giu, 'xác định Menh')
  if (/(^|[^\p{L}])định\s*mệnh([^\p{L}]|$)/iu.test(fatalismText)) {
    errors.push('Found forbidden term: định mệnh')
  }

  for (const term of WESTERN_ASTROLOGY_TERMS) {
    if (lower.includes(term)) {
      errors.push(`Found Western astrology term: ${term}`)
    }
  }

  if (options.rejectIncorrectBrightnessTerms) {
    for (const term of INCORRECT_BRIGHTNESS_TERMS) {
      if (lower.includes(term)) {
        errors.push(`Found incorrect brightness term: ${term}`)
      }
    }
  }

  if (options.requireThamKhaoPerSection) {
    for (const section of sections) {
      if (!hasThamKhao(section.content)) {
        errors.push(`Missing tham khảo in section: ${section.heading ?? ''}`.trim())
      }
    }
  }

  if (options.requireThamKhaoIfSubstantial) {
    const threshold = options.substantialContentLength ?? 100
    if (allText.length > threshold && !hasThamKhao(allText)) {
      errors.push('Thiếu khung "tham khảo" — cần dùng từ "tham khảo" trong nội dung')
    }
  }

  return {
    valid: errors.length === 0,
    compliant: errors.length === 0,
    errors,
  }
}
