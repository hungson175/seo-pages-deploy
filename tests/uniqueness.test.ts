import { describe, it, expect } from 'vitest'

function extractNgrams(text: string, n: number = 3): Set<string> {
  const words = text.toLowerCase().replace(/[^\w\sÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÉÈẺẼẸÊỀẾỆỂỄÍÌỈĨỊÓÒỎÕỌÔỒỐỘỔỖƠỜỚỢỞỠÚÙỦŨỤƯỪỨỰỬỮÝỲỶỸỴĐ]/g, '').split(/\s+/)
  const ngrams = new Set<string>()
  
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.add(words.slice(i, i + n).join(' '))
  }
  
  return ngrams
}

function calculateJaccardSimilarity(textA: string, textB: string, n: number = 3): number {
  const ngramsA = extractNgrams(textA, n)
  const ngramsB = extractNgrams(textB, n)
  const intersection = new Set([...ngramsA].filter(x => ngramsB.has(x)))
  const union = new Set([...ngramsA, ...ngramsB])
  
  return union.size === 0 ? 0 : intersection.size / union.size
}

describe('Content Uniqueness Validation', () => {
  it('detects high similarity between template texts', () => {
    const template1 = `Năm 2026 là năm Bính Ngọ. Nội dung chỉ mang tính tham khảo. Sao Tử Vi chiếu mệnh cho thấy nhiều điều tốt đẹp.`
    const template2 = `Năm 2026 là năm Bính Ngọ. Nội dung chỉ mang tính tham khảo. Sao Tử Vi chiếu mệnh cho thấy nhiều điều tốt đẹp.`
    
    const similarity = calculateJaccardSimilarity(template1, template2)
    expect(similarity).toBeGreaterThan(0.8)
  })

  it('detects low similarity between unique texts', () => {
    const unique1 = `Tuổi Tý năm 2026 gặp sao Văn Xương minh địa, chủ về học hành thi cử thuận lợi. Quý anh nên đầu tư vào kiến thức mới.`
    const unique2 = `Tuổi Mão năm 2026 có sao Thiên Lương hãm địa, cần thận trọng trong đầu tư. Nên giữ tiền mặt và tránh cho vay.`
    
    const similarity = calculateJaccardSimilarity(unique1, unique2)
    expect(similarity).toBeLessThan(0.3)
  })

  it('validates 80%+ uniqueness across 3 pages', () => {
    const pages = [
      `Tuổi Tý 1984 nam mạng năm 2026 có sao Tử Vi minh địa tại cung Mệnh. Sự nghiệp thăng tiến, tài lộc dồi dào. Tình duyên ổn định.`,
      `Tuổi Sửu 1985 nữ mạng năm 2026 có sao Thiên Cơ bình địa tại cung Tài Bạch. Cần thận trọng đầu tư. Sức khỏe cần chú ý.`,
      `Tuổi Dần 1986 nam mạng năm 2026 có sao Thái Dương vượng địa tại cung Quan Lộc. Cơ hội thăng chức lớn. Tài chính khởi sắc.`
    ]
    
    const similarities: number[] = []
    for (let i = 0; i < pages.length; i++) {
      for (let j = i + 1; j < pages.length; j++) {
        similarities.push(calculateJaccardSimilarity(pages[i], pages[j]))
      }
    }
    
    const maxSimilarity = Math.max(...similarities)
    expect(maxSimilarity).toBeLessThan(0.2) // 80%+ uniqueness = <20% similarity
  })

  it('flags template phrases', () => {
    const TEMPLATE_PATTERNS = [
      /Nội dung chỉ mang tính chất tham khảo/g,
      /không phải lời tiên đoán/g,
      /Hãy luôn nhớ rằng/g
    ]
    
    const content = `Năm 2026 tốt đẹp. Nội dung chỉ mang tính chất tham khảo. Không phải lời tiên đoán.`
    
    let templateCount = 0
    TEMPLATE_PATTERNS.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) templateCount++
    })
    
    expect(templateCount).toBeGreaterThan(0)
  })
})
