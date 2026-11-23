import PhilosophyNav from '../activities/PhilosophyNav'
import BeingMasthead from '../activities/BeingMasthead'
import surface from '../activities/being-surface.module.css'
import {
  ActivityLanguageProvider,
  LanguageSwitch,
  useActivityLanguage
} from '../activities/language'
import SmartLink from '@/components/SmartLink'
import { useClerkSession } from '@/components/ClerkSession'
import { OurBeingsAccountPrompt } from './OurBeingsAuth'
import { useEffect, useMemo, useState } from 'react'
import {
  BEING_ROOMS,
  beingFromClerkUser,
  createBeingProfile,
  formatSeat,
  isClerkEnabled
} from '../beings'
import { daysBetween, formatZhDate, newLifeStats, shiftIso } from '../existence'

const emptyDraft = { room: 'existence', title: '', body: '', public: false }

const profileFromBeing = being => {
  const profile = createBeingProfile(
    {
      ...(being?.profile || {}),
      motto: being?.motto
    },
    { defaults: Boolean(being?.isAuthor) }
  )
  return {
    name: being?.name || '',
    motto: profile.motto || '',
    birth: profile.birth,
    awakening: profile.awakening,
    firstWritten: profile.firstWritten,
    years: profile.years,
    newYears: profile.newYears
  }
}

const BeingDesk = () => {
  const { t, locale } = useActivityLanguage()
  const enabled = isClerkEnabled()
  const session = useClerkSession()
  const { isLoaded, isSignedIn, user, signOut } = enabled
    ? session
    : { isLoaded: true, isSignedIn: false, user: null, signOut: async () => {} }
  const [me, setMe] = useState(null)
  const [writings, setWritings] = useState([])
  const [draft, setDraft] = useState(emptyDraft)
  const [profileDraft, setProfileDraft] = useState(null)
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [now, setNow] = useState(null)

  const applyPayload = data => {
    if (!data?.being) return
    setMe(data.being)
    setWritings(Array.isArray(data.writings) ? data.writings : [])
    setProfileDraft(profileFromBeing(data.being))
    if (data.notionWarning) setError(data.notionWarning)
  }

  useEffect(() => {
    if (!isSignedIn) return undefined
    let cancelled = false
    fetch('/api/beings/me', { method: 'POST' })
      .then(async res => {
        const data = await res.json().catch(() => null)
        if (cancelled) return
        if (!res.ok) {
          setError(data?.message || '档案位还没坐下。稍后再试。')
          return
        }
        applyPayload(data)
      })
      .catch(() => {
        if (!cancelled) setError('档案位还没坐下。稍后再试。')
      })
    return () => {
      cancelled = true
    }
  }, [isSignedIn])

  useEffect(() => {
    const tick = () => setNow(Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const being = me || beingFromClerkUser(user)
  const rooms = useMemo(
    () =>
      BEING_ROOMS.map(room => ({
        ...room,
        items: writings.filter(item => item.room === room.id)
      })),
    [writings]
  )

  const liveProfile = createBeingProfile(
    {
      ...(profileDraft || profileFromBeing(being)),
      motto: (profileDraft || profileFromBeing(being)).motto
    },
    { defaults: Boolean(being?.isAuthor) }
  )
  const clock =
    now && liveProfile.awakening && liveProfile.newEnd
      ? newLifeStats(liveProfile.awakening, liveProfile.newEnd, now)
      : null
  const mengmeiDays =
    liveProfile.birth && liveProfile.awakening
      ? daysBetween(liveProfile.birth, shiftIso(liveProfile.awakening, -1))
      : null

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
        setError(data?.message || t('没有放下。稍后再试。'))
        return false
      }
      applyPayload(data)
      if (payload.writing) setDraft(emptyDraft)
      return true
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

  if (!enabled) return <OurBeingsAccountPrompt available={false} />

  if (!isLoaded) {
    return (
      <div className='ob-desk'>
        <p>{t('正在确认登录状态…')}</p>
      </div>
    )
  }

  if (!isSignedIn) return <OurBeingsAccountPrompt />

  return (
    <div className='ob-desk'>
      <p className='ob-desk__kicker'>{t('我的档案')}</p>
      <h1>{being?.name || t('存在者')}</h1>
      <p className='ob-desk__seat'>
        {' '}
        {t('档案')} {formatSeat(being?.seat)}
        {being?.handle ? ` · ${being.handle}` : ''}
        {being?.isAuthor ? t(' · 站主') : ''}
      </p>
      {being?.motto ? <p className='ob-desk__motto'>{being.motto}</p> : null}
      <p>
        {' '}
        {t(
          '你已经进来。这里是你的档案位：箴言和生命钟的数据可以改，倒计时公式不能改。存在、道、术分三间屋子。默认私密，公开的才进公共池。'
        )}{' '}
      </p>
      {error ? <p className='ob-desk__err'>{t(error)}</p> : null}

      <section className='ob-desk__card'>
        <p className='ob-desk__label'>{t('生命钟')}</p>
        <p>
          {' '}
          {t('出生')}{' '}
          {liveProfile.birth ? formatZhDate(liveProfile.birth) : t('未写下')}{' '}
          {t('· 目标')} {liveProfile.newYears || '—'} {t('岁')}{' '}
        </p>
        <p>
          {t('蒙昧')}{' '}
          {mengmeiDays == null
            ? t('未写下')
            : `${mengmeiDays} ${locale === 'en' ? 'days' : '日'}`}
        </p>
        <p>
          {' '}
          {t('挣脱蒙昧后还余')}{' '}
          {clock
            ? locale === 'en'
              ? `${clock.days}d ${clock.hours}h ${clock.minutes}m ${clock.seconds}s`
              : `${clock.days} 日 ${clock.hours} 时 ${clock.minutes} 分 ${clock.seconds} 秒`
            : t('先写下挣脱蒙昧和目标岁数')}
        </p>
        <p className='ob-desk__hint'>
          {' '}
          {t('倒计时按挣脱蒙昧日 + 目标岁数来算，公式固定。')}{' '}
        </p>
      </section>

      {being?.inviteCode ? (
        <section className='ob-desk__card'>
          <p className='ob-desk__label'>{t('邀请码')}</p>
          <p className='ob-desk__code'>{being.inviteCode}</p>
          <p>
            {' '}
            {t(
              '前一百人可以把这张码分给后来的人。席位满了之后，没有码就付 5 元水电费。不是课程。'
            )}{' '}
          </p>
          <button
            type='button'
            className='ob-desk__btn'
            onClick={() => {
              void copyCode()
            }}
          >
            {copied ? t('已复制') : t('复制邀请码')}
          </button>
        </section>
      ) : null}

      {!being?.isAuthor ? (
        <>
          <section className='ob-desk__card'>
            <p className='ob-desk__label'>{t('公开')}</p>
            <label className='ob-desk__check'>
              <input
                type='checkbox'
                checked={Boolean(being?.public)}
                disabled={saving}
                onChange={event => {
                  void patch({ public: event.target.checked })
                }}
              />{' '}
              {t('把档案放进名录。不勾选时，访客看不见你。')}{' '}
            </label>
          </section>

          <section className='ob-desk__card'>
            <h2>{t('自己的数据')}</h2>
            <p>{t('箴言、出生、蒙昧、目标岁数都可以改。不要改倒计时本身。')}</p>
            <form
              onSubmit={event => {
                event.preventDefault()
                patch({ profile: profileDraft })
              }}
            >
              <label>
                {' '}
                {t('显示名')}{' '}
                <input
                  value={profileDraft?.name || ''}
                  maxLength={40}
                  onChange={event =>
                    setProfileDraft(prev => ({
                      ...profileFromBeing(being),
                      ...(prev || {}),
                      name: event.target.value
                    }))
                  }
                />
              </label>
              <label>
                {' '}
                {t('箴言')}{' '}
                <textarea
                  rows={3}
                  maxLength={140}
                  value={profileDraft?.motto || ''}
                  onChange={event =>
                    setProfileDraft(prev => ({
                      ...profileFromBeing(being),
                      ...(prev || {}),
                      motto: event.target.value
                    }))
                  }
                />
              </label>
              <label>
                {' '}
                {t('出生')}{' '}
                <input
                  type='date'
                  value={profileDraft?.birth || ''}
                  onChange={event =>
                    setProfileDraft(prev => ({
                      ...profileFromBeing(being),
                      ...(prev || {}),
                      birth: event.target.value
                    }))
                  }
                />
              </label>
              <label>
                {' '}
                {t('挣脱蒙昧')}{' '}
                <input
                  type='date'
                  value={profileDraft?.awakening || ''}
                  onChange={event =>
                    setProfileDraft(prev => ({
                      ...profileFromBeing(being),
                      ...(prev || {}),
                      awakening: event.target.value
                    }))
                  }
                />
              </label>
              <label>
                {' '}
                {t('首次写下')}{' '}
                <input
                  type='date'
                  value={profileDraft?.firstWritten || ''}
                  onChange={event =>
                    setProfileDraft(prev => ({
                      ...profileFromBeing(being),
                      ...(prev || {}),
                      firstWritten: event.target.value
                    }))
                  }
                />
              </label>
              <label>
                {' '}
                {t('目标岁数')}{' '}
                <input
                  type='number'
                  min={1}
                  max={120}
                  value={profileDraft?.newYears || ''}
                  onChange={event =>
                    setProfileDraft(prev => ({
                      ...profileFromBeing(being),
                      ...(prev || {}),
                      newYears: event.target.value
                    }))
                  }
                />
              </label>
              <label>
                {' '}
                {t('生命岁数')}{' '}
                <input
                  type='number'
                  min={1}
                  max={120}
                  value={profileDraft?.years || ''}
                  onChange={event =>
                    setProfileDraft(prev => ({
                      ...profileFromBeing(being),
                      ...(prev || {}),
                      years: event.target.value
                    }))
                  }
                />
              </label>
              <button type='submit' className='ob-desk__btn' disabled={saving}>
                {saving ? t('正在放下…') : t('放下这些数据')}
              </button>
            </form>
          </section>
        </>
      ) : null}

      <section>
        <h2>{t('三间屋子')}</h2>
        <div className='ob-desk__rooms'>
          {rooms.map(room => (
            <article key={room.id} className='ob-desk__card'>
              <h3>{room.name}</h3>
              {being?.isAuthor ? (
                <p>
                  <SmartLink href={room.authorHref}>
                    {t('进入')}
                    {room.name}
                  </SmartLink>{' '}
                  {t('。站主仍在原来的分区写，署自己的名。')}{' '}
                </p>
              ) : (
                <>
                  {room.items.length ? (
                    <ul>
                      {room.items.map(item => (
                        <li key={item.id}>
                          {item.title}
                          {item.public ? t(' · 公开') : t(' · 私密')}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{t('还没有放下。默认私密。')}</p>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {!being?.isAuthor ? (
        <section className='ob-desk__card'>
          <h2>{t('放下一段')}</h2>
          <p>
            {' '}
            {t(
              '勾选公开的道 / 术会进全站分区，题目后面署你们的名。私密的只留在自己档案里。存在进「我们的存在」，不进站主的「我的存在」。'
            )}{' '}
          </p>
          <form
            onSubmit={event => {
              event.preventDefault()
              patch({ writing: draft })
            }}
          >
            <label>
              {' '}
              {t('屋子')}{' '}
              <select
                value={draft.room}
                onChange={event =>
                  setDraft(prev => ({ ...prev, room: event.target.value }))
                }
              >
                {BEING_ROOMS.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {' '}
              {t('题目')}{' '}
              <input
                value={draft.title}
                maxLength={80}
                onChange={event =>
                  setDraft(prev => ({ ...prev, title: event.target.value }))
                }
              />
            </label>
            <label>
              {' '}
              {t('正文')}{' '}
              <textarea
                rows={6}
                value={draft.body}
                maxLength={800}
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
              />{' '}
              {t('这段公开')}{' '}
            </label>
            {error ? <p className='ob-desk__err'>{error}</p> : null}
            <button type='submit' className='ob-desk__btn' disabled={saving}>
              {saving ? t('正在放下…') : t('放下')}
            </button>
          </form>
        </section>
      ) : error ? (
        <p className='ob-desk__err'>{error}</p>
      ) : null}

      <p>
        <SmartLink href='/category/我们的存在'>{t('回到名录')}</SmartLink>
        {' · '}
        {being?.handle && being.public ? (
          <>
            <SmartLink href={being.href}>{t('公开的生命钟')}</SmartLink>
            {' · '}
          </>
        ) : null}
        <button
          type='button'
          className='ob-desk__text'
          onClick={() => {
            void signOut({ redirectUrl: '/our-beings' })
          }}
        >
          {' '}
          {t('退出')}{' '}
        </button>
      </p>

      <style jsx>{`
        .ob-desk {
          width: 100%;
          margin: 0 auto;
          padding: 0.5rem 0 3rem;
          color: var(--ink);
          line-height: 1.75;
        }
        .ob-desk__kicker {
          margin: 0 0 0.4rem;
          letter-spacing: 0.18em;
          font-size: 0.78rem;
          color: var(--muted);
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
          color: var(--accent);
        }
        .ob-desk__motto {
          margin: 0 0 1rem;
        }
        .ob-desk__hint {
          color: var(--muted);
          font-size: 0.92rem;
        }
        .ob-desk__card {
          margin: 0 0 1rem;
          padding: 24px;
          border-radius: var(--radius);
          background: var(--paper);
          border: 1px solid var(--line);
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
          color: var(--accent);
          cursor: pointer;
        }
        .ob-desk__btn {
          margin-top: 0.4rem;
          min-height: 44px;
          padding: 8px 16px;
          border-radius: var(--radius);
          border: 1px solid var(--line);
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
          padding: 12px;
          min-height: 44px;
          border-radius: var(--radius);
          border: 1px solid var(--line);
          background: var(--paper);
          color: var(--ink);
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
          color: var(--accent);
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

export default function LocalizedBeingDesk() {
  return (
    <ActivityLanguageProvider>
      <div className={surface.surface}>
        <LanguageSwitch />
        <BeingMasthead personal />
        <PhilosophyNav
          active='my'
          onCreate={() => {
            const editor = document.querySelector('.ob-desk form textarea')
            if (editor) {
              editor.scrollIntoView({ block: 'center' })
              editor.focus()
            } else document.querySelector('.ob-auth__actions a')?.click()
          }}
        />
        <BeingDesk />
      </div>
    </ActivityLanguageProvider>
  )
}
