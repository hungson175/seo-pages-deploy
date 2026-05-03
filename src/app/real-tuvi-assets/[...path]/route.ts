import { NextRequest } from 'next/server'
import { proxyRealTuViAsset } from '@/lib/real-tuvi-proxy'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRealTuViAsset(path, request)
}
