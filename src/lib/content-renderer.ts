import { validateComplianceContent } from './compliance/policy'

export interface ContentSection {
  heading: string
  content: string
}

export interface ForecastContent {
  sections: ContentSection[]
  faqItems: Array<{ question: string; answer: string }>
}

export function validateContent(content: ForecastContent): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (content.sections.length < 5) {
    errors.push('Cần ít nhất 5 sections')
  }
  if (content.sections.length > 7) {
    errors.push('Tối đa 7 sections')
  }

  if (content.faqItems.length < 2) {
    errors.push('Cần ít nhất 2 FAQ items')
  }
  if (content.faqItems.length > 4) {
    errors.push('Tối đa 4 FAQ items')
  }

  const compliance = validateComplianceContent(content, {
    requireThamKhaoIfSubstantial: true,
    rejectIncorrectBrightnessTerms: true,
  })
  errors.push(...compliance.errors)

  return { valid: errors.length === 0, errors }
}

export function renderContentSections(content: ForecastContent): string {
  return content.sections
    .map((s) => `<h2>${s.heading}</h2>\n<p>${s.content}</p>`)
    .join('\n')
}
