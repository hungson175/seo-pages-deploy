/** Rich Tử Vi palace content for /cung/* SEO foundation pages. */

export interface PalaceSummaryRow {
  aspect: string
  meaning: string
  readingCue: string
}

export interface PalaceSection {
  heading: string
  content: string[]
}

export interface PalaceInternalLink {
  href: string
  label: string
  relation: string
}

export interface PalaceFoundationPage {
  name: string
  slug: string
  order: number
  h1: string
  title: string
  description: string
  urlPath: string
  methodNote: string
  intro: string[]
  summaryRows: PalaceSummaryRow[]
  sections: PalaceSection[]
  faqs: Array<{ question: string; answer: string }>
  internalLinks: PalaceInternalLink[]
  disclaimer: string
}

interface PalaceProfile {
  slug: PalaceSlug
  name: string
  hanTu: string
  order: number
  represents: string
  coreTheme: string
  lifeArea: string
  keyQuestion: string
  xungChieu: string
  adjacent: string
  strengths: string
  cautions: string
  starFocus: Array<{ slug: string; name: string; cue: string }>
  readingFocus: string
  practicalUse: string
  wellbeingCue: string
  reflectiveQuestions: string[]
  relatedPalaces: PalaceSlug[]
  forecastLinks: Array<{ href: string; label: string }>
}

export const PALACE_SLUGS = [
  'menh',
  'phu-mau',
  'phuc-duc',
  'dien-trach',
  'quan-loc',
  'no-boc',
  'thien-di',
  'tat-ach',
  'tai-bach',
  'tu-nu',
  'phu-the',
  'huynh-de',
] as const

export type PalaceSlug = (typeof PALACE_SLUGS)[number]

export const PALACE_DISCLAIMER =
  '* Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Bói Toán là nội dung giải trí và thuật toán tham khảo theo văn hóa Tử Vi; không dùng bài viết này để thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.'

export const PALACE_METHOD_NOTE =
  'Phân tích tham khảo theo tinh thần Tam Hợp Phái / 《紫微斗数全书》: đọc cung trong hệ 12 cung, phối hợp Mệnh Cung, Thân Cung, tam phương tứ chính, sao tọa thủ, sao hội chiếu, Tứ Hóa và bối cảnh thực tế; không kết luận chỉ từ một cung riêng lẻ.'

const STAR_LIBRARY = {
  'tu-vi': 'Tử Vi',
  'thai-duong': 'Thái Dương',
  'thai-am': 'Thái Âm',
  'thien-co': 'Thiên Cơ',
  'vu-khuc': 'Vũ Khúc',
  'thien-luong': 'Thiên Lương',
} as const

const PALACE_PROFILES: Record<PalaceSlug, PalaceProfile> = {
  menh: {
    slug: 'menh',
    name: 'Mệnh',
    hanTu: '命宮',
    order: 1,
    represents: 'khí chất gốc, cách một người tự nhận diện bản thân, phản ứng đầu tiên với đời sống và trục xuất phát của toàn bộ lá số',
    coreTheme: 'căn tính, chủ động cá nhân và cách người xem đứng vào đời sống của mình',
    lifeArea: 'bản thân, tính cách, xu hướng hành động và bài học tự chủ',
    keyQuestion: 'Tôi đang dùng điểm mạnh gốc của mình để tạo trật tự hay để né tránh thay đổi?',
    xungChieu: 'Thiên Di',
    adjacent: 'Phụ Mẫu và Huynh Đệ',
    strengths: 'giúp người học nhìn được nền tính cách, nhịp tự quyết và cách phối hợp giữa mục tiêu cá nhân với công việc, tiền bạc, môi trường bên ngoài',
    cautions: 'dễ bị đọc quá mức như một nhãn định danh cố định nếu bỏ qua Thân Cung, Thiên Di, Tài Bạch, Quan Lộc và dữ kiện đời sống thật',
    starFocus: [
      { slug: 'tu-vi', name: 'Tử Vi', cue: 'gợi nhu cầu tự chủ, tổ chức và giữ trục trách nhiệm' },
      { slug: 'thai-duong', name: 'Thái Dương', cue: 'làm rõ cách xuất hiện công khai, tinh thần minh bạch và danh dự' },
      { slug: 'thien-co', name: 'Thiên Cơ', cue: 'nhấn vào tư duy, khả năng xoay chuyển và thói quen phân tích' },
    ],
    readingFocus: 'đặt Mệnh làm điểm xuất phát, rồi kiểm tra Tài Bạch, Quan Lộc và Thiên Di để xem bản thân được nguồn lực, nghề nghiệp và môi trường nâng hay kéo',
    practicalUse: 'dùng để tự quan sát khí chất, cách ra quyết định, điều mình hay gánh và điều mình cần học để trưởng thành mà không đóng khung bản thân',
    wellbeingCue: 'giữ nhịp sinh hoạt, giấc ngủ, khoảng nghỉ và ranh giới tinh thần để điểm mạnh cá nhân không biến thành áp lực tự chứng minh',
    reflectiveQuestions: ['Mình hay phản ứng bằng bản năng nào khi bị áp lực?', 'Mục tiêu nào thật sự là của mình, mục tiêu nào chỉ do kỳ vọng bên ngoài?', 'Môi trường nào giúp mình dùng điểm mạnh gốc một cách lành mạnh?'],
    relatedPalaces: ['tai-bach', 'quan-loc', 'thien-di'],
    forecastLinks: [
      { href: '/tu-vi-2026/giap-ty-1984-nam-mang/', label: 'Tử vi Giáp Tý 1984 nam mạng' },
      { href: '/tu-vi-2026/binh-dan-1986-nu-mang/', label: 'Tử vi Bính Dần 1986 nữ mạng' },
    ],
  },
  'phu-mau': {
    slug: 'phu-mau',
    name: 'Phụ Mẫu',
    hanTu: '父母宮',
    order: 2,
    represents: 'nguồn gốc gia đình, quan hệ với cha mẹ, người nâng đỡ ban đầu, cách một người tiếp nhận khuôn phép và nền nếp',
    coreTheme: 'gốc nuôi dưỡng, khuôn phép và ký ức về quyền uy gần nhất trong tuổi đầu đời',
    lifeArea: 'cha mẹ, người bảo trợ, môi trường giáo dục sớm và cách tiếp nhận lời khuyên',
    keyQuestion: 'Nền nếp gia đình đang nâng mình lên hay khiến mình lặp lại một khuôn mẫu chưa được kiểm chứng?',
    xungChieu: 'Tật Ách',
    adjacent: 'Mệnh và Phúc Đức',
    strengths: 'giúp hiểu cách một người học từ gia đình, nhận hỗ trợ, phản ứng với quyền uy và xây quan hệ biết ơn nhưng có ranh giới',
    cautions: 'dễ bị biến thành phán xét cha mẹ nếu bỏ qua bối cảnh thế hệ, hoàn cảnh sống và lựa chọn trưởng thành của người xem',
    starFocus: [
      { slug: 'thien-luong', name: 'Thiên Lương', cue: 'gợi vai trò che chở, chuẩn mực và lời khuyên từ người lớn' },
      { slug: 'thai-duong', name: 'Thái Dương', cue: 'làm rõ hình ảnh quyền uy công khai, trách nhiệm và sự kỳ vọng' },
      { slug: 'thai-am', name: 'Thái Âm', cue: 'nhấn vào chăm sóc kín đáo, cảm xúc gia đình và nền tích lũy' },
    ],
    readingFocus: 'đọc Phụ Mẫu cùng Mệnh, Phúc Đức và Tật Ách để tách phần gốc rễ gia đình khỏi phần người xem tự rèn sau này',
    practicalUse: 'dùng để nhận diện điều mình kế thừa, điều nên biết ơn, điều cần đặt ranh giới và cách trao đổi với người thân bớt phản ứng',
    wellbeingCue: 'giữ khoảng nghỉ cảm xúc khi xử lý chuyện gia đình, tránh mang căng thẳng thế hệ vào mọi quyết định cá nhân',
    reflectiveQuestions: ['Mình đang lặp lại nguyên tắc nào của gia đình mà chưa kiểm chứng?', 'Ranh giới nào cần nói rõ với người thân?', 'Điều gì từ cha mẹ hoặc người nâng đỡ vẫn đang giúp mình hôm nay?'],
    relatedPalaces: ['menh', 'phuc-duc', 'tat-ach'],
    forecastLinks: [
      { href: '/tu-vi-2026/at-suu-1985-nam-mang/', label: 'Tử vi Ất Sửu 1985 nam mạng' },
      { href: '/tu-vi-2026/at-suu-1985-nu-mang/', label: 'Tử vi Ất Sửu 1985 nữ mạng' },
    ],
  },
  'phuc-duc': {
    slug: 'phuc-duc',
    name: 'Phúc Đức',
    hanTu: '福德宮',
    order: 3,
    represents: 'nền phúc khí, đời sống tinh thần, gia tộc, thói quen tích đức và cảm giác an ổn bên trong',
    coreTheme: 'nền tinh thần, ký ức dòng họ và khả năng sống có hậu trước áp lực đời sống',
    lifeArea: 'tâm tính, gia tộc, nền đạo đức, thói quen nghỉ ngơi và chất lượng an trú nội tâm',
    keyQuestion: 'Mình đang sống theo một nền giá trị làm mình vững hơn hay chỉ đang chạy theo áp lực trước mắt?',
    xungChieu: 'Tài Bạch',
    adjacent: 'Phụ Mẫu và Điền Trạch',
    strengths: 'giúp hiểu vì sao cùng hoàn cảnh nhưng mỗi người có sức bền tinh thần, lòng tin và cách hồi phục khác nhau',
    cautions: 'dễ bị đọc thành may rủi mơ hồ nếu không liên hệ với hành vi thực tế, gia phong, nhịp sống và những quan hệ thân cận',
    starFocus: [
      { slug: 'thien-luong', name: 'Thiên Lương', cue: 'gợi đạo lý, lòng che chở và khả năng làm điểm tựa tinh thần' },
      { slug: 'thai-am', name: 'Thái Âm', cue: 'nhấn vào nội lực, cảm xúc kín đáo và không gian hồi phục' },
      { slug: 'thai-duong', name: 'Thái Dương', cue: 'làm rõ phần giá trị cần sống minh bạch, có ích và có trách nhiệm' },
    ],
    readingFocus: 'đọc Phúc Đức cùng Tài Bạch, Phu Thê và Thiên Di để xem tinh thần, nguồn lực và quan hệ xã hội có hỗ trợ nhau không',
    practicalUse: 'dùng để nhìn lại nếp sống, việc thiện nhỏ, cách nghỉ ngơi và những giá trị dài hạn đang tạo nền cho quyết định hằng ngày',
    wellbeingCue: 'giữ giấc ngủ, nhịp nghỉ, không gian tĩnh và các hoạt động hồi phục tinh thần thay vì chỉ cố gắng bằng ý chí',
    reflectiveQuestions: ['Giá trị nào giúp mình bình tĩnh hơn trong giai đoạn khó?', 'Mình có lịch nghỉ thật sự hay chỉ nghỉ khi kiệt sức?', 'Quan hệ nào đem lại cảm giác có gốc và có hậu?'],
    relatedPalaces: ['phu-the', 'thien-di', 'tai-bach'],
    forecastLinks: [
      { href: '/tu-vi-2026/dinh-mao-1987-nam-mang/', label: 'Tử vi Đinh Mão 1987 nam mạng' },
      { href: '/tu-vi-2026/dinh-mao-1987-nu-mang/', label: 'Tử vi Đinh Mão 1987 nữ mạng' },
    ],
  },
  'dien-trach': {
    slug: 'dien-trach',
    name: 'Điền Trạch',
    hanTu: '田宅宮',
    order: 4,
    represents: 'nhà cửa, nơi ở, tài sản bền, cảm giác thuộc về và cách một người quản trị không gian sống',
    coreTheme: 'nền vật chất ổn định, nơi chốn và cảm giác có một mái nhà đúng nghĩa',
    lifeArea: 'nhà ở, đất đai theo nghĩa văn hóa, không gian sống, tài sản dài hạn và nếp sinh hoạt trong gia đình',
    keyQuestion: 'Không gian sống hiện tại đang giúp mình vững lại hay làm mình tiêu hao năng lượng mỗi ngày?',
    xungChieu: 'Tử Nữ',
    adjacent: 'Phúc Đức và Quan Lộc',
    strengths: 'giúp nhận diện nhu cầu ổn định, khả năng giữ tài sản bền và cách không gian sống ảnh hưởng đến tinh thần làm việc',
    cautions: 'dễ bị biến thành lời hứa về nhà đất nếu đọc thiếu dữ liệu tài chính, pháp lý, gia đình và hoàn cảnh thị trường',
    starFocus: [
      { slug: 'vu-khuc', name: 'Vũ Khúc', cue: 'gợi kỷ luật vật chất, quản trị tài sản và tiêu chuẩn rõ ràng' },
      { slug: 'thai-am', name: 'Thái Âm', cue: 'nhấn vào tích lũy kín đáo, không gian riêng và sự chăm sóc bền' },
      { slug: 'tu-vi', name: 'Tử Vi', cue: 'làm rõ vai trò tổ chức, phân quyền và giữ trật tự trong nhà' },
    ],
    readingFocus: 'đọc Điền Trạch cùng Phúc Đức, Quan Lộc, Tử Nữ và Tật Ách để xem nhà cửa là nơi phục hồi, nơi trách nhiệm hay nơi cần sắp xếp lại',
    practicalUse: 'dùng để rà soát không gian sống, thói quen lưu trữ giấy tờ, kế hoạch tài sản bền và cách chia trách nhiệm trong gia đình',
    wellbeingCue: 'giữ nhịp sinh hoạt trong nhà, ánh sáng, góc làm việc, góc nghỉ và ranh giới giữa việc nhà với việc nghề',
    reflectiveQuestions: ['Góc nào trong nhà làm mình dễ bình tĩnh hơn?', 'Tài sản dài hạn nào cần được ghi chép rõ hơn?', 'Việc nhà nào cần chia lại để không thành áp lực âm thầm?'],
    relatedPalaces: ['phuc-duc', 'quan-loc', 'tu-nu'],
    forecastLinks: [
      { href: '/tu-vi-2026/mau-thin-1988-nam-mang/', label: 'Tử vi Mậu Thìn 1988 nam mạng' },
      { href: '/tu-vi-2026/mau-thin-1988-nu-mang/', label: 'Tử vi Mậu Thìn 1988 nữ mạng' },
    ],
  },
  'quan-loc': {
    slug: 'quan-loc',
    name: 'Quan Lộc',
    hanTu: '官祿宮',
    order: 5,
    represents: 'công việc, vai trò xã hội, trách nhiệm nghề nghiệp, cách một người xây uy tín và tạo thành quả',
    coreTheme: 'sự nghiệp theo nghĩa năng lực tạo giá trị, nhận trách nhiệm và đứng trong một hệ thống làm việc',
    lifeArea: 'nghề nghiệp, chức năng, danh dự nghề, tiêu chuẩn chuyên môn và nhịp thăng tiến theo công sức',
    keyQuestion: 'Mình đang xây nghề dựa trên năng lực thật hay chỉ dựa vào kỳ vọng về vị trí?',
    xungChieu: 'Phu Thê',
    adjacent: 'Điền Trạch và Nô Bộc',
    strengths: 'giúp người học nhìn rõ xu hướng nghề, cách làm việc, uy tín chuyên môn và mối liên hệ giữa bản thân với nguồn lực',
    cautions: 'dễ bị đọc thành lời chỉ định nghề nghiệp nếu bỏ qua kỹ năng, thị trường, lựa chọn học tập và hoàn cảnh thực tế',
    starFocus: [
      { slug: 'thai-duong', name: 'Thái Dương', cue: 'gợi vai trò công khai, minh bạch, dẫn dắt hoặc phục vụ cộng đồng' },
      { slug: 'tu-vi', name: 'Tử Vi', cue: 'nhấn vào quản trị, tổ chức, giữ trục và gánh trách nhiệm' },
      { slug: 'thien-co', name: 'Thiên Cơ', cue: 'làm rõ tư duy hệ thống, kỹ thuật, tham mưu và cải tiến quy trình' },
    ],
    readingFocus: 'đọc Quan Lộc cùng Mệnh, Tài Bạch, Phu Thê và Nô Bộc để biết nghề có đi cùng bản thân, nguồn lực, quan hệ thân cận và đội nhóm không',
    practicalUse: 'dùng để định kỳ kiểm tra năng lực lõi, danh mục việc đang gánh, tiêu chuẩn nghề và cách nói rõ ranh giới với công việc',
    wellbeingCue: 'giữ nhịp nghỉ giữa các chu kỳ làm việc, tránh biến trách nhiệm nghề thành áp lực thường trực không có điểm dừng',
    reflectiveQuestions: ['Năng lực nào đang tạo uy tín thật cho mình?', 'Việc nào nên ủy quyền hoặc bỏ bớt để nghề bền hơn?', 'Công việc đang nâng quan hệ thân cận hay lấy mất toàn bộ sự hiện diện?'],
    relatedPalaces: ['menh', 'tai-bach', 'phu-the'],
    forecastLinks: [
      { href: '/tu-vi-2026/ky-ty-1989-nam-mang/', label: 'Tử vi Kỷ Tỵ 1989 nam mạng' },
      { href: '/tu-vi-2026/canh-ngo-1990-nu-mang/', label: 'Tử vi Canh Ngọ 1990 nữ mạng' },
    ],
  },
  'no-boc': {
    slug: 'no-boc',
    name: 'Nô Bộc',
    hanTu: '奴僕宮',
    order: 6,
    represents: 'bạn bè, cộng sự, người hỗ trợ, đội nhóm, khách hàng và cách một người tham gia mạng lưới xã hội ngang hàng',
    coreTheme: 'mạng lưới hỗ trợ, cộng tác và chất lượng những người cùng đi trong việc chung',
    lifeArea: 'bạn bè, đồng nghiệp, cộng đồng, khách hàng, người giúp việc và những quan hệ không phải huyết thống gần',
    keyQuestion: 'Mạng lưới quanh mình đang tạo lực nâng hay làm phân tán trách nhiệm?',
    xungChieu: 'Huynh Đệ',
    adjacent: 'Quan Lộc và Thiên Di',
    strengths: 'giúp hiểu khả năng chọn người, xây đội nhóm, nhận hỗ trợ và đặt ranh giới trong quan hệ xã hội',
    cautions: 'dễ bị đọc thành kết luận về bạn bè tốt xấu nếu không xét cách người xem giao tiếp, chọn môi trường và giữ cam kết',
    starFocus: [
      { slug: 'tu-vi', name: 'Tử Vi', cue: 'gợi năng lực tổ chức đội nhóm và phân vai rõ' },
      { slug: 'thai-duong', name: 'Thái Dương', cue: 'nhấn vào uy tín công khai, niềm tin và trách nhiệm với tập thể' },
      { slug: 'thien-luong', name: 'Thiên Lương', cue: 'làm rõ tiêu chuẩn đạo đức, vai trò cố vấn và sự nâng đỡ đúng mức' },
    ],
    readingFocus: 'đọc Nô Bộc cùng Quan Lộc, Thiên Di, Huynh Đệ và Tài Bạch để xem quan hệ xã hội có phục vụ việc chung và nguồn lực không',
    practicalUse: 'dùng để rà lại ai là cộng sự thật, ai là quan hệ xã giao, việc nào cần hợp đồng rõ và việc nào nên giữ khoảng cách',
    wellbeingCue: 'giữ ranh giới giao tiếp, không để mọi tin nhắn và kỳ vọng từ nhóm làm mất nhịp nghỉ riêng',
    reflectiveQuestions: ['Ai trong mạng lưới giúp mình làm tốt hơn chứ không chỉ bận hơn?', 'Ranh giới cộng tác nào cần nói rõ bằng văn bản?', 'Mình đang chọn bạn theo giá trị hay theo cảm giác quen thuộc?'],
    relatedPalaces: ['quan-loc', 'thien-di', 'huynh-de'],
    forecastLinks: [
      { href: '/tu-vi-2026/nham-than-1992-nam-mang/', label: 'Tử vi Nhâm Thân 1992 nam mạng' },
      { href: '/tu-vi-2026/nham-than-1992-nu-mang/', label: 'Tử vi Nhâm Thân 1992 nữ mạng' },
    ],
  },
  'thien-di': {
    slug: 'thien-di',
    name: 'Thiên Di',
    hanTu: '遷移宮',
    order: 7,
    represents: 'môi trường bên ngoài, đi xa, giao tiếp xã hội rộng, hình ảnh khi ra khỏi không gian quen thuộc và cách hoàn cảnh phản chiếu Mệnh',
    coreTheme: 'bối cảnh bên ngoài, khả năng thích nghi và cách thế giới nhìn lại bản thân',
    lifeArea: 'ra ngoài, di chuyển, cộng đồng lớn, cơ hội từ môi trường mới và hình ảnh xã hội',
    keyQuestion: 'Khi bước ra khỏi vùng quen, mình được mở rộng hay bị môi trường kéo lệch khỏi trục chính?',
    xungChieu: 'Mệnh',
    adjacent: 'Nô Bộc và Tật Ách',
    strengths: 'giúp hiểu cách môi trường, đối tác, nơi chốn và giao tiếp rộng ảnh hưởng trực tiếp đến Mệnh',
    cautions: 'dễ bị nói quá thành phải đi xa mới tốt nếu bỏ qua Mệnh, Phúc Đức, Phu Thê và dữ kiện nghề nghiệp thật',
    starFocus: [
      { slug: 'thai-duong', name: 'Thái Dương', cue: 'gợi hiện diện công khai, vai trò đại diện và sự rõ ràng khi ra ngoài' },
      { slug: 'thien-co', name: 'Thiên Cơ', cue: 'nhấn vào thích nghi, di chuyển, học môi trường mới và xoay chuyển kế hoạch' },
      { slug: 'thien-luong', name: 'Thiên Lương', cue: 'làm rõ quý nhân, chuẩn mực và vai trò cố vấn trong cộng đồng' },
    ],
    readingFocus: 'đọc Thiên Di như cung đối chiếu Mệnh, rồi kiểm tra Phúc Đức, Phu Thê và Nô Bộc để xem đi ra ngoài có thêm chỗ dựa hay thêm áp lực',
    practicalUse: 'dùng để đánh giá môi trường làm việc, cộng đồng, kế hoạch đi xa, cách xuất hiện trước người lạ và tiêu chí chọn nơi phát triển',
    wellbeingCue: 'giữ nhịp nghỉ khi di chuyển, tránh lịch xã hội quá dày và cần có không gian quay về để nạp lại tinh thần',
    reflectiveQuestions: ['Môi trường nào khiến mình trở nên rõ ràng và tử tế hơn?', 'Mình đi ra ngoài vì cơ hội thật hay vì muốn trốn áp lực cũ?', 'Quan hệ xã hội rộng có đang nâng gia đình và tinh thần không?'],
    relatedPalaces: ['menh', 'phuc-duc', 'phu-the'],
    forecastLinks: [
      { href: '/tu-vi-2026/quy-dau-1993-nam-mang/', label: 'Tử vi Quý Dậu 1993 nam mạng' },
      { href: '/tu-vi-2026/quy-dau-1993-nu-mang/', label: 'Tử vi Quý Dậu 1993 nữ mạng' },
    ],
  },
  'tat-ach': {
    slug: 'tat-ach',
    name: 'Tật Ách',
    hanTu: '疾厄宮',
    order: 8,
    represents: 'nhịp thân-tâm, điểm dễ căng, cách hồi phục, thói quen nghỉ ngơi và những tín hiệu cần chăm sóc bằng phương pháp phù hợp',
    coreTheme: 'wellbeing, khả năng phục hồi và cách một người lắng nghe giới hạn của mình',
    lifeArea: 'giấc ngủ, áp lực tinh thần, nhịp sinh hoạt, phục hồi năng lượng và kỷ luật chăm sóc bản thân',
    keyQuestion: 'Cơ thể và tinh thần đang nhắc mình điều gì về nhịp sống hiện tại?',
    xungChieu: 'Phụ Mẫu',
    adjacent: 'Thiên Di và Tài Bạch',
    strengths: 'giúp người học quan sát nhịp sống, cách chịu áp lực và những thói quen cần điều chỉnh để sống bền hơn',
    cautions: 'không dùng cung này để chẩn đoán, gọi tên bệnh lý hay thay thế chuyên gia; chỉ nên đọc như lời nhắc wellbeing và quản trị áp lực',
    starFocus: [
      { slug: 'thien-luong', name: 'Thiên Lương', cue: 'gợi nhu cầu giữ ranh giới, nghỉ ngơi và chăm sóc đúng mức' },
      { slug: 'thai-am', name: 'Thái Âm', cue: 'nhấn vào giấc ngủ, không gian riêng và cảm xúc tích tụ' },
      { slug: 'thien-co', name: 'Thiên Cơ', cue: 'làm rõ thói quen suy nghĩ nhiều, cần quy trình hạ tải tinh thần' },
    ],
    readingFocus: 'đọc Tật Ách cùng Phụ Mẫu, Điền Trạch, Huynh Đệ và Thiên Di để xem áp lực đến từ nền gia đình, không gian sống, quan hệ ngang hàng hay môi trường ngoài',
    practicalUse: 'dùng để lập lịch nghỉ, ghi lại tín hiệu căng, điều chỉnh công việc, giảm nhiễu giao tiếp và tìm hỗ trợ chuyên môn khi cần',
    wellbeingCue: 'ưu tiên giấc ngủ, nhịp ăn nghỉ đều, vận động nhẹ, kiểm tra định kỳ và trao đổi với chuyên gia khi có dấu hiệu bất thường',
    reflectiveQuestions: ['Dấu hiệu nào cho thấy mình cần nghỉ trước khi quá tải?', 'Áp lực nào lặp lại theo lịch sống hoặc không gian sống?', 'Mình có đang dùng công việc hoặc quan hệ để che đi nhu cầu nghỉ ngơi không?'],
    relatedPalaces: ['phu-mau', 'dien-trach', 'huynh-de'],
    forecastLinks: [
      { href: '/tu-vi-2026/tan-mui-1991-nam-mang/', label: 'Tử vi Tân Mùi 1991 nam mạng' },
      { href: '/tu-vi-2026/tan-mui-1991-nu-mang/', label: 'Tử vi Tân Mùi 1991 nữ mạng' },
    ],
  },
  'tai-bach': {
    slug: 'tai-bach',
    name: 'Tài Bạch',
    hanTu: '財帛宮',
    order: 9,
    represents: 'tiền bạc, nguồn lực, cách tạo giá trị, giữ giá trị và ra quyết định liên quan đến vật chất',
    coreTheme: 'quản trị nguồn lực, thói quen tiền bạc và quan hệ giữa giá trị cá nhân với thành quả vật chất',
    lifeArea: 'dòng tiền, tài sản, năng lực tạo giá trị, tiêu chuẩn chi tiêu và cách dự phòng',
    keyQuestion: 'Nguồn lực của mình đang được ghi chép và dùng theo mục tiêu hay theo cảm xúc nhất thời?',
    xungChieu: 'Phúc Đức',
    adjacent: 'Tật Ách và Tử Nữ',
    strengths: 'giúp nhìn thói quen tạo, giữ và dùng nguồn lực; đồng thời nối tiền bạc với Mệnh và nghề thay vì tách rời đạo đức sống',
    cautions: 'không dùng cung này để hứa hẹn kết quả tiền bạc, chỉ nên đọc như bản đồ thói quen nguồn lực và rủi ro cần quản trị',
    starFocus: [
      { slug: 'vu-khuc', name: 'Vũ Khúc', cue: 'gợi kỷ luật, ghi chép, dự phòng và tiêu chuẩn vật chất rõ' },
      { slug: 'thai-am', name: 'Thái Âm', cue: 'nhấn vào tích lũy đều, nguồn lực kín đáo và thói quen bảo toàn' },
      { slug: 'tu-vi', name: 'Tử Vi', cue: 'làm rõ kế hoạch dài hạn, uy tín và quyền quyết định nguồn lực' },
    ],
    readingFocus: 'đọc Tài Bạch cùng Mệnh, Quan Lộc, Phúc Đức và Tật Ách để xem nguồn lực có đi cùng năng lực, nghề nghiệp, giá trị sống và nhịp phục hồi không',
    practicalUse: 'dùng để đặt ngân sách, ghi dòng tiền, phân biệt nhu cầu với ham muốn và tạo quỹ dự phòng theo khả năng thật',
    wellbeingCue: 'giữ ranh giới giữa kiếm tiền và nghỉ ngơi, tránh để áp lực nguồn lực chiếm hết giấc ngủ và quan hệ thân cận',
    reflectiveQuestions: ['Con số nào cần được ghi lại mỗi tuần?', 'Khoản chi nào phản ánh giá trị thật, khoản nào chỉ để xoa dịu áp lực?', 'Công việc nào tạo nguồn lực bền mà không bào mòn tinh thần?'],
    relatedPalaces: ['menh', 'quan-loc', 'phuc-duc'],
    forecastLinks: [
      { href: '/tu-vi-2026/canh-ngo-1990-nam-mang/', label: 'Tử vi Canh Ngọ 1990 nam mạng' },
      { href: '/tu-vi-2026/giap-tuat-1994-nu-mang/', label: 'Tử vi Giáp Tuất 1994 nữ mạng' },
    ],
  },
  'tu-nu': {
    slug: 'tu-nu',
    name: 'Tử Nữ',
    hanTu: '子女宮',
    order: 10,
    represents: 'con cái, thế hệ sau, dự án nuôi dưỡng dài hạn, cách một người chăm sóc điều mình tạo ra và truyền tiếp giá trị',
    coreTheme: 'sự nuôi dưỡng, kế thừa và trách nhiệm với những gì mình sinh thành hoặc xây dựng',
    lifeArea: 'con cái theo nghĩa gia đình, học trò, dự án dài hạn, sản phẩm sáng tạo và khả năng chăm phần hậu quả',
    keyQuestion: 'Điều mình đang tạo ra có được chăm sóc đủ lâu để lớn lên lành mạnh không?',
    xungChieu: 'Điền Trạch',
    adjacent: 'Tài Bạch và Phu Thê',
    strengths: 'giúp mở rộng cách đọc từ con cái sang mọi dự án cần nuôi dưỡng, kiên nhẫn và trách nhiệm thế hệ',
    cautions: 'không dùng cung này để bảo đảm chuyện con cái, hôn nhân hay kết quả gia đình; mọi lời đọc cần giữ tính tham khảo và tôn trọng lựa chọn cá nhân',
    starFocus: [
      { slug: 'thai-am', name: 'Thái Âm', cue: 'gợi chăm sóc kín đáo, nhẫn nại và khả năng nuôi dưỡng đều' },
      { slug: 'thien-luong', name: 'Thiên Lương', cue: 'nhấn vào bảo hộ, chuẩn mực và trách nhiệm đạo đức' },
      { slug: 'thien-co', name: 'Thiên Cơ', cue: 'làm rõ cách học hỏi, điều chỉnh phương pháp và chăm dự án theo giai đoạn' },
    ],
    readingFocus: 'đọc Tử Nữ cùng Điền Trạch, Phu Thê, Huynh Đệ và Nô Bộc để xem điều được nuôi dưỡng có nền nhà, quan hệ và cộng đồng hỗ trợ không',
    practicalUse: 'dùng để xem cách phân bổ thời gian cho con cái, học trò, sản phẩm, dự án và trách nhiệm hậu kỳ sau khi khởi tạo',
    wellbeingCue: 'giữ nhịp chăm sóc bền nhưng không ôm hết việc; cần ngủ, nghỉ và chia vai để sự nuôi dưỡng không thành kiệt sức',
    reflectiveQuestions: ['Dự án nào cần được chăm đều thay vì thúc nhanh?', 'Mình có đang nhầm kiểm soát với chăm sóc không?', 'Ai có thể cùng chia vai trong việc nuôi dưỡng điều quan trọng?'],
    relatedPalaces: ['dien-trach', 'phu-the', 'no-boc'],
    forecastLinks: [
      { href: '/tu-vi-2026/at-hoi-1995-nam-mang/', label: 'Tử vi Ất Hợi 1995 nam mạng' },
      { href: '/tu-vi-2026/at-hoi-1995-nu-mang/', label: 'Tử vi Ất Hợi 1995 nữ mạng' },
    ],
  },
  'phu-the': {
    slug: 'phu-the',
    name: 'Phu Thê',
    hanTu: '夫妻宮',
    order: 11,
    represents: 'quan hệ đôi lứa, hôn phối, đối tác thân cận, cách một người cam kết và thương lượng đời sống chung',
    coreTheme: 'cam kết, thân mật, đối tác và bài học nhìn mình qua người gần nhất',
    lifeArea: 'vợ chồng, người yêu lâu dài, đối tác rất gần, kỳ vọng thân mật và cách chia trách nhiệm trong quan hệ',
    keyQuestion: 'Mình đang tìm sự đồng hành thật hay tìm một người gánh thay phần mình chưa muốn đối diện?',
    xungChieu: 'Quan Lộc',
    adjacent: 'Tử Nữ và Huynh Đệ',
    strengths: 'giúp hiểu cách quan hệ thân cận phản chiếu nghề nghiệp, tinh thần, môi trường xã hội và khả năng thương lượng',
    cautions: 'không dùng cung này để bảo đảm kết hôn, chia tay hay phẩm chất của một người cụ thể khi chưa có đủ dữ liệu lá số và đời sống',
    starFocus: [
      { slug: 'thai-am', name: 'Thái Âm', cue: 'gợi nhu cầu an tâm, lắng nghe và chăm sóc tinh tế' },
      { slug: 'thai-duong', name: 'Thái Dương', cue: 'nhấn vào sự rõ ràng, danh dự và trách nhiệm công khai trong quan hệ' },
      { slug: 'tu-vi', name: 'Tử Vi', cue: 'làm rõ nhu cầu tôn trọng, cấu trúc cam kết và cách phân quyền trong đời sống chung' },
    ],
    readingFocus: 'đọc Phu Thê cùng Quan Lộc, Phúc Đức, Thiên Di và Tử Nữ để xem quan hệ có bị công việc, tinh thần, xã hội hoặc trách nhiệm thế hệ kéo lệch không',
    practicalUse: 'dùng để đặt câu hỏi về kỳ vọng, phân vai, cách nói nhu cầu và tiêu chuẩn giữ tôn trọng trong quan hệ thân cận',
    wellbeingCue: 'giữ không gian đối thoại, nghỉ ngơi sau xung đột và tránh đem áp lực nghề nghiệp hoặc gia đình vào mọi cuộc trò chuyện',
    reflectiveQuestions: ['Kỳ vọng nào cần nói rõ thay vì mong người kia tự hiểu?', 'Công việc đang ảnh hưởng quan hệ thân cận ra sao?', 'Mình có đang chăm sóc bằng kiểm soát hay bằng lắng nghe?'],
    relatedPalaces: ['quan-loc', 'phuc-duc', 'thien-di'],
    forecastLinks: [
      { href: '/tu-vi-2026/giap-tuat-1994-nam-mang/', label: 'Tử vi Giáp Tuất 1994 nam mạng' },
      { href: '/tu-vi-2026/dinh-mao-1987-nu-mang/', label: 'Tử vi Đinh Mão 1987 nữ mạng' },
    ],
  },
  'huynh-de': {
    slug: 'huynh-de',
    name: 'Huynh Đệ',
    hanTu: '兄弟宮',
    order: 12,
    represents: 'anh chị em, quan hệ ngang hàng trong gia đình, bạn đồng lứa thân cận và cách một người chia sẻ nguồn lực với người cùng thế hệ',
    coreTheme: 'quan hệ ngang hàng, sự so sánh, hỗ trợ và bài học chia vai trong cùng một nền gia đình',
    lifeArea: 'anh chị em, họ hàng ngang hàng, bạn thân như người nhà và cách xử lý cạnh tranh hoặc hỗ trợ',
    keyQuestion: 'Quan hệ ngang hàng đang giúp mình lớn lên hay khiến mình mắc kẹt trong so sánh cũ?',
    xungChieu: 'Nô Bộc',
    adjacent: 'Phu Thê và Mệnh',
    strengths: 'giúp hiểu ảnh hưởng của anh chị em, bạn thân và nhóm đồng lứa lên tự tin, không gian sống và nhịp áp lực',
    cautions: 'dễ bị đọc thành đánh giá người thân nếu không tách trải nghiệm cá nhân khỏi bối cảnh gia đình và vai trò của chính người xem',
    starFocus: [
      { slug: 'thien-luong', name: 'Thiên Lương', cue: 'gợi sự che chở, nguyên tắc và lời khuyên giữa người ngang hàng' },
      { slug: 'thai-duong', name: 'Thái Dương', cue: 'nhấn vào cạnh tranh lành mạnh, danh dự và sự rõ ràng trong chia vai' },
      { slug: 'thien-co', name: 'Thiên Cơ', cue: 'làm rõ giao tiếp, điều chỉnh kỳ vọng và học qua đối thoại' },
    ],
    readingFocus: 'đọc Huynh Đệ cùng Nô Bộc, Điền Trạch, Tật Ách và Mệnh để xem quan hệ ngang hàng ảnh hưởng đến nhà cửa, nhịp sống và bản thân thế nào',
    practicalUse: 'dùng để nhận diện so sánh cũ, phân định trách nhiệm gia đình, nói rõ hỗ trợ vật chất hoặc tinh thần và chọn nhóm đồng lứa lành mạnh',
    wellbeingCue: 'giữ khoảng cách lành mạnh với so sánh, không để chuyện anh chị em hoặc nhóm ngang hàng chiếm toàn bộ tinh thần nghỉ ngơi',
    reflectiveQuestions: ['Mình đang so sánh với ai và điều đó có còn hữu ích không?', 'Việc gia đình nào cần chia vai rõ hơn?', 'Nhóm ngang hàng nào giúp mình trưởng thành mà không mất bản sắc?'],
    relatedPalaces: ['no-boc', 'dien-trach', 'menh'],
    forecastLinks: [
      { href: '/tu-vi-2026/binh-dan-1986-nam-mang/', label: 'Tử vi Bính Dần 1986 nam mạng' },
      { href: '/tu-vi-2026/tan-mui-1991-nu-mang/', label: 'Tử vi Tân Mùi 1991 nữ mạng' },
    ],
  },
}

export function isPalaceSlug(slug: string): slug is PalaceSlug {
  return (PALACE_SLUGS as readonly string[]).includes(slug)
}

export function getPalaceProfile(slug: string): PalaceProfile | null {
  if (!isPalaceSlug(slug)) return null
  return PALACE_PROFILES[slug]
}

// Tam hợp must be generated, not hand-entered: current palace +4 and +8
// positions in the traditional 12-cung order. This prevents manual family-cung
// swaps such as Tử Nữ ↔ Huynh Đệ or Phụ Mẫu ↔ Tài Bạch.
export function getPalaceTamHop(slug: PalaceSlug): string {
  const index = PALACE_SLUGS.indexOf(slug)
  const tamHopSlugs = [
    slug,
    PALACE_SLUGS[(index + 4) % PALACE_SLUGS.length],
    PALACE_SLUGS[(index + 8) % PALACE_SLUGS.length],
  ]

  return tamHopSlugs.map((tamHopSlug) => PALACE_PROFILES[tamHopSlug].name).join(' - ')
}

function palaceLink(slug: PalaceSlug): PalaceInternalLink {
  const profile = PALACE_PROFILES[slug]
  return {
    href: `/cung/${profile.slug}/`,
    label: `Cung ${profile.name}`,
    relation: 'Cung liên quan trong 12 cung',
  }
}

function starLink(star: { slug: string; name: string }): PalaceInternalLink {
  return {
    href: `/sao/${star.slug}/`,
    label: `Sao ${star.name}`,
    relation: 'Sao nền nên đọc cùng cung',
  }
}

function palaceLinks(profile: PalaceProfile): PalaceInternalLink[] {
  const starLinks = profile.starFocus
    .filter((star) => Object.prototype.hasOwnProperty.call(STAR_LIBRARY, star.slug))
    .map(starLink)

  return [
    { href: '/tu-vi/', label: 'Hub Tử Vi 2026', relation: 'Hub Tử Vi' },
    { href: '/lap-la-so/', label: 'Tìm hiểu cách lập lá số Tử Vi', relation: 'Cá nhân hóa theo ngày giờ sinh' },
    ...starLinks,
    ...profile.relatedPalaces.map(palaceLink),
    ...profile.forecastLinks.map((link) => ({
      href: link.href,
      label: link.label,
      relation: 'Bài tuổi tham khảo',
    })),
  ]
}

function buildPalacePage(profile: PalaceProfile): PalaceFoundationPage {
  const name = profile.name
  const starNames = profile.starFocus.map((star) => star.name).join(', ')
  const tamHop = getPalaceTamHop(profile.slug)
  const menhConnectionCopy =
    name === 'Mệnh'
      ? 'Trong bộ 12 cung, cung Mệnh là trục gốc của toàn lá số. Nó cho biết nền khí chất, cách người xem tự đặt mình vào đời sống và điểm xuất phát để nối sang Thân Cung, Thiên Di, Tài Bạch, Quan Lộc cùng các mảng còn lại. Nếu bỏ Thân và bối cảnh thật, bài đọc dễ thành khái quát thiếu trách nhiệm.'
      : `Trong bộ 12 cung, cung ${name} có vai trò riêng nhưng luôn liên hệ với Mệnh Cung. Mệnh là trục gốc; cung ${name} cho biết một mảng đời sống cụ thể đang phản chiếu hoặc hỗ trợ trục gốc ấy thế nào. Nếu bỏ Mệnh, Thân và bối cảnh thật, bài đọc dễ thành khái quát thiếu trách nhiệm.`

  const intro = [
    `Cung ${name} (${profile.hanTu}) là cung thứ ${profile.order} trong vòng 12 cung Tử Vi theo thứ tự Mệnh, Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Nữ, Phu Thê, Huynh Đệ. Trang này giải thích cung ${name} theo hướng thực tế: ${profile.represents}.`,
    `Bài viết dùng cho SEO tĩnh và người mới học Tử Vi, nên không giả lập lá số cá nhân khi chưa có ngày sinh, giờ sinh, giới tính và dữ liệu an sao đầy đủ. Bạn có thể dùng trang này như bản nền để hiểu cách đọc cung, sao chiếu và tam phương tứ chính trước khi đi vào lá số riêng.`,
    PALACE_METHOD_NOTE,
  ]

  const summaryRows: PalaceSummaryRow[] = [
    {
      aspect: 'Đại diện chính',
      meaning: profile.coreTheme,
      readingCue: `Đọc như trường nghĩa về ${profile.lifeArea}, không tách khỏi Mệnh Cung và Thân Cung.`,
    },
    {
      aspect: 'Trục xung chiếu',
      meaning: `Cung ${name} xung chiếu với cung ${profile.xungChieu}.`,
      readingCue: 'Luôn kiểm tra cung đối diện để tránh nhìn một chiều.',
    },
    {
      aspect: 'Tam hợp cần xem',
      meaning: tamHop,
      readingCue: 'Ba cung trong tam hợp cho biết chủ đề này được nguồn lực nào nâng hoặc kéo.',
    },
    {
      aspect: 'Sao nên đọc cùng',
      meaning: starNames,
      readingCue: 'Chỉ xem là ví dụ về cách đọc chính tinh; mỗi lá số có bộ sao riêng.',
    },
    {
      aspect: 'Lưu ý cân bằng',
      meaning: profile.cautions,
      readingCue: 'Cần phối hợp Tứ Hóa, phụ tinh, vòng vận và dữ kiện đời sống thật trước khi đưa lời khuyên.',
    },
  ]

  const sections: PalaceSection[] = [
    {
      heading: `Tổng quan cung ${name}`,
      content: [
        `Cung ${name} là một cửa nhìn vào ${profile.lifeArea}. Trong thực hành Tử Vi, cung này không được đọc như một ô riêng lẻ trên bản đồ, mà là một điểm nằm trong mạng lưới 12 cung. Nó nhận ảnh hưởng từ sao tọa thủ, sao hội chiếu, cung xung chiếu, tam hợp và cả câu hỏi thực tế của người xem.`,
        `Ý nghĩa cốt lõi của cung ${name} là ${profile.coreTheme}. Khi cung này nổi bật, người học nên hỏi: chủ đề nào đang được nhấn mạnh, người xem đang dùng điểm mạnh ra sao, và phần nào cần điều chỉnh để đời sống bền hơn. Cách đọc này hữu ích hơn việc vội gọi một cung là tốt hay xấu.`,
        menhConnectionCopy,
        `Bói Toán dùng cung ${name} như một khung tham khảo văn hóa. Trang này giúp người đọc gọi tên vấn đề, đặt câu hỏi và học ngôn ngữ Tử Vi. Nó không nhằm đưa ra kết luận cố định về một người, một gia đình hay một kết quả trong tương lai.`,
      ],
    },
    {
      heading: `Cung ${name} đại diện điều gì trong đời sống?`,
      content: [
        `Cung ${name} đại diện cho ${profile.represents}. Đây là phần bản đồ giúp người học đi từ biểu tượng sang quan sát cụ thể. Thay vì hỏi “cung này có tốt không”, hãy hỏi “chủ đề này đang vận hành như thế nào trong đời sống của mình”.`,
        `Câu hỏi trung tâm của cung ${name} là: ${profile.keyQuestion} Câu hỏi này giữ bài đọc ở mức tự nhận thức và hành động thực tế. Nó cũng giúp tránh kiểu đọc gây lo lắng, vì người xem vẫn có quyền lựa chọn cách phản hồi và cải thiện thói quen.`,
        `Điểm mạnh của cung ${name} là ${profile.strengths}. Khi các sao, tam hợp và bối cảnh cùng hỗ trợ, chủ đề này có thể trở thành một nguồn lực rõ ràng. Khi cấu trúc bị căng, nó thường nhắc người xem cần thêm ranh giới, dữ liệu hoặc phương pháp làm việc chậm hơn.`,
        `Hai cung kề bên cung ${name} là ${profile.adjacent}. Các cung kề bên không quyết định toàn bộ ý nghĩa, nhưng cho thấy bối cảnh gần: điều gì đứng trước, điều gì đứng sau, và chủ đề nào thường chen vào khi người xem xử lý cung ${name}.`,
      ],
    },
    {
      heading: `Sao chiếu và chính tinh thường đọc ở cung ${name}`,
      content: [
        `Mỗi chính tinh đều có thể mang sắc thái khác nhau khi nằm ở cung ${name}. Trong phạm vi thư viện đã được biên tập, ba sao nên đọc cùng trang này là ${starNames}. Đây không phải danh sách đóng; nó chỉ là điểm bắt đầu để người mới học hiểu cách sao đổi nghĩa theo cung.`,
        ...profile.starFocus.map(
          (star) => `Khi sao ${star.name} được xét trong cung ${name}, nên đọc theo hướng ${star.cue}. Không nên kết luận chỉ vì thấy tên sao; cần kiểm tra độ sáng, đồng cung, hội chiếu, Tứ Hóa và câu hỏi thực tế.`
        ),
        `Một lỗi phổ biến là lấy ý nghĩa sao ở cung Mệnh rồi áp nguyên xi cho mọi cung. Cùng là ${profile.starFocus[0].name}, khi nằm ở Mệnh có thể nói về khí chất gốc, nhưng khi liên quan cung ${name} thì phải chuyển sang ngữ cảnh ${profile.lifeArea}.`,
        `Vì vậy, “sao chiếu” trong trang này nên hiểu là ngôn ngữ để đặt câu hỏi. Sao cho biết cách chủ đề biểu hiện; cung cho biết chủ đề nằm ở mảng đời sống nào; tam phương tứ chính cho biết mảng đó được hỗ trợ hay bị kéo bởi những mảng khác.`,
      ],
    },
    {
      heading: `Cách đọc tam phương tứ chính của cung ${name}`,
      content: [
        `Với cung ${name}, trục xung chiếu cần xem là cung ${profile.xungChieu}. Cung đối diện thường phản chiếu phần người xem dễ bỏ qua. Nếu chỉ nhìn cung ${name}, bài đọc có thể đúng một nửa nhưng thiếu nguyên nhân hoặc thiếu điểm cân bằng.`,
        `Tam hợp quan trọng của cung này là ${tamHop}. Khi ba cung trong tam hợp cùng sáng về ý nghĩa tham khảo, chủ đề ${profile.lifeArea} có thêm bối cảnh để triển khai. Khi một cung trong tam hợp căng, lời khuyên nên chuyển sang kiểm chứng, chia nhỏ quyết định và giảm kỳ vọng tuyệt đối.`,
        `Tứ chính cũng bao gồm các điểm hội chiếu làm cung ${name} không đứng yên. Một cung có vẻ thuận nhưng bị môi trường, quan hệ hoặc nguồn lực kéo lệch thì vẫn cần cách đọc mềm. Ngược lại, một cung có nhiều tín hiệu căng vẫn có thể thành bài học tốt nếu người xem biết điều chỉnh hành vi.`,
        `Cách đọc an toàn là đi theo ba bước: xác định chủ đề cung, xem cung đối diện, rồi nối tam hợp với Mệnh và Thân. Nếu thiếu ngày giờ sinh, không nên nói về sao tại cung cụ thể của một người; chỉ nên dùng kiến thức này như nền tảng học thuật và tự quan sát.`,
      ],
    },
    {
      heading: `Các tổ hợp cần cân bằng khi luận cung ${name}`,
      content: [
        `Cung ${name} có thể được nâng bởi cát tinh, văn tinh, sao chủ về trật tự hoặc sao chủ về chăm sóc. Khi gặp nhóm nâng đỡ, bài đọc nên nhấn vào cách phát huy điểm mạnh: làm rõ quy trình, chọn môi trường đúng, giao tiếp có ranh giới và biến ưu thế thành hành động bền.`,
        `Nếu cung ${name} gặp nhiều sao tạo áp lực, không nên dùng từ ngữ hù dọa. Cách viết phù hợp là mô tả xu hướng cần quản trị: dễ phản ứng nhanh, dễ ôm trách nhiệm, dễ thiếu nghỉ ngơi, dễ lẫn cảm xúc với quyết định hoặc dễ để môi trường kéo đi.`,
        `Với chủ đề ${profile.lifeArea}, điểm cần cân bằng là ${profile.cautions}. Đây là lý do mỗi bài cung phải có câu disclaimer rõ: Tử Vi giúp đặt câu hỏi và nhìn mẫu hình, nhưng không thay thế dữ liệu đời sống, tư vấn chuyên môn hoặc trách nhiệm lựa chọn của người xem.`,
        `Khi tự học, hãy ghi lại ba nhóm tín hiệu: sao nào xuất hiện, cung nào hội chiếu, và ngoài đời chủ đề này đang diễn ra ra sao. Nếu ba nhóm dữ liệu không khớp, hãy ưu tiên quan sát thêm thay vì cố ép lá số vào một kết luận có sẵn.`,
      ],
    },
    {
      heading: `Ứng dụng thực tế khi tự đọc cung ${name}`,
      content: [
        profile.practicalUse,
        `Ba câu hỏi tự kiểm chứng cho cung ${name}: ${profile.reflectiveQuestions.join(' ')} Những câu hỏi này biến nội dung Tử Vi thành bài tập quan sát, giúp người đọc bớt phụ thuộc vào lời phán và có thêm tiêu chí hành động.`,
        `Nếu bạn đang đọc cho người khác, hãy dùng ngôn ngữ “gợi ý”, “nghiêng về”, “nên kiểm tra thêm”. Không nên nói thay người nghe rằng họ phải làm gì. Một bài đọc tốt tạo không gian suy nghĩ; một bài đọc quá chắc dễ làm người nghe sợ hoặc bỏ qua dữ liệu thật.`,
        `Nếu bạn đang đọc cho chính mình, hãy đối chiếu cung ${name} với nhật ký, lịch làm việc, quan hệ và quyết định đã xảy ra. Tử Vi có giá trị nhất khi giúp bạn nhận ra mẫu hình lặp lại và chọn phản hồi tỉnh táo hơn trong lần tiếp theo.`,
      ],
    },
    {
      heading: `Wellbeing và ranh giới khi đọc cung ${name}`,
      content: [
        `Ở góc độ đời sống, cung ${name} cũng nhắc đến nhịp vận hành thân-tâm. Với trang này, framing phù hợp là wellbeing: ${profile.wellbeingCue}. Không suy luận bệnh lý, không tự chẩn đoán và không dùng sao cung để thay thế chuyên gia.`,
        `Khi một chủ đề trong lá số tạo áp lực, phản ứng tốt nhất thường không phải là lo lắng thêm mà là giảm nhiễu. Người xem có thể ngủ đủ hơn, ghi chép rõ hơn, nói ranh giới sớm hơn, hỏi người có chuyên môn khi cần, và tránh quyết định quan trọng trong lúc tinh thần quá tải.`,
        `Cung ${name} vì thế không chỉ là một khái niệm cổ. Nó là lời nhắc rằng mỗi mảng đời sống đều cần cách chăm riêng. Có mảng cần kỷ luật, có mảng cần nghỉ, có mảng cần đối thoại, và có mảng cần thừa nhận rằng mình chưa đủ dữ liệu để kết luận.`,
      ],
    },
    {
      heading: `Giới hạn của bài viết về cung ${name}`,
      content: [
        `Trang này là bài nền về cung ${name}, không phải lá số cá nhân. Để đọc riêng cho một người cần ngày sinh, giờ sinh, giới tính, lịch âm/dương chính xác, Cục, Mệnh Cung, Thân Cung, vị trí sao trong đủ 12 cung và bối cảnh câu hỏi cụ thể.`,
        `Nội dung không thay thế chuyên gia trong các vấn đề y tế, pháp lý, tài chính hoặc quyết định quan trọng. Nếu chủ đề ${profile.lifeArea} đang liên quan đến một việc lớn, người xem nên dùng Tử Vi như khung suy ngẫm rồi kiểm chứng bằng dữ liệu và lời khuyên phù hợp.`,
        `Điểm đáng giữ của cung ${name} là khả năng mở ra một ngôn ngữ văn hóa có cấu trúc. Khi đọc đúng tinh thần tham khảo, nó giúp người học hiểu quan hệ giữa cung, sao và đời sống mà không cần biến Tử Vi thành lời khẳng định tuyệt đối.`,
      ],
    },
  ]

  const faqs = [
    {
      question: `Cung ${name} trong Tử Vi có ý nghĩa gì?`,
      answer: `Cung ${name} gợi về ${profile.represents}. Ý nghĩa cụ thể còn phụ thuộc Mệnh Cung, Thân Cung, sao tọa thủ, sao hội chiếu, Tứ Hóa, tam phương tứ chính và bối cảnh người xem.`,
    },
    {
      question: `Có thể kết luận chỉ từ cung ${name} không?`,
      answer: `Không. Một cung riêng lẻ không đủ để kết luận. Cần đọc toàn cục lá số và dùng nội dung như tham khảo, không phải lời tiên đoán.`,
    },
    {
      question: `Cung ${name} xung chiếu với cung nào?`,
      answer: `Trong khung tham khảo của trang này, cung ${name} xung chiếu với cung ${profile.xungChieu}. Cung đối diện giúp kiểm tra phần phản chiếu và điểm cân bằng của chủ đề.`,
    },
    {
      question: `Những sao nào nên đọc cùng cung ${name}?`,
      answer: `Người mới có thể bắt đầu với ${starNames}. Tuy nhiên mỗi lá số có bộ sao riêng, nên danh sách này chỉ là gợi ý học nền, không phải kết luận cá nhân.`,
    },
    {
      question: `Muốn đọc cung ${name} chính xác hơn cần gì?`,
      answer: `Cần lập lá số theo ngày giờ sinh để biết Mệnh Cung, Thân Cung, Cục, vị trí sao trong 12 cung và các sao hội chiếu. Bài viết này chỉ là nền tảng khái niệm.`,
    },
  ]

  return {
    name,
    slug: profile.slug,
    order: profile.order,
    h1: `Cung ${name} Trong Tử Vi — Ý Nghĩa, Sao Chiếu Và Cách Đọc`,
    title: `Cung ${name} trong Tử Vi: ý nghĩa, sao chiếu và cách đọc`,
    description: `Tìm hiểu Cung ${name} trong Tử Vi: ý nghĩa, sao chiếu, tam phương tứ chính và cách đọc tham khảo theo Tam Hợp Phái.`,
    urlPath: `/cung/${profile.slug}/`,
    methodNote: PALACE_METHOD_NOTE,
    intro,
    summaryRows,
    sections,
    faqs,
    internalLinks: palaceLinks(profile),
    disclaimer: PALACE_DISCLAIMER,
  }
}

export function getPalaceFoundationPage(slug: string): PalaceFoundationPage | null {
  const profile = getPalaceProfile(slug)
  if (!profile) return null
  return buildPalacePage(profile)
}

export const PALACE_FOUNDATION_PAGES = PALACE_SLUGS.map((slug) =>
  getPalaceFoundationPage(slug)
).filter((page): page is PalaceFoundationPage => Boolean(page))
