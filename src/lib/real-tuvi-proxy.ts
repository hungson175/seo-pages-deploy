import { NextRequest } from 'next/server'

const LEGACY_REAL_TUVI_ORIGIN = 'https://web-neon-tau-79.vercel.app'
const LEGACY_REAL_TUVI_API_ORIGIN = 'https://horoscope-production-987b.up.railway.app'
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

function getRequiredRealTuViUpstreamEnv(name: 'REAL_TUVI_ORIGIN' | 'REAL_TUVI_API_ORIGIN', legacyDevFallback: string): string {
  const value = process.env[name]?.trim()
  if (value) return value

  if (process.env.NODE_ENV === 'production') {
    throw new Error(`${name} is required in production; refusing legacy Vercel/Railway fallback`)
  }

  return legacyDevFallback
}

export function getRealTuViOrigin(): string {
  return getRequiredRealTuViUpstreamEnv('REAL_TUVI_ORIGIN', LEGACY_REAL_TUVI_ORIGIN)
}

export function getRealTuViApiOrigin(): string {
  return getRequiredRealTuViUpstreamEnv('REAL_TUVI_API_ORIGIN', LEGACY_REAL_TUVI_API_ORIGIN)
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

const LOCKED_READING_COPY =
  'Phần này đang được hoàn thiện cho bản public. Bạn có thể đọc mục Tìm hiểu bản thân và lá số 12 cung trước; Bói Toán sẽ mở thêm luận giải sau khi kiểm định nội dung.'

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

  return {
    locked: true,
    hero: {
      headline: `${title} đang được mở sau`,
      sub: LOCKED_READING_COPY,
    },
    tong_quan: {
      headline: title,
      sub: LOCKED_READING_COPY,
      keynotes: [LOCKED_READING_COPY],
    },
    loi_khuyen: {
      headline: 'Gợi ý đọc tiếp',
      sub: LOCKED_READING_COPY,
      keynotes: [
        'Đọc phần Tìm hiểu bản thân trước để nắm Mệnh, Thân, Cục và các điểm nền.',
        'Dùng lá số 12 cung như bản tham khảo văn hóa, không thay thế tư vấn chuyên môn.',
      ],
    },
    ask_chips: [
      'Bói Toán giải thích cung Mệnh giúp tôi',
      'Năm nay tôi nên tự quan sát điều gì?',
    ],
  }
}

function buildChatDisabledGate(): string {
  return `
<style ${CHAT_DISABLED_GATE_MARKER}>
  html[data-boitoan-chat-disabled="true"] .rdg-chat,
  html[data-boitoan-chat-disabled="true"] [data-boitoan-chat-hidden="true"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
</style>
<script ${CHAT_DISABLED_GATE_MARKER}>
  (() => {
    const hide = (element) => {
      if (!element || element.getAttribute('data-boitoan-chat-hidden') === 'true') return
      element.setAttribute('data-boitoan-chat-hidden', 'true')
      element.setAttribute('aria-hidden', 'true')
      if ('tabIndex' in element) element.tabIndex = -1
    }
    const normalize = (value) => String(value || '').replace(/\\s+/g, ' ').trim()
    const isChatTabText = (text) => text === 'Hỏi' || text === '命 Hỏi' || text === 'HỎI' || text === '命 HỎI'
    const isChatPromiseText = (text) =>
      text.includes('Gợi ý hỏi Bói Toán') ||
      text.includes('Bạn muốn hỏi thêm điều gì')
    const hideChat = () => {
      document.documentElement?.setAttribute('data-boitoan-chat-disabled', 'true')
      document.querySelectorAll('.rdg-chat').forEach(hide)
      document.querySelectorAll('button,[role="button"],a,textarea,input,form,aside').forEach((element) => {
        const text = normalize(element.innerText || element.textContent)
        if (!text) return
        if (isChatTabText(text) || isChatPromiseText(text)) hide(element)
      })
    }
    const start = () => {
      hideChat()
      const observer = new MutationObserver(hideChat)
      observer.observe(document.body, { childList: true, subtree: true, characterData: true })
      setTimeout(hideChat, 500)
      setTimeout(hideChat, 1500)
      setTimeout(hideChat, 3000)
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
    <p>Nếu trình duyệt hoặc kết nối chưa tải kịp JavaScript, bạn vẫn có thể xem tóm tắt lá số bên dưới. Nội dung chỉ mang tính tham khảo, không phải lời tiên đoán hay lời khẳng định tương lai.</p>
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
