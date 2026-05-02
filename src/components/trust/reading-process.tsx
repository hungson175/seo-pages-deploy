/**
 * ReadingProcess — expandable trust component
 * Clean, minimal. Explains how the chart is read.
 * Placed on /lap-la-so/, article footers, paywall page.
 */

export function ReadingProcess() {
  return (
    <details className="bg-navy-800/50 border border-navy-700/50 rounded-lg group">
      <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-navy-200 hover:text-gold-300 transition-colors list-none flex justify-between items-center">
        <span>Cách chúng tôi đọc lá số</span>
        <span className="text-gold-500 group-open:rotate-180 transition-transform text-xs">
          ▼
        </span>
      </summary>
      <div className="px-4 pb-4 text-navy-300 text-sm">
        <ol className="list-decimal list-inside space-y-1.5">
          <li>Dựng lá số theo ngày giờ sinh bằng thuật toán Tử Vi Tam Hợp Phái.</li>
          <li>Hiển thị Mệnh, Thân, Cục, 12 cung và các sao chính/phụ liên quan.</li>
          <li>AI giải thích các yếu tố này bằng tiếng Việt dễ hiểu.</li>
          <li>Kết quả là nội dung tham khảo để bạn tự suy ngẫm và chuẩn bị quyết định tốt hơn.</li>
        </ol>
      </div>
    </details>
  )
}
