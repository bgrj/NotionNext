import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { authHref } from '@/lib/beings/authNavigation'
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
  ReportButton,
  SectionHeading
} from './Shared'
import { instantFromWall } from '@/lib/beings/community/localTools'
import s from './Community.module.css'

export function ReadingCatalog({ domain, publicHub, showEvents = false }) {
  const [view, setView] = useState(showEvents ? 'events' : 'posts'),
    [filter, setFilter] = useState(domain || ''),
    [query, setQuery] = useState(''),
    [offset, setOffset] = useState(0),
    [history, setHistory] = useState(false)
  const resource = useCommunityData(view === 'events' ? 'events' : 'feed', {
    domain: filter || undefined,
    q: query,
    offset,
    history: history ? '1' : '0'
  })
  const localItems =
    (view === 'events' ? publicHub?.events : publicHub?.posts) || []
  const curated =
    offset === 0
      ? localItems.filter(
          x =>
            (!filter || x.domain === filter) &&
            (!query ||
              `${x.title} ${x.summary}`
                .toLowerCase()
                .includes(query.toLowerCase()))
        )
      : []
  const title = showEvents
    ? '我们的存在'
    : domain === 'dao'
      ? '把问题，想深一点'
      : '让经验，可以再用'
  return (
    <>
      <SectionHeading
        eyebrow={
          showEvents
            ? 'OUR BEINGS / 一个人，也与世界共在'
            : domain === 'dao'
              ? 'DAO / QUESTIONS THAT STAY'
              : 'SHU / WAYS THAT WORK'
        }
        title={title}
        description={
          showEvents
            ? '一起读，也一起想。让一个人的思考，成为我们可以进入的世界。'
            : domain === 'dao'
              ? '关于人、自由、责任与意义。让问题跨过一时一刻，也容许答案继续生长。'
              : '具体的任务，清楚的方法。知道它何时有用，也知道它何时该退场。'
        }
        action={
          <AppLink
            className={s.button}
            href={
              showEvents
                ? '/our-beings/app/create-event'
                : `/our-beings/app/new?kind=${domain === 'dao' ? 'essay' : 'resource'}&domain=${domain || 'existence'}`
            }
          >
            {showEvents ? '发起一场共读 ↗' : '写下自己的思考 ↗'}
          </AppLink>
        }
      />
      {showEvents && (
        <div className={s.interlude}>
          <span aria-hidden='true'>✳</span>
          <p>世界已经够快了，这里允许逗留。</p>
          <AppLink href='/our-beings/me'>回到我的存在 ↗</AppLink>
        </div>
      )}
      <div className={s.controls}>
        {showEvents && (
          <nav className={s.tabs} aria-label='浏览我们的存在'>
            <button
              aria-pressed={view === 'events'}
              onClick={() => {
                setView('events')
                setOffset(0)
              }}
            >
              阅读活动
            </button>
            <button
              aria-pressed={view === 'posts'}
              onClick={() => {
                setView('posts')
                setOffset(0)
              }}
            >
              公开内容
            </button>
          </nav>
        )}
        <form
          className={s.search}
          onSubmit={e => {
            e.preventDefault()
            setQuery(e.currentTarget.elements.q.value)
            setOffset(0)
          }}
        >
          <input
            type='search'
            name='q'
            aria-label='搜索公开内容'
            placeholder={view === 'events' ? '寻找一场共读…' : '寻找一个问题…'}
          />
          <button className={s.quiet}>查找</button>
        </form>
      </div>
      {showEvents && view === 'posts' && (
        <div className={s.filters} role='group' aria-label='内容领域'>
          {[
            ['', '全部'],
            ['existence', '生命记录与四馆'],
            ['dao', '道'],
            ['shu', '术']
          ].map(([id, name]) => (
            <button
              key={id}
              className={s.tab}
              aria-pressed={filter === id}
              onClick={() => {
                setFilter(id)
                setOffset(0)
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      {view === 'events' && (
        <button
          className={s.tab}
          aria-pressed={history}
          onClick={() => {
            setHistory(x => !x)
            setOffset(0)
          }}
        >
          {history ? '正在看历史活动' : '查看历史活动'}
        </button>
      )}
      {domain === 'shu' && (
        <div className={s.callout}>
          <div>
            <p className={s.eyebrow}>LOCAL TOOLS / 私人文件，留在本地</p>
            <h2>把聊天整理好，把一帧留下来。</h2>
            <p>聊天导出整理与本地视频截图，可直接在浏览器使用。</p>
          </div>
          <AppLink className={s.button} href='/our-beings/app/tools'>
            打开工具室 ↗
          </AppLink>
        </div>
      )}
      <LoadState resource={resource}>
        {data => (
          <>
            {!data.items.length && !curated.length ? (
              <Empty
                title={
                  view === 'events'
                    ? '下一次相遇，还没有定下时间'
                    : '这里，等待一段愿意公开的文字'
                }
              >
                <p>
                  {view === 'events'
                    ? '公开活动会写清时间、材料与参与方式。也可以先发起你想参加的那一场。'
                    : '私人草稿不会出现在这里。作者主动提交并通过审核后，才进入公开阅读。'}
                </p>
                <AppLink href='/our-beings/app/demo'>
                  先走一遍示例导览 ↗
                </AppLink>
              </Empty>
            ) : (
              <div className={s.list}>
                {data.items.map(item =>
                  view === 'events' ? (
                    <EventRow key={item.id} item={item} />
                  ) : (
                    <ReadingRow item={item} key={item.id} />
                  )
                )}
                {curated.map(item => (
                  <article className={s.listRow} key={`notion-${item.id}`}>
                    <div>
                      <p className={s.meta}>
                        {item.label} ·{' '}
                        {view === 'events'
                          ? `介绍发布于 ${item.date || '未标日期'}`
                          : item.date}
                      </p>
                      <Link href={item.href}>
                        <h2>{item.title}</h2>
                      </Link>
                      <p>{item.summary}</p>
                    </div>
                    <Link
                      className={s.rowArrow}
                      href={item.href}
                      aria-label={`阅读 ${item.title}`}
                    >
                      ↗
                    </Link>
                  </article>
                ))}
              </div>
            )}
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
                  接着读 ↓
                </button>
              )}
            </div>
          </>
        )}
      </LoadState>
      <p className={s.footnote}>
        主动公开，才在这里相遇。收藏保留原引用；每一次修订与撤回，都继续尊重作者的选择。
      </p>
    </>
  )
}

export function ReadingRow({ item }) {
  return (
    <article className={s.listRow}>
      <div>
        <p className={s.meta}>
          {label(item.domain)} · {item.author?.name} ·{' '}
          {displayDate(item.publishedAt)}
          {item.domain === 'shu' ? ` · ${label(item.toolState)}` : ''}
        </p>
        <AppLink href={item.href}>
          <h2>{item.title}</h2>
        </AppLink>
        <p>{item.summary}</p>
        <p className={s.muted}>{item.tags?.join(' / ')}</p>
      </div>
      <AppLink
        className={s.rowArrow}
        href={item.href}
        aria-label={`阅读 ${item.title}`}
      >
        ↗
      </AppLink>
    </article>
  )
}
export function EventRow({ item }) {
  return (
    <article className={s.listRow}>
      <div>
        <p className={s.meta}>
          {item.format === 'online' ? '线上共读' : item.city} ·{' '}
          {label(item.progress)} · {label(item.registrationWindow)}
        </p>
        <AppLink href={item.href}>
          <h2>{item.title}</h2>
        </AppLink>
        <p>{item.description?.slice(0, 180)}</p>
        <p className={s.muted}>
          {displayDate(item.startAt, item.timezone, true)} · {item.timezone} ·{' '}
          {item.count} / {item.capacity} 人
        </p>
      </div>
      <AppLink
        className={s.rowArrow}
        href={item.href}
        aria-label={`查看 ${item.title}`}
      >
        ↗
      </AppLink>
    </article>
  )
}

export function ReaderPage({ id }) {
  const resource = useCommunityData('reading', { id })
  const { actor, run, busy } = useCommunity()
  const [large, setLarge] = useState(false),
    [soft, setSoft] = useState(true)
  return (
    <LoadState resource={resource}>
      {data => (
        <article
          className={`${s.reader} ${large ? s.largeType : ''} ${soft ? s.softPaper : ''}`}
        >
          <div className={s.readerToolbar}>
            <AppLink
              href={
                data.domain === 'dao'
                  ? '/category/道'
                  : data.domain === 'shu'
                    ? '/category/术'
                    : '/our-beings'
              }
            >
              ← 回到阅读
            </AppLink>
            <div>
              <button
                className={s.quiet}
                aria-pressed={large}
                onClick={() => setLarge(x => !x)}
              >
                字号 {large ? 'A−' : 'A＋'}
              </button>
              <button
                className={s.quiet}
                aria-pressed={soft}
                onClick={() => setSoft(x => !x)}
              >
                阅读底色
              </button>
            </div>
          </div>
          <p className={s.eyebrow}>
            {label(data.domain)} / {data.topic || '留一点回声'}
          </p>
          <h1 id='community-title'>{data.title}</h1>
          <p className={s.meta}>
            {data.author.name} · 发布 {displayDate(data.publishedAt)} · 修订{' '}
            {displayDate(data.updatedAt)} · 版本 {data.number || 1}
          </p>
          {data.coreQuestion && (
            <blockquote className={s.question}>{data.coreQuestion}</blockquote>
          )}
          {data.summary && <p className={s.readerSummary}>{data.summary}</p>}
          <PlainBody text={data.body || ''} />
          {data.creator && (
            <p>
              创作者：{data.creator}
              {data.edition ? ` · ${data.edition}` : ''}
            </p>
          )}
          {data.domain === 'shu' && (
            <section className={s.method}>
              <p className={s.badge}>
                {label(data.toolState)} ·{' '}
                {data.verifiedAt
                  ? `验证于 ${displayDate(data.verifiedAt)}`
                  : '尚无验证日期'}
              </p>
              {[
                ['applicability', '适用条件'],
                ['steps', '操作步骤'],
                ['expectedResult', '预期结果'],
                ['limitations', '限制'],
                ['alternatives', '替代方案']
              ].map(
                ([key, name]) =>
                  data[key] && (
                    <div key={key}>
                      <h2>{name}</h2>
                      <PlainBody text={data[key]} />
                    </div>
                  )
              )}
            </section>
          )}
          {data.citations && (
            <section className={s.secondary}>
              <h2>引用与延伸阅读</h2>
              <PlainBody text={data.citations} />
            </section>
          )}
          {data.sourceUrl && (
            <a
              className={s.textLink}
              href={data.sourceUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              查看外部来源 ↗
            </a>
          )}
          <div className={s.readerEnd}>— 让问题，继续生长 —</div>
          <div className={s.actions}>
            {actor && (
              <button
                disabled={busy}
                onClick={() =>
                  run(
                    'bookmark.toggle',
                    { id },
                    '收藏状态已更新，可在「我的收藏」中查看。'
                  )
                }
              >
                收藏／取消收藏
              </button>
            )}
            <button
              className={s.quiet}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href)
                  window.alert('阅读链接已复制。')
                } catch {
                  window.prompt('复制这个阅读链接：', window.location.href)
                }
              }}
            >
              复制阅读链接 ↗
            </button>
          </div>
          {data.support && (
            <aside className={s.support}>
              <h2>愿意的话，支持 {data.support.name}</h2>
              <p>
                这是一份自愿的心意，不影响基本阅读或报名。外部渠道结果无法由本站自动核验，本站不显示余额或提现承诺。
              </p>
              <a
                href={data.support.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                前往对方的外部支持页面 ↗
              </a>
            </aside>
          )}
          {data.related?.length > 0 && (
            <section className={s.secondary}>
              <h2>相关的公开笔记</h2>
              {data.related.map(item => (
                <ReadingRow item={item} key={item.id} />
              ))}
            </section>
          )}
          {data.allowComments && (
            <section className={s.secondary}>
              <h2>有边界的回应</h2>
              {data.comments?.length ? (
                data.comments.map(c => (
                  <article className={s.comment} key={c.id}>
                    <small>
                      {c.author.name} · {displayDate(c.at)}
                    </small>
                    <p>{c.body}</p>
                  </article>
                ))
              ) : (
                <p>暂时没有公开回应。</p>
              )}
              {actor ? (
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    const form = e.currentTarget
                    if (
                      await run(
                        'comment.create',
                        { id, body: form.elements.body.value },
                        '回应已提交审核。'
                      )
                    )
                      form.reset()
                  }}
                >
                  <Field label='写下一句具体的回应'>
                    <textarea name='body' rows={3} maxLength={1000} required />
                  </Field>
                  <button disabled={busy}>提交回应</button>
                </form>
              ) : (
                <p>登录后可以提交回应。</p>
              )}
            </section>
          )}
          <ReportButton id={id} />
        </article>
      )}
    </LoadState>
  )
}

const timeField = value => {
  if (!value) return ''
  const d = new Date(value)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)
}
const eventEmpty = {
  title: '',
  description: '',
  format: 'online',
  startAt: '',
  endAt: '',
  deadlineAt: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Shanghai',
  capacity: 12,
  city: '',
  location: '',
  materials: '',
  participation: '',
  meetingInfo: ''
}
export function EventEditor({ id }) {
  const resource = useCommunityData('event-draft', { id }, Boolean(id))
  const { run, busy, navigate } = useCommunity()
  const [item, setItem] = useState(null),
    [fields, setFields] = useState(eventEmpty),
    [consent, setConsent] = useState(false),
    [localError, setLocalError] = useState(''),
    [dirty, setDirty] = useState(false)
  useEffect(() => {
    if (resource.data && !item) {
      const next = { ...eventEmpty, ...resource.data.draft }
      for (const key of ['startAt', 'endAt', 'deadlineAt'])
        next[key] = wallForZone(next[key], next.timezone)
      setItem(resource.data)
      setFields(next)
    }
  }, [resource.data, item])
  const set = (key, value) => {
    setFields(x => ({ ...x, [key]: value }))
    setConsent(false)
    setDirty(true)
  }
  const save = async e => {
    e.preventDefault()
    setLocalError('')
    try {
      const input = { ...fields, capacity: Number(fields.capacity) }
      for (const key of ['startAt', 'endAt', 'deadlineAt'])
        input[key] = fields[key]
          ? instantFromWall(fields[key], fields.timezone)
          : ''
      const result = await run(
        id ? 'event.save' : 'event.create',
        { ...input, ...(id ? { id, revision: item.revision } : {}) },
        '活动草稿已保存。'
      )
      if (result) {
        setItem(result)
        setDirty(false)
        if (!id) navigate(`/our-beings/app/event-edit/${result.id}`)
      }
    } catch (error) {
      setLocalError(error.message)
    }
  }
  if (id && !item)
    return (
      <LoadState resource={resource}>
        {() => <p>正在准备活动草稿…</p>}
      </LoadState>
    )
  return (
    <>
      <SectionHeading
        eyebrow='READ TOGETHER / 把相遇安排好'
        title={id ? '继续安排这场共读' : '发起一场共读'}
        description='先保存草稿，再预览并提交公开。首版免费报名；私人会议信息在确认报名后提供。'
      />
      {item && <PublicationState item={item} />}
      <form className={s.editor} onSubmit={save}>
        <Field label='活动标题'>
          <input
            value={fields.title}
            maxLength={160}
            required
            onChange={e => set('title', e.target.value)}
          />
        </Field>
        <div className={s.formGrid}>
          <Field label='形式'>
            <select
              value={fields.format}
              onChange={e => set('format', e.target.value)}
            >
              <option value='online'>线上共读</option>
              <option value='offline'>线下共读</option>
            </select>
          </Field>
          <Field
            label='活动时区'
            help='下方日期时间按这个时区解释，并转换为完整时间戳保存。'
          >
            <select
              value={fields.timezone}
              onChange={e => set('timezone', e.target.value)}
            >
              {[
                ...new Set([
                  fields.timezone,
                  'Asia/Shanghai',
                  'UTC',
                  'Asia/Tokyo',
                  'Europe/London',
                  'America/New_York'
                ])
              ].map(zone => (
                <option key={zone}>{zone}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className={s.formGrid}>
          {[
            ['startAt', '开始时间'],
            ['endAt', '结束时间'],
            ['deadlineAt', '报名截止']
          ].map(([key, name]) => (
            <Field key={key} label={name}>
              <input
                type='datetime-local'
                value={fields[key]}
                onChange={e => set(key, e.target.value)}
              />
            </Field>
          ))}
          <Field label='人数上限（1～200）'>
            <input
              type='number'
              min={1}
              max={200}
              step={1}
              value={fields.capacity}
              onChange={e => set('capacity', e.target.value)}
            />
          </Field>
        </div>
        <Field label='活动介绍'>
          <textarea
            rows={6}
            maxLength={10000}
            value={fields.description}
            onChange={e => set('description', e.target.value)}
          />
        </Field>
        <Field label='阅读材料／章节／来源说明'>
          <textarea
            rows={3}
            maxLength={3000}
            value={fields.materials}
            onChange={e => set('materials', e.target.value)}
          />
        </Field>
        {fields.format === 'offline' && (
          <div className={s.formGrid}>
            <Field label='城市'>
              <input
                value={fields.city}
                onChange={e => set('city', e.target.value)}
              />
            </Field>
            <Field
              label='公开地点说明'
              help='精确会面信息可放入仅确认报名后可见的字段。'
            >
              <input
                value={fields.location}
                onChange={e => set('location', e.target.value)}
              />
            </Field>
          </div>
        )}
        <Field label='参与说明'>
          <textarea
            rows={3}
            maxLength={3000}
            value={fields.participation}
            onChange={e => set('participation', e.target.value)}
            placeholder='如何准备、活动语言、讨论边界、取消方式…'
          />
        </Field>
        <Field
          label='报名后信息'
          help='会议链接、访问口令或精确会面说明；随本次活动提交审核，通过后只对组织者与确认报名者可见。'
        >
          <textarea
            rows={3}
            maxLength={1500}
            value={fields.meetingInfo}
            onChange={e => set('meetingInfo', e.target.value)}
          />
        </Field>
        {localError && (
          <p className={s.error} role='alert'>
            {localError}
          </p>
        )}
        <button disabled={busy}>{busy ? '正在保存…' : '保存活动草稿'}</button>
      </form>
      {item && (
        <section className={s.preview}>
          <p className={s.eyebrow}>PUBLIC PREVIEW / 最近保存的版本</p>
          <h2>{item.draft.title}</h2>
          <p>{item.draft.description}</p>
          <p>
            {displayDate(item.draft.startAt, item.draft.timezone, true)} —{' '}
            {displayDate(item.draft.endAt, item.draft.timezone, true)} ·{' '}
            {item.draft.timezone}
          </p>
          <p>
            报名截止：
            {displayDate(item.draft.deadlineAt, item.draft.timezone, true)} ·
            上限 {item.draft.capacity} 人
          </p>
          <p>
            公开材料与说明：{item.draft.materials} {item.draft.participation}
          </p>
          <p className={s.muted}>
            报名后信息不会出现在公开列表或未报名者的详情响应中。
          </p>
          <label className={s.check}>
            <input
              type='checkbox'
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
            />
            我确认最近保存的安排，可提交公开审核。
          </label>
          <div className={s.actions}>
            <button
              disabled={busy || !consent || dirty}
              onClick={async () => {
                const result = await run(
                  'event.submit',
                  { id: item.id, revision: item.revision },
                  '活动已提交审核。'
                )
                if (result) {
                  setItem(result)
                  setConsent(false)
                }
              }}
            >
              提交公开审核
            </button>
            <AppLink href={`/our-beings/app/manage/${item.id}`}>
              报名与管理 ↗
            </AppLink>
          </div>
          {dirty && <p className={s.error}>请先保存刚才的修改，再提交。</p>}
          {item.publicVersion && (
            <div className={s.actions}>
              <button
                className={s.quiet}
                disabled={busy}
                onClick={async () => {
                  if (
                    !window.confirm(
                      '撤回后，公开页无法继续访问；已报名者会收到站内通知。'
                    )
                  )
                    return
                  const result = await run(
                    'event.withdraw',
                    { id: item.id, revision: item.revision },
                    '活动已撤回。'
                  )
                  if (result) setItem(result)
                }}
              >
                撤回公开
              </button>
              <button
                className={s.danger}
                disabled={busy || item.cancelledAt}
                onClick={async () => {
                  const reason =
                    window.prompt('请写下取消原因，已报名者会收到通知。')
                  if (!reason) return
                  const result = await run(
                    'event.cancel',
                    { id: item.id, revision: item.revision, reason },
                    '活动已取消，站内通知已记录。'
                  )
                  if (result) setItem(result)
                }}
              >
                取消活动
              </button>
            </div>
          )}
        </section>
      )}
    </>
  )
}
function wallForZone(value, timeZone) {
  if (!value) return ''
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date(value))
  const p = Object.fromEntries(parts.map(x => [x.type, x.value]))
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`
}

export function EventPage({ id }) {
  const resource = useCommunityData('event', { id })
  const { actor, run, busy } = useCommunity()
  const router = useRouter()
  const [contact, setContact] = useState(''),
    [consent, setConsent] = useState(false)
  return (
    <LoadState resource={resource}>
      {data => (
        <>
          <SectionHeading
            eyebrow={`${data.format === 'online' ? 'ONLINE' : 'OFFLINE'} / READ TOGETHER`}
            title={data.title}
            description={data.author.name}
          />
          <div className={s.eventLayout}>
            <article>
              <p className={s.badge}>{label(data.progress)}</p>
              <PlainBody text={data.description} />
              <section className={s.secondary}>
                <h2>一起读什么</h2>
                <PlainBody text={data.materials} />
                <h2>参与说明</h2>
                <PlainBody text={data.participation} />
                {data.location && (
                  <p>
                    公开地点：{data.city} · {data.location}
                  </p>
                )}
              </section>
              {data.changes?.map((c, i) => (
                <p className={s.notice} key={i}>
                  {displayDate(c.at)} · {c.message}
                </p>
              ))}
              <ReportButton id={id} />
            </article>
            <aside className={s.eventAside}>
              <p className={s.eyebrow}>THE ARRANGEMENT / 安排</p>
              <dl>
                <dt>开始</dt>
                <dd>{displayDate(data.startAt, data.timezone, true)}</dd>
                <dt>结束</dt>
                <dd>{displayDate(data.endAt, data.timezone, true)}</dd>
                <dt>时区</dt>
                <dd>{data.timezone}</dd>
                <dt>报名截止</dt>
                <dd>{displayDate(data.deadlineAt, data.timezone, true)}</dd>
                <dt>名额</dt>
                <dd>
                  {data.count} / {data.capacity} 人 ·{' '}
                  {label(data.registrationWindow)}
                </dd>
                <dt>费用</dt>
                <dd>免费；自愿支持独立于报名</dd>
              </dl>
              {data.myRegistration?.status === 'confirmed' ? (
                <>
                  <p className={s.notice} role='status'>
                    你的报名已确认。
                  </p>
                  {data.meetingInfo && (
                    <div className={s.privateInfo}>
                      <h3>报名后信息</h3>
                      <PlainBody text={data.meetingInfo} />
                    </div>
                  )}
                  <button
                    className={s.quiet}
                    disabled={busy}
                    onClick={() => {
                      if (window.confirm('确认取消这场活动的报名？'))
                        run('registration.cancel', { id }, '报名已取消。')
                    }}
                  >
                    取消我的报名
                  </button>
                </>
              ) : data.registrationWindow === 'open' ? (
                actor ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      run(
                        'registration.join',
                        { id, contact },
                        '报名已确认，可查看报名后信息。'
                      )
                    }}
                  >
                    <Field
                      label='必要联系信息'
                      help='仅你与活动组织者可见。功能导览请填写虚构信息。'
                    >
                      <input
                        value={contact}
                        maxLength={160}
                        required
                        onChange={e => setContact(e.target.value)}
                      />
                    </Field>
                    <label className={s.check}>
                      <input
                        type='checkbox'
                        checked={consent}
                        onChange={e => setConsent(e.target.checked)}
                      />
                      我已阅读安排与参与说明。
                    </label>
                    <button disabled={busy || !consent}>确认免费报名</button>
                  </form>
                ) : (
                  <Link
                    className={s.button}
                    href={authHref('in', router.asPath)}
                  >
                    登录后报名 ↗
                  </Link>
                )
              ) : (
                <p>当前{label(data.registrationWindow)}，请留意后续活动。</p>
              )}
              {data.isOrganizer && (
                <div className={s.actions}>
                  <AppLink href={`/our-beings/app/event-edit/${id}`}>
                    编辑安排 ↗
                  </AppLink>
                  <AppLink href={`/our-beings/app/manage/${id}`}>
                    管理报名 ↗
                  </AppLink>
                </div>
              )}
            </aside>
          </div>
        </>
      )}
    </LoadState>
  )
}

export function ManageEvent({ id }) {
  const resource = useCommunityData('registrations', { id })
  return (
    <>
      <SectionHeading
        eyebrow='ORGANIZER / 为相遇留一份秩序'
        title='报名与联系人'
        description='这份资料只供本场活动的组织者使用。公开列表不会展示报名联系方式。'
      />
      <LoadState resource={resource}>
        {data => (
          <>
            <h2>{data.event.title}</h2>
            <AppLink href={`/our-beings/app/event-edit/${id}`}>
              返回活动编辑 ↗
            </AppLink>
            {data.items.length ? (
              <div className={s.list}>
                {data.items.map((r, i) => (
                  <article className={s.listRow} key={r.userId}>
                    <div>
                      <p className={s.meta}>
                        报名 {i + 1} · {label(r.status)} ·{' '}
                        {displayDate(r.confirmedAt)}
                      </p>
                      <h3>{r.name}</h3>
                      <p className={s.privateInfo}>
                        {r.contact || '已取消，联系人已移除'}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <Empty title='还没有报名记录' />
            )}
          </>
        )}
      </LoadState>
    </>
  )
}

export function ExchangesPage() {
  const resource = useCommunityData('exchanges')
  return (
    <>
      <SectionHeading
        eyebrow='EXCHANGE / 让一本书继续旅行'
        title='物与物之间，也有相遇'
        description='写清你提供什么、想换什么，再慢慢谈妥交付。本站记录约定，不提供物品鉴定、支付托管或担保。'
        action={
          <AppLink className={s.button} href='/our-beings/app/new-exchange'>
            写下交换愿望 ＋
          </AppLink>
        }
      />
      <LoadState resource={resource}>
        {data =>
          data.items.length ? (
            <div className={s.list}>
              {data.items.map(x => (
                <article className={s.listRow} key={x.id}>
                  <div>
                    <p className={s.meta}>
                      {x.city} · {label(x.status)} · {x.author.name}
                    </p>
                    <AppLink href={x.href}>
                      <h2>{x.title}</h2>
                    </AppLink>
                    <p>提供：{x.offered}</p>
                    <p>希望换得：{x.wanted}</p>
                  </div>
                  <AppLink className={s.rowArrow} href={x.href}>
                    ↗
                  </AppLink>
                </article>
              ))}
            </div>
          ) : (
            <Empty>
              <p>先从清楚、可交付的一件物品开始。</p>
            </Empty>
          )
        }
      </LoadState>
    </>
  )
}

export function NewExchange() {
  const { run, busy, navigate } = useCommunity()
  return (
    <>
      <SectionHeading
        eyebrow='A FAIR EXCHANGE / 把约定说清楚'
        title='写下交换的愿望'
        description='先试点书籍等可交付物品。请勿在公开描述中写入详细住址或私人联系方式。'
      />
      <form
        className={s.editor}
        onSubmit={async e => {
          e.preventDefault()
          const form = e.currentTarget
          const input = Object.fromEntries(new FormData(form))
          const result = await run(
            'exchange.create',
            input,
            '交换条目已提交公开审核。'
          )
          if (result) navigate('/our-beings/app/my-exchanges')
        }}
      >
        {[
          ['title', '标题'],
          ['offered', '我提供的物品与数量'],
          ['wanted', '希望换得什么'],
          ['condition', '成色与具体情况'],
          ['city', '城市'],
          ['delivery', '交付方式'],
          ['shipping', '运费由谁承担']
        ].map(([key, name]) => (
          <Field key={key} label={name}>
            {key === 'title' || key === 'city' ? (
              <input
                name={key}
                maxLength={key === 'title' ? 160 : 1000}
                required
              />
            ) : (
              <textarea name={key} rows={2} maxLength={1000} required />
            )}
          </Field>
        ))}
        <button disabled={busy}>提交公开审核</button>
      </form>
    </>
  )
}

export function ExchangePage({ id }) {
  const resource = useCommunityData('exchange', { id })
  const { actor, run, busy } = useCommunity()
  return (
    <LoadState resource={resource}>
      {data => (
        <>
          <SectionHeading
            eyebrow='EXCHANGE / 一项可以回看的约定'
            title={data.title}
            description={`${data.author.name} · ${label(data.status)}`}
          />
          <div className={s.twoColumns}>
            <section className={s.card}>
              <h2>提供什么</h2>
              <PlainBody text={data.offered} />
              <p>成色：{data.condition}</p>
              <p>城市：{data.city}</p>
            </section>
            <section className={s.card}>
              <h2>希望换得什么</h2>
              <PlainBody text={data.wanted} />
              <p>交付：{data.delivery}</p>
              <p>运费：{data.shipping}</p>
            </section>
          </div>
          {data.deal ? (
            <section className={s.card}>
              <p className={s.eyebrow}>AGREEMENT SNAPSHOT / 双方约定</p>
              <h2>对方的提议</h2>
              <PlainBody text={data.deal.offered} />
              <p>{data.deal.note}</p>
              <details>
                <summary>查看不可随意改写的原约定</summary>
                <p>
                  {data.deal.snapshot.offered} ⇄ {data.deal.snapshot.wanted}
                </p>
                <p>
                  {data.deal.snapshot.condition} · {data.deal.snapshot.delivery}{' '}
                  · {data.deal.snapshot.shipping}
                </p>
              </details>
              {data.deal.acceptedBy.length >= 2 && (
                <div className={s.privateInfo}>
                  <h3>双方同意后的联系信息</h3>
                  {Object.values(data.deal.contacts || {}).map((c, i) => (
                    <p key={i}>
                      {c || '对方暂未填写，可通过已有约定渠道联系。'}
                    </p>
                  ))}
                </div>
              )}
              <div className={s.actions}>
                {data.isOwner && data.status === 'proposed' && (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      run(
                        'exchange.accept',
                        { id, contact: e.currentTarget.elements.contact.value },
                        '双方已接受约定。'
                      )
                    }}
                  >
                    <Field label='双方接受后可见的联系信息'>
                      <input name='contact' maxLength={160} />
                    </Field>
                    <button disabled={busy}>接受这项提议</button>
                  </form>
                )}
                {['accepted', 'delivering'].includes(data.status) && (
                  <>
                    <button
                      disabled={busy}
                      onClick={() =>
                        run('exchange.deliver', { id }, '交付状态已记录。')
                      }
                    >
                      标记交付中
                    </button>
                    <button
                      disabled={busy}
                      onClick={() =>
                        run(
                          'exchange.complete',
                          { id },
                          '你的完成确认已记录；双方都确认后才算完成。'
                        )
                      }
                    >
                      我已完成交付与接收
                    </button>
                  </>
                )}
                {!['completed', 'cancelled', 'disputed'].includes(
                  data.status
                ) && (
                  <button
                    className={s.quiet}
                    disabled={busy}
                    onClick={() => {
                      if (
                        window.confirm('取消后会保留约定与状态记录。确认取消？')
                      )
                        run('exchange.cancel', { id }, '已取消，原约定仍保留。')
                    }}
                  >
                    取消这项交换
                  </button>
                )}
                <button
                  className={s.quiet}
                  disabled={busy}
                  onClick={() => {
                    const reason = window.prompt(
                      '请具体说明争议，避免填写不必要的私人信息。'
                    )
                    if (reason)
                      run(
                        'exchange.dispute',
                        { id, reason },
                        '争议状态已记录，请双方先暂停交付。'
                      )
                  }}
                >
                  记录争议
                </button>
              </div>
              <p className={s.muted}>
                完成确认：{data.deal.completedBy.length} /
                2；单方确认不会显示为双方完成。
              </p>
            </section>
          ) : data.status === 'open' && actor && !data.isOwner ? (
            <form
              className={s.card}
              onSubmit={e => {
                e.preventDefault()
                const form = e.currentTarget
                run(
                  'exchange.propose',
                  {
                    id,
                    offered: form.elements.offered.value,
                    note: form.elements.note.value,
                    contact: form.elements.contact.value
                  },
                  '提议已发出，等待对方确认。'
                )
              }}
            >
              <h2>提出你的交换方案</h2>
              <Field label='你提供的物品'>
                <textarea name='offered' required maxLength={1200} rows={3} />
              </Field>
              <Field label='补充说明'>
                <textarea name='note' maxLength={1000} rows={2} />
              </Field>
              <Field label='接受后才向对方显示的联系信息'>
                <input name='contact' maxLength={160} />
              </Field>
              <button disabled={busy}>确认约定并发出提议</button>
            </form>
          ) : !actor ? (
            <p>登录后可以发起交换提议。</p>
          ) : null}
          <ReportButton id={id} />
        </>
      )}
    </LoadState>
  )
}
