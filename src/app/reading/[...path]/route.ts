import { NextRequest } from 'next/server'
import { proxyRealTuViGet } from '@/lib/real-tuvi-proxy'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRealTuViGet(`/reading/${path.join('/')}`, request)
}
