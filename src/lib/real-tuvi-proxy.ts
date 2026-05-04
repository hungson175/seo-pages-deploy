import { NextRequest } from 'next/server'

const DEFAULT_REAL_TUVI_ORIGIN = 'https://web-neon-tau-79.vercel.app'
const DEFAULT_REAL_TUVI_API_ORIGIN = 'https://horoscope-production-987b.up.railway.app'
const REAL_TUVI_ASSET_PREFIX = '/real-tuvi-assets'
const DEFAULT_PRIVACY_CONTACT_EMAIL = 'privacy@boitoan.com.vn'
const PRIVACY_CONTACT_COPY =
  'Bói Toán sẽ phản hồi qua kênh liên hệ bạn cung cấp sau khi kiểm tra đủ thông tin để xác định đúng dữ liệu cần xóa.'
const EARLY_LAUNCH_CONTACT_NOTE =
  'Kênh liên hệ này được dùng để tiếp nhận yêu cầu trong giai đoạn đầu sau khi ra mắt.'
const CHAT_DISABLED_GATE_MARKER = 'data-boitoan-chat-gate="disabled"'
const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'content-encoding',
  'content-length',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
])

const LEGACY_TU_TUC_REWRITES: Array<[RegExp, string]> = [
  [/Tử\s*Tức/g, 'Tử Nữ'],
  [/Tu\s*Tuc/g, 'Tu Nu'],
  [/tu_tuc/g, 'tu_nu'],
  [/tu-tuc/g, 'tu-nu'],
  [/子息/g, '子女'],
]

export function getRealTuViOrigin(): string {
  return process.env.REAL_TUVI_ORIGIN?.trim() || DEFAULT_REAL_TUVI_ORIGIN
}

export function getRealTuViApiOrigin(): string {
  return process.env.REAL_TUVI_API_ORIGIN?.trim() || DEFAULT_REAL_TUVI_API_ORIGIN
}

export function isRealTuViChatEnabled(): boolean {
  const value = (process.env.REAL_TUVI_CHAT_ENABLED ?? process.env.CHAT_ENABLED ?? '')
    .trim()
    .toLowerCase()
  return value === 'true' || value === '1' || value === 'yes'
}

export function sanitizeRealTuViApiText(text: string): string {
  return LEGACY_TU_TUC_REWRITES.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    text,
  )
}

function getPrivacyContactEmail(): string | undefined {
  const value = process.env.PRIVACY_CONTACT_EMAIL?.trim()
  if (!value || value === DEFAULT_PRIVACY_CONTACT_EMAIL) return undefined
  if (!/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(value)) return undefined
  return value
}

export function sanitizeRealTuViPrivacyContactText(text: string): string {
  const contactEmail = getPrivacyContactEmail()
  if (!contactEmail) return text

  const withEmail = text.replaceAll(DEFAULT_PRIVACY_CONTACT_EMAIL, contactEmail)
  if (withEmail.includes(EARLY_LAUNCH_CONTACT_NOTE)) return withEmail

  return withEmail.replaceAll(
    PRIVACY_CONTACT_COPY,
    `${PRIVACY_CONTACT_COPY} ${EARLY_LAUNCH_CONTACT_NOTE}`,
  )
}

const APPROVED_DISCLAIMER_REWRITES: Array<[RegExp, string]> = [
  [
    /không\s+phải\s+lời\s+khẳng\s+định\s+tương\s+lai/giu,
    'không phải lời tiên đoán hay lời khẳng định tương lai',
  ],
]
const TY_HOUR_DISTINCTION_NOTE =
  'Giờ Tý kéo dài qua nửa đêm: Tý sớm (00:00-00:59) giữ nguyên ngày âm lịch; Tý muộn (23:00-23:59) tính sang ngày âm lịch hôm sau. Nếu chưa nhớ rõ, hãy chọn khung giờ gần nhất và đọc kết quả như bản tham khảo sơ bộ.'
const BIRTH_HOUR_COPY_REWRITES: Array<[RegExp, string]> = [
  [
    /T\\xfd\s+sớm\s*\(0h-1h\)/g,
    'Tý sớm (00:00-00:59)',
  ],
  [
    /T\\xfd\s+muộn\s*\(23h-24h\)/g,
    'Tý muộn (23:00-23:59)',
  ],
  [
    /Tý\s+sớm\s*(?:\(?0h-1h\)?|\(?00h-01h\)?|\(?00:00\s*-\s*01:00\)?|\(?00:00\s*-\s*00:59\)?)/giu,
    'Tý sớm (00:00-00:59)',
  ],
  [
    /Tý\s+muộn\s*(?:\(?23h-24h\)?|\(?23:00\s*-\s*24:00\)?|\(?23:00\s*-\s*23:59\)?)/giu,
    'Tý muộn (23:00-23:59)',
  ],
  [/\b0h-1h\b/g, '(00:00-00:59)'],
  [/\b23h-24h\b/g, '(23:00-23:59)'],
  [
    /Nếu chưa nhớ rõ, hãy chọn khung giờ gần nhất và đọc kết quả như bản tham khảo sơ bộ\./g,
    TY_HOUR_DISTINCTION_NOTE,
  ],
  [
    /Nếu chưa nhớ r\\xf5, h\\xe3y chọn khung giờ gần nhất v\\xe0 đọc kết quả như bản tham khảo sơ bộ\./g,
    TY_HOUR_DISTINCTION_NOTE,
  ],
]

function normalizeBirthHourCopyText(text: string): string {
  return BIRTH_HOUR_COPY_REWRITES.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    text,
  )
}

export function sanitizeRealTuViHtmlText(text: string): string {
  return APPROVED_DISCLAIMER_REWRITES.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    sanitizeRealTuViPrivacyContactText(sanitizeRealTuViApiText(text)),
  )
}

const API_SEGMENT_REWRITES: Record<string, string> = {
  'luan-giai': 'luan_giai',
  'tinh-cach': 'tinh_cach',
  'tinh-duyen': 'tinh_duyen',
  'su-nghiep': 'su_nghiep',
  'dai-van': 'dai_van',
  'tieu-han': 'tieu_han',
  'tieu-han-all': 'tieu_han_all',
}
const GENERATED_READING_TABS = new Set([
  'tinh-cach',
  'su-nghiep',
  'tinh-duyen',
  'dai-van',
  'tieu-han',
  'cung',
])

const GENERATED_READING_FAIL_COPY =
  'Chưa tạo được luận giải. Lá số của bạn đã được an lập; vui lòng thử tạo lại phần này.'
const GENERATED_READING_RETRY_LABEL = 'Thử lại'
const GENERATED_READING_CHART_LABEL = 'Xem lá số 12 cung'

const SAFE_READING_DISCLAIMER =
  'Nội dung tham khảo, không phải lời tiên đoán hay lời khẳng định tương lai.'
const BLANK_READING_FALLBACK_COPY =
  GENERATED_READING_FAIL_COPY
const MOBILE_READING_P0_PATCH_MARKER = 'data-boitoan-mobile-p0-patch="true"'

function safeReadingKeynotes(...items: string[]): string[] {
  return items
}

function buildTinhCachSafeFallback(): Record<string, unknown> {
  return {
    hero: {
      headline: 'Tìm hiểu bản thân — bản luận giải tóm tắt',
      sub: `${BLANK_READING_FALLBACK_COPY} ${SAFE_READING_DISCLAIMER}`,
    },
    retry_actions: [
      { label: GENERATED_READING_RETRY_LABEL, action: 'reload' },
      { label: GENERATED_READING_CHART_LABEL, action: 'open-chart' },
    ],
    tinh_cach: {
      basis: 'Đọc theo Mệnh, Thân, Cục và tam phương để lấy bối cảnh, không tách một sao thành kết luận cố định.',
      hero_sub: 'Phần này giúp bạn nhìn các khuynh hướng nền: cách quan sát, cách phản ứng, điểm mạnh dễ dùng và phần nên rèn thêm.',
      six_faces: {
        section_title: 'Bản tóm tắt sáu mặt của Cung Mệnh',
        items: [
          {
            icon: '命',
            label: 'Mệnh',
            title: 'Cách nhìn bản thân',
            body: 'Cung Mệnh được đọc như điểm tựa để hiểu khí chất và thói quen phản ứng. Hãy dùng phần này để tự quan sát, không xem như nhãn dán cố định.',
          },
          {
            icon: '身',
            label: 'Thân',
            title: 'Cách bước vào việc',
            body: 'Cung Thân gợi cách bạn đem lựa chọn vào đời sống thực tế. Khi Mệnh và Thân cùng sáng, nên ưu tiên nhịp sống ổn định và có kiểm chứng.',
          },
          {
            icon: '局',
            label: 'Cục',
            title: 'Nhịp vận hành',
            body: 'Cục số được dùng như nền để cân nhịp nhanh/chậm khi đọc lá số. Đây là bối cảnh, không phải lời bảo đảm về kết quả.',
          },
          {
            icon: '三',
            label: 'Tam phương',
            title: 'Không đọc đơn điểm',
            body: 'Một cung luôn cần nhìn cùng tam phương/tứ chính. Cách đọc này giúp tránh kết luận vội từ một sao hoặc một vị trí riêng lẻ.',
          },
        ],
      },
      radar: {
        traits: [
          { label: 'Quan sát', value: 7, level: 'Mạnh', desc: 'Dễ nhận ra mẫu lặp trong công việc và quan hệ nếu dành thời gian ghi chép.' },
          { label: 'Ổn định', value: 6, level: 'Trung bình', desc: 'Phù hợp nhịp tiến chậm, đều, có kiểm chứng thay vì đổi hướng quá nhanh.' },
          { label: 'Biểu đạt', value: 5, level: 'Trung bình', desc: 'Nên nói rõ nhu cầu và giới hạn để người khác hiểu đúng ý.' },
          { label: 'Tự chủ', value: 6, level: 'Mạnh', desc: 'Có lợi khi tự đặt nguyên tắc trước khi nhận lời hoặc chọn việc quan trọng.' },
        ],
      },
      strengths: safeReadingKeynotes(
        'Có xu hướng hợp với cách đọc chậm, nhìn toàn cục rồi mới quyết định.',
        'Dễ phát huy khi mục tiêu được chia thành từng bước nhỏ và có thời gian kiểm chứng.',
        'Có thể dùng phản hồi của người thân/cộng sự để soi lại điểm mù thay vì tự kết luận một chiều.',
      ),
      challenges: safeReadingKeynotes(
        'Khi căng thẳng, nên tránh quyết định ngay trong lúc cảm xúc đang mạnh.',
        'Nếu thấy nhiều tín hiệu trái chiều trong lá số, hãy ưu tiên quan sát hành vi thực tế.',
        'Không dùng lá số để thay thế tư vấn chuyên môn hoặc quyết định quan trọng.',
      ),
      narrative_paragraphs: [
        'Bản tóm tắt này đọc lá số như một tấm gương văn hóa. Trọng tâm là giúp bạn nhận ra khuynh hướng đang lặp lại trong cách nghĩ, cách chọn việc và cách giữ nhịp sống.',
        'Nếu một nhận xét chưa khớp với trải nghiệm của bạn, hãy xem đó là câu hỏi để tự kiểm tra. Tử Vi hữu ích nhất khi được đọc cùng hoàn cảnh thật, không dùng để đóng khung con người.',
      ],
      advice_phases: [
        { phase_num: '01', phase_label: 'Bắt đầu', phase_name: 'Ghi nhận dữ kiện', content: 'Ghi lại 2-3 tình huống gần đây khiến bạn phản ứng mạnh để so với phần Mệnh/Thân.' },
        { phase_num: '02', phase_label: 'Tiếp theo', phase_name: 'Chọn một điểm rèn', content: 'Chọn một thói quen nhỏ có thể cải thiện trong 7 ngày thay vì cố thay đổi quá nhiều.' },
      ],
      ask_chips: [
        'Bói Toán giải thích cung Mệnh giúp tôi',
        'Tôi nên tự quan sát điều gì trước?',
      ],
    },
    thu_thach: {
      headline: 'Thử thách nên tự quan sát',
      sub: 'Phần này nêu các điểm cần rèn theo cách mềm, không xem là dự báo cố định.',
      basis: 'Đọc cùng Mệnh, Thân và tam phương.',
      challenge_bars: [
        { label: 'Kiên nhẫn', value: 6, level: 'Cần rèn' },
        { label: 'Ranh giới', value: 5, level: 'Trung bình' },
        { label: 'Nhịp nghỉ', value: 5, level: 'Trung bình' },
      ],
      overcome: safeReadingKeynotes('Biết dừng lại để nhìn toàn cục trước khi phản ứng.', 'Có thể học tốt từ trải nghiệm đã qua.'),
      facing: safeReadingKeynotes('Dễ mệt nếu ôm quá nhiều kỳ vọng cùng lúc.', 'Nên tách điều mình kiểm soát được khỏi điều chỉ nên quan sát.'),
      narrative_paragraphs: ['Thử thách trong lá số nên được đọc như lời nhắc về thói quen. Khi có kế hoạch nhỏ và đều, các điểm căng thường dễ xử lý hơn.'],
      advice_phases: [{ phase_num: '01', phase_label: '7 ngày', phase_name: 'Giảm nhiễu', content: 'Chọn một việc cần nói rõ ranh giới hoặc một việc cần nghỉ đúng giờ.' }],
    },
    yeu_to: {
      headline: 'Yếu tố tác động chính',
      sub: 'Các yếu tố này giúp đặt lá số vào bối cảnh đời sống, không phải kết luận một chiều.',
      basis: 'Ưu tiên tam phương/tứ chính và dữ kiện thực tế.',
      influence_nodes: [
        { label: 'Mệnh', strength: 'positive' },
        { label: 'Thân', strength: 'positive' },
        { label: 'Cục', strength: 'positive' },
        { label: 'Môi trường', strength: 'neutral' },
      ],
      influence_bars: [
        { label: 'Môi trường', value: 6, level: 'Trung bình' },
        { label: 'Thói quen', value: 7, level: 'Mạnh' },
      ],
      power_factors: safeReadingKeynotes('Môi trường có nhịp ổn định giúp bạn dễ phát huy.', 'Khi có phản hồi rõ, bạn dễ điều chỉnh nhanh hơn.'),
      limit_factors: safeReadingKeynotes('Quá nhiều lựa chọn cùng lúc có thể làm phân tán.', 'Không nên dùng một tín hiệu đơn lẻ để quyết định việc lớn.'),
      narrative_paragraphs: ['Lá số chỉ là một lớp tham khảo. Điều quan trọng là đặt nó cạnh hoàn cảnh, năng lực và lựa chọn hiện tại của bạn.'],
    },
    no_nghiep: {
      headline: 'Bài học cần chuyển hóa',
      sub: 'Đọc theo nghĩa biểu tượng về trách nhiệm và cách ứng xử, không dùng để dọa nạt.',
      basis: 'Khung tham khảo văn hóa.',
      karma_bars: [
        { label: 'Trách nhiệm', value: 6, level: 'Trung bình' },
        { label: 'Buông bỏ', value: 5, level: 'Trung bình' },
      ],
      blessings: safeReadingKeynotes('Có thể chuyển hóa tốt khi nhận diện được mẫu lặp.', 'Biết xin hỗ trợ đúng lúc là một điểm mạnh.'),
      karma_debts: safeReadingKeynotes('Không tự gánh mọi thứ một mình.', 'Tránh để cảm giác nợ nần chi phối quyết định quan trọng.'),
      narrative_paragraphs: ['Trong bản đọc này, “nghiệp” được hiểu như bài học và mẫu hành vi cần quan sát, không phải lời phán xét hay kết luận về số phận.'],
    },
  }
}

type ReadingFallbackStar = {
  name?: unknown
  type?: unknown
}

type ReadingFallbackPalace = {
  name?: unknown
  chi?: unknown
  stars?: ReadingFallbackStar[]
  isMenh?: unknown
  isThan?: unknown
}

type ReadingFallbackChart = {
  name?: unknown
  gender?: unknown
  birthDate?: unknown
  birthHour?: unknown
  canNam?: unknown
  chiNam?: unknown
  cucSo?: unknown
  menhCung?: unknown
  menhChi?: unknown
  thanChi?: unknown
  palaces?: ReadingFallbackPalace[]
}

export function mapRealTuViApiPath(path: string[]): string {
  return `/${path
    .map((segment) => encodeURIComponent(API_SEGMENT_REWRITES[segment] ?? segment))
    .join('/')}`
}

function isLockedReadingResponse(status: number, path: string[], text: string): boolean {
  if (status !== 402) return false
  if (!path.includes('luan-giai')) return false
  try {
    const parsed = JSON.parse(text) as { detail?: { error?: string } }
    return parsed.detail?.error === 'locked'
  } catch {
    return text.includes('"error":"locked"')
  }
}

function isGeneratedReadingUnavailableResponse(status: number, path: string[], text: string): boolean {
  if (status < 500) return false
  if (!path.includes('luan-giai')) return false
  const tab = path[path.indexOf('luan-giai') + 1] ?? ''
  if (!GENERATED_READING_TABS.has(tab)) return false
  return text.includes('all 3 attempts failed') || text.includes('all attempts failed')
}

function shouldShortCircuitGeneratedReading(path: string[]): boolean {
  if (process.env.REAL_TUVI_GENERATED_READINGS_MODE !== 'safe-fallback') return false
  if (!path.includes('luan-giai')) return false
  const tab = path[path.indexOf('luan-giai') + 1] ?? ''
  return GENERATED_READING_TABS.has(tab)
}

export function lockedReadingFallback(path: string[]): Record<string, unknown> {
  const tab = path[path.indexOf('luan-giai') + 1] ?? ''
  const title =
    tab === 'tinh-cach' ? 'Tìm hiểu bản thân'
      : tab === 'su-nghiep' ? 'Sự nghiệp & nguồn lực'
        : tab === 'tinh-duyen' ? 'Tình duyên & hôn nhân'
          : tab === 'dai-van' ? 'Đại vận'
            : tab === 'tieu-han' ? 'Tiểu vận'
              : tab === 'cung' ? '12 cung'
                : 'Luận giải'

  if (tab === 'tinh-cach') {
    return {
      locked: true,
      ...buildTinhCachSafeFallback(),
    }
  }

  return {
    locked: true,
    hero: {
      headline: `${title} chưa tạo được luận giải`,
      sub: `${GENERATED_READING_FAIL_COPY} ${SAFE_READING_DISCLAIMER}`,
    },
    tong_quan: {
      headline: title,
      sub: `${GENERATED_READING_FAIL_COPY} ${SAFE_READING_DISCLAIMER}`,
      keynotes: [
        GENERATED_READING_FAIL_COPY,
        SAFE_READING_DISCLAIMER,
        `${GENERATED_READING_RETRY_LABEL} · ${GENERATED_READING_CHART_LABEL}`,
      ],
    },
    loi_khuyen: {
      headline: 'Gợi ý đọc tiếp',
      sub: `${GENERATED_READING_FAIL_COPY} ${SAFE_READING_DISCLAIMER}`,
      keynotes: [
        `${GENERATED_READING_RETRY_LABEL}: tải lại phần luận giải này khi kết nối sẵn sàng.`,
        `${GENERATED_READING_CHART_LABEL}: đọc lá số 12 cung đã an lập trong lúc chờ luận giải.`,
        'Dùng lá số 12 cung như bản tham khảo văn hóa, không thay thế tư vấn chuyên môn.',
      ],
    },
    retry_actions: [
      { label: GENERATED_READING_RETRY_LABEL, action: 'reload' },
      { label: GENERATED_READING_CHART_LABEL, action: 'open-chart' },
    ],
    ask_chips: [
      'Bói Toán giải thích cung Mệnh giúp tôi',
      'Năm nay tôi nên tự quan sát điều gì?',
    ],
  }
}

function buildChatDisabledGate(): string {
  return `
<style ${CHAT_DISABLED_GATE_MARKER}>
  html[data-boitoan-chat-disabled="true"] .rdg-chat textarea,
  html[data-boitoan-chat-disabled="true"] .rdg-chat input,
  html[data-boitoan-chat-disabled="true"] .rdg-chat form,
  html[data-boitoan-chat-disabled="true"] .rdg-chat .rdg-input-like,
  html[data-boitoan-chat-disabled="true"] .rdg-chat .rdg-prompt-btn,
  html[data-boitoan-chat-disabled="true"] .rdg-chat .rdg-send-btn {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  html[data-boitoan-chat-disabled="true"] .boitoan-chat-disabled-card {
    display: block !important;
    margin: 18px;
    padding: 18px;
    border: 1px solid rgba(201,169,97,.55);
    background: rgba(245,240,225,.96);
    color: var(--rdg-ink, #1a1f3a);
    font-family: var(--font-inter), 'Be Vietnam Pro', sans-serif;
    line-height: 1.65;
  }
  html[data-boitoan-chat-disabled="true"] .boitoan-chat-disabled-card strong {
    display: block;
    margin-bottom: 8px;
    color: var(--rdg-vermillion, #8b1f1f);
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
  }
  html[data-boitoan-chat-disabled="true"] .boitoan-chat-disabled-card p {
    margin: 0 0 12px;
    color: var(--rdg-ink-soft, #5f5548);
  }
  html[data-boitoan-chat-disabled="true"] .boitoan-chat-disabled-card ul {
    margin: 0;
    padding-left: 18px;
    color: var(--rdg-ink-soft, #5f5548);
  }
</style>
<script ${CHAT_DISABLED_GATE_MARKER}>
  (() => {
    const cardHtml = '<section class="boitoan-chat-disabled-card" data-boitoan-chat-visible-card="true" aria-label="Hỏi đáp Bói Toán đang kiểm định"><strong>Hỏi thêm về lá số</strong><p>Tính năng hỏi đáp đang được kiểm định để tránh trả lời sai. Bạn có thể đọc phần tóm tắt và 12 cung trước; Bói Toán sẽ mở hỏi đáp khi ổn định hơn.</p><ul><li>Xem tóm tắt</li><li>Xem 12 cung</li><li>Nội dung tham khảo, không phải lời tiên đoán.</li></ul></section>'
    const applyCard = () => {
      document.documentElement?.setAttribute('data-boitoan-chat-disabled', 'true')
      document.querySelectorAll('.rdg-chat').forEach((chat) => {
        if (!chat.querySelector('[data-boitoan-chat-visible-card="true"]')) {
          chat.innerHTML = cardHtml
        }
        chat.setAttribute('data-boitoan-chat-disabled-card', 'true')
        chat.setAttribute('aria-label', 'Hỏi đáp Bói Toán đang kiểm định')
      })
    }
    const start = () => {
      applyCard()
      const observer = new MutationObserver(applyCard)
      observer.observe(document.body, { childList: true, subtree: true })
      setTimeout(applyCard, 500)
      setTimeout(applyCard, 1500)
      setTimeout(applyCard, 3000)
    }
    if (document.body) start()
    else document.addEventListener('DOMContentLoaded', start, { once: true })
  })()
</script>`
}

export function applyChatVisibilityGate(html: string): string {
  if (isRealTuViChatEnabled() || html.includes(CHAT_DISABLED_GATE_MARKER)) return html
  const gate = buildChatDisabledGate()
  const bodyStart = html.search(/<body(?:\s[^>]*)?>/i)
  if (bodyStart === -1) return `${gate}${html}`
  const bodyEnd = html.indexOf('>', bodyStart)
  if (bodyEnd === -1) return `${gate}${html}`
  return `${html.slice(0, bodyEnd + 1)}${gate}${html.slice(bodyEnd + 1)}`
}


export function applyMobileReadingP0Patch(html: string): string {
  if (html.includes(MOBILE_READING_P0_PATCH_MARKER)) return html
  const patch = `
<style ${MOBILE_READING_P0_PATCH_MARKER}>
  @media (max-width: 768px) {
    .rdg-root .rdg-app { align-items: stretch !important; }
    .rdg-root .rdg-app > aside.rdg-panel:first-child { order: 1 !important; }
    .rdg-root .rdg-app > section.rdg-panel { order: 2 !important; }
    .rdg-root .rdg-app > aside.rdg-chat { order: 3 !important; }
    .rdg-root .rdg-app > .rdg-mobile-tabs { order: 4 !important; }
    .rdg-root .rdg-panel[data-mobile-hidden="laso"] { display: flex !important; }
    .rdg-root [data-boitoan-mobile-chart-first="true"] {
      order: 1 !important;
      flex: 0 0 auto !important;
      min-height: auto !important;
      overflow: visible !important;
    }
    .rdg-root [data-boitoan-mobile-chart-square="true"] {
      display: block !important;
      flex: 0 0 auto !important;
      min-height: min(calc(100vw - 40px), 560px) !important;
      margin-bottom: 10px !important;
      position: relative !important;
    }
    .rdg-root [data-boitoan-mobile-compact-disclaimer="true"] {
      order: 2 !important;
      margin: 10px 0 14px;
      padding: 10px 12px;
      border: 1px solid rgba(201, 169, 97, .38);
      border-radius: 14px;
      background: rgba(255, 250, 240, .92);
      color: var(--rdg-ink-soft, #5f5548);
      font-size: 12px;
      line-height: 1.55;
    }
    .rdg-root [data-boitoan-mobile-summary-below-chart="true"] { order: 3 !important; }
    .boitoan-generated-fallback-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 12px 0 22px;
    }
    .boitoan-generated-fallback-actions button {
      border: 1px solid rgba(201, 169, 97, .5);
      border-radius: 999px;
      background: rgba(255, 250, 240, .96);
      color: var(--rdg-indigo, #24214b);
      cursor: pointer;
      font: inherit;
      font-size: 13px;
      font-weight: 700;
      padding: 9px 13px;
    }
    .boitoan-generated-fallback-actions button:first-child {
      background: var(--rdg-vermillion, #8b1f1f);
      border-color: var(--rdg-vermillion, #8b1f1f);
      color: #fffaf0;
    }
    .boitoan-reading-fallback__card { display: flex; flex-direction: column; }
    .boitoan-reading-fallback__facts { order: 1; }
    .boitoan-reading-fallback__palaces { order: 2; }
    .boitoan-reading-fallback__disclaimer { order: 3; margin-top: 14px; }
    .boitoan-reading-fallback__actions { order: 4; }
  }
</style>
<script ${MOBILE_READING_P0_PATCH_MARKER}>
  (() => {
    const compactDisclaimer = 'Nội dung tham khảo, không phải lời tiên đoán hay lời khẳng định tương lai.'
    const generatedFailCopy = 'Chưa tạo được luận giải. Lá số của bạn đã được an lập; vui lòng thử tạo lại phần này.'
    const isMobile = () => window.matchMedia ? window.matchMedia('(max-width: 768px)').matches : window.innerWidth <= 768
    const cleanText = (node) => (node?.innerText || node?.textContent || '').replace(/\\s+/g, ' ').trim()
    const hasChartMarker = (node) => /THIÊN BÀN|Thiên Bàn/.test(cleanText(node))
    const hasSummaryMarker = (node) => {
      const text = cleanText(node)
      return text.includes('TÓM TẮT TRƯỚC KHI ĐỌC') || text.includes('Không khẳng định tương lai') || text.includes('Phương pháp:') || text.includes('Không bán nghi lễ')
    }
    const firstMatchingDescendant = (root, predicate) => {
      if (!root) return null
      const elements = Array.from(root.querySelectorAll('section, article, div, aside'))
      return elements.find((element) => predicate(element)) || null
    }
    const ensureGeneratedFallbackActions = () => {
      const paragraphs = Array.from(document.querySelectorAll('.rdg-module-content p, section p, article p, main p'))
      paragraphs
        .filter((paragraph) => cleanText(paragraph).includes(generatedFailCopy))
        .forEach((paragraph) => {
          if (paragraph.nextElementSibling?.matches?.('[data-boitoan-generated-fallback-actions="true"]')) return
          const actions = document.createElement('div')
          actions.className = 'boitoan-generated-fallback-actions'
          actions.setAttribute('data-boitoan-generated-fallback-actions', 'true')
          const retry = document.createElement('button')
          retry.type = 'button'
          retry.textContent = 'Thử lại'
          retry.addEventListener('click', () => window.location.reload())
          const chart = document.createElement('button')
          chart.type = 'button'
          chart.textContent = 'Xem lá số 12 cung'
          chart.addEventListener('click', () => {
            const lasoTab = Array.from(document.querySelectorAll('button.rdg-mobile-tab, button')).find((button) => /Lá số/.test(cleanText(button)))
            if (lasoTab) lasoTab.click()
            else document.querySelector('[data-boitoan-mobile-chart-first="true"]')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
          })
          actions.append(retry, chart)
          paragraph.insertAdjacentElement('afterend', actions)
        })
    }
    const patchChartPanel = () => {
      if (!isMobile() || !document.body) return
      document.documentElement.setAttribute('data-boitoan-mobile-reading-order', 'chart-first')
      const panels = Array.from(document.querySelectorAll('.rdg-root .rdg-app > aside.rdg-panel, .rdg-root aside.rdg-panel'))
      const chartPanel = panels.find((panel) => hasChartMarker(panel))
      if (!chartPanel) return
      const directChildren = Array.from(chartPanel.children)
      const chartSvg = Array.from(chartPanel.querySelectorAll('svg')).find((svg) => /Mệnh|Quan Lộc|Tử Nữ|Phụ Mẫu|Phúc Đức/.test(cleanText(svg)))
      const chartSquare = chartSvg?.parentElement || null
      const chartBlock = (chartSquare?.parentElement && chartPanel.contains(chartSquare.parentElement) ? chartSquare.parentElement : null)
        || directChildren.find((child) => hasChartMarker(child))
        || firstMatchingDescendant(chartPanel, hasChartMarker)
      const summaryBlock = directChildren.find((child) => hasSummaryMarker(child)) || firstMatchingDescendant(chartPanel, hasSummaryMarker)
      if (!chartBlock) return
      chartBlock.setAttribute('data-boitoan-mobile-chart-first', 'true')
      chartBlock.style.flex = '0 0 auto'
      chartBlock.style.overflow = 'visible'
      chartBlock.style.minHeight = 'auto'
      chartBlock.style.height = 'auto'
      if (chartSquare) {
        chartSquare.setAttribute('data-boitoan-mobile-chart-square', 'true')
        chartSquare.style.flex = '0 0 auto'
        chartSquare.style.minHeight = 'min(calc(100vw - 40px), 560px)'
        chartSquare.style.position = 'relative'
      }
      chartPanel.style.display = 'flex'
      chartPanel.style.flexDirection = 'column'
      const shouldMoveBeforeSummary = summaryBlock && Boolean(summaryBlock.compareDocumentPosition(chartBlock) & Node.DOCUMENT_POSITION_FOLLOWING)
      if (shouldMoveBeforeSummary) {
        chartPanel.insertBefore(chartBlock, summaryBlock)
      }
      if (summaryBlock) {
        summaryBlock.setAttribute('data-boitoan-mobile-summary-below-chart', 'true')
      }
      if (!chartPanel.querySelector('[data-boitoan-mobile-compact-disclaimer="true"]')) {
        const note = document.createElement('p')
        note.setAttribute('data-boitoan-mobile-compact-disclaimer', 'true')
        note.textContent = compactDisclaimer
        ;(chartSquare || chartBlock).insertAdjacentElement('afterend', note)
      }
      ensureGeneratedFallbackActions()
    }
    const start = () => {
      patchChartPanel()
      const observer = new MutationObserver(patchChartPanel)
      observer.observe(document.body, { childList: true, subtree: true })
      setTimeout(patchChartPanel, 250)
      setTimeout(patchChartPanel, 1000)
      setTimeout(patchChartPanel, 2500)
      setTimeout(patchChartPanel, 5000)
      setTimeout(ensureGeneratedFallbackActions, 7500)
    }
    if (document.body) start()
    else document.addEventListener('DOMContentLoaded', start, { once: true })
  })()
</script>`
  const headEnd = html.search(/<\/head>/i)
  if (headEnd !== -1) return `${html.slice(0, headEnd)}${patch}${html.slice(headEnd)}`
  const bodyStart = html.search(/<body(?:\s[^>]*)?>/i)
  if (bodyStart === -1) return `${patch}${html}`
  const bodyEnd = html.indexOf('>', bodyStart)
  if (bodyEnd === -1) return `${patch}${html}`
  return `${html.slice(0, bodyEnd + 1)}${patch}${html.slice(bodyEnd + 1)}`
}

function rewriteHtml(html: string, options: { gateChat?: boolean } = {}): string {
  const rewritten = sanitizeRealTuViHtmlText(html)
    .replaceAll('/_next/', `${REAL_TUVI_ASSET_PREFIX}/_next/`)
    .replaceAll('/assets/', `${REAL_TUVI_ASSET_PREFIX}/assets/`)
    .replaceAll('/icon.png', `${REAL_TUVI_ASSET_PREFIX}/icon.png`)
    .replaceAll('/apple-icon.png', `${REAL_TUVI_ASSET_PREFIX}/apple-icon.png`)
  return options.gateChat ? applyChatVisibilityGate(rewritten) : rewritten
}

function responseHeaders(upstream: Response, contentType?: string): Headers {
  const headers = new Headers()
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) headers.set(key, value)
  })
  if (contentType) headers.set('content-type', contentType)
  return headers
}

function safeText(value: unknown): string {
  return sanitizeRealTuViApiText(String(value ?? '')).replace(/[<>&"']/g, (char) => {
    if (char === '<') return '&lt;'
    if (char === '>') return '&gt;'
    if (char === '&') return '&amp;'
    if (char === '"') return '&quot;'
    return '&#39;'
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function mainStarNames(palace: ReadingFallbackPalace): string {
  const stars = Array.isArray(palace.stars) ? palace.stars : []
  const mainStars = stars
    .filter((star) => star?.type === 'main')
    .map((star) => safeText(star.name))
    .filter(Boolean)

  return mainStars.length > 0 ? mainStars.slice(0, 3).join(', ') : 'Đang cập nhật'
}

export function extractReadingChartId(pathname: string): string | null {
  const match = pathname.match(/^\/reading\/([^/?#]+)/)
  if (!match?.[1]) return null
  try {
    return decodeURIComponent(match[1])
  } catch {
    return match[1]
  }
}

export function buildReadingServerFallback(chart: ReadingFallbackChart): string {
  const palaces = Array.isArray(chart.palaces) ? chart.palaces : []
  const palaceRows = palaces
    .slice(0, 12)
    .map((palace) => {
      const flags = [
        palace.isMenh ? '<span>Mệnh</span>' : '',
        palace.isThan ? '<span>Thân</span>' : '',
      ].filter(Boolean).join('')

      return [
        '<li class="boitoan-reading-fallback__palace">',
        `<strong>${safeText(palace.name)}${palace.chi ? ` · ${safeText(palace.chi)}` : ''}</strong>`,
        `<small>${mainStarNames(palace)}</small>`,
        flags ? `<em>${flags}</em>` : '',
        '</li>',
      ].join('')
    })
    .join('')

  const canChi = [chart.canNam, chart.chiNam].map(safeText).filter(Boolean).join(' ')
  const fallback = `
<section id="boitoan-reading-ssr-fallback" class="boitoan-reading-fallback" data-boitoan-reading-ssr-fallback>
  <style>
    .boitoan-reading-fallback{margin:0 auto;max-width:1120px;padding:24px 16px 40px;color:#251f18;background:#f9f3e7;font-family:Arial,"Helvetica Neue",sans-serif}
    .boitoan-reading-fallback__card{border:1px solid rgba(168,127,46,.35);border-radius:24px;background:rgba(255,252,244,.96);box-shadow:0 18px 45px rgba(42,36,24,.12);padding:20px}
    .boitoan-reading-fallback__eyebrow{margin:0 0 8px;color:#8b1f1f;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
    .boitoan-reading-fallback h1{margin:0;color:#24214b;font-size:clamp(26px,5vw,42px);line-height:1.12}
    .boitoan-reading-fallback p{color:#5f5548;line-height:1.65}
    .boitoan-reading-fallback__facts{display:grid;gap:10px;margin:18px 0;grid-template-columns:repeat(auto-fit,minmax(145px,1fr))}
    .boitoan-reading-fallback__facts div{border:1px solid rgba(168,127,46,.25);border-radius:16px;background:#fffaf0;padding:12px}
    .boitoan-reading-fallback__facts span{display:block;color:#786c5d;font-size:12px;text-transform:uppercase}
    .boitoan-reading-fallback__facts strong{display:block;margin-top:4px;color:#24214b;font-size:16px}
    .boitoan-reading-fallback__palaces{display:grid;gap:10px;margin:18px 0 0;padding:0;list-style:none;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
    .boitoan-reading-fallback__palace{border:1px solid rgba(36,33,75,.12);border-radius:16px;background:white;padding:12px}
    .boitoan-reading-fallback__palace strong,.boitoan-reading-fallback__palace small{display:block}
    .boitoan-reading-fallback__palace small{margin-top:4px;color:#5f5548;line-height:1.45}
    .boitoan-reading-fallback__palace em{display:flex;gap:6px;margin-top:8px;font-style:normal}
    .boitoan-reading-fallback__palace span{border-radius:999px;background:#24214b;color:#fff;padding:3px 8px;font-size:11px}
    .boitoan-reading-fallback__actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
    .boitoan-reading-fallback__actions a,.boitoan-reading-fallback__actions button{border-radius:999px;padding:10px 14px;text-decoration:none;font-weight:700}
    .boitoan-reading-fallback__actions button{border:0;cursor:pointer;font:inherit}
    .boitoan-reading-fallback__primary{background:#8b1f1f;color:#fff}
    .boitoan-reading-fallback__secondary{border:1px solid rgba(36,33,75,.2);color:#24214b}
  </style>
  <div class="boitoan-reading-fallback__card">
    <p class="boitoan-reading-fallback__eyebrow">Bản dự phòng đang hiển thị ngay</p>
    <h1>Lá số đã tạo — bản tương tác đang được tải</h1>
    <p class="boitoan-reading-fallback__disclaimer" data-boitoan-disclaimer>Nếu trình duyệt hoặc kết nối chưa tải kịp JavaScript, bạn vẫn có thể xem tóm tắt lá số bên dưới. Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán hay lời khẳng định tương lai.</p>
    <div class="boitoan-reading-fallback__facts" aria-label="Tóm tắt lá số">
      <div><span>Họ tên</span><strong>${safeText(chart.name) || 'Bạn'}</strong></div>
      <div><span>Giới tính</span><strong>${safeText(chart.gender) || 'Đang cập nhật'}</strong></div>
      <div><span>Ngày sinh</span><strong>${safeText(chart.birthDate) || 'Đang cập nhật'}</strong></div>
      <div><span>Giờ sinh</span><strong>${safeText(chart.birthHour) || 'Đang cập nhật'}</strong></div>
      <div><span>Can Chi</span><strong>${canChi || 'Đang cập nhật'}</strong></div>
      <div><span>Mệnh</span><strong>${safeText(chart.menhCung || chart.menhChi) || 'Đang cập nhật'}</strong></div>
      <div><span>Thân</span><strong>${safeText(chart.thanChi) || 'Đang cập nhật'}</strong></div>
      <div><span>Cục</span><strong>${safeText(chart.cucSo) || 'Đang cập nhật'}</strong></div>
    </div>
    ${palaceRows ? `<ul class="boitoan-reading-fallback__palaces" aria-label="Tóm tắt 12 cung">${palaceRows}</ul>` : ''}
    <div class="boitoan-reading-fallback__actions">
      <button class="boitoan-reading-fallback__primary" type="button" onclick="window.location.reload()">Tải lại bản tương tác</button>
      <a class="boitoan-reading-fallback__secondary" href="/lap-la-so/">Lập lá số mới</a>
    </div>
  </div>
  <script>
    (() => {
      const fallback = document.getElementById('boitoan-reading-ssr-fallback')
      if (!fallback || !document.body) return
      const hasHydratedReading = () => {
        const text = Array.from(document.body.children)
          .filter((element) => element !== fallback && element.tagName !== 'SCRIPT')
          .map((element) => element.innerText || '')
          .join('\\n')
        return text.includes('THIÊN BÀN') || text.includes('TÓM TẮT TRƯỚC KHI ĐỌC') || text.includes('Cung Mệnh tại')
      }
      const removeWhenReady = () => {
        if (hasHydratedReading()) fallback.remove()
      }
      const observer = new MutationObserver(removeWhenReady)
      observer.observe(document.body, { childList: true, subtree: true })
      setTimeout(removeWhenReady, 1000)
      setTimeout(removeWhenReady, 3000)
    })()
  </script>
</section>`

  return sanitizeRealTuViHtmlText(fallback)
}

export function injectReadingServerFallback(html: string, fallbackHtml: string): string {
  if (!fallbackHtml || html.includes('data-boitoan-reading-ssr-fallback')) return html
  const bodyStart = html.search(/<body(?:\\s[^>]*)?>/i)
  if (bodyStart === -1) return `${fallbackHtml}${html}`
  const bodyEnd = html.indexOf('>', bodyStart)
  if (bodyEnd === -1) return `${fallbackHtml}${html}`
  return `${html.slice(0, bodyEnd + 1)}${fallbackHtml}${html.slice(bodyEnd + 1)}`
}

async function fetchReadingServerFallbackHtml(chartId: string): Promise<string | null> {
  const url = new URL(`/chart/${encodeURIComponent(chartId)}`, getRealTuViApiOrigin())
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'user-agent': 'boitoan-reading-ssr-fallback',
    },
    cache: 'no-store',
  })
  if (!response.ok) return null

  const text = sanitizeRealTuViApiText(await response.text())
  const parsed: unknown = JSON.parse(text)
  if (!isRecord(parsed)) return null
  return buildReadingServerFallback(parsed)
}

export async function proxyRealTuViGet(pathname: string, request: NextRequest): Promise<Response> {
  const url = new URL(pathname, getRealTuViOrigin())
  url.search = request.nextUrl.search
  const upstream = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      accept: request.headers.get('accept') ?? '*/*',
      'user-agent': request.headers.get('user-agent') ?? 'boitoan-proxy',
    },
    cache: 'no-store',
  })
  const contentType = upstream.headers.get('content-type') ?? ''
  if (contentType.includes('text/html')) {
    const chartId = extractReadingChartId(pathname)
    let html = rewriteHtml(await upstream.text(), { gateChat: Boolean(chartId) })
    if (chartId) {
      try {
        const fallbackHtml = await fetchReadingServerFallbackHtml(chartId)
        if (fallbackHtml) html = injectReadingServerFallback(html, fallbackHtml)
      } catch {
        // Keep the upstream reading page available even if the SSR safety net cannot load chart data.
      }
      html = applyMobileReadingP0Patch(html)
    }
    return new Response(html, {
      status: upstream.status,
      headers: responseHeaders(upstream, 'text/html; charset=utf-8'),
    })
  }
  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}

export function sanitizeRealTuViAssetText(text: string): string {
  return normalizeBirthHourCopyText(sanitizeRealTuViHtmlText(text))
    .replaceAll('useState)("luan")', 'useState)("laso")')
    .replaceAll('useState("luan")', 'useState("laso")')
    .replaceAll(
      'kh\\xf4ng phải lời khẳng định tương lai',
      'không phải lời tiên đoán hay lời khẳng định tương lai',
    )
    .replaceAll('/_next/', `${REAL_TUVI_ASSET_PREFIX}/_next/`)
    .replaceAll('/assets/', `${REAL_TUVI_ASSET_PREFIX}/assets/`)
}

export async function proxyRealTuViAsset(path: string[], request: NextRequest): Promise<Response> {
  const url = new URL(
    `/${path.map((segment) => encodeURIComponent(segment)).join('/')}`,
    getRealTuViOrigin(),
  )
  url.search = request.nextUrl.search
  const upstream = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      accept: request.headers.get('accept') ?? '*/*',
      'user-agent': request.headers.get('user-agent') ?? 'boitoan-asset-proxy',
    },
    cache: 'no-store',
  })
  const contentType = upstream.headers.get('content-type') ?? ''
  if (
    contentType.includes('javascript') ||
    contentType.includes('json') ||
    contentType.includes('text/') ||
    contentType.includes('css')
  ) {
    return new Response(sanitizeRealTuViAssetText(await upstream.text()), {
      status: upstream.status,
      headers: responseHeaders(upstream, contentType || undefined),
    })
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}

export async function proxyRealTuViApi(path: string[], request: NextRequest): Promise<Response> {
  if (shouldShortCircuitGeneratedReading(path)) {
    return new Response(JSON.stringify(lockedReadingFallback(path)), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-boitoan-proxy-fallback': 'locked-reading',
        'x-boitoan-proxy-fallback-reason': 'generated-readings-disabled',
      },
    })
  }

  const url = new URL(mapRealTuViApiPath(path), getRealTuViApiOrigin())
  url.search = request.nextUrl.search
  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('content-length')

  const method = request.method.toUpperCase()
  const body = method === 'GET' || method === 'HEAD' ? undefined : await request.arrayBuffer()
  const upstream = await fetch(url, {
    method,
    headers,
    body,
    redirect: 'follow',
    cache: 'no-store',
  })
  const contentType = upstream.headers.get('content-type') ?? ''
  if (contentType.includes('application/json') || contentType.includes('text/')) {
    const text = sanitizeRealTuViApiText(await upstream.text())
    if (
      isLockedReadingResponse(upstream.status, path, text) ||
      isGeneratedReadingUnavailableResponse(upstream.status, path, text)
    ) {
      return new Response(JSON.stringify(lockedReadingFallback(path)), {
        status: 200,
        headers: {
          ...Object.fromEntries(responseHeaders(upstream, 'application/json; charset=utf-8')),
          'x-boitoan-proxy-fallback': 'locked-reading',
        },
      })
    }
    return new Response(text, {
      status: upstream.status,
      headers: responseHeaders(upstream, contentType || undefined),
    })
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}
