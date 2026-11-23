import { useState } from 'react'
import { formatTime } from '@/apps/wuzai/miniprogram/common/activities'
import ActivityConversation from './ActivityConversation'
import styles from './activities.module.css'

export default function ActivityDetail({
  event,
  busy,
  onAction,
  onBack,
  onEdit,
  onLogin
}) {
  const [notice, setNotice] = useState('')
  const [cancelConfirm, setCancelConfirm] = useState(false)
  const [copyState, setCopyState] = useState('')
  const member = event.isHost || event.reservation === 'confirmed'
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/our-beings?activity=${event.id}`
      )
      setCopyState('活动链接已复制')
    } catch {
      setCopyState('请复制浏览器地址栏中的活动链接')
    }
  }
  return (
    <article className={styles.detail}>
      <button type='button' className={styles.textButton} onClick={onBack}>
        返回活动广场
      </button>
      <header className={styles.detailHeader}>
        <span className={styles.badge}>{event.statusLabel}</span>
        <p className={styles.eyebrow}>
          {event.kind === 'reading' ? '一起共读' : '一起交流'} ·{' '}
          {event.format === 'online' ? '线上相遇' : '线下相遇'}
        </p>
        <h2>{event.title}</h2>
        <p className={styles.muted}>
          由 {event.hostName} 发起{event.book ? ` · ${event.book}` : ''}
        </p>
      </header>
      <dl className={styles.facts}>
        <div>
          <dt>相遇时间 · 北京时间</dt>
          <dd>
            {formatTime(event.startsAt)} 至 {formatTime(event.endsAt)}
          </dd>
        </div>
        <div>
          <dt>在哪里</dt>
          <dd>{event.location}</dd>
        </div>
        <div>
          <dt>留出的名额</dt>
          <dd>
            {event.booked} / {event.capacity} 人已预约 · 还余 {event.remaining}{' '}
            位
          </dd>
        </div>
        <div>
          <dt>预约截止</dt>
          <dd>{formatTime(event.deadline)}</dd>
        </div>
      </dl>
      <section className={styles.description}>
        <h3>关于这次相遇</h3>
        <p>{event.description}</p>
      </section>
      <div className={styles.reservationBar}>
        <div>
          <strong>
            {event.isHost
              ? '你发起的相遇'
              : event.reservation === 'confirmed'
                ? '已为你留好一个位置'
                : event.reservation === 'cancelled'
                  ? '你已取消预约'
                  : '为一次认真的对话，留出时间'}
          </strong>
          <p className={styles.muted}>
            {event.discussion === 'wechat'
              ? '预约后查看发起人的微信群加入说明。'
              : '预约成功后，就可以进入本场站内交流群。'}
          </p>
        </div>
        {event.canReserve ? (
          <button
            className={styles.primary}
            disabled={busy}
            onClick={() => onAction('reserve')}
          >
            预约这次相遇
          </button>
        ) : !member && event.status === 'open' ? (
          <button className={styles.primary} onClick={onLogin}>
            登录后预约
          </button>
        ) : !member ? (
          <span className={styles.muted}>{event.statusLabel}</span>
        ) : null}
        {!event.isHost && event.reservation === 'confirmed' && (
          <button
            className={styles.secondary}
            disabled={busy}
            onClick={() => onAction('cancelReservation')}
          >
            取消预约
          </button>
        )}
      </div>
      {member && event.joinInstructions && (
        <section className={styles.privateNote}>
          <h3>
            {event.discussion === 'wechat' ? '发起人的活动微信群' : '参与说明'}
          </h3>
          <p>{event.joinInstructions}</p>
          <small>仅向本场发起人和已预约者展示。</small>
        </section>
      )}
      <section className={styles.announcements}>
        <h3>活动通知</h3>
        {!event.announcements.length && (
          <p className={styles.muted}>
            发起人尚未发布新的通知，参与前请再来看看。
          </p>
        )}
        <ol>
          {[...event.announcements].reverse().map(item => (
            <li key={item.id}>
              <time dateTime={item.at}>{formatTime(item.at)}</time>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
      {event.isHost && (
        <section className={styles.hostPanel}>
          <h3>发起人的安排</h3>
          <div className={styles.actions}>
            {event.state === 'draft' && (
              <button
                className={styles.primary}
                disabled={busy}
                onClick={() => onAction('publish')}
              >
                公开发布活动
              </button>
            )}
            {!['ongoing', 'ended', 'cancelled'].includes(event.status) && (
              <button
                className={styles.secondary}
                disabled={busy}
                onClick={onEdit}
              >
                编辑安排
              </button>
            )}
            {!['ended', 'cancelled'].includes(event.status) && (
              <button
                className={styles.textButton}
                onClick={() => setCancelConfirm(true)}
              >
                取消这场活动
              </button>
            )}
          </div>
          {cancelConfirm && (
            <div className={styles.privateNote}>
              <p>取消后将停止预约，并在活动通知中说明。</p>
              <div className={styles.actions}>
                <button
                  className={styles.secondary}
                  disabled={busy}
                  onClick={() => {
                    onAction('cancelEvent')
                    setCancelConfirm(false)
                  }}
                >
                  确认取消活动
                </button>
                <button
                  className={styles.textButton}
                  onClick={() => setCancelConfirm(false)}
                >
                  保留活动
                </button>
              </div>
            </div>
          )}
          {event.state === 'published' && (
            <form
              onSubmit={e => {
                e.preventDefault()
                void onAction('announce', { body: notice }).then(saved => {
                  if (saved) setNotice('')
                })
              }}
            >
              <label htmlFor='activity-announcement'>发布一条活动通知</label>
              <textarea
                id='activity-announcement'
                value={notice}
                onChange={e => setNotice(e.target.value)}
                maxLength={1000}
                rows={3}
                required
                placeholder='更新准备材料、时间安排或集合提醒。'
              />
              <button
                className={styles.secondary}
                disabled={busy || !notice.trim()}
              >
                发布通知
              </button>
            </form>
          )}
        </section>
      )}
      {event.canChat && <ActivityConversation key={event.id} event={event} />}
      {!member && event.discussion === 'site' && (
        <p className={styles.muted}>
          本场活动的交流群仅向发起人和已预约者开放。
        </p>
      )}
      <div className={styles.actions}>
        <button
          className={styles.textButton}
          onClick={() => {
            void copy()
          }}
        >
          复制活动链接
        </button>
        <span role='status' className={styles.muted}>
          {copyState}
        </span>
      </div>
    </article>
  )
}
