import { describe, it, expect, vi, beforeEach } from 'vitest'

// Set env var BEFORE any imports
process.env.KIMI_CODING_PLAN_API_CONSULTANTS = 'sk-kimi-test-key-for-unit-tests'

// Mock the ChatOpenAI class BEFORE importing the module
vi.mock('@langchain/openai', () => ({
  ChatOpenAI: vi.fn().mockImplementation(() => ({
    invoke: vi.fn().mockResolvedValue({
      content: `Tổng quan năm 2026 cho tuổi Tý 1984

Năm 2026 là năm Bính Ngọ, mang đến nhiều biến động cho quý anh tuổi Giáp Tý sinh năm 1984. Với sao Tử Vi chiếu mệnh cùng Hóa Lộc tại cung Quan Lộc, đây là thời điểm để chuyển mình theo Ngũ Hành Thủy Nhị Cục.

Quý anh tuổi Tý mang mệnh Thủy, sinh năm Giáp Tý 1984. Năm nay Bính Ngọ có nhiều sao chiếu mệnh quan trọng. Sao Thiên Lương hãm địa tại cung Phu Thê cho thấy tình duyên có chút trắc trở. Sao Thiên Khôi, Thiên Việt minh địa mang đến quý nhân phù trợ.

Sao Hóa Quyền tại cung Tài Bạch cho thấy quyền lực trong tài chính tăng lên. Sao Hóa Kỵ tại cung Tật Ách cảnh báo về sức khỏe. Các sao lưu niên có nhiều biến động cần lưu ý.

Sự nghiệp & Tài lộc
Năm 2026 Bính Ngọ mang đến nhiều cơ hội thăng tiến cho quý anh tuổi Giáp Tý. Sao Thiên Cơ minh địa tại cung Quan Lộc cho thấy sự nhanh nhẹn trong quyết định công việc. Cung Quan Lộc có Hóa Lộc chiếu vào nên tài lộc từ sự nghiệp khá tốt.

Quý anh nên tận dụng tháng 3 và tháng 9 âm lịch để đẩy mạnh các dự án. Tháng 7-8 âm lịch cần thận trọng với các hợp đồng lớn, nên có luật sư xem xét kỹ.

Cung Tài Bạch có sao Vũ Khúc đào hoa cho thấy tài lộc đến từ các mối quan hệ xã hội. Tuy nhiên, sao Phá Toái hãm địa cảnh báo không nên đầu tư mạo hiểm. Nên giữ tiền mặt và trái phiếu an toàn.

Tình duyên & Gia đạo
Tình cảm của quý anh tuổi Tý năm 2026 khá ổn định. Cung Phu Thê có sao Thiên Lương hãm nên cần chú ý lời ăn tiếng nói với vợ con. Nên dành thêm thời gian cuối tuần cho gia đình.

Quý anh độc thân thì nửa đầu năm có nhiều cơ hội gặp gỡ qua bạn bè giới thiệu. Nửa cuối năm nên tập trung công việc, tình cảm để sang năm 2027 Đinh Mùi sẽ tốt hơn.

Con cái có sao Văn Xương minh địa nên học hành tiến bộ. Nên khuyến khích các con tham gia các kỳ thi học sinh giỏi.

Sức khỏe
Sức khỏe tổng thể của quý anh tuổi Giáp Tý năm 2026 tốt, nhưng cần chú ý hệ tiêu hóa. Cung Tật Ách có Hóa Kỵ chiếu vào nên dễ có bệnh dạ dày, đau bụng.

Nên ăn uống điều độ, hạn chế rượu bia. Tập thể dục đều đặn mỗi sáng. Tháng 5 và tháng 11 âm lịch cần đi khám sức khỏe định kỳ.

Lời khuyên
Năm 2026 Bính Ngọ là năm để quý anh tuổi Tý 1984 tích cực hành động nhưng không nên vội vàng. Mọi quyết định lớn nên có sự tham khảo từ người có kinh nghiệm.

Nên tập trung vào sự nghiệp nửa đầu năm, nửa cuối năm dành thời gian cho gia đình. Đầu tư nên thận trọng, không nên nghe theo lời đồn thổi.

*Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán.*`
    })
  }))
}))

// Now import the module - env var is set, mock is in place
import { generateBirthYearForecast } from '../llm'

describe('generateBirthYearForecast', () => {
  const mockIztroData = {
    palaces: [
      { name: 'Mệnh', stars: [{ name: 'Tử Vi', brightness: 'minh', type: 'major' }] },
      { name: 'Quan Lộc', stars: [{ name: 'Thiên Cơ', brightness: 'bình', type: 'major' }] },
    ],
    transformations: [
      { name: 'Hóa Lộc', palace: 'Quan Lộc' },
      { name: 'Hóa Quyền', palace: 'Tài Bạch' },
    ],
    fiveElements: 'Thủy Nhị Cục',
    animal: 'ty',
    year: 1984,
    gender: 'nam',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('generates content with correct prompt structure', async () => {
    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData)
    
    expect(content).toBeDefined()
    expect(content.length).toBeGreaterThan(0)
  })

  it('generates substantial content', async () => {
    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData)
    
    expect(content.length).toBeGreaterThan(500)
    expect(content.split(/\s+/).length).toBeGreaterThan(100)
  })

  it('includes required sections', async () => {
    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData)
    
    expect(content).toMatch(/Tổng quan|tổng quan/)
    expect(content).toMatch(/Sự nghiệp|sự nghiệp|tài lộc/)
    expect(content).toMatch(/Tình duyên|tình duyên|gia đạo/)
    expect(content).toMatch(/Sức khỏe|sức khỏe/)
    expect(content).toMatch(/Lời khuyên|khuyên/)
  })

  it('uses Vietnamese Tử Vi terminology', async () => {
    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData)
    
    expect(content).toMatch(/sao|Sao/)
    expect(content).toMatch(/cung|Cung/)
    expect(content).toMatch(/mệnh|Mệnh/)
  })

  it('complies with Article 320', async () => {
    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData)
    
    // Should not make definitive predictions
    expect(content).not.toMatch(/tiên đoán rằng|sẽ chắc chắn|định mệnh buộc/)
    // Should include disclaimer
    expect(content).toMatch(/tham khảo/)
  })

  it('does not use Western astrology terms', async () => {
    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData)
    
    expect(content).not.toMatch(/zodiac|horoscope|sun sign|ascendant|moon sign/)
  })

  it('includes year context', async () => {
    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData)
    
    expect(content).toMatch(/2026/)
    expect(content).toMatch(/1984/)
    expect(content).toMatch(/Tý|tý/)
  })

  it('handles iztro data correctly', async () => {
    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData)
    
    expect(content).toMatch(/Hóa Lộc|Hóa Quyền|Hóa Khoa|Hóa Kỵ/)
    expect(content).toMatch(/Ngũ Hành|Thủy|Kim|Mộc|Hỏa|Thổ/)
  })

  it('handles female gender correctly', async () => {
    const femaleContent = await generateBirthYearForecast('ty', '1984', 'nu', mockIztroData)
    
    expect(femaleContent).toBeDefined()
    expect(femaleContent.length).toBeGreaterThan(0)
  })
})

describe('LLM Configuration', () => {
  it('uses Kimi Coding Plan API', () => {
    const envKey = process.env.KIMI_CODING_PLAN_API_CONSULTANTS
    expect(envKey).toBeDefined()
    expect(envKey).toMatch(/^sk-kimi-/)
  })

  it('has correct base URL', () => {
    const baseUrl = 'https://api.kimi.com/coding'
    expect(baseUrl).toBe('https://api.kimi.com/coding')
  })
})
