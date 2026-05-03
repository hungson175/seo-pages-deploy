import { NextRequest } from 'next/server'

const REAL_TUVI_ORIGIN = 'https://web-neon-tau-79.vercel.app'
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
  const url = new URL(`/api/${path.join('/')}`, REAL_TUVI_ORIGIN)
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
  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}
