/**
 * Generate forecast content from iztro data.
 * MVP: deterministic content structure; LLM integration in future sprint.
 */

export interface ContentSection {
  heading: string
  content: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ForecastContent {
  sections: ContentSection[]
  faqs: FAQ[]
}

export function generateForecastContent(iztroData: {
  palaces: Array<{ name: string; stars: Array<{ name: string; brightness: string }> }>
  transformations: Array<{ name: string; palace: string }>
  fiveElements: string
  animal: string
  year: number
  gender: string
}): ForecastContent {
  const { animal, year, gender, fiveElements, palaces, transformations } = iztroData

  const mệnhPalace = palaces.find((p) => p.name === 'Mệnh')
  const primaryStar = mệnhPalace?.stars[0]?.name ?? 'Tử Vi'
  const brightness = mệnhPalace?.stars[0]?.brightness ?? 'bình'

  const sections: ContentSection[] = [
    {
      heading: `Tổng quan năm ${year}`,
      content: `Năm ${year} mang đến nhiều biến động cho tuổi ${animal} ${gender === 'male' ? 'nam' : 'nữ'} mạng. `
        + `Với sao ${primaryStar} độ sáng ${brightness} tại cung Mệnh, `
        + `bạn cần chú ý đến các mối quan hệ xung quanh. `
        + `Năm nay có nhiều cơ hội mới nhưng cũng không ít thách thức cần vượt qua. `
        + `Sao ${primaryStar} cho thấy tiềm năng phát triển trong nhiều lĩnh vực khác nhau. `
        + `Tuy nhiên, độ sáng ${brightness} cũng nhắc nhở bạn cần thận trọng trong quyết định. `
        + `Nội dung chỉ mang tính chất tham khảo, không phải lờii tiên đoán. `
        + `Hãy chủ động nắm bắt cơ hội và luôn giữ tinh thần lạc quan. `
        + `Mọi thay đổi tích cực đều xuất phát từ nỗ lực của bản thân bạn. `
        + `Năm ${year} là thờii điểm thích hợp để bạn xem xét lại các kế hoạch đã đặt ra từ trước. `
        + `Hãy đánh giá thực tế và điều chỉnh cho phù hợp với hoàn cảnh hiện tại. `
        + `Sao ${primaryStar} cùng với các sao khác trong lá số tạo nên một bức tranh tổng thể về vận mệnh. `
        + `Độ sáng ${brightness} của sao này ảnh hưởng đến cách diễn giải các sự kiện trong năm. `
        + `Tham khảo lá số tử vi để có cái nhìn sâu sắc hơn về các khía cạnh cuộc sống. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán tuyệt đối. `
        + `Hãy luôn nhớ rằng tương lai do chính bạn tạo ra qua những lựa chọn hàng ngày.`,
    },
    {
      heading: 'Sự nghiệp & Tài lộc',
      content: `Công việc có nhiều cơ hội mới, nhưng cần cân nhắc kỹ trước khi quyết định. `
        + `Sao ${primaryStar} cho thấy tiềm năng phát triển trong lĩnh vực chuyên môn. `
        + `Tham khảo ý kiến chuyên gia trước các quyết định lớn. `
        + `Năm ${year} thích hợp để mở rộng quan hệ và tìm kiếm đối tác mới. `
        + `Tài chính có dấu hiệu khởi sắc nhưng cần quản lý chi tiêu hợp lý. `
        + `Tránh đầu tư mạo hiểm vào những lĩnh vực chưa có kinh nghiệm. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán tuyệt đối. `
        + `Hãy lên kế hoạch rõ ràng và kiên trì thực hiện theo đúng lộ trình. `
        + `Trong công việc, sự tận tâm và chuyên nghiệp sẽ được ghi nhận và đền đáp xứng đáng. `
        + `Năm ${year} có thể mang đến cơ hội thăng tiến hoặc chuyển đổi công việc phù hợp hơn. `
        + `Tuy nhiên, mọi quyết định nên được cân nhắc kỹ lưỡng và tham khảo ý kiến ngườii có kinh nghiệm. `
        + `Về tài chính, hãy xây dựng quỹ dự phòng và tránh chi tiêu không cần thiết. `
        + `Sao ${primaryStar} độ sáng ${brightness} gợi ý rằng sự ổn định quan trọng hơn những lợi nhuận nhanh chóng. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán. `
        + `Hãy kiên nhẫn và tin tưởng vào khả năng của bản thân trong mọi hoàn cảnh.`,
    },
    {
      heading: 'Tình duyên & Gia đạo',
      content: `Tình cảm có thể gặp sóng gió nhỏ, cần kiên nhẫn và thấu hiểu. `
        + `Gia đạo ổn định nhưng cần quan tâm đến ngườii thân nhiều hơn. `
        + `Đây là tham khảo, không phải tiên đoán tuyệt đối. `
        + `Năm ${year} là thờii điểm tốt để vun đắp các mối quan hệ trong gia đình. `
        + `Hãy dành nhiều thờii gian hơn cho ngườii thân yêu và lắng nghe họ nhiều hơn. `
        + `Sao ${primaryStar} gợi ý rằng sự chân thành sẽ mang lại kết quả tốt đẹp. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán. `
        + `Hãy luôn giữ bình tĩnh và thấu hiểu trong mọi tình huống. `
        + `Trong chuyện tình cảm, sự tin tưởng và tôn trọng lẫn nhau là nền tảng vững chắc. `
        + `Năm ${year} có thể mang đến những gặp gỡ đặc biệt hoặc giúp củng cố mối quan hệ hiện tại. `
        + `Hãy chân thành chia sẻ cảm xúc và lắng nghe đối phương một cách chân thành. `
        + `Gia đạo cần sự quan tâm chăm sóc từ tất cả các thành viên trong gia đình. `
        + `Sao ${primaryStar} độ sáng ${brightness} cho thấy tầm quan trọng của hòa khí trong nhà. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán tuyệt đối. `
        + `Hãy yêu thương và trân trọng những ngườii luôn ở bên bạn trong mọi hoàn cảnh.`,
    },
    {
      heading: 'Sức khỏe',
      content: `Sức khỏe cần được chú ý đặc biệt trong năm ${year}. `
        + `Nên duy trì lối sống lành mạnh và khám sức khỏe định kỳ. `
        + `Thông tin tham khảo, không thay thế tư vấn y tế. `
        + `Sao ${primaryStar} độ sáng ${brightness} nhắc nhở bạn cần chú ý đến sức khỏe tinh thần. `
        + `Hãy dành thờii gian nghỉ ngơi hợp lý và tránh căng thẳng kéo dài. `
        + `Tập thể dục đều đặn và ăn uống đầy đủ chất dinh dưỡng. `
        + `Nội dung chỉ mang tính tham khảo, không thay thế tư vấn y tế chuyên nghiệp. `
        + `Khi có dấu hiệu bất thường, hãy đến cơ sở y tế để được thăm khám kịp thờii. `
        + `Năm ${year} cần chú ý đến các bệnh liên quan đến stress và căng thẳng kéo dài. `
        + `Hãy học cách thư giãn và tìm niềm vui trong những hoạt động yêu thích. `
        + `Chế độ ăn uống cân bằng và đầy đủ chất dinh dưỡng là nền tảng cho sức khỏe tốt. `
        + `Sao ${primaryStar} gợi ý rằng sự cân bằng giữa công việc và nghỉ ngơi là rất quan trọng. `
        + `Hãy ngủ đủ giấc và tránh thức khuya thường xuyên để duy trì sức khỏe. `
        + `Nội dung chỉ mang tính tham khảo, không thay thế tư vấn y tế chuyên nghiệp. `
        + `Tham khảo bác sĩ để có lộ trình chăm sóc sức khỏe phù hợp nhất với bạn.`,
    },
    {
      heading: 'Biến động quan trọng',
      content: `Các biến động ${transformations.map((t) => t.name).join(', ')} `
        + `cho thấy những thay đổi quan trọng trong năm. `
        + `Ngũ Hành ${fiveElements} tương sinh với môi trường xung quanh. `
        + `Tham khảo để chủ động ứng phó. `
        + `Năm ${year} sẽ có nhiều biến động bất ngờ nhưng cũng là cơ hội để thay đổi. `
        + `Hãy chuẩn bị tinh thần sẵn sàng cho mọi tình huống có thể xảy ra. `
        + `Sự linh hoạt trong cách ứng xử sẽ giúp bạn vượt qua mọi thử thách. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán tuyệt đối. `
        + `Hãy luôn giữ tinh thần lạc quan và chủ động trong mọi hoàn cảnh. `
        + `Các biến động này có thể xuất hiện trong nhiều lĩnh vực khác nhau của cuộc sống. `
        + `Hãy quan sát và phân tích kỹ lưỡng trước khi đưa ra quyết định quan trọng. `
        + `Sao ${primaryStar} độ sáng ${brightness} cho thấy cần thận trọng trong các thay đổi lớn. `
        + `Ngũ Hành ${fiveElements} mang đến năng lượng tích cực cho sự phát triển và thay đổi. `
        + `Hãy tận dụng cơ hội để học hỏi và phát triển bản thân trong năm nay. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán. `
        + `Mọi biến động đều là cơ hội để trưởng thành và trở nên mạnh mẽ hơn.`,
    },
    {
      heading: 'Lờii khuyên',
      content: `Hãy giữ tinh thần lạc quan và chủ động trong mọi tình huống. `
        + `Sao ${primaryStar} độ sáng ${brightness} nhắc nhở bạn cần kiên nhẫn. `
        + `Mọi quyết định nên được cân nhắc kỹ lưỡng. `
        + `Nội dung chỉ mang tính chất tham khảo. `
        + `Năm ${year} là thờii điểm để bạn nhìn nhận lại các mục tiêu đã đặt ra. `
        + `Hãy tập trung vào những gì thực sự quan trọng và bỏ qua những điều không cần thiết. `
        + `Sự kiên trì và nỗ lực không ngừng sẽ mang lại kết quả xứng đáng. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán tuyệt đối. `
        + `Hãy luôn tin tưởng vào bản thân và khả năng vượt qua mọi khó khăn. `
        + `Mỗi ngày là một cơ hội mới để bạn trở thành phiên bản tốt hơn của chính mình. `
        + `Sao ${primaryStar} độ sáng ${brightness} là lờii nhắc rằng bạn có nhiều tiềm năng. `
        + `Hãy chia sẻ thờii gian chất lượng với gia đình và bạn bè thân thiết. `
        + `Năm ${year} sẽ trở nên ý nghĩa hơn khi bạn sống với mục đích và đam mê. `
        + `Nội dung chỉ mang tính tham khảo, không phải lờii tiên đoán. `
        + `Hãy luôn nhớ rằng hạnh phúc đến từ những điều giản dị trong cuộc sống hàng ngày.`,
    },
  ]

  const faqs: FAQ[] = [
    {
      question: `Tử vi tuổi ${animal} năm ${year} có tốt không?`,
      answer: `Tử vi chỉ mang tính chất tham khảo. Vận mệnh phụ thuộc vào nhiều yếu tố, trong đó quan trọng nhất là nỗ lực của bản thân.`,
    },
    {
      question: 'Làm sao để xem lá số tử vi chi tiết?',
      answer: `Bạn có thể sử dụng công cụ lập lá số miễn phí tại /lap-la-so để xem chi tiết về các sao trong lá số.`,
    },
    {
      question: `Sao ${primaryStar} độ sáng ${brightness} có ý nghĩa gì?`,
      answer: `Độ sáng ${brightness} của sao ${primaryStar} ảnh hưởng đến cách diễn giải vận mệnh. Tham khảo luận giải đầy đủ để hiểu rõ hơn.`,
    },
  ]

  return { sections, faqs }
}
