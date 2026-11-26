import Head from 'next/head'

const MESSAGE =
  '这个页面不能登录后台。网页确认分辨不出是哪一个微信，已经关闭，避免其他微信进入。请回到电脑，使用管理密钥。'

export default function FeedbackScanPage() {

  return (
    <main className='scan-page'>
      <Head>
        <title>确认进入后台 · Our Being</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <section>
        <p>Our Being · 内部</p>
        <h1>不能在这里确认</h1>
        <p>{MESSAGE}</p>
      </section>
      <style jsx>{`
        .scan-page {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
        }
        section {
          width: min(24rem, 100%);
          padding: 28px 24px;
          border-radius: 18px;
          background: #fffdf9;
          color: #342c24;
          border: 1px solid #e3dbce;
          text-align: center;
        }
        p {
          margin: 0 0 12px;
          color: #766a5f;
          line-height: 1.7;
        }
        h1 {
          margin: 0 0 12px;
          font: 28px/1.3 'Songti SC', 'STSong', serif;
        }
      `}</style>
    </main>
  )
}
