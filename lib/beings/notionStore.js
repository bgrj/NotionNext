import { Client } from '@notionhq/client'
import {
  roomCategory,
  signedPostTitle,
  writingSlug
} from '@/themes/my-theme/beings'

const ARCHIVE_DATABASE_ID = (
  process.env.BEINGS_ARCHIVE_DATABASE_ID ||
  '7befe48161034b13b2011bb98911b23e'
).replace(/-/g, '')

const POSTS_DATABASE_ID = (
  process.env.NOTION_POSTS_DATABASE_ID ||
  'c2cca340a289838f9316076edc1a71cf'
).replace(/-/g, '')

const notionToken = () =>
  String(
    process.env.NOTION_TOKEN ||
      process.env.NOTION_API_TOKEN ||
      process.env.NOTION_ACCESS_TOKEN ||
      ''
  ).trim()

export const isNotionWriteEnabled = () => Boolean(notionToken())

const getClient = () => {
  const token = notionToken()
  if (!token) {
    const error = new Error('notion_token_missing')
    error.status = 503
    throw error
  }
  return new Client({ auth: token })
}

const hasProperty = (properties, name, type) =>
  Boolean(properties?.[name] && (!type || properties[name].type === type))

const titleProp = content => ({
  title: [{ type: 'text', text: { content: String(content || '').slice(0, 100) } }]
})

const textProp = content => ({
  rich_text: [
    { type: 'text', text: { content: String(content || '').slice(0, 1900) } }
  ]
})

const setIf = (target, properties, name, type, value) => {
  if (!hasProperty(properties, name, type) || value == null) return
  target[name] = value
}

const todayIso = () => new Date().toISOString().slice(0, 10)

export async function upsertBeingArchive(being, { email } = {}) {
  if (!being || being.isAuthor) return { skipped: 'author' }
  const notion = getClient()
  const database = await notion.databases.retrieve({
    database_id: ARCHIVE_DATABASE_ID
  })
  const properties = database.properties || {}
  const handle = String(being.handle || '')
  const clerkUserId = String(being.clerkUserId || '')
  const orFilters = []
  if (hasProperty(properties, '登录标识', 'rich_text') && clerkUserId) {
    orFilters.push({
      property: '登录标识',
      rich_text: { equals: clerkUserId }
    })
  }
  if (hasProperty(properties, '标识', 'rich_text') && handle) {
    orFilters.push({
      property: '标识',
      rich_text: { equals: handle }
    })
  }
  let existing = null
  if (orFilters.length) {
    const found = await notion.databases.query({
      database_id: ARCHIVE_DATABASE_ID,
      page_size: 1,
      filter: orFilters.length === 1 ? orFilters[0] : { or: orFilters }
    })
    existing = found.results?.[0] || null
  }

  const pageProperties = {}
  setIf(pageProperties, properties, '显示名', 'title', titleProp(being.name || handle))
  if (!pageProperties['显示名'] && hasProperty(properties, 'title', 'title')) {
    pageProperties.title = titleProp(being.name || handle)
  }
  setIf(pageProperties, properties, '标识', 'rich_text', textProp(handle))
  setIf(
    pageProperties,
    properties,
    '登录标识',
    'rich_text',
    textProp(clerkUserId)
  )
  setIf(
    pageProperties,
    properties,
    '席位',
    'number',
    Number.isFinite(Number(being.seat)) ? { number: Number(being.seat) } : null
  )
  setIf(pageProperties, properties, '身份', 'select', {
    select: { name: '会员' }
  })
  setIf(pageProperties, properties, '公开', 'checkbox', {
    checkbox: Boolean(being.public)
  })
  setIf(
    pageProperties,
    properties,
    '箴言',
    'rich_text',
    textProp(being.motto || being.profile?.motto || '')
  )
  const profile = being.profile || {}
  if (profile.birth) {
    setIf(pageProperties, properties, '出生', 'date', {
      date: { start: profile.birth }
    })
  }
  if (profile.awakening) {
    setIf(pageProperties, properties, '挣脱蒙昧', 'date', {
      date: { start: profile.awakening }
    })
  }
  if (profile.firstWritten) {
    setIf(pageProperties, properties, '首次写下', 'date', {
      date: { start: profile.firstWritten }
    })
  }
  if (Number(profile.newYears) > 0) {
    setIf(pageProperties, properties, '目标岁数', 'number', {
      number: Number(profile.newYears)
    })
  }
  if (Number(profile.years) > 0) {
    setIf(pageProperties, properties, '生命岁数', 'number', {
      number: Number(profile.years)
    })
  }
  if (email && hasProperty(properties, '邮箱', 'email')) {
    pageProperties['邮箱'] = { email }
  }

  if (existing?.id) {
    await notion.pages.update({
      page_id: existing.id,
      properties: pageProperties
    })
    return { id: existing.id, updated: true }
  }

  const created = await notion.pages.create({
    parent: { database_id: ARCHIVE_DATABASE_ID },
    properties: pageProperties
  })
  return { id: created.id, created: true }
}

export async function publishWritingToSite(being, writing) {
  if (!being || being.isAuthor || !writing?.public) {
    return { skipped: true, writing }
  }
  const notion = getClient()
  const database = await notion.databases.retrieve({
    database_id: POSTS_DATABASE_ID
  })
  const properties = database.properties || {}
  const category = roomCategory(writing.room)
  const title = signedPostTitle(writing.title, being.name)
  const slug = writingSlug(being.handle, writing.id)
  const summary = String(writing.body || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)
  const pageProperties = {}
  setIf(pageProperties, properties, 'title', 'title', titleProp(title))
  setIf(pageProperties, properties, 'type', 'select', {
    select: { name: 'Post' }
  })
  setIf(pageProperties, properties, 'category', 'select', {
    select: { name: category }
  })
  setIf(pageProperties, properties, 'status', 'select', {
    select: { name: 'Published' }
  })
  setIf(pageProperties, properties, 'comment', 'select', {
    select: { name: 'Hide' }
  })
  setIf(pageProperties, properties, 'slug', 'rich_text', textProp(slug))
  setIf(pageProperties, properties, 'summary', 'rich_text', textProp(summary))
  setIf(pageProperties, properties, 'date', 'date', {
    date: { start: (writing.created || '').slice(0, 10) || todayIso() }
  })
  if (hasProperty(properties, 'tags', 'multi_select')) {
    pageProperties.tags = { multi_select: [{ name: '我们的存在' }] }
  }
  if (hasProperty(properties, '作者', 'rich_text')) {
    pageProperties['作者'] = textProp(being.name)
  }

  const children = [
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: { content: `作者：${being.name || being.handle}` }
          }
        ]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: { content: String(writing.body || '').slice(0, 1900) }
          }
        ]
      }
    }
  ]

  if (writing.notionPageId) {
    await notion.pages.update({
      page_id: writing.notionPageId,
      properties: pageProperties
    })
    return {
      writing: { ...writing, notionPageId: writing.notionPageId, slug },
      updated: true,
      category
    }
  }

  const created = await notion.pages.create({
    parent: { database_id: POSTS_DATABASE_ID },
    properties: pageProperties,
    children
  })
  return {
    writing: { ...writing, notionPageId: created.id, slug },
    created: true,
    category
  }
}

export const notionWarningOf = error => {
  const code = error?.code || error?.message || ''
  if (code === 'notion_token_missing' || error?.status === 401) {
    return '网站还没有能写 Notion 的集成令牌。'
  }
  if (error?.code === 'object_not_found' || error?.status === 404) {
    return '还没把「存在者档案」或 Our beings 库分享给网站的 Notion 集成。'
  }
  return '档案已留下，但 Notion 库这一步没有写成。'
}
