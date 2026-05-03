import { NextRequest } from 'next/server'

const REAL_TUVI_ORIGIN = 'https://web-neon-tau-79.vercel.app'
const REAL_TUVI_API_ORIGIN = 'https://horoscope-production-987b.up.railway.app'
const REAL_TUVI_ASSET_PREFIX = '/real-tuvi-assets'
const DEFAULT_PRIVACY_CONTACT_EMAIL = 'privacy@boitoan.com.vn'
const PRIVACY_CONTACT_COPY =
  'Bói Toán sẽ phản hồi qua kênh liên hệ bạn cung cấp sau khi kiểm tra đủ thông tin để xác định đúng dữ liệu cần xóa.'
const EARLY_LAUNCH_CONTACT_NOTE =
  'Kênh liên hệ này được dùng để tiếp nhận yêu cầu trong giai đoạn đầu sau khi ra mắt.'
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

export function mapRealTuViApiPath(path: string[]): string {
  return `/${path
    .map((segment) => encodeURIComponent(API_SEGMENT_REWRITES[segment] ?? segment))
    .join('/')}`
}

function rewriteHtml(html: string): string {
  return sanitizeRealTuViHtmlText(html)
    .replaceAll('/_next/', `${REAL_TUVI_ASSET_PREFIX}/_next/`)
    .replaceAll('/assets/', `${REAL_TUVI_ASSET_PREFIX}/assets/`)
    .replaceAll('/icon.png', `${REAL_TUVI_ASSET_PREFIX}/icon.png`)
    .replaceAll('/apple-icon.png', `${REAL_TUVI_ASSET_PREFIX}/apple-icon.png`)
}

function responseHeaders(upstream: Response, contentType?: string): Headers {
  const headers = new Headers()
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) headers.set(key, value)
  })
  if (contentType) headers.set('content-type', contentType)
  return headers
}

export async function proxyRealTuViGet(pathname: string, request: NextRequest): Promise<Response> {
  const url = new URL(pathname, REAL_TUVI_ORIGIN)
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
    const html = rewriteHtml(await upstream.text())
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
  return sanitizeRealTuViHtmlText(text)
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
    REAL_TUVI_ORIGIN,
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
  const url = new URL(mapRealTuViApiPath(path), REAL_TUVI_API_ORIGIN)
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
    return new Response(sanitizeRealTuViApiText(await upstream.text()), {
      status: upstream.status,
      headers: responseHeaders(upstream, contentType || undefined),
    })
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}
