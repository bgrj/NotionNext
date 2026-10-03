import { useClerk, useUser } from '@clerk/nextjs'
import SmartLink from '@/components/SmartLink'
import { useEffect, useMemo, useState } from 'react'
import {
  BEING_ROOMS,
  beingFromClerkUser,
  isClerkEnabled
} from '../beings'

const emptyDraft = { room: 'existence', title: '', body: '', public: false }

const BeingDesk = () => {
  const enabled = isClerkEnabled()
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const [me, setMe] = useState(null)
  const [writings, setWritings] = useState([])
  const [draft, setDraft] = useState(emptyDraft)
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSignedIn) return undefined
    let cancelled = false
    fetch('/api/beings/me', { method: 'POST' })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (cancelled || !data?.being) return
        setMe(data.being)
        setWritings(Array.isArray(data.writings) ? data.writings : [])
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [isSignedIn])

  const being = me || beingFromClerkUser(user)
  const rooms = useMemo(
    () =>
      BEING_ROOMS.map(room => ({
        ...room,
        items: writings.filter(item => item.room === room.id)
      })),
    [writings]
  )

  const patch = async payload => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/beings/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError('没有放下。稍后再试。')
        return
      }
      if (data?.being) setMe(data.being)
      if (Array.isArray(data?.writings)) setWritings(data.writings)
      if (payload.writing) setDraft(emptyDraft)
    } finally {
      setSaving(false)
    }
  }

  const copyCode = async () => {
    if (!being?.inviteCode) return
    try {
      await navigator.clipboard.writeText(being.inviteCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (err) {
      setCopied(false)
    }
  }

  if (!enabled) {
    return (
      <div className='ob-desk'>
        <p>登录通道还没接上密钥。</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className='ob-desk'>
        <p>正在确认登录状态…</p>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className='ob-desk'>
        <p className='ob-desk__kicker'>我的档案</p>
        <h1>先登录</h1>
        <p>
          用任何国家的邮箱进来，再坐下这个档案位。
          {' '}
          <SmartLink href='/sign-up'>注册 / 登录</SmartLink>
        </p>
      </div>
    )
  }

  return (
    <div className='ob-desk'>
      <p className='ob-desk__kicker'>我的档案</p>
      <h1>{being?.name || '存在者'}</h1>
      <p className='ob-desk__seat'>
        档案 {String(being?.seat || '—').toString().padStart(3, '0')}
        {being?.handle ? ` · ${being.handle}` : ''}
        {being?.isAuthor ? ' · 站主' : ''}
      </p>
      {being?.motto ? <p className='ob-desk__motto'>{being.motto}</p> : null}
      <p>
        你已经进来。这里是你的档案位：存在、道、术分三间屋子。默认私密，公开的才进公共池。
      </p>

      {being?.inviteCode ? (
        <section className='ob-desk__card'>
          <p className='ob-desk__label'>邀请码</p>
          <p className='ob-desk__code'>{being.inviteCode}</p>
          <p>
            前一百人可以把这张码分给后来的人。席位满了之后，没有码就付 5 元水电费。不是课程。
          </p>
          <button type='button' className='ob-desk__btn' onClick={copyCode}>
            {copied ? '已复制' : '复制邀请码'}
          </button>
        </section>
      ) : null}

      {!being?.isAuthor ? (
        <section className='ob-desk__card'>
          <p className='ob-desk__label'>公开</p>
          <label className='ob-desk__check'>
            <input
              type='checkbox'
              checked={Boolean(being?.public)}
              disabled={saving}
              onChange={event => patch({ public: event.target.checked })}
            />
            把档案放进名录。不勾选时，访客看不见你。
          </label>
        </section>
      ) : null}

      <section>
        <h2>三间屋子</h2>
        <div className='ob-desk__rooms'>
          {rooms.map(room => (
            <article key={room.id} className='ob-desk__card'>
              <h3>{room.name}</h3>
              {being?.isAuthor ? (
                <p>
                  <SmartLink href={room.authorHref}>进入{room.name}</SmartLink>
                  。站主仍在原来的分区写，署自己的名。
                </p>
              ) : (
                <>
                  {room.items.length ? (
                    <ul>
                      {room.items.map(item => (
                        <li key={item.id}>
                          {item.title}
                          {item.public ? ' · 公开' : ' · 私密'}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>还没有放下。默认私密。</p>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {!being?.isAuthor ? (
        <section className='ob-desk__card'>
          <h2>放下一段</h2>
          <p>会员的道 / 术以后进同一分区、署你们的名。现在先写在自己的档案里。</p>
          <form
            onSubmit={event => {
              event.preventDefault()
              patch({ writing: draft })
            }}>
            <label>
              屋子
              <select
                value={draft.room}
                onChange={event =>
                  setDraft(prev => ({ ...prev, room: event.target.value }))
                }>
                {BEING_ROOMS.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              题目
              <input
                value={draft.title}
                maxLength={80}
                onChange={event =>
                  setDraft(prev => ({ ...prev, title: event.target.value }))
                }
              />
            </label>
            <label>
              正文
              <textarea
                rows={6}
                value={draft.body}
                maxLength={2000}
                onChange={event =>
                  setDraft(prev => ({ ...prev, body: event.target.value }))
                }
              />
            </label>
            <label className='ob-desk__check'>
              <input
                type='checkbox'
                checked={draft.public}
                onChange={event =>
                  setDraft(prev => ({ ...prev, public: event.target.checked }))
                }
              />
              这段公开
            </label>
            {error ? <p className='ob-desk__err'>{error}</p> : null}
            <button type='submit' className='ob-desk__btn' disabled={saving}>
              {saving ? '正在放下…' : '放下'}
            </button>
          </form>
        </section>
      ) : null}

      <p>
        <SmartLink href='/category/我们的存在'>回到名录</SmartLink>
        {' · '}
        <button
          type='button'
          className='ob-desk__text'
          onClick={() => signOut({ redirectUrl: '/our-beings' })}>
          退出
        </button>
      </p>

      <style jsx>{`
        .ob-desk {
          width: min(44rem, 100%);
          margin: 0 auto;
          padding: 0.5rem 0 3rem;
          color: #2c241c;
          line-height: 1.75;
        }
        .ob-desk__kicker {
          margin: 0 0 0.4rem;
          letter-spacing: 0.18em;
          font-size: 0.78rem;
          color: #6b5344;
        }
        .ob-desk h1 {
          margin: 0 0 0.35rem;
          font-size: 1.85rem;
          font-weight: 650;
        }
        .ob-desk h2 {
          margin: 1.6rem 0 0.7rem;
          font-size: 1.15rem;
        }
        .ob-desk h3 {
          margin: 0 0 0.45rem;
          font-size: 1.05rem;
        }
        .ob-desk__seat,
        .ob-desk__label {
          margin: 0 0 0.7rem;
          letter-spacing: 0.08em;
          font-size: 0.78rem;
          color: #8a5a3a;
        }
        .ob-desk__motto {
          margin: 0 0 1rem;
        }
        .ob-desk__card {
          margin: 0 0 1rem;
          padding: 1.1rem 1.15rem 1.15rem;
          border-radius: 1rem;
          background: rgba(255, 252, 247, 0.86);
          border: 1px solid rgba(44, 36, 28, 0.1);
        }
        .ob-desk__rooms {
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 720px) {
          .ob-desk__rooms {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .ob-desk__code {
          margin: 0 0 0.5rem;
          font-size: 1.35rem;
          letter-spacing: 0.12em;
        }
        .ob-desk__btn,
        .ob-desk__text {
          border: 0;
          background: transparent;
          color: #8a5a1f;
          cursor: pointer;
        }
        .ob-desk__btn {
          margin-top: 0.4rem;
          padding: 0.35rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgba(138, 90, 31, 0.35);
        }
        .ob-desk__text {
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 0.18em;
        }
        .ob-desk label {
          display: block;
          margin: 0 0 0.7rem;
        }
        .ob-desk input,
        .ob-desk select,
        .ob-desk textarea {
          display: block;
          width: 100%;
          margin-top: 0.25rem;
          padding: 0.4rem 0.5rem;
          border-radius: 0.4rem;
          border: 1px solid rgba(44, 36, 28, 0.18);
          background: #fffdf8;
        }
        .ob-desk__check {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }
        .ob-desk__check input {
          width: auto;
          margin-top: 0.35rem;
        }
        .ob-desk__err {
          color: #8a3a2a;
        }
        .ob-desk :global(a) {
          color: #8a5a1f;
          text-decoration: underline;
          text-underline-offset: 0.18em;
        }
        :global(.dark) .ob-desk {
          color: #f6f1e8;
        }
        :global(.dark) .ob-desk__card {
          background: rgba(26, 23, 20, 0.82);
          border-color: rgba(246, 241, 232, 0.12);
        }
        :global(.dark) .ob-desk :global(a),
        :global(.dark) .ob-desk__btn,
        :global(.dark) .ob-desk__text {
          color: #e2c48a;
        }
      `}</style>
    </div>
  )
}

export default BeingDesk
