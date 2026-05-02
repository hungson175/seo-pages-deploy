export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-navy-800 bg-navy-950">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gold-400">
            Bói Toán
          </a>
          <nav className="flex gap-4 text-sm text-navy-300">
            <a href="/" className="hover:text-gold-300 transition-colors">
              Trang chủ
            </a>
            <a href="/tu-vi/" className="hover:text-gold-300 transition-colors">
              Tử vi
            </a>
            <a href="/que" className="hover:text-gold-300 transition-colors">
              Quẻ
            </a>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}
