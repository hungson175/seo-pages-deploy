/**
 * Banned term checker for CI pipeline.
 * Validates content files against CMO banned/replacement list.
 * Based on: concepts/vietnamese-divination-trust-conversion.md
 *
 * Usage: npx tsx src/lib/compliance/check-banned-terms.ts
 * Exit code 0 = clean, 1 = violations found
 */

const BANNED_TERMS: Array<{ pattern: string; replacement: string }> = [
  { pattern: 'dự đoán chính xác', replacement: 'gợi ý xu hướng tham khảo' },
  { pattern: 'phán vận mệnh', replacement: 'đọc lá số theo tinh thần tham khảo' },
  { pattern: 'số này chắc chắn', replacement: 'lá số gợi ý / có xu hướng' },
  { pattern: 'phát tài', replacement: 'quản lý nguồn lực tốt hơn' },
  { pattern: 'trúng lớn', replacement: 'giữ kỷ luật tiền bạc' },
  { pattern: 'đầu tư tháng này sẽ thắng', replacement: 'thận trọng với quyết định tiền bạc lớn' },
  { pattern: 'dễ mắc bệnh', replacement: 'nhịp sống / tinh thần / dấu hiệu nên chăm sóc sớm' },
  { pattern: 'hạn sức khỏe nặng', replacement: 'nhịp sống / tinh thần / dấu hiệu nên chăm sóc sớm' },
  { pattern: 'hóa giải bệnh', replacement: 'không thay thế tư vấn y tế' },
  { pattern: 'kiện tụng', replacement: 'vấn đề giấy tờ / cần tư vấn chuyên môn' },
  { pattern: 'thắng kiện', replacement: 'cần tư vấn chuyên môn khi liên quan pháp lý' },
  { pattern: 'hóa giải vận hạn', replacement: 'điều chỉnh hành vi / chuẩn bị kỹ hơn' },
  { pattern: 'cúng giải hạn', replacement: 'giữ tâm thế chủ động' },
  { pattern: 'trọn đời', replacement: 'báo cáo cá nhân hóa cho lá số này' },
  { pattern: 'AI thầy bói', replacement: 'AI giải thích lá số / AI hỗ trợ luận giải' },
  { pattern: 'khoa học dữ liệu chứng minh', replacement: 'dựng theo quy tắc / có phương pháp rõ ràng' },
  { pattern: 'hàng đầu Việt Nam', replacement: 'rõ phương pháp / dễ kiểm chứng / không hù dọa' },
]

export interface Violation {
  file: string
  line: number
  term: string
  replacement: string
  context: string
}

export function checkBannedTerms(
  content: string,
  filePath: string,
): Violation[] {
  const violations: Violation[] = []
  const lines = content.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()
    for (const { pattern, replacement } of BANNED_TERMS) {
      if (line.includes(pattern.toLowerCase())) {
        violations.push({
          file: filePath,
          line: i + 1,
          term: pattern,
          replacement,
          context: lines[i].trim().slice(0, 100),
        })
      }
    }
  }

  return violations
}

export { BANNED_TERMS }
