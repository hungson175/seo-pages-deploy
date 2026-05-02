import { describe, it, expect } from 'vitest'
import { checkBannedTerms, BANNED_TERMS } from '../compliance/check-banned-terms'

describe('checkBannedTerms', () => {
  it('detects "dự đoán chính xác"', () => {
    const content = 'Năm 2026 dự đoán chính xác vận mệnh của bạn.'
    const violations = checkBannedTerms(content, 'test.ts')
    expect(violations).toHaveLength(1)
    expect(violations[0].term).toBe('dự đoán chính xác')
    expect(violations[0].replacement).toBe('gợi ý xu hướng tham khảo')
  })

  it('detects "phát tài"', () => {
    const content = 'Năm nay bạn sẽ phát tài.'
    const violations = checkBannedTerms(content, 'test.ts')
    expect(violations).toHaveLength(1)
    expect(violations[0].term).toBe('phát tài')
  })

  it('detects "AI thầy bói"', () => {
    const content = 'AI thầy bói sẽ xem cho bạn.'
    const violations = checkBannedTerms(content, 'test.ts')
    expect(violations).toHaveLength(1)
    expect(violations[0].term).toBe('AI thầy bói')
  })

  it('returns empty for compliant content', () => {
    const content =
      'Nội dung chỉ mang tính tham khảo. Gợi ý xu hướng tham khảo cho năm 2026.'
    const violations = checkBannedTerms(content, 'test.ts')
    expect(violations).toHaveLength(0)
  })

  it('detects multiple violations in one file', () => {
    const content = 'Dự đoán chính xác: bạn sẽ phát tài và trúng lớn.'
    const violations = checkBannedTerms(content, 'test.ts')
    expect(violations.length).toBeGreaterThanOrEqual(2)
  })

  it('is case-insensitive', () => {
    const content = 'DỰ ĐOÁN CHÍNH XÁC vận mệnh.'
    const violations = checkBannedTerms(content, 'test.ts')
    expect(violations).toHaveLength(1)
  })

  it('reports correct line numbers', () => {
    const content = 'Line 1 clean\nLine 2 dự đoán chính xác\nLine 3 clean'
    const violations = checkBannedTerms(content, 'test.ts')
    expect(violations[0].line).toBe(2)
  })

  it('has all banned terms from CMO pack', () => {
    // Verify the list is not empty and contains key terms
    expect(BANNED_TERMS.length).toBeGreaterThanOrEqual(10)
    const terms = BANNED_TERMS.map((t) => t.pattern)
    expect(terms).toContain('dự đoán chính xác')
    expect(terms).toContain('phát tài')
    expect(terms).toContain('hóa giải vận hạn')
    expect(terms).toContain('AI thầy bói')
    expect(terms).toContain('hàng đầu Việt Nam')
  })
})
