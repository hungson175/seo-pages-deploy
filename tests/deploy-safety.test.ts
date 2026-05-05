import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
const deployVercelScript = readFileSync('scripts/deploy-vercel.sh', 'utf8')

describe('legacy deploy safety', () => {
  it('keeps deploy:vercel behind an explicit legacy approval guard', () => {
    expect(packageJson.scripts['deploy:vercel']).toBe('bash scripts/deploy-vercel.sh')
    expect(deployVercelScript).toContain('BOSS_APPROVED_LEGACY_VERCEL_DEPLOY')
    expect(deployVercelScript).toContain('OCI is the production deploy path')
    expect(deployVercelScript).toContain('exit 64')
  })

  it('documents that production must not silently use Vercel/Railway upstream defaults', () => {
    const proxySource = readFileSync('src/lib/real-tuvi-proxy.ts', 'utf8')
    expect(proxySource).toContain('REAL_TUVI_ORIGIN')
    expect(proxySource).toContain('REAL_TUVI_API_ORIGIN')
    expect(proxySource).toContain('is required in production')
    expect(proxySource).toContain('refusing legacy Vercel/Railway fallback')
  })
})
