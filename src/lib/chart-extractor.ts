export interface PalaceData {
  name: string
  majorStars: Array<{ name: string; brightness: 'minh' | 'ham' | 'binh' }>
  minorStars: string[]
  transformation?: 'Hoa Loc' | 'Hoa Quyen' | 'Hoa Khoa' | 'Hoa Ky'
}

export interface ChartData {
  palaces: PalaceData[]
  yearElement: 'Kim' | 'Moc' | 'Thuy' | 'Hoa' | 'Tho'
  fateElement: string
}

export function extractChartData(iztroJson: unknown): ChartData {
  const json = iztroJson as Record<string, unknown>
  const palaces = (json.palaces as Array<Record<string, unknown>>) || []

  return {
    palaces: palaces.map((p) => ({
      name: String(p.name || ''),
      majorStars: ((p.majorStars as Array<Record<string, unknown>>) || []).map((s) => ({
        name: String(s.name || ''),
        brightness: (String(s.brightness || 'binh') as 'minh' | 'ham' | 'binh'),
      })),
      minorStars: ((p.minorStars as string[]) || []),
      transformation: (p.transformation as ChartData['palaces'][0]['transformation']),
    })),
    yearElement: (json.yearElement as ChartData['yearElement']) || 'Kim',
    fateElement: String(json.fateElement || ''),
  }
}
