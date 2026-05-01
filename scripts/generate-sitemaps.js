const fs = require('fs')
const path = require('path')

const base = 'https://boitoan.vn'
const lastmod = '2026-05-01'

const ANIMALS = [
  'ty', 'suu', 'dan', 'mao', 'thin', 'ty-j',
  'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi',
]

const GENDERS = ['nam', 'nu']

const YEARS = [1984, 1996, 2008, 2020]

const FORECAST_SLUGS = []
for (const animal of ANIMALS) {
  for (const year of YEARS) {
    for (const gender of GENDERS) {
      FORECAST_SLUGS.push(`tuoi-${animal}-${year}-${gender}`)
    }
  }
}

const QUE_SLUGS = [
  '1-kien-vi-thien', '2-khon-vi-dia', '3-ton-vi-loi',
  '4-mong-vi-thuy', '5-tung-vi-thuy', '6-tung-vi-thien',
]

function buildSitemap(urls) {
  const urlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

function buildSitemapIndex(sitemaps) {
  const entries = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`
}

const tuviUrls = FORECAST_SLUGS.map((slug) => ({
  loc: `${base}/tuvi/${slug}`,
  lastmod,
  changefreq: 'yearly',
  priority: '0.8',
}))

const gieoqueUrls = QUE_SLUGS.map((slug) => ({
  loc: `${base}/que/${slug}`,
  lastmod,
  changefreq: 'monthly',
  priority: '0.7',
}))

const toolsUrls = [
  {
    loc: `${base}/lap-la-so`,
    lastmod,
    changefreq: 'weekly',
    priority: '0.9',
  },
]

const publicDir = path.join(__dirname, '..', 'public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

fs.writeFileSync(path.join(publicDir, 'tuvi.xml'), buildSitemap(tuviUrls))
fs.writeFileSync(path.join(publicDir, 'gieoque.xml'), buildSitemap(gieoqueUrls))
fs.writeFileSync(path.join(publicDir, 'tools.xml'), buildSitemap(toolsUrls))

fs.writeFileSync(
  path.join(publicDir, 'sitemap-index.xml'),
  buildSitemapIndex([
    { loc: `${base}/sitemap.xml`, lastmod },
    { loc: `${base}/tuvi.xml`, lastmod },
    { loc: `${base}/gieoque.xml`, lastmod },
    { loc: `${base}/tools.xml`, lastmod },
  ])
)

console.log('Segmented sitemaps generated in public/')
