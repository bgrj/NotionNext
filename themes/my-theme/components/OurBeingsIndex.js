import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import {
  OUR_BEINGS_JOIN_PRICE_YUAN,
  OUR_BEINGS_SEATS,
  isClerkEnabled,
  joinRequiresInviteOrPayment,
  listPublicBeings,
  remainingOurBeingSeats
} from '../beings'

const OurBeingsJoinStatus = dynamic(() => import('./OurBeingsJoinStatus'), {
  ssr: false
})

const OurBeingsIndex = ({ beings } = {}) => {
  const archive = listPublicBeings(beings)
  const taken = archive.length
  const remaining = remainingOurBeingSeats(taken)
  const gated = joinRequiresInviteOrPayment(taken)
  const clerkOn = isClerkEnabled()

  return (
    <div className='ob-beings'>
      <header className='ob-beings__head'>
        <p className='ob-beings__kicker'>存在者档案</p>
        <h1 className='ob-beings__title'>我们的存在</h1>
        <p className='ob-beings__lead'>
          「我的存在」只属于站主自己。这里是世界各地存在者的名录：以后其他人留下自己的生命钟、箴言和日子。访客可以读已公开的档案；要写下自己的存在、道、术，需要进入档案位。
        </p>
        <p className='ob-beings__count'>
          已留下 {taken} / {OUR_BEINGS_SEATS}
          {remaining > 0 ? ` · 还余 ${remaining} 个前一百席位` : ' · 前一百席位已满'}
        </p>
      </header>

      <section className='ob-beings__list' aria-label='已公开的存在者'>
        {archive.map(being => (
          <article key={being.id} className='ob-beings__card'>
            <p className='ob-beings__seat'>档案 {String(being.seat).padStart(3, '0')}</p>
            <h2 className='ob-beings__name'>{being.name}</h2>
            {being.motto ? (
              <p className='ob-beings__motto'>{being.motto}</p>
            ) : null}
            <SmartLink href={being.href} className='ob-beings__link'>
              {being.isAuthor ? '进入站主的生命钟' : '进入这份存在'}
            </SmartLink>
          </article>
        ))}
      </section>

      <section id='join' className='ob-beings__join'>
        <h2>如何进来</h2>
        <p>
          前 {OUR_BEINGS_SEATS} 人点右上角人像，用任何国家的邮箱免费占一个档案位。进来后会得到一张邀请码。不需要微信，也不需要中国手机号。席位满了之后，要么用老会员分享的邀请码，要么付{' '}
          {OUR_BEINGS_JOIN_PRICE_YUAN} 元占一个档案位。这是水电费，不是课程。
        </p>
        <p>
          进来的人可以写自己的存在、道、术，默认私密，公开的才进公共池。访客只读公开内容。
        </p>
        <p className='ob-beings__en'>
          Sign in with any email, from anywhere. WeChat and a Chinese phone
          number are not required.
        </p>
        {clerkOn ? (
          <OurBeingsJoinStatus gated={gated} />
        ) : (
          <p className='ob-beings__status'>
            {gated
              ? '前一百席位已满。之后只接受邀请码或付款。'
              : '前一百席位仍开放。登录密钥尚未接入，现在还不能真正进来。'}
          </p>
        )}
      </section>

      <style jsx>{`
        .ob-beings {
          width: min(52rem, 100%);
          margin: 0 auto;
          padding: 0.5rem 0 3rem;
          color: #2c241c;
        }
        .ob-beings__kicker {
          margin: 0 0 0.4rem;
          letter-spacing: 0.18em;
          font-size: 0.78rem;
          color: #6b5344;
        }
        .ob-beings__title {
          margin: 0 0 0.9rem;
          font-size: 1.85rem;
          font-weight: 650;
        }
        .ob-beings__lead,
        .ob-beings__join p {
          margin: 0 0 0.85rem;
          line-height: 1.75;
        }
        .ob-beings__count {
          margin: 0 0 1.6rem;
          color: #6b5344;
          font-size: 0.92rem;
        }
        .ob-beings__list {
          display: grid;
          gap: 1rem;
        }
        .ob-beings__card {
          padding: 1.15rem 1.2rem 1.2rem;
          border-radius: 1rem;
          background: rgba(255, 252, 247, 0.86);
          border: 1px solid rgba(44, 36, 28, 0.1);
        }
        .ob-beings__seat {
          margin: 0 0 0.35rem;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          color: #8a5a3a;
        }
        .ob-beings__name {
          margin: 0 0 0.55rem;
          font-size: 1.15rem;
        }
        .ob-beings__motto {
          margin: 0 0 0.9rem;
          line-height: 1.7;
        }
        .ob-beings__link {
          color: #8a5a1f;
          text-decoration: underline;
          text-underline-offset: 0.18em;
        }
        .ob-beings__join {
          margin-top: 2.2rem;
          padding-top: 1.4rem;
          border-top: 1px solid rgba(44, 36, 28, 0.12);
        }
        .ob-beings__join h2 {
          margin: 0 0 0.7rem;
          font-size: 1.15rem;
        }
        .ob-beings__en,
        .ob-beings__status {
          color: #6b5344;
        }
        :global(.dark) .ob-beings {
          color: #f6f1e8;
        }
        :global(.dark) .ob-beings__card {
          background: rgba(26, 23, 20, 0.82);
          border-color: rgba(246, 241, 232, 0.12);
        }
        :global(.dark) .ob-beings__link {
          color: #e2c48a;
        }
      `}</style>
    </div>
  )
}

export default OurBeingsIndex
