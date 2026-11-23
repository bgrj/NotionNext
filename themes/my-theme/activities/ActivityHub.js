import { useActivityLanguage } from './language'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { useClerkSession } from '@/components/ClerkSession'
import { authHref } from '@/lib/beings/authNavigation'
import { filterEvents } from '@/apps/wuzai/miniprogram/common/activities'
import { activityRequest } from './client'
import ActivityDetail from './ActivityDetail'
import ActivityForm from './ActivityForm'
import Presence from './Presence'
import PhilosophyNav from './PhilosophyNav'
import {
  CITIES,
  cityLabel,
  localTime,
  timezone
} from '@/apps/wuzai/miniprogram/common/global'
import styles from './activities.module.css'

export default function ActivityHub({
  legacyEvents = [],
  requestedKind,
  onCreateHandled
}) {
  const { t, locale } = useActivityLanguage()
  const router = useRouter()
  const session = useClerkSession()
  const id =
    typeof router.query.activity === 'string' ? router.query.activity : ''
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState(null)
  const [scope, setScope] = useState('upcoming')
  const [format, setFormat] = useState('all')
  const [city, setCity] = useState('')
  const [conversationLanguage, setConversationLanguage] = useState('all')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [login, setLogin] = useState(false)
  const [editing, setEditing] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [nextOffset, setNextOffset] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const my = scope === 'mine'
  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    setEvent(null)
    setEditing(null)
    setNextOffset(null)
    activityRequest(id ? 'get' : my ? 'mine' : 'list', id ? { id } : {})
      .then(data => {
        if (!active) return
        if (data.event) setEvent(data.event)
        else {
          setEvents(data.events)
          setNextOffset(data.nextOffset)
          setHasMore(data.nextOffset !== null)
        }
      })
      .catch(err => {
        if (active) {
          setError(err.message)
          if (err.code === 'unauthorized') setLogin(true)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id, my, session.isSignedIn, refresh])
  const open = selected => {
    setLogin(false)
    setEditing(null)
    const query = { ...router.query }
    if (selected) query.activity = selected
    else delete query.activity
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false
    })
  }
  const act = async (action, input = {}) => {
    if (busy) return false
    setBusy(true)
    setError('')
    try {
      const data = await activityRequest(action, {
        ...input,
        ...(event?.id ? { id: event.id } : {})
      })
      setEvent(data.event)
      setEditing(null)
      if (!id) open(data.event.id)
      return true
    } catch (err) {
      setError(err.message)
      if (err.code === 'unauthorized') setLogin(true)
      return false
    } finally {
      setBusy(false)
    }
  }
  const start = kind => {
    if (!session.isSignedIn) setLogin(true)
    else {
      setEditing({ kind: kind === 'conversation' ? 'conversation' : 'reading' })
      setError('')
    }
  }
  useEffect(() => {
    if (!requestedKind) return
    if (!session.isSignedIn) setLogin(true)
    else setEditing({ kind: requestedKind })
    onCreateHandled?.()
  }, [requestedKind, session.isSignedIn, onCreateHandled])
  const more = async () => {
    setBusy(true)
    setError('')
    try {
      const data = await activityRequest(my ? 'mine' : 'list', {
        offset: nextOffset
      })
      setEvents(rows => [...rows, ...data.events])
      setNextOffset(data.nextOffset)
      setHasMore(data.nextOffset !== null)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  const visible = filterEvents(events, {
    scope,
    format,
    city,
    language: conversationLanguage
  })
  return (
    <div id='ob-hub-panel' className={styles.hub}>
      <PhilosophyNav onCreate={start} />
      <Presence
        room={
          event && (event.isHost || event.reservation === 'confirmed')
            ? event.id
            : ''
        }
      />
      {!id && !editing && (
        <>
          <div className={styles.invitation}>
            <div>
              <p className={styles.eyebrow}>{t('全球共读共话')}</p>
              <h2>
                {' '}
                {t('把一本书，')} <br /> {t('读成一次相遇。')}{' '}
              </h2>
              <p>
                {' '}
                {t('从一段共读、一场对话开始。')}{' '}
                {t('带着问题来，也带着自己的生活来。')}{' '}
              </p>
              <button className={styles.primary} onClick={start}>
                {' '}
                {t('发起一次相遇')}{' '}
              </button>
            </div>
          </div>
          <p className={styles.muted}>
            {t('欢迎世界各地的你，也欢迎生活在中国的国际朋友。')}
          </p>
          <div className={styles.globalFilters}>
            <label>
              {t('城市')}
              <input
                list='gathering-cities'
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder={t('所有城市')}
                maxLength={80}
              />
            </label>
            <datalist id='gathering-cities'>
              {CITIES.map(item => (
                <option key={item.id} value={item.id}>
                  {cityLabel(item.id, locale)}
                </option>
              ))}
            </datalist>
            <label>
              {t('交流语言')}
              <select
                value={conversationLanguage}
                onChange={e => setConversationLanguage(e.target.value)}
              >
                <option value='all'>{t('全部语言')}</option>
                <option value='zh'>中文</option>
                <option value='en'>English</option>
                <option value='bilingual'>中文 &amp; English</option>
              </select>
            </label>
          </div>
          <div className={styles.toolbar}>
            <div className={styles.tabs} aria-label={t('活动时间')}>
              <button
                aria-pressed={scope === 'upcoming'}
                onClick={() => setScope('upcoming')}
              >
                {' '}
                {t('即将相遇')}{' '}
              </button>
              <button
                aria-pressed={scope === 'past'}
                onClick={() => setScope('past')}
              >
                {' '}
                {t('往期相遇')}{' '}
              </button>
              <button aria-pressed={my} onClick={() => setScope('mine')}>
                {' '}
                {t('我的活动')}{' '}
              </button>
            </div>
            <label className={styles.formatSelect}>
              <span className={styles.srOnly}>{t('活动形式')}</span>
              <select value={format} onChange={e => setFormat(e.target.value)}>
                <option value='all'>{t('全部形式')}</option>
                <option value='online'>{t('线上')}</option>
                <option value='offline'>{t('线下')}</option>
              </select>
            </label>
          </div>
        </>
      )}
      {error && (
        <div className={styles.error} role='alert'>
          <p>{error}</p>
          <button
            className={styles.textButton}
            onClick={() => setRefresh(value => value + 1)}
          >
            {' '}
            {t('重新读取')}{' '}
          </button>
        </div>
      )}
      {login && (
        <div className={styles.privateNote}>
          <h3>{t('先让我们认识你')}</h3>
          <p>
            {' '}
            {t(
              '浏览活动无需登录。预约、发起活动与进入交流群，需要使用自己的账号。'
            )}{' '}
          </p>
          <div className={styles.actions}>
            <SmartLink
              className={styles.primary}
              href={authHref('in', router.asPath)}
            >
              {' '}
              {t('登录 / 注册')}{' '}
            </SmartLink>
            <button
              className={styles.textButton}
              onClick={() => setLogin(false)}
            >
              {' '}
              {t('先看看')}{' '}
            </button>
          </div>
        </div>
      )}
      {editing ? (
        <ActivityForm
          kind={editing.kind}
          event={editing.id ? editing : null}
          busy={busy}
          onClose={() => setEditing(null)}
          onSave={input => act(editing.id ? 'edit' : 'create', input)}
        />
      ) : loading ? (
        <div className={styles.empty} role='status'>
          {' '}
          {t('正在整理这次相遇…')}{' '}
        </div>
      ) : id ? (
        event && (
          <ActivityDetail
            event={event}
            busy={busy}
            onAction={act}
            onBack={() => open('')}
            onEdit={() => setEditing(event)}
            onLogin={() => setLogin(true)}
          />
        )
      ) : (
        <>
          {visible.length ? (
            <ul className={styles.cards}>
              {visible.map(item => (
                <li key={item.id}>
                  <button className={styles.card} onClick={() => open(item.id)}>
                    <span className={styles.cardDate}>
                      {localTime(item.startsAt)
                        .slice(5, 10)
                        .replace('.', ' / ')}
                      <small>
                        {localTime(item.startsAt).slice(11)} · {timezone()}{' '}
                      </small>
                    </span>
                    <span className={styles.cardContent}>
                      <span className={styles.cardTop}>
                        <span className={styles.eyebrow}>
                          {item.kind === 'reading' ? t('共读') : t('交流')} ·{' '}
                          {item.format === 'online' ? t('线上') : t('线下')}
                        </span>
                        <span className={styles.badge}>
                          {t(item.statusLabel)}
                        </span>
                      </span>
                      <strong>{item.title}</strong>
                      <span className={styles.muted}>
                        {item.book || item.description.slice(0, 75)}
                      </span>
                      <span className={styles.cardBottom}>
                        {item.location} · {item.booked} / {item.capacity}{' '}
                        {t('人')}{' '}
                        {item.isHost
                          ? t(' · 我发起的')
                          : item.reservation === 'confirmed'
                            ? t(' · 已预约')
                            : ''}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            !error && (
              <div className={styles.empty}>
                <span className={styles.emptyGlyph} aria-hidden='true'>
                  {' '}
                  {t('共')}{' '}
                </span>
                <h3>
                  {my
                    ? t('你的下一次相遇，从这里开始')
                    : scope === 'past'
                      ? t('相遇的回声，会留在这里')
                      : t('为下一次相遇，留一页空白')}
                </h3>
                <p>
                  {my
                    ? t('预约与发起的活动都会留在这里。')
                    : scope === 'past'
                      ? t('这个范围里暂时没有已结束的活动。')
                      : t(
                          '这个范围里还没有活动。不妨从你想读的一本书、想聊的一个问题开始。'
                        )}
                </p>
                <button className={styles.secondary} onClick={start}>
                  {' '}
                  {t('发起活动')}{' '}
                </button>
              </div>
            )
          )}
          {hasMore && (
            <button
              className={styles.secondary}
              disabled={busy}
              onClick={() => {
                void more()
              }}
            >
              {busy ? t('读取中…') : t('继续查看活动')}
            </button>
          )}
          <details className={styles.howTo}>
            <summary>{t('如何参与')}</summary>
            <div className={styles.howItWorks}>
              <div>
                <h3>{t('留出时间')}</h3>
                <p>{t('看看主题与安排，预约一个适合自己的位置。')}</p>
              </div>
              <div>
                <h3>{t('带着问题来')}</h3>
                <p>{t('预约后查看参与说明，加入本场交流。')}</p>
              </div>
              <div>
                <h3>{t('让相遇继续')}</h3>
                <p>{t('活动通知、共读与对话，都留在这次相遇里。')}</p>
              </div>
            </div>
          </details>
          {legacyEvents.length > 0 && (
            <details className={styles.legacy}>
              <summary>{t('此前发布的活动介绍')}</summary>
              <ul>
                {legacyEvents.map(item => (
                  <li key={item.id}>
                    <SmartLink href={item.href}>{item.title}</SmartLink>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </>
      )}
    </div>
  )
}
