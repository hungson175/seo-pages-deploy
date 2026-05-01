export interface QueSection {
  id: string
  heading: string
  required: boolean
}

export const QUE_SECTIONS: QueSection[] = [
  { id: 'y-nghia', heading: 'Ý Nghĩa Quẻ', required: true },
  { id: 'luc-hao', heading: 'Lục Hào', required: true },
  { id: 'ung-dung', heading: 'Ứng Dụng', required: true },
  { id: 'bien-que', heading: 'Biến Quẻ', required: false },
  { id: 'faq', heading: 'Câu Hỏi Thường Gặp', required: true },
  { id: 'cta', heading: 'Gieo Quẻ Ngay', required: true },
]

export function validateQueSections(sections: QueSection[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (sections.length < 5) {
    errors.push('Can it nhat 5 sections')
  }
  if (sections.length > 7) {
    errors.push('Toi da 7 sections')
  }

  for (const required of QUE_SECTIONS.filter((s) => s.required)) {
    if (!sections.some((s) => s.id === required.id)) {
      errors.push(`Thieu section: ${required.heading}`)
    }
  }

  return { valid: errors.length === 0, errors }
}
