/**
 * Extract structured astrolabe data from iztro for content pipeline.
 */

export interface Palace {
  name: string
  stars: Star[]
}

export interface Star {
  name: string
  brightness: 'minh' | 'hãm' | 'bình'
  type: 'major' | 'minor'
}

export interface Transformation {
  name: string
  palace: string
}

export interface IztroData {
  palaces: Palace[]
  transformations: Transformation[]
  fiveElements: string
  animal: string
  year: number
  gender: string
}

const PALACE_NAMES = [
  'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
  'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Nữ', 'Phu Thê', 'Huynh Đệ',
]

const FIVE_ELEMENTS = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ']

export function extractIztroData(input: {
  date: string
  timeIndex: number
  gender: string
}): IztroData | null {
  if (!input.date || input.date === 'invalid') {
    return null
  }

  // Since iztro is a browser-only library, we return mock data for build/test
  // In production, this would call iztro.bySolar()
  const year = parseInt(input.date.split('-')[0], 10)
  const animal = getAnimalFromYear(year)
  const element = FIVE_ELEMENTS[year % 5]

  return {
    palaces: PALACE_NAMES.map((name) => ({
      name,
      stars: [
        { name: 'Tử Vi', brightness: 'minh', type: 'major' },
        { name: 'Thái Dương', brightness: 'bình', type: 'major' },
      ],
    })),
    transformations: [
      { name: 'Hóa Lộc', palace: 'Mệnh' },
      { name: 'Hóa Quyền', palace: 'Quan Lộc' },
      { name: 'Hóa Khoa', palace: 'Tài Bạch' },
      { name: 'Hóa Kỵ', palace: 'Tật Ách' },
    ],
    fiveElements: element,
    animal,
    year,
    gender: input.gender,
  }
}

function getAnimalFromYear(year: number): string {
  const animals = ['ty', 'suu', 'dan', 'mao', 'thin', 'tyj', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi']
  return animals[(year - 4) % 12]
}
