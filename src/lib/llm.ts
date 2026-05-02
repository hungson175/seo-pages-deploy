import { ChatOpenAI } from "@langchain/openai";

// Kimi Coding Plan configuration
const KIMI_API_KEY = process.env.KIMI_CODING_PLAN_API_CONSULTANTS || process.env.MOONSHOT_API_KEY;
const KIMI_BASE_URL = "https://api.kimi.com/coding";

export function getLLM() {
  if (!KIMI_API_KEY) {
    // Allow test mode with missing key
    if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
      return new ChatOpenAI({
        modelName: "kimi-k2.5",
        temperature: 0.6,
        openAIApiKey: 'sk-test-missing-key',
        configuration: {
          baseURL: KIMI_BASE_URL,
        },
      });
    }
    throw new Error("KIMI_CODING_PLAN_API_CONSULTANTS or MOONSHOT_API_KEY must be set");
  }
  
  return new ChatOpenAI({
    modelName: "kimi-k2.5",
    temperature: 0.6,
    openAIApiKey: KIMI_API_KEY,
    configuration: {
      baseURL: KIMI_BASE_URL,
    },
  });
}

// Lazy initialization - only create when needed
let llmInstance: ChatOpenAI | null = null;
export function getLLMInstance() {
  if (!llmInstance) {
    llmInstance = getLLM();
  }
  return llmInstance;
}

export async function generateBirthYearForecast(
  animal: string,
  year: string,
  gender: string,
  iztroData: any
): Promise<string> {
  const prompt = `Bạn là một thầy bói Tử Vi giàu kinh nghiệm, nói chuyện ấm áp như đang tư vấn cho khách hàng thân thiết.

Thông tin lá số:
- Tuổi: ${animal} (${year})
- Giới tính: ${gender === 'nam' ? 'Nam mạng' : 'Nữ mạng'}
- Dữ liệu iztro: ${JSON.stringify(iztroData, null, 2)}

Yêu cầu:
1. Viết bài phân tích tử vi năm 2026 chi tiết, 1,200-1,500 từ
2. Giọng văn: "Thầy bói nói chuyện" - ấm áp, tự nhiên, không máy móc
3. Tuân thủ Điều 320: dùng "tham khảo" không phải "tiên đoán"
4. Độc đáo 80%+ so với các bài khác
5. Bao gồm: tổng quan, sự nghiệp, tài chính, tình duyên, sức khỏe, lợi khắc, lợi ích
6. Không dùng thuật ngữ chiêm tinh phương Tây
7. Nhấn mạnh Tứ Hóa và Ngũ Hành từ dữ liệu iztro`;

  const llm = getLLMInstance();
  const response = await llm.invoke(prompt);
  return response.content as string;
}
