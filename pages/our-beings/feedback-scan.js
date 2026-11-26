import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function FeedbackScanPage() {
  const router = useRouter()
  const ticket = typeof router.query.ticket === 'string' ? router.query.ticket : ''
  const [message, setMessage] = useState('确认后，正在显示这个二维码的电脑会进入后台。')
  const [done, setDone] = useState(false)
  const [working, setWorking] = useState(false)

  const confirm = async () => {
    if (!/^[a-f0-9]{32}$/.test(ticket)) {
      setMessage('这个二维码已经失效，请在电脑上重新生成。')
      return
    }
    setWorking(true)
    try {
      const response = await fetch('/api/our-beings/feedback-admin-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'confirm-web', ticket })
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || '没有确认成功，请重试。')
      setDone(true)
      setMessage('已确认。请回到电脑上的后台。')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setWorking(false)
    }
  }

  return (
    <main className='scan-page'>
      <Head>
        <title>确认进入后台 · Our Being</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <section>
        <p>Our Being · 内部</p>
        <h1>确认进入后台</h1>
        <p>{message}</p>
        {done ? null : (
          <button type='button' onClick={confirm} disabled={working || !ticket}>
            {working ? '正在确认…' : '确认进入'}
          </button>
        )}
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
        button {
          margin-top: 8px;
          min-height: 44px;
          padding: 0 18px;
          border: 0;
          border-radius: 12px;
          background: #926631;
          color: #fffaf3;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.55;
        }
      `}</style>
    </main>
  )
}
