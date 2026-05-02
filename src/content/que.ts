/** Real Kinh Dịch quẻ content for /que/* SEO pages. */

export interface QueContent {
  name: string
  slug: string
  meaning: string
  judgment: string
  application: string
  advice: string
  changingLines: string
}

export const QUE_CONTENT: Record<string, QueContent> = {
  '1-kien-vi-thien': {
    name: 'Kiển Vi Thiên',
    slug: '1-kien-vi-thien',
    meaning: `Quẻ Kiển (乾) là quẻ thuần Dương, biểu tượng cho Trời. Đây là quẻ đầu tiên trong Kinh Dịch, đại diện cho sự sáng tạo, năng lượng tích cực và sự mạnh mẽ. Quẻ Kiển tượng trưng cho nguyên khí ban đầu của vũ trụ, là nguồn gốc của mọi sự sống và vận động.`,
    judgment: `Quẻ Kiển cho thấy thời điểm thuận lợi để hành động. Mọi việc đều có thể thành công nếu bạn có ý chí kiên định và hành động đúng đắn. Đây là quẻ của sự khởi đầu tốt đẹp, của năng lượng dồi dào và sự tự tin. Tuy nhiên, cũng cần cẩn thận vì sức mạnh quá lớn có thể dẫn đến kiêu ngạo.`,
    application: `Trong công việc: Đây là thời điểm tốt để khởi nghiệp, bắt đầu dự án mới hoặc thăng tiến trong sự nghiệp.\n\nTrong tình cảm: Nên chủ động thể hiện tình cảm, nhưng cũng cần tôn trọng đối phương.\n\nTrong tài chính: Có thể đầu tư mạo hiểm nhưng cần có kế hoạch rõ ràng.\n\nTrong sức khỏe: Năng lượng dồi dào, nhưng cần chú ý không làm việc quá sức.`,
    advice: `Hãy tận dụng năng lượng tích cực của quẻ Kiển để hành động. Nhưng nhớ rằng sức mạnh thật sự đến từ sự khiêm tốn và biết lắng nghe. Đừng để thành công làm bạn kiêu ngạo.`,
    changingLines: `Hào Sơ Cửu: Long ẩn tại điền, bất khả dụng. (Rồng ẩn trong ruộng, chưa nên dùng) - Chưa phải thời điểm hành động.\n\nHào Cửu Nhị: Long hiện tại điền, lợi kiến đại nhân. (Rồng xuất hiện trên ruộng, nên gặp người lớn) - Bắt đầu có cơ hội.\n\nHào Cửu Tam: Quân tử chung nhật càn càn, tịch dịch nhược, lệ, vô cữu. (Quân tử ngày đêm siêng năng, lo lắng nhưng không có lỗi) - Cần siêng năng và cẩn thận.\n\nHào Cửu Tứ: Hoặc dược tại uyên, vô cữu. (Có thể nhảy vào vực sâu, không có lỗi) - Có thể mạo hiểm.\n\nHào Cửu Ngũ: Long phi tại thiên, lợi kiến đại nhân. (Rồng bay trên trời, nên gặp người lớn) - Thời điểm đỉnh cao.\n\nHào Thượng Cửu: Khang long, hữu họ. (Rồng bay quá cao, có điều hối tiếc) - Không nên quá tự mãn.`
  },
  '2-khon-vi-dia': {
    name: 'Khôn Vi Địa',
    slug: '2-khon-vi-dia',
    meaning: `Quẻ Khôn (坤) là quẻ thuần Âm, biểu tượng cho Đất. Đây là quẻ thứ hai trong Kinh Dịch, đại diện cho sự nhu thuận, bao dung và khả năng chịu đựng. Quẻ Khôn tượng trưng cho sự nuôi dưỡng, đỡ đần và hỗ trợ.`,
    judgment: `Quẻ Khôn cho thấy thời điểm nên thuận theo tự nhiên, không nên cưỡng cầu. Mọi việc sẽ thành công nếu bạn biết nhu thuận, kiên nhẫn và chờ đợi thời cơ. Đây là quẻ của sự khiêm tốn, của lòng bao dung và sự nhẫn nại.`,
    application: `Trong công việc: Nên hỗ trợ người khác, làm việc nhóm tốt hơn là làm một mình.\n\nTrong tình cảm: Nên thể hiện sự quan tâm, chăm sóc đối phương.\n\nTrong tài chính: Nên tiết kiệm, tích lũy hơn là đầu tư mạo hiểm.\n\nTrong sức khỏe: Cần nghỉ ngơi, bồi bổ, không nên làm việc quá sức.`,
    advice: `Hãy học cách nhu thuận và bao dung như đất. Sức mạnh thật sự đôi khi đến từ sự kiên nhẫn và khả năng chịu đựng, không phải từ sự cưỡng cầu.`,
    changingLines: `Hào Sơ Lục: Tức sương, toanh băng chí. (Dẫm lên sương, băng giá đến) - Bắt đầu có dấu hiệu khó khăn.\n\nHào Lục Nhị: Trực, phương, đại, bất tập, vô bất lợi. (Thẳng, vuông, lớn, không học cũng không hại) - Giữ bản chất tốt đẹp.\n\nHào Lục Tam: Hàm chương, khả trinh. Hoặc tòng vương sự, vô thành hữu chung. (Có tài đức, có thể giữ vững. Hoặc theo việc vua, không thành có kết quả) - Cần kiên trì.\n\nHào Lục Tứ: Quát, nang, vô cữu, vô dự. (Đóng kín túi, không có lỗi, không được khen) - Nên giữ im lặng.\n\nHào Lục Ngũ: Hoàng thường, nguyên, cát. (Áo vàng, rất tốt) - Sắp có may mắn lớn.\n\nHào Thượng Lục: Long chiến vu dã, kỳ huyết huyền hoàng. (Rồng chiến ở đồng, máu đen vàng) - Có thể có xung đột lớn.`
  },
  '3-ton-vi-loi': {
    name: 'Trùn Vi Lôi',
    slug: '3-ton-vi-loi',
    meaning: `Quẻ Trùn (屯) là quẻ khó khăn ban đầu, biểu tượng cho sự khởi đầu đầy thử thách. Đây là quẻ của những người mới bắt đầu, đang đối mặt với nhiều khó khăn nhưng có tiềm năng phát triển.`,
    judgment: `Quẻ Trùn cho thấy thời điểm khó khăn ban đầu, nhưng không nên bỏ cuộc. Mọi sự khởi đầu đều khó khăn, nhưng nếu kiên trì và có chiến lược đúng đắn, sẽ vượt qua được. Đây là quẻ của sự kiên nhẫn và sự chuẩn bị kỹ lưỡng.`,
    application: `Trong công việc: Khởi nghiệp gặp khó khăn, cần kiên trì và chuẩn bị kỹ.\n\nTrong tình cảm: Mối quan hệ mới cần thời gian để phát triển, không nên vội vàng.\n\nTrong tài chính: Đầu tư ban đầu có thể gặp khó khăn, cần kiên nhẫn.\n\nTrong sức khỏe: Cần chú ý sức khỏe, không nên làm việc quá sức.`,
    advice: `Đừng nản lòng trước khó khăn ban đầu. Mọi sự khởi đầu đều khó khăn. Hãy kiên trì, chuẩn bị kỹ lưỡng và chờ đợi thời cơ chín muồi.`,
    changingLines: `Hào Sửu Cửu: Bàn hoàn, lợi kiện, lợi kiến hầu. (Vướng víu, nên kiên trì, nên gặp chư hầu) - Cần kiên nhẫn.\n\nHào Lục Nhị: Trùn như đàn như, mãn như, thừa mã ban như. (Khó khăn như xe, ngựa quay lại) - Gặp trở ngại.\n\nHào Lục Tam: Lữc tử bôi vô chính, dĩ hạu khắc đại. (Săn hươu không có chủ dẫn, nên đợi) - Chưa nên hành động.\n\nHào Lục Tứ: Trùn kỳ cao, khứ tức, lai tức. (Xe ngựa đi rồi lại về) - Có thể quay lại.\n\nHào Cửu Ngũ: Trùn kỳ cao, nguyên hênh, trinh, đại lợi. (Xe ngựa, nguyên hênh, tốt, rất lợi) - Sắp thành công.\n\nHào Thượng Lục: Trùn kỳ cao, huyết liên như, khả phúc như. (Xe ngựa máu, nhưng có thể phúc) - Có khó khăn nhưng sẽ vượt qua.`
  },
  '4-mong-vi-thuy': {
    name: 'Mông Vi Thủy',
    slug: '4-mong-vi-thuy',
    meaning: `Quẻ Mông (蒙) là quẻ mông muội, biểu tượng cho sự non nớt và cần học hỏi. Đây là quẻ của những người đang trong giai đoạn đầu của sự học tập, cần được dẫn dắt và chỉ bảo.`,
    judgment: `Quẻ Mông cho thấy bạn đang trong giai đoạn học hỏi, cần tìm kiếm sự hướng dẫn từ người có kinh nghiệm. Đây là thời điểm tốt để học tập, nghiên cứu và xây dựng nền tảng kiến thức. Đừng ngại hỏi, đừng sợ sai.`,
    application: `Trong công việc: Nên học hỏi từ đồng nghiệp cấp trên, không nên tự làm theo ý mình.\n\nTrong tình cảm: Cần học cách yêu thương và chia sẻ, đừng quá non nớt.\n\nTrong tài chính: Nên học hỏi về quản lý tài chính trước khi đầu tư.\n\nTrong sức khỏe: Cần học cách chăm sóc bản thân, xây dựng thói quen tốt.`,
    advice: `Hãy khiêm tốn học hỏi. Tìm kiếm người thầy hoặc người có kinh nghiệm để hướng dẫn. Đừng ngại thừa nhận sự non nớt của mình, vì đó là bước đầu của sự trưởng thành.`,
    changingLines: `Hào Sơ Lục: Phát mông, lợi dụng hình nhân, dụng thuyết cổ trời, vãng linh. (Khai mông, nên dùng hình nhân, dùng lời nói, đi) - Cần giáo dục.\n\nHào Cửu Nhị: Bao mông, cát. Nạp phụ, cát. Tử khắc gia. (Bao bọc mông, tốt. Nạp phụ, tốt. Con cái khắc gia) - Cần che chở.\n\nHào Lục Tam: Vô dục, diệu nữ kiến kim phu, bất tự li. (Không nên cưới gái, thấy chồng, không tự lợi) - Không nên vội vàng.\n\nHào Lục Tứ: Khốn mông, lệnh. (Mông khốn, xấu hổ) - Cần cố gắng hơn.\n\nHào Lục Ngũ: Đồng mông, cát. (Mông đồng, tốt) - Học tập cùng nhau tốt.\n\nHào Thượng Cửu: Kích mông, bất lợi vi khắc, lợi ngự khắc. (Đánh mông, không lợi làm kẻ thù, lợi làm kẻ cướp) - Cần cách giáo dục phù hợp.`
  },
  '5-tung-vi-thuy': {
    name: 'Tống Vi Thủy',
    slug: '5-tung-vi-thuy',
    meaning: `Quẻ Tống (讼) là quẻ tranh tụng, biểu tượng cho sự tranh cãi và kiện tụng. Đây là quẻ của những xung đột, bất đồng và sự cần thiết phải giải quyết thông qua luật pháp hoặc trọng tài.`,
    judgment: `Quẻ Tống cho thấy có sự tranh chấp, bất đồng đang diễn ra. Đây không phải là thời điểm tốt để hành động một cách độc lập. Nên tìm cách hòa giải, tránh đưa ra tòa án nếu có thể. Nếu buộc phải tranh tụng, cần chuẩn bị kỹ lưỡng và có bằng chứng rõ ràng.`,
    application: `Trong công việc: Có thể có tranh chấp với đồng nghiệp hoặc đối tác, cần hòa giải.\n\nTrong tình cảm: Có thể có bất đồng, cần giao tiếp cởi mở.\n\nTrong tài chính: Có thể có tranh chấp về tiền bạc, cần giữ chứng từ.\n\nTrong sức khỏe: Căng thẳng có thể ảnh hưởng đến sức khỏe, cần thư giãn.`,
    advice: `Tránh tranh cãi nếu có thể. Hòa giải luôn tốt hơn kiện tụng. Nếu buộc phải tranh tụng, hãy chuẩn bị kỹ lưỡng và giữ bình tĩnh.`,
    changingLines: `Hào Sơ Lục: Bất vĩnh sở sự, tiểu hữu ngôn, chung cát. (Không làm việc lâu, có chút nói, cuối tốt) - Tranh cãi nhỏ.\n\nHào Cửu Nhị: Bất khắc tụng, quy nhi bốn, kỳ ấp nhân tam bách hộ, vô xuyến. (Không thắng kiện, về thành, ấp 300 hộ, không sao) - Nên rút lui.\n\nHào Lục Tam: Ẩm cực chi đức, hoặc tòng vương sự, vô thành. (Ăn cũ, theo việc vua, không thành) - Không nên tranh.\n\nHào Cửu Tứ: Bất khắc tụng, phục tức mệnh, an trinh, cát. (Không thắng kiện, theo mệnh, yên, tốt) - Nên chấp nhận.\n\nHào Cửu Ngũ: Tống, nguyên cát. (Kiện, rất tốt) - Có thể thắng kiện.\n\nHào Thượng Cửu: Hoặc tích chi bì dai, chung triêu tam thực chi. (Hoặc được da, cuối cùng ba lần bị bắt) - Có thể thắng nhưng không vui.`
  },
  '6-tung-vi-thien': {
    name: 'Tống Vi Thiên',
    slug: '6-tung-vi-thien',
    meaning: `Quẻ Tống Vi Thiên (Thiên Thủy Tống) là quẻ tranh tụng có sự can thiệp của bề trên. Biểu tượng cho sự tranh chấp cần được giải quyết thông qua thẩm quyền cao hơn hoặc luật pháp.`,
    judgment: `Quẻ này cho thấy tranh chấp đã leo thang đến mức cần sự can thiệp. Đây là lúc cần tìm đến công lý, luật pháp hoặc người có thẩm quyền để phân xử. Tuy nhiên, cũng cần cân nhắc xem việc tranh tụng có đáng hay không.`,
    application: `Trong công việc: Có thể cần đưa ra tòa án hoặc trọng tài để giải quyết tranh chấp.\n\nTrong tình cảm: Có thể cần sự can thiệp của gia đình hoặc bạn bè để hòa giải.\n\nTrong tài chính: Cần giữ chứng từ, hợp đồng rõ ràng để bảo vệ quyền lợi.`,
    advice: `Đôi khi cần đấu tranh cho công lý. Nhưng cũng cần cân nhắc xem chi phí (thời gian, tiền bạc, cảm xúc) có đáng hay không. Hãy chọn trận chiến đáng đấu.`,
    changingLines: `Các hào biến cho thấy các mức độ khác nhau của tranh tụng, từ tranh chấp nhỏ đến kiện tụng lớn. Mỗi hào đều khuyên nên cân nhắc kỹ trước khi hành động.`
  }
}
