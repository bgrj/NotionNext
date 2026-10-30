import Link from 'next/link'
import { cloneElement, isValidElement, useId } from 'react'
import { useCommunity } from './context'
import s from './Community.module.css'

export const LABELS = {
  existence: '生命记录',
  dao: '道',
  shu: '术',
  journal: '生命日志',
  book: '个人图书馆',
  image: '影像馆',
  audio: '音频馆',
  essay: '长文',
  resource: '资料',
  tool: '工具入口',
  draft: '私密草稿',
  published: '已有公开版本',
  pending: '待审核',
  withdrawn: '已撤回',
  changes_requested: '待修改',
  deleted: '已删除',
  unverified: '待验证',
  working: '可用',
  partial: '部分失效',
  outdated: '已过时',
  archived: '已归档',
  wish: '想读',
  reading: '在读',
  read: '读过',
  paused: '暂停',
  open: '开放中',
  full: '已满',
  closed: '已截止',
  upcoming: '未开始',
  ongoing: '进行中',
  ended: '已结束',
  cancelled: '已取消',
  proposed: '提议中',
  accepted: '双方已接受',
  delivering: '交付中',
  completed: '双方已完成',
  disputed: '有争议',
  confirmed: '已确认',
  none: '未设置',
  approved: '已审核',
  rejected: '待修改'
}
export const label = value => LABELS[value] || value || ''
export const displayDate = (
  value,
  timezone = 'Asia/Shanghai',
  time = false
) => {
  if (!value || !Number.isFinite(Date.parse(value))) return '未填写'
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      ...(time ? { hour: '2-digit', minute: '2-digit', hour12: false } : {})
    }).format(new Date(value))
  } catch {
    return value
  }
}
export function AppLink({ href, children, ...props }) {
  const { href: resolve } = useCommunity()
  return (
    <Link href={resolve(href)} {...props}>
      {children}
    </Link>
  )
}
export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <header className={s.heading}>
      <div>
        <p className={s.eyebrow}>{eyebrow}</p>
        <h1 id='community-title'>
          {title}
          <span className={s.period}>。</span>
        </h1>
        {description && <p className={s.lead}>{description}</p>}
      </div>
      {action}
    </header>
  )
}
export function LoadState({ resource, children, empty = '这里还没有记录。' }) {
  if (resource.loading)
    return (
      <p className={s.empty} role='status'>
        正在翻到这一页…
      </p>
    )
  if (resource.error)
    return (
      <div className={s.empty}>
        <p role='alert'>{resource.error}</p>
        <button className={s.quiet} onClick={resource.reload}>
          重新读取
        </button>
      </div>
    )
  if (!resource.data) return <p className={s.empty}>{empty}</p>
  return children(resource.data)
}
export function Empty({ title = '让这里，慢慢长出内容。', children }) {
  return (
    <div className={s.empty}>
      <span className={s.star} aria-hidden='true'>
        ✳
      </span>
      <h2>{title}</h2>
      {children}
    </div>
  )
}
export function Field({ label: text, children, help, wide = false }) {
  const generatedId = useId()
  const id =
    isValidElement(children) && children.props.id
      ? children.props.id
      : generatedId
  return (
    <div className={`${s.field} ${wide ? s.wide : ''}`}>
      <label htmlFor={id}>{text}</label>
      {isValidElement(children)
        ? cloneElement(children, {
            id,
            ...(help ? { 'aria-describedby': `${id}-help` } : {})
          })
        : children}
      {help && <small id={`${id}-help`}>{help}</small>}
    </div>
  )
}
export function PlainBody({ text = '' }) {
  return (
    <div className={s.prose}>
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((part, i) =>
          part.startsWith('## ') ? (
            <h2 key={i}>{part.slice(3)}</h2>
          ) : part.startsWith('# ') ? (
            <h2 key={i}>{part.slice(2)}</h2>
          ) : part.startsWith('> ') ? (
            <blockquote key={i}>{part.slice(2)}</blockquote>
          ) : (
            <p key={i}>{part}</p>
          )
        )}
    </div>
  )
}
export function PublicationState({ item }) {
  return (
    <p className={s.muted}>
      <span className={s.badge}>{label(item.status)}</span> · 修订{' '}
      {item.revision} · {displayDate(item.updatedAt)}
      {item.reviewNote && <span className={s.error}> · {item.reviewNote}</span>}
    </p>
  )
}
export function Pager({ nextOffset, onMore }) {
  return nextOffset !== null && nextOffset !== undefined ? (
    <button className={s.quiet} onClick={() => onMore(nextOffset)}>
      继续往后读 ↓
    </button>
  ) : null
}
export function ReportButton({ id }) {
  const { actor, run, busy } = useCommunity()
  return actor ? (
    <details className={s.details}>
      <summary>反馈这条公开内容</summary>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const input = e.currentTarget.elements.reason.value
          const data = await run(
            'report.create',
            { id, reason: input },
            '反馈已提交，处理结果会出现在站内通知。'
          )
          if (data) e.target.reset()
        }}
      >
        <Field label='问题说明'>
          <textarea name='reason' rows={3} maxLength={1000} required />
        </Field>
        <button disabled={busy}>提交反馈</button>
      </form>
    </details>
  ) : null
}
