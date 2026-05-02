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

export interface StarSummaryRow {
  aspect: string
  meaning: string
  readingCue: string
}

export interface StarSection {
  heading: string
  content: string[]
}

export interface StarInternalLink {
  href: string
  label: string
  relation: string
}

export interface StarFoundationPage {
  name: string
  slug: string
  h1: string
  title: string
  description: string
  urlPath: string
  methodNote: string
  intro: string[]
  summaryRows: StarSummaryRow[]
  sections: StarSection[]
  faqs: Array<{ question: string; answer: string }>
  internalLinks: StarInternalLink[]
  disclaimer: string
}

export const PRIORITY_STAR_SLUGS = [
  'tu-vi',
  'thai-duong',
  'thai-am',
  'thien-co',
  'vu-khuc',
  'thien-luong',
] as const

type PriorityStarSlug = (typeof PRIORITY_STAR_SLUGS)[number]

interface StarProfile {
  slug: PriorityStarSlug
  name: string
  hanTu: string
  archetype: string
  role: string
  core: string
  temperament: string
  gift: string
  caution: string
  menhCue: string
  thanCue: string
  quanCue: string
  taiCue: string
  relationshipCue: string
  wellbeingCue: string
  combinationFocus: string
  positivePairings: string[]
  challengingPairings: string[]
  practicalAdvice: string
  questions: string[]
}

const METHOD_NOTE =
  'Phân tích tham khảo theo tinh thần Tam Hợp Phái / 《紫微斗数全书》: đọc sao trong tam phương tứ chính, phối hợp Mệnh Cung, Thân Cung, Cục, chính tinh, phụ tinh và bối cảnh thực tế; không kết luận chỉ từ một sao riêng lẻ.'

const STAR_DISCLAIMER =
  '* Nội dung chỉ mang tính chất tham khảo, không phải lời tiên đoán. Bói Toán là nội dung giải trí và thuật toán tham khảo theo văn hóa Tử Vi; không dùng bài viết này để thay thế tư vấn y tế, pháp lý, tài chính hoặc quyết định quan trọng.'

const STAR_PROFILES: Record<PriorityStarSlug, StarProfile> = {
  'tu-vi': {
    slug: 'tu-vi',
    name: 'Tử Vi',
    hanTu: '紫微',
    archetype: 'Đế Tinh, trung tâm điều phối của nhóm chính tinh',
    role: 'khả năng tổ chức, giữ trục, gánh trách nhiệm và xây cấu trúc',
    core: 'Tử Vi thường được xem như biểu tượng của trật tự, vị thế và năng lực điều phối. Khi đọc lá số, sao này không nên được hiểu đơn giản là “cao” hay “thấp”, mà là câu hỏi người đó đang dùng quyền chủ động của mình ra sao: biết tập hợp nguồn lực, biết đặt nguyên tắc, hay đang bị áp lực kiểm soát làm cho cứng lại.',
    temperament: 'điềm tĩnh, thích có nguyên tắc, quan sát toàn cục trước khi hành động',
    gift: 'biết gom người, phân vai, nhìn bức tranh lớn và giữ lời hứa dài hạn',
    caution: 'dễ thành tự ái, xa cách hoặc áp đặt nếu thiếu sao mềm và thiếu phản hồi thật',
    menhCue: 'nhấn mạnh nhu cầu tự chủ, danh dự cá nhân và cách một người đứng ra nhận trách nhiệm',
    thanCue: 'cho thấy giai đoạn trưởng thành cần học cách dùng quyền lực mềm, không chỉ dựa vào địa vị',
    quanCue: 'nghiêng về quản trị, điều phối, xây hệ thống, công vụ hoặc vai trò đại diện tập thể',
    taiCue: 'gợi ý tiền bạc cần đi qua kế hoạch, danh tiếng, tài sản dài hạn và người đáng tin',
    relationshipCue: 'cần sự tôn trọng hai chiều; nếu chỉ muốn đúng, quan hệ dễ thành khoảng cách',
    wellbeingCue: 'nên giữ nhịp nghỉ ngơi, giảm áp lực tinh thần và tránh ôm hết việc của người khác',
    combinationFocus: 'Tử Vi cần xem cùng Thiên Phủ, Thiên Tướng, Thất Sát, Phá Quân và bộ Tả Hữu/Xương Khúc để biết quyền lực được nâng đỡ, điều hòa hay phải tự gánh.',
    positivePairings: ['Tử Vi - Thiên Phủ', 'Tử Vi - Thiên Tướng', 'Tử Vi gặp Tả Phù/Hữu Bật', 'Tử Vi gặp Văn Xương/Văn Khúc'],
    challengingPairings: ['Tử Vi - Phá Quân', 'Tử Vi - Thất Sát', 'Tử Vi gặp sát tinh dày', 'Tử Vi đơn thủ thiếu trợ tinh'],
    practicalAdvice: 'Nếu lá số nổi bật Tử Vi, hãy rèn khả năng phân quyền, lắng nghe phản biện và giữ kỷ luật nói ít làm chắc. Điểm mạnh của Tử Vi chỉ bền khi người đọc biến uy tín thành trách nhiệm, không biến trách nhiệm thành áp lực kiểm soát.',
    questions: ['Mình đang gánh phần việc nào vì trách nhiệm thật, phần nào vì sợ mất kiểm soát?', 'Ai là người nên được phân quyền để hệ thống bớt phụ thuộc vào mình?', 'Nguyên tắc nào cần giữ, nguyên tắc nào nên mềm lại để quan hệ dễ thở hơn?'],
  },
  'thai-duong': {
    slug: 'thai-duong',
    name: 'Thái Dương',
    hanTu: '太陽',
    archetype: 'mặt trời, ánh sáng công khai và tinh thần đảm trách',
    role: 'sự hiện diện trước tập thể, danh dự, minh bạch và khả năng truyền động lực',
    core: 'Thái Dương thường gợi hình ảnh một nguồn sáng: rõ ràng, trực diện và muốn đem điều mình tin là đúng ra phục vụ đời sống chung. Khi đọc lá số, trọng tâm không phải là hứa hẹn danh tiếng, mà là cách người đó dùng sự hiện diện của mình: có soi đường, có nhận trách nhiệm, hay bị kỳ vọng bên ngoài kéo đi quá xa.',
    temperament: 'thẳng thắn, hào sảng, phản ứng nhanh với chuyện đúng sai và thích làm việc có ích',
    gift: 'dễ tạo niềm tin, biết đứng mũi chịu sào, hợp môi trường cần tính công khai',
    caution: 'dễ mệt vì muốn luôn mạnh mẽ; khi bị hiểu lầm có thể phản ứng bằng danh dự thay vì bình tĩnh',
    menhCue: 'nhấn mạnh nhu cầu được sống minh bạch, có việc để cống hiến và được nhìn nhận đúng',
    thanCue: 'cho thấy bài học trưởng thành là cân bằng giữa chiếu sáng cho người khác và giữ sức của mình',
    quanCue: 'nghiêng về truyền thông, giáo dục, quản lý, kỹ thuật, đại diện tổ chức hoặc công việc phục vụ cộng đồng',
    taiCue: 'gợi ý nguồn lực đến từ uy tín, mạng lưới công khai và khả năng tạo niềm tin',
    relationshipCue: 'cần nói rõ kỳ vọng; nếu im lặng vì sĩ diện, người thân khó biết phải hỗ trợ thế nào',
    wellbeingCue: 'nên chăm nhịp sinh hoạt, ánh sáng, vận động vừa phải và khoảng nghỉ không bị lịch họp chiếm hết',
    combinationFocus: 'Thái Dương cần đọc cùng Thái Âm để xem thế cân bằng âm dương, cùng Cự Môn để xem lời nói và thị phi, cùng Thiên Lương để xem trách nhiệm đạo đức.',
    positivePairings: ['Thái Dương - Thái Âm', 'Thái Dương - Thiên Lương', 'Thái Dương gặp Hóa Khoa', 'Thái Dương gặp Văn Xương/Văn Khúc'],
    challengingPairings: ['Thái Dương - Cự Môn thiếu điều hòa', 'Thái Dương gặp Hóa Kỵ', 'Thái Dương bị sát tinh ép', 'Thái Dương hãm mà thiếu trợ tinh'],
    practicalAdvice: 'Nếu lá số nổi bật Thái Dương, hãy chọn môi trường có tiêu chuẩn rõ, nhiệm vụ rõ và phản hồi công bằng. Đừng biến khả năng gánh vác thành thói quen tự ép mình phải xuất hiện mọi lúc; sự sáng rõ cần đi cùng nhịp nghỉ.',
    questions: ['Mình đang muốn được công nhận vì giá trị thật hay vì sợ bị xem nhẹ?', 'Điều gì cần nói thẳng để bớt hiểu lầm trong gia đình và công việc?', 'Lịch sinh hoạt nào giúp mình có năng lượng bền hơn khi phải đứng trước tập thể?'],
  },
  'thai-am': {
    slug: 'thai-am',
    name: 'Thái Âm',
    hanTu: '太陰',
    archetype: 'mặt trăng, nội lực, tích lũy và sự chăm sóc kín đáo',
    role: 'nguồn lực bên trong, khả năng quan sát, gìn giữ, nuôi dưỡng và hoạch định thầm lặng',
    core: 'Thái Âm thường gợi về phần tĩnh của lá số: cảm nhận, ký ức, tài sản tích lũy, quan hệ thân cận và khả năng làm việc bền bỉ ở hậu trường. Khi đọc sao này, không nên chỉ gắn với sự mềm mại; cần nhìn cách người đó bảo vệ nguồn lực, giữ nhịp sống và xử lý những điều không thể nói ồn ào.',
    temperament: 'trầm, tinh tế, nhạy với bầu không khí và thích chuẩn bị kỹ trước khi quyết định',
    gift: 'giỏi tích lũy, biết chăm chi tiết, có duyên với công việc cần sự tin cậy và thẩm mỹ',
    caution: 'dễ suy nghĩ vòng tròn, né xung đột hoặc ôm cảm xúc quá lâu nếu thiếu kênh nói ra',
    menhCue: 'nhấn mạnh đời sống nội tâm, nhu cầu an toàn và cách người đó bảo vệ giá trị riêng',
    thanCue: 'cho thấy trưởng thành qua việc xây nền ổn định, không cần mọi thành quả phải ồn ào',
    quanCue: 'nghiêng về tài chính, giáo dục, dịch vụ, chăm sóc khách hàng, thiết kế, nội dung hoặc công việc hậu trường',
    taiCue: 'gợi ý tiền bạc cần đi qua tích lũy đều, quản lý tài sản, thận trọng với cảm xúc khi chi tiêu',
    relationshipCue: 'cần sự an tâm và lắng nghe; nếu im lặng quá lâu, nhu cầu thật dễ bị hiểu sai',
    wellbeingCue: 'nên giữ giấc ngủ, không gian riêng, nhịp nghỉ và thói quen ghi chép để xả áp lực tinh thần',
    combinationFocus: 'Thái Âm cần đọc cùng Thái Dương để xem cân bằng ngoài-trong, cùng Thiên Cơ để xem trí tính toán, cùng Thiên Đồng để xem nhu cầu an ổn.',
    positivePairings: ['Thái Âm - Thái Dương', 'Thái Âm - Thiên Cơ', 'Thái Âm - Thiên Đồng', 'Thái Âm gặp Văn Xương/Văn Khúc'],
    challengingPairings: ['Thái Âm gặp Hóa Kỵ', 'Thái Âm thiếu sao chủ động', 'Thái Âm bị sát tinh thúc ép', 'Thái Âm quá nặng ở cảm xúc riêng'],
    practicalAdvice: 'Nếu lá số nổi bật Thái Âm, hãy dùng thế mạnh quan sát để lập kế hoạch, nhưng đừng để mọi việc chỉ nằm trong suy nghĩ. Nên có lịch kiểm tra tiền bạc, lịch nghỉ, và một kênh trao đổi an toàn để cảm xúc không tích tụ.',
    questions: ['Mình đang giữ điều gì vì khôn ngoan, điều gì vì ngại nói thẳng?', 'Nguồn lực nào cần được ghi chép và bảo vệ rõ ràng hơn?', 'Không gian nghỉ nào giúp mình phục hồi mà không phải giải thích quá nhiều?'],
  },
  'thien-co': {
    slug: 'thien-co',
    name: 'Thiên Cơ',
    hanTu: '天機',
    archetype: 'cơ mưu, chuyển động, trí phân tích và bàn tay sắp đặt',
    role: 'tư duy hệ thống, kế hoạch, thích nghi, kỹ thuật và khả năng xoay chuyển tình huống',
    core: 'Thiên Cơ là sao khiến lá số có tính động: nhiều câu hỏi, nhiều phương án, nhiều khả năng sửa đường khi hoàn cảnh đổi. Khi đọc sao này, điểm quan trọng là phân biệt trí tuệ linh hoạt với sự phân tán. Một Thiên Cơ dùng đúng sẽ biết lập kế hoạch, còn dùng quá mức có thể thành lo nghĩ không dứt.',
    temperament: 'nhanh trí, thích học, hay quan sát chi tiết và dễ nhìn ra điểm chưa tối ưu',
    gift: 'biết phân tích, thiết kế quy trình, tìm phương án B và kết nối dữ kiện rời rạc',
    caution: 'dễ đổi hướng quá nhanh, thiếu nghỉ ngơi hoặc biến mọi việc thành bài toán phải giải',
    menhCue: 'nhấn mạnh trí tò mò, nhu cầu học liên tục và khả năng tự điều chỉnh theo bối cảnh',
    thanCue: 'cho thấy trưởng thành qua việc chọn một số trục chính để đào sâu thay vì mở quá nhiều nhánh',
    quanCue: 'nghiêng về tham mưu, nghiên cứu, công nghệ, vận hành, giáo dục, thiết kế hệ thống hoặc truyền thông phân tích',
    taiCue: 'gợi ý nguồn lực đến từ tri thức, quy trình, kỹ năng và cách kiểm soát rủi ro trước khi hành động',
    relationshipCue: 'cần giao tiếp rõ vì người có Thiên Cơ dễ phân tích thay cho cảm nhận trực tiếp',
    wellbeingCue: 'nên quản trị giấc ngủ, giới hạn thời gian suy nghĩ và xen kẽ vận động nhẹ để hạ tải tinh thần',
    combinationFocus: 'Thiên Cơ cần đọc cùng Cự Môn để xem lời nói và tranh luận, cùng Thiên Lương để xem đạo lý và trách nhiệm, cùng Thái Âm để xem chiều sâu quan sát.',
    positivePairings: ['Thiên Cơ - Thiên Lương', 'Thiên Cơ - Thái Âm', 'Thiên Cơ gặp Hóa Khoa', 'Thiên Cơ gặp Văn Xương/Văn Khúc'],
    challengingPairings: ['Thiên Cơ - Cự Môn thiếu tiết chế', 'Thiên Cơ gặp Hóa Kỵ', 'Thiên Cơ bị sát tinh làm gấp', 'Thiên Cơ quá động mà thiếu trục'],
    practicalAdvice: 'Nếu lá số nổi bật Thiên Cơ, hãy biến óc phân tích thành quy trình viết ra được: checklist, bản đồ quyết định, lịch học và tiêu chí dừng. Điểm mạnh của Thiên Cơ không nằm ở nghĩ nhiều, mà ở nghĩ đủ để hành động đúng nhịp.',
    questions: ['Việc nào cần phân tích thêm, việc nào đã đủ dữ kiện để làm?', 'Mình có đang đổi kế hoạch vì học được điều mới hay vì sợ cam kết?', 'Quy trình nào giúp giảm suy nghĩ lặp lại trong tuần này?'],
  },
  'vu-khuc': {
    slug: 'vu-khuc',
    name: 'Vũ Khúc',
    hanTu: '武曲',
    archetype: 'tài tinh kỷ luật, hành động chắc và năng lực chịu trách nhiệm vật chất',
    role: 'quản trị nguồn lực, quyết đoán, nguyên tắc, hiệu suất và khả năng biến kế hoạch thành kết quả đo được',
    core: 'Vũ Khúc thường được đọc như sao của kỷ luật và tài sản hữu hình, nhưng không nên hiểu thành lời hứa về tiền bạc. Ý nghĩa thực tế hơn là cách một người đối diện nguồn lực: có biết ghi chép, biết cắt lãng phí, biết làm việc đến nơi đến chốn và chịu trách nhiệm với con số hay không.',
    temperament: 'thực tế, gọn, chịu áp lực tốt và thích đo thành quả bằng việc cụ thể',
    gift: 'giỏi kỷ luật, quản lý tiền, quản lý vật tư, đàm phán tiêu chuẩn và thực thi cam kết',
    caution: 'dễ khô, ít bộc lộ cảm xúc, khó nhờ giúp đỡ hoặc quá nghiêm với bản thân',
    menhCue: 'nhấn mạnh tinh thần tự lập, trách nhiệm, tính tiết kiệm và xu hướng làm hơn nói',
    thanCue: 'cho thấy trưởng thành qua việc dùng kỷ luật đúng chỗ, không biến đời sống thành bảng kiểm cứng nhắc',
    quanCue: 'nghiêng về tài chính, vận hành, kỹ thuật, kiểm toán, quản lý tài sản, sản xuất hoặc vai trò cần chuẩn hóa quy trình',
    taiCue: 'gợi ý nên quản trị tiền bằng kế hoạch, dòng tiền, dự phòng và tiêu chí rủi ro rõ ràng',
    relationshipCue: 'cần học cách nói nhu cầu mềm hơn; hành động chăm sóc không phải lúc nào cũng được người khác hiểu ngay',
    wellbeingCue: 'nên cân bằng giữa làm việc sâu, vận động đều và khoảng nghỉ không gắn với năng suất',
    combinationFocus: 'Vũ Khúc cần đọc cùng Thiên Phủ để xem tích lũy, cùng Phá Quân để xem chu kỳ phá-cải, cùng Tham Lang để xem ham muốn và giao tế.',
    positivePairings: ['Vũ Khúc - Thiên Phủ', 'Vũ Khúc gặp Lộc Tồn/Hóa Lộc', 'Vũ Khúc gặp Tả Phù/Hữu Bật', 'Vũ Khúc gặp Hóa Quyền'],
    challengingPairings: ['Vũ Khúc - Phá Quân thiếu kế hoạch', 'Vũ Khúc - Tham Lang quá ham mở rộng', 'Vũ Khúc gặp Hóa Kỵ', 'Vũ Khúc bị sát tinh làm căng'],
    practicalAdvice: 'Nếu lá số nổi bật Vũ Khúc, hãy giữ thói quen ghi số liệu, đặt ngân sách và đo tiến độ, nhưng nhớ thêm ngôn ngữ cảm xúc trong quan hệ. Kỷ luật của Vũ Khúc rất quý khi nó bảo vệ tự do dài hạn, không phải khi nó làm đời sống trở nên khô cứng.',
    questions: ['Con số nào cần được ghi lại để mình bớt quyết định theo cảm giác?', 'Mình đang tiết kiệm vì mục tiêu rõ hay vì bất an?', 'Có cách nào nói sự quan tâm bằng lời thay vì chỉ bằng việc làm không?'],
  },
  'thien-luong': {
    slug: 'thien-luong',
    name: 'Thiên Lương',
    hanTu: '天梁',
    archetype: 'ấm tinh, người che chở, đạo lý và vai trò cố vấn',
    role: 'bảo hộ, chuẩn mực, lòng chính trực, năng lực dẫn dắt và giải áp lực cho tập thể',
    core: 'Thiên Lương thường được hiểu như sao của sự che chở và đạo lý. Khi đọc lá số, nên nhìn sao này như câu hỏi về trách nhiệm đạo đức: người đó bảo vệ ai, dựa trên nguyên tắc nào, và có biết giữ ranh giới để không gánh thay toàn bộ vấn đề của người khác hay không.',
    temperament: 'điềm hậu, thích công bằng, có xu hướng khuyên nhủ và quan tâm chuyện đúng sai',
    gift: 'biết làm điểm tựa, biết giữ chuẩn mực, hợp vai trò tư vấn, giáo dục, kiểm tra và chăm sóc cộng đồng',
    caution: 'dễ thành ôm việc, đạo lý hóa cảm xúc hoặc chịu mệt vì muốn ai cũng ổn',
    menhCue: 'nhấn mạnh lòng chính trực, nhu cầu sống có nghĩa và hình ảnh người đáng tin trong mắt người khác',
    thanCue: 'cho thấy trưởng thành qua việc giúp đúng người, đúng mức, không dùng hy sinh để chứng minh giá trị',
    quanCue: 'nghiêng về giáo dục, tư vấn, kiểm soát chất lượng, bảo hiểm, công tác xã hội, pháp chế hoặc vai trò mentor',
    taiCue: 'gợi ý nguồn lực đến từ uy tín, chuyên môn, dịch vụ có chuẩn mực và quan hệ tin cậy dài hạn',
    relationshipCue: 'cần phân biệt chăm sóc với kiểm soát; người thân cần sự hiện diện, không luôn cần lời khuyên',
    wellbeingCue: 'nên giữ ranh giới, nghỉ ngơi định kỳ, giảm áp lực tinh thần và duy trì thói quen kiểm tra sức khỏe tổng quát',
    combinationFocus: 'Thiên Lương cần đọc cùng Thiên Cơ để xem trí mưu đi với đạo lý, cùng Thái Dương để xem ánh sáng công khai, cùng Thiên Đồng để xem phúc khí và nhu cầu an ổn.',
    positivePairings: ['Thiên Cơ - Thiên Lương', 'Thái Dương - Thiên Lương', 'Thiên Đồng - Thiên Lương', 'Thiên Lương gặp Hóa Khoa'],
    challengingPairings: ['Thiên Lương gặp Hóa Kỵ', 'Thiên Lương bị sát tinh làm nặng trách nhiệm', 'Thiên Lương thiếu sao hành động', 'Thiên Lương quá thiên về hy sinh'],
    practicalAdvice: 'Nếu lá số nổi bật Thiên Lương, hãy biến lòng tốt thành nguyên tắc làm việc rõ ràng: giúp đến đâu, dừng ở đâu, ai chịu trách nhiệm phần nào. Một người có Thiên Lương mạnh cần học rằng giữ ranh giới cũng là một cách bảo vệ người khác.',
    questions: ['Mình đang giúp vì người kia cần hay vì mình khó chịu khi thấy vấn đề?', 'Ranh giới nào cần nói rõ để lòng tốt không biến thành kiệt sức?', 'Kiến thức nào giúp mình làm cố vấn tốt hơn thay vì chỉ khuyên theo kinh nghiệm?'],
  },
}

function starLinks(currentSlug: PriorityStarSlug): StarInternalLink[] {
  const starOrder = PRIORITY_STAR_SLUGS.filter((slug) => slug !== currentSlug)
  return [
    { href: '/tu-vi/', label: 'Tử Vi 2026 - Xem Lá Số Tử Vi Online', relation: 'Hub Tử Vi' },
    { href: '/lap-la-so/', label: 'Tìm hiểu cách lập lá số Tử Vi', relation: 'Cá nhân hóa theo ngày giờ sinh' },
    ...starOrder.map((slug) => ({
      href: `/sao/${slug}/`,
      label: `Sao ${STAR_PROFILES[slug].name}`,
      relation: 'Chính tinh nên đọc tiếp',
    })),
  ]
}

function buildRichStarPage(profile: StarProfile): StarFoundationPage {
  const name = profile.name
  const intro = [
    `Sao ${name} (${profile.hanTu}) là một chính tinh quan trọng trong Tử Vi Đẩu Số. Bài viết này giải thích ý nghĩa sao ${name} theo hướng thực tế: ${profile.role}, cách đọc trong Mệnh Cung, Thân Cung, Quan Lộc, Tài Bạch và các tổ hợp sao thường gặp.`,
    `Nội dung được viết cho SEO tĩnh và người mới học Tử Vi, nên không giả lập lá số cá nhân khi chưa có ngày sinh, giờ sinh. Bạn có thể dùng trang này như bản nền để hiểu ngôn ngữ Tử Vi trước khi đi vào từng cung và từng vòng vận.`,
    METHOD_NOTE,
  ]

  const summaryRows: StarSummaryRow[] = [
    {
      aspect: 'Từ khóa chính',
      meaning: profile.archetype,
      readingCue: `Đọc như biểu tượng của ${profile.role}, không tách khỏi cung và tam phương tứ chính.`,
    },
    {
      aspect: 'Khi ở Mệnh Cung',
      meaning: profile.menhCue,
      readingCue: 'So với cung Thân, Quan Lộc, Tài Bạch và Thiên Di để biết điểm mạnh được dùng ở đâu.',
    },
    {
      aspect: 'Khi ở Quan Lộc',
      meaning: profile.quanCue,
      readingCue: 'Chỉ xem là xu hướng nghề nghiệp tham khảo; không kết luận nghề bắt buộc.',
    },
    {
      aspect: 'Khi ở Tài Bạch',
      meaning: profile.taiCue,
      readingCue: 'Đọc theo thói quen quản trị nguồn lực, không hứa hẹn kết quả tiền bạc.',
    },
    {
      aspect: 'Lưu ý cân bằng',
      meaning: profile.caution,
      readingCue: 'Cần xem phụ tinh, sát tinh, Tứ Hóa và bối cảnh thực tế trước khi đưa lời khuyên.',
    },
  ]

  const sections: StarSection[] = [
    {
      heading: `Tổng quan sao ${name}`,
      content: [
        profile.core,
        `Trong ngôn ngữ Tử Vi, ${name} không hoạt động như một nhãn dán cố định cho tính cách. Sao này chỉ mở ra một trường nghĩa. Muốn đọc đúng, cần hỏi: sao đang ở cung nào, có chính tinh nào đồng cung, được hội chiếu bởi nhóm nào, và người xem đang hỏi về mệnh, công việc, quan hệ hay nhịp sống.`,
        `Cách đọc an toàn là dùng ${name} như một lăng kính. Nếu lá số có ${name} nổi bật, người đọc có thể nhận ra xu hướng ${profile.temperament}. Nhưng xu hướng đó vẫn thay đổi theo môi trường sống, giáo dục, lựa chọn cá nhân và từng giai đoạn đại vận.`,
        `Với người mới học, nên ghi nhớ một nguyên tắc: một sao không đủ để gọi là tốt hay xấu. ${name} có mặt thuận là ${profile.gift}; mặt cần tỉnh táo là ${profile.caution}. Chính sự phối hợp hai mặt này mới làm bài luận có giá trị thực tế.`,
      ],
    },
    {
      heading: `Sao ${name} ở Mệnh Cung và Thân Cung`,
      content: [
        `Khi ${name} được nhắc ở Mệnh Cung, trọng tâm là khí chất ban đầu và cách một người phản ứng với đời sống. Với ${name}, dấu hiệu nổi bật là ${profile.menhCue}. Tuy nhiên, Mệnh Cung không đứng một mình; nó luôn nhận tác động từ Tài Bạch, Quan Lộc, Thiên Di và các sao hội chiếu.`,
        `Khi xét Thân Cung, câu hỏi chuyển sang cách người đó trưởng thành sau trải nghiệm. ${profile.thanCue}. Vì vậy hai người cùng có ${name} nổi bật vẫn có cách sống khác nhau nếu một người rèn được kỷ luật, còn người kia bị môi trường kéo vào thói quen cũ.`,
        `Nếu ${name} gặp nhiều sao nâng đỡ, xu hướng tốt dễ có đất để phát huy. Nếu gặp bộ sao gây căng, nên đọc như lời nhắc điều chỉnh hành vi: giảm phản ứng cực đoan, tăng kiểm chứng, và tránh biến ngôn ngữ Tử Vi thành lý do để đóng khung bản thân.`,
      ],
    },
    {
      heading: `Công danh, tài lộc và tình duyên khi đọc sao ${name}`,
      content: [
        `Ở cung Quan Lộc, ${name} thường gợi về ${profile.quanCue}. Đây chỉ là phương hướng đọc nghề nghiệp, không phải quyết định thay người xem. Một lá số tốt về nghề vẫn cần kỹ năng, thị trường, sức bền và lựa chọn đúng thời điểm.`,
        `Ở cung Tài Bạch, ${name} nên được hiểu qua cách người đó tạo, giữ và sử dụng nguồn lực. ${profile.taiCue}. Bói Toán không dùng sao ${name} để khẳng định giàu nghèo; cách đọc phù hợp hơn là nhận ra thói quen tiền bạc cần củng cố hoặc cần tiết chế.`,
        `Trong quan hệ tình cảm và gia đạo, ${name} gợi ý ${profile.relationshipCue}. Cung Phu Thê, Phúc Đức và Nô Bộc sẽ làm bức tranh cụ thể hơn. Nếu chỉ nhìn một sao, người đọc rất dễ nhầm giữa nhu cầu cá nhân và phẩm chất của mối quan hệ.`,
        `Ở phần Tật Ách, trang này chỉ dùng ngôn ngữ wellbeing: ${profile.wellbeingCue}. Không suy luận bệnh lý từ sao, không tự chẩn đoán và không thay thế tư vấn y tế. Nếu có bất thường về sức khỏe, người xem nên gặp chuyên gia phù hợp.`,
      ],
    },
    {
      heading: `Tổ hợp sao và tam phương tứ chính`,
      content: [
        profile.combinationFocus,
        `Các tổ hợp thường được đọc theo hai nhóm. Nhóm hỗ trợ cho ${name} gồm ${profile.positivePairings.join(', ')}. Khi gặp nhóm này, bài luận nên nhấn vào cách điểm mạnh có người nâng, có phương tiện thể hiện hoặc có khuôn khổ để thành việc cụ thể.`,
        `Nhóm cần thận trọng gồm ${profile.challengingPairings.join(', ')}. Từ “thận trọng” ở đây không có nghĩa xấu tuyệt đối; nó nhắc người đọc kiểm tra thêm cung, độ sáng, Tứ Hóa, vòng vận và câu hỏi thực tế. Nhiều cách cục căng vẫn có giá trị nếu người xem biết chuyển thành kỷ luật hành động.`,
        `Tam phương tứ chính là lý do không nên đọc ${name} một mình. Sao ở Mệnh có thể được Tài Bạch hỗ trợ, Quan Lộc kéo lên, Thiên Di phản chiếu, hoặc bị một cung khác tạo áp lực. Bài luận tốt phải nói được mối quan hệ giữa các điểm này thay vì chỉ liệt kê tính chất sao.`,
      ],
    },
    {
      heading: `Cách đọc sao ${name} theo Tam Hợp Phái`,
      content: [
        `Theo tinh thần Tam Hợp Phái, người đọc bắt đầu từ trục Mệnh - Thân, rồi kiểm tra tam phương gồm Mệnh, Tài Bạch, Quan Lộc và cung xung chiếu. Với ${name}, câu hỏi đầu tiên là sao này đang đóng vai “chủ đề chính” hay chỉ là một tín hiệu phụ trong toàn cục.`,
        `Bước tiếp theo là xem chính tinh đồng cung, phụ tinh, sát tinh, Tứ Hóa và vòng vận. Nếu ${name} được nâng bởi nhóm cát tinh, lời khuyên có thể nghiêng về phát huy sở trường. Nếu bị kéo bởi nhóm sao gây áp lực, lời khuyên nên chuyển sang quản trị rủi ro, điều chỉnh nhịp sống và kiểm chứng quyết định.`,
        `Cách đọc này cũng giúp tránh lỗi thường gặp: thấy một tên sao rồi kết luận ngay. Ví dụ, ${name} có thể nói về ${profile.role}, nhưng “nói về” không đồng nghĩa “bảo đảm”. Lá số là hệ thống nhiều biến, còn đời sống thật luôn có học tập, lựa chọn và hoàn cảnh.`,
      ],
    },
    {
      heading: `Ứng dụng thực tế khi tự đọc lá số có sao ${name}`,
      content: [
        profile.practicalAdvice,
        `Một cách tự học hiệu quả là viết lại ba câu hỏi kiểm chứng cho ${name}: ${profile.questions.join(' ')} Những câu hỏi này giúp nội dung Tử Vi chuyển thành quan sát đời sống, tránh cảm giác đọc xong chỉ thấy hay nhưng không biết làm gì.`,
        `Nếu bạn đang đọc cho người thân, hãy dùng ngôn ngữ mềm: “lá số gợi ý”, “có xu hướng”, “nên kiểm tra thêm”. Không nên nói như phán quyết. Người nghe cần một bản đồ tham khảo để tự hiểu mình, không cần một câu kết luận làm họ sợ hoặc phụ thuộc.`,
        `Nếu bạn đang đọc cho chính mình, hãy đối chiếu ${name} với dữ liệu thật: thói quen làm việc, cách phản ứng khi căng, mối quan hệ lặp lại, và điều bạn thường né tránh. Khi Tử Vi giúp bạn đặt câu hỏi tốt hơn, nó đã có giá trị thực tế mà không cần biến thành lời khẳng định tuyệt đối.`,
      ],
    },
    {
      heading: `Giới hạn của bài viết về sao ${name}`,
      content: [
        `Trang này là bài nền về sao ${name}, không phải lá số cá nhân. Để đọc cá nhân hóa cần ngày sinh, giờ sinh, giới tính, lịch âm/dương chính xác, Cục, Mệnh Cung, Thân Cung và vị trí sao trong đủ 12 cung. Thiếu dữ liệu này thì không nên nói chắc về một người cụ thể.`,
        `Nội dung cũng không thay thế chuyên gia trong các vấn đề y tế, pháp lý, tài chính hay quyết định quan trọng. Nếu bạn dùng Tử Vi, hãy dùng như một hệ thống biểu tượng để suy ngẫm và trò chuyện có cấu trúc. Mọi quyết định đời thực vẫn cần dữ liệu, trách nhiệm và lời khuyên chuyên môn khi cần.`,
        `Điểm đáng giữ của sao ${name} là khả năng mở ra một ngôn ngữ văn hóa Việt - Hán Việt giàu chiều sâu. Khi đọc đúng tinh thần tham khảo, nó giúp người học gọi tên khuynh hướng, nhìn lại lựa chọn và giữ thái độ khiêm tốn trước một lá số luôn nhiều lớp hơn một bài viết SEO.`,
      ],
    },
  ]

  const faqs = [
    {
      question: `Sao ${name} trong Tử Vi có ý nghĩa gì?`,
      answer: `Sao ${name} gợi về ${profile.role}. Ý nghĩa cụ thể còn phụ thuộc cung tọa thủ, tam phương tứ chính, chính tinh đồng cung, phụ tinh, Tứ Hóa và bối cảnh của người xem.`,
    },
    {
      question: `Có thể kết luận tốt xấu chỉ từ sao ${name} không?`,
      answer: `Không. Một sao riêng lẻ không đủ để kết luận. Cần đọc toàn cục lá số và dùng nội dung như tham khảo, không phải lời tiên đoán.`,
    },
    {
      question: `Sao ${name} ở Mệnh Cung nói gì về tính cách?`,
      answer: `Ở Mệnh Cung, sao ${name} thường làm nổi bật xu hướng ${profile.temperament}. Nhưng tính cách còn chịu tác động từ Thân Cung, cung Thiên Di, môi trường sống và lựa chọn cá nhân.`,
    },
    {
      question: `Sao ${name} liên quan gì đến công việc?`,
      answer: `Ở Quan Lộc, sao ${name} thường gợi hướng ${profile.quanCue}. Đây là xu hướng tham khảo để tự quan sát, không phải lời chỉ định nghề nghiệp bắt buộc.`,
    },
    {
      question: `Muốn đọc sao ${name} chính xác hơn cần gì?`,
      answer: `Cần lập lá số theo ngày giờ sinh để biết Mệnh Cung, Thân Cung, Cục, vị trí sao trong 12 cung và các sao hội chiếu. Bài viết này chỉ là nền tảng khái niệm.`,
    },
  ]

  return {
    name,
    slug: profile.slug,
    h1: `Sao ${name} Trong Tử Vi — Ý Nghĩa, Cung Vị Và Cách Đọc`,
    title: `Sao ${name} trong Tử Vi: ý nghĩa và cách đọc`,
    description: `Ý nghĩa sao ${name} trong lá số Tử Vi: Mệnh Cung, Quan Lộc, Tài Bạch, tổ hợp sao và cách đọc tham khảo theo Tam Hợp Phái.`,
    urlPath: `/sao/${profile.slug}/`,
    methodNote: METHOD_NOTE,
    intro,
    summaryRows,
    sections,
    faqs,
    internalLinks: starLinks(profile.slug),
    disclaimer: STAR_DISCLAIMER,
  }
}

function buildLegacyStarPage(content: StarContent): StarFoundationPage {
  return {
    name: content.name,
    slug: content.slug,
    h1: `Sao ${content.name} Trong Tử Vi — Ý Nghĩa Và Cách Đọc`,
    title: `Sao ${content.name} trong Tử Vi`,
    description: `Tìm hiểu ý nghĩa sao ${content.name} trong lá số Tử Vi theo hướng tham khảo, không kết luận chỉ từ một sao riêng lẻ.`,
    urlPath: `/sao/${content.slug}/`,
    methodNote: METHOD_NOTE,
    intro: [
      `Sao ${content.name} là một mục từ trong thư viện sao Tử Vi của Bói Toán. Trang này tóm lược ý nghĩa cơ bản, vị trí và cách đọc tham khảo để người mới có nền tảng trước khi xem lá số cá nhân.`,
      METHOD_NOTE,
    ],
    summaryRows: [
      { aspect: 'Tổng quan', meaning: content.overview, readingCue: 'Đọc cùng cung và tam phương tứ chính.' },
      { aspect: 'Vị trí', meaning: content.position, readingCue: 'Không kết luận khi chưa có ngày giờ sinh.' },
      { aspect: 'Lưu ý', meaning: 'Một sao chỉ là một phần của lá số.', readingCue: 'Cần xem chính tinh, phụ tinh, Tứ Hóa và vòng vận.' },
    ],
    sections: [
      { heading: 'Tổng quan', content: [content.overview] },
      { heading: 'Vị trí trong lá số', content: [content.position] },
      { heading: 'Tính cách thường gặp', content: [content.characteristics] },
      { heading: 'Ảnh hưởng theo từng cung', content: content.influence.split('\n\n') },
      { heading: 'Tổ hợp với các sao khác', content: content.combinations.split('\n\n') },
      { heading: 'Lời khuyên thực tế', content: [content.advice] },
      {
        heading: `Cách đọc sao ${content.name} cho đúng`,
        content: [
          `Không nên tách riêng sao ${content.name} rồi kết luận tốt xấu. Cần đọc cùng cung tọa thủ, tam phương tứ chính, chính tinh, phụ tinh, Tứ Hóa và câu hỏi thực tế của người xem.`,
          'Nội dung này chỉ là nền tảng tham khảo. Khi cần đọc cá nhân hóa, hãy lập lá số theo ngày giờ sinh để xác định Mệnh Cung, Thân Cung và toàn bộ vị trí sao.',
        ],
      },
    ],
    faqs: [
      {
        question: `Sao ${content.name} trong Tử Vi có ý nghĩa gì?`,
        answer: content.overview,
      },
      {
        question: `Có nên kết luận vận hạn chỉ từ sao ${content.name} không?`,
        answer: 'Không nên. Một sao chỉ là một phần của lá số. Cần xem cung, tam phương tứ chính, chính tinh, phụ tinh và đại vận. Nội dung này chỉ nên dùng để tham khảo.',
      },
    ],
    internalLinks: [
      { href: '/tu-vi/', label: 'Tử Vi 2026 - Xem Lá Số Tử Vi Online', relation: 'Hub Tử Vi' },
      { href: '/lap-la-so/', label: 'Tìm hiểu cách lập lá số Tử Vi', relation: 'Cá nhân hóa theo ngày giờ sinh' },
    ],
    disclaimer: STAR_DISCLAIMER,
  }
}

export function getStarFoundationPage(slug: string): StarFoundationPage | null {
  if ((PRIORITY_STAR_SLUGS as readonly string[]).includes(slug)) {
    return buildRichStarPage(STAR_PROFILES[slug as PriorityStarSlug])
  }

  const legacy = STAR_CONTENT[slug]
  return legacy ? buildLegacyStarPage(legacy) : null
}
