import { validateComplianceContent } from './compliance/policy'

const DEFAULT_KIMI_BASE_URL = 'https://api.kimi.com/coding'
const DEFAULT_KIMI_MODEL = 'kimi-k2.5'
const DEFAULT_TEMPERATURE = 0.6

export interface LLMTextInvoker {
  invoke(prompt: string): Promise<string>
}

export interface BirthYearForecastPromptInput {
  animal: string
  year: string
  gender: string
  iztroData: unknown
}

export interface GenerateBirthYearForecastOptions {
  invoker?: LLMTextInvoker
  validateOutput?: boolean
}

export interface KimiCompatibleInvokerOptions {
  apiKey?: string
  baseUrl?: string
  model?: string
  temperature?: number
  fetchImpl?: (url: string, init: RequestInit) => Promise<Response>
  allowLiveNetwork?: boolean
}

interface KimiCompatibleResponse {
  choices?: Array<{
    message?: {
      content?: unknown
    }
  }>
}

function resolveKimiApiKey(explicitApiKey?: string): string {
  const apiKey = explicitApiKey
    ?? process.env.KIMI_CODING_PLAN_API_CONSULTANTS
    ?? process.env.MOONSHOT_API_KEY

  if (!apiKey) {
    throw new Error('KIMI_CODING_PLAN_API_CONSULTANTS or MOONSHOT_API_KEY must be set')
  }

  return apiKey
}

function kimiChatCompletionsUrl(baseUrl = DEFAULT_KIMI_BASE_URL): string {
  return `${baseUrl.replace(/\/$/, '')}/chat/completions`
}

function resolveFetch(
  fetchImpl: KimiCompatibleInvokerOptions['fetchImpl'],
  allowLiveNetwork: boolean,
): (url: string, init: RequestInit) => Promise<Response> {
  if (fetchImpl) {
    return fetchImpl
  }

  if (!allowLiveNetwork) {
    throw new Error(
      'Live LLM network is disabled. Use replay/mocked fetch transport or set RECORD_LLM=1 intentionally.',
    )
  }

  if (typeof fetch !== 'function') {
    throw new Error('No fetch implementation is available for Kimi-compatible LLM calls')
  }

  return (url, init) => fetch(url, init)
}

function parseKimiResponse(data: KimiCompatibleResponse): string {
  const content = data.choices?.[0]?.message?.content
  if (typeof content === 'string') {
    return content
  }
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part
        if (part && typeof part === 'object' && 'text' in part) {
          const text = (part as { text?: unknown }).text
          return typeof text === 'string' ? text : ''
        }
        return ''
      })
      .filter(Boolean)
      .join('\n')
  }
  throw new Error('Kimi-compatible response did not include text content')
}

export function buildBirthYearForecastPrompt({
  animal,
  year,
  gender,
  iztroData,
}: BirthYearForecastPromptInput): string {
  const genderLabel = gender === 'nam' ? 'Nam mạng' : 'Nữ mạng'
  const iztroSummary = JSON.stringify(iztroData, null, 2)

  return `Bạn là chuyên gia diễn giải Tử Vi Việt Nam, viết ấm áp, thận trọng và có trách nhiệm.

Thông tin lá số:
- Tuổi: ${animal} (${year})
- Giới tính: ${genderLabel}
- Dữ liệu iztro v2.5.8 đã được duyệt: ${iztroSummary}

Yêu cầu nội dung:
1. Viết bài phân tích tử vi năm 2026 chi tiết, 1.200-1.500 từ.
2. Giọng văn: gần gũi, rõ phương pháp, không hù dọa, không đóng vai thầy phán.
3. Tuân thủ Điều 320: nội dung chỉ mang tính tham khảo, không phải lời tiên đoán.
4. Không viết các khẳng định kiểu: "tiên đoán rằng", "sẽ chắc chắn", "định mệnh buộc", "đúng 100%".
5. Không đưa lời hứa tài chính, sức khỏe, pháp lý, hóa giải vận hạn hoặc đảm bảo kết quả.
6. Không dùng thuật ngữ chiêm tinh phương Tây như zodiac, horoscope, sun sign, ascendant, moon sign.
7. Nhấn mạnh Tứ Hóa và Ngũ Hành từ dữ liệu iztro, nhưng luôn diễn giải như gợi ý xu hướng để người đọc tự quan sát.
8. Kết bài phải nhắc lại: "Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán."`
}

export function createKimiCompatibleInvoker({
  apiKey,
  baseUrl = DEFAULT_KIMI_BASE_URL,
  model = DEFAULT_KIMI_MODEL,
  temperature = DEFAULT_TEMPERATURE,
  fetchImpl,
  allowLiveNetwork = process.env.RECORD_LLM === '1',
}: KimiCompatibleInvokerOptions = {}): LLMTextInvoker {
  return {
    async invoke(prompt: string): Promise<string> {
      const resolvedFetch = resolveFetch(fetchImpl, allowLiveNetwork)
      const resolvedApiKey = resolveKimiApiKey(apiKey)
      const response = await resolvedFetch(kimiChatCompletionsUrl(baseUrl), {
        method: 'POST',
        headers: {
          authorization: `Bearer ${resolvedApiKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model,
          temperature,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) {
        throw new Error(`Kimi-compatible LLM request failed with HTTP ${response.status}`)
      }

      return parseKimiResponse(await response.json() as KimiCompatibleResponse)
    },
  }
}

// Kept as a narrow factory for callers that previously imported getLLM().
export function getLLM(): LLMTextInvoker {
  return createKimiCompatibleInvoker()
}

let llmInstance: LLMTextInvoker | null = null
export function getLLMInstance(): LLMTextInvoker {
  if (!llmInstance) {
    llmInstance = getLLM()
  }
  return llmInstance
}

function assertCompliantLLMOutput(content: string): void {
  const result = validateComplianceContent(content, {
    requireThamKhaoIfSubstantial: true,
    substantialContentLength: 50,
  })
  if (!result.valid) {
    throw new Error(`LLM output failed compliance validation: ${result.errors.join('; ')}`)
  }
}

export async function generateBirthYearForecast(
  animal: string,
  year: string,
  gender: string,
  iztroData: unknown,
  options: GenerateBirthYearForecastOptions = {},
): Promise<string> {
  const prompt = buildBirthYearForecastPrompt({ animal, year, gender, iztroData })
  const invoker = options.invoker ?? getLLMInstance()
  const content = await invoker.invoke(prompt)

  if (options.validateOutput !== false) {
    assertCompliantLLMOutput(content)
  }

  return content
}
