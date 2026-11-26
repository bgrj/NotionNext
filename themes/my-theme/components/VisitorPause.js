import Head from 'next/head'
import Link from 'next/link'

/** Quiet door kept open while the rest of the site is paused. */
export default function VisitorPause() {
  return (
    <section className='ob-visitor-pause' aria-labelledby='ob-pause-title'>
      <Head>
        <title>暂停访问 · Our Being</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <p className='ob-pause-eyebrow'>Our Being</p>
      <h1 id='ob-pause-title'>这里先停一停</h1>
      <p className='ob-pause-copy'>
        除「道」和友情链接外，站点其余页面暂时不对访客开放。
      </p>
      <nav className='ob-pause-nav' aria-label='仍然开放'>
        <Link href='/category/道'>进入「道」</Link>
        <Link href='/links'>友情链接</Link>
      </nav>
      <style jsx>{`
        .ob-visitor-pause {
          max-width: 36rem;
          margin: 4.5rem auto 2rem;
          padding: 2.5rem 1.5rem 3rem;
          text-align: center;
          color: #342c24;
        }
        .ob-pause-eyebrow {
          margin: 0 0 0.8rem;
          color: #926631;
          letter-spacing: 0.22em;
          font-size: 12px;
        }
        h1 {
          margin: 0;
          font-family: 'Songti SC', 'STSong', serif;
          font-size: 2rem;
          font-weight: 500;
          letter-spacing: 0.08em;
        }
        .ob-pause-copy {
          margin: 1rem 0 0;
          line-height: 1.8;
          color: #594c3b;
        }
        .ob-pause-nav {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem 1.25rem;
          margin-top: 1.75rem;
        }
        .ob-pause-nav :global(a) {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 0 1.1rem;
          border: 1px solid #e3dbce;
          border-radius: 999px;
          color: #65451f;
          text-decoration: none;
        }
        :global(.dark) .ob-visitor-pause {
          color: #f0dfc4;
        }
        :global(.dark) .ob-pause-copy {
          color: #d9cbb6;
        }
        :global(.dark) .ob-pause-nav :global(a) {
          border-color: #4a4036;
          color: #e2c48a;
        }
      `}</style>
    </section>
  )
}
