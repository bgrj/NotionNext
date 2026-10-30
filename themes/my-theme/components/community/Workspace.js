import { useEffect, useState } from 'react'
import {
  COLLECTIONS,
  DOMAINS,
  KINDS,
  TOOL_STATES
} from '@/lib/beings/community/model'
import { useCommunity, useCommunityData } from './context'
import {
  AppLink,
  displayDate,
  Empty,
  Field,
  label,
  LoadState,
  PlainBody,
  PublicationState,
  SectionHeading
} from './Shared'
import { downloadLocal } from './CommunityTools'
import s from './Community.module.css'

export function WorkspaceHome() {
  const resource = useCommunityData('workspace', { limit: 6 })
  const { run, busy } = useCommunity()
  return (
    <>
      <SectionHeading
        eyebrow='MY BEING / A ROOM OF YOUR OWN'
        title='把生活，放回自己手里'
        description='有些记录留给自己，有些思想与人相遇。你决定它们的去处。'
        action={
          <AppLink className={s.button} href='/our-beings/app/new?kind=journal'>
            写下一段 →
          </AppLink>
        }
      />
      <LoadState resource={resource}>
        {data => (
          <>
            <div className={s.shelves}>
              {COLLECTIONS.map((c, i) => (
                <AppLink
                  className={s.shelf}
                  href={`/our-beings/app/${c.id}`}
                  key={c.id}
                >
                  <span className={s.eyebrow}>{c.eyebrow}</span>
                  <span
                    className={`${s.bookCover} ${s[`cover${i}`]}`}
                    aria-hidden='true'
                  >
                    {['记\n得', '书\n间', '看\n见', '回\n声'][i]}
                  </span>
                  <h2>
                    {c.label} <span>↗</span>
                  </h2>
                  <small>{data.counts[c.id] || 0} 条自己的记录</small>
                </AppLink>
              ))}
            </div>
            <div className={s.sectionBar}>
              <div>
                <p className={s.eyebrow}>RECENTLY / 留一点回声</p>
                <h2>最近写下的</h2>
              </div>
              <AppLink href='/our-beings/app/collection'>查看全部 ↗</AppLink>
            </div>
            {data.items.length ? (
              <div className={s.list}>
                {data.items.map(item => (
                  <PrivateRow key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <Empty>
                <p>不必写得漂亮，先留下一句真实的话。</p>
              </Empty>
            )}
            <div className={s.twoColumns}>
              <AppLink
                className={s.cardLink}
                href='/our-beings/app/new?kind=essay&domain=dao'
              >
                <small>DAO / 长期追问</small>
                <h2>把问题，想深一点。</h2>
                <p>从一个核心问题，走进一篇长文。 ↗</p>
              </AppLink>
              <AppLink
                className={s.cardLink}
                href='/our-beings/app/new?kind=resource&domain=shu'
              >
                <small>SHU / 眼前的方法</small>
                <h2>让经验，可以再用。</h2>
                <p>写下条件、步骤与它的有效期限。 ↗</p>
              </AppLink>
            </div>
            <details className={s.details}>
              <summary>原档案、生命钟与历史加入说明</summary>
              <p>
                原有档案位、生命钟、邀请码和历史内容继续保留，查看它们不会迁移或公开旧数据。
              </p>
              <AppLink className={s.textLink} href='/our-beings/app/legacy'>
                进入原档案 ↗
              </AppLink>
            </details>
          </>
        )}
      </LoadState>
      <p className={s.footnote}>
        新建默认私密。普通保存保留原来的公开设置；提交公开前，可以先看清楚分享的范围。
      </p>
    </>
  )
}

export function PrivateRow({ item, trash = false }) {
  const { run, busy } = useCommunity()
  return (
    <article className={s.listRow}>
      <div>
        <p className={s.meta}>
          {label(item.kind)} · {label(item.domain)} ·{' '}
          {displayDate(item.draft.occurredAt || item.createdAt)}
        </p>
        <AppLink href={`/our-beings/app/edit/${item.id}`}>
          <h3>{item.draft.title}</h3>
        </AppLink>
        {item.draft.summary && <p>{item.draft.summary}</p>}
        <p className={s.muted}>
          {label(item.status)}
          {item.archived ? ' · 已归档' : ''}
          {item.reviewNote ? ` · ${item.reviewNote}` : ''}
        </p>
      </div>
      {trash ? (
        <button
          className={s.quiet}
          disabled={busy}
          onClick={() =>
            run(
              'content.restore',
              { id: item.id, revision: item.revision },
              '已恢复为私密草稿。'
            )
          }
        >
          恢复为私密
        </button>
      ) : (
        <AppLink
          className={s.rowArrow}
          href={`/our-beings/app/edit/${item.id}`}
          aria-label={`打开 ${item.draft.title}`}
        >
          ↗
        </AppLink>
      )}
    </article>
  )
}

export function CollectionPage({ kind, domain, trash = false }) {
  const [query, setQuery] = useState(''),
    [archived, setArchived] = useState(false),
    [offset, setOffset] = useState(0)
  const resource = useCommunityData(trash ? 'trash' : 'workspace', {
    ...(kind ? { kind } : {}),
    ...(domain ? { domain } : {}),
    q: query,
    archived: archived ? '1' : '0',
    offset,
    limit: 12
  })
  const title = trash
    ? '最近删除'
    : kind
      ? label(kind)
      : domain
        ? `我写的${label(domain)}`
        : '自己的全部记录'
  return (
    <>
      <SectionHeading
        eyebrow={
          kind === 'book'
            ? 'THE COMPANY I KEEP / 精神书架'
            : 'MY COLLECTION / 向内整理'
        }
        title={title}
        description={
          trash
            ? '删除的记录只对自己保留，可恢复为私密草稿。导出包含自己的删除记录；当前试用版不自动永久清理。'
            : kind === 'book'
              ? '书不是待完成的清单。让它们成为可以再次相遇的同路人。'
              : kind === 'image'
                ? '自己的作品，与留下回声的影像。'
                : kind === 'audio'
                  ? '给声音一个位置，也给聆听留一点笔记。'
                  : '记录发生的时间，也保留写下它的时间。'
        }
        action={
          !trash && (
            <AppLink
              className={s.button}
              href={`/our-beings/app/new?kind=${kind || (domain ? 'essay' : 'journal')}${domain ? `&domain=${domain}` : ''}`}
            >
              新增记录 ＋
            </AppLink>
          )
        }
      />
      <div className={s.controls}>
        <form
          onSubmit={e => {
            e.preventDefault()
            setQuery(e.currentTarget.elements.q.value)
            setOffset(0)
          }}
          className={s.search}
        >
          <input
            type='search'
            name='q'
            aria-label='查找自己的记录'
            placeholder='寻找一本书、一段记录、一个问题…'
          />
          <button type='submit' className={s.quiet}>
            查找
          </button>
        </form>
        {!trash && (
          <button
            className={s.tab}
            aria-pressed={archived}
            onClick={() => {
              setArchived(x => !x)
              setOffset(0)
            }}
          >
            {archived ? '正在看归档' : '查看归档'}
          </button>
        )}
      </div>
      <LoadState resource={resource}>
        {data =>
          !data.items.length ? (
            <Empty>
              <p>
                这里还没有符合条件的记录。可以换个关键词，或从一次小小的记录开始。
              </p>
            </Empty>
          ) : (
            <>
              <p className={s.muted}>
                {data.total ?? data.items.length} 条记录，仅自己可见
              </p>
              <div
                className={
                  kind === 'book' || kind === 'image'
                    ? s.collectionGrid
                    : s.list
                }
              >
                {data.items.map(item =>
                  kind === 'book' && !trash ? (
                    <AppLink
                      className={s.shelf}
                      href={`/our-beings/app/edit/${item.id}`}
                      key={item.id}
                    >
                      <span className={`${s.bookCover} ${s.cover1}`}>
                        {item.draft.coverUrl ? (
                          <img
                            src={item.draft.coverUrl}
                            alt={item.draft.title}
                            loading='lazy'
                            referrerPolicy='no-referrer'
                          />
                        ) : (
                          item.draft.title
                        )}
                      </span>
                      <p className={s.meta}>
                        {label(item.draft.readingStatus)} ·{' '}
                        {item.draft.creator || '作者待补'}
                      </p>
                      <h3>{item.draft.title}</h3>
                      <span className={s.muted}>{label(item.status)}</span>
                    </AppLink>
                  ) : (
                    <PrivateRow item={item} trash={trash} key={item.id} />
                  )
                )}
              </div>
              <div className={s.actions}>
                {offset > 0 && (
                  <button
                    className={s.quiet}
                    onClick={() => setOffset(Math.max(0, offset - 12))}
                  >
                    ← 上一页
                  </button>
                )}
                {data.nextOffset != null && (
                  <button
                    className={s.quiet}
                    onClick={() => setOffset(data.nextOffset)}
                  >
                    再看一些 ↓
                  </button>
                )}
              </div>
            </>
          )
        }
      </LoadState>
    </>
  )
}

const emptyFields = {
  title: '',
  summary: '',
  body: '',
  creator: '',
  edition: '',
  isbn: '',
  sourceUrl: '',
  coverUrl: '',
  tags: '',
  occurredAt: '',
  readingStatus: 'wish',
  ownership: 'collected',
  duration: '',
  coreQuestion: '',
  citations: '',
  applicability: '',
  steps: '',
  expectedResult: '',
  limitations: '',
  alternatives: '',
  toolState: 'unverified',
  verifiedAt: '',
  allowComments: false,
  topic: '',
  noteIds: []
}
const localTime = value => {
  if (!value) return ''
  const d = new Date(value)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)
}
export function ContentEditor({
  id,
  initialKind = 'journal',
  initialDomain = 'existence'
}) {
  const { run, busy, navigate } = useCommunity()
  const resource = useCommunityData('content', { id }, Boolean(id))
  const [item, setItem] = useState(null),
    [fields, setFields] = useState(emptyFields),
    [kind, setKind] = useState(
      KINDS.includes(initialKind) ? initialKind : 'journal'
    ),
    [domain, setDomain] = useState(
      DOMAINS.includes(initialDomain) ? initialDomain : 'existence'
    ),
    [consent, setConsent] = useState(false),
    [preview, setPreview] = useState(false),
    [dirty, setDirty] = useState(false)
  useEffect(() => {
    if (resource.data && !item) {
      setItem(resource.data)
      setKind(resource.data.kind)
      setDomain(resource.data.domain)
      setFields({
        ...emptyFields,
        ...resource.data.draft,
        tags: (resource.data.draft.tags || []).join('，'),
        occurredAt: localTime(resource.data.draft.occurredAt),
        verifiedAt: localTime(resource.data.draft.verifiedAt)
      })
    }
  }, [resource.data, item])
  const set = (key, value) => {
    setFields(x => ({ ...x, [key]: value }))
    setConsent(false)
    setDirty(true)
  }
  const input = {
    ...fields,
    occurredAt: fields.occurredAt
      ? new Date(fields.occurredAt).toISOString()
      : '',
    verifiedAt: fields.verifiedAt
      ? new Date(fields.verifiedAt).toISOString()
      : ''
  }
  const save = async e => {
    e.preventDefault()
    const result = await run(
      id ? 'content.save' : 'content.create',
      {
        ...input,
        kind,
        domain,
        ...(id ? { id, revision: item.revision } : {})
      },
      '已保存为自己的记录。'
    )
    if (result) {
      setItem(result)
      setDirty(false)
      setFields({
        ...emptyFields,
        ...result.draft,
        tags: (result.draft.tags || []).join('，'),
        occurredAt: localTime(result.draft.occurredAt),
        verifiedAt: localTime(result.draft.verifiedAt)
      })
      if (!id) navigate(`/our-beings/app/edit/${result.id}`)
    }
  }
  if (id && !item)
    return (
      <LoadState resource={resource}>
        {() => <p role='status'>正在准备编辑…</p>}
      </LoadState>
    )
  return (
    <>
      <SectionHeading
        eyebrow='WRITE / 让一句话有个去处'
        title={id ? '接着写下去' : '留下一条记录'}
        description='保存的是你的草稿。公开需要预览、主动提交与审核；原始文件不会随笔记自动公开。'
      />
      {item && <PublicationState item={item} />}
      <form onSubmit={save} className={s.editor}>
        <div className={s.formGrid}>
          <Field label='内容载体'>
            <select
              value={kind}
              disabled={Boolean(id)}
              onChange={e => setKind(e.target.value)}
            >
              {KINDS.map(x => (
                <option key={x} value={x}>
                  {label(x)}
                </option>
              ))}
            </select>
          </Field>
          <Field label='所属领域'>
            <select
              value={domain}
              disabled={Boolean(id)}
              onChange={e => setDomain(e.target.value)}
            >
              {DOMAINS.map(x => (
                <option key={x} value={x}>
                  {label(x)}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label='标题'>
          <input
            required
            maxLength={160}
            value={fields.title}
            placeholder='给这段记录起一个名字…'
            onChange={e => set('title', e.target.value)}
          />
        </Field>
        {['book', 'image', 'audio'].includes(kind) && (
          <div className={s.formGrid}>
            <Field label={kind === 'book' ? '作者' : '创作者／来源'}>
              <input
                maxLength={120}
                value={fields.creator}
                onChange={e => set('creator', e.target.value)}
              />
            </Field>
            {kind === 'book' ? (
              <Field label='阅读状态'>
                <select
                  value={fields.readingStatus}
                  onChange={e => set('readingStatus', e.target.value)}
                >
                  {['wish', 'reading', 'read', 'paused'].map(x => (
                    <option key={x} value={x}>
                      {label(x)}
                    </option>
                  ))}
                </select>
              </Field>
            ) : (
              <Field label='作品归属'>
                <select
                  value={fields.ownership}
                  onChange={e => set('ownership', e.target.value)}
                >
                  <option value='collected'>收藏的作品</option>
                  <option value='own'>自己的作品</option>
                </select>
              </Field>
            )}
          </div>
        )}
        {kind === 'book' && (
          <div className={s.formGrid}>
            <Field label='版本／出版社'>
              <input
                value={fields.edition}
                maxLength={160}
                onChange={e => set('edition', e.target.value)}
              />
            </Field>
            <Field label='ISBN（选填）'>
              <input
                value={fields.isbn}
                maxLength={40}
                onChange={e => set('isbn', e.target.value)}
              />
            </Field>
          </div>
        )}
        {domain === 'dao' && (
          <Field label='核心问题'>
            <textarea
              rows={2}
              value={fields.coreQuestion}
              maxLength={500}
              onChange={e => set('coreQuestion', e.target.value)}
              placeholder='这篇文字，试图回应什么？'
            />
          </Field>
        )}
        <Field label='摘要／一句说明'>
          <textarea
            rows={2}
            maxLength={500}
            value={fields.summary}
            onChange={e => set('summary', e.target.value)}
          />
        </Field>
        <Field
          label={kind === 'journal' ? '正文' : '个人笔记／正文'}
          help='最长 48,000 字符。支持空行分段、# 标题和 > 引用；原样保留文本，不执行 HTML。'
        >
          <textarea
            className={s.writingArea}
            rows={14}
            maxLength={48000}
            value={fields.body}
            onChange={e => set('body', e.target.value)}
            placeholder='不必急着完成。先从你愿意写下的地方开始。'
          />
        </Field>
        <div className={s.formGrid}>
          <Field
            label='发生／阅读／观看时间'
            help='本地时间；系统创建时间另行保留。'
          >
            <input
              type='datetime-local'
              value={fields.occurredAt}
              onChange={e => set('occurredAt', e.target.value)}
            />
          </Field>
          <Field label='标签（逗号分隔）'>
            <input
              value={fields.tags}
              maxLength={300}
              onChange={e => set('tags', e.target.value)}
            />
          </Field>
        </div>
        <Field
          label='来源链接（选填）'
          help='填写 https 链接。这里只保存索引，不复制或上传来源文件。'
        >
          <input
            type='url'
            value={fields.sourceUrl}
            onChange={e => set('sourceUrl', e.target.value)}
          />
        </Field>
        {kind === 'book' && (
          <Field
            label='允许展示的封面链接（选填）'
            help='使用链接会向来源网站请求图片，请勿填写私人原件地址。'
          >
            <input
              type='url'
              value={fields.coverUrl}
              onChange={e => set('coverUrl', e.target.value)}
            />
          </Field>
        )}
        {kind === 'audio' && (
          <Field label='时长（选填）'>
            <input
              maxLength={80}
              value={fields.duration}
              onChange={e => set('duration', e.target.value)}
              placeholder='例如 12:30'
            />
          </Field>
        )}
        {domain === 'dao' && (
          <>
            <Field label='问题专题（选填）'>
              <input
                maxLength={120}
                value={fields.topic}
                onChange={e => set('topic', e.target.value)}
                placeholder='自由、意义、责任、关系…'
              />
            </Field>
            <Field label='引用与延伸阅读'>
              <textarea
                rows={4}
                maxLength={4000}
                value={fields.citations}
                onChange={e => set('citations', e.target.value)}
              />
            </Field>
          </>
        )}
        {domain === 'shu' && (
          <>
            <Field label='适用条件／平台版本'>
              <textarea
                rows={2}
                maxLength={1500}
                value={fields.applicability}
                onChange={e => set('applicability', e.target.value)}
              />
            </Field>
            <Field label='操作步骤'>
              <textarea
                rows={5}
                maxLength={8000}
                value={fields.steps}
                onChange={e => set('steps', e.target.value)}
              />
            </Field>
            <Field label='预期结果'>
              <textarea
                rows={2}
                maxLength={1500}
                value={fields.expectedResult}
                onChange={e => set('expectedResult', e.target.value)}
              />
            </Field>
            <div className={s.formGrid}>
              <Field label='有效状态'>
                <select
                  value={fields.toolState}
                  onChange={e => set('toolState', e.target.value)}
                >
                  {TOOL_STATES.map(x => (
                    <option key={x} value={x}>
                      {label(x)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label='最近验证时间'>
                <input
                  type='datetime-local'
                  value={fields.verifiedAt}
                  onChange={e => set('verifiedAt', e.target.value)}
                />
              </Field>
            </div>
            <Field label='已知限制'>
              <textarea
                rows={3}
                maxLength={2000}
                value={fields.limitations}
                onChange={e => set('limitations', e.target.value)}
              />
            </Field>
            <Field label='替代方案（选填）'>
              <input
                maxLength={1500}
                value={fields.alternatives}
                onChange={e => set('alternatives', e.target.value)}
                placeholder='可用的替代方案（选填）'
              />
            </Field>
          </>
        )}
        <label className={s.check}>
          <input
            type='checkbox'
            checked={fields.allowComments}
            onChange={e => set('allowComments', e.target.checked)}
          />
          公开后，允许他人提交回应；回应仍需审核。
        </label>
        <div className={s.actions}>
          <button disabled={busy}>
            {busy
              ? '正在保存…'
              : item?.publicVersion
                ? '保存新草稿'
                : '保存私密记录'}
          </button>
          <button
            type='button'
            className={s.quiet}
            onClick={() => setPreview(x => !x)}
          >
            {preview ? '收起预览' : '预览分享范围'}
          </button>
          <button
            type='button'
            className={s.quiet}
            onClick={() =>
              downloadLocal(
                JSON.stringify(
                  {
                    schema: 'ourbeings.local-draft.v1',
                    id: item?.id || null,
                    kind,
                    domain,
                    draft: fields
                  },
                  null,
                  2
                ),
                'ourbeings-local-draft.json'
              )
            }
          >
            导出当前输入
          </button>
        </div>
      </form>
      {preview && (
        <section className={s.preview}>
          <p className={s.eyebrow}>PREVIEW / 公开范围预览</p>
          <h2>{fields.title || '未题'}</h2>
          <p>{fields.summary}</p>
          <PlainBody text={fields.body} />
          <p className={s.notice}>
            提交的是最近保存的版本。将包含标题、正文、摘要、署名、标签、来源及你填写的领域说明；不包含私人账号标识、报名联系人或原始附件。请先保存当前修改，再提交。
          </p>
          {item && (
            <label className={s.check}>
              <input
                type='checkbox'
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
              />
              我愿意公开最近保存的版本，并确认有权分享这些内容。
            </label>
          )}
          <button
            disabled={busy || !item || !consent || dirty}
            onClick={async () => {
              const result = await run(
                'content.submit',
                { id: item.id, revision: item.revision },
                '已提交公开审核，草稿仍保留。'
              )
              if (result) {
                setItem(result)
                setConsent(false)
              }
            }}
          >
            提交公开审核
          </button>
        </section>
      )}
      {item && (
        <section className={s.secondary}>
          <h2>整理这条记录</h2>
          <div className={s.actions}>
            {item.publicVersion && (
              <button
                className={s.quiet}
                disabled={busy}
                onClick={async () => {
                  const result = await run(
                    'content.withdraw',
                    { id: item.id, revision: item.revision },
                    '已撤回，后续公开请求将无法读取。'
                  )
                  if (result) setItem(result)
                }}
              >
                撤回公开版本
              </button>
            )}
            <button
              className={s.quiet}
              disabled={busy}
              onClick={async () => {
                if (
                  !window.confirm(
                    '归档会撤回公开版本，记录仍可在自己的归档中找到。'
                  )
                )
                  return
                const result = await run(
                  item.archived ? 'content.restore' : 'content.archive',
                  { id: item.id, revision: item.revision },
                  item.archived ? '已恢复为私密记录。' : '已归档并撤回公开。'
                )
                if (result) setItem(result)
              }}
            >
              {item.archived ? '从归档恢复为私密' : '归档'}
            </button>
            <button
              className={s.danger}
              disabled={busy}
              onClick={async () => {
                if (
                  !window.confirm(
                    '删除将立即撤回公开版本。记录仍保留在自己的「最近删除」中，可恢复为私密。'
                  )
                )
                  return
                if (
                  await run(
                    'content.delete',
                    { id: item.id, revision: item.revision },
                    '已移至最近删除。'
                  )
                )
                  navigate('/our-beings/me')
              }}
            >
              移至最近删除
            </button>
          </div>
          {item.revisions?.length > 0 && (
            <details>
              <summary>公开版本修订记录</summary>
              {item.revisions.map(r => (
                <p key={r.number}>
                  版本 {r.number} · {displayDate(r.revisedAt)} · {r.title}
                </p>
              ))}
            </details>
          )}
        </section>
      )}
    </>
  )
}

export function SettingsPage() {
  const resource = useCommunityData('workspace', { limit: 1 })
  const { run, busy, client, actor } = useCommunity()
  const [fields, setFields] = useState(null),
    [exportError, setExportError] = useState('')
  useEffect(() => {
    if (resource.data && !fields) setFields(resource.data.profile)
  }, [resource.data, fields])
  const exportMine = async () => {
    setExportError('')
    try {
      const data = await client.query(actor, 'export')
      downloadLocal(JSON.stringify(data, null, 2), 'ourbeings-export.json')
    } catch (error) {
      setExportError(error.message)
    }
  }
  return (
    <>
      <SectionHeading
        eyebrow='SETTINGS / 选择自己的边界'
        title='把边界，写清楚'
        description='署名、介绍和分享意愿由你决定。基本阅读与活动报名不依赖打赏。'
      />
      <LoadState resource={resource}>
        {() =>
          fields && (
            <form
              className={s.editor}
              onSubmit={async e => {
                e.preventDefault()
                const result = await run('profile.save', fields, '设置已保存。')
                if (result) setFields(result.profile)
              }}
            >
              <Field label='公开署名'>
                <input
                  required
                  maxLength={60}
                  value={fields.name || ''}
                  onChange={e =>
                    setFields(x => ({ ...x, name: e.target.value }))
                  }
                />
              </Field>
              <Field label='一句介绍'>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={fields.bio || ''}
                  onChange={e =>
                    setFields(x => ({ ...x, bio: e.target.value }))
                  }
                />
              </Field>
              <label className={s.check}>
                <input
                  type='checkbox'
                  checked={fields.public === true}
                  onChange={e =>
                    setFields(x => ({ ...x, public: e.target.checked }))
                  }
                />
                开放公开主页，只展示已公开且审核通过的内容。
              </label>
              <Field
                label='自愿支持的外部链接（选填）'
                help='请使用渠道允许的本人收款或支持页面。链接经审核后显示；本站无法核验外部到账，不生成余额或提现承诺。'
              >
                <input
                  type='url'
                  value={fields.supportUrl || ''}
                  onChange={e =>
                    setFields(x => ({ ...x, supportUrl: e.target.value }))
                  }
                />
              </Field>
              <p className={s.muted}>
                支持链接状态：{label(fields.supportStatus)}
              </p>
              <label className={s.check}>
                <input
                  type='checkbox'
                  checked={fields.adsOptIn === true}
                  onChange={e =>
                    setFields(x => ({ ...x, adsOptIn: e.target.checked }))
                  }
                />
                愿意在自己的公开内容中参与明确标记的赞助试点。
              </label>
              <p className={s.muted}>
                当前没有接入广告投放或收入结算。私人工作台、编辑器与报名页面不放广告，也不将私人正文用于广告画像。
              </p>
              <button disabled={busy}>保存设置</button>
            </form>
          )
        }
      </LoadState>
      <section className={s.secondary}>
        <h2>留一份自己的副本</h2>
        <p>
          导出自己的记录、稳定
          ID、分类、来源、时间、报名状态与收藏引用。不会包含他人的私人内容或其他报名者联系方式。
        </p>
        <button className={s.quiet} onClick={exportMine}>
          导出我的数据 JSON ↓
        </button>
        {exportError && <p role='alert'>{exportError}</p>}
        <div className={s.actions}>
          <AppLink href='/our-beings/app/trash'>最近删除 ↗</AppLink>
          <AppLink href='/our-beings/app/legacy'>原档案与生命钟 ↗</AppLink>
          <AppLink href='/our-beings/app/policies'>使用与隐私说明 ↗</AppLink>
        </div>
      </section>
    </>
  )
}

export function PersonalRecords({ type }) {
  const queryType = {
    notifications: 'notifications',
    bookmarks: 'bookmarks',
    registrations: 'my-registrations',
    'my-events': 'my-events',
    'my-exchanges': 'my-exchanges'
  }[type]
  const resource = useCommunityData(queryType)
  const { run, busy } = useCommunity()
  const titles = {
    notifications: '站内来信',
    bookmarks: '留住有回声的文字',
    registrations: '我的报名',
    'my-events': '我发起的共读',
    'my-exchanges': '我的交换'
  }
  return (
    <>
      <SectionHeading
        eyebrow='MY RECORDS / 让事情有个着落'
        title={titles[type]}
        action={
          type === 'my-events' ? (
            <AppLink className={s.button} href='/our-beings/app/create-event'>
              发起共读 ＋
            </AppLink>
          ) : type === 'my-exchanges' ? (
            <AppLink className={s.button} href='/our-beings/app/new-exchange'>
              发布交换 ＋
            </AppLink>
          ) : null
        }
      />
      <LoadState resource={resource}>
        {data =>
          !data.items.length ? (
            <Empty>
              <p>这里暂时还没有记录。</p>
              <AppLink href='/our-beings/app/events'>去看看阅读活动 ↗</AppLink>
            </Empty>
          ) : (
            <div className={s.list}>
              {type === 'notifications' && (
                <button
                  className={s.quiet}
                  disabled={busy}
                  onClick={() =>
                    run('notifications.read', {}, '来信已标为已读。')
                  }
                >
                  全部标为已读
                </button>
              )}
              {data.items.map(item => (
                <article className={s.listRow} key={item.id}>
                  <div>
                    {type === 'notifications' ? (
                      <>
                        <small>
                          {displayDate(item.at)} · {item.read ? '已读' : '未读'}
                        </small>
                        <AppLink href={item.href}>
                          <h3>{item.message}</h3>
                        </AppLink>
                      </>
                    ) : type === 'bookmarks' ? (
                      item.content ? (
                        <>
                          <p className={s.meta}>
                            收藏于 {displayDate(item.savedAt)}
                          </p>
                          <AppLink href={item.content.href}>
                            <h3>{item.content.title}</h3>
                          </AppLink>
                        </>
                      ) : (
                        <>
                          <h3>这篇内容已撤回或暂不可读</h3>
                          <p>收藏保留原引用，不展示已撤回的标题与正文。</p>
                        </>
                      )
                    ) : type === 'registrations' ? (
                      <>
                        <AppLink href={item.href}>
                          <h3>{item.title}</h3>
                        </AppLink>
                        <p>
                          {displayDate(item.startAt, 'Asia/Shanghai', true)} ·{' '}
                          {label(item.status)}
                          {item.cancelledAt ? ' · 活动已取消' : ''}
                        </p>
                      </>
                    ) : type === 'my-events' ? (
                      <>
                        <AppLink href={`/our-beings/app/event-edit/${item.id}`}>
                          <h3>{item.draft.title}</h3>
                        </AppLink>
                        <PublicationState item={item} />
                        <AppLink href={`/our-beings/app/manage/${item.id}`}>
                          查看报名与联系人 ↗
                        </AppLink>
                      </>
                    ) : (
                      <>
                        <AppLink href={`/our-beings/app/exchanges/${item.id}`}>
                          <h3>{item.draft.title}</h3>
                        </AppLink>
                        <p>
                          {label(item.dealStatus)} · {label(item.status)}
                        </p>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )
        }
      </LoadState>
    </>
  )
}

export function ReviewPage() {
  const resource = useCommunityData('review')
  const { run, busy } = useCommunity()
  return (
    <>
      <SectionHeading
        eyebrow='PUBLIC REVIEW / 守住分享的边界'
        title='公开版本审核'
        description='这里只显示主动提交的公开版本、支持链接、待审核回应与公开反馈。管理身份不提供私人草稿浏览入口。'
      />
      <LoadState resource={resource}>
        {data => (
          <div className={s.stack}>
            {!data.items.length && <Empty title='暂时没有待审核的公开版本' />}
            {data.items.map(item => (
              <article className={s.card} key={`${item.kind}-${item.id}`}>
                <p className={s.eyebrow}>
                  {item.kind === 'contents'
                    ? '内容'
                    : item.kind === 'events'
                      ? '活动'
                      : item.kind === 'support'
                        ? '外部支持链接'
                        : '交换'}{' '}
                  · {item.author?.name || ''}
                </p>
                <h2>{item.submission.title}</h2>
                {item.submission.sourceUrl && (
                  <a
                    href={item.submission.sourceUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    查看外部支持页面 ↗
                  </a>
                )}
                <PlainBody
                  text={
                    item.submission.body ||
                    item.submission.description ||
                    item.submission.offered ||
                    ''
                  }
                />
                <details>
                  <summary>查看本次提交字段</summary>
                  <pre className={s.json}>
                    {JSON.stringify(item.submission, null, 2)}
                  </pre>
                </details>
                <div className={s.actions}>
                  <button
                    disabled={busy}
                    onClick={() =>
                      run(
                        'review.decide',
                        {
                          kind: item.kind,
                          id: item.id,
                          revision: item.revision,
                          approve: true
                        },
                        '审核结果已保存。'
                      )
                    }
                  >
                    通过本次公开版本
                  </button>
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      run(
                        'review.decide',
                        {
                          kind: item.kind,
                          id: item.id,
                          revision: item.revision,
                          approve: false,
                          reason: e.currentTarget.elements.reason.value
                        },
                        '修改说明已发送给作者。'
                      )
                    }}
                  >
                    <input
                      name='reason'
                      aria-label='修改说明'
                      placeholder='指出需要修改的具体地方…'
                      required
                      maxLength={500}
                    />
                    <button className={s.quiet} disabled={busy}>
                      请作者修改
                    </button>
                  </form>
                </div>
              </article>
            ))}
            {data.comments?.map(c => (
              <article className={s.card} key={c.id}>
                <h2>待审核回应</h2>
                <p>{c.body}</p>
                <div className={s.actions}>
                  <button
                    disabled={busy}
                    onClick={() =>
                      run(
                        'review.comment',
                        { id: c.id, approve: true },
                        '回应已通过。'
                      )
                    }
                  >
                    通过
                  </button>
                  <button
                    className={s.quiet}
                    disabled={busy}
                    onClick={() =>
                      run(
                        'review.comment',
                        { id: c.id, approve: false },
                        '回应未公开。'
                      )
                    }
                  >
                    不公开
                  </button>
                </div>
              </article>
            ))}
            {data.reports?.map(report => (
              <article className={s.card} key={report.id}>
                <h2>
                  公开内容反馈 ·{' '}
                  {report.status === 'open' ? '待处理' : '已处理'}
                </h2>
                <p>{report.reason}</p>
                {report.status === 'open' && (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      run(
                        'review.report',
                        {
                          id: report.id,
                          reason: e.currentTarget.elements.reason.value,
                          withdraw: e.currentTarget.elements.withdraw.checked
                        },
                        '处理结果已保存并通知反馈者。'
                      )
                    }}
                  >
                    <Field label='处理说明'>
                      <textarea
                        name='reason'
                        required
                        maxLength={500}
                        rows={3}
                      />
                    </Field>
                    <label className={s.check}>
                      <input name='withdraw' type='checkbox' />
                      同时撤回相关公开版本
                    </label>
                    <button disabled={busy}>保存处理结果</button>
                  </form>
                )}
                {report.resolution && <p>{report.resolution}</p>}
              </article>
            ))}
          </div>
        )}
      </LoadState>
    </>
  )
}
