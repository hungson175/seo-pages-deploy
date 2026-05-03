/**
 * Validate forecast content for Article 320 compliance and domain rules.
 */

import { validateComplianceContent } from '../compliance/policy'

export interface ValidationResult {
  compliant: boolean
  errors: string[]
}

export function validateContent(content: {
  sections: Array<{ heading: string; content: string }>
  faqs: Array<{ question: string; answer: string }>
}): ValidationResult {
  const result = validateComplianceContent(content, {
    requireThamKhaoPerSection: true,
    rejectIncorrectBrightnessTerms: true,
  })

  return {
    compliant: result.valid,
    errors: result.errors,
  }
}
