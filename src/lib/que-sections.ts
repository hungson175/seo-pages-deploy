export interface QueSection {
  id: string
  heading: string
  required: boolean
}

export const QUE_SECTIONS: QueSection[] = [
  { id: 'y-nghia', heading: 'Y Nghia Que', required: true },
  { id: 'luc-hao', heading: 'Luc Hao', required: true },
  { id: 'ung-dung', heading: 'Ung Dung', required: true },
  { id: 'bien-que', heading: 'Bien Que', required: false },
  { id: 'faq', heading: 'Cau Hoi Thuong Gap', required: true },
  { id: 'cta', heading: 'Gieo Que Ngay', required: true },
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
