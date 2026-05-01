/**
 * STORY-016: H1 Optimization
 * Formula: [action] + [keyword] + [benefit/emotional]
 */

export function buildH1(
  action: string,
  keyword: string,
  benefit?: string
): string {
  if (benefit) {
    return `${action} ${keyword} — ${benefit}`
  }
  return `${action} ${keyword}`
}

export function getActionVerb(
  pageType: 'forecast' | 'star' | 'que' | 'tool'
): string {
  const verbs: Record<typeof pageType, string> = {
    forecast: 'Xem',
    star: 'Tìm Hiểu',
    que: 'Khám Phá',
    tool: 'Lập',
  }
  return verbs[pageType]
}
