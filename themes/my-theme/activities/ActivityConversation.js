import { useActivityLanguage } from './language'
import { useCallback, useEffect, useState } from 'react'
import {
  localTime as formatTime,
  timezone
} from '@/apps/wuzai/miniprogram/common/global'
import { activityRequest } from './client'
import styles from './activities.module.css'

export default function ActivityConversation({ event }) {
  const { t, locale } = useActivityLanguage()
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [canPost, setCanPost] = useState(event.canPost)
  const [loading, setLoading] = useState(true)
  const refresh = useCallback(async () => {
    const data = await activityRequest('messages', { id: event.id })
    setMessages(data.messages)
    setCanPost(data.canPost)
  }, [event.id])
  useEffect(() => {
    let active = true
    const poll = () =>
      activityRequest('messages', { id: event.id })
        .then(data => {
          if (active) {
            setMessages(data.messages)
            setCanPost(data.canPost)
            setError('')
            setLoading(false)
          }
        })
        .catch(err => {
          if (active) {
            setMessages([])
            setCanPost(false)
            setError(err.message)
            setLoading(false)
          }
        })
    poll()
    const timer = setInterval(() => {
      void poll()
    }, 15000)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [event.id])
  const send = async e => {
    e.preventDefault()
    if (busy || !body.trim()) return
    setBusy(true)
    setError('')
    try {
      await activityRequest('message', { id: event.id, body })
      setBody('')
      await refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <section
      className={styles.conversation}
      aria-labelledby='activity-chat-title'
    >
      <p className={styles.eyebrow}>{t('只在这次相遇之中')}</p>
      <h2 id='activity-chat-title'>{t('活动交流群')}</h2>
      <p className={styles.muted}>
        {' '}
        {t(
          '仅发起人和已预约者可进入。保留最近 100 条交流，长篇思考可以另存到自己的空间。'
        )}{' '}
      </p>
      {error && (
        <p role='alert' className={styles.error}>
          {error}
        </p>
      )}
      {loading ? (
        <p role='status'>{t('正在读取交流…')}</p>
      ) : !messages.length && !error ? (
        <p className={styles.muted}>
          {t('还没有人开口。带着一个问题来，也很好。')}
        </p>
      ) : null}
      <ol className={styles.messages}>
        {messages.map(message => (
          <li key={message.id}>
            <p>
              <strong>{message.name}</strong>
              <time dateTime={message.at}>{formatTime(message.at)}</time>
            </p>
            <div>{message.body}</div>
          </li>
        ))}
      </ol>
      {canPost ? (
        <form
          onSubmit={e => {
            void send(e)
          }}
        >
          <label htmlFor='activity-message'>{t('写给一起参与的人')}</label>
          <textarea
            id='activity-message'
            value={body}
            onChange={e => setBody(e.target.value)}
            maxLength={500}
            rows={3}
            required
          />
          <div className={styles.actions}>
            <button className={styles.primary} disabled={busy || !body.trim()}>
              {busy ? t('发送中…') : t('发送')}
            </button>
            <span className={styles.muted}>{body.length} / 500</span>
          </div>
        </form>
      ) : (
        <p className={styles.muted}>
          {t('交流已归档，或你的参与状态已改变。')}
        </p>
      )}
    </section>
  )
}
