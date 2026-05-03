import { NextRequest } from 'next/server'
import { proxyRealTuViApi } from '@/lib/real-tuvi-proxy'

export const dynamic = 'force-dynamic'

async function handle(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRealTuViApi(path, request)
}

export const GET = handle
export const HEAD = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle
export const OPTIONS = handle
