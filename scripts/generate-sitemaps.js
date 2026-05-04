const fs = require('fs')
const path = require('path')
const routes = require('../src/content/routes.json')
const seoForecasts = require('../src/content/seo-forecasts.json')
const approvedStarPalaceCombinations = require('../src/content/star-palace-approved.json')

const priorityStarSlugs = [
  'tu-vi',
  'thai-duong',
  'thai-am',
  'thien-co',
  'vu-khuc',
  'thien-luong',
  'thien-phu',
  'cu-mon',
  'thien-dong',
  'liem-trinh',
]

const palaceSlugs = [
  'menh',
  'phu-mau',
  'phuc-duc',
  'dien-trach',
  'quan-loc',
  'no-boc',
  'thien-di',
  'tat-ach',
  'tai-bach',
  'tu-nu',
  'phu-the',
  'huynh-de',
]

const base = 'https://boitoan.com.vn'
const lastmod = '2026-05-02'
const starsLastmod = '2026-05-04'
const starPalaceLastmod = '2026-05-04'

function toSlug(input) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function canonicalForecastPath(item) {
  return `/tu-vi-2026/${toSlug(item.canChi)}-${item.year}-${item.gender}-mang/`
}

function animalHubSlug(item) {
  return item.slug.split('-').slice(0, 2).join('-')
}

const animalHubSlugs = [...new Set(seoForecasts.map(animalHubSlug))]

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

const tuviUrls = [
  {
    loc: `${base}/tu-vi/`,
    lastmod,
    changefreq: 'weekly',
    priority: '0.95',
  },
  ...animalHubSlugs.map((slug) => ({
    loc: `${base}/tu-vi/${slug}/`,
    lastmod,
    changefreq: 'weekly',
    priority: '0.86',
  })),
  ...seoForecasts.map((item) => ({
    loc: `${base}${canonicalForecastPath(item)}`,
    lastmod,
    changefreq: 'yearly',
    priority: '0.82',
  })),
]

const gieoqueUrls = routes.queSlugs.map((slug) => ({
  loc: `${base}/que/${slug}/`,
  lastmod,
  changefreq: 'monthly',
  priority: '0.7',
}))

const starUrls = priorityStarSlugs.map((slug) => ({
  loc: `${base}/sao/${slug}/`,
  lastmod: starsLastmod,
  changefreq: 'monthly',
  priority: '0.75',
}))

const toolsUrls = routes.toolSlugs.map((slug) => ({
  loc: `${base}/${slug}/`,
  lastmod,
  changefreq: 'weekly',
  priority: '0.85',
}))

const palaceUrls = palaceSlugs.map((slug) => ({
  loc: `${base}/cung/${slug}/`,
  lastmod,
  changefreq: 'monthly',
  priority: '0.74',
}))

const starPalaceUrls = approvedStarPalaceCombinations.map((combo) => ({
  loc: `${base}/sao/${combo.star}/cung/${combo.palace}/`,
  lastmod: starPalaceLastmod,
  changefreq: 'monthly',
  priority: '0.68',
}))

const publicDir = path.join(__dirname, '..', 'public')
fs.mkdirSync(publicDir, { recursive: true })

fs.writeFileSync(path.join(publicDir, 'tuvi.xml'), buildSitemap(tuviUrls))
fs.writeFileSync(path.join(publicDir, 'stars.xml'), buildSitemap(starUrls))
fs.writeFileSync(path.join(publicDir, 'gieoque.xml'), buildSitemap(gieoqueUrls))
fs.writeFileSync(path.join(publicDir, 'tools.xml'), buildSitemap(toolsUrls))
fs.writeFileSync(path.join(publicDir, 'palaces.xml'), buildSitemap(palaceUrls))
fs.writeFileSync(path.join(publicDir, 'star-palace.xml'), buildSitemap(starPalaceUrls))
fs.writeFileSync(
  path.join(publicDir, 'sitemap-index.xml'),
  buildSitemapIndex([
    { loc: `${base}/sitemap.xml`, lastmod },
    { loc: `${base}/tuvi.xml`, lastmod },
    { loc: `${base}/stars.xml`, lastmod: starsLastmod },
    { loc: `${base}/palaces.xml`, lastmod },
    ...(starPalaceUrls.length > 0 ? [{ loc: `${base}/star-palace.xml`, lastmod: starPalaceLastmod }] : []),
    { loc: `${base}/gieoque.xml`, lastmod },
    { loc: `${base}/tools.xml`, lastmod },
  ])
)

console.log('Segmented sitemaps generated in public/')
