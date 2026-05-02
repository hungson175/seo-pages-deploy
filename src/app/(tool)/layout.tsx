export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-rule bg-ivory/90">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-2xl font-semibold text-navy">
            Bói Toán
          </a>
          <nav className="flex gap-4 text-sm text-ink-soft">
            <a href="/" className="hover:text-vermillion transition-colors">
              Trang chủ
            </a>
            <a href="/tu-vi/" className="hover:text-vermillion transition-colors">
              Tử vi
            </a>
            <a href="/que" className="hover:text-vermillion transition-colors">
              Quẻ
            </a>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}
