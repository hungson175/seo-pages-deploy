export function estimateBundleSize(pageType: 'static' | 'tool'): number {
  // Proxy estimates based on Sprint 1 build output
  return pageType === 'static' ? 106 : 108
}

export function checkAccessibilityRules(html: string): { violations: string[] } {
  const violations: string[] = []

  if (!html.includes('lang=')) {
    violations.push('Missing lang attribute on <html>')
  }

  const inputsWithoutLabels = html.match(/<input[^>]*>/g) || []
  for (const input of inputsWithoutLabels) {
    const hasId = /id="[^"]+"/.test(input)
    const hasAriaLabel = /aria-label="[^"]+"/.test(input)
    const hasAriaLabelledBy = /aria-labelledby="[^"]+"/.test(input)
    const inputId = input.match(/id="([^"]+)"/)?.[1] || ''
    const hasForLabel = inputId && html.includes(`for="${inputId}"`)
    if (!hasForLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      violations.push('Form input missing label')
    }
  }

  return { violations }
}
