#!/usr/bin/env node
/**
 * 从 docs.tangly1024.com 拉取旧站文章，合并到 docs/user-guide 对应路径。
 * 用法：
 *   node scripts/migrate-legacy-docs.mjs --slug notionnext-twikoo
 *   node scripts/migrate-legacy-docs.mjs --all --dry-run
 *   node scripts/migrate-legacy-docs.mjs --slug example-1 --images
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const USER_GUIDE = path.join(ROOT, 'docs', 'user-guide')
const PUBLIC_LEGACY = path.join(ROOT, 'docs', 'public', 'legacy')
const BASE = 'https://docs.tangly1024.com/article'

/** slug → 相对 user-guide 的路径 */
const SLUG_MAP = {
  about: 'intro.md',
  'vercel-deploy-notion-next': 'deploy-vercel.md',
  'how-to-config-notion-next': 'config-site.md',
  'how-to-update-notionnext': 'update.md',
  'start-to-write': 'notion-database.md',
  'notion-next-secondary-menu': 'menu-secondary.md',
  'vercel-domain': 'deploy/vercel-domain.md',
  'vercel-deploy-notion-next-static': 'deploy/vercel-static.md',
  'deploy-notion-next-with-netlify': 'deploy/netlify.md',
  'notion-next-cloud-flare': 'deploy/cloudflare-pages.md',
  'deploy-notion-next-on-vps': 'deploy/vps.md',
  'vercel-accelerate': 'deploy/vercel-accelerate.md',
  'vercel-redploy': 'deploy/vercel-redeploy.md',
  'notion-next-guide': 'config/site-basics.md',
  'notion-next-url-customize': 'config/url-customize.md',
  'notion-next-algolia': 'config/algolia.md',
  'notion-short-key': 'notion/short-keys.md',
  'notion-faster': 'notion/faster.md',
  latest: 'changelog/latest.md',
  'v4.0': 'changelog/v4-history.md',
  'notion-next-themes': 'themes/overview.md',
  'notionnext-heo': 'themes/heo.md',
  'notion-next-proxio': 'themes/proxio.md',
  'your-own-theme': 'development/own-theme.md',
  'custom-your-style': 'development/custom-style.md',
  'notion-next-analytics': 'analytics/overview.md',
  'notion-next-51-la': 'analytics/51la.md',
  'notion-next-ackee': 'analytics/ackee.md',
  'notion-next-umami': 'analytics/umami.md',
  'notion-next-clarity': 'analytics/clarity.md',
  'notion-next-comment-plugin': 'comments/overview.md',
  'notionnext-twikoo': 'comments/twikoo.md',
  'notion-next-waline': 'comments/waline.md',
  'notionnext-valine': 'comments/valine.md',
  'notion-next-giscus': 'comments/giscus.md',
  'notion-next-cusdis': 'comments/cusdis.md',
  'notion-next-utterance': 'comments/utterances.md',
  'notion-next-artalk': 'comments/artalk.md',
  'notion-next-plugins': 'plugins/overview.md',
  'notion-next-plugin-music-player': 'plugins/music-player.md',
  'notion-next-mailchimp': 'plugins/mailchimp.md',
  'how-to-develop-with-notion-next': 'development/getting-started.md',
  'vercel-notionnext-notion': 'development/architecture.md',
  'next-js': 'development/nextjs.md',
  'seo-course': 'operations/seo.md',
  'how-to-question': 'help/feedback.md',
  'about-author': 'help/feedback.md',
  'chat-community': 'help/community.md',
  'support-notion-next': 'help/support.md',
  'my-service': 'help/support.md',
  'example-1': 'notion/example-article.md'
}

function parseArgs() {
  const args = process.argv.slice(2)
  const out = { slug: null, all: false, dryRun: false, images: false }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--slug' && args[i + 1]) out.slug = args[++i]
    else if (args[i] === '--all') out.all = true
    else if (args[i] === '--dry-run') out.dryRun = true
    else if (args[i] === '--images') out.images = true
  }
  return out
}

function htmlToRoughMarkdown(html) {
  if (typeof html !== 'string' || !html) return ''
  const decoded = html
    .split('&nbsp;').join(' ')
    .split('&amp;').join('&')
    .split('&lt;').join('<')
    .split('&gt;').join('>')
    .split('&quot;').join('"')
  let out = ''
  let i = 0
  while (i < decoded.length) {
    if (decoded[i] !== '<') {
      out += decoded[i]
      i += 1
      continue
    }
    const end = decoded.indexOf('>', i + 1)
    if (end === -1) break
    const raw = decoded.slice(i + 1, end).trim()
    const closing = raw.startsWith('/')
    const name = (closing ? raw.slice(1) : raw).split(/[\s/]/)[0].toLowerCase()
    i = end + 1
    if (name === 'script' || name === 'style') {
      if (!closing) {
        const closeAt = decoded.toLowerCase().indexOf(`</${name}`, i)
        if (closeAt === -1) break
        const after = decoded.indexOf('>', closeAt)
        i = after === -1 ? decoded.length : after + 1
      }
      continue
    }
    if (!closing && name === 'br') out += '\n'
    else if (!closing && name === 'h1') out += '\n# '
    else if (!closing && name === 'h2') out += '\n## '
    else if (!closing && name === 'h3') out += '\n### '
    else if (!closing && name === 'h4') out += '\n#### '
    else if (!closing && name === 'li') out += '\n- '
    else if (!closing && name === 'p') out += '\n'
    else if (closing && (name === 'h1' || name === 'h2' || name === 'h3' || name === 'h4' || name === 'p' || name === 'li')) {
      out += '\n'
    }
  }
  while (out.includes('\n\n\n')) out = out.split('\n\n\n').join('\n\n')
  return out.trim()
}

async function fetchArticle(slug) {
  const url = `${BASE}/${slug}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'NotionNext-docs-migrator/1.0' }
  })
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  const ct = res.headers.get('content-type') || ''
  const body = await res.text()
  if (ct.includes('html')) return htmlToRoughMarkdown(body)
  return body
}

function mergeMarkdown(existing, fetched, slug, url) {
  const header = `> 迁移自：[${slug}](${url})（脚本生成，请人工校对）\n\n`
  const footer = `\n\n## 原文链接\n\n${url}\n`
  if (!existing) return header + fetched + footer
  if (existing.includes('## 原文链接')) {
    const before = existing.split('## 原文链接')[0].trimEnd()
    return `${before}\n\n---\n\n## 从旧站补充（自动）\n\n${fetched}${footer}`
  }
  return `${existing.trimEnd()}\n\n---\n\n## 从旧站补充（自动）\n\n${fetched}${footer}`
}

async function downloadImages(markdown, slug) {
  const re = /!\[[^\]]*\]\((https?:\/\/[^)]+)\)/g
  let m
  let out = markdown
  let i = 0
  await fs.mkdir(PUBLIC_LEGACY, { recursive: true })
  while ((m = re.exec(markdown)) !== null) {
    const imgUrl = m[1]
    try {
      const r = await fetch(imgUrl)
      if (!r.ok) continue
      const buf = Buffer.from(await r.arrayBuffer())
      const ext = path.extname(new URL(imgUrl).pathname) || '.png'
      const name = `${slug}-${i}${ext.split('?')[0]}`
      const rel = `/legacy/${name}`
      await fs.writeFile(path.join(PUBLIC_LEGACY, name), buf)
      out = out.replace(imgUrl, rel)
      i++
    } catch {
      /* skip */
    }
  }
  return out
}

async function migrateOne(slug, opts) {
  const rel = SLUG_MAP[slug]
  if (!rel) {
    console.warn(`skip: no mapping for slug "${slug}"`)
    return
  }
  const target = path.join(USER_GUIDE, rel)
  const url = `${BASE}/${slug}`
  console.log(`fetch ${url} → ${rel}`)
  let fetched = await fetchArticle(slug)
  if (opts.images) fetched = await downloadImages(fetched, slug)
  const existing = await fs.readFile(target, 'utf8').catch(() => '')
  const merged = mergeMarkdown(existing, fetched, slug, url)
  if (opts.dryRun) {
    console.log(`[dry-run] would write ${target} (${merged.length} chars)`)
    return
  }
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.writeFile(target, merged, 'utf8')
  console.log(`wrote ${target}`)
}

async function main() {
  const opts = parseArgs()
  const slugs = opts.all ? Object.keys(SLUG_MAP) : opts.slug ? [opts.slug] : []
  if (!slugs.length) {
    console.log(`Usage:
  node scripts/migrate-legacy-docs.mjs --slug <slug> [--images]
  node scripts/migrate-legacy-docs.mjs --all [--dry-run] [--images]`)
    process.exit(1)
  }
  for (const slug of slugs) {
    try {
      await migrateOne(slug, opts)
    } catch (e) {
      console.error(`error ${slug}:`, e.message)
    }
  }
}

main()
