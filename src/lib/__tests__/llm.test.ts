import { describe, expect, it, vi } from 'vitest'
import cassette from '../../../tests/fixtures/llm/kimi-compatible-forecast.cassette.json'
import {
  buildBirthYearForecastPrompt,
  createKimiCompatibleInvoker,
  generateBirthYearForecast,
  type LLMTextInvoker,
} from '../llm'

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

describe('buildBirthYearForecastPrompt', () => {
  it('builds a safe prompt with year, gender, iztro summary, Article 320 framing, and forbidden instructions', () => {
    process.env.KIMI_CODING_PLAN_API_CONSULTANTS = 'sk-secret-should-not-appear'

    const prompt = buildBirthYearForecastPrompt({
      animal: 'ty',
      year: '1984',
      gender: 'nam',
      iztroData: mockIztroData,
    })

    expect(prompt).toContain('Tuổi: ty (1984)')
    expect(prompt).toContain('Giới tính: Nam mạng')
    expect(prompt).toContain('"fiveElements": "Thủy Nhị Cục"')
    expect(prompt).toContain('Điều 320')
    expect(prompt).toContain('tham khảo')
    expect(prompt).toContain('không phải lời tiên đoán')
    expect(prompt).toContain('Không dùng thuật ngữ chiêm tinh phương Tây')
    expect(prompt).toContain('Không viết các khẳng định kiểu')
    expect(prompt).not.toContain('sk-secret-should-not-appear')
  })
})

describe('generateBirthYearForecast with DI', () => {
  it('accepts an injected invoker and returns compliant text without touching network', async () => {
    const invoke = vi.fn(async () => 'Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán. Gợi ý này giúp bạn tự quan sát lá số.')
    const invoker: LLMTextInvoker = { invoke }

    const content = await generateBirthYearForecast('ty', '1984', 'nam', mockIztroData, { invoker })

    expect(content).toContain('tham khảo')
    expect(invoke).toHaveBeenCalledTimes(1)
    expect(invoke.mock.calls[0][0]).toContain('Tuổi: ty (1984)')
  })

  it('post-validates LLM output and rejects deterministic claims', async () => {
    const invoker: LLMTextInvoker = {
      invoke: vi.fn(async () => 'Nội dung này tiên đoán rằng bạn sẽ chắc chắn phát tài.'),
    }

    await expect(
      generateBirthYearForecast('ty', '1984', 'nam', mockIztroData, { invoker }),
    ).rejects.toThrow(/compliance/i)
  })
})

describe('Kimi-compatible invoker replay/record guard', () => {
  it('parses a replayed Kimi-compatible response and verifies URL/model/body shape', async () => {
    const fetchImpl = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      expect(String(url)).toBe(cassette.request.url)
      expect(init?.method).toBe('POST')
      expect(init?.headers).toMatchObject({
        authorization: 'Bearer sk-test',
        'content-type': 'application/json',
      })

      const body = JSON.parse(String(init?.body))
      expect(body.model).toBe(cassette.request.model)
      expect(body.temperature).toBe(0.6)
      expect(body.messages).toHaveLength(1)
      expect(body.messages[0]).toMatchObject({ role: 'user' })
      expect(body.messages[0].content).toContain('Tuổi: ty (1984)')

      return new Response(JSON.stringify(cassette.response), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    })

    const invoker = createKimiCompatibleInvoker({
      apiKey: 'sk-test',
      baseUrl: 'https://api.kimi.com/coding',
      model: 'kimi-k2.5',
      fetchImpl,
    })

    const text = await invoker.invoke(buildBirthYearForecastPrompt({
      animal: 'ty',
      year: '1984',
      gender: 'nam',
      iztroData: mockIztroData,
    }))

    expect(text).toBe(cassette.response.choices[0].message.content)
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('refuses live network when no replay/fetch transport is injected and RECORD_LLM is not set', async () => {
    const previous = process.env.RECORD_LLM
    delete process.env.RECORD_LLM

    const invoker = createKimiCompatibleInvoker({
      apiKey: 'sk-test',
      baseUrl: 'https://api.kimi.com/coding',
      model: 'kimi-k2.5',
    })

    await expect(invoker.invoke('prompt')).rejects.toThrow(/RECORD_LLM=1/)
    process.env.RECORD_LLM = previous
  })
})
