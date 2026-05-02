/** Real Tử Vi star content for /sao/* SEO pages. */

export interface StarContent {
  name: string
  slug: string
  overview: string
  position: string
  characteristics: string
  influence: string
  combinations: string
  advice: string
}

export const STAR_CONTENT: Record<string, StarContent> = {
  'tu-vi': {
    name: 'Tử Vi',
    slug: 'tu-vi',
    overview: `Sao Tử Vi là sao chủ mệnh, được xưng tụng là "Đế Tinh" trong hệ thống Tử Vi Đẩu Số. Đây là ngôi sao quan trọng nhất trong lá số, đại diện cho quyền lực, địa vị, sự tự chủ và khả năng lãnh đạo bẩm sinh của một người. Khi Tử Vi đắc địa, chủ mệnh thường có khí chất uy nghi, tự tin, có khả năng điều hành và quản lý tốt.`,
    position: `Tử Vi thuộc hành Thổ, là sao Bắc Đẩu tinh. Trong 12 cung, Tử Vi luôn đi theo cặp với Thiên Phủ, hai sao này đối xứng qua trục Mệnh - Thân. Vị trí của Tử Vi trong lá số được xác định dựa trên tháng sinh và ngày sinh của người đó. Tử Vi an tại cung nào thì cung đó trở thành trung tâm của lá số, ảnh hưởng đến toàn bộ cấu trúc sao.`,
    characteristics: `Người có sao Tử Vi tọa mệnh thường có tính cách điềm đạm, trầm ổn, không thích hợp với công việc hành chính hay nghiên cứu mà thích hợp với vai trò lãnh đạo, quản lý. Họ có khả năng nhìn xa trông rộng, biết cách sắp xếp công việc và con người. Tuy nhiên, nếu Tử Vi hãm địa hoặc gặp sát tinh, người này có thể trở nên cố chấp, độc đoán hoặc dễ rơi vào cảm giác cô độc.`,
    influence: `Tử Vi nằm ở cung Mệnh: Chủ về sự nghiệp vững vàng, có quý nhân phù trợ, thích hợp làm lãnh đạo.\n\nTử Vi nằm ở cung Quan Lộc: Sự nghiệp thăng tiến, dễ được cất nhắc lên vị trí cao.\n\nTử Vi nằm ở cung Tài Bạch: Tài chính ổn định, có khả năng tích lũy tài sản lớn theo thời gian.\n\nTử Vi nằm ở cung Phu Thê: Hôn nhân ổn định, bạn đời có khả năng và địa vị.`,
    combinations: `Tử Vi - Thiên Phủ: Cách "Tử Phủ Triều Viên" - cực kỳ tốt, chủ về giàu sang, quyền quý.\n\nTử Vi - Thiên Tướng: Cách "Tử Tướng Triều Viên" - có quyền có thế, được người kính nể.\n\nTử Vi - Thất Sát: Cách "Tử Sát Triều Viên" - có uy quyền nhưng tính cách mạnh mẽ, dễ gây thù chuốc oán.\n\nTử Vi - Phá Quân: Cách "Tử Phá Triều Viên" - cuộc đời nhiều biến động, thăng trầm.`,
    advice: `Nếu bạn có sao Tử Vi trong lá số, hãy phát huy khả năng lãnh đạo và tầm nhìn chiến lược của mình. Tuy nhiên, cần học cách lắng nghe ý kiến người khác, tránh chủ quan và độc đoán. Nếu Tử Vi hãm địa, nên tập trung vào việc xây dựng các mối quan hệ tốt đẹp và trau dồi chuyên môn để bù đắp những thiếu sót về mặt vận mệnh.`
  },
  'thien-co': {
    name: 'Thiên Cơ',
    slug: 'thien-co',
    overview: `Sao Thiên Cơ là sao chủ về trí tuệ, tính toán và sự nhanh nhạy. Được mệnh danh là "Thiện Tinh" vì mang lại nhiều điều tốt đẹp cho chủ mệnh. Người có Thiên Cơ thường thông minh, lanh lợi, có khả năng phân tích và tính toán xuất sắc.`,
    position: `Thiên Cơ thuộc hành Mộc, là sao Nam Đẩu tinh. Trong lá số, Thiên Cơ luôn đi theo cặp với Cự Môn, hai sao này đối xứng qua trục Mệnh - Thân. Vị trí của Thiên Cơ ảnh hưởng lớn đến tư duy và cách thức xử lý thông tin của chủ mệnh.`,
    characteristics: `Người có Thiên Cơ tọa mệnh thường có trí óc nhanh nhạy, thích học hỏi, đam mê nghiên cứu. Họ có khả năng thích nghi tốt với môi trường mới và giải quyết vấn đề một cách logic. Tuy nhiên, đôi khi họ có xu hướng lo nghĩ nhiều, dễ bị stress vì suy nghĩ quá mức.`,
    influence: `Thiên Cơ nằm ở cung Mệnh: Thông minh, học giỏi, thích hợp với nghề nghiệp đòi hỏi trí óc.\n\nThiên Cơ nằm ở cung Quan Lộc: Sự nghiệp liên quan đến kế toán, tài chính, công nghệ hoặc nghiên cứu phát triển.\n\nThiên Cơ nằm ở cung Tài Bạch: Có khả năng kiếm tiền bằng trí tuệ, đầu tư thông minh.\n\nThiên Cơ nằm ở cung Phu Thê: Tình duyên dựa trên sự thấu hiểu và giao tiếp trí tuệ.`,
    combinations: `Thiên Cơ - Cự Môn: Cặp sao đối xứng, chủ về trí tuệ và khả năng biện luận.\n\nThiên Cơ - Thiên Lương: Cách "Cơ Lương" - người có đức hạnh, được quý nhân phù trợ.\n\nThiên Cơ - Cự Môn (cùng cung): Trí tuệ sắc bén nhưng dễ gây tranh cãi.`,
    advice: `Phát huy khả năng học hỏi và thích nghi. Tuy nhiên, cần học cách thư giãn, đừng để đầu óc luôn trong trạng thái căng thẳng. Nên chọn nghề nghiệp phù hợp với khả năng phân tích và tính toán.`
  },
  'thai-duong': {
    name: 'Thái Dương',
    slug: 'thai-duong',
    overview: `Sao Thái Dương là sao chủ về danh tiếng, quyền lực và sự nhiệt huyết. Đại diện cho ánh sáng, năng lượng tích cực và sự cởi mở. Người có Thái Dương thường có tính cách hướng ngoại, nhiệt tình và thích được chú ý.`,
    position: `Thái Dương thuộc hành Hỏa, là sao chủ về quý tước và danh vọng. Trong lá số, Thái Dương đi theo cặp với Thái Âm, hai sao này biểu thị cho quan hệ âm dương. Vị trí của Thái Dương ảnh hưởng đến sự nghiệp và danh tiếng của chủ mệnh.`,
    characteristics: `Người có Thái Dương tọa mệnh thường tự tin, nhiệt tình, có khả năng truyền cảm hứng cho người khác. Họ thích hoạt động xã hội, dễ nổi bật trong đám đông. Tuy nhiên, nếu Thái Dương hãm địa, có thể trở nên kiêu ngạo, thích khoe khoang hoặc dễ bị tổn thương vì danh dự.`,
    influence: `Thái Dương nằm ở cung Mệnh: Danh tiếng tốt, được nhiều người biết đến và quý mến.\n\nThái Dương nằm ở cung Quan Lộc: Sự nghiệp thăng tiến nhanh, dễ đạt được vị trí cao.\n\nThái Dương nằm ở cung Tài Bạch: Tài chính dồi dào, kiếm tiền từ danh tiếng và mối quan hệ.`,
    combinations: `Thái Dương - Thái Âm: Cặp âm dương hài hòa, chủ về sự cân bằng trong cuộc sống.\n\nThái Dương - Cự Môn: Cách "Nhật Nguyệt Phản Bối" - danh tiếng có nhưng dễ gặp thị phi.`,
    advice: `Tận dụng sự nhiệt huyết và khả năng giao tiếp để xây dựng sự nghiệp. Nhưng cần khiêm tốn, tránh kiêu ngạo và học cách lắng nghe.`
  },
  'vu-khuc': {
    name: 'Vũ Khúc',
    slug: 'vu-khuc',
    overview: `Sao Vũ Khúc là sao chủ về tài lộc và sự nghiệp. Được xem là "Tài Tinh" trong hệ thống Tử Vi, đại diện cho khả năng kiếm tiền, quản lý tài chính và sự ổn định trong công việc.`,
    position: `Vũ Khúc thuộc hành Kim, là sao Bắc Đẩu tinh. Trong lá số, Vũ Khúc đi theo cặp với Phá Quân, hai sao này đối xứng qua trục Mệnh - Thân. Vị trí của Vũ Khúc ảnh hưởng trực tiếp đến tài vận và sự nghiệp.`,
    characteristics: `Người có Vũ Khúc tọa mệnh thường thực tế, chăm chỉ, có khả năng quản lý tài chính tốt. Họ không thích mạo hiểm, thường chọn con đường an toàn và ổn định. Tuy nhiên, có thể hơi bảo thủ và thiếu linh hoạt trong suy nghĩ.`,
    influence: `Vũ Khúc nằm ở cung Mệnh: Tính cách thực tế, chăm chỉ làm việc.\n\nVũ Khúc nằm ở cung Tài Bạch: Cực kỳ tốt cho tài chính, dễ tích lũy tài sản.\n\nVũ Khúc nằm ở cung Quan Lộc: Sự nghiệp ổn định, thích hợp với ngành tài chính, kế toán.`,
    combinations: `Vũ Khúc - Phá Quân: Cặp sao đối xứng, chủ về tài lộc nhưng dễ có biến động.\n\nVũ Khúc - Thiên Phủ: Cách "Vũ Phủ" - tài lộc dồi dào, sự nghiệp vững chắc.`,
    advice: `Phát huy tính cẩn thận và khả năng quản lý tài chính. Nhưng cũng cần học cách linh hoạt hơn, đừng quá bảo thủ.`
  },
  'thien-dong': {
    name: 'Thiên Đồng',
    slug: 'thien-dong',
    overview: `Sao Thiên Đồng là sao chủ về phúc lộc và sự may mắn. Được xem là "Phúc Tinh", đại diện cho sự hạnh phúc, an nhàn và được hưởng phúc từ tiền nhân.`,
    position: `Thiên Đồng thuộc hành Thủy, là sao Nam Đẩu tinh. Trong lá số, Thiên Đồng đi theo cặp với Thiên Lương, hai sao này đối xứng qua trục Mệnh - Thân.`,
    characteristics: `Người có Thiên Đồng tọa mệnh thường hiền lành, phúc hậu, được lòng người. Họ có cuộc sống khá an nhàn, ít phải lo lắng về vật chất. Tuy nhiên, có thể hơi lười biếng và thiếu quyết đoán.`,
    influence: `Thiên Đồng nằm ở cung Mệnh: Tính cách hiền hòa, được quý nhân phù trợ.\n\nThiên Đồng nằm ở cung Phúc Đức: Phúc lộc dồi dào, gia đình hạnh phúc.\n\nThiên Đồng nằm ở cung Tài Bạch: Tài lộc ổn định, không lo cơm áo gạo tiền.`,
    combinations: `Thiên Đồng - Thiên Lương: Cách "Đồng Lương" - phúc thọ, sống lâu, được hưởng phúc.\n\nThiên Đồng - Thiên Cơ: Cách "Cơ Đồng" - thông minh và may mắn kết hợp.`,
    advice: `Tận hưởng phúc lộc nhưng đừng quá ỷ lại. Cần chủ động hơn trong cuộc sống và công việc.`
  },
  'liem-trinh': {
    name: 'Liêm Trinh',
    slug: 'liem-trinh',
    overview: `Sao Liêm Trinh là sao chủ về công danh và sự nghiệp chính trị. Đại diện cho quyền lực, sự liêm khiết và khả năng thực thi công lý.`,
    position: `Liêm Trinh thuộc hành Hỏa, là sao Bắc Đẩu tinh. Trong lá số, Liêm Trinh đi theo cặp với Thiên Tướng.`,
    characteristics: `Người có Liêm Trinh tọa mệnh thường có tính cách cương trực, liêm khiết, không thích hợp với môi trường tham nhũng. Họ có khả năng quản lý tốt, nhưng đôi khi quá cứng nhắc.`,
    influence: `Liêm Trinh nằm ở cung Quan Lộc: Cực kỳ tốt cho sự nghiệp công danh, dễ thăng tiến.\n\nLiêm Trinh nằm ở cung Mệnh: Tính cách cương trực, được người tôn trọng.`,
    combinations: `Liêm Trinh - Thiên Tướng: Cách "Liêm Tướng" - quyền lực và địa vị cao.`,
    advice: `Giữ gìn sự liêm khiết nhưng cũng cần linh hoạt trong cách xử lý công việc.`
  },
  'thien-phu': {
    name: 'Thiên Phủ',
    slug: 'thien-phu',
    overview: `Sao Thiên Phủ là sao chủ về tài khố và sự giàu có. Được xem là "Tàng Tinh", đại diện cho khả năng tích lũy, bảo quản và gia tăng tài sản.`,
    position: `Thiên Phủ thuộc hành Thổ, là sao Nam Đẩu tinh. Luôn đi theo cặp với Tử Vi.`,
    characteristics: `Người có Thiên Phủ tọa mệnh thường cẩn thận, có khả năng quản lý tài chính xuất sắc. Họ thích tích lũy hơn tiêu xài.`,
    influence: `Thiên Phủ nằm ở cung Tài Bạch: Cực kỳ tốt, dễ tích lũy tài sản lớn.\n\nThiên Phủ nằm ở cung Điền Trạch: Có nhiều bất động sản, nhà cửa khang trang.`,
    combinations: `Tử Vi - Thiên Phủ: Cách "Tử Phủ" - vua sao, chủ về giàu sang tột bậc.`,
    advice: `Phát huy khả năng quản lý tài chính. Nhưng cũng nên biết hưởng thụ và đầu tư mạo hiểm đúng lúc.`
  },
  'thai-am': {
    name: 'Thái Âm',
    slug: 'thai-am',
    overview: `Sao Thái Âm là sao chủ về tài lộc nội tại và sự dịu dàng. Đại diện cho năng lượng âm, sự nhẹ nhàng và khả năng thu hút tài lộc.`,
    position: `Thái Âm thuộc hành Thủy, đi theo cặp với Thái Dương.`,
    characteristics: `Người có Thái Âm tọa mệnh thường dịu dàng, nhẹ nhàng, có duyên với tài chính. Họ thích hợp với công việc liên quan đến chăm sóc, dịch vụ.`,
    influence: `Thái Âm nằm ở cung Tài Bạch: Tài lộc từ công việc ổn định, thích hợp kinh doanh nhỏ.\n\nThái Âm nằm ở cung Phu Thê: Hôn nhân êm ấm, bạn đời hiền lành.`,
    combinations: `Thái Dương - Thái Âm: Cân bằng âm dương, cuộc sống hài hòa.`,
    advice: `Phát huy sự dịu dàng và khéo léo. Cần tự tin hơn trong các quyết định lớn.`
  },
  'tham-lang': {
    name: 'Tham Lang',
    slug: 'tham-lang',
    overview: `Sao Tham Lang là sao chủ về ham muốn, đam mê và sự sáng tạo. Đại diện cho năng lượng mãnh liệt, thích khám phá và chinh phục.`,
    position: `Tham Lang thuộc hành Mộc và Thủy, đi theo cặp với Vũ Khúc.`,
    characteristics: `Người có Tham Lang tọa mệnh thường nhiệt tình, đam mê, có nhiều sở thích. Họ thích hợp với nghệ thuật, kinh doanh, hoặc các công việc sáng tạo.`,
    influence: `Tham Lang nằm ở cung Tài Bạch: Tài lộc từ đầu tư mạo hiểm, kinh doanh.\n\nTham Lang nằm ở cung Quan Lộc: Sự nghiệp liên quan đến nghệ thuật, giải trí, marketing.`,
    combinations: `Tham Lang - Vũ Khúc: Cách "Vũ Tham" - tài lộc lớn nhưng dễ thị phi.`,
    advice: `Kiểm soát ham muốn và đam mê. Tập trung vào mục tiêu dài hạn thay vì thỏa mãn ngắn hạn.`
  },
  'cu-mon': {
    name: 'Cự Môn',
    slug: 'cu-mon',
    overview: `Sao Cự Môn là sao chủ về ngôn ngữ, giao tiếp và sự biện luận. Đại diện cho khả năng nói chuyện, thuyết phục và truyền đạt thông tin.`,
    position: `Cự Môn thuộc hành Thủy, đi theo cặp với Thiên Cơ.`,
    characteristics: `Người có Cự Môn tọa mệnh thường ăn nói lưu loát, có khả năng thuyết phục. Họ thích hợp với nghề luật sư, giáo viên, MC, bán hàng. Tuy nhiên, dễ gây tranh cãi và thị phi.`,
    influence: `Cự Môn nằm ở cung Mệnh: Tính cách hoạt bát, thích giao tiếp.\n\nCự Môn nằm ở cung Quan Lộc: Sự nghiệp liên quan đến truyền thông, giáo dục, luật.`,
    combinations: `Cự Môn - Thiên Cơ: Trí tuệ sắc bén, khả năng phân tích và biện luận tốt.`,
    advice: `Phát huy khả năng giao tiếp. Nhưng cần cẩn thận lời nói, tránh gây thị phi và tranh cãi không cần thiết.`
  },
  'thien-luong': {
    name: 'Thiên Lương',
    slug: 'thien-luong',
    overview: `Sao Thiên Lương là sao chủ về đức hạnh, lòng nhân từ và sự giúp đời. Được xem là "Thọ Tinh", đại diện cho sống lâu, khỏe mạnh và được người quý mến.`,
    position: `Thiên Lương thuộc hành Mộc, đi theo cặp với Thiên Đồng.`,
    characteristics: `Người có Thiên Lương tọa mệnh thường tốt bụng, hay giúp đời, được lòng mọi người. Họ có sức khỏe tốt và tuổi thọ cao.`,
    influence: `Thiên Lương nằm ở cung Mệnh: Tính cách nhân hậu, được quý nhân phù trợ.\n\nThiên Lương nằm ở cung Tật Ách: Sức khỏe tốt, ít bệnh tật.`,
    combinations: `Thiên Đồng - Thiên Lương: Cách "Đồng Lương" - phúc thọ song toàn.`,
    advice: `Tiếp tục sống nhân hậu và giúp đời. Nhưng cũng cần biết bảo vệ bản thân, đừng để người khác lợi dụng lòng tốt.`
  },
  'pha-quan': {
    name: 'Phá Quân',
    slug: 'pha-quan',
    overview: `Sao Phá Quân là sao chủ về sự thay đổi, phá cách và đổi mới. Đại diện cho năng lượng phá hủy để tái tạo, không thích sự ràng buộc và máy móc.`,
    position: `Phá Quân thuộc hành Thủy, đi theo cặp với Vũ Khúc.`,
    characteristics: `Người có Phá Quân tọa mệnh thường thích tự do, không thích bị ràng buộc. Họ có tư duy đổi mới, thích khám phá cái mới. Tuy nhiên, cuộc sống thường nhiều biến động.`,
    influence: `Phá Quân nằm ở cung Mệnh: Cuộc đời nhiều thay đổi, không thích ổn định.\n\nPhá Quân nằm ở cung Quan Lộc: Sự nghiệp hay thay đổi, thích hợp với startup, khởi nghiệp.`,
    combinations: `Vũ Khúc - Phá Quân: Cách "Vũ Phá" - tài lộc có nhưng dễ biến động.\n\nTử Vi - Phá Quân: Cách "Tử Phá" - quyền lực nhưng dễ gây tranh chấp.`,
    advice: `Chấp nhận sự thay đổi nhưng cũng cần xây dựng nền tảng vững chắc. Đừng đổi mới chỉ vì thích mà phải có chiến lược rõ ràng.`
  },
  'ta-phu': {
    name: 'Tả Phù',
    slug: 'ta-phu',
    overview: `Sao Tả Phù là một trong hai sao phụ tá quan trọng (cùng với Hữu Bật). Đại diện cho sự hỗ trợ, trợ giúp từ bên ngoài, đặc biệt là từ phía tay trái hoặc phía trước.`,
    position: `Tả Phù thuộc hành Thổ, luôn nằm cách cung Mệnh 3 cung theo chiều thuận (theo chiều kim đồng hồ).`,
    characteristics: `Người có Tả Phù tọa mệnh hoặc gặp Tả Phù trong các cung quan trọng thường có quý nhân phù trợ từ phía bên ngoài. Họ dễ được người khác giúp đỡ trong công việc và cuộc sống.`,
    influence: `Tả Phù nằm ở cung Quan Lộc: Có người hỗ trợ trong sự nghiệp, dễ thăng tiến.\n\nTả Phù nằm ở cung Tài Bạch: Có người chỉ dẫn trong đầu tư, tài chính.`,
    combinations: `Tả Phù - Hữu Bật: Cặp sao phụ tá, chủ về nhiều quý nhân phù trợ.`,
    advice: `Trân trọng những người giúp đỡ mình. Xây dựng mối quan hệ tốt đẹp với đồng nghiệp và đối tác.`
  },
  'huu-bat': {
    name: 'Hữu Bật',
    slug: 'huu-bat',
    overview: `Sao Hữu Bật là sao phụ tá đi cùng với Tả Phù. Đại diện cho sự hỗ trợ từ phía sau hoặc từ bên trong, thường là sự giúp đỡ kín đáo.`,
    position: `Hữu Bật thuộc hành Thổ, luôn nằm cách cung Mệnh 3 cung theo chiều nghịch (ngược chiều kim đồng hồ).`,
    characteristics: `Người có Hữu Bật thường được giúp đỡ một cách âm thầm, không công khai. Họ có thể có người thân hoặc bạn bè luôn sẵn sàng hỗ trợ.`,
    influence: `Hữu Bật nằm ở cung Mệnh: Có người thân hoặc bạn bè tốt luôn bên cạnh.\n\nHữu Bật nằm ở cung Phúc Đức: Gia đình là chỗ dựa vững chắc.`,
    combinations: `Tả Phù - Hữu Bật: Đôi cánh phụ tá, mang lại nhiều may mắn và sự hỗ trợ.`,
    advice: `Biết ơn những người đã giúp đỡ mình. Đừng quên đáp lại sự tốt đẹp của họ.`
  },
  'thien-khoi': {
    name: 'Thiên Khôi',
    slug: 'thien-khoi',
    overview: `Sao Thiên Khôi là sao chủ về văn chương, học vấn và sự thông minh. Đại diện cho tài năng văn học, nghệ thuật và khả năng sáng tạo.`,
    position: `Thiên Khôi thuộc hành Hỏa, là sao văn xuất chúng trong hệ thống Tử Vi.`,
    characteristics: `Người có Thiên Khôi thường thông minh, có tài văn chương, học giỏi. Họ thích hợp với các ngành nghề đòi hỏi trí tuệ và sáng tạo.`,
    influence: `Thiên Khôi nằm ở cung Quan Lộc: Sự nghiệp liên quan đến văn hóa, giáo dục, nghệ thuật.\n\nThiên Khôi nằm ở cung Mệnh: Thông minh, có tài năng đặc biệt.`,
    combinations: `Thiên Khôi - Thiên Việt: Cặp sao văn võ toàn tài.`,
    advice: `Phát huy tài năng văn chương và sáng tạo. Nhưng cũng cần học cách kiên nhẫn và bền bỉ.`
  },
  'thien-viet': {
    name: 'Thiên Việt',
    slug: 'thien-viet',
    overview: `Sao Thiên Việt là sao chủ về võ nghệ, sự can đảm và khả năng hành động. Đại diện cho sự mạnh mẽ, quyết đoán và khả năng lãnh đạo quân sự.`,
    position: `Thiên Việt thuộc hành Kim, là sao võ xuất chúng trong hệ thống Tử Vi.`,
    characteristics: `Người có Thiên Việt thường can đảm, quyết đoán, có khả năng lãnh đạo. Họ thích hợp với các ngành nghề đòi hỏi sự mạnh mẽ và quyết đoán.`,
    influence: `Thiên Việt nằm ở cung Quan Lộc: Sự nghiệp liên quan đến quân đội, công an, thể thao.\n\nThiên Việt nằm ở cung Mệnh: Tính cách mạnh mẽ, có khả năng lãnh đạo.`,
    combinations: `Thiên Khôi - Thiên Việt: Văn võ song toàn, tài năng toàn diện.`,
    advice: `Phát huy sự can đảm và quyết đoán. Nhưng cũng cần học cách kiềm chế và suy nghĩ trước khi hành động.`
  },
  'van-xuong': {
    name: 'Văn Xương',
    slug: 'van-xuong',
    overview: `Sao Văn Xương là sao chủ về học vấn, thi cử và sự thông minh. Đại diện cho khả năng học tập, nghiên cứu và đạt được thành tích trong học tập.`,
    position: `Văn Xương thuộc hành Kim, là một trong những sao quan trọng nhất về học vấn trong Tử Vi.`,
    characteristics: `Người có Văn Xương thường thông minh, học giỏi, có khả năng đạt được thành tích cao trong học tập và nghiên cứu.`,
    influence: `Văn Xương nằm ở cung Quan Lộc: Sự nghiệp liên quan đến giáo dục, nghiên cứu, học thuật.\n\nVăn Xương nằm ở cung Mệnh: Thông minh, có tài năng học tập xuất sắc.`,
    combinations: `Văn Xương - Văn Khúc: Cặp sao văn chương, chủ về tài năng văn học và nghệ thuật.`,
    advice: `Tận dụng khả năng học tập xuất sắc. Nhưng cũng cần phát triển kỹ năng thực tế và giao tiếp.`
  },
  'van-khuc': {
    name: 'Văn Khúc',
    slug: 'van-khuc',
    overview: `Sao Văn Khúc là sao chủ về nghệ thuật, âm nhạc và sự sáng tạo. Đại diện cho tài năng nghệ thuật, khả năng biểu đạt cảm xúc qua nghệ thuật.`,
    position: `Văn Khúc thuộc hành Thủy, là sao nghệ thuật trong hệ thống Tử Vi.`,
    characteristics: `Người có Văn Khúc thường có tài năng nghệ thuật, nhạy cảm với cái đẹp. Họ thích hợp với các ngành nghệ thuật, âm nhạc, thiết kế.`,
    influence: `Văn Khúc nằm ở cung Quan Lộc: Sự nghiệp liên quan đến nghệ thuật, giải trí, sáng tạo.\n\nVăn Khúc nằm ở cung Mệnh: Tính cách nhạy cảm, có tài năng nghệ thuật.`,
    combinations: `Văn Xương - Văn Khúc: Cặp sao văn chương xuất sắc, chủ về tài năng văn học và nghệ thuật.`,
    advice: `Phát huy tài năng nghệ thuật. Nhưng cũng cần học cách quản lý cảm xúc và tài chính.`
  },
  'thien-ma': {
    name: 'Thiên Mã',
    slug: 'thien-ma',
    overview: `Sao Thiên Mã là sao chủ về sự di chuyển, thay đổi và hoạt động. Đại diện cho năng lượng di động, không thích đứng yên một chỗ.`,
    position: `Thiên Mã thuộc hành Hỏa, là sao động trong hệ thống Tử Vi.`,
    characteristics: `Người có Thiên Mã thường thích di chuyển, hay thay đổi, không thích sự ổn định. Họ thích hợp với công việc đòi hỏi di chuyển nhiều.`,
    influence: `Thiên Mã nằm ở cung Mệnh: Cuộc sống nhiều di chuyển, hay thay đổi chỗ ở hoặc công việc.\n\nThiên Mã nằm ở cung Quan Lộc: Sự nghiệp liên quan đến di chuyển, du lịch, vận tải.`,
    combinations: `Thiên Mã - Thiên Hình: Sự di chuyển có thể gặp rủi ro, cần cẩn thận.`,
    advice: `Tận dụng năng lượng di động. Nhưng cũng cần xây dựng nền tảng ổn định để không bị cuốn theo sự thay đổi quá mức.`
  },
  'thien-hinh': {
    name: 'Thiên Hình',
    slug: 'thien-hinh',
    overview: `Sao Thiên Hình là sao chủ về sự khắc nghiệt, thử thách và sự rèn luyện. Đại diện cho những khó khăn cần vượt qua để trưởng thành.`,
    position: `Thiên Hình thuộc hành Hỏa, là sao có tính chất khắc nghiệt trong hệ thống Tử Vi.`,
    characteristics: `Người có Thiên Hình thường trải qua nhiều thử thách trong cuộc sống. Nhưng chính những thử thách này giúp họ trở nên mạnh mẽ và trưởng thành.`,
    influence: `Thiên Hình nằm ở cung Mệnh: Cuộc đời nhiều thử thách, nhưng vượt qua được sẽ thành công.\n\nThiên Hình nằm ở cung Quan Lộc: Sự nghiệp có nhiều áp lực và thử thách.`,
    combinations: `Thiên Hình - Thiên Riêu: Cặp sao khắc nghiệt, chủ về nhiều khó khăn và thử thách.`,
    advice: `Xem thử thách là cơ hội để trưởng thành. Kiên trì và không bỏ cuộc giữa chừng.`
  }
}
