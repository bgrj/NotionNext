import { useEffect, useState } from 'react'
import { activityRequest } from './client'
import { useActivityLanguage } from './language'
import { localTime } from '@/apps/wuzai/miniprogram/common/global'
import styles from './activities.module.css'

export default function PublicWritings() {
  const { t } = useActivityLanguage()
  const [room, setRoom] = useState('all')
  const [writings, setWritings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)
  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    activityRequest('publicWritings')
      .then(data => {
        if (active) setWritings(data.writings)
      })
      .catch(reason => {
        if (active) setError(reason.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [reload])
  const labels = { all: '全部', dao: '道', shu: '术', existence: '我的存在' }
  const visible = writings.filter(item => room === 'all' || item.room === room)
  return (
    <section
      id='public-writings'
      className={styles.publicWritings}
      aria-labelledby='public-writings-title'
    >
      <h2 id='public-writings-title'>{t('公开创作')}</h2>
      <p className={styles.muted}>
        {t('来自小程序的公开创作。微信与网站账号独立。')}
      </p>
      <div className={styles.tabs} aria-label={t('创作分类')}>
        {Object.entries(labels).map(([key, label]) => (
          <button
            key={key}
            type='button'
            aria-pressed={room === key}
            onClick={() => setRoom(key)}
          >
            {t(label)}
          </button>
        ))}
      </div>
      {error ? (
        <div role='alert' className={styles.error}>
          <p>{error}</p>
          <button type='button' onClick={() => setReload(value => value + 1)}>
            {t('重新读取')}
          </button>
        </div>
      ) : loading ? (
        <p role='status'>{t('正在读取…')}</p>
      ) : visible.length ? (
        <div className={styles.writingList}>
          {visible.map(item => (
            <article key={item.id} className={styles.writing}>
              <p className={styles.eyebrow}>
                {t(labels[item.room])} · {item.author}
              </p>
              <h3>{item.title}</h3>
              <p className={styles.writingBody}>{item.body}</p>
              <time className={styles.muted} dateTime={item.createdAt}>
                {localTime(item.createdAt)}
              </time>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>{t('还没有公开创作')}</p>
      )}
    </section>
  )
}
