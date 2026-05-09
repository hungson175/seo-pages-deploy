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

export type YearForecastPhase2PilotSlug = (typeof YEAR_FORECAST_PHASE2_PILOT_SLUGS)[number]

export interface YearForecastPilotSection {
  heading: string
  content: string[]
}

export interface YearForecastPilotArticle {
  slug: YearForecastPhase2PilotSlug
  title: string
  h1: string
  description: string
  methodNote: string
  domainEvidence: YearForecastDomainEvidence
  regenerationInput: YearForecastRegenerationInput
  summaryRows: SummaryRow[]
  intro: string[]
  sections: YearForecastPilotSection[]
  faqs: Array<{ question: string; answer: string }>
  contentOrigin: 'phase2-pilot-offline-regenerated'
  reviewStatus: 'needs-domain-copy-seo-review'
}

type PilotDraftFactory = (seed: SeoForecastSeed, evidence: YearForecastDomainEvidence) => Omit<
  YearForecastPilotArticle,
  'slug' | 'title' | 'h1' | 'description' | 'domainEvidence' | 'regenerationInput' | 'contentOrigin' | 'reviewStatus'
>

function isPilotSlug(slug: string): slug is YearForecastPhase2PilotSlug {
  return YEAR_FORECAST_PHASE2_PILOT_SLUGS.includes(slug as YearForecastPhase2PilotSlug)
}

function buildTitle(seed: SeoForecastSeed): string {
  return `Tử vi tuổi ${seed.canChi} ${seed.year} ${seed.genderLabel} năm 2026`
}

function standardMethodNote(evidence: YearForecastDomainEvidence): string {
  return `Bản pilot cho ${evidence.canChi} ${evidence.genderLabel} dùng Can Chi, nạp âm, Cung mệnh, quan hệ với năm ${evidence.targetYearCanChi} và tham chiếu Tam Hợp Phái / 《紫微斗数全书》; đây là nội dung tham khảo, không phải lời tiên đoán.`
}

function articleWordCount(article: Pick<YearForecastPilotArticle, 'h1' | 'intro' | 'summaryRows' | 'sections' | 'faqs'>): number {
  const text = [
    article.h1,
    ...article.intro,
    ...article.summaryRows.flatMap((row) => [row.aspect, row.trend, row.action]),
    ...article.sections.flatMap((section) => [section.heading, ...section.content]),
    ...article.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ')
  return text.trim().split(/\s+/).filter(Boolean).length
}

const PILOT_FACTORIES: Record<YearForecastPhase2PilotSlug, PilotDraftFactory> = {
  'tuoi-ty-1984-nam': (_seed, evidence) => ({
    methodNote: standardMethodNote(evidence),
    intro: [
      `Nam mạng ${evidence.canChi} sinh năm ${evidence.year} bước vào năm ${evidence.targetYearCanChi} với hai tín hiệu cần đọc cùng nhau: nạp âm ${evidence.napAm.name} thuộc ${evidence.napAm.element} và Cung mệnh ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element}. Đây không phải kiểu xem một câu tốt xấu; bài pilot này chỉ gom các lớp thông tin nền để người đọc tự chọn cách hành động tỉnh táo hơn.`,
      `Ở tuổi âm ${evidence.lifeStage.age}, trọng tâm của nam Giáp Tý không còn là chứng minh mình làm được nhiều việc. Giai đoạn ${evidence.lifeStage.bucket} nghiêng về ${evidence.lifeStage.focus}, nên năm 2026 nên được dùng để rà lại hệ thống trách nhiệm, dòng tiền, sức bền và vai trò trong gia đình.`,
      `${evidence.thienCanRelationToBinh.detail} Đồng thời ${evidence.diaChiRelationToNgo.detail} Vì thế một năm có lực đẩy cũng có lực va chạm; càng muốn tiến nhanh, bản mệnh càng nên đặt nguyên tắc trước khi bước vào cam kết lớn.`,
    ],
    summaryRows: [
      {
        aspect: 'Trọng tâm vận trình',
        trend: `Giáp gặp Bính là ${evidence.thienCanRelationToBinh.label}, nhưng Tý gặp Ngọ là ${evidence.diaChiRelationToNgo.label}.`,
        action: 'Dùng năng lực tổ chức để nuôi mục tiêu lớn, đồng thời tránh phản ứng nóng khi lịch trình bị đảo chiều.',
      },
      {
        aspect: 'Công việc',
        trend: evidence.napAm.careerLens,
        action: 'Chọn một hệ thống cần củng cố, giao bớt việc lặp lại và đo kết quả bằng mốc quý thay vì cảm giác bận.',
      },
      {
        aspect: 'Tài chính',
        trend: evidence.napAm.moneyLens,
        action: 'Tách quỹ gia đình, quỹ dự phòng và quỹ thử nghiệm; khoản đứng tên hộ hoặc góp vốn nể nang cần dừng lại để kiểm tra.',
      },
      {
        aspect: 'Quan hệ',
        trend: `Tính ${evidence.animalTraits.traits[0]} của tuổi Tý giúp xoay xở, nhưng dễ làm người thân nghĩ bản mệnh không cần hỗ trợ.`,
        action: 'Nói rõ điều mình đang gánh trước khi im lặng biến thành khoảng cách.',
      },
      {
        aspect: 'Sức bền',
        trend: `Cung ${evidence.cungMenh.name} ${evidence.cungMenh.element} cần nền sinh hoạt ổn định để giữ quyết định không lệch.`,
        action: 'Lên lịch nghỉ trước, không chờ kiệt sức mới xin khoảng trống.',
      },
    ],
    sections: [
      {
        heading: 'Tổng quan riêng cho Giáp Tý nam mạng',
        content: [
          `Giáp Tý mang hình ảnh người biết gom từng cơ hội nhỏ thành lợi thế dài hạn. Khi nạp âm ${evidence.napAm.name} được đọc trong bối cảnh năm Bính Ngọ, điểm đáng chú ý không phải là may mắn bất ngờ, mà là khả năng giữ chuẩn khi bên ngoài thay đổi nhanh. Bản mệnh nên coi 2026 như năm kiểm tra độ chắc của lịch làm việc, nguyên tắc tiền bạc và cách phân quyền.`,
          `Tuổi Tý có nét ${evidence.animalTraits.traits.join(', ')}. Ba nét này tạo lợi thế khi xử lý việc khó, nhưng cũng khiến nam mạng dễ tự nhận mình phải biết trước mọi rủi ro. Nếu một kế hoạch đòi hỏi quá nhiều phán đoán ngầm, hãy đưa nó ra giấy, chia thành giả định rõ ràng và chỉ mở rộng sau khi dữ liệu đầu tiên đủ tin cậy.`,
        ],
      },
      {
        heading: 'Thiên Can Giáp gặp Bính: dùng sinh lực cho đúng việc',
        content: [
          `${evidence.thienCanRelationToBinh.detail} Lớp tương sinh này thuận cho học thêm, nâng cấp hệ thống và đưa kinh nghiệm cá nhân thành phương pháp có thể lặp lại. Tuy nhiên sinh lực không đồng nghĩa với ôm thêm mọi lời nhờ vả. Nếu bản mệnh đang ở vai trò quản lý hoặc trụ cột, năm này càng cần biết việc nào nuôi tương lai và việc nào chỉ nuôi cảm giác mình còn kiểm soát được mọi thứ.`,
          `${evidence.thienCanRelationToBinh.recommendationLens} Một lựa chọn tốt trong năm 2026 nên vượt qua ba câu hỏi: có giúp tăng uy tín thật không, có làm dòng tiền bền hơn không, và có giảm rối cho gia đình không. Nếu chỉ thỏa mãn sĩ diện hoặc cảm giác thắng nhanh, nên đặt nó vào danh sách theo dõi thay vì triển khai ngay.`,
        ],
      },
      {
        heading: 'Địa Chi Tý xung Ngọ: tránh để tốc độ kéo lệch nền',
        content: [
          `${evidence.diaChiRelationToNgo.detail} Với nam Giáp Tý, xung không nên hiểu là xấu tuyệt đối; nó là dấu hiệu cần chủ động sắp lại nhịp. Năm này dễ xuất hiện việc phải đổi lịch, đổi vai, hoặc xử lý một cam kết cũ đã không còn phù hợp. Cách đi an toàn là không phủ nhận biến động, nhưng cũng không quyết định trong lúc tự ái bị chạm.`,
          `${evidence.diaChiRelationToNgo.recommendationLens} Khi có xung, bản mệnh nên dùng nguyên tắc họp ngắn, ghi rõ quyết định và hẹn ngày rà soát. Việc này nghe khô, nhưng rất hợp với tuổi Tý vì nó biến sự nhanh nhạy thành hệ thống, thay vì để trí nhớ và cảm giác gánh quá nhiều vai trò cùng lúc.`,
        ],
      },
      {
        heading: 'Cung mệnh Đoài Kim và nạp âm Hải Trung Kim',
        content: [
          `Cung mệnh ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element} đặt trọng tâm vào chuẩn mực, lời nói và khả năng cắt bỏ phần thừa. Nạp âm ${evidence.napAm.name} cũng thuộc ${evidence.napAm.element}, nên bài học nổi bật là Kim cần được luyện trong trật tự, không phải cứ thêm áp lực là tốt. Nam mạng nên chọn môi trường có quy tắc rõ, hợp đồng rõ và tiêu chí đánh giá minh bạch.`,
          `Trong công việc, ${evidence.napAm.careerLens} Trong tiền bạc, ${evidence.napAm.moneyLens} Vì vậy năm 2026 nên giảm các khoản đầu tư chỉ dựa trên quan hệ thân quen. Một khoản có vẻ nhỏ nhưng thiếu giấy tờ vẫn có thể làm mòn sự an tâm của cả gia đình.`,
        ],
      },
      {
        heading: 'Công việc và vai trò trụ cột ở tuổi 43',
        content: [
          `${evidence.lifeStage.adviceLens} Ở tuổi ${evidence.lifeStage.age}, nam Giáp Tý thường không thiếu kinh nghiệm; cái thiếu dễ là thời gian yên tĩnh để chọn việc cần bỏ. Nếu công việc hiện tại có quá nhiều đầu mối phụ thuộc vào mình, năm này nên biến tri thức cá nhân thành checklist, tài liệu, người kế nhiệm hoặc quy trình bàn giao.`,
          `Một dấu hiệu thuận là khi bản mệnh có thể nghỉ một ngày mà hệ thống vẫn chạy. Một dấu hiệu cần chỉnh là mọi người chỉ tìm đến mình khi có lỗi, còn thành quả thì không ai biết cách đo. Tử vi ứng dụng ở đây không hứa chức vụ; nó nhắc người đọc đưa vận trình về hành động quản trị cụ thể.`,
        ],
      },
      {
        heading: 'Gia đạo, sức khỏe nền và cách hạ áp lực',
        content: [
          `Tuổi Tý thường xử lý lo lắng bằng cách làm thêm một việc nữa. Năm Bính Ngọ lại dễ kích hoạt nhịp nhanh, nên người thân có thể chỉ thấy bản mệnh bận, chứ không thấy phần mệt ở phía sau. Cách hóa giải không phải than thở, mà là nói rõ việc nào cần chia lại, khoản nào đang gây áp lực và lúc nào mình cần nghỉ thật sự.`,
          `Phần sức khỏe trong bài theo năm sinh chỉ là nhắc nhở giữ nền, không thay thế tư vấn y tế. Nam mạng nên ưu tiên ngủ đúng giờ hơn, đi bộ đều, giảm các cuộc hẹn không cần thiết và kiểm tra chuyên môn khi có dấu hiệu bất thường. Khi thân tâm ổn, quyết định tài chính và gia đình cũng ít bị kéo bởi cảm giác thiếu an toàn.`,
        ],
      },
      {
        heading: 'Gợi ý thực hành theo quý',
        content: [
          `Quý đầu nên kiểm kê các cam kết đang chiếm thời gian. Quý giữa nên chọn một hệ thống để cải tiến sâu, chẳng hạn quy trình làm việc, ngân sách gia đình hoặc cách chăm khách hàng. Quý cuối nên đóng việc dang dở và ghi lại bài học, đặc biệt là những quyết định từng khiến bản mệnh mất ngủ.`,
          `Theo tinh thần Tam Hợp Phái / 《紫微斗数全书》, bài này chỉ đọc các lớp tổng quan theo năm sinh và giới tính. Lá số cá nhân vẫn cần ngày giờ sinh, Mệnh Cung, Thân Cung và vị trí sao. Vì vậy người đọc nên dùng bản pilot như bản đồ thảo luận, không dùng nó để thay quyết định chuyên môn.`,
        ],
      },
    ],
    faqs: [
      {
        question: 'Nam Giáp Tý 1984 gặp năm Bính Ngọ 2026 có điểm gì đáng chú ý?',
        answer: `Điểm chính là Giáp gặp Bính có thế ${evidence.thienCanRelationToBinh.label}, còn Tý gặp Ngọ là ${evidence.diaChiRelationToNgo.label}. Một bên giúp nuôi động lực, một bên buộc bản mệnh quản trị va chạm tốt hơn.`,
      },
      {
        question: 'Cung mệnh Đoài Kim gợi ý gì cho cách làm việc?',
        answer: 'Đoài Kim hợp với lời nói rõ, chuẩn mực rõ và tiêu chí rõ. Năm 2026 nên giảm quyết định cảm tính, tăng hợp đồng, checklist và cơ chế kiểm tra chéo.',
      },
      {
        question: 'Hải Trung Kim nên chú ý tài chính thế nào?',
        answer: 'Hải Trung Kim cần giữ nền trước khi mở rộng. Nam mạng nên ưu tiên dự phòng, minh bạch giấy tờ và tránh góp vốn chỉ vì nể quan hệ.',
      },
      {
        question: 'Bài pilot này có thay lá số cá nhân không?',
        answer: 'Không. Đây là nội dung tham khảo theo năm sinh và giới tính; lá số cá nhân cần ngày giờ sinh để an đủ cung và sao.',
      },
    ],
  }),

  'tuoi-suu-1985-nu': (_seed, evidence) => ({
    methodNote: standardMethodNote(evidence),
    intro: [
      `Nữ mạng ${evidence.canChi} sinh năm ${evidence.year} đi vào năm ${evidence.targetYearCanChi} với cấu trúc nền rất khác Giáp Tý: nạp âm vẫn là ${evidence.napAm.name}, nhưng Cung mệnh chuyển sang ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element}. Bài pilot này viết lại từ dữ liệu domain, không dùng lại những đoạn mô tả cũ theo giới tính.`,
      `Tuổi âm ${evidence.lifeStage.age} đặt nữ Ất Sửu vào giai đoạn ${evidence.lifeStage.bucket}, nơi ${evidence.lifeStage.focus} quan trọng hơn việc chịu đựng thêm cho yên nhà. Nếu năm trước đã quen làm người giữ nhịp cho nhiều người, 2026 nên là năm đặt lại ranh giới mềm nhưng rõ.`,
      `${evidence.thienCanRelationToBinh.detail} Song song đó, ${evidence.diaChiRelationToNgo.detail} Hai lớp này cho thấy năm mới không nhất thiết nặng, nhưng đòi hỏi bản mệnh nói sớm điều chưa ổn và không để trách nhiệm âm thầm trở thành mệt mỏi kéo dài.`,
    ],
    summaryRows: [
      {
        aspect: 'Nền vận',
        trend: `Ất gặp Bính là ${evidence.thienCanRelationToBinh.label}; Sửu gặp Ngọ là ${evidence.diaChiRelationToNgo.label}.`,
        action: 'Nuôi việc tốt bằng sự đều đặn, nhưng xử lý sớm cảm giác bị thiệt hoặc phải gánh hộ.',
      },
      {
        aspect: 'Công việc',
        trend: `Với nữ Ất Sửu, ${evidence.napAm.careerLens}`,
        action: 'Chọn vai trò có chuẩn đầu ra rõ, tránh ôm cả việc chuyên môn lẫn phần cảm xúc của tập thể.',
      },
      {
        aspect: 'Tài chính',
        trend: `Riêng dòng tiền của nữ Ất Sửu nên nhớ: ${evidence.napAm.moneyLens}`,
        action: 'Ghi ngân sách theo nhóm nhu cầu, đặt giới hạn cho khoản chi vì thương người hoặc vì muốn giữ hòa khí.',
      },
      {
        aspect: 'Tình cảm',
        trend: `Tuổi Sửu có nét ${evidence.animalTraits.traits[1]}, nên tình cảm cần hành động bền hơn lời hứa đẹp.`,
        action: 'Trao đổi việc nhà, tiền chung và thời gian nghỉ bằng câu cụ thể, không chờ người khác tự hiểu.',
      },
      {
        aspect: 'Thân tâm',
        trend: `Cung ${evidence.cungMenh.name} ${evidence.cungMenh.element} cần ánh sáng rõ ràng, không hợp với bầu không khí lửng lơ.`,
        action: 'Dọn một mối bận tâm tồn đọng trước khi nhận thêm trách nhiệm mới.',
      },
    ],
    sections: [
      {
        heading: 'Tổng quan dành riêng cho Ất Sửu nữ mạng',
        content: [
          `Ất Sửu thường được nhìn bằng hình ảnh bền bỉ, nhưng nếu chỉ nói bền bỉ thì quá ít. Ba nét con giáp nổi bật ở đây là ${evidence.animalTraits.traits.join(', ')}. Năm Bính Ngọ khiến những nét này cần được dùng có giới hạn; càng đáng tin, bản mệnh càng phải biết đâu là phần của mình và đâu là phần người khác cần tự trưởng thành.`,
          `Nạp âm ${evidence.napAm.name} thuộc ${evidence.napAm.element} không phải lớp thông tin trang trí. Nó nhắc nữ mạng về năng lực tích lũy kín đáo, giữ giá trị bên trong và làm việc tốt khi môi trường đủ trật tự. Nếu năm 2026 có biến động, câu hỏi nên đặt ra là điều gì cần giữ, điều gì cần nói ra và điều gì nên trả lại cho đúng người chịu trách nhiệm.`,
        ],
      },
      {
        heading: 'Ất gặp Bính: nuôi lửa mà không tự đốt mình',
        content: [
          `${evidence.thienCanRelationToBinh.detail} Với nữ Ất Sửu, thế tương sinh này thuận cho việc học một kỹ năng mới, nâng chất lượng dịch vụ, hoặc đưa kinh nghiệm chăm sóc thành giá trị nghề nghiệp. Tuy vậy Mộc sinh Hỏa cũng có thể thành hình ảnh bản mệnh đem sức mình nuôi nhịp của người khác quá lâu.`,
          `${evidence.thienCanRelationToBinh.recommendationLens} Trước mỗi lời nhờ vả, nên hỏi mình có thật sự muốn nhận hay chỉ sợ làm người khác buồn. Một năm tốt không phải năm không ai phiền mình, mà là năm bản mệnh biết dùng sự tử tế đúng liều lượng và không đánh mất thời gian hồi phục.`,
        ],
      },
      {
        heading: 'Sửu gặp Ngọ: nhận diện những va chạm âm thầm',
        content: [
          `${evidence.diaChiRelationToNgo.detail} Tương hại thường không ồn ào như xung, nhưng dễ thành cảm giác ấm ức vì những điều nhỏ lặp lại. Nữ Ất Sửu nên đặc biệt chú ý các thỏa thuận không thành lời: ai trả khoản nào, ai chăm việc nào, ai được nghỉ và ai luôn phải linh động.`,
          `${evidence.diaChiRelationToNgo.recommendationLens} Cách hóa giải phù hợp là viết lại cam kết bằng ngôn ngữ nhẹ. Không cần biến mọi cuộc nói chuyện thành tranh luận; chỉ cần đủ rõ để người thân, đồng nghiệp hoặc đối tác biết ranh giới mới nằm ở đâu.`,
        ],
      },
      {
        heading: 'Cung Ly Hỏa và cách làm sáng nhu cầu thật',
        content: [
          `Cung mệnh ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element} khiến năm 2026 nhấn vào sự minh bạch. Ly không hợp với việc giấu mãi điều mình cần rồi hy vọng người khác tự nhận ra. Khi thông tin rõ, nữ Ất Sửu dễ lấy lại cảm giác chủ động; khi thông tin mờ, bản mệnh dễ rơi vào vai người âm thầm chịu thiệt.`,
          `Trong nghề nghiệp, ${evidence.napAm.careerLens} Điều này phù hợp với người biết giữ chuẩn, xử lý chi tiết và tạo niềm tin qua thời gian. Ở riêng nữ Ất Sửu, ${evidence.napAm.moneyLens} Vì thế bản mệnh nên có bảng dòng tiền đơn giản, không cần cầu kỳ nhưng phải nhìn được khoản nào đang chi vì thương và khoản nào thật sự giúp tương lai.`,
        ],
      },
      {
        heading: 'Tuổi 42: củng cố sự nghiệp mà không quên đời sống riêng',
        content: [
          `${evidence.lifeStage.adviceLens} Với nữ mạng ở tuổi ${evidence.lifeStage.age}, câu chuyện không chỉ là thăng tiến. Đó còn là cách giữ một đời sống riêng đủ mạnh để công việc, gia đình và trách nhiệm chăm sóc không nuốt mất tiếng nói cá nhân.`,
          `Một mục tiêu đẹp cho năm 2026 là có lịch cố định cho việc học, nghỉ và kiểm tra tài chính. Nếu bản mệnh đang kinh doanh nhỏ, làm dịch vụ hoặc giữ vai trò điều phối, hãy tách rõ giờ trả lời người khác và giờ làm việc sâu. Ranh giới thời gian chính là một dạng tài sản.`,
        ],
      },
      {
        heading: 'Gia đạo và tình cảm: tử tế nhưng không tự xóa mình',
        content: [
          `Tuổi Sửu có xu hướng chứng minh tình thương bằng hành động bền bỉ. Điểm mạnh này quý, nhưng năm Ngọ có thể làm nổi lên cảm giác mình cho nhiều hơn nhận. Thay vì giữ trong lòng tới lúc mệt, nữ Ất Sửu nên chọn một cuộc nói chuyện ngắn mỗi tuần về việc đang vướng, khoản chi đang lo hoặc sự hỗ trợ mình cần.`,
          `Nếu độc thân, tiêu chí không nên chỉ là người kia có cảm xúc hay không. Hãy nhìn cách họ tôn trọng lịch của bạn, cách họ nói về tiền, và cách họ xử lý khi bạn từ chối. Nếu đã có gia đình, đừng xem bình yên là trạng thái không ai nói gì; bình yên thật cần sự công bằng có thể nhìn thấy.`,
        ],
      },
      {
        heading: 'Khuyến nghị thực hành cho năm 2026',
        content: [
          `Quý đầu nên dọn một nghĩa vụ cũ. Quý giữa nên đưa kỹ năng hoặc sản phẩm của mình ra thị trường bằng cách nhỏ, đo được và không làm cạn sức. Quý cuối nên nhìn lại khoản tiền nào giúp mình tự do hơn, khoản nào chỉ giữ hình ảnh chu đáo trước mặt người khác.`,
          `Theo Tam Hợp Phái / 《紫微斗数全书》, bài theo năm sinh không thể thay lá số cá nhân vì thiếu ngày giờ sinh và vị trí sao tại 12 cung. Nội dung này vì vậy chỉ nên dùng để soi thói quen, đặt câu hỏi và chuẩn bị cuộc nói chuyện cần thiết với người liên quan.`,
        ],
      },
    ],
    faqs: [
      {
        question: 'Nữ Ất Sửu 1985 gặp Bính Ngọ 2026 nên chú ý gì nhất?',
        answer: `Ất gặp Bính có thế ${evidence.thienCanRelationToBinh.label}, còn Sửu gặp Ngọ là ${evidence.diaChiRelationToNgo.label}. Trọng tâm là nuôi việc tốt nhưng không để trách nhiệm nhỏ tích lại thành ấm ức.`,
      },
      {
        question: 'Cung Ly Hỏa có ý nghĩa gì trong bài pilot này?',
        answer: 'Ly Hỏa nhấn vào sự sáng rõ. Nữ mạng nên nói nhu cầu, lịch nghỉ, tiền chung và ranh giới bằng ngôn ngữ dễ hiểu hơn.',
      },
      {
        question: 'Hải Trung Kim có hợp với đầu tư mạo hiểm không?',
        answer: 'Bài này không khuyến nghị đầu tư mạo hiểm. Hải Trung Kim nên giữ nền, kiểm tra giấy tờ và ưu tiên quỹ an toàn trước khi mở rộng.',
      },
      {
        question: 'Có cần ngày giờ sinh để xem kỹ hơn không?',
        answer: 'Có. Bài này chỉ là tổng quan theo năm sinh và giới tính; lá số cá nhân cần ngày giờ sinh để an Mệnh, Thân, Cục và sao.',
      },
    ],
  }),

  'tuoi-dan-1986-nam': (_seed, evidence) => ({
    methodNote: standardMethodNote(evidence),
    intro: [
      `Nam mạng ${evidence.canChi} sinh năm ${evidence.year} bước vào ${evidence.targetYearCanChi} với nạp âm ${evidence.napAm.name} thuộc ${evidence.napAm.element} và Cung mệnh ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element}. Đây là một lá bài khác hẳn hai pilot trước: khí Hỏa của nạp âm gặp năm Hỏa, còn Dần gặp Ngọ tạo thế tam hợp thúc đẩy hành động.`,
      `Tuổi âm ${evidence.lifeStage.age} đặt nam Bính Dần trong giai đoạn ${evidence.lifeStage.bucket}: ${evidence.lifeStage.focus}. Nếu bản mệnh đang đứng trước cơ hội mở rộng, năm 2026 nên hỏi cách mở nào làm hệ thống mạnh hơn, chứ không chỉ hỏi cơ hội nào khiến mình thấy hưng phấn hơn.`,
      `${evidence.thienCanRelationToBinh.detail} Cùng lúc, ${evidence.diaChiRelationToNgo.detail} Hai lớp tín hiệu đều tăng khí thế, vì vậy bài pilot này tập trung vào quản trị lửa: dùng nó để xây, không dùng nó để đốt hết nhịp nghỉ và quan hệ quan trọng.`,
    ],
    summaryRows: [
      {
        aspect: 'Nền vận',
        trend: `Bính gặp Bính là ${evidence.thienCanRelationToBinh.label}; Dần gặp Ngọ là ${evidence.diaChiRelationToNgo.label}.`,
        action: 'Cho phép mình tiến, nhưng mỗi bước mở rộng phải có người phản biện và giới hạn rủi ro.',
      },
      {
        aspect: 'Công việc',
        trend: evidence.napAm.careerLens,
        action: 'Chọn chiến trường có đòn bẩy rõ, tránh nhảy giữa nhiều ý tưởng chỉ vì ý tưởng nào cũng tạo cảm giác mạnh.',
      },
      {
        aspect: 'Tài chính',
        trend: evidence.napAm.moneyLens,
        action: 'Đặt trần thử nghiệm, ghi rõ mốc dừng và không dùng tiền dự phòng để chứng minh bản lĩnh.',
      },
      {
        aspect: 'Quan hệ',
        trend: `Tuổi Dần có nét ${evidence.animalTraits.traits[0]} và ${evidence.animalTraits.traits[1]}.`,
        action: 'Khi dẫn dắt, hãy nói rõ kỳ vọng; khi bất đồng, hãy giảm tốc trước khi kết luận người khác chậm.',
      },
      {
        aspect: 'Sức bền',
        trend: `Cung ${evidence.cungMenh.name} ${evidence.cungMenh.element} cần nền ổn định để Hỏa khí không thành nóng vội.`,
        action: 'Đưa giấc ngủ, vận động và khoảng trống gia đình vào kế hoạch như chỉ số vận hành.',
      },
    ],
    sections: [
      {
        heading: 'Tổng quan riêng cho Bính Dần nam mạng',
        content: [
          `Bính Dần thường không thiếu ý chí. Ba nét con giáp nổi bật là ${evidence.animalTraits.traits.join(', ')}, nên khi gặp năm Bính Ngọ, bản mệnh dễ thấy nhiều cánh cửa cùng mở. Điểm cần nhớ là cơ hội thật không chỉ làm mình phấn khích; nó phải chịu được lịch triển khai, ngân sách và trách nhiệm sau khi hào hứng ban đầu đi qua.`,
          `Nạp âm ${evidence.napAm.name} khiến câu chuyện nghề nghiệp mang màu của lửa trong lò: lửa có ích khi được đặt trong khuôn, còn lửa tràn ra ngoài thì làm hao sức. Năm 2026 vì thế hợp với người biết biến tham vọng thành quy trình, chứ không hợp với kiểu lao lên để thắng cảm giác bị chậm.`,
        ],
      },
      {
        heading: 'Bính gặp Bính: khí thế mạnh cần có phanh',
        content: [
          `${evidence.thienCanRelationToBinh.detail} Tỷ kiên tạo cảm giác tự chủ, nhưng cũng làm cái tôi dễ nổi rõ. Nam Bính Dần nên xem mọi quyết định lớn qua lăng kính đội nhóm: nếu chỉ mình thấy đúng, cần thêm dữ liệu; nếu người khác góp ý mà mình lập tức khó chịu, có thể vấn đề nằm ở tốc độ phản ứng.`,
          `${evidence.thienCanRelationToBinh.recommendationLens} Năm này nên có một người phản biện đủ tin, một bảng rủi ro đủ thẳng, và một mốc dừng đủ cụ thể. Khi ba điều đó có mặt, khí thế Bính Hỏa mới trở thành năng lượng xây dựng thay vì vòng xoáy tự chứng minh.`,
        ],
      },
      {
        heading: 'Dần tam hợp Ngọ: cơ hội mở rộng có điều kiện',
        content: [
          `${evidence.diaChiRelationToNgo.detail} Tam hợp đem lại cảm giác thuận đà, đặc biệt với các việc cần xuất hiện, thuyết phục, bán hàng, lãnh đạo hoặc bắt đầu dự án mới. Tuy nhiên thuận đà không có nghĩa là mọi cửa đều nên đi vào. Bản mệnh cần chọn cửa phù hợp với nguồn lực thật.`,
          `${evidence.diaChiRelationToNgo.recommendationLens} Nếu một dự án yêu cầu bản mệnh làm gấp đôi mà không có thêm người, nó chưa hẳn là cơ hội. Nếu một quan hệ hợp tác chỉ khen tầm nhìn nhưng né chi tiết tiền bạc, nên chậm lại. Tam hợp tốt nhất khi được đặt trong thỏa thuận rõ ràng.`,
        ],
      },
      {
        heading: 'Cung Khôn Thổ giữ nền cho Lư Trung Hỏa',
        content: [
          `Cung mệnh ${evidence.cungMenh.name} thuộc ${evidence.cungMenh.element} là chi tiết quan trọng sau hotfix Cung phi. Khôn Thổ nhắc nam Bính Dần rằng mọi ngọn lửa đều cần nền đỡ. Nếu muốn dẫn dắt người khác, trước hết phải có lịch, quy tắc, tài chính và sức khỏe đủ ổn để người khác tin mình đi đường dài.`,
          `Về nghề, ${evidence.napAm.careerLens} Về tiền, ${evidence.napAm.moneyLens} Đây là lời nhắc rất trực tiếp: bản mệnh có thể kiếm nhanh trong năm có khí thế, nhưng giữ được hay không phụ thuộc vào trần rủi ro, kỷ luật ghi chép và khả năng nói không với cuộc chơi quá nóng.`,
        ],
      },
      {
        heading: 'Tuổi 41: chuyển từ người xông lên sang người dựng hệ thống',
        content: [
          `${evidence.lifeStage.adviceLens} Ở tuổi ${evidence.lifeStage.age}, một phần bản lĩnh nằm ở khả năng không tự làm hết. Nếu bản mệnh đang là người giỏi nhất trong một khâu, nhiệm vụ của năm 2026 là biến khâu đó thành cách làm mà người khác học được.`,
          `Dấu hiệu tiến bộ không chỉ là doanh thu, chức vụ hoặc số dự án. Dấu hiệu tiến bộ còn là đội nhóm bớt phụ thuộc vào tâm trạng của mình, gia đình ít phải đoán lịch của mình và bản thân có thể nghỉ mà không thấy mọi thứ sắp đổ. Đó là kiểu mạnh phù hợp với tuổi 41 hơn kiểu mạnh luôn căng dây.`,
        ],
      },
      {
        heading: 'Tình cảm và gia đạo khi Hỏa khí tăng',
        content: [
          `Nam Bính Dần khi áp lực thường muốn giải quyết nhanh, nhưng người thân không phải lúc nào cũng cần giải pháp ngay. Có lúc họ cần được nghe rằng bản mệnh đang lo gì, sợ gì, hoặc cần khoảng lặng nào. Năm Ngọ có thể làm lời nói sắc hơn, nên hãy chậm một nhịp trước khi biến sự thẳng thắn thành áp đặt.`,
          `Nếu đang trong quan hệ ổn định, nên có lịch bàn chuyện tiền, chuyện con cái hoặc chuyện chăm sóc cha mẹ bằng giọng bình tĩnh. Nếu độc thân, đừng xem người theo kịp tốc độ của mình là tiêu chí duy nhất. Người phù hợp còn cần biết cùng mình hạ nhiệt đúng lúc.`,
        ],
      },
      {
        heading: 'Khuyến nghị thực hành cho năm tam hợp',
        content: [
          `Quý đầu nên chọn một mục tiêu mở rộng và viết ra lý do không chọn các mục tiêu còn lại. Quý giữa nên triển khai thử với ngân sách giới hạn. Quý cuối nên kiểm tra điều gì làm mình tự hào và điều gì làm mình quá tải, vì cả hai đều là dữ liệu quan trọng.`,
          `Theo Tam Hợp Phái / 《紫微斗数全书》, bài pilot này vẫn chỉ là nội dung tham khảo theo năm sinh và giới tính. Nó không thay thế lá số cá nhân, tư vấn y tế, pháp lý hay tài chính. Giá trị thực tế nằm ở việc biến tín hiệu văn hóa thành câu hỏi quản trị đời sống.`,
        ],
      },
    ],
    faqs: [
      {
        question: 'Nam Bính Dần 1986 gặp Bính Ngọ 2026 có thuận không?',
        answer: `Có lực thuận vì Dần gặp Ngọ là ${evidence.diaChiRelationToNgo.label}, nhưng Bính gặp Bính là ${evidence.thienCanRelationToBinh.label} nên bản mệnh phải quản trị cái tôi và tốc độ.`,
      },
      {
        question: 'Cung Khôn Thổ ảnh hưởng gì tới cách hành động?',
        answer: 'Khôn Thổ nhắc người đọc xây nền trước khi mở rộng. Lịch, ngân sách, đội nhóm và sức khỏe cần đủ chắc để Hỏa khí không thành nóng vội.',
      },
      {
        question: 'Lư Trung Hỏa nên chú ý tài chính thế nào?',
        answer: 'Lư Trung Hỏa có động lực mạnh, nhưng tiền bạc cần trần thử nghiệm và mốc dừng rõ. Không nên dùng quỹ an toàn cho quyết định muốn chứng minh bản lĩnh.',
      },
      {
        question: 'Bài này có kết luận số mệnh cá nhân không?',
        answer: 'Không. Đây là bản tham khảo theo năm sinh; muốn đọc cá nhân cần ngày giờ sinh và đầy đủ lá số.',
      },
    ],
  }),
}

export function getYearForecastPilotArticle(seed: SeoForecastSeed): YearForecastPilotArticle | null {
  if (!isPilotSlug(seed.slug)) return null

  const domainEvidence = deriveYearForecastDomainEvidence(seed)
  const regenerationInput = buildYearForecastRegenerationInput(seed)
  const draft = PILOT_FACTORIES[seed.slug](seed, domainEvidence)
  const title = buildTitle(seed)

  return {
    slug: seed.slug,
    title,
    h1: title,
    description: `Pilot nội dung mới cho ${title}: dùng Can Chi, nạp âm, Cung mệnh, quan hệ với Bính Ngọ và life-stage evidence; chưa duyệt để deploy.`,
    domainEvidence,
    regenerationInput,
    contentOrigin: 'phase2-pilot-offline-regenerated',
    reviewStatus: 'needs-domain-copy-seo-review',
    ...draft,
  }
}

export function getYearForecastPilotWordCount(article: YearForecastPilotArticle): number {
  return articleWordCount(article)
}
