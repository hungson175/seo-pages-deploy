import approvedStarPalaceCombinations from './star-palace-approved.json'
import {
  PRIORITY_STAR_SLUGS,
  type PriorityStarSlug,
  getStarFoundationPage,
  isPriorityStarSlug,
} from './stars'
import {
  PALACE_SLUGS,
  type PalaceSlug,
  getPalaceFoundationPage,
  getPalaceTamHop,
  isPalaceSlug,
} from './palaces'

export interface StarPalaceCombinationKey {
  star: PriorityStarSlug
  palace: PalaceSlug
}

export type SensitiveTopicFlag =
  | 'wellbeing'
  | 'resource-management'
  | 'relationship'
  | 'children-family'

export interface StarPalaceSummaryRow {
  aspect: 'Từ khóa chính' | 'Khi đọc thuận' | 'Khi cần cân bằng' | 'Không nên hiểu là' | 'Cần kiểm tra thêm'
  meaning: string
  readingCue: string
}

export interface StarPalaceExample {
  wrong: string
  better: string
}

export interface StarPalaceInternalLink {
  href: string
  label: string
  relation: string
}

export interface StarPalaceTemplateSection {
  heading: string
  writingBrief: string
  requiredLinks: string[]
  content?: string[]
}

interface StarPalaceDraftProfile {
  intersectionThesis: string
  misreadWarning: string
  contextChecklist: string[]
  selfCheckQuestions: string[]
  sensitiveTopicFlags: SensitiveTopicFlag[]
  contrastNotes: string[]
  summaryRows: StarPalaceSummaryRow[]
  wrongVsBetterExamples: StarPalaceExample[]
  sections: Array<{
    key:
      | 'core-interpretation'
      | 'strengths'
      | 'balancing-risks'
      | 'tam-phuong-tu-chinh'
      | 'self-check'
      | 'wrong-vs-better'
      | 'limits'
    content: string[]
  }>
}

export interface StarPalaceDraftPage extends StarPalaceCombinationKey {
  status: 'draft-template'
  indexable: false
  h1: string
  title: string
  description: string
  urlPath: string
  canonicalWhenApproved: string
  methodNote: string
  intersectionThesis: string
  misreadWarning: string
  contextChecklist: string[]
  selfCheckQuestions: string[]
  sensitiveTopicFlags: SensitiveTopicFlag[]
  contrastNotes: string[]
  summaryRows: StarPalaceSummaryRow[]
  wrongVsBetterExamples: StarPalaceExample[]
  faqs: Array<{ question: string; answer: string }>
  internalLinks: StarPalaceInternalLink[]
  qualityGate: string[]
  sections: StarPalaceTemplateSection[]
}

export interface StarPalaceApprovedPage extends Omit<StarPalaceDraftPage, 'status' | 'indexable'> {
  status: 'approved'
  indexable: true
}

export type StarPalacePage = StarPalaceApprovedPage

export const CMO_FIRST_BATCH_STAR_PALACE_COMBINATIONS = [
  { star: 'tu-vi', palace: 'menh' },
  { star: 'vu-khuc', palace: 'tai-bach' },
  { star: 'thai-duong', palace: 'quan-loc' },
  { star: 'thien-co', palace: 'quan-loc' },
  { star: 'thai-am', palace: 'phuc-duc' },
  { star: 'thien-luong', palace: 'tat-ach' },
] as const satisfies readonly StarPalaceCombinationKey[]

// Staged release allow-list. Add combinations only after Bói-Toán, CMO, SEO,
// and CEO approval; sitemap/build scripts consume the same JSON source.
export const APPROVED_STAR_PALACE_COMBINATIONS = approvedStarPalaceCombinations as readonly StarPalaceCombinationKey[]

export function getApprovedStarPalaceCombinations(): readonly StarPalaceCombinationKey[] {
  return APPROVED_STAR_PALACE_COMBINATIONS
}

const STAR_PALACE_DISCLAIMER =
  '* Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Bói Toán là nội dung giải trí và thuật toán tham khảo theo văn hóa Tử Vi; không dùng bài viết này để thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.'

export const MIN_STAR_PALACE_WORDS = 1500

function comboKey(star: PriorityStarSlug, palace: PalaceSlug): string {
  return `${star}:${palace}`
}

const FIRST_BATCH_DRAFT_PROFILES: Record<string, StarPalaceDraftProfile> = {
  [comboKey('tu-vi', 'menh')]: {
    intersectionThesis:
      'Tử Vi đem năng lực lập trật tự và gánh trách nhiệm; cung Mệnh là khí chất gốc và quyền chủ động cá nhân; câu hỏi hữu ích là người này đang dùng trách nhiệm để tạo cấu trúc hay để kiểm soát mọi thứ.',
    misreadWarning:
      'Không nên đọc Tử Vi ở Mệnh như dấu hiệu “sinh ra để làm vua” hoặc chắc chắn có quyền vị; cách đọc an toàn là xem xu hướng tự chủ, nhu cầu giữ trục và khả năng phân quyền trong bối cảnh thật.',
    contextChecklist: [
      'So Mệnh với Thân Cung để biết khí chất ban đầu có chuyển thành hành vi trưởng thành không.',
      'Kiểm tra tam hợp Mệnh - Quan Lộc - Tài Bạch để xem trách nhiệm cá nhân có được nghề nghiệp và nguồn lực nâng đỡ không.',
      'Xem Thiên Di đối chiếu để biết môi trường bên ngoài phản chiếu hình ảnh cá nhân ra sao.',
      'Kiểm tra Tứ Hóa, phụ tinh, sát tinh và câu hỏi thực tế trước khi đưa lời khuyên.',
    ],
    selfCheckQuestions: [
      'Mình đang nhận trách nhiệm vì giá trị thật hay vì sợ mất kiểm soát?',
      'Việc nào nên phân quyền để uy tín không biến thành áp lực?',
      'Nguyên tắc nào giúp mình vững hơn, nguyên tắc nào đang làm quan hệ xa cách?',
      'Môi trường nào giúp mình lãnh đạo bằng sự tin cậy thay vì bằng sự căng thẳng?',
    ],
    sensitiveTopicFlags: [],
    contrastNotes: [
      'Khác với Tử Vi ở Quan Lộc, trọng tâm không nằm trước hết ở vai trò nghề nghiệp mà nằm ở cách bản thân tự đứng vào đời sống.',
      'Khác với Thiên Cơ ở Mệnh, Tử Vi ở Mệnh ít nhấn vào xoay chuyển phương án hơn, mà nhấn vào trục tổ chức, danh dự và trách nhiệm.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Trật tự cá nhân, tự chủ, trách nhiệm và khí chất điều phối', readingCue: 'Đọc như phong cách đứng vào đời sống, không phải danh vị cố định.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng biết gom việc, giữ lời hứa và tạo cấu trúc cho bản thân hoặc tập thể nhỏ.', readingCue: 'Kiểm tra Quan Lộc/Tài Bạch để biết cấu trúc đó có đi thành năng lực thực tế không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ ôm việc, khó nghe phản biện hoặc dùng nguyên tắc để che cảm giác bất an.', readingCue: 'Tìm dấu hiệu phân quyền, nghỉ ngơi và khả năng nhận phản hồi.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa chắc chắn quyền lực, địa vị hay người khác phải nghe theo.', readingCue: 'Tránh dùng sao làm nhãn định danh cố định.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Thân Cung, Thiên Di, Mệnh - Quan - Tài, Tứ Hóa và bối cảnh trách nhiệm thật.', readingCue: 'Thiếu dữ liệu giờ sinh thì chỉ đọc như nền khái niệm.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Tử Vi ở Mệnh là số làm lãnh đạo nên chắc chắn hơn người.', better: 'Tử Vi ở Mệnh gợi nhu cầu tự chủ và tổ chức; cần xem Quan Lộc, Tài Bạch, Thiên Di và cách người đó thật sự nhận trách nhiệm.' },
      { wrong: 'Có Tử Vi ở Mệnh thì cứ quyết đoán là đúng.', better: 'Điểm mạnh quyết đoán chỉ bền khi đi cùng lắng nghe, phân quyền và kiểm chứng dữ liệu đời sống.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Tử Vi ở cung Mệnh là một tổ hợp mạnh về biểu tượng, nhưng không nên đọc như lời phong chức. Tử Vi đem ngôn ngữ của trật tự, trung tâm điều phối và trách nhiệm; cung Mệnh lại là nơi nói về khí chất gốc, cách một người tự nhận diện và phản ứng đầu tiên với đời sống. Khi hai lớp này gặp nhau, trọng tâm là cách người xem dùng quyền chủ động: tạo cấu trúc cho mình và cho việc chung, hay vô thức biến cấu trúc thành nhu cầu kiểm soát.',
          'Điểm khác với bài sao Tử Vi chung là ở đây không nói về “Tử Vi như một chính tinh” một cách trừu tượng. Nó đi thẳng vào câu hỏi bản thân: khi áp lực xuất hiện, người này đứng ra nhận trách nhiệm ra sao, có biết gọi đúng người vào đúng việc không, và có giữ được sự mềm mại khi vị trí trung tâm trở nên nặng.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, tổ hợp này gợi khả năng đứng trục, làm việc có nguyên tắc, giữ lời hứa và nhìn bức tranh lớn. Người học có thể dùng nó như lời nhắc xây hệ thống cá nhân: tiêu chuẩn làm việc, nhịp nghỉ, cách nói ranh giới và cách phân vai. Giá trị nằm ở hành vi có thể quan sát, không nằm ở danh xưng.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là xu hướng ôm quá nhiều việc hoặc tự xem mình là người phải giữ mọi thứ đúng trật tự. Nếu thiếu sao mềm, thiếu phản hồi hoặc thiếu không gian nghỉ, Tử Vi ở Mệnh dễ thành cảm giác xa cách. Cách viết an toàn là khuyên kiểm tra ranh giới, lịch nghỉ và khả năng lắng nghe thay vì phán người này “cao số” hay “có quyền”.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam phương tứ chính của cung Mệnh phải kéo Quan Lộc và Tài Bạch vào bài đọc. Nếu bản thân muốn gánh trách nhiệm nhưng nghề nghiệp hoặc nguồn lực chưa đủ, lời khuyên nên là chia nhỏ việc và tăng năng lực thật. Cung Thiên Di đối chiếu cũng quan trọng: môi trường ngoài có nhìn nhận sự dẫn dắt này như uy tín, hay đang phản chiếu áp lực kiểm soát?',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Các câu hỏi tự kiểm chứng nên xoay quanh trách nhiệm, phân quyền, ranh giới và phản hồi. Nếu người đọc trả lời được bằng ví dụ cụ thể trong tuần hoặc tháng gần nhất, bài Tử Vi mới chuyển thành quan sát thực tế thay vì cảm giác được khen.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Ví dụ đọc sai là biến Tử Vi ở Mệnh thành bảo chứng quyền vị. Ví dụ đọc tốt hơn là nói: tổ hợp này gợi năng lực tổ chức, nhưng phải xem Thân Cung, Thiên Di, Mệnh - Quan - Tài và hành vi thật để biết người đó đang dùng năng lực ấy có lành mạnh không.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này chỉ là bài nền. Để đọc cá nhân cần ngày sinh, giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, vị trí sao đủ 12 cung và bối cảnh câu hỏi. Không dùng tổ hợp này để kết luận thay lựa chọn đời sống của một người.',
        ],
      },
    ],
  },
  [comboKey('vu-khuc', 'tai-bach')]: {
    intersectionThesis:
      'Vũ Khúc đem kỷ luật, ghi chép và tiêu chuẩn vật chất; cung Tài Bạch là cách tạo và giữ nguồn lực; câu hỏi hữu ích là con số đang phục vụ tự do dài hạn hay đang nuôi thêm bất an.',
    misreadWarning:
      'Không nên đọc Vũ Khúc ở Tài Bạch như lời hứa giàu có. Tổ hợp này chỉ gợi năng lực quản trị nguồn lực bằng kỷ luật, còn kết quả phụ thuộc kỹ năng, bối cảnh, Quan Lộc, Mệnh, Tứ Hóa và hành vi thật.',
    contextChecklist: [
      'Kiểm tra tam hợp Tài Bạch - Mệnh - Quan Lộc để biết nguồn lực có gắn với năng lực và nghề nghiệp không.',
      'Xem Phúc Đức đối chiếu để biết giá trị sống và nhịp tinh thần có điều hòa áp lực nguồn lực không.',
      'Đối chiếu dòng tiền, thói quen ghi chép và quyết định chi tiêu thật thay vì chỉ đọc biểu tượng sao.',
      'Tránh mọi lời hứa kết quả tiền bạc; chỉ dùng ngôn ngữ quản trị nguồn lực và rủi ro.',
    ],
    selfCheckQuestions: [
      'Con số nào mình cần ghi lại mỗi tuần để bớt quyết định theo cảm giác?',
      'Mình đang giữ nguồn lực vì mục tiêu rõ hay vì bất an?',
      'Tiêu chuẩn nào giúp mình bền hơn, tiêu chuẩn nào làm mình quá cứng?',
      'Công việc nào tạo giá trị thật mà không làm nhịp nghỉ bị phá vỡ?',
    ],
    sensitiveTopicFlags: ['resource-management'],
    contrastNotes: [
      'Khác với Vũ Khúc ở Mệnh, trọng tâm không phải tính cách tự lập nói chung mà là thói quen đo, giữ và dùng nguồn lực.',
      'Khác với Thái Âm ở Tài Bạch, Vũ Khúc nhấn vào kỷ luật và tiêu chuẩn rõ hơn là tích lũy mềm, kín và đều.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Kỷ luật nguồn lực, ghi chép, dự phòng và tiêu chuẩn vật chất', readingCue: 'Đọc như thói quen quản trị, không như lời hứa kết quả.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng biết đặt ngân sách, cắt lãng phí và biến công sức thành kết quả đo được.', readingCue: 'Kiểm tra Quan Lộc để biết nguồn tạo giá trị có bền không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ quá cứng với con số, khó linh hoạt hoặc để áp lực nguồn lực chiếm giấc ngủ.', readingCue: 'Xem Phúc Đức và Tật Ách theo hướng wellbeing.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa bảo đảm kết quả tiền bạc, trúng lớn hoặc phù hợp mọi quyết định rủi ro.', readingCue: 'Không dùng trang này thay tư vấn chuyên môn.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Mệnh, Quan Lộc, Phúc Đức, Tứ Hóa, thói quen ghi chép và dữ liệu đời sống thật.', readingCue: 'Nếu không có ngày giờ sinh thì chỉ đọc khái niệm.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Vũ Khúc ở Tài Bạch bảo đảm kết quả tiền bạc.', better: 'Vũ Khúc ở Tài Bạch gợi khả năng quản trị nguồn lực bằng kỷ luật; cần kiểm tra Mệnh, Quan Lộc, Tứ Hóa và thói quen tài chính thật.' },
      { wrong: 'Có Vũ Khúc thì nên mạnh tay với tiền bạc.', better: 'Tổ hợp này phù hợp hơn với ghi chép, dự phòng, tiêu chuẩn rủi ro và quyết định dựa trên dữ liệu.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Vũ Khúc ở cung Tài Bạch là một trong những tổ hợp dễ bị đọc quá tay, vì cả sao lẫn cung đều chạm đến nguồn lực vật chất. Cách đọc đúng không phải là hứa hẹn kết quả tiền bạc, mà là hỏi người này đang quản trị nguồn lực bằng kỷ luật hay bằng nỗi lo. Vũ Khúc đem tính đo lường, chịu trách nhiệm và tiêu chuẩn rõ; Tài Bạch cho biết cách tạo, giữ và dùng nguồn lực.',
          'Điểm khác với trang sao Vũ Khúc chung là ở đây trọng tâm không nằm ở “người thực tế” mà nằm ở hệ thống nguồn lực cụ thể: dòng tiền, ngân sách, dự phòng, tiêu chuẩn rủi ro và năng lực biến việc làm thành giá trị có thể kiểm chứng.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, Vũ Khúc ở Tài Bạch gợi thói quen ghi chép, biết đặt giới hạn và thích nhìn kết quả bằng con số. Đây là điểm mạnh lớn nếu người xem dùng nó để tạo tự do dài hạn: biết mình đang có gì, cần giữ gì, cần đầu tư thời gian vào kỹ năng nào và khoản nào nên dừng lại.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là sự khô cứng. Nếu mọi quyết định đều bị kéo về nỗi sợ thiếu nguồn lực, Vũ Khúc có thể làm người xem mệt vì kiểm soát quá nhiều. Bài đọc nên nhắc đến nhịp nghỉ, sự linh hoạt và dữ liệu thật, không nên kích hoạt ham muốn thắng nhanh hoặc lo lắng về mất mát.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam hợp Tài Bạch - Mệnh - Quan Lộc cho biết tiền bạc không tách khỏi bản thân và nghề nghiệp. Nếu Mệnh có kỷ luật nhưng Quan Lộc chưa rõ, nguồn lực dễ đến từ cố gắng vụn vặt. Nếu Quan Lộc rõ nhưng Phúc Đức đối chiếu căng, áp lực kiếm giữ có thể làm nhịp sống mất cân bằng.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Câu hỏi tự kiểm chứng cần kéo người đọc về hành vi: có ghi số liệu không, có quỹ dự phòng theo khả năng thật không, có biết phân biệt mục tiêu với bất an không. Đây là phần giúp trang có giá trị thực tế mà không cần phán kết quả.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là nói tổ hợp này bảo đảm giàu. Cách đọc tốt hơn là nói nó gợi một phong cách quản trị nguồn lực bằng kỷ luật; muốn biết hiệu quả phải xem tam phương, Tứ Hóa, nghề nghiệp và thói quen ghi chép thật.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Nội dung không thay thế tư vấn chuyên môn hoặc quyết định quan trọng. Với chủ đề nguồn lực, Tử Vi chỉ nên là khung phản tư về thói quen và rủi ro, không phải công cụ hứa hẹn kết quả.',
        ],
      },
    ],
  },
  [comboKey('thai-duong', 'quan-loc')]: {
    intersectionThesis:
      'Thái Dương đem ánh sáng công khai, trách nhiệm và danh dự; cung Quan Lộc là vai trò nghề nghiệp; câu hỏi hữu ích là sự hiện diện công khai đang tạo giá trị thật hay chỉ tạo áp lực phải được nhìn nhận.',
    misreadWarning:
      'Không nên đọc Thái Dương ở Quan Lộc như chắc chắn thăng tiến hoặc nổi tiếng; tổ hợp này chỉ gợi xu hướng làm việc minh bạch, đứng mũi chịu sào và cần môi trường có tiêu chuẩn rõ.',
    contextChecklist: [
      'Kiểm tra tam hợp Quan Lộc - Tài Bạch - Mệnh để biết vai trò nghề có đi cùng năng lực và nguồn lực không.',
      'Xem Phu Thê đối chiếu để biết trách nhiệm nghề có kéo lệch quan hệ thân cận không.',
      'Đối chiếu Thái Âm, Cự Môn, Thiên Lương hoặc Tứ Hóa nếu có để hiểu ánh sáng công khai đi cùng cảm xúc, lời nói và chuẩn mực nào.',
      'Không kết luận vị trí nghề nếu chưa xét kỹ năng, thị trường và bối cảnh thật.',
    ],
    selfCheckQuestions: [
      'Mình muốn được nhìn nhận vì giá trị thật hay vì sợ bị xem nhẹ?',
      'Công việc nào cần mình xuất hiện công khai, công việc nào nên để hệ thống xử lý?',
      'Trách nhiệm nghề đang nâng quan hệ thân cận hay lấy hết sự hiện diện?',
      'Tiêu chuẩn minh bạch nào giúp mình bớt phản ứng bằng danh dự?',
    ],
    sensitiveTopicFlags: [],
    contrastNotes: [
      'Khác với Thái Dương ở Mệnh, trọng tâm không phải khí chất cá nhân mà là cách ánh sáng đó trở thành vai trò nghề nghiệp.',
      'Khác với Thiên Cơ ở Quan Lộc, Thái Dương nhấn vào hiện diện, minh bạch và trách nhiệm công khai hơn là thiết kế hệ thống và xoay chuyển phương án.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Hiện diện công khai, nghề nghiệp minh bạch, danh dự và trách nhiệm', readingCue: 'Đọc như phong cách làm nghề, không phải bảo chứng vị trí.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng hợp vai trò đại diện, dẫn dắt, giáo dục, truyền thông hoặc việc cần tiêu chuẩn rõ.', readingCue: 'Kiểm tra kỹ năng và môi trường nghề thật.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ mệt vì luôn phải mạnh, dễ phản ứng khi bị hiểu lầm hoặc quá coi trọng sự công nhận.', readingCue: 'Xem Phu Thê và Phúc Đức để cân bằng đời sống riêng.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa chắc chắn thăng tiến, nổi tiếng hoặc luôn đúng trước tập thể.', readingCue: 'Tránh ngôn ngữ định mệnh nghề nghiệp.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Mệnh, Tài Bạch, Phu Thê, Tứ Hóa, Cự Môn/Thái Âm/Thiên Lương và bối cảnh nghề.', readingCue: 'Thiếu lá số cá nhân thì chỉ đọc tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Thái Dương ở Quan Lộc chắc chắn có chức vụ cao.', better: 'Thái Dương ở Quan Lộc gợi nhu cầu làm nghề minh bạch và có trách nhiệm; cần xem Mệnh, Tài Bạch, Phu Thê, Tứ Hóa và năng lực thật.' },
      { wrong: 'Cứ xuất hiện nhiều là phát huy Thái Dương.', better: 'Xuất hiện đúng lúc, với tiêu chuẩn rõ và nhịp nghỉ bền mới là cách dùng Thái Dương lành mạnh.' },
    ],
    sections: [
      { key: 'core-interpretation', content: ['Thái Dương ở Quan Lộc đưa biểu tượng ánh sáng vào mảng nghề nghiệp. Điều đáng đọc không phải là hào quang, mà là trách nhiệm công khai: người này làm việc có minh bạch không, có dám đứng ra nhận phần mình không, và có biết giữ sức khi vai trò đại diện trở nên dày đặc.', 'So với trang Thái Dương chung, tổ hợp này cụ thể hơn ở nghề và tiêu chuẩn làm việc. So với trang Quan Lộc chung, nó cho biết phong cách nghề nghiêng về sự rõ ràng, cống hiến và hiện diện trước người khác.'] },
      { key: 'strengths', content: ['Khi đọc thuận, đây là tổ hợp tốt cho việc cần sự tin cậy, truyền đạt và trách nhiệm. Người học có thể dùng nó như lời nhắc chọn môi trường minh bạch, có phản hồi công bằng và có mục tiêu phục vụ rõ ràng.', 'Giá trị tốt nhất của tổ hợp không nằm ở danh xưng, mà ở khả năng biến sự hiện diện thành chuẩn mực phục vụ: nói rõ điều mình làm được, nhận phản hồi đúng lúc và giữ lời hứa trong phạm vi thực tế.'] },
      { key: 'balancing-risks', content: ['Điểm cần cân bằng là danh dự. Nếu người xem quá cần được công nhận, mỗi hiểu lầm nghề nghiệp đều có thể thành áp lực tinh thần. Bài đọc nên khuyên đặt tiêu chuẩn giao tiếp, phân vai và lịch nghỉ, thay vì thúc người đó phải tỏa sáng mọi lúc.'] },
      { key: 'tam-phuong-tu-chinh', content: ['Quan Lộc tam hợp với Tài Bạch và Mệnh, nên ánh sáng nghề phải có năng lực cá nhân và nguồn lực đi kèm. Cung Phu Thê đối chiếu nhắc rằng công việc công khai có thể ảnh hưởng đời sống thân cận; nếu quan hệ riêng luôn bị lịch nghề chiếm chỗ, cần điều chỉnh.'] },
      { key: 'self-check', content: ['Câu hỏi tự kiểm chứng nên xoay quanh sự công nhận, trách nhiệm và nhịp hiện diện. Nếu người đọc chỉ thấy mình cần được nhìn nhận mà không thấy tiêu chuẩn phục vụ cụ thể, Thái Dương dễ thành áp lực hình ảnh.'] },
      { key: 'wrong-vs-better', content: ['Cách đọc sai là hứa thăng tiến. Cách đọc tốt hơn là nói tổ hợp này gợi phong cách làm nghề công khai, cần minh bạch và trách nhiệm; kết quả vẫn phụ thuộc toàn lá số và đời sống thật.'] },
      { key: 'limits', content: ['Không dùng tổ hợp này để chọn nghề thay người xem. Muốn đọc riêng cần đủ dữ liệu lá số, kỹ năng thật, thị trường và câu hỏi cụ thể.'] },
    ],
  },
  [comboKey('thien-co', 'quan-loc')]: {
    intersectionThesis:
      'Thiên Cơ đem tư duy hệ thống, phân tích và khả năng xoay chuyển; cung Quan Lộc là vai trò nghề nghiệp; câu hỏi hữu ích là suy nghĩ đang trở thành quy trình tạo giá trị hay chỉ thành những lần đổi hướng liên tục.',
    misreadWarning:
      'Không nên đọc Thiên Cơ ở Quan Lộc như nghề nghiệp chắc chắn bất ổn. Tổ hợp này có thể gợi năng lực tham mưu, kỹ thuật, vận hành và cải tiến nếu có tiêu chí dừng, kỷ luật học và bối cảnh nghề phù hợp.',
    contextChecklist: [
      'Kiểm tra tam hợp Quan Lộc - Tài Bạch - Mệnh để biết tư duy nghề có tạo nguồn lực và hợp khí chất không.',
      'Xem Phu Thê đối chiếu để biết nhịp đổi hướng nghề có ảnh hưởng quan hệ thân cận không.',
      'Đối chiếu Cự Môn, Thiên Lương, Thái Âm, Hóa Khoa/Hóa Kỵ nếu có để hiểu suy nghĩ, lời nói và chuẩn mực.',
      'Kiểm tra dữ liệu nghề thật: kỹ năng, quy trình, portfolio, thị trường và khả năng hoàn thành.',
    ],
    selfCheckQuestions: [
      'Ý tưởng nào đã đủ dữ liệu để biến thành quy trình?',
      'Mình đang đổi hướng vì học được điều mới hay vì sợ cam kết?',
      'Checklist nào giúp công việc bớt phụ thuộc vào cảm hứng?',
      'Quan hệ thân cận có đang chịu áp lực từ nhịp nghề thay đổi liên tục không?',
    ],
    sensitiveTopicFlags: [],
    contrastNotes: [
      'Khác với Thiên Cơ ở Mệnh, trọng tâm không phải trí tò mò cá nhân mà là cách tư duy được đóng gói thành vai trò nghề.',
      'Khác với Thái Dương ở Quan Lộc, Thiên Cơ nhấn vào thiết kế hệ thống, tham mưu và thích nghi hơn là hiện diện công khai.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Tư duy hệ thống trong nghề nghiệp, cải tiến, tham mưu và thích nghi', readingCue: 'Đọc như cách làm nghề, không như nhãn “hay đổi việc”.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng hợp việc phân tích, kỹ thuật, vận hành, nghiên cứu, giáo dục hoặc tối ưu quy trình.', readingCue: 'Cần kiểm tra khả năng hoàn thành và tiêu chí dừng.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ nghĩ nhiều, đổi hướng nhanh hoặc mở quá nhiều nhánh nghề.', readingCue: 'Dùng checklist, deadline và phản hồi thật để giữ trục.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa nghề chắc chắn bất ổn hoặc phải làm công việc trí óc phức tạp.', readingCue: 'Tránh áp nghề nếu chưa xem kỹ năng và bối cảnh.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Mệnh, Tài Bạch, Phu Thê, Cự Môn/Thiên Lương, Tứ Hóa và dữ liệu nghề thật.', readingCue: 'Thiếu giờ sinh thì chỉ đọc nền tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Thiên Cơ ở Quan Lộc là sự nghiệp hay thay đổi nên khó bền.', better: 'Thiên Cơ ở Quan Lộc gợi nghề cần phân tích và thích nghi; bền hay không phụ thuộc trục Mệnh - Quan - Tài, tiêu chí dừng và năng lực hoàn thành.' },
      { wrong: 'Càng nhiều ý tưởng càng tốt.', better: 'Ý tưởng chỉ thành giá trị khi được chuyển thành quy trình, lịch thử nghiệm và tiêu chuẩn đánh giá.' },
    ],
    sections: [
      { key: 'core-interpretation', content: ['Thiên Cơ ở Quan Lộc là tổ hợp của trí xoay chuyển trong lĩnh vực nghề nghiệp. Thiên Cơ đem khả năng nhìn nhiều phương án; Quan Lộc hỏi phương án ấy có thành vai trò, tiêu chuẩn và thành quả không. Vì vậy trọng tâm không phải “đổi nghề”, mà là tư duy có thành hệ thống tạo giá trị hay không.', 'Khác với Thiên Cơ ở Mệnh, nơi câu hỏi nằm ở khí chất tò mò cá nhân, Thiên Cơ ở Quan Lộc yêu cầu sản phẩm nghề rõ hơn: quy trình, bản phân tích, kế hoạch, phương án kỹ thuật hoặc năng lực tham mưu có thể kiểm chứng.'] },
      { key: 'strengths', content: ['Khi đọc thuận, tổ hợp này hợp với môi trường cần cải tiến, nghiên cứu, kỹ thuật, vận hành hoặc giáo dục. Điểm mạnh là thấy lỗ hổng hệ thống và tìm phương án B. Nếu có kỷ luật hoàn thành, Thiên Cơ giúp nghề luôn học và thích nghi.'] },
      { key: 'balancing-risks', content: ['Điểm cần cân bằng là phân tán. Nếu thiếu tiêu chí dừng, người xem có thể luôn thấy phương án mới nhưng không đóng gói được thành việc. Bài đọc nên khuyên viết checklist, giới hạn số dự án mở và kiểm tra phản hồi từ thị trường hoặc đồng đội.'] },
      { key: 'tam-phuong-tu-chinh', content: ['Quan Lộc không tách khỏi Mệnh và Tài Bạch. Nếu Mệnh hợp học hỏi nhưng Tài Bạch chưa có mô hình nguồn lực, nghề dễ thành thử nghiệm kéo dài. Phu Thê đối chiếu nhắc rằng nhịp nghề nhiều biến động cần được trao đổi rõ với người thân hoặc đối tác gần.'] },
      { key: 'self-check', content: ['Câu hỏi tự kiểm chứng nên kéo suy nghĩ về hành động: ý tưởng nào đủ dữ liệu, quy trình nào cần viết ra, việc nào phải dừng. Đây là cách biến Thiên Cơ từ lo nghĩ thành năng lực nghề.'] },
      { key: 'wrong-vs-better', content: ['Cách đọc sai là gắn Thiên Cơ với bất ổn nghề nghiệp. Cách đọc tốt hơn là nói: đây là xu hướng nghề cần tư duy hệ thống; muốn bền phải có quy trình, tiêu chí hoàn thành và kiểm chứng bằng kết quả thật.'] },
      { key: 'limits', content: ['Không dùng tổ hợp này để chỉ định nghề. Muốn đọc riêng cần toàn lá số, kỹ năng, lịch sử học tập, môi trường làm việc và câu hỏi nghề cụ thể.'] },
    ],
  },
  [comboKey('thai-am', 'phuc-duc')]: {
    intersectionThesis:
      'Thái Âm đem nội lực, chăm sóc kín đáo và tích lũy; cung Phúc Đức là nền tinh thần, gia tộc và khả năng an trú; câu hỏi hữu ích là điều gì đang nuôi dưỡng sự bình an bền mà không biến thành im lặng tích tụ.',
    misreadWarning:
      'Không nên đọc Thái Âm ở Phúc Đức như bảo đảm phúc khí hoặc may mắn gia tộc. Tổ hợp này nên được hiểu như xu hướng cần không gian tĩnh, nếp sống đều và khả năng chăm phần bên trong.',
    contextChecklist: [
      'Kiểm tra tam hợp Phúc Đức - Thiên Di - Phu Thê để biết nền tinh thần liên hệ môi trường và quan hệ thân cận thế nào.',
      'Xem Tài Bạch đối chiếu để biết nguồn lực vật chất có kéo căng nền tinh thần không.',
      'Đối chiếu Thái Dương, Thiên Cơ hoặc Tứ Hóa nếu có để hiểu cân bằng ngoài-trong và thói quen suy nghĩ.',
      'Dùng ngôn ngữ wellbeing, nghỉ ngơi và giá trị sống; không hứa may mắn hoặc kết quả gia đình.',
    ],
    selfCheckQuestions: [
      'Không gian nào giúp mình bình tĩnh lại mà không cần giải thích quá nhiều?',
      'Mình đang im lặng vì khôn ngoan hay vì chưa có kênh nói an toàn?',
      'Giá trị gia đình nào nên giữ, giá trị nào cần được hiểu lại cho phù hợp hiện tại?',
      'Nếp nghỉ nào giúp mình tích lũy nội lực thay vì chỉ chịu đựng?',
    ],
    sensitiveTopicFlags: ['wellbeing'],
    contrastNotes: [
      'Khác với Thái Âm ở Tài Bạch, trọng tâm không phải tích lũy nguồn lực vật chất mà là tích lũy nội lực và sự an trú.',
      'Khác với Thiên Lương ở Phúc Đức, Thái Âm nhấn vào chăm sóc kín đáo và cảm nhận nội tâm hơn là chuẩn mực đạo lý rõ ràng.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Nội lực, hồi phục tinh thần, không gian tĩnh và nếp tích lũy bên trong', readingCue: 'Đọc như nền an trú, không như bảo chứng may mắn.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng biết chăm phần sâu, giữ nếp sống đều và nuôi dưỡng cảm giác có gốc.', readingCue: 'Xem Thiên Di/Phu Thê để biết nền này có đi ra môi trường thật không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ giữ cảm xúc quá lâu, né xung đột hoặc khó nói nhu cầu thật.', readingCue: 'Tìm kênh trao đổi an toàn và nhịp nghỉ rõ.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa gia tộc chắc chắn tốt, đời sống tinh thần luôn an ổn hoặc mọi việc được che chở.', readingCue: 'Không phán phúc họa từ một tổ hợp.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Tài Bạch đối chiếu, Thiên Di, Phu Thê, Thái Dương/Thiên Cơ/Tứ Hóa và bối cảnh gia đình thật.', readingCue: 'Dùng như khung suy ngẫm văn hóa.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Thái Âm ở Phúc Đức là được hưởng phúc nên không cần lo.', better: 'Thái Âm ở Phúc Đức gợi nhu cầu nuôi dưỡng nội lực và nếp sống tĩnh; cần xem Thiên Di, Phu Thê, Tài Bạch và bối cảnh gia đình thật.' },
      { wrong: 'Càng im lặng càng giữ phúc.', better: 'Sự tĩnh lặng chỉ lành mạnh khi đi cùng kênh nói an toàn, nghỉ ngơi đều và khả năng gọi tên nhu cầu.' },
    ],
    sections: [
      { key: 'core-interpretation', content: ['Thái Âm ở Phúc Đức đưa năng lượng mặt trăng vào nền tinh thần. Thái Âm là phần tĩnh, kín, biết tích lũy và chăm sóc; Phúc Đức là nơi nói về gia tộc, giá trị sống, sức bền nội tâm và khả năng hồi phục. Tổ hợp này vì thế không nên được đọc như may mắn mơ hồ, mà như câu hỏi: điều gì đang nuôi dưỡng nội lực của người xem.', 'So với Thái Âm ở Tài Bạch, trọng tâm ở đây không phải nguồn lực vật chất. So với Phúc Đức chung, Thái Âm thêm sắc thái của không gian riêng, ký ức, chăm sóc âm thầm và cảm xúc cần được bảo vệ đúng cách.'] },
      { key: 'strengths', content: ['Khi đọc thuận, tổ hợp này gợi khả năng tạo một nền sống tĩnh: biết nghỉ, biết giữ nếp, biết chăm người thân hoặc chăm phần bên trong bằng những việc nhỏ. Đây là nền quý cho người làm việc căng, vì nó nhắc rằng sự bền không chỉ đến từ ý chí mà còn từ nhịp hồi phục.'] },
      { key: 'balancing-risks', content: ['Điểm cần cân bằng là cảm xúc tích tụ. Thái Âm có thể giữ nhiều điều không nói; Phúc Đức lại liên hệ gia tộc và giá trị sâu. Nếu thiếu kênh trao đổi, sự tĩnh có thể thành cô lập. Bài đọc nên khuyên ghi chép, nghỉ ngơi và nói nhu cầu với người tin cậy.'] },
      { key: 'tam-phuong-tu-chinh', content: ['Phúc Đức tam hợp với Thiên Di và Phu Thê, nên nền tinh thần không chỉ nằm trong nhà hoặc trong lòng. Nó đi ra môi trường bên ngoài và quan hệ thân cận. Cung Tài Bạch đối chiếu nhắc rằng áp lực nguồn lực có thể kéo nền tinh thần lệch nếu không được quản trị.'] },
      { key: 'self-check', content: ['Câu hỏi tự kiểm chứng cần chạm vào không gian nghỉ, ký ức gia đình và khả năng nói điều thật. Nếu người đọc nhận ra mình đang im lặng để tránh xung đột, đó là dữ liệu đời sống cần xem cùng lá số.'] },
      { key: 'wrong-vs-better', content: ['Cách đọc sai là hứa “có phúc” như một kết quả sẵn. Cách đọc tốt hơn là nói tổ hợp này gợi nhu cầu xây nền tinh thần mềm, có nếp nghỉ và có kênh chăm sóc cảm xúc rõ ràng.'] },
      { key: 'limits', content: ['Không dùng tổ hợp này để kết luận về gia tộc hoặc đời sống tinh thần của một người. Cần toàn lá số và bối cảnh thật; nếu vấn đề tinh thần nghiêm trọng, cần tìm hỗ trợ phù hợp.'] },
    ],
  },
  [comboKey('thien-luong', 'tat-ach')]: {
    intersectionThesis:
      'Thiên Lương đem tinh thần che chở, chuẩn mực và cố vấn; cung Tật Ách là nhịp thân-tâm và khả năng phục hồi; câu hỏi hữu ích là người này đang chăm giới hạn của mình bằng nguyên tắc lành mạnh hay đang gánh trách nhiệm đến quá tải.',
    misreadWarning:
      'Không được đọc Thiên Lương ở Tật Ách như chẩn đoán hoặc bảo đảm trạng thái thân-tâm luôn thuận lợi. Trang chỉ dùng framing wellbeing: giấc ngủ, nhịp nghỉ, ranh giới, kiểm tra định kỳ và tìm chuyên gia khi có dấu hiệu bất thường.',
    contextChecklist: [
      'Kiểm tra tam hợp Tật Ách - Huynh Đệ - Điền Trạch để biết nhịp thân-tâm liên hệ quan hệ ngang hàng và không gian sống thế nào.',
      'Xem Phụ Mẫu đối chiếu để biết nền gia đình/khuôn phép có tạo áp lực chăm sóc hay chuẩn mực quá nặng không.',
      'Đối chiếu Thiên Cơ, Thái Dương hoặc Tứ Hóa nếu có để hiểu suy nghĩ, trách nhiệm công khai và khả năng hạ tải.',
      'Tuyệt đối tránh suy luận bệnh lý, lời chữa trị hoặc cam kết kết quả wellbeing.',
    ],
    selfCheckQuestions: [
      'Ranh giới nào giúp mình giúp người khác mà không kiệt sức?',
      'Nhịp nghỉ nào đang bị trách nhiệm hoặc lời khuyên của người khác chiếm mất?',
      'Không gian sống nào giúp mình hạ tải tinh thần tốt hơn?',
      'Khi có dấu hiệu bất thường, mình có sẵn người/chuyên gia phù hợp để hỏi chưa?',
    ],
    sensitiveTopicFlags: ['wellbeing'],
    contrastNotes: [
      'Khác với Thiên Lương ở Mệnh, trọng tâm không phải hình ảnh người đáng tin mà là cách giữ ranh giới thân-tâm.',
      'Khác với Thái Âm ở Tật Ách, Thiên Lương nhấn vào chuẩn mực, lời khuyên và trách nhiệm chăm sóc hơn là cảm xúc tích tụ kín đáo.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Wellbeing, ranh giới chăm sóc, chuẩn mực nghỉ ngơi và phục hồi', readingCue: 'Đọc như lời nhắc quản trị nhịp sống, không như chẩn đoán.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng biết giữ nguyên tắc chăm sóc, tìm lời khuyên đúng lúc và làm điểm tựa vừa mức.', readingCue: 'Xem Huynh Đệ/Điền Trạch để biết môi trường hỗ trợ ra sao.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ gánh trách nhiệm chăm sóc, đạo lý hóa áp lực hoặc quên nghỉ vì muốn ai cũng ổn.', readingCue: 'Ưu tiên ranh giới, nhịp nghỉ và hỗ trợ chuyên môn khi cần.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa trạng thái thân-tâm luôn thuận lợi hoặc có thể bỏ qua chuyên gia.', readingCue: 'Không suy luận y tế từ sao cung.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Phụ Mẫu đối chiếu, Huynh Đệ, Điền Trạch, nhịp sinh hoạt thật và dấu hiệu cần chuyên gia.', readingCue: 'Chỉ dùng như khung wellbeing tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Thiên Lương ở Tật Ách bảo đảm trạng thái thân-tâm luôn thuận lợi.', better: 'Thiên Lương ở Tật Ách gợi nhu cầu giữ ranh giới chăm sóc, nghỉ ngơi và tìm lời khuyên phù hợp; không dùng để chẩn đoán hay bảo đảm kết quả.' },
      { wrong: 'Có sao che chở nên có thể chủ quan với nhịp sống.', better: 'Nếu tổ hợp này nổi bật, càng nên có lịch nghỉ, kiểm tra định kỳ và người có chuyên môn để hỏi khi cần.' },
    ],
    sections: [
      { key: 'core-interpretation', content: ['Thiên Lương ở Tật Ách là tổ hợp cần viết cực kỳ cẩn trọng. Thiên Lương đem tinh thần che chở, đạo lý và vai trò cố vấn; Tật Ách nói về nhịp thân-tâm, phục hồi và điểm dễ căng. Giao điểm hữu ích không phải là dự báo sức khỏe, mà là cách người xem giữ ranh giới chăm sóc và biết tìm hỗ trợ đúng lúc.', 'So với Thiên Lương ở Mệnh, câu hỏi không nằm ở hình ảnh người đáng tin mà ở giới hạn của chính người hay gánh trách nhiệm. So với Tật Ách chung, Thiên Lương thêm sắc thái chuẩn mực, lời khuyên và trách nhiệm đạo đức.'] },
      { key: 'strengths', content: ['Khi đọc thuận, tổ hợp này gợi khả năng có nguyên tắc chăm sóc bản thân: biết nghỉ đúng lúc, biết hỏi người phù hợp, biết giữ nhịp sinh hoạt và không để áp lực tinh thần kéo dài quá lâu. Nó cũng nhắc người xem có thể làm điểm tựa cho người khác nếu biết dừng đúng mức.'] },
      { key: 'balancing-risks', content: ['Điểm cần cân bằng là gánh thay. Thiên Lương dễ muốn ai cũng ổn; Tật Ách lại nhắc giới hạn thân-tâm. Nếu người xem luôn đóng vai cố vấn hoặc người giải quyết, nhịp nghỉ có thể bị bào mòn. Bài đọc nên nói về ranh giới, ngủ nghỉ, vận động nhẹ và kiểm tra định kỳ, không nói về bệnh danh.'] },
      { key: 'tam-phuong-tu-chinh', content: ['Tật Ách tam hợp với Huynh Đệ và Điền Trạch, nên nhịp thân-tâm liên hệ mạnh với quan hệ ngang hàng và không gian sống. Phụ Mẫu đối chiếu có thể gợi áp lực khuôn phép hoặc trách nhiệm từ nền gia đình. Đây là lý do không thể đọc riêng một sao trong một cung.'] },
      { key: 'self-check', content: ['Câu hỏi tự kiểm chứng phải thực tế: lịch nghỉ ở đâu, ranh giới nào chưa nói, không gian sống nào đang làm nhẹ hoặc nặng hơn, và khi có dấu hiệu bất thường thì hỏi ai. Đây là phần bảo vệ người đọc khỏi hiểu nhầm mang tính y tế.'] },
      { key: 'wrong-vs-better', content: ['Cách đọc sai là dùng Thiên Lương để hứa trạng thái thân-tâm luôn thuận lợi. Cách đọc tốt hơn là nói: tổ hợp này gợi nhu cầu chăm wellbeing có nguyên tắc, biết nghỉ, biết hỏi chuyên gia và biết không gánh thay mọi người.'] },
      { key: 'limits', content: ['Trang này không đưa lời khuyên y tế và không thay thế chuyên gia. Nếu có dấu hiệu bất thường, người xem nên tìm người có chuyên môn. Tử Vi ở đây chỉ là khung văn hóa để quan sát nhịp sống và ranh giới.'] },
    ],
  },
}


const BATCH_2A_DRAFT_PROFILES: Record<string, StarPalaceDraftProfile> = {
  [comboKey('tu-vi', 'quan-loc')]: {
    intersectionThesis:
      'Tử Vi đem trục tổ chức, trách nhiệm và khả năng giữ trung tâm; cung Quan Lộc là cách một người đứng vào công việc, vai trò xã hội và tiêu chuẩn nghề nghiệp; câu hỏi hữu ích là người này đang dùng trách nhiệm để tạo hệ thống bền hay chỉ đang gồng mình để giữ hình ảnh đúng.',
    misreadWarning:
      'Không nên đọc Tử Vi ở Quan Lộc như lời hứa địa vị, chức danh hoặc con đường nghề nghiệp luôn thuận. Cách đọc an toàn là xem năng lực tổ chức, cách nhận trách nhiệm, tam phương Mệnh - Quan - Tài, cung Phu Thê đối chiếu và hành vi nghề nghiệp thật.',
    contextChecklist: [
      'Kiểm tra tam hợp Quan Lộc - Mệnh - Tài Bạch để biết vai trò nghề có được khí chất cá nhân và nguồn lực thực tế nâng đỡ không.',
      'Xem cung Phu Thê đối chiếu để hiểu trách nhiệm công việc có làm lệch quan hệ thân cận, cam kết và khả năng chia sẻ đời sống không.',
      'Đọc cùng Thân Cung để biết sau quá trình trưởng thành người xem có thật sự bước vào vai trò điều phối hay chỉ đang mong được công nhận.',
      'Đối chiếu Tứ Hóa, phụ tinh, sát tinh và môi trường nghề; không kết luận nghề nghiệp chỉ từ một sao ở một cung.',
      'Kiểm tra dữ kiện thực tế: loại công việc, mức phân quyền, thói quen họp hành, cách ghi nhận đóng góp và nhịp nghỉ.',
    ],
    selfCheckQuestions: [
      'Vai trò hiện tại của mình cần thêm hệ thống hay cần bớt ôm việc?',
      'Mình đang giữ tiêu chuẩn nghề vì giá trị thật hay vì sợ người khác đánh giá?',
      'Việc nào nên được phân quyền, viết quy trình hoặc chuyển thành nhịp làm việc rõ hơn?',
      'Công việc đang nuôi dưỡng uy tín dài hạn hay chỉ tạo cảm giác phải đứng ở trung tâm?',
    ],
    sensitiveTopicFlags: [],
    contrastNotes: [
      'Khác với Tử Vi ở Mệnh, trọng tâm không nằm ở khí chất gốc mà ở vai trò nghề nghiệp và cách người xem tạo trật tự trong công việc.',
      'Khác với Thái Dương ở Quan Lộc, Tử Vi nhấn mạnh cấu trúc, phân quyền và trách nhiệm điều phối hơn là ánh sáng công khai hoặc khả năng truyền cảm hứng trực diện.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Trách nhiệm nghề nghiệp, trục tổ chức, phân quyền và uy tín qua hệ thống', readingCue: 'Đọc như phong cách làm việc, không phải bảo chứng chức danh.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng biết gom việc thành cấu trúc, giữ lời hứa, thiết lập chuẩn mực và đứng ra chịu trách nhiệm khi việc chung rối.', readingCue: 'Kiểm tra Mệnh/Tài Bạch để biết năng lực và nguồn lực có theo kịp vai trò không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ ôm trách nhiệm, quá đặt nặng hình ảnh đúng hoặc biến tiêu chuẩn nghề thành áp lực cho đội nhóm.', readingCue: 'Tìm dấu hiệu phân quyền, phản hồi hai chiều và lịch nghỉ bền.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa được bảo đảm địa vị, luôn có quyền, hay mọi lựa chọn nghề đều đúng.', readingCue: 'Tránh phán danh vị từ một tổ hợp sao×cung.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Mệnh, Tài Bạch, Phu Thê đối chiếu, Thân Cung, Tứ Hóa, phụ tinh và bối cảnh nghề thật.', readingCue: 'Thiếu dữ liệu giờ sinh thì chỉ đọc như khung tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Tử Vi ở Quan Lộc là số có chức quyền nên nghề nghiệp tự nhiên thuận.', better: 'Tử Vi ở Quan Lộc gợi nhu cầu tổ chức và nhận trách nhiệm; cần xem Mệnh, Tài Bạch, Phu Thê đối chiếu, Tứ Hóa và cách người đó làm việc thật.' },
      { wrong: 'Có tổ hợp này thì cứ đứng ra quyết hết là tốt.', better: 'Điểm mạnh điều phối chỉ bền khi có phân quyền, lắng nghe, chuẩn mực rõ và khả năng để người khác cùng chịu trách nhiệm.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Tử Vi ở cung Quan Lộc nên được đọc như ngôn ngữ của trách nhiệm trong công việc, không phải như một tấm bảng phong chức. Tử Vi đem cảm giác trung tâm, trật tự và khả năng giữ nhịp; Quan Lộc nói về nghề nghiệp, vai trò xã hội, tiêu chuẩn làm việc và cách một người được nhìn nhận qua việc họ tạo giá trị. Khi hai lớp này gặp nhau, câu hỏi quan trọng là người xem đang xây hệ thống để công việc bền hơn, hay đang dùng vai trò trung tâm để che cảm giác bất an.',
          'Điểm hay của tổ hợp nằm ở khả năng biến việc rời rạc thành cấu trúc: biết xác định tiêu chuẩn, gọi đúng người vào đúng vai, chịu trách nhiệm khi có việc khó và giữ lời hứa với tập thể. Nhưng nếu đọc thiếu tam phương tứ chính, người viết rất dễ biến Tử Vi ở Quan Lộc thành lời khen chung chung về địa vị. Bài viết này chỉ dùng tổ hợp như khung tham khảo để quan sát cách làm việc và trách nhiệm nghề, không thay cho lá số cá nhân.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, Tử Vi ở Quan Lộc gợi người có xu hướng thích làm việc có tiêu chuẩn và có cấu trúc. Họ có thể không luôn là người xuất hiện ồn ào nhất, nhưng thường muốn mọi việc được đặt vào trật tự: mục tiêu rõ, vai trò rõ, cách đánh giá rõ và trách nhiệm không bị đẩy qua lại. Trong đời sống hiện đại, đây là lời nhắc tốt để rèn kỹ năng quản trị công việc, viết quy trình, theo dõi cam kết và học cách phân quyền.',
          'Điểm mạnh này chỉ thật sự có giá trị khi đi cùng năng lực cụ thể. Nếu Mệnh cho thấy khí chất tự chủ nhưng Tài Bạch chưa đủ nguồn lực, người xem có thể phải bắt đầu từ hệ thống nhỏ: quản lý lịch, ghi nhận đầu việc, xây uy tín bằng việc đúng hẹn. Nếu Tài Bạch tốt nhưng Mệnh căng, trách nhiệm nghề có thể lớn hơn sức chịu hiện tại. Vì vậy lời khuyên an toàn luôn đi về hành vi kiểm chứng được.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là xu hướng tự xem mình là người phải giữ mọi thứ đúng. Khi Tử Vi gặp Quan Lộc, người xem có thể đặt kỳ vọng cao vào hình ảnh nghề nghiệp, sợ sai trước tập thể hoặc khó để người khác làm theo cách riêng. Nếu không có phản hồi hai chiều, năng lực tổ chức có thể biến thành kiểm soát, còn trách nhiệm biến thành cảm giác cô độc.',
          'Cách đọc tốt không hù dọa và cũng không tô hồng. Nó nên gợi ý người xem kiểm tra ranh giới công việc, lịch nghỉ, mức phân quyền, cách họ ghi nhận đóng góp của người khác và khả năng nói “việc này cần thêm nguồn lực”. Nếu tổ hợp này đang căng, giải pháp thực tế thường không phải gồng mạnh hơn mà là làm rõ hệ thống, giảm việc không cần thiết và tạo kênh phản hồi.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Với cung Quan Lộc, tam phương kéo Mệnh và Tài Bạch vào cùng một bài đọc. Mệnh cho biết người xem có đủ khí chất và sự chủ động để nhận vai trò không; Tài Bạch cho biết nguồn lực, kỹ năng và kết quả đo được có nâng đỡ vai trò đó không. Nếu chỉ nhìn Quan Lộc mà bỏ Mệnh - Tài, bài đọc sẽ dễ thành lời khen nghề nghiệp thiếu nền.',
          'Cung Phu Thê đối chiếu cũng rất quan trọng vì công việc không đứng ngoài đời sống cam kết. Một người có trách nhiệm nghề mạnh nhưng không biết chia sẻ, lắng nghe hoặc giữ nhịp thân cận thì trục Quan Lộc có thể kéo lệch đời sống riêng. Đây là lý do mọi trang sao×cung phải nhắc tam phương tứ chính: một tổ hợp chỉ mở câu hỏi, không tự đóng kết luận.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Người đọc có thể tự kiểm chứng tổ hợp bằng những câu hỏi rất cụ thể: tuần này mình đã làm rõ vai trò cho ai chưa, việc nào mình còn ôm vì không tin người khác, tiêu chuẩn nghề nào đang giúp công việc tốt lên và tiêu chuẩn nào chỉ làm mọi người căng hơn. Càng trả lời bằng ví dụ thật, nội dung Tử Vi càng trở thành công cụ phản tư thay vì lời khen mơ hồ.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là nói Tử Vi ở Quan Lộc bảo đảm chức vụ hoặc thành tựu. Cách đọc tốt hơn là nói: tổ hợp này gợi khả năng và nhu cầu tạo trật tự trong công việc, nhưng hiệu quả phụ thuộc Mệnh, Tài Bạch, Phu Thê đối chiếu, Tứ Hóa, môi trường nghề và hành vi thật. Người xem nên dùng nó để hỏi mình cần xây hệ thống nào, không dùng nó để đợi một kết quả có sẵn.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này là bài nền SEO và giáo dục khái niệm. Để đọc riêng cần ngày sinh, giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, đủ vị trí sao trong 12 cung và câu hỏi đời sống cụ thể. Không dùng tổ hợp này để quyết định nghề nghiệp quan trọng mà không kiểm tra dữ kiện thật và lời khuyên phù hợp.',
        ],
      },
    ],
  },
  [comboKey('thai-duong', 'menh')]: {
    intersectionThesis:
      'Thái Dương đem ánh sáng công khai, tinh thần minh bạch và trách nhiệm; cung Mệnh là khí chất gốc và cách một người tự đứng vào đời sống; câu hỏi hữu ích là ánh sáng này đang giúp người xem sống rõ ràng hơn hay đang tạo áp lực phải luôn tỏ ra mạnh.',
    misreadWarning:
      'Không nên đọc Thái Dương ở Mệnh như bảo đảm nổi bật, luôn đúng hoặc luôn được người khác công nhận. Cách đọc an toàn là xem xu hướng hiện diện công khai, tinh thần trách nhiệm, tam phương Mệnh - Quan - Tài và khả năng nghỉ khi không cần chiếu sáng mọi thứ.',
    contextChecklist: [
      'So Mệnh với Thân Cung để biết khí chất công khai ban đầu có chuyển thành trách nhiệm trưởng thành không.',
      'Kiểm tra tam hợp Mệnh - Quan Lộc - Tài Bạch để biết sự minh bạch cá nhân có đi cùng nghề nghiệp và nguồn lực thực tế không.',
      'Xem Thiên Di đối chiếu để biết môi trường ngoài phản chiếu hình ảnh sáng rõ này như uy tín hay như áp lực phải biểu diễn.',
      'Đọc cùng Thái Âm, Cự Môn, Thiên Lương hoặc Tứ Hóa nếu có để cân bằng giữa ánh sáng, cảm xúc, lời nói và chuẩn mực.',
      'Không dùng một sao ở Mệnh để đóng khung tính cách; cần dữ kiện đời sống thật và phản hồi từ môi trường.',
    ],
    selfCheckQuestions: [
      'Mình đang nói rõ điều cần nói hay đang cố chứng minh mình ổn?',
      'Khi nhận trách nhiệm, mình có còn biết lắng nghe và nghỉ ngơi không?',
      'Môi trường nào giúp mình hiện diện tự nhiên thay vì phải luôn tỏa sáng?',
      'Điều gì cần được minh bạch hơn trong mục tiêu, quan hệ hoặc nhịp làm việc của mình?',
    ],
    sensitiveTopicFlags: [],
    contrastNotes: [
      'Khác với Thái Dương ở Quan Lộc, trọng tâm ở đây là khí chất tự thân và cách xuất hiện đầu tiên, không chỉ là vai trò nghề nghiệp.',
      'Khác với Thái Âm ở Mệnh, Thái Dương nhấn vào sự rõ ràng, hướng ngoại và trách nhiệm công khai hơn là chiều sâu cảm xúc kín đáo.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Minh bạch, hiện diện công khai, trách nhiệm và khí chất hướng sáng', readingCue: 'Đọc như cách tự biểu đạt, không phải lời hứa nổi bật.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng muốn rõ ràng, thẳng thắn, giữ lời và tạo cảm giác tin cậy khi đứng trước việc chung.', readingCue: 'Kiểm tra Quan Lộc/Tài Bạch để biết sự rõ ràng có thành năng lực thực tế không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ gồng hình ảnh mạnh mẽ, khó nhận mệt hoặc biến sự minh bạch thành áp lực cho bản thân và người khác.', readingCue: 'Tìm khả năng lắng nghe, nghỉ ngơi và chấp nhận không cần lúc nào cũng dẫn dắt.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa luôn được công nhận, luôn đúng, hoặc lúc nào cũng phù hợp đứng trước đám đông.', readingCue: 'Không biến sao thành nhãn định danh cố định.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Thân Cung, Thiên Di, Mệnh - Quan - Tài, Tứ Hóa, các sao cảm xúc/lời nói và bối cảnh thật.', readingCue: 'Thiếu dữ liệu giờ sinh thì chỉ đọc như khái niệm tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Thái Dương ở Mệnh là người luôn nổi bật và luôn được công nhận.', better: 'Thái Dương ở Mệnh gợi xu hướng hiện diện rõ ràng và có trách nhiệm; cần xem tam phương, Thiên Di và cách người đó sống thật.' },
      { wrong: 'Có Thái Dương thì cứ nói thẳng là đúng.', better: 'Sự minh bạch cần đi cùng lắng nghe, đúng thời điểm, hiểu cảm xúc người khác và kiểm chứng dữ kiện.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Thái Dương ở cung Mệnh là tổ hợp nói nhiều về cách một người xuất hiện trong đời sống. Thái Dương đem biểu tượng của ánh sáng, sự minh bạch, trách nhiệm và xu hướng muốn làm rõ vấn đề; cung Mệnh là khí chất gốc, phản ứng đầu tiên và cách tự nhận diện. Khi đặt cùng nhau, trọng tâm không phải là “người này sẽ nổi bật”, mà là cách họ dùng sự rõ ràng: soi sáng để mọi việc minh bạch hơn, hay tự ép mình phải lúc nào cũng mạnh mẽ.',
          'Một bài đọc an toàn cần giữ hai mặt. Mặt thuận là sự thẳng thắn, tinh thần trách nhiệm và khả năng tạo niềm tin khi người xem dám đứng ra nói điều cần nói. Mặt cần cân bằng là áp lực hình ảnh: sợ bị hiểu sai, sợ không đủ tốt, hoặc nghĩ rằng mình phải luôn có câu trả lời. Vì vậy trang này dùng Thái Dương ở Mệnh như khung tham khảo về hiện diện cá nhân, không phải lá số cá nhân, không phải lời tiên đoán.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, tổ hợp này gợi khả năng sống rõ ràng và có trách nhiệm với lời nói. Người xem có thể hợp với môi trường cần minh bạch, cần trình bày, cần giữ tiêu chuẩn hoặc cần làm cầu nối giữa điều mơ hồ và hành động cụ thể. Trong thực tế, điểm mạnh không nằm ở việc được nhìn thấy nhiều, mà ở việc làm cho điều quan trọng trở nên dễ hiểu hơn.',
          'Thái Dương ở Mệnh cũng nhắc đến danh dự cá nhân. Nếu được rèn lành mạnh, người xem biết giữ lời, biết nhận phần việc của mình và không thích né tránh trách nhiệm. Tuy nhiên, danh dự này cần đi cùng sự mềm mại. Một người càng muốn rõ ràng càng cần học cách hỏi lại, nghe phản hồi và thừa nhận khi mình chưa đủ dữ kiện.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là gồng sáng. Có những lúc người xem tưởng rằng mình phải tích cực, phải mạnh, phải giải thích mọi thứ hoặc phải là người đứng ra trước. Nếu nhịp này kéo dài, Thái Dương ở Mệnh dễ thành áp lực tự chứng minh. Bài đọc nên khuyên kiểm tra nhịp nghỉ, không gian riêng và khả năng để người khác cùng chia sẻ trách nhiệm.',
          'Một rủi ro khác là dùng sự thẳng thắn thiếu bối cảnh. Minh bạch không đồng nghĩa nói mọi điều theo cách sắc cạnh. Nếu Cự Môn, Thiên Lương, Thái Âm hoặc Tứ Hóa tạo sắc thái khác trong lá số, cách nói cần mềm hơn, đúng thời điểm hơn. Vì vậy nội dung chỉ nên gợi hướng quan sát chứ không đóng khung người đọc là kiểu tính cách cố định.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam phương của cung Mệnh kéo Quan Lộc và Tài Bạch vào bài đọc. Nếu Mệnh có Thái Dương nhưng Quan Lộc chưa rõ, người xem có thể có nhu cầu hiện diện nhưng chưa có vai trò phù hợp để dùng ánh sáng đó. Nếu Quan Lộc tốt mà Tài Bạch thiếu, sự hiện diện công khai có thể chưa chuyển thành nguồn lực bền. Vì vậy phải đọc Mệnh - Quan - Tài cùng nhau.',
          'Thiên Di đối chiếu cho biết môi trường bên ngoài nhìn nhận sự rõ ràng này ra sao. Có nơi cần người minh bạch và chủ động; cũng có nơi phản chiếu sự hiện diện ấy thành áp lực cạnh tranh. Đọc tam phương tứ chính giúp bài viết tránh kết luận một chiều và giúp người xem đặt câu hỏi đúng với môi trường thật.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Câu hỏi tự kiểm chứng nên kéo người đọc về hành vi gần nhất: lần nào mình đã làm rõ kỳ vọng thay vì đoán ý, lần nào mình nói thẳng nhưng chưa đủ lắng nghe, lần nào mình nhận trách nhiệm vì giá trị thật chứ không phải vì sợ bị đánh giá. Nếu không có ví dụ cụ thể, tổ hợp này chỉ nên dừng ở mức khái niệm tham khảo.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là biến Thái Dương ở Mệnh thành nhãn “người luôn tỏa sáng”. Cách đọc tốt hơn là nói: tổ hợp này gợi nhu cầu sống minh bạch, có trách nhiệm và được nhìn thấy đúng cách, nhưng phải kiểm tra Thiên Di, Quan Lộc, Tài Bạch, Thân Cung và phản hồi thực tế để biết ánh sáng đó đang nâng đỡ hay đang làm người xem mệt.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này không thể thay thế một lá số cá nhân. Muốn đọc riêng cần ngày giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, đủ 12 cung, chính tinh, phụ tinh, Tứ Hóa và bối cảnh câu hỏi. Người đọc nên dùng bài viết để tự quan sát cách hiện diện và trách nhiệm, không dùng để khẳng định tương lai.',
        ],
      },
    ],
  },
  [comboKey('thai-am', 'menh')]: {
    intersectionThesis:
      'Thái Âm đem chiều sâu cảm xúc, khả năng nuôi dưỡng và nhịp tích lũy mềm; cung Mệnh là khí chất gốc và cách một người tự nhận diện; câu hỏi hữu ích là sự nhạy cảm này đang giúp người xem hiểu mình sâu hơn hay đang làm họ giữ quá nhiều điều trong lòng.',
    misreadWarning:
      'Không nên đọc Thái Âm ở Mệnh như tính cách yếu, kín hoặc may mắn tự đến. Cách đọc an toàn là xem khả năng quan sát cảm xúc, nhịp tích lũy, tam phương Mệnh - Quan - Tài, Thiên Di đối chiếu và cách người xem chăm sóc ranh giới của mình.',
    contextChecklist: [
      'So Mệnh với Thân Cung để biết chiều sâu cảm xúc ban đầu có chuyển thành khả năng nuôi dưỡng và tự chủ trưởng thành không.',
      'Kiểm tra tam hợp Mệnh - Quan Lộc - Tài Bạch để biết cảm xúc, nghề nghiệp và nguồn lực có nâng nhau hay làm nhau chậm lại.',
      'Xem Thiên Di đối chiếu để biết môi trường ngoài có làm người xem mở lòng, phòng thủ hay tự thu mình.',
      'Đọc cùng Thái Dương, Thiên Cơ, Cự Môn hoặc Tứ Hóa để cân bằng giữa cảm xúc, lý trí, lời nói và trách nhiệm công khai.',
      'Không suy luận tình trạng thân-tâm từ một sao; chỉ dùng như khung tham khảo về nhịp sống và tự quan sát.',
    ],
    selfCheckQuestions: [
      'Mình đang lắng nghe cảm xúc thật hay chỉ im lặng để tránh va chạm?',
      'Nhịp tích lũy nào giúp mình bền hơn: học, ghi chép, nghỉ ngơi hay chăm không gian sống?',
      'Mình cần nói rõ ranh giới nào để sự dịu dàng không biến thành chịu đựng?',
      'Môi trường nào làm mình mở lòng và môi trường nào khiến mình thu mình quá mức?',
    ],
    sensitiveTopicFlags: ['wellbeing'],
    contrastNotes: [
      'Khác với Thái Âm ở Phúc Đức, trọng tâm không nằm ở nền tinh thần/gia tộc mà ở khí chất tự thân và cách tự cảm nhận bản thân.',
      'Khác với Thái Dương ở Mệnh, Thái Âm nhấn vào quan sát kín, cảm xúc, nhịp tích lũy và khả năng nuôi dưỡng hơn là hiện diện công khai.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Chiều sâu cảm xúc, quan sát kín, nuôi dưỡng, tích lũy mềm và ranh giới tinh thần', readingCue: 'Đọc như nhịp tự cảm nhận, không như nhãn yếu/mạnh.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng biết lắng nghe, chăm chi tiết, tích lũy đều và nhìn ra điều người khác bỏ qua.', readingCue: 'Kiểm tra Quan Lộc/Tài Bạch để biết sự tinh tế có thành năng lực thực tế không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ giữ cảm xúc quá lâu, né va chạm hoặc để sự chăm sóc người khác làm mờ nhu cầu của mình.', readingCue: 'Tìm ranh giới, thói quen nói rõ và nhịp phục hồi.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa yếu đuối, thụ động, luôn may mắn hoặc luôn phù hợp sống kín.', readingCue: 'Tránh đóng khung tính cách từ biểu tượng mặt trăng.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Thân Cung, Thiên Di, Mệnh - Quan - Tài, Tứ Hóa, môi trường sống và nhịp cảm xúc thật.', readingCue: 'Thiếu dữ liệu giờ sinh thì chỉ đọc như bài tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Thái Âm ở Mệnh là người yếu và chỉ hợp sống kín.', better: 'Thái Âm ở Mệnh gợi chiều sâu cảm xúc và khả năng nuôi dưỡng; cần xem tam phương, Thiên Di, Thân Cung và bối cảnh thật.' },
      { wrong: 'Có Thái Âm thì chỉ cần chờ may mắn đến.', better: 'Cách đọc an toàn là nhấn vào nhịp tích lũy, chăm chi tiết, ranh giới cảm xúc và hành động đều đặn.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Thái Âm ở cung Mệnh nên được đọc như một kiểu nhạy cảm có chiều sâu. Thái Âm đem biểu tượng của mặt trăng, cảm xúc, sự nuôi dưỡng, khả năng quan sát kín và nhịp tích lũy mềm; cung Mệnh là khí chất gốc, nơi người xem phản ứng đầu tiên với đời sống. Khi hai lớp này gặp nhau, câu hỏi không phải là người này yếu hay mạnh, mà là họ đang dùng sự tinh tế để hiểu mình và chăm đời sống ra sao.',
          'Tổ hợp này dễ bị hiểu sai theo hai hướng: hoặc lãng mạn hóa như may mắn tự đến, hoặc hạ thấp như quá mềm. Cả hai đều không an toàn. Bài đọc tốt cần đưa người xem về hành vi cụ thể: cách họ ghi nhận cảm xúc, chăm không gian, tích lũy kỹ năng, giữ ranh giới và nói rõ nhu cầu. Đây là nội dung tham khảo theo Tam Hợp Phái, không phải lá số cá nhân.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, Thái Âm ở Mệnh gợi khả năng nhận ra sắc thái nhỏ: một thay đổi trong giọng nói, một cảm giác chưa gọi tên, một chi tiết trong môi trường sống hoặc công việc. Nếu được rèn đúng, sự nhạy này giúp người xem làm việc bền, chăm chất lượng, nuôi dưỡng quan hệ và tích lũy từng bước thay vì đốt sức trong các cú bứt phá ngắn.',
          'Điểm mạnh còn nằm ở khả năng tự quan sát. Người có tổ hợp này có thể học tốt qua ghi chép, phản tư, chăm nhịp sinh hoạt và sắp xếp không gian. Nếu Quan Lộc và Tài Bạch hỗ trợ, sự tinh tế có thể chuyển thành năng lực nghề: làm việc với chi tiết, trải nghiệm, nội dung, chăm sóc khách hàng, nghiên cứu hoặc các vai trò cần độ nhạy. Nhưng tất cả vẫn cần kiểm chứng bằng kỹ năng thật.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là giữ quá nhiều trong lòng. Thái Âm ở Mệnh có thể khiến người xem quen quan sát trước khi nói, nhưng nếu kéo dài, sự im lặng dễ thành chịu đựng hoặc suy diễn. Bài đọc nên nhắc đến ranh giới, khả năng gọi tên cảm xúc, thói quen hỏi lại và việc chọn môi trường an toàn để nói điều cần nói.',
          'Vì có sắc thái wellbeing, nội dung phải tránh mọi suy luận y tế hoặc kết luận trạng thái thân-tâm. Cách viết tốt là nói về nhịp nghỉ, không gian sống, thói quen ghi chép, sự hỗ trợ phù hợp và việc tìm người có chuyên môn khi có dấu hiệu bất thường. Tử Vi ở đây chỉ là khung văn hóa giúp tự quan sát, không phải chẩn đoán.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam phương của cung Mệnh nối với Quan Lộc và Tài Bạch. Nếu Thái Âm ở Mệnh rất nhạy nhưng Quan Lộc đòi hiện diện mạnh, người xem có thể cần học cách trình bày điều tinh tế thành ngôn ngữ rõ. Nếu Tài Bạch tốt, nhịp tích lũy mềm có thể giúp tạo nguồn lực ổn định; nếu Tài Bạch căng, cảm xúc dễ bị kéo bởi nỗi lo nguồn lực.',
          'Thiên Di đối chiếu cho biết môi trường bên ngoài làm người xem mở ra hay co lại. Một môi trường có nhịp tin cậy có thể giúp Thái Âm biểu hiện thành sự tinh tế; môi trường quá ồn hoặc thiếu an toàn có thể khiến người xem thu mình. Vì vậy không thể kết luận từ một cung Mệnh riêng lẻ, càng không nên đóng khung tính cách.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Người đọc có thể tự kiểm chứng bằng những câu hỏi gần đời sống: mình có ghi lại điều đang cảm không, có nói rõ nhu cầu trước khi quá tải không, có không gian nào giúp mình hồi lại không, và công việc nào biến sự tinh tế thành giá trị thật. Nếu câu trả lời chỉ là cảm giác mơ hồ, nên dừng ở mức tham khảo và tiếp tục quan sát.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là nói Thái Âm ở Mệnh làm người xem yếu hoặc chỉ cần chờ thuận lợi. Cách đọc tốt hơn là nói: tổ hợp này gợi chiều sâu cảm xúc, khả năng nuôi dưỡng và nhịp tích lũy mềm; cần xem tam phương, Thiên Di, Thân Cung, Tứ Hóa và hành vi thật để biết sự nhạy cảm đang nâng đỡ hay đang làm người xem thu mình.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này không thay thế tư vấn chuyên môn và không đọc thay lá số cá nhân. Để đọc riêng cần ngày giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, vị trí sao đủ 12 cung, Tứ Hóa và bối cảnh câu hỏi. Nếu liên quan đến sức khỏe thân-tâm, người xem nên tìm hỗ trợ chuyên môn phù hợp.',
        ],
      },
    ],
  },
  [comboKey('vu-khuc', 'menh')]: {
    intersectionThesis:
      'Vũ Khúc đem kỷ luật, tiêu chuẩn, năng lực đo lường và tinh thần tự lập; cung Mệnh là khí chất gốc và cách một người đứng vào đời sống; câu hỏi hữu ích là kỷ luật này đang giúp người xem tự chủ hơn hay đang làm họ quá cứng với bản thân.',
    misreadWarning:
      'Không nên đọc Vũ Khúc ở Mệnh như bảo đảm giàu, lạnh lùng hoặc chỉ hợp với con số. Cách đọc an toàn là xem xu hướng tự lập, tiêu chuẩn cá nhân, tam phương Mệnh - Quan - Tài, Thiên Di đối chiếu và cách người xem cân bằng kỷ luật với sự mềm mại.',
    contextChecklist: [
      'So Mệnh với Thân Cung để biết tinh thần tự lập ban đầu có chuyển thành năng lực trưởng thành hay thành thói quen tự gồng không.',
      'Kiểm tra tam hợp Mệnh - Quan Lộc - Tài Bạch để biết kỷ luật cá nhân có được nghề nghiệp và nguồn lực thực tế hỗ trợ không.',
      'Xem Thiên Di đối chiếu để biết môi trường ngoài phản hồi sự thẳng, chắc và tiêu chuẩn cao ra sao.',
      'Đọc cùng Thái Âm, Thiên Lương, Cự Môn hoặc Tứ Hóa nếu có để cân bằng giữa con số, cảm xúc, lời nói và chuẩn mực.',
      'Tránh mọi lời hứa kết quả nguồn lực; chỉ dùng ngôn ngữ về thói quen, tiêu chuẩn, quản trị rủi ro và hành vi thật.',
    ],
    selfCheckQuestions: [
      'Tiêu chuẩn nào đang giúp mình tự chủ hơn, tiêu chuẩn nào chỉ làm mình căng?',
      'Mình có đang đo đúng thứ cần đo hay dùng con số để tránh cảm xúc?',
      'Khi tự lập, mình có biết nhờ hỗ trợ đúng lúc không?',
      'Hệ thống nhỏ nào giúp mình bền hơn: ghi chép, lịch nghỉ, ngân sách thời gian hay ranh giới công việc?',
    ],
    sensitiveTopicFlags: ['resource-management'],
    contrastNotes: [
      'Khác với Vũ Khúc ở Tài Bạch, trọng tâm không chỉ là nguồn lực vật chất mà là khí chất tự lập, tiêu chuẩn cá nhân và cách đứng vào đời sống.',
      'Khác với Tử Vi ở Mệnh, Vũ Khúc nhấn vào kỷ luật, đo lường và tiêu chuẩn rõ hơn là trục điều phối hoặc danh dự trung tâm.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Tự lập, kỷ luật, tiêu chuẩn cá nhân, đo lường và quản trị nguồn lực', readingCue: 'Đọc như thói quen tự chủ, không như lời hứa kết quả.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng chịu trách nhiệm, thích rõ ràng, biết ghi chép và biến mục tiêu thành hệ thống nhỏ có thể theo dõi.', readingCue: 'Kiểm tra Quan Lộc/Tài Bạch để biết kỷ luật có thành giá trị thực tế không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ quá cứng, khó nhờ giúp, tự đánh giá bằng kết quả đo được hoặc bỏ qua nhu cầu cảm xúc.', readingCue: 'Tìm khả năng mềm lại, nghỉ ngơi và nhận hỗ trợ.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa bảo đảm kết quả nguồn lực, luôn giỏi quản lý hoặc phải sống khô khan.', readingCue: 'Tránh dùng sao để hứa hẹn hoặc đóng khung tính cách.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Thân Cung, Thiên Di, Mệnh - Quan - Tài, Tứ Hóa, thói quen ghi chép và nhịp sống thật.', readingCue: 'Thiếu dữ liệu giờ sinh thì chỉ đọc như khái niệm tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Vũ Khúc ở Mệnh là số tự nhiên có nhiều nguồn lực.', better: 'Vũ Khúc ở Mệnh gợi kỷ luật và tiêu chuẩn tự lập; cần xem tam phương, nghề nghiệp, nguồn lực thật và thói quen quản trị.' },
      { wrong: 'Có Vũ Khúc thì càng cứng càng tốt.', better: 'Kỷ luật chỉ bền khi đi cùng nhịp nghỉ, khả năng nhờ hỗ trợ, dữ liệu đúng và sự mềm mại trong quan hệ.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Vũ Khúc ở cung Mệnh là tổ hợp nên đọc bằng ngôn ngữ của kỷ luật và tự chủ. Vũ Khúc đem biểu tượng của tiêu chuẩn, đo lường, trách nhiệm với nguồn lực và khả năng chịu việc khó; cung Mệnh là khí chất gốc và cách một người tự đứng vào đời sống. Khi hai lớp này gặp nhau, trọng tâm là người xem đang dùng kỷ luật để xây nền vững hay đang tự siết mình bằng những tiêu chuẩn quá cứng.',
          'Đây là tổ hợp rất dễ bị kéo sang lời hứa về tiền bạc hoặc hình ảnh người lạnh lùng. Cách viết an toàn phải tránh cả hai. Vũ Khúc ở Mệnh không nói rằng kết quả nguồn lực sẽ tự đến; nó chỉ gợi khả năng làm việc có tiêu chuẩn, ghi chép, đo lường, giữ cam kết và chịu trách nhiệm với lựa chọn. Muốn đọc đúng vẫn phải đặt trong tam phương tứ chính và bối cảnh đời sống thật.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, Vũ Khúc ở Mệnh gợi một người có xu hướng thích rõ ràng: mục tiêu rõ, tiêu chuẩn rõ, kết quả đo được và trách nhiệm không mơ hồ. Trong thực tế, đây là lời nhắc rất hữu ích để xây hệ thống cá nhân: ghi chép việc quan trọng, đặt giới hạn thời gian, theo dõi năng lượng, quản trị nguồn lực theo khả năng thật và học cách nói “không” với việc không phục vụ mục tiêu.',
          'Điểm mạnh tự lập cũng cần được hiểu đúng. Tự lập không phải làm mọi thứ một mình, mà là biết mình chịu trách nhiệm phần nào và cần hỗ trợ phần nào. Nếu Quan Lộc rõ, kỷ luật này có thể thành năng lực nghề. Nếu Tài Bạch rõ, nó có thể giúp người xem quản trị nguồn lực tốt hơn. Nếu Thiên Di phản chiếu áp lực, người xem cần học cách mềm hơn khi tương tác với môi trường ngoài.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là sự khô cứng với bản thân. Vũ Khúc ở Mệnh có thể khiến người xem quen nhìn mọi việc qua tiêu chuẩn, kết quả hoặc con số. Điều này hữu ích khi cần kỷ luật, nhưng nếu quá mức sẽ làm họ khó nhận hỗ trợ, khó nói về cảm xúc hoặc tự đánh giá mình chỉ bằng năng suất. Bài đọc nên nhắc đến nghỉ ngơi, ranh giới và dữ liệu đúng thay vì kích hoạt áp lực phải thắng nhanh.',
          'Vì có liên quan đến nguồn lực, nội dung phải đặc biệt tránh lời hứa kết quả hoặc khuyến nghị quyết định rủi ro. Cách viết tốt là nói về thói quen: ghi chép, kiểm tra mục tiêu, đặt giới hạn, học kỹ năng, hỏi người có chuyên môn khi cần và không dùng Tử Vi để thay thế quyết định quan trọng.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam phương của cung Mệnh nối với Quan Lộc và Tài Bạch. Nếu Vũ Khúc ở Mệnh có kỷ luật nhưng Quan Lộc chưa rõ, người xem có thể rất cố gắng nhưng chưa biết đặt sức vào đúng vai trò. Nếu Tài Bạch thiếu nền, tiêu chuẩn cao có thể biến thành lo lắng về nguồn lực. Nếu cả Quan Lộc và Tài Bạch hỗ trợ, kỷ luật cá nhân có cơ hội chuyển thành giá trị đo được.',
          'Thiên Di đối chiếu cho biết môi trường ngoài phản hồi sự chắc, thẳng và tiêu chuẩn cao như thế nào. Có môi trường đánh giá cao sự rõ ràng; cũng có môi trường cần mềm hơn, nhiều đối thoại hơn. Đọc tam phương tứ chính giúp người xem không dùng Vũ Khúc như một cái cớ để cứng mãi, mà xem nó như năng lực cần đặt đúng hoàn cảnh.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Câu hỏi tự kiểm chứng nên rất thực tế: mình đang đo điều gì, con số nào thật sự hữu ích, tiêu chuẩn nào cần giữ, tiêu chuẩn nào nên hạ để sống bền hơn, và việc nào nên nhờ người khác. Nếu câu trả lời có thể viết thành lịch, bảng theo dõi hoặc ranh giới cụ thể, tổ hợp này được dùng đúng hướng tham khảo.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là nói Vũ Khúc ở Mệnh bảo đảm nguồn lực hoặc biến người xem thành kiểu người khô khan cố định. Cách đọc tốt hơn là nói: tổ hợp này gợi kỷ luật, tự lập và khả năng quản trị tiêu chuẩn; muốn biết nó giúp hay làm căng, cần xem Mệnh - Quan - Tài, Thiên Di, Thân Cung, Tứ Hóa và hành vi thật.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này không thay thế tư vấn tài chính, pháp lý, y tế hoặc quyết định quan trọng. Để đọc cá nhân cần ngày giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, đủ 12 cung, Tứ Hóa và bối cảnh câu hỏi. Người đọc nên dùng bài viết để tự quan sát kỷ luật và nguồn lực, không dùng để hứa hẹn kết quả.',
        ],
      },
    ],
  },
}


const BATCH_2B_1_DRAFT_PROFILES: Record<string, StarPalaceDraftProfile> = {
  [comboKey('thien-phu', 'menh')]: {
    intersectionThesis:
      'Thiên Phủ đem sắc thái kho chứa, quản trị nguồn lực và giữ nhịp ổn định; cung Mệnh là khí chất gốc và cách một người tự đứng vào đời sống; câu hỏi hữu ích là sự vững vàng này đang giúp người xem biết gìn giữ điều quan trọng hay đang khiến họ quá thận trọng trước thay đổi.',
    misreadWarning:
      'Không nên đọc Thiên Phủ ở Mệnh như lời hứa về nguồn lực, vị thế hoặc đời sống luôn đủ đầy. Cách đọc an toàn là xem năng lực giữ nhịp, quản trị nguồn lực, tam phương Mệnh - Quan - Tài và mức linh hoạt trong hành vi thật.',
    contextChecklist: [
      'So Mệnh với Thân Cung để biết khí chất ổn định ban đầu có chuyển thành năng lực chăm giữ dài hạn không.',
      'Kiểm tra tam hợp Mệnh - Quan Lộc - Tài Bạch để biết khả năng gìn giữ có đi cùng vai trò nghề và nguồn lực thực tế không.',
      'Xem Thiên Di đối chiếu để biết môi trường ngoài nhìn sự thận trọng này như uy tín, sự chậm rãi hay một hàng rào khó tiếp cận.',
      'Đọc cùng Tử Vi, Vũ Khúc, Thái Âm hoặc Tứ Hóa nếu có để phân biệt quản trị nguồn lực, tự chủ và nhu cầu an toàn.',
      'Đối chiếu dữ kiện đời sống: thói quen lập kế hoạch, giữ cam kết, cách dùng tiền-thời gian và mức sẵn sàng thay đổi khi bối cảnh đổi.',
    ],
    selfCheckQuestions: [
      'Mình đang giữ điều gì vì nó thật sự quan trọng, và điều gì chỉ vì sợ mất ổn định?',
      'Nguồn lực nào cần được ghi chép, chia sẻ hoặc đặt ranh giới rõ hơn trong tháng này?',
      'Khi môi trường thay đổi, mình có phương án thử nhỏ hay chỉ chờ đến khi mọi thứ thật chắc?',
      'Ai là người có thể phản hồi giúp mình phân biệt thận trọng lành mạnh với trì hoãn?',
    ],
    sensitiveTopicFlags: ['resource-management'],
    contrastNotes: [
      'Khác với Thiên Phủ ở Tài Bạch, trọng tâm không nằm trước hết ở dòng nguồn lực mà ở khí chất tự thân: cách người xem giữ nhịp, tin cậy và tổ chức đời sống.',
      'Khác với Tử Vi ở Mệnh, Thiên Phủ nhấn vào gìn giữ và dung chứa nhiều hơn vai trò trung tâm điều phối; hai sao cần đọc trong toàn cục, không thay thế nhau.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Ổn định, quản trị nguồn lực, gìn giữ cam kết và khí chất đáng tin', readingCue: 'Đọc như thói quen chăm giữ, không như lời hứa vật chất.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng biết giữ lời, tạo nền an toàn, gom việc thành nề nếp và bảo vệ điều có giá trị.', readingCue: 'Kiểm tra Quan Lộc/Tài Bạch để biết nền này có thành năng lực thực tế không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ quá an toàn, chậm thử điều mới hoặc dùng sự ổn định để tránh đối thoại khó.', readingCue: 'Tìm dấu hiệu linh hoạt, thử nghiệm nhỏ và phản hồi từ Thiên Di.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa bảo đảm nguồn lực, nhà cửa, chức vị hoặc đời sống luôn thuận.', readingCue: 'Tránh mọi kết luận vật chất từ một sao ở Mệnh.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Thân Cung, Thiên Di, Mệnh - Quan - Tài, Tứ Hóa, phụ tinh và thói quen quản trị đời sống thật.', readingCue: 'Thiếu dữ liệu giờ sinh thì chỉ đọc như khung tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Thiên Phủ ở Mệnh là dấu hiệu đời sống vật chất tự nhiên đủ đầy.', better: 'Thiên Phủ ở Mệnh gợi khí chất gìn giữ và quản trị nguồn lực; cần xem tam phương, Tứ Hóa và hành vi thật trước khi đưa lời khuyên tham khảo.' },
      { wrong: 'Có Thiên Phủ thì cứ giữ nguyên mọi thứ là an toàn.', better: 'Điểm mạnh ổn định chỉ bền khi biết cập nhật dữ liệu, thử nhỏ, đặt ranh giới và linh hoạt trước bối cảnh mới.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Thiên Phủ ở cung Mệnh nên được đọc như năng lực tạo nền và giữ nhịp cho đời sống, không phải như một nhãn bảo đảm về nguồn lực. Thiên Phủ trong ngôn ngữ Tử Vi thường gắn với kho chứa, sự cẩn trọng và khả năng bảo quản; cung Mệnh lại nói về khí chất gốc, cách một người tự đặt mình vào thế giới và phản ứng đầu tiên khi có việc cần quyết định. Khi hai lớp này gặp nhau, điểm cần quan sát là người xem dùng sự vững vàng để nuôi dưỡng điều quan trọng hay dùng nó để né thay đổi.',
          'Điểm khác với trang sao Thiên Phủ chung là bài này không chỉ nói “biết giữ” một cách rộng. Nó đặt câu hỏi cụ thể hơn: người này giữ lời hứa ra sao, quản trị thời gian và nguồn lực thế nào, có biết chia sẻ trách nhiệm không, và khi bối cảnh đổi thì họ có đủ mềm để cập nhật cách làm. Vì vậy nội dung chỉ mang tính tham khảo, không phải lá số cá nhân và không phải lời tiên đoán về kết quả vật chất.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, Thiên Phủ ở Mệnh gợi hình ảnh một người thích tạo nền an toàn trước khi hành động. Họ có thể hợp với việc xây nề nếp, giữ cam kết, quản trị lịch, chăm sóc tài sản chung theo nghĩa rộng và làm cho người xung quanh cảm thấy việc quan trọng được đặt đúng chỗ. Điểm mạnh này đặc biệt hữu ích trong giai đoạn nhiều việc rời rạc, vì nó nhắc người xem biến sự ổn định thành hệ thống có thể kiểm tra.',
          'Trong đời sống hiện đại, cách phát huy an toàn là ghi rõ nguồn lực đang có: thời gian, năng lượng, kỹ năng, quan hệ hỗ trợ và trách nhiệm đang nhận. Thiên Phủ ở Mệnh không khuyến khích ôm hết mọi thứ; nó hợp hơn với câu hỏi “điều gì cần được giữ, điều gì cần giao lại, điều gì nên đơn giản hóa”. Khi câu trả lời đi thành lịch, danh sách và ranh giới, tổ hợp này trở thành bài học quản trị bản thân thay vì lời khen mơ hồ.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là sự thận trọng quá mức. Người có khí chất Thiên Phủ ở Mệnh trong bài đọc tham khảo có thể quen đợi đủ điều kiện mới bắt đầu, khó đổi kế hoạch vì sợ mất nền, hoặc giữ nhiều trách nhiệm vì không yên tâm giao cho người khác. Nếu đọc thiếu bối cảnh, người viết dễ tô hồng sự ổn định và bỏ qua phần trì hoãn, khép kín hoặc nặng gánh.',
          'Cách viết an toàn là nhắc người đọc thử nghiệm nhỏ, kiểm chứng bằng dữ liệu thật và hỏi phản hồi. Với các chủ đề nguồn lực, tuyệt đối không đưa lời hứa kết quả hoặc khuyến nghị rủi ro. Bài đọc chỉ nên gợi thói quen: lập kế hoạch vừa đủ, theo dõi cam kết, hỏi người có chuyên môn khi quyết định quan trọng và phân biệt an toàn lành mạnh với nỗi sợ thay đổi.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam phương của cung Mệnh nối với Quan Lộc và Tài Bạch, nên Thiên Phủ ở Mệnh không thể đọc rời công việc và nguồn lực. Nếu Mệnh có nhu cầu ổn định nhưng Quan Lộc chưa rõ vai trò, người xem có thể bận giữ nề nếp mà chưa biết đặt sức vào đâu. Nếu Tài Bạch chưa có hệ thống, sự cẩn trọng dễ biến thành lo xa. Ngược lại, khi nghề nghiệp và nguồn lực có dữ kiện tốt, khí chất Thiên Phủ có thể giúp duy trì nhịp bền hơn.',
          'Thiên Di đối chiếu cho biết môi trường ngoài phản hồi sự vững vàng này như thế nào. Có nơi cần người giữ nhịp, nhưng cũng có nơi cần phản ứng nhanh và đối thoại nhiều hơn. Tam phương tứ chính giúp bài đọc không đóng khung “người ổn định” thành một tính cách bất biến; nó biến tổ hợp thành bộ câu hỏi về bối cảnh, vai trò và hành vi có thể quan sát.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Câu hỏi tự kiểm chứng nên đi vào việc rất gần: mình đang giữ điều gì, vì sao giữ, ai đang cùng chịu trách nhiệm, và dấu hiệu nào cho thấy nền hiện tại đã đủ để thử bước tiếp. Nếu người đọc chỉ trả lời bằng cảm giác chung, bài Tử Vi vẫn còn ở tầng biểu tượng. Nếu họ trả lời bằng lịch, con số, ranh giới và ví dụ tuần gần nhất, nội dung tham khảo bắt đầu có ích.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là biến Thiên Phủ ở Mệnh thành lời hứa về sự đủ đầy hoặc một lý do để không thay đổi. Cách đọc tốt hơn là nói: tổ hợp này gợi nhu cầu tạo nền, giữ cam kết và quản trị nguồn lực, nhưng muốn biết nó là điểm mạnh hay điểm kẹt phải xem Mệnh - Quan - Tài, Thiên Di, Thân Cung, Tứ Hóa và đời sống thật.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này không thay thế tư vấn tài chính, pháp lý, y tế hoặc quyết định quan trọng. Để đọc cá nhân cần ngày giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, đủ 12 cung, Tứ Hóa, phụ tinh và câu hỏi cụ thể. Người đọc nên dùng bài viết để quan sát cách mình giữ nền và quản trị nguồn lực, không dùng để kết luận kết quả đời sống.',
        ],
      },
    ],
  },
  [comboKey('cu-mon', 'menh')]: {
    intersectionThesis:
      'Cự Môn đem năng lực ngôn ngữ, đặt câu hỏi và soi rõ điểm chưa nói; cung Mệnh là khí chất gốc và cách một người tự thể hiện; câu hỏi hữu ích là lời nói của người xem đang mở ra hiểu biết chung hay đang làm mọi thứ nặng hơn vì thiếu lắng nghe.',
    misreadWarning:
      'Không nên đọc Cự Môn ở Mệnh như nhãn “hay tranh cãi” hoặc bảo đảm phù hợp với một nghề nào đó. Cách đọc an toàn là xem phong cách giao tiếp, khả năng đặt câu hỏi, tam phương Mệnh - Quan - Tài và cách người xem kiểm chứng lời nói bằng hành vi.',
    contextChecklist: [
      'So Mệnh với Thân Cung để biết khí chất nói thẳng ban đầu có trưởng thành thành kỹ năng đối thoại không.',
      'Kiểm tra tam hợp Mệnh - Quan Lộc - Tài Bạch để biết lời nói, tri thức và năng lực truyền đạt có tạo giá trị thực tế không.',
      'Xem Thiên Di đối chiếu để biết môi trường ngoài nghe lời nói này như sự rõ ràng, sự chất vấn hữu ích hay áp lực giao tiếp.',
      'Đọc cùng Thiên Cơ, Thái Dương, Thái Âm hoặc Tứ Hóa nếu có để cân bằng giữa phân tích, minh bạch, cảm xúc và nhịp lắng nghe.',
      'Đối chiếu dữ kiện đời sống: cách họ hỏi, viết, phản hồi, xin lỗi, tóm tắt thỏa thuận và kiểm tra hiểu lầm trước khi kết luận.',
    ],
    selfCheckQuestions: [
      'Mình đang hỏi để hiểu thêm hay hỏi để thắng một cuộc đối thoại?',
      'Trước khi nói điều khó, mình đã tóm tắt đúng điều người kia muốn nói chưa?',
      'Lời nói nào của mình gần đây tạo rõ ràng, và lời nào làm người khác phải phòng thủ?',
      'Mình có thói quen ghi lại thỏa thuận, phản hồi và việc cần làm sau cuộc trò chuyện không?',
    ],
    sensitiveTopicFlags: [],
    contrastNotes: [
      'Khác với Cự Môn ở Quan Lộc, trọng tâm không nằm trước hết ở nghề truyền đạt mà ở khí chất giao tiếp và cách bản thân dùng câu hỏi trong đời sống.',
      'Khác với Thái Dương ở Mệnh, Cự Môn không chỉ là ánh sáng công khai; nó nhấn vào khả năng mở vấn đề, đặt tên điều mơ hồ và kiểm tra ngôn từ.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Giao tiếp, chất vấn, đặt tên vấn đề và học cách lắng nghe', readingCue: 'Đọc như phong cách đối thoại, không như nhãn tính cách cố định.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng nhận ra điểm chưa rõ, hỏi đúng chỗ, diễn đạt mạch lạc và giúp nhóm thống nhất cách hiểu.', readingCue: 'Kiểm tra Quan Lộc/Tài Bạch để biết lời nói có thành giá trị thực tế không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ nói quá nhanh, hỏi quá sắc hoặc biến việc làm rõ thành áp lực cho người đối diện.', readingCue: 'Tìm dấu hiệu lắng nghe, ghi nhận cảm xúc và xác nhận lại trước khi phản biện.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa người này luôn gây rối, luôn đúng, hoặc chỉ hợp một nhóm nghề truyền đạt.', readingCue: 'Tránh dán nhãn từ một sao ở Mệnh.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Thân Cung, Thiên Di, Mệnh - Quan - Tài, Tứ Hóa, phụ tinh và ví dụ giao tiếp thật.', readingCue: 'Thiếu dữ liệu giờ sinh thì chỉ đọc như khung tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Cự Môn ở Mệnh là người hay gây chuyện nên các quan hệ khó yên.', better: 'Cự Môn ở Mệnh gợi khí chất đặt câu hỏi và dùng lời nói mạnh; cần xem cách lắng nghe, Thiên Di, tam phương và ví dụ giao tiếp thật.' },
      { wrong: 'Có Cự Môn thì nói thẳng lúc nào cũng đúng.', better: 'Điểm mạnh nói rõ chỉ bền khi có mục đích, dữ kiện, sự tôn trọng cảm xúc và bước xác nhận lại sau đối thoại.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Cự Môn ở cung Mệnh là tổ hợp nên đọc bằng ngôn ngữ giao tiếp và nhận thức, không đọc như lời phán về tính cách xấu. Cự Môn gắn với miệng nói, câu hỏi, khả năng mở điều bị che và nhu cầu kiểm tra ngôn từ; cung Mệnh nói về khí chất gốc, cách một người xuất hiện và phản ứng đầu tiên với đời sống. Khi gặp nhau, bài đọc hữu ích không hỏi “người này có hay cãi không”, mà hỏi lời nói của họ đang giúp làm sáng vấn đề hay làm đối thoại thêm căng.',
          'Điểm khác với trang sao Cự Môn chung là bài này đặt trọng tâm vào chủ thể: cách người xem tự dùng tiếng nói của mình. Một câu hỏi sắc có thể giúp nhóm nhìn ra điểm mù, nhưng cũng có thể làm người khác phòng thủ nếu thiếu lắng nghe. Vì vậy nội dung chỉ mang tính tham khảo, không phải lá số cá nhân và không phải lời tiên đoán về quan hệ hay nghề nghiệp.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, Cự Môn ở Mệnh gợi khả năng đặt câu hỏi đúng lúc, phát hiện điểm chưa rõ và diễn đạt điều phức tạp thành câu chữ dễ kiểm tra. Đây là điểm mạnh lớn trong học tập, làm việc nhóm, tư vấn nội bộ, viết lách, giảng giải hoặc bất kỳ tình huống nào cần thống nhất cách hiểu. Giá trị không nằm ở việc nói nhiều, mà ở việc nói giúp mọi người nhìn vấn đề rõ hơn.',
          'Cách phát huy an toàn là rèn các kỹ năng rất cụ thể: tóm tắt lại điều đã nghe, hỏi một câu trước khi phản biện, viết thỏa thuận sau cuộc họp, phân biệt dữ kiện với suy đoán và xin phản hồi về giọng điệu. Khi lời nói đi cùng trách nhiệm kiểm chứng, Cự Môn ở Mệnh có thể trở thành năng lực xây cầu nối thay vì nguồn căng thẳng.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là thói quen dùng lời nói như phản xạ phòng thủ. Người có khí chất Cự Môn ở Mệnh trong bài đọc tham khảo có thể thấy điểm sai rất nhanh, nhưng nếu nói ngay khi cảm xúc còn cao, câu đúng vẫn có thể sai thời điểm. Rủi ro không phải là một kết quả cố định; nó là dấu hiệu cần luyện nhịp dừng, nghe đủ và chọn kênh phù hợp.',
          'Bài viết không nên dùng ngôn ngữ hù dọa về hiểu lầm kéo dài, xung đột hoặc quan hệ đổ vỡ. Cách viết tốt hơn là nói về vệ sinh giao tiếp: nói rõ mục đích, tránh suy diễn động cơ, hỏi lại trước khi kết luận, ghi nhận phần mình chưa biết và đặt ranh giới khi cuộc trò chuyện quá tải. Đây là những hành vi có thể tập, không phải số phận.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam phương của cung Mệnh kéo Quan Lộc và Tài Bạch vào cùng bài đọc. Nếu Cự Môn ở Mệnh có khả năng diễn đạt nhưng Quan Lộc chưa có vai trò phù hợp, lời nói có thể nhiều mà chưa thành giá trị. Nếu Tài Bạch chưa rõ nguồn lực, người xem có thể phải biến năng lực giao tiếp thành kỹ năng đo được: viết tài liệu, đào tạo, tư vấn quy trình hoặc làm rõ yêu cầu. Không thể kết luận từ một cung riêng lẻ.',
          'Thiên Di đối chiếu đặc biệt quan trọng vì giao tiếp luôn có người nghe. Môi trường ngoài có thể xem lời chất vấn là hữu ích nếu có niềm tin và quy tắc chung; cũng có thể thấy nó nặng nếu thiếu bối cảnh. Tam phương tứ chính giúp người xem hỏi: lời mình nói đang phục vụ điều gì, được môi trường tiếp nhận thế nào, và cần điều chỉnh kênh giao tiếp ra sao.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Câu hỏi tự kiểm chứng nên bám vào các cuộc trò chuyện gần nhất: mình đã nghe đủ chưa, có tóm tắt lại trước khi phản biện không, sau khi nói có hành động tiếp theo rõ không, và người khác có hiểu ý mình theo cách mình muốn không. Nếu câu trả lời chỉ là “tôi nói đúng”, bài đọc còn thiếu nửa phần lắng nghe. Nếu có ví dụ, ghi chú và điều chỉnh, tổ hợp này được dùng đúng hướng tham khảo.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là dán nhãn Cự Môn ở Mệnh thành người luôn gây căng thẳng. Cách đọc tốt hơn là nói: tổ hợp này gợi năng lực đặt câu hỏi và làm rõ vấn đề; muốn biết nó đang giúp hay làm nặng, cần xem Mệnh - Quan - Tài, Thiên Di, Thân Cung, Tứ Hóa và cách người đó thật sự đối thoại.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này không thay thế tư vấn pháp lý, y tế, tài chính hoặc quyết định quan trọng. Không dùng một sao ở Mệnh để đánh giá phẩm chất của một người. Để đọc cá nhân cần ngày giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, đủ 12 cung, Tứ Hóa, phụ tinh và bối cảnh câu hỏi. Người đọc nên dùng bài viết để quan sát lời nói và nhịp lắng nghe, không dùng để kết luận quan hệ.',
        ],
      },
    ],
  },
  [comboKey('thien-dong', 'menh')]: {
    intersectionThesis:
      'Thiên Đồng đem sắc thái mềm, dễ thích nghi và nhu cầu được sống nhẹ; cung Mệnh là khí chất gốc và cách một người tự bước vào đời sống; câu hỏi hữu ích là sự mềm này đang giúp người xem linh hoạt hơn hay đang khiến trách nhiệm bị trì hoãn.',
    misreadWarning:
      'Không nên đọc Thiên Đồng ở Mệnh như bảo đảm an nhàn, phúc lộc hoặc trạng thái thân-tâm luôn thuận. Cách đọc an toàn là xem khả năng thích nghi, nhu cầu nhịp sống mềm, tam phương Mệnh - Quan - Tài và cách người xem nhận trách nhiệm thật.',
    contextChecklist: [
      'So Mệnh với Thân Cung để biết khí chất mềm ban đầu có trưởng thành thành sự linh hoạt có trách nhiệm không.',
      'Kiểm tra tam hợp Mệnh - Quan Lộc - Tài Bạch để biết nhịp sống mềm có được vai trò nghề và nguồn lực thực tế nâng đỡ không.',
      'Xem Thiên Di đối chiếu để biết môi trường ngoài phản hồi sự dễ chịu này như sự hòa hợp, thiếu ranh giới hay nhu cầu rõ ràng hơn.',
      'Đọc cùng Thiên Lương, Thái Âm, Thiên Cơ hoặc Tứ Hóa nếu có để phân biệt lòng tốt, cảm xúc, học hỏi và xu hướng đổi nhịp.',
      'Đối chiếu dữ kiện đời sống: lịch nghỉ, mức chủ động, cách nhận việc, lời hứa đã giữ và khả năng nói không khi quá tải.',
    ],
    selfCheckQuestions: [
      'Mình đang chọn sự nhẹ nhàng vì nó giúp bền hơn hay vì muốn tránh việc khó?',
      'Lời hứa nào cần được viết rõ để sự mềm không biến thành mơ hồ?',
      'Môi trường nào giúp mình vui vẻ mà vẫn có ranh giới và trách nhiệm?',
      'Tuần này mình có một bước nhỏ nào để biến cảm hứng thành hành động thật không?',
    ],
    sensitiveTopicFlags: [],
    contrastNotes: [
      'Khác với Thiên Đồng ở Phúc Đức, trọng tâm không nằm ở nền gia đình hoặc phúc khí tinh thần mà ở khí chất tự thân và cách người xem bắt đầu hành động.',
      'Khác với Thái Âm ở Mệnh, Thiên Đồng nhấn vào sự mềm, khả năng đổi nhịp và nhu cầu vui sống hơn là chiều sâu cảm xúc kín đáo.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Mềm mại, thích nghi, vui sống, nhịp nghỉ và trách nhiệm nhẹ nhưng rõ', readingCue: 'Đọc như phong cách sống, không như lời hứa an nhàn.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng dễ hòa nhập, biết làm dịu không khí, học qua trải nghiệm và tạo nhịp sống ít căng hơn.', readingCue: 'Kiểm tra Quan Lộc/Tài Bạch để biết sự mềm có thành năng lực thực tế không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ trì hoãn việc khó, mơ hồ ranh giới hoặc chờ cảm hứng trước khi nhận trách nhiệm.', readingCue: 'Tìm dấu hiệu lịch nhỏ, cam kết rõ và khả năng nói không.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa đời sống luôn nhẹ, luôn được nâng đỡ hoặc có thể bỏ qua nỗ lực.', readingCue: 'Tránh biến sao thành bảo chứng kết quả.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Thân Cung, Thiên Di, Mệnh - Quan - Tài, Tứ Hóa, phụ tinh và thói quen nhận việc thật.', readingCue: 'Thiếu dữ liệu giờ sinh thì chỉ đọc như khung tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Thiên Đồng ở Mệnh là đời sống an nhàn nên không cần lo nhiều.', better: 'Thiên Đồng ở Mệnh gợi khí chất mềm và nhu cầu nhịp sống dễ thở; cần xem tam phương, trách nhiệm thật và khả năng giữ lời hứa.' },
      { wrong: 'Có Thiên Đồng thì cứ thuận theo cảm xúc là đúng.', better: 'Sự mềm chỉ bền khi có ranh giới, lịch nhỏ, trách nhiệm rõ và cách phục hồi lành mạnh.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Thiên Đồng ở cung Mệnh nên được đọc như cách một người tìm nhịp sống dễ thở, không phải như lời hứa đời sống luôn nhẹ. Thiên Đồng đem ngôn ngữ của sự mềm, thích nghi, vui sống và khả năng làm dịu không khí; cung Mệnh nói về khí chất gốc, phản ứng đầu tiên và cách một người tự bước vào các tình huống. Khi hai lớp này gặp nhau, trọng tâm là người xem đang dùng sự mềm để linh hoạt hơn hay dùng nó để tránh trách nhiệm cần nhận.',
          'Điểm khác với trang sao Thiên Đồng chung là bài này không chỉ nói về “phúc” hoặc sự dễ chịu. Nó hỏi cụ thể hơn: người này nhận việc ra sao, giữ lời hứa thế nào, biết nghỉ đúng lúc không, và có biến cảm hứng thành bước nhỏ được không. Nội dung chỉ mang tính tham khảo, không phải lá số cá nhân và không phải lời tiên đoán về mức an nhàn hay trạng thái thân-tâm.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, Thiên Đồng ở Mệnh gợi người có khả năng làm mềm không khí và thích nghi với hoàn cảnh. Họ có thể học tốt qua trải nghiệm, dễ kết nối với người khác bằng sự gần gũi, và biết tìm cách giảm căng thẳng khi mọi việc quá cứng. Trong môi trường nhiều áp lực, đây là điểm mạnh vì nó nhắc mọi người rằng nhịp sống bền không chỉ có kỷ luật mà còn cần khả năng phục hồi.',
          'Cách phát huy an toàn là biến sự mềm thành phương pháp. Người xem có thể đặt lịch nhỏ thay vì mục tiêu mơ hồ, chia việc khó thành bước nhẹ, có giờ nghỉ rõ và nói ranh giới trước khi quá tải. Khi Thiên Đồng ở Mệnh đi cùng trách nhiệm được viết ra, nó không còn là sự trôi theo cảm xúc mà trở thành năng lực điều hòa đời sống.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là xu hướng né điều khó bằng sự dễ chịu. Người có khí chất Thiên Đồng ở Mệnh trong bài đọc tham khảo có thể chờ cảm hứng, đổi ý khi việc nặng lên hoặc để người khác đoán ranh giới của mình. Đây không phải kết luận cố định, mà là dấu hiệu nên kiểm tra lịch, lời hứa và mức chủ động trong đời sống thật.',
          'Bài viết cần tránh mọi lời bảo đảm về an nhàn, trạng thái thân-tâm hoặc sự thuận lợi. Cách viết tốt hơn là nói về hành vi bảo vệ nhịp sống: nghỉ đúng lúc, hỏi hỗ trợ khi cần, viết rõ cam kết, chọn môi trường bớt căng và không dùng cảm giác dễ chịu để trì hoãn quyết định quan trọng. Tử Vi ở đây là khung văn hóa để tự quan sát, không phải công cụ thay trách nhiệm cá nhân.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam phương của cung Mệnh nối với Quan Lộc và Tài Bạch. Nếu Thiên Đồng ở Mệnh mềm và dễ thích nghi nhưng Quan Lộc thiếu cấu trúc, người xem có thể nhiều ý tưởng mà ít bước triển khai. Nếu Tài Bạch chưa có nền, nhịp sống dễ chịu cần được đặt cạnh cách quản trị nguồn lực và thời gian. Khi Quan Lộc và Tài Bạch hỗ trợ, sự mềm có thể trở thành khả năng làm việc bền, không phải sự buông lỏng.',
          'Thiên Di đối chiếu cho biết môi trường ngoài cần gì ở khí chất này. Có môi trường quý sự hòa hợp; có môi trường cần quyết định nhanh, lời hứa rõ và ranh giới mạnh hơn. Đọc tam phương tứ chính giúp người xem không biến Thiên Đồng thành nhãn “vui vẻ” đơn giản, mà xem nó như câu hỏi về bối cảnh, trách nhiệm và khả năng điều chỉnh nhịp.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Câu hỏi tự kiểm chứng nên rất thực tế: việc nào mình đang trì hoãn vì nó nặng, ranh giới nào cần nói trước, lịch nghỉ nào giúp mình bền hơn, và một bước nhỏ nào có thể làm ngay hôm nay. Nếu người đọc tìm được ví dụ cụ thể, Thiên Đồng ở Mệnh trở thành lời nhắc sống mềm mà không mơ hồ.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là nói Thiên Đồng ở Mệnh bảo đảm đời sống nhẹ nhàng hoặc cho phép đi theo cảm xúc mọi lúc. Cách đọc tốt hơn là nói: tổ hợp này gợi khả năng thích nghi, làm dịu và phục hồi; muốn biết nó giúp hay làm trì hoãn, cần xem Mệnh - Quan - Tài, Thiên Di, Thân Cung, Tứ Hóa và hành vi thật.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này không đưa lời khuyên y tế, tài chính, pháp lý hoặc quyết định quan trọng. Để đọc cá nhân cần ngày giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, đủ 12 cung, Tứ Hóa, phụ tinh và câu hỏi cụ thể. Người đọc nên dùng bài viết để quan sát nhịp sống, ranh giới và trách nhiệm, không dùng để kết luận kết quả đời sống.',
        ],
      },
    ],
  },
}

const BATCH_2B_2_DRAFT_ONLY_PROFILES: Record<string, StarPalaceDraftProfile> = {
  [comboKey('liem-trinh', 'menh')]: {
    intersectionThesis:
      'Liêm Trinh đem sắc thái chính trực, ranh giới, tiêu chuẩn cá nhân và năng lực tự quản; cung Mệnh là khí chất gốc và cách một người tự đặt mình vào đời sống; câu hỏi hữu ích là tiêu chuẩn này đang giúp người xem sống có trách nhiệm hay đang khiến họ tự ép mình quá cứng.',
    misreadWarning:
      'Không nên đọc Liêm Trinh ở Mệnh như nhãn đạo đức, lời phán tính cách hoặc kết luận về kết quả đời sống. Cách đọc an toàn là xem cách người xem xây ranh giới, giữ lời hứa, xử lý áp lực, kiểm tra tam phương Mệnh - Quan - Tài và đối chiếu hành vi thật.',
    contextChecklist: [
      'So Mệnh với Thân Cung để biết tiêu chuẩn ban đầu có trưởng thành thành trách nhiệm tự quản không.',
      'Kiểm tra tam hợp Mệnh - Quan Lộc - Tài Bạch để biết nguyên tắc cá nhân có đi cùng vai trò nghề và cách dùng nguồn lực thực tế không.',
      'Xem Thiên Di đối chiếu để biết môi trường ngoài tiếp nhận sự thẳng thắn này như uy tín, khoảng cách hay lời mời cần mềm lại.',
      'Đọc cùng Tử Vi, Vũ Khúc, Thái Dương, Cự Môn hoặc Tứ Hóa nếu có để phân biệt tự chủ, kỷ luật, minh bạch, lời nói và khả năng điều chỉnh.',
      'Đối chiếu dữ kiện đời sống: cách người xem đặt ranh giới, nhận lỗi, giữ cam kết, sửa sai và xin phản hồi khi tiêu chuẩn của mình ảnh hưởng người khác.',
      'Không dùng một sao ở Mệnh để đánh giá phẩm chất con người; cần toàn cục lá số và bối cảnh thực tế.',
    ],
    selfCheckQuestions: [
      'Tiêu chuẩn nào thật sự giúp mình sống chính trực hơn, và tiêu chuẩn nào chỉ làm mình khó thở?',
      'Ranh giới nào cần nói rõ bằng lời nhẹ nhưng dứt khoát trong tuần này?',
      'Khi thấy điều chưa đúng, mình phản hồi để xây dựng hay để tự bảo vệ hình ảnh?',
      'Mình có thói quen nhận phần trách nhiệm của mình trước khi yêu cầu người khác thay đổi không?',
      'Ai có thể phản hồi giúp mình phân biệt chính trực với tự ép mình quá cứng?',
    ],
    sensitiveTopicFlags: ['relationship'],
    contrastNotes: [
      'Khác với Liêm Trinh ở Phu Thê, trọng tâm không nằm ở quan hệ đôi lứa mà ở khí chất tự thân: cách người xem giữ ranh giới, tiêu chuẩn và trách nhiệm với lựa chọn của mình.',
      'Khác với Vũ Khúc ở Mệnh, Liêm Trinh không chỉ nói về kỷ luật nguồn lực; nó nhấn vào chuẩn mực nội tâm, sự tự soi và cách điều chỉnh khi tiêu chuẩn gặp cảm xúc.',
      'Khác với Cự Môn ở Mệnh, Liêm Trinh không đặt trọng tâm vào lời nói; nó hỏi người xem sống theo điều mình cho là đúng bằng hành vi cụ thể nào.',
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: 'Chính trực, ranh giới, tiêu chuẩn cá nhân, trách nhiệm và tự quản', readingCue: 'Đọc như bài học về cách giữ trục, không như nhãn đạo đức.' },
      { aspect: 'Khi đọc thuận', meaning: 'Có xu hướng biết giữ nguyên tắc, chịu trách nhiệm với lời hứa, sửa sai có cấu trúc và không dễ đánh đổi giá trị cốt lõi.', readingCue: 'Kiểm tra Mệnh - Quan - Tài để biết tiêu chuẩn này có thành hành vi bền không.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Dễ tự ép mình, phản ứng mạnh khi thấy lệch chuẩn hoặc giữ khoảng cách vì sợ mất kiểm soát.', readingCue: 'Tìm dấu hiệu mềm lại, nhận phản hồi, phân biệt ranh giới với phòng thủ.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không có nghĩa người này tốt hơn, xấu hơn, hay sẽ gặp một kết quả cố định vì một sao ở Mệnh.', readingCue: 'Tránh mọi phán xét phẩm chất hoặc kết luận đời sống từ một tổ hợp riêng lẻ.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Thân Cung, Thiên Di, tam phương tứ chính, Tứ Hóa, phụ tinh và ví dụ hành vi thật khi có áp lực.', readingCue: 'Thiếu dữ kiện giờ sinh thì chỉ đọc như khung tham khảo.' },
    ],
    wrongVsBetterExamples: [
      { wrong: 'Liêm Trinh ở Mệnh cho thấy người này bị đóng khung bởi một phẩm chất cố định.', better: 'Liêm Trinh ở Mệnh gợi câu hỏi về tiêu chuẩn, ranh giới và trách nhiệm; cần xem toàn lá số, môi trường và hành vi thật trước khi đưa nhận xét tham khảo.' },
      { wrong: 'Có Liêm Trinh thì cứ nghiêm với bản thân và người khác là đúng.', better: 'Điểm mạnh chính trực chỉ bền khi đi cùng tự soi, biết nhận phản hồi, biết nói ranh giới rõ và vẫn giữ sự mềm trong đối thoại.' },
      { wrong: 'Chỉ cần thấy Liêm Trinh ở Mệnh là kết luận được đường đời.', better: 'Một sao ở Mệnh không đủ để kết luận. Cần đọc Mệnh, Thân, Quan Lộc, Tài Bạch, Thiên Di, Tứ Hóa và bối cảnh câu hỏi.' },
    ],
    sections: [
      {
        key: 'core-interpretation',
        content: [
          'Liêm Trinh ở cung Mệnh nên được đọc như một bài học về tiêu chuẩn cá nhân và cách tự quản, không phải như nhãn phán xét con người. Liêm Trinh trong văn cảnh Tử Vi thường gợi sự chính trực, ý thức về ranh giới, nhu cầu phân biệt điều nên làm và điều nên dừng lại. Cung Mệnh lại là điểm nói về khí chất gốc, phản ứng đầu tiên và cách một người tự đứng vào đời sống. Khi hai lớp này gặp nhau, câu hỏi không phải là người này tốt hay xấu, mà là họ đang dùng tiêu chuẩn của mình để sống có trách nhiệm hay để làm mọi thứ quá căng.',
          'Điểm khác với trang sao Liêm Trinh chung là bài này đặt trọng tâm vào chủ thể. Người xem có thể có cảm giác cần giữ trục, cần rõ đúng sai trong lựa chọn hằng ngày, hoặc cần một hệ giá trị đủ chắc để không trôi theo môi trường. Nhưng nếu đọc thiếu tam phương tứ chính, nội dung dễ thành lời phán cứng. Vì vậy trang này chỉ mang tính tham khảo, không phải lá số cá nhân, không phải lời tiên đoán và không thay thế việc đọc đủ Mệnh, Thân, cung đối chiếu, Tứ Hóa và bối cảnh sống thật.',
        ],
      },
      {
        key: 'strengths',
        content: [
          'Khi đọc thuận, Liêm Trinh ở Mệnh gợi khả năng giữ lời hứa với chính mình. Người xem có thể coi trọng sự rõ ràng, không thích làm việc nửa vời, và có nhu cầu hành động theo điều mình thấy đúng. Đây là điểm mạnh nếu nó đi thành hành vi kiểm chứng được: ghi rõ cam kết, nhận phần trách nhiệm của mình, đặt ranh giới trước khi quá tải và sửa sai khi nhận ra cách làm chưa phù hợp. Trong môi trường cần sự tin cậy, khí chất này giúp người khác cảm thấy có một trục chuẩn để dựa vào.',
          'Cách phát huy an toàn là biến chính trực thành quy trình nhỏ thay vì áp lực lớn. Người xem có thể tự hỏi: điều gì là nguyên tắc không nên đánh đổi, điều gì chỉ là thói quen cũ, ai cần được nghe ranh giới của mình, và khi lỡ làm căng thì bước sửa nào là cụ thể. Nếu câu trả lời đi vào lịch, lời nói rõ, phản hồi và hành động bù đắp, Liêm Trinh ở Mệnh trở thành năng lực tự quản. Nếu chỉ dừng ở cảm giác mình phải luôn đúng, tổ hợp này dễ làm người xem mệt.',
        ],
      },
      {
        key: 'balancing-risks',
        content: [
          'Điểm cần cân bằng là xu hướng tự ép mình hoặc nhìn vấn đề quá nhị nguyên khi áp lực cao. Người có khí chất Liêm Trinh ở Mệnh trong bài đọc tham khảo có thể nhạy với sự thiếu nhất quán, khó bỏ qua điều lệch chuẩn, hoặc giữ khoảng cách khi chưa thấy đủ an toàn. Đây không phải kết luận cố định; nó chỉ là lời nhắc nên quan sát cách mình phản hồi khi thất vọng, khi bị góp ý hoặc khi người khác có giá trị khác mình.',
          'Cách viết an toàn là dùng ngôn ngữ quản trị ranh giới, không dùng ngôn ngữ quy kết. Thay vì nói người xem sẽ rơi vào một kết quả nào đó, hãy nói họ nên kiểm tra ba việc: tiêu chuẩn của mình có được nói rõ không, có chừa chỗ cho người khác giải thích không, và sau khi phản hồi mình có còn mục tiêu xây dựng không. Khi ba câu hỏi này được giữ, sự nghiêm túc không biến thành áp lực vô ích.',
          'Nội dung cũng không nên biến Liêm Trinh thành lời khuyên thay thế chuyên môn. Nếu chủ đề chạm đến sức khỏe, tài chính, hợp đồng, xung đột gia đình hoặc quyết định quan trọng, bài viết chỉ nên nhắc người đọc tìm nguồn tư vấn phù hợp. Tử Vi ở đây là khung văn hóa để tự quan sát tiêu chuẩn, ranh giới và trách nhiệm; nó không quyết định thay đời sống thật.',
        ],
      },
      {
        key: 'tam-phuong-tu-chinh',
        content: [
          'Tam phương của cung Mệnh nối với Quan Lộc và Tài Bạch, nên Liêm Trinh ở Mệnh không thể đọc rời công việc và nguồn lực. Nếu Mệnh có tiêu chuẩn cao nhưng Quan Lộc chưa rõ vai trò, người xem có thể bận giữ hình ảnh đúng đắn mà chưa biết ưu tiên việc nào. Nếu Tài Bạch thiếu nền quản trị, sự tự kiểm soát dễ thành căng thẳng vì mọi thứ đều phải dựa vào ý chí. Ngược lại, khi vai trò nghề và nguồn lực có cấu trúc, tiêu chuẩn cá nhân có thể biến thành uy tín và nhịp làm việc bền.',
          'Thiên Di đối chiếu cho biết môi trường ngoài phản hồi sự chính trực này ra sao. Có môi trường quý người biết giữ nguyên tắc; có môi trường cần cách nói mềm hơn, cần giải thích bối cảnh nhiều hơn, hoặc cần người xem chấp nhận rằng mỗi người có nhịp trưởng thành khác nhau. Đọc tam phương tứ chính giúp trang không biến Liêm Trinh ở Mệnh thành nhãn cứng, mà thành bộ câu hỏi: tiêu chuẩn này đi cùng vai trò nào, nguồn lực nào, môi trường nào và hành vi nào.',
          'Phúc Đức, Phụ Mẫu và các sao hội chiếu cũng cần được xem nếu muốn đọc sâu hơn. Một người có tiêu chuẩn mạnh có thể được nâng bởi nền gia đình, thầy bạn, trải nghiệm học tập hoặc hệ giá trị được rèn lâu dài. Cũng có khi tiêu chuẩn mạnh là cách tự bảo vệ sau nhiều trải nghiệm căng. Bài viết không kết luận nguyên nhân; nó chỉ nhắc người đọc kiểm tra thêm trước khi tự gắn nhãn cho mình.',
        ],
      },
      {
        key: 'self-check',
        content: [
          'Câu hỏi tự kiểm chứng nên rất gần với hành vi trong tuần. Khi thấy điều chưa ổn, mình đã nói nhu cầu bằng lời rõ chưa, hay chỉ im lặng rồi khó chịu? Khi đặt ranh giới, mình có nói điều mình sẽ làm thay vì chỉ yêu cầu người khác đổi không? Khi bị góp ý, mình có tìm phần dữ kiện hữu ích không? Những câu hỏi này giúp Liêm Trinh ở Mệnh trở thành gương tự soi thay vì áp lực phải hoàn hảo.',
          'Một bài tập nhẹ là viết ba cột: điều mình coi trọng, hành vi cụ thể bảo vệ điều đó, và dấu hiệu cho thấy mình đang quá cứng. Ví dụ, nếu coi trọng sự đúng hẹn, hành vi cụ thể là xác nhận lịch sớm và báo khi cần đổi; dấu hiệu quá cứng là khó chấp nhận lý do hợp lý của người khác. Cách làm này giữ tinh thần chính trực nhưng thêm khả năng mềm lại.',
          'Người đọc cũng nên hỏi một người tin cậy: khi mình giữ ranh giới, người khác cảm thấy được tôn trọng hay bị đẩy ra xa? Câu trả lời không dùng để tự trách, mà để chỉnh cách truyền đạt. Với Liêm Trinh ở Mệnh, sự trưởng thành nằm ở việc giữ trục mà vẫn biết đối thoại.',
        ],
      },
      {
        key: 'wrong-vs-better',
        content: [
          'Cách đọc sai là biến Liêm Trinh ở Mệnh thành một nhãn phẩm chất cố định. Cách đọc tốt hơn là nói: tổ hợp này gợi nhu cầu sống theo tiêu chuẩn, giữ ranh giới và tự quản; muốn biết nó giúp hay làm căng, cần xem Mệnh - Quan - Tài, Thiên Di, Thân Cung, Tứ Hóa và ví dụ hành vi thật.',
          'Cách đọc sai khác là khuyên người xem phải nghiêm hơn trong mọi tình huống. Cách đọc tốt hơn là phân biệt nguyên tắc cốt lõi với phương pháp thể hiện. Có nguyên tắc cần giữ, nhưng cách nói, thời điểm nói và mức mềm khi nghe phản hồi vẫn có thể thay đổi. Đây là điểm giúp bài đọc có ích mà không trở thành mệnh lệnh.',
          'Cách đọc sai thứ ba là lấy một sao ở Mệnh để thay thế toàn bộ lá số. Cách đọc tốt hơn là dùng Liêm Trinh như một cửa vào câu hỏi về trách nhiệm và ranh giới, rồi tiếp tục đọc toàn cục. Nếu chưa có giờ sinh hoặc chưa biết đủ cung sao, nên xem bài viết như tài liệu tham khảo để tự quan sát, không dùng để kết luận.',
        ],
      },
      {
        key: 'limits',
        content: [
          'Trang này không thay thế tư vấn y tế, tài chính, pháp lý hoặc quyết định quan trọng. Để đọc cá nhân cần ngày giờ sinh, giới tính, Cục, Mệnh Cung, Thân Cung, đủ 12 cung, Tứ Hóa, phụ tinh, đại hạn/tiểu hạn nếu có câu hỏi thời điểm, và bối cảnh đời sống thật. Người đọc nên dùng bài viết để quan sát cách mình giữ tiêu chuẩn, nói ranh giới, nhận trách nhiệm và sửa sai.',
          'Nếu nội dung gợi ra cảm xúc nặng, người đọc nên tạm dừng và quay về câu hỏi thực tế: mình cần nghỉ, cần hỏi ai, cần ghi lại điều gì, cần xin phản hồi ở đâu. Tử Vi là ngôn ngữ văn hóa để suy ngẫm; phần hành động vẫn nên dựa trên dữ kiện, đối thoại và sự hỗ trợ phù hợp. Không nên dùng một đoạn diễn giải để tự kết luận về bản thân hoặc người khác.',
        ],
      },
    ],
  },
}

const REVIEWED_STAR_PALACE_DRAFT_PROFILES: Record<string, StarPalaceDraftProfile> = {
  ...FIRST_BATCH_DRAFT_PROFILES,
  ...BATCH_2A_DRAFT_PROFILES,
  ...BATCH_2B_1_DRAFT_PROFILES,
  ...BATCH_2B_2_DRAFT_ONLY_PROFILES,
}

export function buildStarPalacePath(star: PriorityStarSlug, palace: PalaceSlug): string {
  return `/sao/${star}/cung/${palace}/`
}

export function isApprovedStarPalaceCombination(star: string, palace: string): boolean {
  return APPROVED_STAR_PALACE_COMBINATIONS.some(
    (combo) => combo.star === star && combo.palace === palace
  )
}

export function getStarPalaceRenderedText(page: StarPalaceDraftPage): string {
  return [
    page.h1,
    page.title,
    page.description,
    page.methodNote,
    page.intersectionThesis,
    page.misreadWarning,
    ...page.contextChecklist,
    ...page.selfCheckQuestions,
    ...page.contrastNotes,
    ...page.summaryRows.flatMap((row) => [row.aspect, row.meaning, row.readingCue]),
    ...page.wrongVsBetterExamples.flatMap((example) => [example.wrong, example.better]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...page.internalLinks.flatMap((link) => [link.label, link.relation, link.href]),
    ...page.sections.flatMap((section) => [
      section.heading,
      section.writingBrief,
      ...section.requiredLinks,
      ...(section.content ?? []),
    ]),
  ].join(' ')
}

export function getStarPalaceWordCount(page: StarPalaceDraftPage): number {
  return getStarPalaceRenderedText(page).trim().split(/\s+/).filter(Boolean).length
}

export function isStarPalaceReadyForIndex(page: StarPalaceDraftPage): boolean {
  return (
    getStarPalaceWordCount(page) >= MIN_STAR_PALACE_WORDS &&
    page.summaryRows.length >= 5 &&
    page.faqs.length >= 5 &&
    page.internalLinks.length >= 4 &&
    page.sections.every((section) => (section.content?.length ?? 0) > 0)
  )
}

function buildGenericDraftProfile(starName: string, palaceName: string): StarPalaceDraftProfile {
  return {
    intersectionThesis: `${starName} đem sắc thái riêng của chính tinh; cung ${palaceName} là mảng đời sống cần đọc; câu hỏi hữu ích là sắc thái sao này biểu hiện qua chủ đề cung như thế nào trong khung tham khảo.`,
    misreadWarning: `Không nên ghép máy móc trang sao ${starName} với trang cung ${palaceName}; cần viết nội dung riêng trước khi xuất bản.`,
    contextChecklist: [
      'Mệnh Cung và Thân Cung',
      'Cung xung chiếu',
      'Tam hợp của cung',
      'Chính tinh đồng cung, hội chiếu, Tứ Hóa và bối cảnh đời sống thật',
    ],
    selfCheckQuestions: [
      `Sao ${starName} đang làm chủ đề cung ${palaceName} rõ hơn ở điểm nào?`,
      'Dữ kiện đời sống nào xác nhận hoặc làm mềm cách đọc này?',
      'Điều gì cần kiểm tra thêm trước khi đưa lời khuyên?',
    ],
    sensitiveTopicFlags: [],
    contrastNotes: [
      `Cần so ${starName} ở cung khác để tránh đọc sao một màu.`,
      `Cần so sao khác ở cung ${palaceName} để tránh đọc cung một màu.`,
    ],
    summaryRows: [
      { aspect: 'Từ khóa chính', meaning: `${starName} qua ngữ cảnh cung ${palaceName}`, readingCue: 'Chỉ là khung biên tập, chưa đủ để xuất bản.' },
      { aspect: 'Khi đọc thuận', meaning: 'Cần viết xu hướng xây dựng riêng cho tổ hợp này.', readingCue: 'Không dùng câu chung cho mọi tổ hợp.' },
      { aspect: 'Khi cần cân bằng', meaning: 'Cần viết rủi ro mềm, không fearbait.', readingCue: 'Không dùng lời khẳng định tuyệt đối.' },
      { aspect: 'Không nên hiểu là', meaning: 'Không được suy diễn từ một sao hoặc một cung riêng lẻ.', readingCue: 'Cần đầy đủ lá số và bối cảnh thật.' },
      { aspect: 'Cần kiểm tra thêm', meaning: 'Mệnh/Thân, xung chiếu, tam hợp, Tứ Hóa, đời sống thật.', readingCue: 'Bắt buộc trước khi duyệt.' },
    ],
    wrongVsBetterExamples: [
      { wrong: `Sao ${starName} ở cung ${palaceName} cho thấy kết quả chắc chắn.`, better: `Sao ${starName} ở cung ${palaceName} chỉ gợi một xu hướng cần kiểm tra cùng toàn lá số và bối cảnh thực tế.` },
    ],
    sections: [
      { key: 'core-interpretation', content: [] },
      { key: 'strengths', content: [] },
      { key: 'balancing-risks', content: [] },
      { key: 'tam-phuong-tu-chinh', content: [] },
      { key: 'self-check', content: [] },
      { key: 'wrong-vs-better', content: [] },
      { key: 'limits', content: [] },
    ],
  }
}

function sectionContent(profile: StarPalaceDraftProfile, key: StarPalaceDraftProfile['sections'][number]['key']): string[] {
  return profile.sections.find((section) => section.key === key)?.content ?? []
}

function buildStarPalaceFaqs(
  starName: string,
  palaceName: string,
  starUrl: string,
  palaceUrl: string
): Array<{ question: string; answer: string }> {
  return [
    {
      question: `Sao ${starName} ở cung ${palaceName} có ý nghĩa gì?`,
      answer: `Đây là cách đọc tham khảo về việc sao ${starName} biểu hiện qua chủ đề cung ${palaceName}. Ý nghĩa cụ thể còn phụ thuộc Mệnh Cung, Thân Cung, tam phương tứ chính, Tứ Hóa và bối cảnh thực tế.`,
    },
    {
      question: `Có thể kết luận tốt xấu chỉ từ sao ${starName} ở cung ${palaceName} không?`,
      answer: 'Không. Một tổ hợp sao×cung riêng lẻ không đủ để kết luận. Cần đọc toàn cục lá số và dùng nội dung như tham khảo, không phải lời tiên đoán.',
    },
    {
      question: `Muốn biết mình có sao ${starName} ở cung ${palaceName} cần gì?`,
      answer: 'Cần lập lá số theo ngày sinh, giờ sinh, giới tính, lịch âm/dương chính xác để xác định Mệnh Cung, Thân Cung, Cục và vị trí sao trong đủ 12 cung.',
    },
    {
      question: `Cần đọc thêm cung/sao nào?`,
      answer: `Nên đọc thêm trang sao ${starName} (${starUrl}), trang cung ${palaceName} (${palaceUrl}), cung xung chiếu, tam hợp của cung và các sao đồng cung/hội chiếu.`,
    },
    {
      question: 'Trang này có thay thế tư vấn chuyên môn không?',
      answer: 'Không. Nội dung chỉ mang tính tham khảo văn hóa và không thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.',
    },
  ]
}

function buildStarPalaceInternalLinks(
  star: PriorityStarSlug,
  palace: PalaceSlug,
  starName: string,
  palaceName: string,
  starUrl: string,
  palaceUrl: string
): StarPalaceInternalLink[] {
  const siblingLinks = APPROVED_STAR_PALACE_COMBINATIONS
    .filter((combo) => combo.palace === palace && combo.star !== star)
    .map((combo) => {
      const siblingStar = getStarFoundationPage(combo.star)

      return {
        href: buildStarPalacePath(combo.star, combo.palace),
        label: siblingStar
          ? `Sao ${siblingStar.name} ở cung ${palaceName}`
          : `Tổ hợp ${combo.star} ở cung ${palaceName}`,
        relation: 'Tổ hợp cùng cung đã duyệt',
      }
    })

  const siblingLimit = star === 'liem-trinh' && palace === 'menh' ? siblingLinks.length : 3

  return [
    { href: starUrl, label: `Sao ${starName}`, relation: 'Nền tảng về chính tinh' },
    { href: palaceUrl, label: `Cung ${palaceName}`, relation: 'Nền tảng về cung vị' },
    ...siblingLinks.slice(0, siblingLimit),
    { href: '/tu-vi/', label: 'Hub Tử Vi 2026', relation: 'Thư viện Tử Vi' },
    { href: '/lap-la-so/', label: 'Tìm hiểu cách lập lá số Tử Vi', relation: 'Cá nhân hóa theo ngày giờ sinh' },
  ]
}

export function getStarPalaceDraftPage(
  star: string,
  palace: string
): StarPalaceDraftPage | null {
  if (!isPriorityStarSlug(star) || !isPalaceSlug(palace)) return null

  const starPage = getStarFoundationPage(star)
  const palacePage = getPalaceFoundationPage(palace)
  if (!starPage || !palacePage) return null

  const starName = starPage.name
  const palaceName = palacePage.name
  const urlPath = buildStarPalacePath(star, palace)
  const profile =
    REVIEWED_STAR_PALACE_DRAFT_PROFILES[comboKey(star, palace)] ?? buildGenericDraftProfile(starName, palaceName)
  const xungChieu = palacePage.summaryRows.find((row) => row.aspect === 'Trục xung chiếu')?.meaning
  const tamHop = getPalaceTamHop(palace)
  const contextChecklist = [...profile.contextChecklist, xungChieu, `Tam hợp: ${tamHop}`].filter(
    (item): item is string => Boolean(item)
  )

  return {
    star,
    palace,
    status: 'draft-template',
    indexable: false,
    h1: `Sao ${starName} Ở Cung ${palaceName} — Ý Nghĩa, Cách Đọc Và Lưu Ý`,
    title: `Sao ${starName} ở Cung ${palaceName}: ý nghĩa và cách đọc`,
    description: `Tìm hiểu sao ${starName} ở cung ${palaceName} trong Tử Vi: ý nghĩa tham khảo, tam phương tứ chính, điểm cần cân bằng và cách đọc an toàn.`,
    urlPath,
    canonicalWhenApproved: urlPath,
    methodNote:
      'Chỉ xuất bản sau khi có bài viết riêng theo Tam Hợp Phái / 《紫微斗数全书》, không suy diễn từ một sao hoặc một cung riêng lẻ. Trang này là bài nền tham khảo, không phải lá số cá nhân. Để đọc riêng cho một người cần ngày sinh, giờ sinh, Mệnh Cung, Thân Cung, Cục, vị trí sao trong đủ 12 cung và bối cảnh thực tế.',
    intersectionThesis: profile.intersectionThesis,
    misreadWarning: profile.misreadWarning,
    contextChecklist,
    selfCheckQuestions: profile.selfCheckQuestions,
    sensitiveTopicFlags: profile.sensitiveTopicFlags,
    contrastNotes: profile.contrastNotes,
    summaryRows: profile.summaryRows,
    wrongVsBetterExamples: profile.wrongVsBetterExamples,
    faqs: buildStarPalaceFaqs(starName, palaceName, starPage.urlPath, palacePage.urlPath),
    internalLinks: buildStarPalaceInternalLinks(star, palace, starName, palaceName, starPage.urlPath, palacePage.urlPath),
    qualityGate: [
      '1,500+ words of unique, non-template educational content',
      'Bói-Toán domain review for star meaning in this palace',
      'CMO compliance review: no deterministic, medical, finance-promise, fearbait, or fake exact-chart claims',
      'SEO review: title/meta/schema/internal links and no index-bloat risk',
      'Visible Art.320 disclaimer and method citation',
      'At least 6 contextual internal links to star, palace, hub, and related foundation pages',
      'Unit tests plus Playwright coverage before adding to sitemap',
    ],
    sections: [
      {
        heading: `Sao ${starName} ở cung ${palaceName} đọc như thế nào?`,
        writingBrief:
          'Explain how the star archetype changes when the life-area context is this palace. Avoid copying the generic star page or generic palace page.',
        requiredLinks: [starPage.urlPath, palacePage.urlPath],
        content: sectionContent(profile, 'core-interpretation'),
      },
      {
        heading: 'Điểm mạnh và cách phát huy',
        writingBrief:
          'Explain practical constructive expression: behavior pattern, decision style, relationship/resource/work rhythm, and responsible use.',
        requiredLinks: [starPage.urlPath, palacePage.urlPath],
        content: sectionContent(profile, 'strengths'),
      },
      {
        heading: 'Điểm cần cân bằng',
        writingBrief:
          'Use risk-management language. Avoid fearbait, deterministic outcomes, medical claims, and finance promises.',
        requiredLinks: [palacePage.urlPath],
        content: sectionContent(profile, 'balancing-risks'),
      },
      {
        heading: 'Tam phương tứ chính và cung đối chiếu',
        writingBrief:
          'Use xung chiếu and generated tam hợp context. Discuss why one palace alone is insufficient for personal conclusions.',
        requiredLinks: [palacePage.urlPath, '/tu-vi/'],
        content: sectionContent(profile, 'tam-phuong-tu-chinh'),
      },
      {
        heading: 'Câu hỏi tự kiểm chứng',
        writingBrief:
          'Frame custom reflection questions as practical observation. Use “gợi ý/nghiêng về/nên kiểm tra thêm”; do not make promises.',
        requiredLinks: ['/lap-la-so/'],
        content: sectionContent(profile, 'self-check'),
      },
      {
        heading: 'Ví dụ cách đọc đúng và sai',
        writingBrief:
          'Add wrong-vs-better examples that explicitly prevent deterministic or scammy interpretations.',
        requiredLinks: [starPage.urlPath, palacePage.urlPath],
        content: sectionContent(profile, 'wrong-vs-better'),
      },
      {
        heading: 'Giới hạn của bài viết',
        writingBrief:
          'State that exact reading needs date/time/gender, Mệnh Cung, Thân Cung, Cục, full star positions, Tứ Hóa, and real-life context.',
        requiredLinks: [starPage.urlPath, palacePage.urlPath],
        content: [...sectionContent(profile, 'limits'), STAR_PALACE_DISCLAIMER],
      },
    ],
  }
}

export function getStarPalacePage(star: string, palace: string): StarPalacePage | null {
  if (!isApprovedStarPalaceCombination(star, palace)) return null

  const draft = getStarPalaceDraftPage(star, palace)
  if (!draft) return null
  if (!isStarPalaceReadyForIndex(draft)) return null

  return {
    ...draft,
    status: 'approved',
    indexable: true,
  }
}

export function getStarPalaceTemplateMatrix(): StarPalaceDraftPage[] {
  return PRIORITY_STAR_SLUGS.flatMap((star) =>
    PALACE_SLUGS.map((palace) => getStarPalaceDraftPage(star, palace))
  ).filter((page): page is StarPalaceDraftPage => Boolean(page))
}

export function getApprovedStarPalacePages(): StarPalacePage[] {
  return APPROVED_STAR_PALACE_COMBINATIONS.map((combo) =>
    getStarPalacePage(combo.star, combo.palace)
  ).filter((page): page is StarPalacePage => Boolean(page))
}

export function getApprovedStarPalaceLinksForStar(star: string): StarPalaceInternalLink[] {
  if (!isPriorityStarSlug(star)) return []

  return getApprovedStarPalacePages()
    .filter((page) => page.star === star)
    .map((page) => ({
      href: page.urlPath,
      label: page.h1.replace(' — Ý Nghĩa, Cách Đọc Và Lưu Ý', ''),
      relation: 'Tổ hợp sao×cung đã duyệt',
    }))
}

export function getApprovedStarPalaceLinksForPalace(palace: string): StarPalaceInternalLink[] {
  if (!isPalaceSlug(palace)) return []

  return getApprovedStarPalacePages()
    .filter((page) => page.palace === palace)
    .map((page) => ({
      href: page.urlPath,
      label: page.h1.replace(' — Ý Nghĩa, Cách Đọc Và Lưu Ý', ''),
      relation: 'Tổ hợp sao×cung đã duyệt',
    }))
}

export function getFirstBatchStarPalaceDrafts(): StarPalaceDraftPage[] {
  return CMO_FIRST_BATCH_STAR_PALACE_COMBINATIONS.map((combo) =>
    getStarPalaceDraftPage(combo.star, combo.palace)
  ).filter((page): page is StarPalaceDraftPage => Boolean(page))
}
