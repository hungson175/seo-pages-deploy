import { astro } from 'iztro'

export interface ChartData {
  palaces: Array<{
    name: string
    index: number
    majorStars: Array<{ name: string; brightness: string }>
    minorStars: string[]
    transformation?: string
  }>
  mingPalace: string
  bodyPalace: string
  element: string
  sign: string
}

export function generateChart(
  birthDate: string,
  birthTime: number,
  gender: 'nam' | 'nu'
): ChartData | null {
  try {
    const date = new Date(birthDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    
    // Map birth time index to hour (0-11 = Tý to Hợi)
    const hour = birthTime
    
    const chart: any = astro.bySolar(`${year}-${month}-${day}`, hour, gender === 'nu' ? 'female' : 'male', true, 'vi-VN')
    
    if (!chart || !chart.palaces) {
      return null
    }

    const palaces = chart.palaces.map((palace: any, index: number) => {
      const majorStars = (palace.majorStars || []).map((star: any) => ({
        name: star.name,
        brightness: star.brightness === 1 ? 'minh' : star.brightness === 0 ? 'bình' : 'hãm'
      }))
      
      const minorStars = (palace.minorStars || []).map((star: any) => star.name)
      
      return {
        name: palace.name,
        index,
        majorStars,
        minorStars,
        transformation: palace.mutagen || undefined
      }
    })

    return {
      palaces,
      mingPalace: chart.mingPalace?.name || '',
      bodyPalace: chart.bodyPalace?.name || '',
      element: chart.element || '',
      sign: chart.sign || ''
    }
  } catch (error) {
    console.error('Error generating chart:', error)
    return null
  }
}
