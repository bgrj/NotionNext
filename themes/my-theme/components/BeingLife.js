import SmartLink from '@/components/SmartLink'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  AUTHOR_BEING,
  BEING_ROOMS,
  createBeingProfile,
  formatSeat,
  normalizeHandle
} from '../beings'
import { daysBetween, formatZhDate, newLifeStats, shiftIso } from '../existence'

const BeingLife = ({ being, handle, writings: initialWritings } = {}) => {
  const router = useRouter()
  const routeHandle = normalizeHandle(
    handle || router.query?.handle || being?.handle
  )
  const [record, setRecord] = useState(being || null)
  const [writings, setWritings] = useState(
    Array.isArray(initialWritings) ? initialWritings : []
  )
  const [missing, setMissing] = useState(false)
  const [now, setNow] = useState(null)

  useEffect(() => {
    if (being) {
      setRecord(being)
      setWritings(Array.isArray(initialWritings) ? initialWritings : [])
      setMissing(false)
      return undefined
    }
    if (!routeHandle) return undefined
    if (routeHandle === AUTHOR_BEING.handle) {
      setRecord(AUTHOR_BEING)
      return undefined
    }
    let cancelled = false
    fetch(`/api/beings/public?handle=${encodeURIComponent(routeHandle)}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (cancelled) return
        if (!data?.being) {
          setMissing(true)
          return
        }
        setRecord(data.being)
        setWritings(Array.isArray(data.writings) ? data.writings : [])
      })
      .catch(() => {
        if (!cancelled) setMissing(true)
      })
    return () => {
      cancelled = true
    }
  }, [being, initialWritings, routeHandle])

  useEffect(() => {
    const tick = () => setNow(Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!record && !missing) {
    return (
      <div className='ob-being'>
        <p>正在打开这份存在…</p>
      </div>
    )
  }

  if (!record) {
    return (
      <div className='ob-being'>
        <h1>这份存在尚未公开</h1>
        <p>访客只能读已经勾选公开的档案。</p>
        <p>
          <SmartLink href='/category/我们的存在'>回到名录</SmartLink>
        </p>
      </div>
    )
  }

  const profile = createBeingProfile(
    {
      ...record.profile,
      motto: record.motto
    },
    { defaults: Boolean(record.isAuthor) }
  )
  const clock =
    now && profile.awakening && profile.newEnd
      ? newLifeStats(profile.awakening, profile.newEnd, now)
      : null
  const mengmeiDays =
    profile.birth && profile.awakening
      ? daysBetween(profile.birth, shiftIso(profile.awakening, -1))
      : null
  const rooms = BEING_ROOMS.map(room => ({
    ...room,
    items: writings.filter(item => item.room === room.id)
  }))

  return (
    <div className='ob-being'>
      <p className='ob-being__seat'>档案 {formatSeat(record.seat)}</p>
      <h1>{record.name}</h1>
      <p className='ob-being__motto'>{profile.motto}</p>
      <p>
        出生 {profile.birth ? formatZhDate(profile.birth) : '未写下'} · 目标{' '}
        {profile.newYears || '—'} 岁 · 生命钟公式固定，填写的岁数和蒙昧日期由本人改。
      </p>
      <dl>
        <div>
          <dt>蒙昧</dt>
          <dd>{mengmeiDays == null ? '未写下' : `${mengmeiDays} 日`}</dd>
        </div>
        <div>
          <dt>挣脱蒙昧后还余</dt>
          <dd>
            {clock
              ? `${clock.days} 日 ${clock.hours} 时 ${clock.minutes} 分 ${clock.seconds} 秒`
              : '—'}
          </dd>
        </div>
      </dl>
      {record.isAuthor ? (
        <p>
          站主的日子仍在{' '}
          <SmartLink href={AUTHOR_BEING.href}>我的存在</SmartLink>
          ，不和别人的档案混在一起。
        </p>
      ) : rooms.some(room => room.items.length) ? (
        <section>
          <h2>公开放下的段落</h2>
          {rooms.map(room =>
            room.items.length ? (
              <article key={room.id}>
                <h3>{room.name}</h3>
                <ul>
                  {room.items.map(item => (
                    <li key={item.id}>
                      <strong>{item.title}</strong>
                      {item.body ? ` · ${item.body}` : ''}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null
          )}
        </section>
      ) : (
        <p>这份存在的日子尚未公开。访客只能读已公开的内容。</p>
      )}
      <p>
        <SmartLink href='/category/我们的存在'>回到名录</SmartLink>
      </p>
      <style jsx>{`
        .ob-being {
          width: min(40rem, 100%);
          margin: 0 auto;
          padding: 0.5rem 0 3rem;
          color: #2c241c;
          line-height: 1.75;
        }
        .ob-being__seat {
          margin: 0 0 0.4rem;
          letter-spacing: 0.14em;
          font-size: 0.75rem;
          color: #8a5a3a;
        }
        .ob-being h1 {
          margin: 0 0 0.8rem;
          font-size: 1.85rem;
          font-weight: 650;
        }
        .ob-being h2 {
          margin: 1.4rem 0 0.6rem;
          font-size: 1.1rem;
        }
        .ob-being h3 {
          margin: 0.8rem 0 0.35rem;
          font-size: 1rem;
        }
        .ob-being__motto {
          margin: 0 0 1rem;
        }
        dl {
          display: grid;
          gap: 0.8rem;
          margin: 1.1rem 0 1.4rem;
        }
        dt {
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          color: #6b5344;
        }
        dd {
          margin: 0.15rem 0 0;
          font-size: 1.05rem;
        }
        .ob-being :global(a) {
          color: #8a5a1f;
          text-decoration: underline;
          text-underline-offset: 0.18em;
        }
        :global(.dark) .ob-being {
          color: #f6f1e8;
        }
        :global(.dark) .ob-being :global(a) {
          color: #e2c48a;
        }
      `}</style>
    </div>
  )
}

export default BeingLife
