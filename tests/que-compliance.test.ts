import { describe, expect, it } from 'vitest'
import { QUE_CONTENT } from '@/content/que'

const riskyQuePatterns = [
  /lời đoán/i,
  /tài chính/i,
  /sức khỏe/i,
  /đầu tư/i,
  /mạo hiểm/i,
  /tòa án/i,
  /trọng tài/i,
  /luật pháp/i,
  /pháp lý/i,
  /kiện tụng/i,
  /chữa bệnh/i,
  /sống lâu/i,
  /giải hạn/i,
  /đổi vận/i,
  /đúng 100%/i,
  /chắc chắn/i,
  /phát tài/i,
]

describe('Kinh Dịch quẻ compliance copy', () => {
  it('uses wellbeing/resource-management framing instead of professional-claim language', () => {
    for (const content of Object.values(QUE_CONTENT)) {
      const combined = [
        content.name,
        content.meaning,
        content.judgment,
        content.application,
        content.advice,
        content.changingLines,
      ].join('\n')

      for (const pattern of riskyQuePatterns) {
        expect(combined, `${content.slug} contains risky pattern ${pattern}`).not.toMatch(pattern)
      }
    }
  })

  it('keeps every quẻ framed as reflective guidance, not a deterministic prediction', () => {
    for (const content of Object.values(QUE_CONTENT)) {
      const combined = `${content.judgment}\n${content.advice}`.toLowerCase()
      expect(combined).toMatch(/tinh thần|khuyên|nhắc/)
    }
  })
})
