/** Reviewed Kinh Dịch quẻ content for /que/* SEO pages. */

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
    name: 'Càn Vi Thiên',
    slug: '1-kien-vi-thien',
    meaning: `Quẻ Càn (乾) là tượng Trời, biểu thị sức khởi phát, sự chủ động và ý chí tiến lên. Khi đọc theo tinh thần Kinh Dịch, Càn không phải lời hứa rằng mọi việc sẽ như ý, mà là lời nhắc về cách dùng sức mạnh đúng lúc, đúng mức và có trách nhiệm.`,
    judgment: `Tinh thần chính của quẻ Càn là tiến nhưng không kiêu. Người hỏi có thể đang ở giai đoạn cần đứng ra dẫn dắt, mở đầu một việc mới hoặc tự chịu trách nhiệm nhiều hơn. Điểm cần giữ là kỷ luật, sự khiêm nhường và khả năng lắng nghe người có kinh nghiệm trước khi quyết định.`,
    application: `Trong công việc: phù hợp để sắp xếp lại mục tiêu, nhận vai trò rõ hơn hoặc bắt đầu một dự án đã chuẩn bị kỹ.\n\nTrong quan hệ: nên chủ động đối thoại, nhưng không biến sự chủ động thành áp đặt.\n\nTrong quản trị nguồn lực: ưu tiên kế hoạch có mốc kiểm tra, tránh dùng cảm hứng nhất thời làm thay dữ liệu.\n\nTrong nhịp sống: sức tiến cần đi cùng nghỉ ngơi, nếu không dễ chuyển thành căng thẳng kéo dài.`,
    advice: `Hãy dùng tinh thần Càn để hành động có trật tự. Việc nào đã đủ dữ kiện thì tiến; việc nào còn mơ hồ thì hỏi thêm, thử nhỏ và ghi lại kết quả. Sức mạnh bền nhất là sức mạnh biết tự kiểm soát.`,
    changingLines: `Sơ Cửu nhắc về giai đoạn còn ẩn: chưa cần phô trương, nên chuẩn bị nền.\n\nCửu Nhị nhắc về lúc năng lực bắt đầu hiện ra: nên gặp người đáng tin để nhận phản biện.\n\nCửu Tam nhấn mạnh sự chuyên cần: có áp lực nhưng không nên bỏ nhịp.\n\nCửu Tứ nói về bước thử: có thể tiến, nhưng cần biên an toàn.\n\nCửu Ngũ là vị trí sáng nhất: càng ở cao càng cần khiêm.\n\nThượng Cửu cảnh báo quá đà: nếu đi quá xa khỏi thực tế, kết quả dễ sinh hối tiếc.`
  },
  '2-khon-vi-dia': {
    name: 'Khôn Vi Địa',
    slug: '2-khon-vi-dia',
    meaning: `Quẻ Khôn (坤) là tượng Đất, biểu thị sự nâng đỡ, bao dung và khả năng làm nền. Nếu Càn là lực mở đường, Khôn là năng lực tiếp nhận, nuôi dưỡng và giữ cho mọi việc có chỗ đứng vững.`,
    judgment: `Tinh thần chính của quẻ Khôn là thuận nhưng không yếu. Người hỏi nên quan sát bối cảnh, phối hợp với người khác và đi theo nhịp bền thay vì cưỡng ép kết quả. Quẻ này hợp với việc củng cố nền tảng, sửa quy trình và chăm lại các cam kết đang có.`,
    application: `Trong công việc: nên hỗ trợ nhóm, ghi rõ phần việc và tránh ôm quá nhiều vai trò âm thầm.\n\nTrong quan hệ: sự mềm mại có giá trị, nhưng vẫn cần ranh giới và tiếng nói rõ.\n\nTrong quản trị nguồn lực: ưu tiên tích lũy đều, giảm việc phát sinh và giữ khoảng dự phòng cho giai đoạn dài.\n\nTrong nhịp sống: chú ý sự đều đặn; việc nhỏ lặp lại đúng cách sẽ tạo nền tốt hơn hành động bốc đồng.`,
    advice: `Hãy học cách làm nền mà không tự xóa mình. Khôn nhắc rằng sự bền bỉ, kiên nhẫn và khả năng nâng đỡ là sức mạnh thật, miễn là bạn không biến bao dung thành chịu đựng vô hạn.`,
    changingLines: `Sơ Lục nhắc rằng dấu hiệu nhỏ có thể báo trước xu hướng lớn: nên xử lý sớm.\n\nLục Nhị nói về sự thẳng, vuông, lớn: giữ nguyên tắc cơ bản.\n\nLục Tam khuyên làm việc có đầu có cuối, không tranh công.\n\nLục Tứ nhắc biết giữ lời và giữ khoảng cách khi cần.\n\nLục Ngũ là hình ảnh trung hòa: khiêm tốn nhưng có phẩm chất.\n\nThượng Lục cảnh báo khi nhu thuận bị dồn nén quá lâu, xung đột có thể bộc phát.`
  },
  '3-ton-vi-loi': {
    name: 'Truân Vi Lôi',
    slug: '3-ton-vi-loi',
    meaning: `Quẻ Truân (屯) nói về khó khăn ban đầu: mầm cây mới nhú, lực sống đã có nhưng đường đi còn rối. Đây là quẻ rất hợp để đọc khi một việc vừa bắt đầu, dữ kiện chưa đủ và tâm lý dễ nôn nóng.`,
    judgment: `Tinh thần chính của quẻ Truân là khởi đầu cần trật tự. Không nên bỏ cuộc chỉ vì bước đầu vướng, nhưng cũng không nên lao nhanh khi chưa có người hỗ trợ, kế hoạch thử nhỏ và cách đo tiến triển.`,
    application: `Trong công việc: nên chia việc lớn thành giai đoạn nhỏ, xác định người phụ trách và điểm kiểm tra.\n\nTrong quan hệ: mối liên hệ mới cần thời gian, đừng ép người khác phải hiểu mình ngay.\n\nTrong quản trị nguồn lực: ưu tiên an toàn, ghi chép rõ và tránh dàn trải quá nhiều hướng cùng lúc.\n\nTrong nhịp sống: giữ lịch sinh hoạt ổn định để tâm trí không bị cuốn theo cảm giác rối ban đầu.`,
    advice: `Truân không khuyên dừng lại; quẻ khuyên đi chậm và có người đồng hành. Hãy chọn một việc cốt lõi, làm rõ bước tiếp theo, rồi kiểm tra sau một chu kỳ ngắn thay vì cố giải mọi thứ trong một lần.`,
    changingLines: `Sơ Cửu nhắc về sự vướng ban đầu: nên kiên trì và tìm người chỉ dẫn.\n\nLục Nhị mô tả trạng thái quanh co: chưa cần kết luận vội.\n\nLục Tam cảnh báo đi vào chỗ lạ mà không có người dẫn.\n\nLục Tứ nói về việc quay lại điều chỉnh là bình thường.\n\nCửu Ngũ nhắc rằng khi trục chính rõ, tiến triển sẽ ổn hơn.\n\nThượng Lục cho thấy nếu để rối quá lâu, tâm lý dễ mệt; cần giảm tải và sắp xếp lại.`
  },
  '4-mong-vi-thuy': {
    name: 'Mông Vi Thủy',
    slug: '4-mong-vi-thuy',
    meaning: `Quẻ Mông (蒙) nói về giai đoạn chưa sáng: người hỏi có thể thiếu thông tin, thiếu kinh nghiệm hoặc đang nhìn vấn đề bằng cảm xúc nhiều hơn cấu trúc. Mông không phải lời chê, mà là lời nhắc cần học đúng cách.`,
    judgment: `Tinh thần chính của quẻ Mông là khiêm tốn học hỏi. Việc quan trọng lúc này không phải chứng minh mình đúng, mà là đặt câu hỏi đúng, tìm người có kinh nghiệm và xây nền hiểu biết trước khi đi sâu.`,
    application: `Trong công việc: nên học quy trình, hỏi lại tiêu chuẩn và tránh tự xử lý việc vượt quá hiểu biết hiện tại.\n\nTrong quan hệ: cần nói rõ điều mình chưa hiểu, đừng đoán ý rồi tự buồn.\n\nTrong quản trị nguồn lực: trước khi cam kết lớn, hãy đọc kỹ điều kiện, hỏi lại người hiểu việc và giữ phương án dự phòng.\n\nTrong nhịp sống: nên xây thói quen nhỏ, đều, dễ giữ; không cần thay đổi toàn bộ một lúc.`,
    advice: `Hãy xem sự chưa biết là điểm khởi đầu, không phải lỗi. Mông khuyên bạn tìm thầy, tìm tài liệu tốt, hỏi lại cho rõ và kiên nhẫn với quá trình trưởng thành của chính mình.`,
    changingLines: `Sơ Lục nhắc mở đầu bằng kỷ luật học tập.\n\nCửu Nhị nói về sự bao dung với người mới học.\n\nLục Tam cảnh báo bị hấp dẫn bởi điều bên ngoài mà quên nền tảng.\n\nLục Tứ cho thấy càng đóng kín càng dễ lúng túng.\n\nLục Ngũ là sự trong sáng của người biết học.\n\nThượng Cửu nhắc rằng sửa sai cần đúng cách, không dùng áp lực để thay cho hiểu biết.`
  },
  '5-tung-vi-thuy': {
    name: 'Tụng Vi Thủy',
    slug: '5-tung-vi-thuy',
    meaning: `Quẻ Tụng (讼) nói về bất đồng, tranh luận và cảm giác mỗi bên đều có lý. Trong ứng dụng hiện đại, quẻ này nên được đọc như lời nhắc về quản trị xung đột: làm rõ dữ kiện, giữ lời nói có chứng cứ và ưu tiên hòa giải khi còn có thể.`,
    judgment: `Tinh thần chính của quẻ Tụng là không thắng bằng nóng giận. Nếu đang có mâu thuẫn, người hỏi cần tách cảm xúc khỏi dữ kiện, ghi lại thỏa thuận, hỏi người trung lập khi cần và tránh đẩy sự việc lên mức không thể quay lại.`,
    application: `Trong công việc: nên làm rõ phạm vi trách nhiệm, lịch trao đổi và tiêu chí hoàn thành.\n\nTrong quan hệ: bất đồng cần được nói thẳng nhưng mềm, không dùng im lặng hoặc công kích để giành phần hơn.\n\nTrong quản trị nguồn lực: mọi cam kết nên có ghi chép rõ để giảm hiểu lầm về sau.\n\nTrong nhịp sống: căng thẳng kéo dài dễ làm quyết định kém sáng; nên tạm dừng trước khi phản hồi việc nhạy cảm.`,
    advice: `Tụng khuyên giảm nhu cầu thắng đúng lúc. Trước khi tranh luận, hãy hỏi: điều mình cần bảo vệ là nguyên tắc, cảm xúc hay sĩ diện? Nếu mục tiêu là giữ việc và giữ người, hòa giải có cấu trúc thường tốt hơn đối đầu kéo dài.`,
    changingLines: `Sơ Lục nhắc tranh luận nhỏ nên kết thúc sớm.\n\nCửu Nhị khuyên biết lùi để giữ tổng thể.\n\nLục Tam nói về việc dựa vào nền cũ và giữ điều đúng.\n\nCửu Tứ nhắc quay lại nguyên tắc, đừng để lời nói vượt quá sự việc.\n\nCửu Ngũ là khi có người công tâm giúp nhìn lại vấn đề.\n\nThượng Cửu cảnh báo thắng phần lời nhưng mất sự yên ổn thì không đáng.`
  },
  '6-tung-vi-thien': {
    name: 'Thiên Thủy Tụng',
    slug: '6-tung-vi-thien',
    meaning: `Thiên Thủy Tụng vẫn thuộc tinh thần bất đồng, nhưng mức độ đã rõ hơn: bên trên có lực cứng, bên dưới có dòng nước khó nắm. Quẻ này thường nhắc người hỏi về sự lệch nhịp giữa nguyên tắc, cảm xúc và cách truyền đạt.`,
    judgment: `Tinh thần chính của quẻ là cần người công tâm, quy trình rõ và giới hạn trao đổi. Khi mâu thuẫn đã tích tụ, tự nói thêm chưa chắc giúp tốt hơn; điều cần là khung đối thoại, dữ kiện chung và một điểm dừng để tránh hao tổn.`,
    application: `Trong công việc: nên đưa vấn đề về văn bản ngắn, rõ việc, rõ thời hạn, rõ phần chịu trách nhiệm.\n\nTrong quan hệ: cần tránh lôi chuyện cũ vào chuyện mới; hãy thống nhất một chủ đề mỗi lần nói.\n\nTrong quản trị nguồn lực: khi nhiều bên cùng liên quan, cần minh bạch kỳ vọng và giới hạn ngay từ đầu.\n\nTrong nhịp sống: nếu tâm trí đã căng, hãy nghỉ một nhịp trước khi gửi thông điệp quan trọng.`,
    advice: `Quẻ này không khuyến khích đối đầu bằng mọi giá. Nó khuyên người hỏi giữ phẩm chất trong lúc bất đồng: nói đúng phần mình biết, thừa nhận phần chưa rõ, và chọn cách giải quyết giúp tương lai bớt lặp lại lỗi cũ.`,
    changingLines: `Các hào của Tụng nhắc rằng bất đồng có nhiều tầng: có việc chỉ cần nói lại, có việc cần lùi, có việc cần người công tâm giúp soi. Điểm chung là không để nhu cầu hơn thua làm mờ mục tiêu ban đầu.`
  }
}
