/**
 * Validate forecast content for Article 320 compliance and domain rules.
 */

export interface ValidationResult {
  compliant: boolean
  errors: string[]
}

const FORBIDDEN_TERMS = ['tiên đoán', 'định mệnh']
const WESTERN_ASTROLOGY_TERMS = ['zodiac', 'horoscope', 'sun sign', 'ascendant']
const INCORRECT_BRIGHTNESS = ['strong', 'weak']

export function validateContent(content: {
  sections: Array<{ heading: string; content: string }>
  faqs: Array<{ question: string; answer: string }>
}): ValidationResult {
  const errors: string[] = []
  const allText = [
    ...content.sections.map((s) => s.content),
    ...content.faqs.map((f) => f.question + ' ' + f.answer),
  ].join(' ')

  // Article 320: check for forbidden terms
  for (const term of FORBIDDEN_TERMS) {
    if (allText.toLowerCase().includes(term.toLowerCase())) {
      errors.push(`Found forbidden term: ${term}`)
    }
  }

  // Article 320: every section must contain "tham khảo"
  for (const section of content.sections) {
    if (!section.content.includes('tham khảo')) {
      errors.push('Missing tham khảo in section: ' + section.heading)
    }
  }

  // Domain rule: no Western astrology
  for (const term of WESTERN_ASTROLOGY_TERMS) {
    if (allText.toLowerCase().includes(term.toLowerCase())) {
      errors.push(`Found Western astrology term: ${term}`)
    }
  }

  // Domain rule: correct brightness terminology
  for (const term of INCORRECT_BRIGHTNESS) {
    if (allText.toLowerCase().includes(term.toLowerCase())) {
      errors.push(`Found incorrect brightness term: ${term}`)
    }
  }

  return {
    compliant: errors.length === 0,
    errors,
  }
}
