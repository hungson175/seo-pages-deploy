import { NextRequest } from 'next/server'

const REAL_TUVI_ORIGIN = 'https://web-neon-tau-79.vercel.app'
const REAL_TUVI_API_ORIGIN = 'https://horoscope-production-987b.up.railway.app'
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
  return html
    .replaceAll('href="/_next/', `href="${REAL_TUVI_ORIGIN}/_next/`)
    .replaceAll('src="/_next/', `src="${REAL_TUVI_ORIGIN}/_next/`)
    .replaceAll("href='/_next/", `href='${REAL_TUVI_ORIGIN}/_next/`)
    .replaceAll("src='/_next/", `src='${REAL_TUVI_ORIGIN}/_next/`)
    .replaceAll('url(/_next/', `url(${REAL_TUVI_ORIGIN}/_next/`)
    .replaceAll('href="/assets/', `href="${REAL_TUVI_ORIGIN}/assets/`)
    .replaceAll('src="/assets/', `src="${REAL_TUVI_ORIGIN}/assets/`)
    .replaceAll('href="/icon.png"', `href="${REAL_TUVI_ORIGIN}/icon.png"`)
    .replaceAll('href="/apple-icon.png"', `href="${REAL_TUVI_ORIGIN}/apple-icon.png"`)
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
