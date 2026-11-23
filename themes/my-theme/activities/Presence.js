import { useEffect, useState } from 'react'
import { useClerkSession } from '@/components/ClerkSession'
import { activityRequest } from './client'
import { useActivityLanguage } from './language'
import styles from './activities.module.css'
export default function Presence({ room = '' }) {
  const { t } = useActivityLanguage()
  const account = useClerkSession()
  const [stats, setStats] = useState(null)
  useEffect(() => {
    let active = true
    // A lease identifier, never an authentication credential.
    const session =
      globalThis.crypto?.randomUUID?.() ||
      Date.now().toString(36) +
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2)
    const leave = () => {
      if (account.isSignedIn)
        void activityRequest('presence', { session, leave: true }).catch(
          () => {}
        )
    }
    const poll = () => {
      if (document.visibilityState === 'hidden') return
      activityRequest(
        account.isSignedIn ? 'presence' : 'presenceStats',
        account.isSignedIn ? { session, ...(room ? { id: room } : {}) } : {}
      )
        .then(data => {
          if (active) setStats(data.presence)
        })
        .catch(() => {
          if (active) setStats(null)
        })
    }
    const visible = () => {
      if (document.visibilityState === 'hidden') leave()
      else poll()
    }
    poll()
    const timer = setInterval(poll, 30000)
    document.addEventListener('visibilitychange', visible)
    window.addEventListener('pagehide', leave)
    return () => {
      active = false
      clearInterval(timer)
      document.removeEventListener('visibilitychange', visible)
      window.removeEventListener('pagehide', leave)
      leave()
    }
  }, [account.isSignedIn, room])
  return (
    <aside className={styles.presence} aria-label={t('平台实时在线')}>
      <div>
        <strong>{stats?.people ?? '—'}</strong> {t('在线交流人数')}
      </div>
      <div>
        <strong>{stats?.groups ?? '—'}</strong> {t('在线交流组数')}
      </div>
      {!stats && <small>{t('暂不可用')}</small>}
      <details>
        <summary>{t('统计说明')}</summary>
        <small>
          {t(
            '约每 30 秒更新；仅统计平台前台活动，不包含外部聊天软件的在线人数。'
          )}
        </small>
      </details>
    </aside>
  )
}
