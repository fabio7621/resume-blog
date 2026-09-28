// 文章是靜態內容，直接用一般陣列，不包 ref / reactive
const rawPosts = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

// frontmatter 由 sync 腳本以 JSON 值寫入；手動編輯時沒加引號也能讀
const parseValue = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

const parsePost = (path, raw) => {
  const [, head = '', body = raw] = raw.match(FRONTMATTER_RE) ?? []
  const meta = Object.fromEntries(
    head
      .split(/\r?\n/)
      .filter((line) => line.includes(':'))
      .map((line) => {
        const index = line.indexOf(':')
        return [line.slice(0, index).trim(), parseValue(line.slice(index + 1).trim())]
      }),
  )
  const slug = path.split('/').pop().replace(/\.md$/, '')
  return { slug, ...meta, body }
}

// 依發文日期由舊到新，符合系列文的閱讀順序
const posts = Object.entries(rawPosts)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => a.date.localeCompare(b.date) || (a.day ?? 0) - (b.day ?? 0))

export function usePosts() {
  const getPostIndex = (slug) => posts.findIndex((post) => post.slug === slug)
  return { posts, getPostIndex }
}
