import Head from 'next/head'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'ourbeing:feedback-admin-token'
const STATUS_OPTIONS = [
  { value: '', label: '全部状态' },
  { value: 'pending', label: '待核实' },
  { value: 'reviewed', label: '已核实' },
  { value: 'paid', label: '已发奖' },
  { value: 'rejected', label: '无效' },
  { value: 'duplicate', label: '重复' }
]
const UPDATE_OPTIONS = STATUS_OPTIONS.filter(item => item.value)

function imageSrc(base64) {
  if (!base64) return ''
  return `data:image/jpeg;base64,${base64}`
}

function formatTime(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('zh-CN', { hour12: false })
}

async function api(token, path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok)
    throw new Error(data.message || data.error || '请求失败，请稍后重试。')
  return data
}

function AdminScan({ onSession, label = '微信扫码' }) {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')
  const ticket = useRef('')
  const onSessionRef = useRef(onSession)
  onSessionRef.current = onSession

  useEffect(() => {
    if (phase !== 'waiting' || !ticket.current) return undefined
    let stopped = false
    const timer = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/our-beings/feedback-admin-scan?ticket=${ticket.current}`
        )
        const data = await response.json().catch(() => ({}))
        if (stopped) return
        if (data.status === 'approved' && data.session) {
          stopped = true
          clearInterval(timer)
          onSessionRef.current?.(data.session)
          return
        }
        if (data.status === 'bound') {
          stopped = true
          clearInterval(timer)
          setPhase('done')
          setMessage('已绑定这台微信。以后可以扫码进入。')
          return
        }
        if (data.status === 'expired' || !response.ok) {
          stopped = true
          clearInterval(timer)
          setPhase('error')
          setMessage(data.message || '二维码已过期，请重新生成。')
        }
      } catch {
        /* The next poll retries until the ticket expires. */
      }
    }, 2000)
    return () => {
      stopped = true
      clearInterval(timer)
    }
  }, [phase])

  const start = async () => {
    setOpen(true)
    setPhase('loading')
    setMessage('')
    setImage('')
    try {
      const response = await fetch('/api/our-beings/feedback-admin-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' })
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || '暂时无法生成二维码。')
      if (data.unbound) {
        setPhase('unbound')
        setMessage(data.message)
        return
      }
      ticket.current = data.ticket
      setImage(data.image || '')
      setPhase('waiting')
      setOpen(true)
    } catch (err) {
      setPhase('error')
      setMessage(err.message)
    }
  }

  return (
    <>
      <button type='button' className='scan-open' onClick={start} disabled={phase === 'loading'}>
        {phase === 'loading' ? '正在生成…' : label}
      </button>
      {open ? (
        <div className='scan-layer' role='presentation'>
          <section className='scan-dialog' role='dialog' aria-label='微信扫码进入'>
            <button type='button' className='scan-close' onClick={() => setOpen(false)} aria-label='关闭'>
              ×
            </button>
            <h3>微信扫码进入</h3>
            <p>用你的微信扫这个小程序码。手机上打开吾在后会显示「已确认」。其他微信不能进入。</p>
            {image ? <img src={image} alt='微信扫码登录二维码' /> : null}
            {message ? <p className={phase === 'error' ? 'scan-error' : ''}>{message}</p> : null}
            {phase === 'waiting' ? <p>等待手机确认…</p> : null}
            <button type='button' className='scan-again' onClick={start} disabled={phase === 'loading'}>
              {phase === 'loading' ? '正在生成…' : '重新生成'}
            </button>
          </section>
        </div>
      ) : null}
      <style jsx>{`
        .scan-open {
          min-width: 11.5rem;
          border-radius: 999px;
          border: 1px solid #926631;
          background: #926631;
          color: #fffaf3;
          padding: 12px 28px;
          letter-spacing: 0.08em;
          cursor: pointer;
        }
        .scan-open:disabled {
          opacity: 0.55;
          cursor: wait;
        }
        .scan-layer {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(24, 20, 17, 0.46);
        }
        .scan-dialog {
          position: relative;
          width: min(22rem, 100%);
          padding: 28px 24px 22px;
          border-radius: 18px;
          background: #fffdf9;
          color: #342c24;
          box-shadow: 0 24px 60px rgba(24, 20, 17, 0.28);
          display: grid;
          gap: 12px;
          justify-items: center;
          text-align: center;
        }
        .scan-close {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #766a5f;
          font-size: 22px;
          cursor: pointer;
        }
        h3 {
          margin: 8px 0 0;
          font-size: 16px;
          letter-spacing: 0.08em;
        }
        img {
          width: 220px;
          height: 220px;
          padding: 10px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid #e3dbce;
        }
        p {
          margin: 0;
          color: #766a5f;
          font-size: 13px;
          line-height: 1.6;
        }
        .scan-error {
          color: #8d3b32;
        }
        .scan-again {
          border-radius: 12px;
          border: 1px solid #926631;
          background: #926631;
          color: #fffaf3;
          padding: 10px 16px;
          cursor: pointer;
        }
        .scan-again:disabled {
          opacity: 0.55;
          cursor: wait;
        }
      `}</style>
    </>
  )
}

export default function FeedbackAdminPage() {
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('pending')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [selectedId, setSelectedId] = useState('')
  const [detail, setDetail] = useState(null)
  const [note, setNote] = useState('')
  const [nextStatus, setNextStatus] = useState('reviewed')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY) || ''
    if (saved.startsWith('scan_')) setToken(saved)
    else sessionStorage.removeItem(STORAGE_KEY)
    setReady(true)
  }, [])

  const signedIn = !!token

  const loadList = useCallback(async (auth = token, filter = status) => {
    if (!auth) return
    setLoading(true)
    setError('')
    try {
      const query = new URLSearchParams({ limit: '60' })
      if (filter) query.set('status', filter)
      const data = await api(auth, `/api/our-beings/feedback-admin?${query}`)
      setItems(data.items || [])
      setTotal(Number(data.total) || 0)
    } catch (err) {
      setError(err.message)
      setItems([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [status, token])

  const loadDetail = useCallback(async (id, auth = token) => {
    if (!auth || !id) return
    setLoading(true)
    setError('')
    try {
      const data = await api(auth, `/api/our-beings/feedback-admin?id=${encodeURIComponent(id)}`)
      setDetail(data.feedback)
      setSelectedId(id)
      setNote(data.feedback?.note || '')
      setNextStatus(data.feedback?.status === 'pending' ? 'reviewed' : data.feedback?.status || 'reviewed')
    } catch (err) {
      setError(err.message)
      setDetail(null)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (!ready || !token) return
    loadList(token, status)
  }, [ready, token, status, loadList])

  const acceptToken = useCallback(value => {
    sessionStorage.setItem(STORAGE_KEY, value)
    setToken(value)
    setError('')
  }, [])

  const signOut = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setToken('')
    setItems([])
    setDetail(null)
    setSelectedId('')
    setTotal(0)
  }

  const saveStatus = async () => {
    if (!detail?.id) return
    setLoading(true)
    setError('')
    try {
      const data = await api(token, '/api/our-beings/feedback-admin', {
        method: 'PATCH',
        body: JSON.stringify({ id: detail.id, status: nextStatus, note })
      })
      setDetail(data.feedback)
      await loadList(token, status)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const emptyLabel = useMemo(() => {
    if (loading) return '正在读取…'
    if (!signedIn) return '登录后可查看反馈。'
    return '当前筛选下暂无反馈。'
  }, [loading, signedIn])

  return (
    <>
      <Head>
        <title>ourbeing小程序后台管理 · Our Being</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <main className={`admin${signedIn ? '' : ' gate-page'}`}>
        {signedIn ? (
          <header className='top'>
            <div>
              <p className='eyebrow'>Our Being · 内部</p>
              <h1>ourbeing小程序后台管理</h1>
            </div>
            <div className='top-actions'>
              <button type='button' className='ghost' onClick={signOut}>
                退出
              </button>
            </div>
          </header>
        ) : (
          <div className='gate'>
            <section className='card login'>
              <p className='eyebrow'>Our Being · 内部</p>
              <h1>小程序后台</h1>
              <p className='hint'>
                <span>只有你的微信可以进入。</span>
                <span>扫码确认后，电脑打开后台。</span>
              </p>
              <AdminScan onSession={acceptToken} label='微信扫码登录' />
            </section>
          </div>
        )}

        {signedIn ? (
          <div className='layout'>
            <section className='card list-pane'>
              <div className='toolbar'>
                <label>
                  状态
                  <select value={status} onChange={event => setStatus(event.target.value)}>
                    {STATUS_OPTIONS.map(option => (
                      <option key={option.value || 'all'} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <button type='button' className='ghost' onClick={() => loadList()} disabled={loading}>
                  刷新
                </button>
              </div>
              <p className='meta'>{total} 条</p>
              <div className='list'>
                {items.length ? (
                  items.map(item => (
                    <button
                      key={item.id}
                      type='button'
                      className={`row ${selectedId === item.id ? 'active' : ''}`}
                      onClick={() => loadDetail(item.id)}
                    >
                      <span className='row-top'>
                        <strong>{item.severityLabel}</strong>
                        <em>{item.statusLabel}</em>
                      </span>
                      <span className='preview'>{item.descriptionPreview || '（无描述）'}</span>
                      <span className='row-bottom'>
                        <span>#{item.userNumber ?? '—'}</span>
                        <span>{formatTime(item.createdAt)}</span>
                      </span>
                    </button>
                  ))
                ) : (
                  <p className='empty'>{emptyLabel}</p>
                )}
              </div>
            </section>

            <section className='card detail-pane'>
              {detail ? (
                <>
                  <div className='detail-head'>
                    <div>
                      <p className='eyebrow'>反馈编号</p>
                      <h2>{detail.id}</h2>
                    </div>
                    <span className='badge'>{detail.statusLabel}</span>
                  </div>
                  <dl className='facts'>
                    <div>
                      <dt>严重程度</dt>
                      <dd>{detail.severityLabel}</dd>
                    </div>
                    <div>
                      <dt>存在者编号</dt>
                      <dd>{detail.userNumber ?? '—'}</dd>
                    </div>
                    <div>
                      <dt>提交时间</dt>
                      <dd>{formatTime(detail.createdAt)}</dd>
                    </div>
                    <div>
                      <dt>奖励</dt>
                      <dd>{(detail.rewardFen / 100).toFixed(2)} 元</dd>
                    </div>
                  </dl>
                  <div className='block'>
                    <h3>问题描述</h3>
                    <pre>{detail.description}</pre>
                  </div>
                  {detail.screenshots?.length ? (
                    <div className='block'>
                      <h3>问题截图</h3>
                      <div className='gallery'>
                        {detail.screenshots.map((image, index) => (
                          <a key={index} href={imageSrc(image)} target='_blank' rel='noreferrer'>
                            <img src={imageSrc(image)} alt={`截图 ${index + 1}`} />
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div className='block'>
                    <h3>支付宝收款码</h3>
                    {detail.alipayCode ? (
                      <a className='alipay' href={imageSrc(detail.alipayCode)} target='_blank' rel='noreferrer'>
                        <img src={imageSrc(detail.alipayCode)} alt='支付宝收款码' />
                      </a>
                    ) : detail.contact ? (
                      <p className='legacy'>旧版文本联系方式：{detail.contact}</p>
                    ) : (
                      <p className='hint'>未提供收款码。</p>
                    )}
                  </div>
                  <div className='block actions'>
                    <label>
                      处理状态
                      <select value={nextStatus} onChange={event => setNextStatus(event.target.value)}>
                        {UPDATE_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      备注
                      <textarea
                        value={note}
                        onChange={event => setNote(event.target.value)}
                        maxLength={500}
                        placeholder='可选：核实说明、发奖记录等'
                      />
                    </label>
                    <button type='button' className='primary' onClick={saveStatus} disabled={loading}>
                      保存处理结果
                    </button>
                    {detail.reviewedAt ? (
                      <p className='hint'>最近更新：{formatTime(detail.reviewedAt)}</p>
                    ) : null}
                  </div>
                </>
              ) : (
                <p className='empty'>选择左侧一条反馈查看详情。</p>
              )}
            </section>
          </div>
        ) : null}

        {error ? <p className='error' role='alert'>{error}</p> : null}
      </main>
      <style jsx>{`
        .admin {
          min-height: 70vh;
          padding: 32px 20px 64px;
          background:
            radial-gradient(circle at top left, rgba(146, 102, 49, 0.08), transparent 40%),
            linear-gradient(180deg, #f7f2ea 0%, #faf7f1 48%, #f3eee5 100%);
          color: #342c24;
          font: 16px/1.7 "PingFang SC", "Microsoft YaHei", sans-serif;
        }
        .top {
          max-width: 1180px;
          margin: 0 auto 24px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: end;
        }
        .eyebrow {
          margin: 0 0 8px;
          color: #926631;
          letter-spacing: 0.18em;
          font-size: 12px;
        }
        h1 {
          margin: 0;
          font: 34px/1.25 "Songti SC", "STSong", serif;
          letter-spacing: 0.04em;
        }
        h2 {
          margin: 0;
          font-size: 18px;
          word-break: break-all;
        }
        h3 {
          margin: 0 0 12px;
          font-size: 15px;
          letter-spacing: 0.08em;
        }
        .card {
          background: #fffdf9;
          border: 1px solid #e3dbce;
          border-radius: 18px;
          box-shadow: 0 12px 32px rgba(52, 44, 36, 0.06);
        }
        .top-actions,
        .login-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .gate-page {
          min-height: calc(100dvh - 11rem);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px 72px;
          background: transparent;
        }
        .gate {
          width: min(24rem, 100%);
        }
        .login {
          margin: 0;
          padding: 40px 36px 36px;
          display: grid;
          justify-items: center;
          text-align: center;
        }
        .login .eyebrow {
          margin-bottom: 14px;
        }
        .login h1 {
          margin: 0 0 18px;
          font-size: 36px;
        }
        .login .hint {
          margin: 0 0 28px;
          font-size: 15px;
          line-height: 1.9;
        }
        .login .hint span {
          display: block;
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          .gate-page {
            min-height: calc(100dvh - 8rem);
            padding: 28px 16px 48px;
          }
          .login {
            padding: 32px 22px 28px;
          }
          .login h1 {
            font-size: 30px;
          }
        }
        .layout {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(280px, 380px) minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }
        .list-pane,
        .detail-pane {
          padding: 20px;
          min-height: 70vh;
        }
        .toolbar {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: end;
          margin-bottom: 8px;
        }
        label {
          display: grid;
          gap: 8px;
          font-size: 13px;
          color: #766a5f;
        }
        input,
        select,
        textarea,
        button {
          font: inherit;
        }
        input,
        select,
        textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #e3dbce;
          border-radius: 12px;
          background: #faf7f1;
          color: #342c24;
          padding: 12px 14px;
        }
        textarea {
          min-height: 96px;
          resize: vertical;
        }
        button {
          border-radius: 12px;
          border: 1px solid #e3dbce;
          background: transparent;
          color: #342c24;
          padding: 10px 16px;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.55;
          cursor: wait;
        }
        .primary {
          background: #926631;
          border-color: #926631;
          color: #fffaf3;
        }
        .ghost {
          min-height: 42px;
        }
        .meta,
        .hint,
        .empty {
          color: #766a5f;
          font-size: 13px;
        }
        .list {
          display: grid;
          gap: 10px;
          margin-top: 12px;
        }
        .row {
          text-align: left;
          display: grid;
          gap: 8px;
          padding: 14px;
          background: #faf7f1;
        }
        .row.active {
          border-color: #926631;
          box-shadow: inset 0 0 0 1px rgba(146, 102, 49, 0.35);
        }
        .row-top,
        .row-bottom {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 12px;
          color: #766a5f;
        }
        .row-top strong {
          color: #342c24;
          font-size: 14px;
        }
        .row-top em {
          font-style: normal;
          color: #926631;
        }
        .preview {
          color: #342c24;
          font-size: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .detail-head {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: start;
          margin-bottom: 20px;
        }
        .badge {
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid #e3dbce;
          color: #926631;
          font-size: 12px;
          white-space: nowrap;
        }
        .facts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin: 0 0 24px;
        }
        .facts div {
          padding: 12px 14px;
          border-radius: 12px;
          background: #faf7f1;
        }
        dt {
          font-size: 12px;
          color: #766a5f;
        }
        dd {
          margin: 4px 0 0;
        }
        .block {
          margin-top: 24px;
        }
        pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          padding: 16px;
          border-radius: 12px;
          background: #faf7f1;
          font: inherit;
        }
        .gallery,
        .alipay {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .gallery img,
        .alipay img {
          width: 148px;
          height: 148px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid #e3dbce;
          background: #faf7f1;
        }
        .alipay img {
          width: 220px;
          height: 220px;
          object-fit: contain;
        }
        .actions {
          display: grid;
          gap: 14px;
        }
        .error {
          max-width: 1180px;
          margin: 20px auto 0;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(160, 59, 47, 0.08);
          color: #a03b2f;
        }
        .legacy {
          margin: 0;
          padding: 12px 14px;
          border-radius: 12px;
          background: #faf7f1;
          word-break: break-word;
        }
        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .list-pane,
          .detail-pane {
            min-height: 0;
          }
          .facts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
