import type { SeoForecastSeed, SummaryRow } from './seo-forecasts'
import {
  buildYearForecastRegenerationInput,
  deriveYearForecastDomainEvidence,
  type YearForecastDomainEvidence,
  type YearForecastRegenerationInput,
} from './year-forecast-domain'

export const YEAR_FORECAST_PHASE2_PILOT_SLUGS = [
  'tuoi-ty-1984-nam',
  'tuoi-suu-1985-nu',
  'tuoi-dan-1986-nam',
] as const

export const YEAR_FORECAST_PHASE3_COHORT_YEARS = { start: 1984, end: 1995 } as const

export type YearForecastPhase2PilotSlug = (typeof YEAR_FORECAST_PHASE2_PILOT_SLUGS)[number]

export interface YearForecastSection {
  heading: string
  content: string[]
}

export interface YearForecastCtaModule {
  placement: 'after-summary' | 'mid-article' | 'end-of-article' | 'sticky-mobile'
  heading: string
  body: string
  buttonLabel: string
  href: '/lap-la-so/'
  complianceNote: string
}

export interface YearForecastRegeneratedArticle {
  slug: string
  title: string
  h1: string
  description: string
  topDisclaimer: string
  aiNativeWrapper: string
  methodNote: string
  domainEvidence: YearForecastDomainEvidence
  regenerationInput: YearForecastRegenerationInput
  summaryRows: SummaryRow[]
  ctaModules: YearForecastCtaModule[]
  stickyMobileCta: YearForecastCtaModule
  intro: string[]
  sections: YearForecastSection[]
  faqs: Array<{ question: string; answer: string }>
  contentOrigin: 'phase3-batch-offline-regenerated'
  reviewStatus: 'needs-domain-copy-seo-review'
}

export type YearForecastPilotArticle = YearForecastRegeneratedArticle

interface AnimalVoice {
  strength: string
  risk: string
  workStyle: string
  relationshipStyle: string
  recoveryStyle: string
}

interface GenderVoice {
  openingFrame: string
  workAction: string
  moneyAction: string
  relationshipAction: string
  wellbeingAction: string
  decisionFilter: string
  careerGuardrail: string
  relationshipFrame: string
  appReason: string
}

const ANIMAL_VOICE: Record<string, AnimalVoice> = {
  Tý: {
    strength: 'xoay xở nhanh khi bối cảnh đổi chiều',
    risk: 'ôm quá nhiều đầu mối vì tin mình xử lý được hết',
    workStyle: 'biến phản xạ nhanh thành checklist, lịch bàn giao và dữ liệu kiểm tra',
    relationshipStyle: 'nói sớm điều đang gánh để người thân không phải đoán qua sự im lặng',
    recoveryStyle: 'giảm lịch hẹn phụ và giữ một khung ngủ ổn định',
  },
  Sửu: {
    strength: 'bền bỉ với việc dài hơi và giữ chữ tín',
    risk: 'chịu thay phần người khác tới khi thành ấm ức',
    workStyle: 'đặt ranh giới trách nhiệm trước khi nhận thêm vai trò mới',
    relationshipStyle: 'biến sự chăm lo thành thỏa thuận rõ thay vì hy sinh âm thầm',
    recoveryStyle: 'xếp lịch nghỉ như một cam kết thật, không phải phần thưởng sau cùng',
  },
  Dần: {
    strength: 'tiên phong khi cần mở đường và kéo khí thế nhóm',
    risk: 'nhầm tốc độ với bản lĩnh rồi tự đẩy mình quá căng',
    workStyle: 'biến năng lượng cá nhân thành động lực nhóm có người phản biện',
    relationshipStyle: 'hạ giọng trước khi góp ý để sự thẳng thắn không thành áp đặt',
    recoveryStyle: 'đưa vận động, ngủ nghỉ và khoảng trống gia đình vào kế hoạch',
  },
  Mão: {
    strength: 'nhạy cảm với bầu không khí và biết giữ hòa khí',
    risk: 'né xung đột tới khi nhu cầu cá nhân bị mờ đi',
    workStyle: 'dùng sự tinh tế để sửa quy trình nhỏ trước khi vấn đề lớn hơn',
    relationshipStyle: 'nói ranh giới bằng câu mềm nhưng cụ thể',
    recoveryStyle: 'giữ không gian yên tĩnh để nạp lại cảm xúc sau nhiều tương tác',
  },
  Thìn: {
    strength: 'nhìn được bức tranh lớn và thích việc có quy mô',
    risk: 'kỳ vọng quá rộng khiến việc nhỏ bị bỏ sót',
    workStyle: 'chia tầm nhìn thành mốc ngắn có người chịu trách nhiệm',
    relationshipStyle: 'đừng để người thân chỉ nghe kế hoạch lớn mà thiếu thời gian gần gũi',
    recoveryStyle: 'giảm việc ngoài lề để thân tâm không bị kéo bởi quá nhiều dự án',
  },
  Tỵ: {
    strength: 'quan sát sâu và biết tính đường dài',
    risk: 'giữ kín quá lâu khiến người khác khó đồng hành',
    workStyle: 'biến phân tích thầm lặng thành bản kế hoạch đủ rõ cho đội nhóm',
    relationshipStyle: 'chia sẻ một phần lo lắng trước khi nó thành khoảng cách',
    recoveryStyle: 'tắt bớt nguồn thông tin nhiễu để đầu óc có thời gian lọc lại',
  },
  Ngọ: {
    strength: 'chủ động, nhanh và thích tự do hành động',
    risk: 'tự tạo áp lực phải luôn ở phía trước',
    workStyle: 'đặt phanh cho tham vọng bằng ngân sách và lịch nghỉ rõ',
    relationshipStyle: 'cho người thân biết mình cần tự do ở đâu và cam kết ở đâu',
    recoveryStyle: 'giảm nhịp di chuyển để cơ thể không phải chạy theo cảm hứng',
  },
  Mùi: {
    strength: 'biết chăm nền, giữ sự ấm áp và nhìn chi tiết mềm',
    risk: 'gánh cảm xúc của người khác rồi quên nhu cầu riêng',
    workStyle: 'đặt ranh giới chăm sóc để việc tốt không thành nghĩa vụ vô hạn',
    relationshipStyle: 'nói rõ phần mình cần được hỗ trợ, không chỉ hỗ trợ người khác',
    recoveryStyle: 'dành thời gian cho việc nuôi lại cảm hứng và giấc ngủ đều',
  },
  Thân: {
    strength: 'linh hoạt, thực dụng và giỏi tìm đường vòng',
    risk: 'nhảy quá nhanh giữa nhiều hướng nên khó đi sâu',
    workStyle: 'chọn một thí nghiệm chính và ghi dữ liệu trước khi đổi chiến thuật',
    relationshipStyle: 'giảm đùa né khi câu chuyện cần sự cam kết rõ',
    recoveryStyle: 'giữ một khoảng không màn hình để đầu óc bớt tản mạn',
  },
  Dậu: {
    strength: 'kỷ luật, chú ý chi tiết và trọng chuẩn mực',
    risk: 'căng với lỗi nhỏ rồi làm mất nhịp hợp tác',
    workStyle: 'dùng tiêu chuẩn để nâng chất lượng, không dùng tiêu chuẩn để gây áp lực',
    relationshipStyle: 'khen điều đúng trước khi sửa điều lệch',
    recoveryStyle: 'để lịch sinh hoạt có khoảng mềm thay vì kiểm soát mọi phút',
  },
  Tuất: {
    strength: 'trung thành, có cảm thức công bằng và bảo vệ nhóm',
    risk: 'ôm vai người giữ lẽ phải đến mức mệt',
    workStyle: 'chuyển tinh thần trách nhiệm thành nguyên tắc phân vai rõ',
    relationshipStyle: 'nói điều mình cần chứ không chỉ bảo vệ điều người khác cần',
    recoveryStyle: 'tách việc cần chiến đấu khỏi việc nên buông để giữ sức',
  },
  Hợi: {
    strength: 'rộng lượng, trực giác tốt và dễ tạo sự dễ chịu',
    risk: 'cả nể rồi để tiền bạc hoặc thời gian bị rò rỉ',
    workStyle: 'đưa sự mềm mỏng vào lịch và ngân sách có giới hạn',
    relationshipStyle: 'giữ lòng tốt nhưng yêu cầu thỏa thuận rõ hơn',
    recoveryStyle: 'cân bằng hưởng thụ với kỷ luật thân tâm nhẹ nhàng',
  },
}

const GENDER_VOICE: Record<SeoForecastSeed['gender'], GenderVoice> = {
  nam: {
    openingFrame: 'giữ uy tín, phân quyền rõ và bớt ôm vai trụ cột',
    workAction: 'rõ quyền quyết định, chuẩn bàn giao và chỉ số kết quả',
    moneyAction: 'ưu tiên quỹ dự phòng, hợp đồng rõ và giới hạn bảo lãnh',
    relationshipAction: 'nói thẳng áp lực trách nhiệm thay vì tự gồng rồi xa cách',
    wellbeingAction: 'đặt lịch nghỉ, giảm làm bù ban đêm và kiểm tra sức bền',
    decisionFilter: 'giữ việc tăng uy tín, giảm việc chỉ để chứng minh bản lĩnh',
    careerGuardrail: 'đừng mở rộng nhanh khi thiếu người hỗ trợ hoặc số liệu kiểm chứng',
    relationshipFrame: 'người thân cần thấy sự hiện diện, không chỉ trách nhiệm tài chính',
    appReason: 'lá số cá nhân kiểm tra sâu hơn Quan Lộc, Tài Bạch và trách nhiệm',
  },
  nu: {
    openingFrame: 'giữ quyền tự chủ, ranh giới cảm xúc và nhịp chăm sóc mình',
    workAction: 'chọn đúng ưu tiên, bảo vệ thời gian sâu và nói rõ kỳ vọng',
    moneyAction: 'ghi dòng tiền nhỏ, giới hạn chi cảm xúc và giữ quỹ an tâm',
    relationshipAction: 'nói nhu cầu hỗ trợ sớm, tránh chu đáo thành nghĩa vụ im lặng',
    wellbeingAction: 'nghỉ không mặc cảm, chia sẻ việc chăm sóc và giữ nhu cầu riêng',
    decisionFilter: 'giữ việc tăng tự chủ, nói lại điều kiện với việc vì cả nể',
    careerGuardrail: 'đừng để linh hoạt thành gánh việc thiếu ranh giới',
    relationshipFrame: 'người thân cần lắng nghe và chia sẻ việc nhà lẫn cảm xúc',
    appReason: 'lá số cá nhân kiểm tra sâu hơn Mệnh, Phu Thê và nhịp tự chủ',
  },
}

function isPhase3CohortSeed(seed: SeoForecastSeed): boolean {
  return seed.year >= YEAR_FORECAST_PHASE3_COHORT_YEARS.start && seed.year <= YEAR_FORECAST_PHASE3_COHORT_YEARS.end
}

export function isYearForecastPhase3CohortSeed(seed: SeoForecastSeed): boolean {
  return isPhase3CohortSeed(seed)
}

function isPilotSlug(slug: string): slug is YearForecastPhase2PilotSlug {
  return YEAR_FORECAST_PHASE2_PILOT_SLUGS.includes(slug as YearForecastPhase2PilotSlug)
}

function buildTitle(seed: SeoForecastSeed): string {
  return `Tử vi tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} năm 2026`
}

function genderNoun(seed: SeoForecastSeed): string {
  return seed.gender === 'nam' ? 'nam mạng' : 'nữ mạng'
}

function audience(seed: SeoForecastSeed): string {
  return `${seed.canChi} ${seed.year} ${genderNoun(seed)}`
}

function voiceFor(seed: SeoForecastSeed): AnimalVoice {
  const voice = ANIMAL_VOICE[seed.animal]
  if (!voice) throw new Error(`Missing animal voice for ${seed.animal}`)
  return voice
}

function genderVoiceFor(seed: SeoForecastSeed): GenderVoice {
  return GENDER_VOICE[seed.gender]
}

function buildTopDisclaimer(seed: SeoForecastSeed): string {
  return `Ứng dụng giải trí và thuật toán tham khảo: bài ${audience(seed)} năm 2026 không phải lời tiên đoán, không thay thế lá số cá nhân hoặc tư vấn chuyên môn. Với ${audience(seed)}, bài theo năm sinh không thể kết luận về sao tại Mệnh Cung khi chưa có ngày giờ sinh.`
}

function buildAiNativeWrapper(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `Thuật toán Bói Toán tổng hợp riêng cho ${audience(seed)} từ 50+ cổ thư Tử Vi truyền thống, gồm Tam Hợp Phái và 《紫微斗数全书》, rồi đối chiếu nạp âm ${evidence.napAm.name}, Cung ${evidence.cungMenh.name} và năm ${evidence.targetYearCanChi}.`
}

function buildMethodNote(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `Bài phân tích ${audience(seed)} dùng Can Chi, nạp âm, Cung mệnh, quan hệ với năm ${evidence.targetYearCanChi} và tham chiếu Tam Hợp Phái / 《紫微斗数全书》; đây là nội dung tham khảo, không phải lời tiên đoán.`
}

function careerLensFor(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  if (seed.gender === 'nam') {
    return `Với ${audience(seed)}, nạp âm ${evidence.napAm.name} nên được đưa vào vai trò tạo chuẩn, quản trị nguồn lực và đo kết quả rõ; ${evidence.napAm.careerLens.toLowerCase()}`
  }

  return `Với ${audience(seed)}, nạp âm ${evidence.napAm.name} nên được dùng để chuẩn hóa quy trình, bảo vệ thời gian sâu và quản lý dòng tiền gia đình/công việc; ${evidence.napAm.careerLens.toLowerCase()}`
}

function moneyLensFor(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `${audience(seed)} nên đọc tài chính qua nạp âm ${evidence.napAm.name}: ${evidence.napAm.moneyLens}`
}

function buildCtaModules(seed: SeoForecastSeed): YearForecastCtaModule[] {
  const label = audience(seed)
  const genderVoice = genderVoiceFor(seed)

  return [
    {
      placement: 'after-summary',
      heading: `Muốn xem ${label} theo ngày giờ sinh?`,
      body: `Bài ${label} này là tổng quan theo năm sinh. Lá số cá nhân trên Bói Toán cho ${label} cần ngày giờ sinh để an Mệnh, Thân, Cục và 12 cung cho riêng bạn; ${genderVoice.appReason}.`,
      buttonLabel: `Lập lá số ${label} — miễn phí lượt đầu`,
      href: '/lap-la-so/',
      complianceNote: `${label}: ứng dụng tham khảo, không thay thế tư vấn chuyên môn.`,
    },
    {
      placement: 'mid-article',
      heading: `Thuật toán phát hiện thêm cho ${label}`,
      body: `Với ${label}, dữ liệu năm sinh mới cho thấy nạp âm và Cung mệnh. Nhập ngày giờ sinh của ${label} để Bói Toán đọc tiếp vị trí sao trong lá số riêng, nhất là khi bạn muốn kiểm tra ${genderVoice.decisionFilter}.`,
      buttonLabel: `Thử lá số ${label}`,
      href: '/lap-la-so/',
      complianceNote: `${label}: thuật toán tham khảo, không phải kết luận số mệnh.`,
    },
    {
      placement: 'end-of-article',
      heading: `Bạn đã đọc xong tổng quan ${label}`,
      body: `Riêng ${label}, nếu muốn xem phần khác biệt của chính bạn, hãy lập lá số cá nhân để an Mệnh Cung, Thân Cung, Cục và các sao tại 12 cung; ${genderVoice.appReason}.`,
      buttonLabel: `Xem lá số ${label} sâu hơn`,
      href: '/lap-la-so/',
      complianceNote: `${label}: ứng dụng tham khảo, không thay thế tư vấn chuyên môn.`,
    },
    {
      placement: 'sticky-mobile',
      heading: `${label}: xem theo giờ sinh`,
      body: `${label} đã có tổng quan theo năm sinh; lá số cá nhân giúp đọc sâu hơn theo ngày giờ sinh.`,
      buttonLabel: `Lập lá số ${label}`,
      href: '/lap-la-so/',
      complianceNote: 'Tham khảo, không thay thế tư vấn chuyên môn.',
    },
  ]
}

function buildSummaryRows(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence, voice: AnimalVoice): SummaryRow[] {
  const label = audience(seed)
  const genderVoice = genderVoiceFor(seed)

  return [
    {
      aspect: 'Nền vận',
      trend: `${label} gặp ${evidence.targetYearCanChi}: Can ${evidence.thienCan} là ${evidence.thienCanRelationToBinh.label}, Chi ${evidence.diaChi} là ${evidence.diaChiRelationToNgo.label}.`,
      action: `${label} nên đọc hai lớp này cùng lúc, không tách riêng may rủi khỏi cách hành động hằng ngày; ${genderVoice.decisionFilter}.`,
    },
    {
      aspect: 'Công việc',
      trend: careerLensFor(seed, evidence),
      action: `${label} nên chọn một việc trọng tâm để làm sâu, rồi ${genderVoice.workAction}.`,
    },
    {
      aspect: 'Tài chính',
      trend: moneyLensFor(seed, evidence),
      action: `${label} cần tách tiền dự phòng, tiền sinh hoạt và tiền thử nghiệm; ${genderVoice.moneyAction}.`,
    },
    {
      aspect: 'Tình cảm / gia đạo',
      trend: `${label} thuộc tuổi ${seed.animal} có thế mạnh ${voice.strength}, nhưng rủi ro là ${voice.risk}.`,
      action: `${label} nên dùng cách nói rõ ràng hơn để người thân hiểu điều mình đang gánh; ${genderVoice.relationshipAction}.`,
    },
    {
      aspect: 'Thân tâm',
      trend: `Cung ${evidence.cungMenh.name} ${evidence.cungMenh.element} của ${label} cần nền sinh hoạt đủ ổn để quyết định không lệch.`,
      action: `${label} nên xem giấc ngủ, vận động và khoảng nghỉ như một phần của kế hoạch năm; ${genderVoice.wellbeingAction}.`,
    },
  ]
}

function buildIntro(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence, voice: AnimalVoice): string[] {
  const label = audience(seed)
  const genderVoice = genderVoiceFor(seed)

  return [
    `${label} bước vào năm ${evidence.targetYearCanChi} với nạp âm ${evidence.napAm.name} thuộc ${evidence.napAm.element} và Cung mệnh ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element}. Với ${label}, bài này không xem một câu tốt xấu; Bói Toán đặt các lớp Can Chi, nạp âm, Cung mệnh và tuổi âm vào cùng một khung tham khảo để bạn tự chọn cách hành động tỉnh táo hơn.`,
    `Ở tuổi âm ${evidence.lifeStage.age}, ${label} đang ở giai đoạn ${evidence.lifeStage.bucket}: ${evidence.lifeStage.focus}. Với ${label}, ${genderVoice.openingFrame}.`,
    `Riêng ${label} thuộc tuổi ${seed.animal}, thế mạnh là ${voice.strength}, còn điểm cần canh là ${voice.risk}. Thuật toán phát hiện cho ${label}: ${evidence.thienCanRelationToBinh.detail} Đồng thời với ${label}, ${evidence.diaChiRelationToNgo.detail} Vì vậy ${label} năm 2026 nên được đọc như một bản đồ ra quyết định, không phải lời hứa chắc chắn về vận hạn.`,
  ]
}

function buildSections(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence, voice: AnimalVoice): YearForecastSection[] {
  const label = audience(seed)
  const genderVoice = genderVoiceFor(seed)

  return [
    {
      heading: `Tổng quan riêng cho ${label}`,
      content: [
        `${label} mang ba nét con giáp cần dùng đúng chỗ: ${evidence.animalTraits.traits.join(', ')}. Với ${label}, các nét này hữu ích khi năm 2026 đòi hỏi vừa quan sát nhanh vừa giữ nền ổn định.`,
        `Bói Toán không gộp ${label} vào một bài tuổi ${seed.animal} chung, vì Can ${evidence.thienCan}, Chi ${evidence.diaChi}, nạp âm ${evidence.napAm.name} và Cung ${evidence.cungMenh.name} tạo ra một cấu trúc riêng. Điểm đáng đọc của ${label} là cách biến ưu thế ${voice.strength} thành hành động có giới hạn, đồng thời nhớ rằng ${genderVoice.openingFrame}.`,
      ],
    },
    {
      heading: `Thiên Can ${evidence.thienCan} gặp Bính: ${evidence.thienCanRelationToBinh.label}`,
      content: [
        `Với ${label}, lớp Thiên Can cho thấy ${evidence.thienCanRelationToBinh.detail} Với ${label}, tín hiệu này hữu ích khi bạn cần chọn việc nuôi tương lai, thay vì chạy theo mọi lời mời có vẻ cấp bách.`,
        `${label} nên áp dụng gợi ý này bằng một nguyên tắc rõ: ${evidence.thienCanRelationToBinh.recommendationLens} Nếu ${label} đứng trước quyết định mới chưa làm rõ uy tín, dòng tiền hoặc trách nhiệm gia đình, hãy để nó qua một vòng kiểm tra nữa và nhớ ${genderVoice.decisionFilter}.`,
      ],
    },
    {
      heading: `Địa Chi ${evidence.diaChi} gặp Ngọ: ${evidence.diaChiRelationToNgo.label}`,
      content: [
        `Với ${label}, lớp Địa Chi cho thấy ${evidence.diaChiRelationToNgo.detail} Với ${label}, điều này không nên đọc thành tốt xấu tuyệt đối, mà nên đọc thành kiểu áp lực cần quản trị trong năm Bính Ngọ.`,
        `${label} có thể dùng khuyến nghị này theo hướng: ${evidence.diaChiRelationToNgo.recommendationLens} Khi ${label} gặp bối cảnh đổi nhanh, một câu hỏi nhỏ nhưng hữu ích là việc này cần tiến, cần dừng hay cần nói lại điều kiện; ${genderVoice.careerGuardrail}.`,
      ],
    },
    {
      heading: `Cung ${evidence.cungMenh.name} ${evidence.cungMenh.element} và nạp âm ${evidence.napAm.name}`,
      content: [
        `Theo bảng Cung mệnh chuẩn, ${label} có Cung ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element}. Khi đặt cạnh nạp âm ${evidence.napAm.name} của ${label}, Bói Toán đọc được một trục nền giúp bạn hiểu mình nên giữ chuẩn ở đâu và nên mềm ở đâu.`,
        `Trong nghề nghiệp, ${careerLensFor(seed, evidence)} Với ${label}, phần nghề còn cần nhớ: ${genderVoice.careerGuardrail}. Trong tài chính, ${moneyLensFor(seed, evidence)} Với ${label}, lời khuyên an toàn là đưa mọi khoản lớn về giấy tờ, mốc dừng và người kiểm tra chéo.`,
      ],
    },
    {
      heading: `Công danh, tài chính và Tài lộc ở tuổi ${evidence.lifeStage.age}`,
      content: [
        `Ở tuổi ${evidence.lifeStage.age}, ${label} nên biến đặc điểm ${voice.strength} thành cách làm có hệ thống: ${voice.workStyle}. Đây là phần life-stage riêng của ${label}, không phải lời khuyên chung cho mọi tuổi trong cùng nhóm 36-45 hay 26-35; ${genderVoice.workAction}.`,
        `${label} nên chọn một mục tiêu nghề nghiệp, một mục tiêu tiền bạc và một mục tiêu thân tâm cho năm 2026. Với ${label}, mỗi mục tiêu cần một hành động hằng tuần, vì thuật toán tham khảo chỉ có giá trị khi quay về lịch làm việc thật; ${genderVoice.moneyAction}.`,
      ],
    },
    {
      heading: `Tình duyên, gia đạo và Sức khỏe nền của tuổi ${seed.animal}`,
      content: [
        `Trong quan hệ, ${label} nên chú ý cách ${voice.relationshipStyle}. Với ${label}, tuổi ${seed.animal} có thể rất đáng tin khi đã nhận trách nhiệm, nhưng năm Bính Ngọ cần thêm khả năng nói rõ giới hạn trước khi mệt; ${genderVoice.relationshipFrame}.`,
        `Về sức khỏe nền, ${label} nên ${voice.recoveryStyle}. Với ${label}, phần này chỉ là nhắc nhở sinh hoạt theo năm sinh, không thay thế tư vấn y tế hoặc kiểm tra chuyên môn khi có dấu hiệu bất thường; ${genderVoice.wellbeingAction}.`,
      ],
    },
    {
      heading: `Lời khuyên khi dùng bài ${label} trước khi lập lá số cá nhân`,
      content: [
        `Theo Tam Hợp Phái / 《紫微斗数全书》, bài ${label} chỉ đọc các lớp tổng quan theo năm sinh và giới tính. Với ${label}, lá số cá nhân vẫn cần ngày giờ sinh để an Mệnh Cung, Thân Cung, Cục và vị trí sao trong 12 cung, nên ${genderVoice.appReason}.`,
        `Bạn có thể dùng bài ${label} như bản đồ thảo luận: ghi lại điều cần làm, điều cần hỏi người thân và điều cần kiểm chứng bằng dữ liệu riêng. Khi ${label} muốn đọc sâu hơn, hãy lập lá số cá nhân thay vì suy luận toàn bộ cuộc đời từ năm sinh; ${genderVoice.decisionFilter}.`,
      ],
    },
  ]
}

function buildFaqs(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): Array<{ question: string; answer: string }> {
  const label = audience(seed)
  const genderVoice = genderVoiceFor(seed)

  return [
    {
      question: `${label} gặp năm Bính Ngọ 2026 có điểm gì đáng chú ý?`,
      answer: `${label} có Can ${evidence.thienCan} gặp Bính là ${evidence.thienCanRelationToBinh.label}, còn Chi ${evidence.diaChi} gặp Ngọ là ${evidence.diaChiRelationToNgo.label}. Với ${label}, bạn nên đọc hai lớp này cùng nhau để chọn cách hành động, không xem như lời tiên đoán cố định; ${genderVoice.decisionFilter}.`,
    },
    {
      question: `Cung ${evidence.cungMenh.name} ${evidence.cungMenh.element} gợi ý gì cho ${label}?`,
      answer: `Cung ${evidence.cungMenh.name} của ${label} nhắc bạn chú ý nền quyết định: môi trường sống, cách giữ lời, quy tắc tiền bạc và nhịp nghỉ. Với ${label}, đây là lớp tham khảo theo Cung mệnh, không thay lá số cá nhân; ${genderVoice.openingFrame}.`,
    },
    {
      question: `Nạp âm ${evidence.napAm.name} của ${label} ảnh hưởng thế nào tới công việc và tiền bạc?`,
      answer: `Với ${label}, nạp âm ${evidence.napAm.name} giúp định hướng cách dùng năng lực trong nghề và cách giữ dòng tiền. Với ${label}, Bói Toán vẫn khuyến nghị ghi ngân sách, kiểm tra rủi ro và hỏi chuyên gia khi quyết định tài chính lớn; ${genderVoice.moneyAction}.`,
    },
    {
      question: `Bài ${label} này có phải kết luận số mệnh cá nhân không?`,
      answer: `Không. Bài ${label} là nội dung tham khảo theo năm sinh và giới tính; nó không thay thế tư vấn chuyên môn hoặc lá số cá nhân có ngày giờ sinh.`,
    },
    {
      question: `Bài tổng quan ${label} khác gì lá số cá nhân trên app Bói Toán?`,
      answer: `Bài ${label} này đọc theo năm sinh và giới tính. Lá số cá nhân trên app Bói Toán cho ${label} cần ngày giờ sinh để an Mệnh Cung, Thân Cung, Cục và vị trí 108 sao tại 12 cung, nên phù hợp hơn khi bạn muốn xem phần riêng của mình; ${genderVoice.appReason}.`,
    },
  ]
}

function buildDescription(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `Bài phân tích tử vi 2026 cho ${audience(seed)}: công việc, tài chính, tình duyên, sức khỏe theo Can ${evidence.thienCan}, Chi ${evidence.diaChi}, nạp âm ${evidence.napAm.name} và Cung ${evidence.cungMenh.name}.`
}

function articleWordCount(
  article: Pick<
    YearForecastRegeneratedArticle,
    'h1' | 'topDisclaimer' | 'aiNativeWrapper' | 'intro' | 'summaryRows' | 'ctaModules' | 'sections' | 'faqs'
  >,
): number {
  const text = [
    article.h1,
    article.topDisclaimer,
    article.aiNativeWrapper,
    ...article.intro,
    ...article.summaryRows.flatMap((row) => [row.aspect, row.trend, row.action]),
    ...article.ctaModules.flatMap((cta) => [cta.heading, cta.body, cta.buttonLabel, cta.complianceNote]),
    ...article.sections.flatMap((section) => [section.heading, ...section.content]),
    ...article.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ')
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function getYearForecastRegeneratedArticle(seed: SeoForecastSeed): YearForecastRegeneratedArticle | null {
  if (!isPhase3CohortSeed(seed)) return null

  const domainEvidence = deriveYearForecastDomainEvidence(seed)
  const regenerationInput = buildYearForecastRegenerationInput(seed)
  const title = buildTitle(seed)
  const voice = voiceFor(seed)
  const ctaModules = buildCtaModules(seed)
  const stickyMobileCta = ctaModules.find((module) => module.placement === 'sticky-mobile')

  if (!stickyMobileCta) {
    throw new Error(`Missing sticky mobile CTA for ${seed.slug}`)
  }

  return {
    slug: seed.slug,
    title,
    h1: title,
    description: buildDescription(seed, domainEvidence),
    topDisclaimer: buildTopDisclaimer(seed),
    aiNativeWrapper: buildAiNativeWrapper(seed, domainEvidence),
    methodNote: buildMethodNote(seed, domainEvidence),
    domainEvidence,
    regenerationInput,
    summaryRows: buildSummaryRows(seed, domainEvidence, voice),
    ctaModules,
    stickyMobileCta,
    intro: buildIntro(seed, domainEvidence, voice),
    sections: buildSections(seed, domainEvidence, voice),
    faqs: buildFaqs(seed, domainEvidence),
    contentOrigin: 'phase3-batch-offline-regenerated',
    reviewStatus: 'needs-domain-copy-seo-review',
  }
}

export function getYearForecastPilotArticle(seed: SeoForecastSeed): YearForecastPilotArticle | null {
  if (!isPilotSlug(seed.slug)) return null
  return getYearForecastRegeneratedArticle(seed)
}

export function getYearForecastPilotWordCount(article: YearForecastPilotArticle): number {
  return articleWordCount(article)
}

export function getYearForecastRegeneratedWordCount(article: YearForecastRegeneratedArticle): number {
  return articleWordCount(article)
}
