import SmartLink from '@/components/SmartLink'
import { useEffect, useState } from 'react'
import { AUTHOR_BEING, createBeingProfile } from '../beings'
import { daysBetween, formatZhDate, newLifeStats, shiftIso } from '../existence'

const BeingLife = ({ being } = {}) => {
  const record = being || AUTHOR_BEING
  const profile = createBeingProfile({
    ...record.profile,
    motto: record.motto
  })
  const [now, setNow] = useState(null)

  useEffect(() => {
    const tick = () => setNow(Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const clock = now
    ? newLifeStats(profile.awakening, profile.newEnd, now)
    : null

  const mengmeiDays = daysBetween(
    profile.birth,
    shiftIso(profile.awakening, -1)
  )

  return (
    <div className='ob-being'>
      <p className='ob-being__seat'>
        档案 {String(record.seat || 1).padStart(3, '0')}
      </p>
      <h1>{record.name}</h1>
      <p className='ob-being__motto'>{profile.motto}</p>
      <p>
        出生 {formatZhDate(profile.birth)} · 目标 {profile.newYears} 岁 · 生命钟公式固定，填写的岁数和蒙昧日期可以改。
      </p>
      <dl>
        <div>
          <dt>蒙昧</dt>
          <dd>{mengmeiDays} 日</dd>
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
