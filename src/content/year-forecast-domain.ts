export type YearForecastGender = 'nam' | 'nu'

export type RequirementId =
  | 'REQ-1'
  | 'REQ-2'
  | 'REQ-3'
  | 'REQ-4'
  | 'REQ-5'
  | 'REQ-6'
  | 'REQ-7'
  | 'REQ-8'
  | 'REQ-9'
  | 'REQ-10'

export interface YearForecastSeedInput {
  slug: string
  animal: string
  year: number
  gender: YearForecastGender
  genderLabel: string
  canChi: string
  element: string
}

export interface RelationEvidence {
  label: string
  detail: string
  recommendationLens: string
}

export interface CungMenhEvidence {
  name: string
  element: string
  validationStatus: 'boi_toan_spec' | 'draft_requires_boi_toan_validation'
  sourceNote: string
}

export interface LifeStageEvidence {
  age: number
  bucket: '19-25' | '26-35' | '36-45' | '46+'
  focus: string
  adviceLens: string
}

export interface NapAmEvidence {
  name: string
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ'
  careerLens: string
  moneyLens: string
}

export interface AnimalTraitEvidence {
  animal: string
  traits: string[]
  sentences: string[]
}

export interface YearForecastDomainEvidence {
  sourceVersion: string
  targetYear: 2026
  targetYearCanChi: 'Bính Ngọ'
  slug: string
  year: number
  gender: YearForecastGender
  genderLabel: string
  canChi: string
  thienCan: string
  diaChi: string
  napAm: NapAmEvidence
  cungMenh: CungMenhEvidence
  lifeStage: LifeStageEvidence
  thienCanRelationToBinh: RelationEvidence
  diaChiRelationToNgo: RelationEvidence
  animalTraits: AnimalTraitEvidence
  methodCitation: string
  requirementEvidence: Record<RequirementId, string>
}

export interface YearForecastRegenerationInput {
  slug: string
  year: number
  gender: YearForecastGender
  genderLabel: string
  targetYear: 2026
  targetYearCanChi: 'Bính Ngọ'
  canChi: string
  thienCan: string
  diaChi: string
  napAm: NapAmEvidence
  cungMenh: CungMenhEvidence
  lifeStage: LifeStageEvidence
  thienCanRelationToBinh: RelationEvidence
  diaChiRelationToNgo: RelationEvidence
  animalTraits: AnimalTraitEvidence
  methodCitation: string
  generationInstruction: string
}

export interface YearForecastPublicationGate {
  status: 'blocked_pending_regeneration' | 'blocked_pending_review' | 'open'
  reason: string
  blockers: string[]
  evidenceReady: RequirementId[]
}

interface CungMenhSeed {
  name: string
  validationStatus: CungMenhEvidence['validationStatus']
  sourceNote: string
}

export const YEAR_FORECAST_DOMAIN_SOURCE_VERSION = 'phase1-20260509-cung-phi-hotfix-202605091005'
export const YEAR_FORECAST_TARGET_YEAR = 2026 as const
export const YEAR_FORECAST_TARGET_CAN_CHI = 'Bính Ngọ' as const

export const REQUIREMENT_IDS: RequirementId[] = [
  'REQ-1',
  'REQ-2',
  'REQ-3',
  'REQ-4',
  'REQ-5',
  'REQ-6',
  'REQ-7',
  'REQ-8',
  'REQ-9',
  'REQ-10',
]

export const CUNG_MENH_ELEMENT: Record<string, string> = {
  Càn: 'Kim',
  Đoài: 'Kim',
  Ly: 'Hỏa',
  Chấn: 'Mộc',
  Tốn: 'Mộc',
  Khảm: 'Thủy',
  Cấn: 'Thổ',
  Khôn: 'Thổ',
}

const CANONICAL_CUNG_PHI_SOURCE = 'Canonical Bát Trạch Cung Phi formula; Bói-Toán validation /tmp/boitoan_female_cung_menh_validation_202605091005.txt'
const CUNG_PHI_2000_2001_SOURCE =
  '21st-century formula (majority convention); Bói-Toán validation /tmp/boitoan_female_cung_menh_validation_202605091005.txt'

export const CUNG_MENH_BY_YEAR_GENDER: Record<number, Record<YearForecastGender, CungMenhSeed>> = {
  1984: {
    nam: { name: 'Đoài', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (simphongthuy.vn, dogovinhvuong.com)` },
    nu: { name: 'Cấn', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (simphongthuy.vn, xaydungso.vn)` },
  },
  1985: {
    nam: { name: 'Càn', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (thegioiphongthuy.com, careerlink.vn)` },
    nu: { name: 'Ly', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (thegioiphongthuy.com, phongthuyso.vn)` },
  },
  1986: {
    nam: { name: 'Khôn', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (phongthuybta.com, thienmenh.net)` },
    nu: { name: 'Khảm', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (phongthuybta.com, tuvisomenh.com.vn)` },
  },
  1987: {
    nam: { name: 'Tốn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Khôn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1988: {
    nam: { name: 'Chấn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Chấn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1989: {
    nam: { name: 'Khôn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Tốn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1990: {
    nam: { name: 'Khảm', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (dogovinhvuong.com, memart.vn, phongthuybta.com)` },
    nu: { name: 'Cấn', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (dogovinhvuong.com, memart.vn)` },
  },
  1991: {
    nam: { name: 'Ly', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Càn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1992: {
    nam: { name: 'Cấn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Đoài', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1993: {
    nam: { name: 'Đoài', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Cấn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1994: {
    nam: { name: 'Càn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Ly', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1995: {
    nam: { name: 'Khôn', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (interstellas.com.vn, thegioiphongthuy.com, tuoiam.com)` },
    nu: { name: 'Khảm', validationStatus: 'boi_toan_spec', sourceNote: `${CANONICAL_CUNG_PHI_SOURCE}; web-verified (kinhdoanh.ahamove.com, thegioiphongthuy.com)` },
  },
  1996: {
    nam: { name: 'Tốn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Khôn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1997: {
    nam: { name: 'Chấn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Chấn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1998: {
    nam: { name: 'Khôn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Tốn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  1999: {
    nam: { name: 'Khảm', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
    nu: { name: 'Cấn', validationStatus: 'boi_toan_spec', sourceNote: CANONICAL_CUNG_PHI_SOURCE },
  },
  2000: {
    nam: { name: 'Ly', validationStatus: 'boi_toan_spec', sourceNote: `${CUNG_PHI_2000_2001_SOURCE}; minority convention would use Khảm` },
    nu: { name: 'Càn', validationStatus: 'boi_toan_spec', sourceNote: `${CUNG_PHI_2000_2001_SOURCE}; minority convention would use Cấn` },
  },
  2001: {
    nam: { name: 'Cấn', validationStatus: 'boi_toan_spec', sourceNote: `${CUNG_PHI_2000_2001_SOURCE}; minority convention would use Ly` },
    nu: { name: 'Đoài', validationStatus: 'boi_toan_spec', sourceNote: `${CUNG_PHI_2000_2001_SOURCE}; minority convention would use Càn` },
  },
}

export const THIEN_CAN_RELATION_TO_BINH: Record<string, RelationEvidence> = {
  Giáp: {
    label: 'Tương sinh',
    detail: 'Giáp thuộc Mộc, gặp Bính thuộc Hỏa tạo thế Mộc sinh Hỏa.',
    recommendationLens: 'Dùng tri thức, kế hoạch và nền đã tích lũy để nuôi một hướng hành động rõ ràng.',
  },
  Ất: {
    label: 'Tương sinh',
    detail: 'Ất thuộc Mộc, gặp Bính thuộc Hỏa tạo thế Mộc sinh Hỏa.',
    recommendationLens: 'Tăng trưởng tốt khi biết chọn việc trọng tâm và không phân tán sức vào quá nhiều lời mời.',
  },
  Bính: {
    label: 'Tỷ kiên',
    detail: 'Bính gặp Bính là Hỏa khí đồng hành, dễ tăng khí thế lẫn cạnh tranh nội tâm.',
    recommendationLens: 'Cần dùng bản lĩnh để xây hệ thống, tránh phản ứng nóng hoặc tranh thắng trong việc nhỏ.',
  },
  Đinh: {
    label: 'Tỷ kiên',
    detail: 'Đinh thuộc Hỏa, gặp Bính thuộc Hỏa làm chủ đề Hỏa khí nổi bật.',
    recommendationLens: 'Giữ nhịp sáng tạo nhưng cần kỷ luật, nghỉ ngơi và tiêu chí quyết định rõ.',
  },
  Mậu: {
    label: 'Tương sinh',
    detail: 'Bính thuộc Hỏa sinh Mậu thuộc Thổ, thuận cho việc xây nền và ổn định hóa kết quả.',
    recommendationLens: 'Ưu tiên quy trình, tài sản bền và trách nhiệm được ghi nhận bằng kết quả cụ thể.',
  },
  Kỷ: {
    label: 'Tương sinh',
    detail: 'Bính thuộc Hỏa sinh Kỷ thuộc Thổ, hỗ trợ việc củng cố nền tảng.',
    recommendationLens: 'Hợp với cách đi đều, giảm thử nghiệm tùy hứng và biến kinh nghiệm thành hệ thống.',
  },
  Canh: {
    label: 'Tương khắc',
    detail: 'Bính thuộc Hỏa khắc Canh thuộc Kim, tạo áp lực phải tôi luyện và chọn việc thật cần.',
    recommendationLens: 'Không nên lấy đối đầu làm động lực chính; hãy dùng dữ liệu và hợp đồng rõ để giảm va chạm.',
  },
  Tân: {
    label: 'Tương khắc',
    detail: 'Bính thuộc Hỏa khắc Tân thuộc Kim, dễ có cảm giác bị thúc ép phải đổi cách làm.',
    recommendationLens: 'Giữ chuẩn mực, chậm một nhịp trước quyết định tài chính và tránh phản ứng vì tự ái.',
  },
  Nhâm: {
    label: 'Tương khắc',
    detail: 'Nhâm thuộc Thủy khắc Bính thuộc Hỏa, nhấn mạnh nhu cầu điều tiết cảm xúc và tốc độ.',
    recommendationLens: 'Đi chậm để kiểm tra dữ kiện, tránh dùng cảm hứng nhất thời thay cho kế hoạch.',
  },
  Quý: {
    label: 'Tương khắc',
    detail: 'Quý thuộc Thủy khắc Bính thuộc Hỏa, dễ tạo thế kéo co giữa trực giác và áp lực hành động.',
    recommendationLens: 'Cần ranh giới rõ, lịch nghỉ đều và quyết định lớn nên có người kiểm tra chéo.',
  },
}

export const DIA_CHI_RELATION_TO_NGO: Record<string, RelationEvidence> = {
  Tý: {
    label: 'Tương xung',
    detail: 'Tý gặp Ngọ là trục xung, dễ kích hoạt thay đổi nhịp sống hoặc hướng ưu tiên.',
    recommendationLens: 'Không nên quyết nóng; hãy chia việc lớn thành nhịp thử nhỏ để giảm va đập.',
  },
  Sửu: {
    label: 'Tương hại',
    detail: 'Sửu gặp Ngọ thuộc nhóm hại, cần tránh để chuyện nhỏ thành bực dọc kéo dài.',
    recommendationLens: 'Giao tiếp rõ trách nhiệm, ghi lại cam kết và tránh gánh thay phần của người khác.',
  },
  Dần: {
    label: 'Tam hợp',
    detail: 'Dần nằm trong tam hợp Dần-Ngọ-Tuất, thuận cho khí thế tiến lên.',
    recommendationLens: 'Có thể mở việc mới nhưng vẫn cần tiêu chí đo kết quả để không quá đà.',
  },
  Mão: {
    label: 'Tương phá',
    detail: 'Mão gặp Ngọ có thế phá, dễ làm lộ điểm lệch trong quan hệ hoặc kế hoạch.',
    recommendationLens: 'Sửa từ việc nhỏ, nói rõ ranh giới và tránh né tránh xung đột cần thiết.',
  },
  Thìn: {
    label: 'Trung tính',
    detail: 'Thìn gặp Ngọ không thuộc nhóm hợp-xung chính, nên trọng tâm là cách quản trị tình huống.',
    recommendationLens: 'Kết quả phụ thuộc vào kỷ luật thực thi, mạng lưới hỗ trợ và tốc độ phản hồi.',
  },
  Tỵ: {
    label: 'Tương xung',
    detail: 'Tỵ gặp Ngọ làm Hỏa khí tăng mạnh, dễ tạo áp lực tốc độ và cảm xúc.',
    recommendationLens: 'Cần nghỉ đúng lúc, kiểm tra rủi ro và tránh mở rộng chỉ vì đang có khí thế.',
  },
  Ngọ: {
    label: 'Tự hình',
    detail: 'Ngọ gặp Ngọ là tự hình, dễ tự tạo áp lực hoặc tự đẩy mình vào thế phải chứng minh.',
    recommendationLens: 'Đặt giới hạn cho tham vọng và dùng lịch nghỉ như một phần của kế hoạch.',
  },
  Mùi: {
    label: 'Tương hợp',
    detail: 'Mùi gặp Ngọ có thế lục hợp, thuận cho hỗ trợ, hợp tác và ổn định quan hệ.',
    recommendationLens: 'Biết chọn người đồng hành sẽ giúp việc khó trở nên nhẹ và bền hơn.',
  },
  Thân: {
    label: 'Trung tính',
    detail: 'Thân gặp Ngọ không thuộc nhóm hợp-xung chính, nên cần đọc theo bối cảnh hành động.',
    recommendationLens: 'Linh hoạt là lợi thế, nhưng cần tiêu chí chọn việc để không tản lực.',
  },
  Dậu: {
    label: 'Tương phá',
    detail: 'Dậu gặp Ngọ có thế phá, dễ xuất hiện vấn đề từ chi tiết nhỏ hoặc kỳ vọng chưa nói rõ.',
    recommendationLens: 'Rà hợp đồng, lịch hẹn và quy chuẩn trước khi nhận thêm trách nhiệm.',
  },
  Tuất: {
    label: 'Tam hợp',
    detail: 'Tuất nằm trong tam hợp Dần-Ngọ-Tuất, thuận cho tinh thần xây dựng và bảo vệ mục tiêu.',
    recommendationLens: 'Nên dùng sự đáng tin để mở cơ hội, nhưng tránh ôm hết trách nhiệm của nhóm.',
  },
  Hợi: {
    label: 'Tương hại',
    detail: 'Hợi gặp Ngọ thuộc nhóm hại, nhắc bản mệnh chú ý mâu thuẫn âm thầm.',
    recommendationLens: 'Nói sớm điều chưa ổn, giữ ngân sách dự phòng và tránh hứa vì cả nể.',
  },
}

export const NAP_AM_LENSES: Record<string, NapAmEvidence> = {
  'Hải Trung Kim': {
    name: 'Hải Trung Kim',
    element: 'Kim',
    careerLens: 'Hợp với việc cần tích lũy ngầm, chuẩn hóa dữ liệu, quản trị tài sản, tài chính, kỹ thuật hoặc vai trò giữ chuẩn.',
    moneyLens: 'Tiền nên đi theo nguyên tắc giữ nền trước, đầu tư sau; càng minh bạch dòng tiền càng giảm hao tổn vì quyết định cảm tính.',
  },
  'Lư Trung Hỏa': {
    name: 'Lư Trung Hỏa',
    element: 'Hỏa',
    careerLens: 'Hợp với vai trò cần nhiệt huyết, dẫn dắt, truyền thông, bán hàng, sản phẩm hoặc tạo động lực cho đội nhóm.',
    moneyLens: 'Tài lộc tăng khi khí thế được đặt vào kế hoạch rõ; cần tránh chi mạnh hoặc đầu tư nóng chỉ vì cảm xúc đang cao.',
  },
  'Đại Lâm Mộc': {
    name: 'Đại Lâm Mộc',
    element: 'Mộc',
    careerLens: 'Hợp với việc xây hệ sinh thái, giáo dục, tư vấn, sáng tạo dài hạn hoặc quản trị nhóm cần nuôi dưỡng nguồn lực.',
    moneyLens: 'Tiền nên đi theo hướng tăng trưởng bền, tái đầu tư có chọn lọc và không chặt cây trước khi rừng đủ lớn.',
  },
  'Lộ Bàng Thổ': {
    name: 'Lộ Bàng Thổ',
    element: 'Thổ',
    careerLens: 'Hợp với vận hành, quy trình, bất động sản, quản lý nguồn lực, pháp lý nội bộ hoặc các việc cần sự ổn định.',
    moneyLens: 'Ưu tiên ngân sách có trật tự, quỹ dự phòng và tài sản hữu hình; tránh mở quá nhiều hướng ngoài năng lực quản trị.',
  },
  'Kiếm Phong Kim': {
    name: 'Kiếm Phong Kim',
    element: 'Kim',
    careerLens: 'Hợp với chuyên môn sắc, phân tích, kiểm soát chất lượng, đàm phán, kỹ thuật hoặc vai trò cần quyết đoán có chuẩn mực.',
    moneyLens: 'Tiền đến tốt khi tiêu chuẩn rõ; cần tránh dùng sự sắc bén để lao vào giao dịch rủi ro thiếu kiểm chứng.',
  },
  'Sơn Đầu Hỏa': {
    name: 'Sơn Đầu Hỏa',
    element: 'Hỏa',
    careerLens: 'Hợp với việc tạo tín hiệu, xây thương hiệu cá nhân, dẫn dắt cộng đồng hoặc thúc đẩy thay đổi ở phạm vi rõ.',
    moneyLens: 'Tài lộc cần được neo bằng kế hoạch thu-chi; ánh sáng càng mạnh càng cần nền nhiên liệu bền.',
  },
  'Giản Hạ Thủy': {
    name: 'Giản Hạ Thủy',
    element: 'Thủy',
    careerLens: 'Hợp với nghiên cứu, chiến lược, chăm sóc khách hàng, dữ liệu, tư vấn hoặc việc cần lắng nghe dòng chảy ngầm.',
    moneyLens: 'Tiền nên đi theo dòng đều, dự phòng linh hoạt và hạn chế quyết định lớn khi cảm xúc chưa ổn.',
  },
  'Thành Đầu Thổ': {
    name: 'Thành Đầu Thổ',
    element: 'Thổ',
    careerLens: 'Hợp với vai trò dựng khung, bảo vệ hệ thống, quản trị quy trình, vận hành hoặc trách nhiệm trụ cột.',
    moneyLens: 'Tài chính tốt khi có thành lũy: ngân sách, quỹ an toàn, giới hạn rủi ro và nguyên tắc không vay mượn tùy tiện.',
  },
  'Bạch Lạp Kim': {
    name: 'Bạch Lạp Kim',
    element: 'Kim',
    careerLens: 'Hợp với giai đoạn luyện nghề, tối ưu kỹ năng, công nghệ, thiết kế chuẩn hoặc các việc cần lọc tạp thành tinh.',
    moneyLens: 'Tiền nên phục vụ học tập, nâng cấp năng lực và khoản dự phòng; tránh chạy theo vẻ ngoài khi nền chưa chín.',
  },
}

export const ANIMAL_TRAITS: Record<string, string[]> = {
  Tý: ['nhanh nhạy trước thay đổi', 'giỏi tích lũy nguồn lực nhỏ', 'biết xoay xở trong hoàn cảnh khó'],
  Sửu: ['bền bỉ với trách nhiệm dài hạn', 'thực tế trong lựa chọn', 'đi chậm nhưng giữ lời đã hứa'],
  Dần: ['có khí thế tiên phong', 'dám nhận việc khó', 'dễ nóng khi bị bó buộc'],
  Mão: ['tinh tế trong giao tiếp', 'biết giữ hòa khí', 'cần môi trường đủ mềm để phát huy'],
  Thìn: ['có tầm nhìn rộng', 'thích làm việc có quy mô', 'cần kiểm soát kỳ vọng lớn'],
  Tỵ: ['quan sát sắc bén', 'kín đáo khi tính đường dài', 'kiên trì với chiến lược đã chọn'],
  Ngọ: ['chủ động và thích tự do', 'phản ứng nhanh với cơ hội', 'cần nhịp nghỉ để tránh quá đà'],
  Mùi: ['nhân hậu và biết chăm nền', 'có cảm nhận thẩm mỹ', 'cần ranh giới để không gánh quá nhiều'],
  Thân: ['linh hoạt trong xoay xở', 'thực dụng theo nghĩa biết tìm cách', 'giỏi kết nối khi có mục tiêu rõ'],
  Dậu: ['kỷ luật và chú ý chi tiết', 'trọng chuẩn mực cá nhân', 'dễ căng khi môi trường thiếu trật tự'],
  Tuất: ['trung thành với điều mình tin', 'có cảm thức công bằng', 'thường bảo vệ người trong nhóm'],
  Hợi: ['rộng lượng với người xung quanh', 'trực giác tốt về không khí quan hệ', 'cần cân bằng hưởng thụ với kỷ luật'],
}

export function splitCanChi(canChi: string): { thienCan: string; diaChi: string } {
  const parts = canChi.trim().split(/\s+/)
  if (parts.length !== 2) {
    throw new Error(`Expected Can Chi in two-part form, received: ${canChi}`)
  }
  return { thienCan: parts[0], diaChi: parts[1] }
}

export function calculateVietnameseAgeInTargetYear(year: number): number {
  return YEAR_FORECAST_TARGET_YEAR - year + 1
}

export function getLifeStage(age: number): LifeStageEvidence {
  if (age <= 25) {
    return {
      age,
      bucket: '19-25',
      focus: 'học tập, khởi nghiệp và xây nền',
      adviceLens: 'Ưu tiên học nghề, thử nhỏ, chọn người hướng dẫn và đừng vội khóa mình vào một vai trò quá sớm.',
    }
  }

  if (age <= 35) {
    return {
      age,
      bucket: '26-35',
      focus: 'củng cố sự nghiệp, gia đình và tài chính nền',
      adviceLens: 'Cần chọn ít mục tiêu hơn, xây năng lực kiếm tiền bền và rõ ràng trách nhiệm trong quan hệ.',
    }
  }

  if (age <= 45) {
    return {
      age,
      bucket: '36-45',
      focus: 'quản lý quy mô, chuyển đổi vai trò và bảo vệ sức bền',
      adviceLens: 'Nên quản trị quy mô bằng hệ thống, trao quyền có kiểm soát và không lấy quá tải làm bằng chứng năng lực.',
    }
  }

  return {
    age,
    bucket: '46+',
    focus: 'truyền nghề, bảo toàn thành quả và chăm sức khỏe nền',
    adviceLens: 'Giữ nền tài sản, truyền kinh nghiệm đúng người và xem sức khỏe dài hạn là phần của vận trình.',
  }
}

export function getCungMenhEvidence(year: number, gender: YearForecastGender): CungMenhEvidence {
  const row = CUNG_MENH_BY_YEAR_GENDER[year]?.[gender]
  if (!row) {
    throw new Error(`Missing Cung mệnh lookup for ${year} ${gender}`)
  }

  const element = CUNG_MENH_ELEMENT[row.name]
  if (!element) {
    throw new Error(`Missing Cung mệnh element for ${row.name}`)
  }

  return {
    name: row.name,
    element,
    validationStatus: row.validationStatus,
    sourceNote: row.sourceNote,
  }
}

function getRequiredMapValue<T>(map: Record<string, T>, key: string, label: string): T {
  const value = map[key]
  if (!value) {
    throw new Error(`Missing ${label} lookup for ${key}`)
  }
  return value
}

function buildAnimalTraitEvidence(animal: string): AnimalTraitEvidence {
  const traits = getRequiredMapValue(ANIMAL_TRAITS, animal, 'animal traits')
  return {
    animal,
    traits,
    sentences: traits.map((trait) => `Tuổi ${animal} thường thể hiện nét ${trait} khi bước vào một năm có biến động.`),
  }
}

function buildRequirementEvidence(evidence: Omit<YearForecastDomainEvidence, 'requirementEvidence'>): Record<RequirementId, string> {
  return {
    'REQ-1': `Mở bài phải nêu rõ ${evidence.canChi} và nạp âm ${evidence.napAm.name} (${evidence.napAm.element}).`,
    'REQ-2': `${evidence.genderLabel} sinh năm ${evidence.year} dùng Cung mệnh ${evidence.cungMenh.name} (${evidence.cungMenh.element}); nguồn: ${evidence.cungMenh.sourceNote}.`,
    'REQ-3': `Thiên Can ${evidence.thienCan} gặp Bính 2026 là ${evidence.thienCanRelationToBinh.label}: ${evidence.thienCanRelationToBinh.detail}`,
    'REQ-4': `Địa Chi ${evidence.diaChi} gặp Ngọ 2026 là ${evidence.diaChiRelationToNgo.label}: ${evidence.diaChiRelationToNgo.detail}`,
    'REQ-5': `Cần dùng ít nhất 3 nét con giáp ${evidence.animalTraits.animal}: ${evidence.animalTraits.traits.join('; ')}.`,
    'REQ-6': `Tuổi âm năm 2026 là ${evidence.lifeStage.age}, thuộc giai đoạn ${evidence.lifeStage.bucket}: ${evidence.lifeStage.focus}.`,
    'REQ-7': `Nạp âm ${evidence.napAm.name} định hướng nghề nghiệp: ${evidence.napAm.careerLens} Tiền bạc: ${evidence.napAm.moneyLens}`,
    'REQ-8': `Phần phương pháp phải nhắc ${evidence.methodCitation}, đồng thời nói rõ đây là tổng quan theo năm sinh, không phải lá số cá nhân.`,
    'REQ-9': `FAQ phải gọi đúng ${evidence.canChi}, ${evidence.napAm.name}, Cung ${evidence.cungMenh.name} và quan hệ ${evidence.diaChi}↔Ngọ.`,
    'REQ-10': `Gate Phase 1: không mở xuất bản cho ${evidence.slug} cho tới khi bài mới vượt kiểm tra không có câu trên 25 từ trùng nguyên văn giữa các bài.`,
  }
}

export function deriveYearForecastDomainEvidence(seed: YearForecastSeedInput): YearForecastDomainEvidence {
  const { thienCan, diaChi } = splitCanChi(seed.canChi)
  const napAm = getRequiredMapValue(NAP_AM_LENSES, seed.element, 'nạp âm')
  const cungMenh = getCungMenhEvidence(seed.year, seed.gender)
  const lifeStage = getLifeStage(calculateVietnameseAgeInTargetYear(seed.year))
  const thienCanRelationToBinh = getRequiredMapValue(
    THIEN_CAN_RELATION_TO_BINH,
    thienCan,
    'Thiên Can relation to Bính',
  )
  const diaChiRelationToNgo = getRequiredMapValue(DIA_CHI_RELATION_TO_NGO, diaChi, 'Địa Chi relation to Ngọ')
  const animalTraits = buildAnimalTraitEvidence(seed.animal)

  const evidenceWithoutRequirements: Omit<YearForecastDomainEvidence, 'requirementEvidence'> = {
    sourceVersion: YEAR_FORECAST_DOMAIN_SOURCE_VERSION,
    targetYear: YEAR_FORECAST_TARGET_YEAR,
    targetYearCanChi: YEAR_FORECAST_TARGET_CAN_CHI,
    slug: seed.slug,
    year: seed.year,
    gender: seed.gender,
    genderLabel: seed.genderLabel,
    canChi: seed.canChi,
    thienCan,
    diaChi,
    napAm,
    cungMenh,
    lifeStage,
    thienCanRelationToBinh,
    diaChiRelationToNgo,
    animalTraits,
    methodCitation: 'Tam Hợp Phái / 《紫微斗数全书》',
  }

  return {
    ...evidenceWithoutRequirements,
    requirementEvidence: buildRequirementEvidence(evidenceWithoutRequirements),
  }
}

export function buildYearForecastRegenerationInput(seed: YearForecastSeedInput): YearForecastRegenerationInput {
  const evidence = deriveYearForecastDomainEvidence(seed)
  return {
    slug: evidence.slug,
    year: evidence.year,
    gender: evidence.gender,
    genderLabel: evidence.genderLabel,
    targetYear: evidence.targetYear,
    targetYearCanChi: evidence.targetYearCanChi,
    canChi: evidence.canChi,
    thienCan: evidence.thienCan,
    diaChi: evidence.diaChi,
    napAm: evidence.napAm,
    cungMenh: evidence.cungMenh,
    lifeStage: evidence.lifeStage,
    thienCanRelationToBinh: evidence.thienCanRelationToBinh,
    diaChiRelationToNgo: evidence.diaChiRelationToNgo,
    animalTraits: evidence.animalTraits,
    methodCitation: evidence.methodCitation,
    generationInstruction:
      'Generate a fresh article from these inputs only; do not copy, spin, or mutate paragraphs from another year/gender page.',
  }
}

export function getYearForecastPublicationGate(
  evidence: YearForecastDomainEvidence,
  stage: 'phase1-domain-evidence-ready' | 'phase3-batch-review-ready' = 'phase1-domain-evidence-ready',
): YearForecastPublicationGate {
  if (stage === 'phase3-batch-review-ready') {
    return {
      status: 'blocked_pending_review',
      reason: 'Phase 3 cohort prose is route-integrated for review only; publication still needs domain/SEO approval and an intentional sitemap/noindex flip.',
      blockers: [
        'domain_copy_seo_review_required',
        'intentional_publication_flip_required',
        `phase3_batch_ready_for_${evidence.slug}`,
      ],
      evidenceReady: REQUIREMENT_IDS,
    }
  }

  return {
    status: 'blocked_pending_regeneration',
    reason: 'Legacy year-forecast renderer is copy-heavy and may not be used as approved production copy.',
    blockers: [
      'full_article_regeneration_required',
      'sentence_similarity_scan_required_for_req_10',
      `domain_evidence_ready_for_${evidence.slug}`,
    ],
    evidenceReady: REQUIREMENT_IDS,
  }
}
