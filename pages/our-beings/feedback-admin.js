import Head from 'next/head'
import { useCallback, useEffect, useMemo, useState } from 'react'

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

export default function FeedbackAdminPage() {
  const [token, setToken] = useState('')
  const [draftToken, setDraftToken] = useState('')
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
    setToken(saved)
    setDraftToken(saved)
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

  const signIn = event => {
    event.preventDefault()
    const value = draftToken.trim()
    if (value.length < 16) {
      setError('请输入至少 16 位管理密钥。')
      return
    }
    sessionStorage.setItem(STORAGE_KEY, value)
    setToken(value)
    setError('')
  }

  const signOut = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setToken('')
    setDraftToken('')
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
      <main className='admin'>
        <header className='top'>
          <div>
            <p className='eyebrow'>Our Being · 内部</p>
            <h1>ourbeing小程序后台管理</h1>
          </div>
          {signedIn ? (
            <button type='button' className='ghost' onClick={signOut}>
              退出
            </button>
          ) : null}
        </header>

        {!signedIn ? (
          <form className='card login' onSubmit={signIn}>
            <label htmlFor='admin-token'>管理密钥</label>
            <input
              id='admin-token'
              type='password'
              autoComplete='current-password'
              value={draftToken}
              onChange={event => setDraftToken(event.target.value)}
              placeholder='WUZAI_FEEDBACK_ADMIN_TOKEN'
            />
            <p className='hint'>密钥仅保存在本机会话，不会写入页面源码。</p>
            <button type='submit' className='primary'>
              进入后台
            </button>
          </form>
        ) : (
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
        )}

        {error ? <p className='error' role='alert'>{error}</p> : null}
      </main>
      <style jsx>{`
        .admin {
          min-height: 100vh;
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
        .login {
          max-width: 420px;
          margin: 48px auto 0;
          padding: 28px;
          display: grid;
          gap: 12px;
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
