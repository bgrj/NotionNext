import { useState } from 'react'
import { mapLinks, isArea } from '@/apps/wuzai/miniprogram/common/places'
import { useActivityLanguage } from './language'
import styles from './places.module.css'

export default function DestinationMap({ event }) {
  const { t } = useActivityLanguage()
  const [showMap, setShowMap] = useState(false)
  if (event.format !== 'offline') return null
  const links = mapLinks(
    event.place,
    `${event.city || ''} ${event.location}`.trim()
  )
  return (
    <section className={styles.destination}>
      <h3>{t('地图与导航')}</h3>
      {event.demo && <p>{t('演示地图仅用于功能体验，请勿实际前往。')}</p>}
      {isArea(event.place) && (
        <p>{t('当前地图标注乡镇或区域中心，具体集合点请核对活动说明。')}</p>
      )}
      <p>{event.place?.label || event.location}</p>
      {!event.place && (
        <small>
          {t('此地址尚未保存地图位置，导航将打开地址搜索，请核对目的地。')}
        </small>
      )}
      <div className={styles.links}>
        {links.embed && (
          <button type='button' onClick={() => setShowMap((value) => !value)}>
            {showMap ? t('收起地图') : t('查看地图')}
          </button>
        )}
        <a href={links.google} target='_blank' rel='noreferrer'>
          {t('地图导航')} · Google Maps
        </a>
        {links.baidu && (
          <a href={links.baidu} target='_blank' rel='noreferrer'>
            {t('地图导航')} · {t('百度地图')}
          </a>
        )}
      </div>
      {showMap && (
        <iframe
          className={styles.map}
          title={t('活动地点地图')}
          src={links.embed}
          loading='lazy'
          referrerPolicy='no-referrer'
        />
      )}
      {links.osm && (
        <small>
          ©{' '}
          <a
            href='https://www.openstreetmap.org/copyright'
            target='_blank'
            rel='noreferrer'
          >
            OpenStreetMap contributors
          </a>{' '}
          ·{' '}
          <a href={links.osm} target='_blank' rel='noreferrer'>
            {t('打开完整地图')}
          </a>
        </small>
      )}
    </section>
  )
}
