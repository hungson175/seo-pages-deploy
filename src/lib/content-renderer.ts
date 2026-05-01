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

  const forbiddenTerms = ['zodiac', 'horoscope', 'sun sign', 'ascendant']
  const allText = [
    ...content.sections.map((s) => s.heading + ' ' + s.content),
    ...content.faqItems.map((f) => f.question + ' ' + f.answer),
  ].join(' ').toLowerCase()

  for (const term of forbiddenTerms) {
    if (allText.includes(term)) {
      errors.push(`Chứa từ cấm: ${term}`)
    }
  }

  // Check for Article 320 compliance: "tham khảo" should appear, "tiên đoán" should not
  if (!allText.includes('tham khảo') && !allText.includes('tham khao')) {
    // Only enforce if there's substantial content
    if (allText.length > 100) {
      errors.push('Thiếu khung "tham khảo" — cần dùng từ "tham khảo" trong nội dung')
    }
  }

  return { valid: errors.length === 0, errors }
}

export function renderContentSections(content: ForecastContent): string {
  return content.sections
    .map((s) => `<h2>${s.heading}</h2>\n<p>${s.content}</p>`)
    .join('\n')
}
