import { NextRequest } from 'next/server'
import { proxyRealTuViGet } from '@/lib/real-tuvi-proxy'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  return proxyRealTuViGet('/quyen-rieng-tu', request)
}
