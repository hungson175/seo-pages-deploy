import { QUE_CONTENT } from './que'

export type KinhDichPilotKind = 'tool' | 'method' | 'question' | 'hub'
export type KinhDichCtaRole = 'primary-web-flow' | 'secondary-app-save' | 'tertiary-tu-vi'
export type KinhDichPilotSchemaType = 'WebApplication' | 'HowTo' | 'Article' | 'FAQPage'

export interface KinhDichPilotCta {
  role: KinhDichCtaRole
  label: string
  href: string
  note: string
}

export interface KinhDichPilotSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface KinhDichPilotFaq {
  question: string
  answer: string
}

export interface ReviewedHexagramLink {
  name: string
  href: string
}

export interface HexagramNameOnly {
  number: number
  name: string
  status: 'name-only-pending-review'
}

export interface KinhDichPilotPage {
  path: string
  slugSegments: string[]
  kind: KinhDichPilotKind
  reviewStatus: 'blocked_pending_cmo_boitoan_seo_review'
  indexable: false
  title: string
  h1: string
  description: string
  schemaTypes: KinhDichPilotSchemaType[]
  kicker: string
  primaryKeyword: string
  splitNote: string
  topDisclaimer: string
  intro: string[]
  sections: KinhDichPilotSection[]
  howToSteps?: Array<{ name: string; text: string }>
  faqs: KinhDichPilotFaq[]
  ctas: KinhDichPilotCta[]
  relatedLinks: Array<{ href: string; label: string; relation: string }>
  reviewedHexagramLinks?: ReviewedHexagramLink[]
  unrevisedHexagramNames?: HexagramNameOnly[]
}

export const KINH_DICH_PILOT_REVIEW_STATUS = 'blocked_pending_cmo_boitoan_seo_review' as const
export const KINH_DICH_PILOT_DISCLAIMER =
  'Ứng dụng tham khảo, không thay thế tư vấn chuyên môn.'

const PRIMARY_CTA: KinhDichPilotCta = {
  role: 'primary-web-flow',
  label: 'Gieo quẻ miễn phí',
  href: '/kinh-dich/gieo-que/#gieo-que-mien-phi',
  note: 'Bắt đầu trên web trước, không yêu cầu tải app.',
}

const SECONDARY_CTA: KinhDichPilotCta = {
  role: 'secondary-app-save',
  label: 'Lưu kết quả trong app Bói Toán',
  href: '/kinh-dich/gieo-que/#luu-ket-qua',
  note: 'App chỉ là bước lưu và xem lại sau khi đã có quẻ.',
}

const TERTIARY_CTA: KinhDichPilotCta = {
  role: 'tertiary-tu-vi',
  label: 'Xem thêm lá số Tử Vi cá nhân',
  href: '/tu-vi/',
  note: 'Tử Vi là cross-sell sau cùng, không thay thế câu hỏi Kinh Dịch.',
}

const reviewedHexagramLinks: ReviewedHexagramLink[] = Object.values(QUE_CONTENT).map((que) => ({
  name: que.name,
  href: `/que/${que.slug}/`,
}))

export const KING_WEN_HEXAGRAM_NAMES: Array<{ number: number; name: string }> = [
  { number: 1, name: 'Càn Vi Thiên' },
  { number: 2, name: 'Khôn Vi Địa' },
  { number: 3, name: 'Thủy Lôi Truân' },
  { number: 4, name: 'Sơn Thủy Mông' },
  { number: 5, name: 'Thủy Thiên Nhu' },
  { number: 6, name: 'Thiên Thủy Tụng' },
  { number: 7, name: 'Địa Thủy Sư' },
  { number: 8, name: 'Thủy Địa Tỷ' },
  { number: 9, name: 'Phong Thiên Tiểu Súc' },
  { number: 10, name: 'Thiên Trạch Lý' },
  { number: 11, name: 'Địa Thiên Thái' },
  { number: 12, name: 'Thiên Địa Bĩ' },
  { number: 13, name: 'Thiên Hỏa Đồng Nhân' },
  { number: 14, name: 'Hỏa Thiên Đại Hữu' },
  { number: 15, name: 'Địa Sơn Khiêm' },
  { number: 16, name: 'Lôi Địa Dự' },
  { number: 17, name: 'Trạch Lôi Tùy' },
  { number: 18, name: 'Sơn Phong Cổ' },
  { number: 19, name: 'Địa Trạch Lâm' },
  { number: 20, name: 'Phong Địa Quan' },
  { number: 21, name: 'Hỏa Lôi Phệ Hạp' },
  { number: 22, name: 'Sơn Hỏa Bí' },
  { number: 23, name: 'Sơn Địa Bác' },
  { number: 24, name: 'Địa Lôi Phục' },
  { number: 25, name: 'Thiên Lôi Vô Vọng' },
  { number: 26, name: 'Sơn Thiên Đại Súc' },
  { number: 27, name: 'Sơn Lôi Di' },
  { number: 28, name: 'Trạch Phong Đại Quá' },
  { number: 29, name: 'Khảm Vi Thủy' },
  { number: 30, name: 'Ly Vi Hỏa' },
  { number: 31, name: 'Trạch Sơn Hàm' },
  { number: 32, name: 'Lôi Phong Hằng' },
  { number: 33, name: 'Thiên Sơn Độn' },
  { number: 34, name: 'Lôi Thiên Đại Tráng' },
  { number: 35, name: 'Hỏa Địa Tấn' },
  { number: 36, name: 'Địa Hỏa Minh Di' },
  { number: 37, name: 'Phong Hỏa Gia Nhân' },
  { number: 38, name: 'Hỏa Trạch Khuê' },
  { number: 39, name: 'Thủy Sơn Kiển' },
  { number: 40, name: 'Lôi Thủy Giải' },
  { number: 41, name: 'Sơn Trạch Tổn' },
  { number: 42, name: 'Phong Lôi Ích' },
  { number: 43, name: 'Trạch Thiên Quải' },
  { number: 44, name: 'Thiên Phong Cấu' },
  { number: 45, name: 'Trạch Địa Tụy' },
  { number: 46, name: 'Địa Phong Thăng' },
  { number: 47, name: 'Trạch Thủy Khốn' },
  { number: 48, name: 'Thủy Phong Tỉnh' },
  { number: 49, name: 'Trạch Hỏa Cách' },
  { number: 50, name: 'Hỏa Phong Đỉnh' },
  { number: 51, name: 'Chấn Vi Lôi' },
  { number: 52, name: 'Cấn Vi Sơn' },
  { number: 53, name: 'Phong Sơn Tiệm' },
  { number: 54, name: 'Lôi Trạch Quy Muội' },
  { number: 55, name: 'Lôi Hỏa Phong' },
  { number: 56, name: 'Hỏa Sơn Lữ' },
  { number: 57, name: 'Tốn Vi Phong' },
  { number: 58, name: 'Đoài Vi Trạch' },
  { number: 59, name: 'Phong Thủy Hoán' },
  { number: 60, name: 'Thủy Trạch Tiết' },
  { number: 61, name: 'Phong Trạch Trung Phu' },
  { number: 62, name: 'Lôi Sơn Tiểu Quá' },
  { number: 63, name: 'Thủy Hỏa Ký Tế' },
  { number: 64, name: 'Hỏa Thủy Vị Tế' },
]

const reviewedNumbers = new Set(
  Object.values(QUE_CONTENT)
    .map((que) => Number(que.slug.split('-')[0]))
    .filter((number) => Number.isFinite(number)),
)

const unrevisedHexagramNames: HexagramNameOnly[] = KING_WEN_HEXAGRAM_NAMES
  .filter((que) => !reviewedNumbers.has(que.number))
  .map((que) => ({
    number: que.number,
    name: que.name,
    status: 'name-only-pending-review',
  }))

const commonRelatedLinks = [
  { href: '/kinh-dich/gieo-que/', label: 'Mở công cụ hỏi quẻ', relation: 'công cụ chính' },
  { href: '/kinh-dich/gieo-que/luc-hao/', label: 'Gieo bằng Lục Hào — 3 đồng xu', relation: 'hướng dẫn phương pháp' },
  { href: '/kinh-dich/64-que/', label: 'Tìm hiểu 64 quẻ', relation: 'bảng tra cứu' },
]

export const KINH_DICH_PILOT_PAGES: KinhDichPilotPage[] = [
  {
    path: '/kinh-dich/gieo-que/',
    slugSegments: ['gieo-que'],
    kind: 'tool',
    reviewStatus: KINH_DICH_PILOT_REVIEW_STATUS,
    indexable: false,
    title: 'Gieo Quẻ Kinh Dịch — Miễn Phí, Không Cần Ngày Sinh | Bói Toán',
    h1: 'Gieo Quẻ Kinh Dịch — Miễn Phí, Không Cần Ngày Sinh | Bói Toán',
    description:
      'Gieo quẻ Kinh Dịch miễn phí trên Bói Toán: đặt câu hỏi, nhận đáp án trong 30 giây. Không cần ngày sinh. Thuật toán AI + 50+ cổ thư.',
    schemaTypes: ['WebApplication', 'FAQPage'],
    kicker: 'Kinh Dịch • Công cụ miễn phí',
    primaryKeyword: 'gieo quẻ kinh dịch',
    splitNote:
      'Gieo quẻ là bước lập quẻ từ câu hỏi và phương pháp; Giải quẻ là bước diễn giải sau khi đã có quẻ chủ, hào động và bối cảnh.',
    topDisclaimer: KINH_DICH_PILOT_DISCLAIMER,
    intro: [
      'Khi đứng trước một lựa chọn khó, bạn thường không thiếu tiếng ồn; điều thiếu là một khung hỏi bình tĩnh. Trang này được thiết kế như cửa vào cho người muốn lập quẻ nhanh, ghi lại câu hỏi và nhận một lời nhắc có điều kiện.',
      'Bói Toán giữ ranh giới rõ: công cụ giúp bạn hỏi quẻ, còn phần diễn giải chỉ nên dùng như tư liệu suy ngẫm. Nội dung chỉ nêu góc tham khảo, không thay quyết định của bạn và không thay tư vấn y tế, tài chính hoặc pháp lý.',
    ],
    sections: [
      {
        heading: 'Dùng trang này khi nào',
        paragraphs: [
          'Phù hợp nhất là câu hỏi đang cần chọn hướng: nên tiến hay chờ, nên nói lại điều kiện hay thử một bước nhỏ, nên gom dữ kiện hay tạm dừng. Câu hỏi càng cụ thể, lời nhắc càng dễ đối chiếu với thực tế.',
          'Không nên dùng trang này để hỏi thay bác sĩ, luật sư, chuyên gia tài chính hoặc để tìm một lời cam kết tuyệt đối. Nếu tình huống có rủi ro cao, hãy xem quẻ như lớp phản tỉnh trước khi tìm người có chuyên môn.',
        ],
      },
      {
        heading: 'Ba bước trên công cụ web',
        paragraphs: [
          'Bước một là viết câu hỏi bằng một câu ngắn, ví dụ: “Có nên nhận lời mời công việc này không?” Bước hai là chọn phương pháp lập quẻ, mặc định là ba đồng xu/Lục Hào vì dễ kiểm tra và giải thích. Bước ba là đọc kết quả theo hướng hành động.',
          'Sau khi có kết quả, Bói Toán tách rõ quẻ chủ, hào động và quẻ biến nếu có. Phần giải thích chỉ dùng ngôn ngữ có điều kiện như “có thể”, “nên cân nhắc”, “gợi ý”, tránh biến quẻ thành mệnh lệnh.',
        ],
        bullets: [
          'Câu hỏi tốt: cụ thể, một chủ đề, có thời điểm hoặc lựa chọn rõ.',
          'Câu hỏi yếu: quá rộng, muốn biết chắc kết quả, hoặc hỏi thay trách nhiệm chuyên môn.',
          'Kết quả tốt để dùng: có một bước thử nhỏ, một điểm cần kiểm chứng và một giới hạn an toàn.',
        ],
      },
      {
        heading: 'Gieo quẻ khác Giải quẻ',
        paragraphs: [
          'Gieo là thao tác tạo dữ liệu quẻ. Giải là đọc ý nghĩa dựa trên quẻ đã lập, câu hỏi và ngữ cảnh người hỏi cung cấp. Tách hai bước này giúp giảm nhầm lẫn: công cụ chỉ tạo dữ liệu, còn phần diễn giải không được bỏ qua căn cứ quẻ.',
          'Luồng chuẩn là nhận câu hỏi, lập quẻ miễn phí trên web, rồi cho phép người dùng lưu kết quả trong app nếu muốn xem lại.',
        ],
      },
    ],
    howToSteps: [
      { name: 'Viết câu hỏi', text: 'Chọn một quyết định cụ thể, tránh hỏi nhiều việc trong cùng một câu.' },
      { name: 'Lập quẻ', text: 'Dùng phương pháp ba đồng xu hoặc Lục Hào để tạo sáu hào theo thứ tự.' },
      { name: 'Đọc gợi ý', text: 'Đối chiếu quẻ chủ, hào động và quẻ biến với tình huống thật trước khi hành động.' },
    ],
    faqs: [
      {
        question: 'Trang này có phải công cụ dự đoán tương lai không?',
        answer:
          'Không. Đây là khung tham khảo văn hóa giúp bạn nhìn lại câu hỏi và chọn bước tiếp theo thận trọng hơn.',
      },
      {
        question: 'Có cần ngày sinh hoặc giờ sinh để hỏi quẻ không?',
        answer:
          'Không cần. Với Kinh Dịch, dữ liệu chính là câu hỏi và cách lập quẻ; ngày giờ sinh thuộc phạm vi lá số Tử Vi/Bát Tự.',
      },
      {
        question: 'Nếu quẻ gợi ý nên chờ thì có phải phải dừng lại không?',
        answer:
          'Không. “Nên chờ” thường được hiểu là cần thêm dữ kiện, giảm rủi ro hoặc thử nhỏ trước khi cam kết lớn.',
      },
    ],
    ctas: [PRIMARY_CTA, SECONDARY_CTA, TERTIARY_CTA],
    relatedLinks: [
      ...commonRelatedLinks,
      { href: '/kinh-dich/hoi/cong-viec/', label: 'Hỏi việc làm', relation: 'câu hỏi quyết định' },
      { href: '/kinh-dich/hoi/tinh-duyen/', label: 'Hỏi tình duyên', relation: 'ý định cảm xúc' },
    ],
  },
  {
    path: '/kinh-dich/gieo-que/luc-hao/',
    slugSegments: ['gieo-que', 'luc-hao'],
    kind: 'method',
    reviewStatus: KINH_DICH_PILOT_REVIEW_STATUS,
    indexable: false,
    title: 'Kinh Dịch Lục Hào — Gieo Quẻ 3 Đồng Xu Chuẩn Xác | Bói Toán',
    h1: 'Kinh Dịch Lục Hào — Gieo Quẻ 3 Đồng Xu Chuẩn Xác | Bói Toán',
    description:
      'Hướng dẫn gieo quẻ Kinh Dịch Lục Hào bằng 3 đồng xu: cách tung, cách đọc hào động, quẻ chủ và quẻ biến. Tham khảo, không thay thế tư vấn.',
    schemaTypes: ['HowTo', 'FAQPage'],
    kicker: 'Phương pháp • Ba đồng xu',
    primaryKeyword: 'gieo quẻ lục hào',
    splitNote:
      'lập quẻ theo phương pháp Lục Hào tạo sáu hào; diễn giải cần quẻ chủ, hào động, quẻ biến và câu hỏi cụ thể.',
    topDisclaimer: KINH_DICH_PILOT_DISCLAIMER,
    intro: [
      'Lục Hào bằng ba đồng xu là cách dễ giải thích cho người mới vì mỗi lần tung tạo một hào, sáu lần tạo thành một quẻ. Điểm quan trọng không nằm ở động tác tung xu, mà ở việc ghi lại kết quả nhất quán.',
      'Trang này chỉ hướng dẫn phương pháp lập quẻ. Phần giải thích cần dựa vào dữ liệu quẻ đã có và vẫn phải dùng ngôn ngữ có điều kiện, không biến câu trả lời thành lời cam kết.',
    ],
    sections: [
      {
        heading: 'Chuẩn bị trước khi lập quẻ',
        paragraphs: [
          'Hãy viết câu hỏi trước khi tung xu. Một câu tốt thường bắt đầu bằng “Có nên…”, “Nên chọn hướng nào…”, hoặc “Điểm cần chú ý khi…”. Không nên hỏi cùng lúc nhiều lựa chọn vì kết quả khó đọc.',
          'Bạn có thể dùng ba đồng xu thật hoặc bộ sinh số trong công cụ web. Dù dùng cách nào, nguyên tắc là mỗi lần chỉ ghi một hào, từ hào dưới cùng lên trên cùng.',
        ],
      },
      {
        heading: 'Cách ghi sáu hào',
        paragraphs: [
          'Mỗi lần tung ba đồng xu tạo một giá trị hào. Sáu lần tung tạo sáu dòng của quẻ, bắt đầu từ hào sơ ở dưới cùng. Hào động là phần cần chú ý vì nó cho biết điểm đang chuyển trong tình huống.',
          'Nếu không có hào động, bạn đọc trọng tâm ở quẻ chủ. Nếu có một hoặc nhiều hào động, kết quả cần thêm lớp quẻ biến và hào từ tương ứng. Đây là lý do Bói Toán tách phần lập quẻ khỏi phần diễn giải.',
        ],
        bullets: [
          'Ghi đủ sáu lần, không đổi thứ tự sau khi đã tung.',
          'Không tung lại chỉ vì kết quả không như mong muốn.',
          'Nếu câu hỏi nhạy cảm, dùng quẻ như gợi ý bình tĩnh rồi hỏi người có chuyên môn.',
        ],
      },
      {
        heading: 'Cách đọc mà không tuyệt đối hóa',
        paragraphs: [
          'Kết quả nên được đọc như một bản đồ nhỏ: điều gì đang thuận, điều gì cần giảm rủi ro, hành động nào nên thử trước. Quẻ không thay dữ liệu thực tế, hợp đồng, bệnh án, hồ sơ pháp lý hoặc lời khuyên chuyên môn.',
          'Sau phần hướng dẫn, trang có thể nối trực tiếp sang thao tác lập quẻ. Người dùng đọc phương pháp trước, sau đó thử một câu hỏi thật để xem cách hệ thống tách quẻ chủ, hào động và quẻ biến.',
        ],
      },
    ],
    howToSteps: [
      { name: 'Đặt câu hỏi', text: 'Viết một câu hỏi cụ thể trước khi tung xu.' },
      { name: 'Tung sáu lần', text: 'Mỗi lần tạo một hào, ghi từ dưới lên trên.' },
      { name: 'Xác định hào động', text: 'Đánh dấu hào chuyển để biết có cần đọc quẻ biến hay không.' },
      { name: 'Đọc theo ngữ cảnh', text: 'Đối chiếu kết quả với dữ kiện thực tế và lựa chọn hành động nhỏ.' },
    ],
    faqs: [
      {
        question: 'Gieo quẻ Lục Hào có cần chọn giờ đặc biệt không?',
        answer:
          'Không bắt buộc. Điều quan trọng hơn là câu hỏi rõ, tâm thế bình tĩnh và ghi kết quả nhất quán.',
      },
      {
        question: 'Nếu tung sai thứ tự thì nên làm gì?',
        answer:
          'Nên dừng lại và ghi lại từ đầu, vì thứ tự sáu hào là dữ liệu cốt lõi của phương pháp.',
      },
      {
        question: 'Có thể hỏi cùng một câu nhiều lần không?',
        answer:
          'Không nên hỏi liên tục chỉ để tìm kết quả vừa ý. Hãy dùng một kết quả làm gợi ý, rồi kiểm chứng bằng hành động thật.',
      },
    ],
    ctas: [PRIMARY_CTA, SECONDARY_CTA, TERTIARY_CTA],
    relatedLinks: [
      { href: '/kinh-dich/gieo-que/', label: 'Thử gieo quẻ ngay', relation: 'công cụ chính' },
      { href: '/kinh-dich/64-que/', label: 'Xem ý nghĩa các quẻ', relation: 'bảng tra cứu đã rà soát' },
      { href: '/blog/kinh-dich/cach-gieo-que-3-dong-xu/', label: 'Bài blog cách gieo 3 đồng xu', relation: 'chưa gắn link công khai' },
    ],
  },
  {
    path: '/kinh-dich/hoi/cong-viec/',
    slugSegments: ['hoi', 'cong-viec'],
    kind: 'question',
    reviewStatus: KINH_DICH_PILOT_REVIEW_STATUS,
    indexable: false,
    title: 'Gieo Quẻ Kinh Dịch Hỏi Việc — Nên Đổi Việc Không? | Bói Toán',
    h1: 'Gieo Quẻ Kinh Dịch Hỏi Việc — Nên Đổi Việc Không? | Bói Toán',
    description:
      'Gieo quẻ Kinh Dịch hỏi việc: nên đổi công việc, nhận offer hay giữ chỗ? Đặt câu hỏi cụ thể, nhận góc nhìn từ 64 quẻ Dịch.',
    schemaTypes: ['Article', 'FAQPage'],
    kicker: 'Hỏi quẻ • Công việc',
    primaryKeyword: 'gieo quẻ kinh dịch hỏi việc',
    splitNote:
      'Trang này giúp viết câu hỏi công việc trước khi lập quẻ; phần Giải quẻ chỉ bắt đầu sau khi có kết quả.',
    topDisclaimer: KINH_DICH_PILOT_DISCLAIMER,
    intro: [
      'Câu hỏi công việc thường có áp lực vì liên quan thu nhập, uy tín và nhịp sống. Kinh Dịch hữu ích nhất khi giúp bạn chia tình huống thành điều đã rõ, điều còn thiếu dữ kiện và bước thử ít rủi ro.',
      'Trang này không đưa kết luận thay bạn. Mục tiêu là chuẩn bị câu hỏi tốt để khi dùng công cụ web, kết quả có thể chuyển thành hành động cụ thể thay vì chỉ tạo cảm giác lo hoặc hy vọng.',
    ],
    sections: [
      {
        heading: 'Câu hỏi công việc nên viết thế nào',
        paragraphs: [
          'Hãy viết một lựa chọn tại một thời điểm. Ví dụ: “Có nên nhận offer này trong tháng tới không?” rõ hơn “Sự nghiệp của tôi thế nào?”. Câu hỏi càng gọn, quẻ càng dễ đọc theo bối cảnh thật.',
          'Nếu đang cân nhắc chuyển việc, hãy nêu điều kiện quan trọng: vai trò, mức rủi ro, thời gian thử, người liên quan. Phần diễn giải sau đó cần nhắc bạn kiểm chứng bằng dữ liệu, không khẳng định một kết quả chắc.',
        ],
        bullets: [
          'Nên hỏi: “Điểm cần cân nhắc trước khi nhận offer này là gì?”',
          'Nên hỏi: “Có nên mở dự án này theo bước thử nhỏ không?”',
          'Không nên hỏi: “Tôi có thành công tuyệt đối không?”',
        ],
      },
      {
        heading: 'Đọc kết quả theo hướng hành động',
        paragraphs: [
          'Với việc làm, một quẻ thuận không đồng nghĩa phải tiến ngay. Nó có thể gợi ý rằng nền chuẩn bị đã khá hơn, nhưng vẫn cần tiêu chí đo kết quả. Một quẻ khó cũng không có nghĩa nên bỏ cuộc; đôi khi nó nhắc cần làm rõ trách nhiệm hoặc giảm phạm vi thử.',
          'Bói Toán ưu tiên kết luận dạng lựa chọn: tiến có điều kiện, chờ thêm dữ kiện, hoặc thử nhỏ trong một chu kỳ ngắn. Cách viết này giữ người hỏi ở vị trí chủ động.',
        ],
      },
      {
        heading: 'Khi nào cần chuyên gia',
        paragraphs: [
          'Nếu quyết định liên quan hợp đồng, tranh chấp, nợ lớn hoặc cam kết pháp lý, hãy hỏi người có chuyên môn. Quẻ chỉ nên giúp bạn chuẩn bị câu hỏi tốt hơn cho cuộc trao đổi đó.',
          'Nếu tình huống đang làm bạn kiệt sức, hãy ưu tiên nghỉ, nói chuyện với người tin cậy và tìm hỗ trợ phù hợp. Một công cụ tham khảo không nên làm tăng áp lực.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Có nên dùng quẻ để quyết định nghỉ việc không?',
        answer:
          'Có thể dùng như lớp phản tỉnh, nhưng quyết định nên dựa thêm vào tài chính dự phòng, hợp đồng, sức khỏe tinh thần và cơ hội thực tế.',
      },
      {
        question: 'Một quẻ xấu về công việc có nghĩa là thất bại không?',
        answer:
          'Không. Quẻ khó thường nhắc điều cần sửa: dữ kiện thiếu, ranh giới chưa rõ hoặc nhịp tiến quá nhanh.',
      },
      {
        question: 'Nên hỏi việc chung hay hỏi từng lựa chọn?',
        answer:
          'Nên hỏi từng lựa chọn. Một câu hỏi cụ thể giúp phần diễn giải bám vào hành động thay vì nói chung chung.',
      },
    ],
    ctas: [PRIMARY_CTA, SECONDARY_CTA, TERTIARY_CTA],
    relatedLinks: [
      { href: '/kinh-dich/gieo-que/', label: 'Mở công cụ web cho câu hỏi công việc', relation: 'công cụ chính' },
      { href: '/kinh-dich/hoi/tinh-duyen/', label: 'Xem góc nhìn tình duyên', relation: 'ý định liên quan' },
      { href: '/kinh-dich/64-que/', label: 'Đọc ý nghĩa quẻ gieo được', relation: 'bảng tra cứu đã rà soát' },
      { href: '/tu-vi/', label: 'Muốn biết tại sao quẻ này phù hợp với bản mệnh? Lập lá số Tử Vi', relation: 'xem thêm Tử Vi' },
    ],
  },
  {
    path: '/kinh-dich/hoi/tinh-duyen/',
    slugSegments: ['hoi', 'tinh-duyen'],
    kind: 'question',
    reviewStatus: KINH_DICH_PILOT_REVIEW_STATUS,
    indexable: false,
    title: 'Gieo Quẻ Kinh Dịch Tình Duyên — Có Quay Lại Không? | Bói Toán',
    h1: 'Gieo Quẻ Kinh Dịch Tình Duyên — Có Quay Lại Không? | Bói Toán',
    description:
      'Gieo quẻ Kinh Dịch tình duyên: người ấy có quay lại không? Nên tiến hay dừng? Đặt câu hỏi, nhận đáp án từ quẻ Dịch.',
    schemaTypes: ['Article', 'FAQPage'],
    kicker: 'Hỏi quẻ • Tình duyên',
    primaryKeyword: 'gieo quẻ kinh dịch tình duyên',
    splitNote:
      'Trang này chuẩn bị câu hỏi cảm xúc trước khi lập quẻ; Giải quẻ cần kết quả cụ thể và không được ép người hỏi phải yêu, cưới, chia tay.',
    topDisclaimer: KINH_DICH_PILOT_DISCLAIMER,
    intro: [
      'Câu hỏi tình cảm dễ kéo theo mong muốn có một câu trả lời dứt khoát. Bói Toán tránh hướng đó: quẻ nên giúp bạn nhìn lại cách giao tiếp, ranh giới và điều cần nói rõ.',
      'Nếu có tổn thương, kiểm soát hoặc bạo lực, hãy ưu tiên an toàn và tìm hỗ trợ thực tế. Nội dung ở đây chỉ là lớp tham khảo văn hóa, không thay lời khuyên chuyên môn.',
    ],
    sections: [
      {
        heading: 'Viết câu hỏi để không tự ép mình',
        paragraphs: [
          'Thay vì hỏi “người ấy có thuộc về tôi không?”, hãy hỏi “điều cần hiểu trước khi tiếp tục mối quan hệ này là gì?”. Cách hỏi thứ hai giữ quyền chủ động và tôn trọng người còn lại.',
          'Một câu hỏi tốt nên bám vào hành động: nên nói chuyện lại, nên chờ thêm dữ kiện, nên đặt ranh giới hay nên dừng một vòng lặp gây mệt. Tránh dùng quẻ để theo dõi, kiểm soát hoặc kết luận thay cảm xúc của người khác.',
        ],
        bullets: [
          'Nên hỏi: “Mình cần chú ý điều gì trước khi cam kết sâu hơn?”',
          'Nên hỏi: “Có nên mở cuộc nói chuyện này trong tuần tới không?”',
          'Không nên hỏi: “Người ấy có thuộc về mình không?”',
        ],
      },
      {
        heading: 'Đọc quẻ bằng ngôn ngữ mềm',
        paragraphs: [
          'Trong tình cảm, lời giải nên tránh gây hoảng sợ hoặc hưng phấn quá mức. Một quẻ thuận có thể nhắc về sự đồng điệu, nhưng vẫn cần hành động tử tế. Một quẻ căng có thể nhắc về lệch nhịp, nhưng không kết luận ai đúng ai sai.',
          'Phần diễn giải cần đưa ra câu hỏi phản tỉnh: điều gì cần nói rõ, giới hạn nào cần giữ, bước nhỏ nào giúp cả hai hiểu nhau hơn.',
        ],
      },
      {
        heading: 'Ranh giới an toàn',
        paragraphs: [
          'Không dùng quẻ để hợp thức hóa việc gây áp lực, kiểm soát hoặc theo dõi người khác. Nếu có dấu hiệu nguy hiểm, hãy chọn an toàn trước khi tìm bất kỳ lời giải biểu tượng nào.',
          'Bói Toán cũng không dùng câu chữ khép kín kiểu hứa hẹn quay lại hoặc ép chia tay. Với mối quan hệ thật, trách nhiệm và đối thoại quan trọng hơn một câu phán.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Có thể hỏi quẻ xem người ấy có yêu mình không?',
        answer:
          'Nên đổi thành câu hỏi về điều bạn có thể quan sát hoặc trao đổi. Quẻ không nên được dùng để khẳng định cảm xúc của người khác.',
      },
      {
        question: 'Quẻ tình duyên xấu có nghĩa là nên chia tay không?',
        answer:
          'Không. Nó có thể nhắc về vấn đề cần nói rõ, ranh giới cần giữ hoặc thời điểm chưa phù hợp để cam kết.',
      },
      {
        question: 'Nếu đang rất lo, có nên hỏi nhiều lần không?',
        answer:
          'Không nên hỏi liên tục. Hãy ghi lại một kết quả, nghỉ một nhịp, rồi chọn một cuộc trò chuyện hoặc hành động nhỏ.',
      },
    ],
    ctas: [PRIMARY_CTA, SECONDARY_CTA, TERTIARY_CTA],
    relatedLinks: [
      { href: '/kinh-dich/gieo-que/', label: 'Mở công cụ web cho câu hỏi tình duyên', relation: 'công cụ chính' },
      { href: '/kinh-dich/hoi/cong-viec/', label: 'Xem góc nhìn công việc', relation: 'ý định liên quan' },
      { href: '/kinh-dich/64-que/', label: 'Đọc ý nghĩa quẻ gieo được', relation: 'bảng tra cứu đã rà soát' },
      { href: '/tu-vi/', label: 'Muốn biết tại sao quẻ này phù hợp với bản mệnh? Lập lá số Tử Vi', relation: 'xem thêm Tử Vi' },
    ],
  },
  {
    path: '/kinh-dich/64-que/',
    slugSegments: ['64-que'],
    kind: 'hub',
    reviewStatus: KINH_DICH_PILOT_REVIEW_STATUS,
    indexable: false,
    title: '64 Quẻ Kinh Dịch — Ý Nghĩa & Cách Gieo Quẻ | Bói Toán',
    h1: '64 Quẻ Kinh Dịch — Ý Nghĩa & Cách Gieo Quẻ | Bói Toán',
    description:
      '64 quẻ Kinh Dịch: ý nghĩa từng quẻ, cách gieo và luận giải theo Dịch Lý, Việt Dịch và Mai Hoa. Bảng tra cứu đầy đủ nhất.',
    schemaTypes: ['Article', 'FAQPage'],
    kicker: 'Evergreen hub • 64 quẻ',
    primaryKeyword: '64 quẻ kinh dịch',
    splitNote:
      'Trang này là tài liệu tham chiếu; thao tác gieo nằm ở công cụ web, còn giải nghĩa đầy đủ chỉ mở với quẻ đã được rà soát chuyên môn.',
    topDisclaimer: KINH_DICH_PILOT_DISCLAIMER,
    intro: [
      'Trang này chuẩn bị cấu trúc tra cứu lâu dài cho 64 quẻ, nhưng không mở rộng diễn giải khi nội dung chưa được rà soát. Đó là rào an toàn để tránh tạo 58 bài mỏng hoặc tự chế nghĩa quẻ.',
      'Hiện tại, chỉ các quẻ đã có trong dữ liệu đã rà soát được liên kết. Các quẻ còn lại hiển thị tên để người đọc hiểu cấu trúc, kèm trạng thái chờ duyệt nội dung.',
    ],
    sections: [
      {
        heading: 'Quẻ đã có nội dung đã rà soát',
        paragraphs: [
          'Những liên kết dưới đây dùng lại nội dung đã được viết và kiểm tra trong dữ liệu hiện có. Mỗi trang quẻ giải thích ý nghĩa, tinh thần chính, ứng dụng và lời khuyên theo hướng tham khảo.',
          'Mỗi quẻ mới cần được rà soát chuyên môn riêng trước khi liên kết công khai.',
        ],
      },
      {
        heading: 'Quẻ còn lại: tên trước, diễn giải sau',
        paragraphs: [
          'Danh sách tên giúp giữ cấu trúc 64 quẻ, nhưng không tạo bài giải khi chưa có nguồn kiểm chứng. Đây là bài học trực tiếp từ loạt bài theo năm sinh: không dùng khuôn mẫu để lấp khoảng trống nội dung.',
          'Khi Bói Toán duyệt thêm quẻ, trang này có thể chuyển quẻ đó từ “chờ duyệt” sang liên kết nội dung đầy đủ. Trước thời điểm đó, người đọc được mời dùng công cụ web để lập quẻ miễn phí thay vì đọc một bài diễn giải chưa sẵn sàng.',
        ],
      },
      {
        heading: 'Liên hệ với công cụ web',
        paragraphs: [
          'Trang 64 quẻ không thay thế thao tác hỏi quẻ. Nếu bạn đang có câu hỏi thật, hãy dùng công cụ web để lập quẻ trước; sau đó đọc quẻ chủ và quẻ biến theo dữ liệu đã có.',
          'Nếu quẻ rơi vào nhóm chưa có bài đã rà soát, hệ thống nên hiển thị lời nhắc an toàn và chờ nội dung rà soát chuyên môn thay vì tự dựng một bài dài.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Vì sao chưa có đủ 64 bài giải?',
        answer:
          'Vì mỗi quẻ cần được rà soát riêng, trang chỉ liên kết nội dung đã có nguồn để tránh bài mỏng hoặc sai nghĩa.',
      },
      {
        question: 'Có thể lập ra quẻ chưa có bài đã rà soát không?',
        answer:
          'Có thể về mặt công cụ, nhưng phần đọc công khai cần hiển thị an toàn và không tự viết diễn giải dài khi chưa được duyệt.',
      },
      {
        question: 'Trang 64 quẻ khác gì trang gieo quẻ?',
        answer:
          'Trang 64 quẻ là danh sách tham chiếu. Trang gieo là nơi người dùng đặt câu hỏi, lập quẻ và đi tới phần giải thích phù hợp.',
      },
    ],
    ctas: [PRIMARY_CTA, SECONDARY_CTA, TERTIARY_CTA],
    relatedLinks: [
      { href: '/kinh-dich/gieo-que/', label: 'Gieo quẻ ngẫu nhiên', relation: 'công cụ chính' },
      { href: '/kinh-dich/gieo-que/luc-hao/', label: 'Học cách gieo 3 đồng xu', relation: 'hướng dẫn phương pháp' },
      { href: '/kinh-dich/hoi/cong-viec/', label: 'Hỏi việc làm', relation: 'câu hỏi quyết định' },
    ],
    reviewedHexagramLinks,
    unrevisedHexagramNames,
  },
]

export const KINH_DICH_PILOT_PATHS = KINH_DICH_PILOT_PAGES.map((page) => page.path)

export function getKinhDichPilotPageByPath(path: string): KinhDichPilotPage | null {
  const normalizedPath = path.endsWith('/') ? path : `${path}/`
  return KINH_DICH_PILOT_PAGES.find((page) => page.path === normalizedPath) ?? null
}

export function getKinhDichPilotPageBySegments(segments: string[]): KinhDichPilotPage | null {
  return getKinhDichPilotPageByPath(`/kinh-dich/${segments.join('/')}/`)
}

export function pilotBodyText(page: KinhDichPilotPage): string {
  return [
    ...page.intro,
    page.splitNote,
    ...page.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ')
}
