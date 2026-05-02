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
  starName: string,
  palaceName: string,
  starUrl: string,
  palaceUrl: string
): StarPalaceInternalLink[] {
  return [
    { href: starUrl, label: `Sao ${starName}`, relation: 'Nền tảng về chính tinh' },
    { href: palaceUrl, label: `Cung ${palaceName}`, relation: 'Nền tảng về cung vị' },
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
    FIRST_BATCH_DRAFT_PROFILES[comboKey(star, palace)] ?? buildGenericDraftProfile(starName, palaceName)
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
    internalLinks: buildStarPalaceInternalLinks(starName, palaceName, starPage.urlPath, palacePage.urlPath),
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
