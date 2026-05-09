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
export const YEAR_FORECAST_PHASE4_COHORT_YEARS = { start: 1996, end: 2001 } as const

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
  contentOrigin: 'phase3-batch-offline-regenerated' | 'phase4-batch-offline-regenerated'
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

function genderVoiceFor(
  seed: SeoForecastSeed,
  evidence: YearForecastDomainEvidence,
  voice: AnimalVoice,
): GenderVoice {
  const role = genderNoun(seed)
  const age = evidence.lifeStage.age
  const canCue = `Can ${evidence.thienCan}`
  const chiCue = `Chi ${evidence.diaChi}`
  const cungCue = `Cung ${evidence.cungMenh.name}`

  if (seed.gender === 'nam') {
    return {
      openingFrame: `${role} tuổi âm ${age} giữ uy tín bằng phân quyền rõ, không lấy vai trụ cột làm lý do ôm hết việc`,
      workAction: `đưa ${canCue} vào một chuẩn bàn giao, gắn ${cungCue} với chỉ số kết quả và người kiểm tra`,
      moneyAction: `xếp quỹ dự phòng trước, dùng nạp âm ${evidence.napAm.name} để đặt mốc dừng cho khoản lớn`,
      relationshipAction: `nói rõ áp lực của tuổi ${seed.animal}, tránh để ${voice.risk} thành khoảng cách trong nhà`,
      wellbeingAction: `giữ lịch nghỉ sau mỗi mốc việc lớn, nhất là khi ${chiCue} khiến nhịp sống dễ đổi nhanh`,
      decisionFilter: `ưu tiên việc tăng uy tín bền, giảm quyết định chỉ để chứng minh bản lĩnh ở tuổi ${age}`,
      careerGuardrail: `không mở rộng nhanh khi ${canCue} ở tuổi âm ${age} chưa có số liệu và người hỗ trợ đủ rõ`,
      relationshipFrame: `người thân cần thấy sự hiện diện đều của ${articleContext(seed, evidence)}, không chỉ phần trách nhiệm tài chính`,
      appReason: `lá số cá nhân kiểm tra sâu hơn Quan Lộc, Tài Bạch và cách ${articleContextWithCung(seed, evidence)} phân bổ trách nhiệm`,
    }
  }

  return {
    openingFrame: `${role} tuổi âm ${age} giữ quyền tự chủ, ranh giới cảm xúc và nhịp chăm sóc bản thân`,
    workAction: `chọn đúng ưu tiên, bảo vệ thời gian sâu và nối ${canCue} với một kỳ vọng được nói rõ`,
      moneyAction: `ghi dòng tiền nhỏ, dùng nạp âm ${evidence.napAm.name} để giữ quỹ an tâm trước khoản phát sinh`,
      relationshipAction: `nói nhu cầu hỗ trợ sớm, tránh để ${voice.risk} biến thành nghĩa vụ im lặng`,
      wellbeingAction: `giữ khoảng nghỉ không mặc cảm, đặc biệt khi ${chiCue} làm lịch sinh hoạt dễ bị kéo lệch`,
      decisionFilter: `giữ việc tăng tự chủ, nói lại điều kiện với việc chỉ vì cả nể ở tuổi ${age}`,
      careerGuardrail: `đừng để sự linh hoạt của ${articleContext(seed, evidence)} thành gánh việc thiếu ranh giới hoặc thiếu ghi nhận`,
      relationshipFrame: `người thân cần lắng nghe và chia sẻ việc nhà lẫn cảm xúc với ${articleContext(seed, evidence)}`,
      appReason: `lá số cá nhân kiểm tra sâu hơn Mệnh, Phu Thê và nhịp tự chủ của ${articleContextWithCung(seed, evidence)}`,
  }
}

function isPhase3CohortSeed(seed: SeoForecastSeed): boolean {
  return seed.year >= YEAR_FORECAST_PHASE3_COHORT_YEARS.start && seed.year <= YEAR_FORECAST_PHASE3_COHORT_YEARS.end
}

function isPhase4CohortSeed(seed: SeoForecastSeed): boolean {
  return seed.year >= YEAR_FORECAST_PHASE4_COHORT_YEARS.start && seed.year <= YEAR_FORECAST_PHASE4_COHORT_YEARS.end
}

export function isYearForecastPhase3CohortSeed(seed: SeoForecastSeed): boolean {
  return isPhase3CohortSeed(seed)
}

export function isYearForecastPhase4CohortSeed(seed: SeoForecastSeed): boolean {
  return isPhase4CohortSeed(seed)
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

function articleContext(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `${genderNoun(seed)} tuổi âm ${evidence.lifeStage.age}`
}

function articleContextWithCung(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `${articleContext(seed, evidence)}, Cung ${evidence.cungMenh.name}`
}

function voiceFor(seed: SeoForecastSeed): AnimalVoice {
  const voice = ANIMAL_VOICE[seed.animal]
  if (!voice) throw new Error(`Missing animal voice for ${seed.animal}`)
  return voice
}

function buildTopDisclaimer(seed: SeoForecastSeed): string {
  const evidence = deriveYearForecastDomainEvidence(seed)
  const context = articleContext(seed, evidence)
  return `Ứng dụng giải trí và thuật toán tham khảo: bài tuổi ${seed.canChi} ${genderNoun(seed)} năm 2026 không phải lời tiên đoán, không thay thế lá số cá nhân hoặc tư vấn chuyên môn. Với ${context}, bài theo năm sinh không thể kết luận về sao tại Mệnh Cung khi chưa có ngày giờ sinh.`
}

function buildAiNativeWrapper(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `Thuật toán Bói Toán tổng hợp riêng cho tuổi ${seed.canChi} ${genderNoun(seed)} từ 50+ cổ thư Tử Vi truyền thống, gồm Tam Hợp Phái và 《紫微斗数全书》, rồi đối chiếu nạp âm ${evidence.napAm.name}, Cung ${evidence.cungMenh.name} và năm ${evidence.targetYearCanChi}.`
}

function buildMethodNote(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `Bài phân tích tuổi ${seed.canChi} ${genderNoun(seed)} dùng Can Chi, nạp âm, Cung mệnh, quan hệ với năm ${evidence.targetYearCanChi} và tham chiếu Tam Hợp Phái / 《紫微斗数全书》; đây là nội dung tham khảo, không phải lời tiên đoán.`
}

function careerLensFor(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  const context = articleContext(seed, evidence)
  if (seed.gender === 'nam') {
    return `Với ${context}, nạp âm ${evidence.napAm.name} nên được đưa vào vai trò tạo chuẩn, quản trị nguồn lực và đo kết quả rõ; ${evidence.napAm.careerLens.toLowerCase()}`
  }

  return `Với ${context}, nạp âm ${evidence.napAm.name} nên được dùng để chuẩn hóa quy trình, bảo vệ thời gian sâu và quản lý dòng tiền gia đình/công việc; ${evidence.napAm.careerLens.toLowerCase()}`
}

function moneyLensFor(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `${articleContext(seed, evidence)} nên đọc tài chính qua nạp âm ${evidence.napAm.name}: ${evidence.napAm.moneyLens}`
}

function buildCtaModules(
  seed: SeoForecastSeed,
  evidence: YearForecastDomainEvidence,
  voice: AnimalVoice,
): YearForecastCtaModule[] {
  const genderVoice = genderVoiceFor(seed, evidence, voice)
  const role = genderNoun(seed)
  const context = articleContext(seed, evidence)
  const contextWithCung = articleContextWithCung(seed, evidence)

  return [
    {
      placement: 'after-summary',
      heading: `Muốn xem lá số tuổi ${seed.canChi} ${role} theo ngày giờ sinh?`,
      body: `Bài tổng quan cho ${context} mới đọc năm sinh và giới tính. Lá số cá nhân trên Bói Toán cần ngày giờ sinh để an Mệnh, Thân, Cục và 12 cung cho riêng bạn; ${genderVoice.appReason}.`,
      buttonLabel: `Lập lá số ${seed.canChi} ${role} — miễn phí lượt đầu`,
      href: '/lap-la-so/',
      complianceNote: `${context}: ứng dụng tham khảo, không thay thế tư vấn chuyên môn.`,
    },
    {
      placement: 'mid-article',
      heading: `Thuật toán phát hiện thêm khi có giờ sinh`,
      body: `Dữ liệu năm sinh của ${contextWithCung} mới cho thấy nạp âm và Cung mệnh. Nhập ngày giờ sinh để Bói Toán đọc tiếp vị trí sao trong lá số riêng, nhất là khi bạn muốn kiểm tra ${genderVoice.decisionFilter}.`,
      buttonLabel: `Thử lá số ${seed.canChi}`,
      href: '/lap-la-so/',
      complianceNote: `${context}: thuật toán tham khảo, không phải kết luận số mệnh.`,
    },
    {
      placement: 'end-of-article',
      heading: `Bạn đã đọc xong tổng quan tuổi ${seed.canChi} ${role}`,
      body: `Nếu ${context} muốn xem phần khác biệt của chính mình, hãy lập lá số cá nhân để an Mệnh Cung, Thân Cung, Cục và các sao tại 12 cung; ${genderVoice.appReason}.`,
      buttonLabel: `Xem lá số ${seed.canChi} ${role} sâu hơn`,
      href: '/lap-la-so/',
      complianceNote: `${context}: ứng dụng tham khảo, không thay thế tư vấn chuyên môn.`,
    },
    {
      placement: 'sticky-mobile',
      heading: `${seed.canChi} ${role}: xem theo giờ sinh`,
      body: `Bài tổng quan cho ${context} đã có theo năm sinh; lá số cá nhân giúp đọc sâu hơn theo ngày giờ sinh.`,
      buttonLabel: `Lập lá số ${seed.canChi} ${role}`,
      href: '/lap-la-so/',
      complianceNote: 'Tham khảo, không thay thế tư vấn chuyên môn.',
    },
  ]
}

function buildSummaryRows(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence, voice: AnimalVoice): SummaryRow[] {
  const genderVoice = genderVoiceFor(seed, evidence, voice)
  const role = genderNoun(seed)
  const context = articleContext(seed, evidence)

  return [
    {
      aspect: 'Nền vận',
      trend: `${context}: Can ${evidence.thienCan} gặp ${evidence.targetYearCanChi} là ${evidence.thienCanRelationToBinh.label}; Chi ${evidence.diaChi} gặp Ngọ là ${evidence.diaChiRelationToNgo.label}.`,
      action: `Với ${context}, bạn nên đọc hai lớp này cùng lúc, không tách may rủi khỏi hành động hằng ngày; ${genderVoice.decisionFilter}.`,
    },
    {
      aspect: 'Công việc',
      trend: careerLensFor(seed, evidence),
      action: `Bản mệnh ở ${context} nên chọn một việc trọng tâm để làm sâu, rồi ${genderVoice.workAction}.`,
    },
    {
      aspect: 'Tài chính',
      trend: moneyLensFor(seed, evidence),
      action: `Với ${context}, hãy tách tiền dự phòng, tiền sinh hoạt và tiền thử nghiệm; ${genderVoice.moneyAction}.`,
    },
    {
      aspect: 'Tình cảm / gia đạo',
      trend: `${context} thuộc tuổi ${seed.animal} có thế mạnh ${voice.strength}, nhưng rủi ro là ${voice.risk}.`,
      action: `${context} nên dùng cách nói rõ ràng hơn để người thân hiểu điều mình đang gánh; ${genderVoice.relationshipAction}.`,
    },
    {
      aspect: 'Thân tâm',
      trend: `${articleContextWithCung(seed, evidence)} cần nền sinh hoạt đủ ổn để quyết định không lệch.`,
      action: `Ở ${context}, hãy xem giấc ngủ, vận động và khoảng nghỉ như một phần của kế hoạch năm; ${genderVoice.wellbeingAction}.`,
    },
  ]
}

function buildIntro(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence, voice: AnimalVoice): string[] {
  const label = audience(seed)
  const genderVoice = genderVoiceFor(seed, evidence, voice)
  const role = genderNoun(seed)
  const context = articleContext(seed, evidence)

  return [
    `${label} bước vào năm ${evidence.targetYearCanChi} với nạp âm ${evidence.napAm.name} thuộc ${evidence.napAm.element} và Cung mệnh ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element}. Với ${context}, bài này không xem một câu tốt xấu; Bói Toán đặt các lớp Can Chi, nạp âm, Cung mệnh và tuổi âm vào cùng một khung tham khảo để bạn tự chọn cách hành động tỉnh táo hơn.`,
    `Ở ${context}, bản mệnh đang ở giai đoạn ${evidence.lifeStage.bucket}: ${evidence.lifeStage.focus}. Với ${role}, ${genderVoice.openingFrame}.`,
    `Riêng ${context} thuộc tuổi ${seed.animal}, thế mạnh là ${voice.strength}, còn điểm cần canh là ${voice.risk}. Thuật toán phát hiện cho ${context}: ${evidence.thienCanRelationToBinh.detail} Đồng thời với ${context}, ${evidence.diaChiRelationToNgo.detail} Vì vậy với ${context}, năm 2026 nên được đọc như một bản đồ ra quyết định, không phải lời hứa chắc chắn về vận hạn.`,
  ]
}

function buildSections(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence, voice: AnimalVoice): YearForecastSection[] {
  const genderVoice = genderVoiceFor(seed, evidence, voice)
  const context = articleContext(seed, evidence)
  const contextWithCung = articleContextWithCung(seed, evidence)

  return [
    {
      heading: `Tổng quan riêng cho tuổi ${seed.canChi} ${seed.genderLabel}`,
      content: [
        `Với ${context}, ba nét con giáp cần dùng đúng chỗ là: ${evidence.animalTraits.traits.join(', ')}. Các nét này hữu ích khi năm 2026 đòi hỏi vừa quan sát nhanh vừa giữ nền ổn định theo ${contextWithCung}.`,
        `Với ${context}, Bói Toán không gộp bài này vào một bài tuổi ${seed.animal} chung, vì Can ${evidence.thienCan}, Chi ${evidence.diaChi}, nạp âm ${evidence.napAm.name} và Cung ${evidence.cungMenh.name} tạo ra một cấu trúc riêng. Điểm đáng đọc của ${context} là cách biến ưu thế ${voice.strength} thành hành động có giới hạn, đồng thời nhớ rằng ${genderVoice.openingFrame}.`,
      ],
    },
    {
      heading: `Thiên Can ${evidence.thienCan} gặp Bính: ${evidence.thienCanRelationToBinh.label}`,
      content: [
        `Lớp Thiên Can cho ${context} thấy ${evidence.thienCanRelationToBinh.detail} Tín hiệu này hữu ích khi bạn cần chọn việc nuôi tương lai, thay vì chạy theo mọi lời mời có vẻ cấp bách ở ${context}.`,
        `Bản mệnh ở ${context} nên áp dụng gợi ý này bằng một nguyên tắc rõ: ${evidence.thienCanRelationToBinh.recommendationLens} Nếu quyết định mới chưa làm rõ uy tín, dòng tiền hoặc trách nhiệm gia đình, hãy để nó qua một vòng kiểm tra nữa và nhớ ${genderVoice.decisionFilter}.`,
      ],
    },
    {
      heading: `Địa Chi ${evidence.diaChi} gặp Ngọ: ${evidence.diaChiRelationToNgo.label}`,
      content: [
        `Lớp Địa Chi của ${context} cho thấy ${evidence.diaChiRelationToNgo.detail} Với ${contextWithCung}, điều này không nên đọc thành tốt xấu tuyệt đối, mà nên đọc thành kiểu áp lực cần quản trị trong năm Bính Ngọ.`,
        `Với ${context}, bạn có thể dùng khuyến nghị này theo hướng: ${evidence.diaChiRelationToNgo.recommendationLens} Khi bối cảnh đổi nhanh, một câu hỏi nhỏ nhưng hữu ích cho ${contextWithCung} là việc này cần tiến, cần dừng hay cần nói lại điều kiện; ${genderVoice.careerGuardrail}.`,
      ],
    },
    {
      heading: `Cung ${evidence.cungMenh.name} ${evidence.cungMenh.element} và nạp âm ${evidence.napAm.name}`,
      content: [
        `Theo bảng Cung mệnh chuẩn, ${contextWithCung} thuộc ${evidence.cungMenh.element}. Khi đặt cạnh nạp âm ${evidence.napAm.name}, Bói Toán đọc được cho ${context} một trục nền giúp bạn hiểu mình nên giữ chuẩn ở đâu và nên mềm ở đâu.`,
        `Trong nghề nghiệp, ${careerLensFor(seed, evidence)} Phần nghề còn cần nhớ: ${genderVoice.careerGuardrail}. Trong tài chính, ${moneyLensFor(seed, evidence)} Lời khuyên an toàn cho ${contextWithCung} là đưa mọi khoản lớn về giấy tờ, mốc dừng và người kiểm tra chéo.`,
      ],
    },
    {
      heading: `Công danh, tài chính và Tài lộc của ${genderNoun(seed)} tuổi ${evidence.lifeStage.age}`,
      content: [
        `Ở tuổi ${evidence.lifeStage.age}, bạn nên biến đặc điểm ${voice.strength} thành cách làm có hệ thống: ${voice.workStyle}. Đây là phần life-stage riêng cho ${context}, không phải lời khuyên chung cho mọi nhóm 36-45 hay 26-35; ${genderVoice.workAction}.`,
        `${context} nên chọn một mục tiêu nghề nghiệp, một mục tiêu tiền bạc và một mục tiêu thân tâm cho năm 2026. Với ${context}, mỗi mục tiêu cần một hành động hằng tuần, vì thuật toán tham khảo chỉ có giá trị khi quay về lịch làm việc thật; ${genderVoice.moneyAction}.`,
      ],
    },
    {
      heading: `Tình duyên, gia đạo và Sức khỏe nền của tuổi ${seed.animal}`,
      content: [
        `Trong quan hệ, ${context} nên chú ý cách ${voice.relationshipStyle}. ${context} thuộc tuổi ${seed.animal} có thể rất đáng tin khi đã nhận trách nhiệm, nhưng năm Bính Ngọ cần thêm khả năng nói rõ giới hạn trước khi mệt; ${genderVoice.relationshipFrame}.`,
        `Về sức khỏe nền, ${contextWithCung} nên ${voice.recoveryStyle}. Với ${context}, phần này chỉ là nhắc nhở sinh hoạt theo năm sinh, không thay thế tư vấn y tế hoặc kiểm tra chuyên môn khi có dấu hiệu bất thường; ${genderVoice.wellbeingAction}.`,
      ],
    },
    {
      heading: `Lời khuyên khi dùng bài tuổi ${seed.canChi} trước khi lập lá số cá nhân`,
      content: [
        `Theo Tam Hợp Phái / 《紫微斗数全书》, bài này chỉ đọc các lớp tổng quan theo năm sinh và giới tính của ${context}. Lá số cá nhân của ${contextWithCung} vẫn cần ngày giờ sinh để an Mệnh Cung, Thân Cung, Cục và vị trí sao trong 12 cung, nên ${genderVoice.appReason}.`,
        `Bạn có thể dùng bài viết như bản đồ thảo luận cho ${context}: ghi lại điều cần làm, điều cần hỏi người thân và điều cần kiểm chứng bằng dữ liệu riêng. Khi muốn đọc sâu hơn, hãy lập lá số cá nhân thay vì suy luận toàn bộ cuộc đời từ năm sinh; ${genderVoice.decisionFilter}.`,
      ],
    },
  ]
}

function buildFaqs(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): Array<{ question: string; answer: string }> {
  const label = audience(seed)
  const voice = voiceFor(seed)
  const genderVoice = genderVoiceFor(seed, evidence, voice)
  const role = genderNoun(seed)
  const context = articleContext(seed, evidence)
  const contextWithCung = articleContextWithCung(seed, evidence)
  const templateIndex = (seed.year + (seed.gender === 'nam' ? 0 : 1)) % 3

  const relationAnswerTemplates = [
    `Điểm chính của ${context} nằm ở nhịp Can ${evidence.thienCan} và Chi ${evidence.diaChi}: Can gặp Bính là ${evidence.thienCanRelationToBinh.label}, Chi gặp Ngọ là ${evidence.diaChiRelationToNgo.label}. Bạn nên xem đây là bản đồ chọn hành động; ${genderVoice.decisionFilter}.`,
    `Có hai lớp cần đọc cùng lúc cho ${contextWithCung}. Với ${context}, Thiên Can báo ${evidence.thienCanRelationToBinh.label}, còn Địa Chi báo ${evidence.diaChiRelationToNgo.label}; vì vậy bản mệnh nên đi từng bước và kiểm chứng bằng việc thật, không xem như lời tiên đoán cố định.`,
    `Bói Toán đọc năm Bính Ngọ qua cả Can và Chi của ${context}: ${evidence.thienCanRelationToBinh.detail} Ở lớp Chi của ${context}, ${evidence.diaChiRelationToNgo.detail} Lời nhắc thực tế là ${genderVoice.decisionFilter}.`,
  ]
  const cungAnswerTemplates = [
    `${contextWithCung} đặt trọng tâm vào môi trường sống, cách giữ lời, quy tắc tiền bạc và nhịp nghỉ. Với ${context}, lớp này chỉ là tham khảo theo Cung mệnh, không thay lá số cá nhân.`,
    `Khi nhìn qua ${contextWithCung} thuộc ${evidence.cungMenh.element}, bạn nên hỏi mình đang giữ nền ở đâu và bị lệch ở đâu. Điểm cần nhớ là ${genderVoice.openingFrame}.`,
    `Cung ${evidence.cungMenh.name} không cho kết luận cố định với ${context}; nó chỉ gợi ý cách đặt nền quyết định. Bản mệnh ở ${contextWithCung} nên dùng lớp này để kiểm tra thói quen sống, tiền bạc và cách nghỉ ngơi.`,
  ]
  const napAmAnswerTemplates = [
    `Nạp âm ${evidence.napAm.name} giúp ${context} định hướng cách dùng năng lực trong nghề và cách giữ dòng tiền. Lời nhắc an toàn là ${genderVoice.moneyAction}.`,
    `Với nạp âm ${evidence.napAm.name}, phần công việc của ${context} nên đi theo hướng hợp năng lực tích lũy; phần tiền bạc cần ngân sách và mốc dừng rõ. Khi quyết định lớn của ${context}, bạn vẫn nên hỏi chuyên gia phù hợp.`,
    `Lời nhắc từ nạp âm ${evidence.napAm.name} cho ${context}: nghề nghiệp cần chọn đúng vai trò, còn tài chính cần thấy rõ dòng tiền. Bói Toán chỉ đưa góc tham khảo cho ${contextWithCung}, không thay tư vấn tài chính chuyên môn.`,
  ]

  return [
    {
      question: `${seed.canChi} ${seed.genderLabel} gặp năm Bính Ngọ 2026 có điểm gì đáng chú ý?`,
      answer: relationAnswerTemplates[templateIndex],
    },
    {
      question: `Cung ${evidence.cungMenh.name} ${evidence.cungMenh.element} gợi ý gì cho tuổi ${seed.canChi} ${seed.genderLabel}?`,
      answer: cungAnswerTemplates[templateIndex],
    },
    {
      question: `Nạp âm ${evidence.napAm.name} gợi gì cho ${genderNoun(seed)} tuổi ${seed.canChi}?`,
      answer: napAmAnswerTemplates[templateIndex],
    },
    {
      question: `Bài ${label} này có phải kết luận số mệnh cá nhân không?`,
      answer: `Không. Bài ${label} là nội dung tham khảo theo năm sinh và giới tính; nó không thay thế tư vấn chuyên môn hoặc lá số cá nhân có ngày giờ sinh.`,
    },
    {
      question: `Bài tổng quan tuổi ${seed.canChi} ${seed.genderLabel} khác gì lá số cá nhân trên app Bói Toán?`,
      answer: `Bài tổng quan này đọc theo năm sinh và giới tính của ${context}. Với ${context}, lá số cá nhân trên app Bói Toán cần ngày giờ sinh để an Mệnh Cung, Thân Cung, Cục và vị trí 108 sao tại 12 cung, nên phù hợp hơn khi bạn muốn xem phần riêng của mình; ${genderVoice.appReason}.`,
    },
  ]
}

function buildDescription(seed: SeoForecastSeed, evidence: YearForecastDomainEvidence): string {
  return `Bài phân tích tử vi 2026 cho tuổi ${seed.canChi} ${seed.genderLabel}: công việc, tài chính, tình duyên, sức khỏe theo Can ${evidence.thienCan}, Chi ${evidence.diaChi}, nạp âm ${evidence.napAm.name} và Cung ${evidence.cungMenh.name}.`
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
  if (!isPhase3CohortSeed(seed) && !isPhase4CohortSeed(seed)) return null

  const domainEvidence = deriveYearForecastDomainEvidence(seed)
  const regenerationInput = buildYearForecastRegenerationInput(seed)
  const title = buildTitle(seed)
  const voice = voiceFor(seed)
  const ctaModules = buildCtaModules(seed, domainEvidence, voice)
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
    contentOrigin: isPhase4CohortSeed(seed) ? 'phase4-batch-offline-regenerated' : 'phase3-batch-offline-regenerated',
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
