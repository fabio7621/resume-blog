// 同步 iThome 鐵人賽系列文到 src/content/posts/
// 用法：npm run sync:ithome            （只新增還沒有的文章）
//       npm run sync:ithome -- --force （從第一篇重抓並覆蓋全部）
//
// 做法：沿著文章頁的「下一篇」連結走完整個系列（RSS 更新較慢，且會吃掉「」、等標點），
// 文章頁被 Cloudflare 擋下時才退回用 RSS 的內容。
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

const SERIES_ID = '9801'
const RSS_URL = `https://ithelp.ithome.com.tw/rss/series/${SERIES_ID}`
const ARTICLE_URL = 'https://ithelp.ithome.com.tw/articles/'
const POSTS_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/content/posts')
const EXCERPT_LENGTH = 120
const REQUEST_DELAY_MS = 300
// iThome 的圖片網址會 302 到 CloudFront，直連原網址會被 Cloudflare 驗證擋掉
const IMAGE_HOST_RE = /https:\/\/ithelp\.ithome\.com\.tw\/upload\//g
const IMAGE_CDN = 'https://d1dwq032kyr03c.cloudfront.net/upload/'

const force = process.argv.includes('--force')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const decodeEntities = (text) =>
  text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, '&')

// 被 Cloudflare 驗證擋下時回傳 null
async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) return null
  const text = await res.text()
  return text.includes('<title>Just a moment...</title>') ? null : text
}

const readTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  if (!match) return ''
  const value = match[1].trim()
  const cdata = value.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/)
  return cdata ? cdata[1] : decodeEntities(value)
}

async function fetchRssArticles() {
  const xml = await fetchText(RSS_URL)
  if (!xml) return new Map()
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? []
  return new Map(
    items
      .map((item) => ({
        id: readTag(item, 'link').match(/articles\/(\d+)/)?.[1],
        title: readTag(item, 'title'),
        date: readTag(item, 'pubDate').slice(0, 10),
        html: readTag(item, 'content:encoded'),
      }))
      .filter((article) => article.id)
      .map((article) => [article.id, article]),
  )
}

// 取出 <div class="markdown__style"> 的內容，用 div 開關標籤配對找到結尾
function extractBody(page) {
  const openTag = '<div class="markdown__style">'
  const start = page.indexOf(openTag)
  if (start === -1) return ''
  const tagRe = /<\/?div\b[^>]*>/g
  tagRe.lastIndex = start + openTag.length
  let depth = 1
  for (let match = tagRe.exec(page); match; match = tagRe.exec(page)) {
    depth += match[0].startsWith('</') ? -1 : 1
    if (depth === 0) return page.slice(start + openTag.length, match.index).trim()
  }
  return ''
}

function parseArticlePage(page) {
  const title = page.match(/<h2 class="qa-header__title[^>]*>\s*([\s\S]*?)\s*<\/h2>/)?.[1]
  const date = page.match(/qa-header__info-time[^>]*>\s*(\d{4}-\d{2}-\d{2})/)?.[1]
  const html = extractBody(page)
  if (!title || !date || !html) return null

  const seriesLinks = page.matchAll(
    /<a href="https:\/\/ithelp\.ithome\.com\.tw\/articles\/(\d+)" class="article-series-page__link">([\s\S]*?)<\/a>/g,
  )
  const nextId = [...seriesLinks].find(([, , inner]) => inner.includes('下一篇'))?.[1] ?? null
  return { title: decodeEntities(title), date, html, nextId }
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  hr: '---',
})
turndown.use(gfm)

// 標題格式：「Vue 走過路過不要錯過 Day03 -為什麼改資料畫面就會動？…」
const parseTitle = (title) => {
  const match = title.match(/Day\s*(\d+)\s*[-－]?\s*(.*)$/)
  return match
    ? { day: Number(match[1]), subtitle: match[2].trim() }
    : { day: null, subtitle: title }
}

const toExcerpt = (html) => {
  const text = decodeEntities(html.replace(/<(pre|h[1-6])[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > EXCERPT_LENGTH ? `${text.slice(0, EXCERPT_LENGTH)}…` : text
}

const toFrontmatter = (data) =>
  ['---', ...Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`), '---'].join('\n')

function writePost(id, { title, date, html }) {
  const body = html.replace(IMAGE_HOST_RE, IMAGE_CDN)
  const { day, subtitle } = parseTitle(title)
  const frontmatter = toFrontmatter({
    title,
    subtitle,
    day,
    date,
    excerpt: toExcerpt(body),
    source: `${ARTICLE_URL}${id}`,
    series: 'ithome-ironman-2026',
  })
  writeFileSync(join(POSTS_DIR, `${id}.md`), `${frontmatter}\n\n${turndown.turndown(body)}\n`)
}

mkdirSync(POSTS_DIR, { recursive: true })

const rssArticles = await fetchRssArticles()
const localIds = readdirSync(POSTS_DIR)
  .filter((file) => /^\d+\.md$/.test(file))
  .map((file) => file.replace(/\.md$/, ''))
// 文章 id 隨發文時間遞增
const knownIds = [...new Set([...rssArticles.keys(), ...localIds])].sort((a, b) => a - b)
if (knownIds.length === 0) throw new Error('RSS 抓不到文章，本機也沒有既有文章可當起點')

// 一般模式只需從最新一篇往後找新文章；--force 從第一篇開始全部重抓
let currentId = force ? knownIds[0] : knownIds.at(-1)
let written = 0
const visited = new Set()

while (currentId && !visited.has(currentId)) {
  visited.add(currentId)
  const page = await fetchText(`${ARTICLE_URL}${currentId}`)
  const fromPage = page && parseArticlePage(page)
  const article = fromPage ?? rssArticles.get(currentId)
  const exists = existsSync(join(POSTS_DIR, `${currentId}.md`))

  if (!article) {
    console.warn(`✗ ${currentId}  文章頁被擋且 RSS 沒有這篇，略過`)
  } else if (!exists || force) {
    writePost(currentId, article)
    written++
    console.log(`✓ ${currentId}  ${article.title}${fromPage ? '' : '（RSS 備援，標點可能缺漏）'}`)
  }

  // 文章頁被擋時拿不到「下一篇」，改用已知清單的下一個 id 接續
  currentId = fromPage
    ? fromPage.nextId
    : (knownIds.find((id) => Number(id) > Number(currentId)) ?? null)
  await sleep(REQUEST_DELAY_MS)
}

console.log(`完成：走訪 ${visited.size} 篇，寫入 ${written} 篇${force ? '（--force）' : ''}`)
