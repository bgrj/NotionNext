import { useRef, useState } from 'react'
import { activityRequest } from './client'
import { useActivityLanguage } from './language'
import styles from './places.module.css'

export default function LocationPicker({
  value = '',
  place,
  onChange,
  id,
  required = false
}) {
  const { t, locale } = useActivityLanguage()
  const [places, setPlaces] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const latestValue = useRef(value)
  latestValue.current = value
  const search = async () => {
    if (busy) return
    setBusy(true)
    setError('')
    setSearched(false)
    const requested = value.trim()
    try {
      const data = await activityRequest('locations', {
        query: value.trim(),
        language: locale
      })
      if (latestValue.current.trim() === requested) {
        setPlaces(data.places)
        setSearched(true)
      }
    } catch (err) {
      if (latestValue.current.trim() === requested) setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className={styles.picker}>
      <div className={styles.search}>
        <input
          id={id}
          name='city'
          value={value}
          required={required}
          maxLength={160}
          placeholder={t('国家、地区、乡镇或场所')}
          onChange={(event) => {
            onChange(event.target.value, null)
            setPlaces([])
            setSearched(false)
            setError('')
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              search()
            }
          }}
        />
        <button
          type='button'
          disabled={busy || value.trim().length < 2}
          onClick={() => {
            void search()
          }}
        >
          {busy ? t('正在检索地点…') : t('搜索地图地点')}
        </button>
      </div>
      {value && (
        <button
          type='button'
          className={styles.clear}
          onClick={() => {
            onChange('', null)
            setPlaces([])
            setSearched(false)
          }}
        >
          {t('清除地点筛选')}
        </button>
      )}
      <small>
        {t('搜索国家、地区、乡镇、村庄或具体场所；选择结果可保存地图位置。')}
      </small>
      {error && <p role='alert'>{t(error)}</p>}
      {!!places.length && (
        <ul className={styles.results} aria-label={t('地点检索结果')}>
          {places.map((item) => (
            <li key={item.id || item.label}>
              <button
                type='button'
                onClick={() => {
                  onChange(item.label.slice(0, 160), item)
                  setPlaces([])
                  setSearched(false)
                }}
              >
                <strong>{item.name}</strong>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {searched && !places.length && !place && (
        <small>{t('未找到地点，可补充国家或地区后重试，也可手动填写。')}</small>
      )}
      {place && (
        <small>
          {t('已保存地图位置')} · {place.label}
        </small>
      )}
      {searched && (
        <small>
          ©{' '}
          <a
            href='https://www.openstreetmap.org/copyright'
            target='_blank'
            rel='noreferrer'
          >
            OpenStreetMap contributors
          </a>{' '}
          · Photon
        </small>
      )}
    </div>
  )
}
