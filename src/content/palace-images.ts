import type { PalaceSlug } from './palaces'

export interface PalaceImageAsset {
  slug: PalaceSlug
  name: string
  src: string
  width: number
  height: number
  alt: string
  caption: string
  visualTheme: string
}

const IMAGE_BASE = '/images/palaces'

function imagePath(slug: PalaceSlug): string {
  return `${IMAGE_BASE}/tu-vi-cung-${slug}.webp`
}

export const PALACE_IMAGE_ASSETS: Record<PalaceSlug, PalaceImageAsset> = {
  menh: {
    slug: 'menh',
    name: 'Mệnh',
    src: imagePath('menh'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Mệnh trong lá số Tử Vi — một người đứng trước lối đi sáng',
    caption: 'Cung Mệnh: hình ảnh tự quan sát và chọn hướng đi.',
    visualTheme: 'căn tính, nhịp tự chủ và điểm xuất phát của lá số',
  },
  'phu-mau': {
    slug: 'phu-mau',
    name: 'Phụ Mẫu',
    src: imagePath('phu-mau'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Phụ Mẫu trong lá số Tử Vi — khung cảnh gia đình uống trà',
    caption: 'Cung Phụ Mẫu: gốc gia đình, lời khuyên và ranh giới.',
    visualTheme: 'nguồn gốc gia đình, khuôn phép và người nâng đỡ ban đầu',
  },
  'phuc-duc': {
    slug: 'phuc-duc',
    name: 'Phúc Đức',
    src: imagePath('phuc-duc'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Phúc Đức trong lá số Tử Vi — khu vườn sen yên tĩnh',
    caption: 'Cung Phúc Đức: nền tinh thần và cảm giác an ổn.',
    visualTheme: 'phúc khí, gia tộc, hồi phục tinh thần và giá trị dài hạn',
  },
  'dien-trach': {
    slug: 'dien-trach',
    name: 'Điền Trạch',
    src: imagePath('dien-trach'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Điền Trạch trong lá số Tử Vi — sân nhà sáng ấm',
    caption: 'Cung Điền Trạch: nơi ở, nền ổn định và không gian sống.',
    visualTheme: 'nhà cửa, nơi chốn, tài sản bền và cảm giác thuộc về',
  },
  'quan-loc': {
    slug: 'quan-loc',
    name: 'Quan Lộc',
    src: imagePath('quan-loc'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Quan Lộc trong lá số Tử Vi — bàn làm việc trong ánh bình minh',
    caption: 'Cung Quan Lộc: công việc, trách nhiệm và uy tín nghề nghiệp.',
    visualTheme: 'sự nghiệp, vai trò xã hội và tiêu chuẩn chuyên môn',
  },
  'no-boc': {
    slug: 'no-boc',
    name: 'Nô Bộc',
    src: imagePath('no-boc'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Nô Bộc trong lá số Tử Vi — nhóm người cộng tác quanh bàn',
    caption: 'Cung Nô Bộc: cộng sự, bạn bè và mạng lưới hỗ trợ.',
    visualTheme: 'bạn bè, cộng sự, hỗ trợ xã hội và cách hợp tác',
  },
  'thien-di': {
    slug: 'thien-di',
    name: 'Thiên Di',
    src: imagePath('thien-di'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Thiên Di trong lá số Tử Vi — con đường mở ra phía chân trời',
    caption: 'Cung Thiên Di: môi trường bên ngoài và cơ hội khi đi xa.',
    visualTheme: 'ra ngoài, di chuyển, môi trường xã hội và tầm nhìn mở rộng',
  },
  'tat-ach': {
    slug: 'tat-ach',
    name: 'Tật Ách',
    src: imagePath('tat-ach'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Tật Ách trong lá số Tử Vi — tách trà và khăn nghỉ trong ánh sáng nhẹ',
    caption: 'Cung Tật Ách: nhịp nghỉ, sức bền và chăm sóc nền sinh hoạt.',
    visualTheme: 'nhịp sống, nghỉ ngơi, sức bền tinh thần và tự chăm sóc',
  },
  'tai-bach': {
    slug: 'tai-bach',
    name: 'Tài Bạch',
    src: imagePath('tai-bach'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Tài Bạch trong lá số Tử Vi — dòng nước và ruộng lúa dưới nắng ấm',
    caption: 'Cung Tài Bạch: nguồn lực, kỷ luật vật chất và cách giữ nền.',
    visualTheme: 'nguồn lực, dòng chảy tích lũy, kỷ luật chi tiêu và quyết định vật chất',
  },
  'tu-nu': {
    slug: 'tu-nu',
    name: 'Tử Nữ',
    src: imagePath('tu-nu'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Tử Nữ trong lá số Tử Vi — cảnh trồng cây cùng thế hệ sau',
    caption: 'Cung Tử Nữ: trách nhiệm nuôi dưỡng và kết nối thế hệ sau.',
    visualTheme: 'thế hệ sau, trách nhiệm nuôi dưỡng và cách trao truyền',
  },
  'phu-the': {
    slug: 'phu-the',
    name: 'Phu Thê',
    src: imagePath('phu-the'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Phu Thê trong lá số Tử Vi — hai người đi bên nhau trên lối vườn',
    caption: 'Cung Phu Thê: quan hệ đôi bên, đối thoại và ranh giới.',
    visualTheme: 'hôn phối, quan hệ thân mật, hợp tác đôi bên và giao tiếp',
  },
  'huynh-de': {
    slug: 'huynh-de',
    name: 'Huynh Đệ',
    src: imagePath('huynh-de'),
    width: 800,
    height: 600,
    alt: 'Minh họa cung Huynh Đệ trong lá số Tử Vi — hai người ngồi uống trà trò chuyện',
    caption: 'Cung Huynh Đệ: anh chị em, bạn ngang hàng và sự hỗ trợ.',
    visualTheme: 'anh chị em, đồng lứa, hỗ trợ gần và ranh giới ngang hàng',
  },
}

export const PALACE_IMAGE_LIST = Object.values(PALACE_IMAGE_ASSETS)

export function getPalaceImage(slug: PalaceSlug): PalaceImageAsset {
  return PALACE_IMAGE_ASSETS[slug]
}

export function getAbsolutePalaceImageUrl(slug: PalaceSlug): string {
  return `https://boitoan.com.vn${getPalaceImage(slug).src}`
}

export function getPalaceImageForForecastSection(heading: string): PalaceImageAsset | null {
  if (heading.includes('Tổng quan')) return PALACE_IMAGE_ASSETS.menh
  if (heading.includes('Công danh') || heading.includes('sự nghiệp')) return PALACE_IMAGE_ASSETS['quan-loc']
  if (heading.includes('Tài lộc')) return PALACE_IMAGE_ASSETS['tai-bach']
  if (heading.includes('Tình duyên') || heading.includes('gia đạo')) return PALACE_IMAGE_ASSETS['phu-the']
  if (heading.includes('Sức khỏe') || heading.includes('tinh thần')) return PALACE_IMAGE_ASSETS['tat-ach']
  return null
}
