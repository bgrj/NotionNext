import { useActivityLanguage } from './language'
import { useState } from 'react'
import styles from './activities.module.css'
import LocationPicker from './LocationPicker'
import { isArea } from '@/apps/wuzai/miniprogram/common/places'
import {
  localTime as formatLocal,
  timezone,
  toInstant
} from '@/apps/wuzai/miniprogram/common/global'

const localTime = (value) =>
  value ? formatLocal(value, '-').replace(' ', 'T') : ''
export default function ActivityForm({
  event,
  busy,
  onSave,
  onClose,
  kind = 'reading'
}) {
  const { t } = useActivityLanguage()
  const [formError, setFormError] = useState('')
  const [draft, setDraft] = useState(() => ({
    title: event?.title || '',
    book: event?.book || '',
    description: event?.description || '',
    startsAt: localTime(event?.startsAt),
    endsAt: localTime(event?.endsAt),
    deadline: localTime(event?.deadline),
    capacity: event?.capacity || 12,
    format: event?.format || 'online',
    kind: event?.kind || kind,
    city: event?.city || '',
    place: event?.place || null,
    language: event?.language || 'bilingual',
    location: event?.location || '',
    discussion: event?.channel || event?.discussion || 'site',
    joinInstructions: event?.joinInstructions || ''
  }))
  const change = (e) => {
    setFormError('')
    setDraft((value) => ({
      ...value,
      [e.target.name]: e.target.value,
      ...(e.target.name === 'location' && !isArea(value.place)
        ? { place: null }
        : {})
    }))
  }
  const submit = (e) => {
    e.preventDefault()
    const startsAt = toInstant(draft.startsAt)
    const endsAt = toInstant(draft.endsAt)
    const deadline = toInstant(draft.deadline || draft.startsAt)
    if (
      !startsAt ||
      !endsAt ||
      !deadline ||
      endsAt <= startsAt ||
      deadline > startsAt
    ) {
      setFormError(
        t('请检查开始、结束和预约截止时间；夏令时跳过的时刻不可选。')
      )
      return
    }
    setFormError('')
    onSave({
      ...draft,
      startsAt,
      endsAt,
      deadline,
      timezone: timezone(),
      discussion:
        draft.discussion === 'site'
          ? 'site'
          : draft.discussion === 'wechat'
            ? 'wechat'
            : 'external',
      channel: draft.discussion,
      capacity: Number(draft.capacity)
    })
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <p className={styles.eyebrow}>{t('留一段时间，邀请彼此走近')}</p>
      <h2>{event ? t('编辑活动安排') : t('发起一次相遇')}</h2>
      {formError && (
        <p role='alert' className={styles.error}>
          {formError}
        </p>
      )}
      <p className={styles.muted}>
        {' '}
        {t('先保存为草稿，确认安排后再公开发布。时间按设备时区填写。')}{' '}
      </p>
      <label>
        {' '}
        {t('活动名称')}{' '}
        <input
          name='title'
          value={draft.title}
          onChange={change}
          required
          minLength={2}
          maxLength={80}
          placeholder={t('例如：一起读《我与你》')}
        />
      </label>
      <p className={styles.muted}>
        {t('本地时间')} · {timezone()}
      </p>
      <div className={styles.twoColumns}>
        <label>
          {t('交流语言')}
          <select name='language' value={draft.language} onChange={change}>
            <option value='zh'>中文</option>
            <option value='en'>English</option>
            <option value='bilingual'>中文 &amp; English</option>
          </select>
        </label>
        <div>
          <label htmlFor='host-place'>{t('城市、乡镇与地图位置')}</label>
          <LocationPicker
            id='host-place'
            value={draft.city}
            place={draft.place}
            required={draft.format === 'offline'}
            onChange={(city, place) =>
              setDraft((value) => ({ ...value, city, place }))
            }
          />
        </div>
        <label>
          {' '}
          {t('相遇的方式')}{' '}
          <select name='kind' value={draft.kind} onChange={change}>
            <option value='reading'>{t('共读')}</option>
            <option value='conversation'>{t('交流')}</option>
          </select>
        </label>
        <label>
          {' '}
          {t('想读的书或材料')}{' '}
          <input
            name='book'
            value={draft.book}
            onChange={change}
            maxLength={120}
            placeholder={t('书名、篇章或主题，可选')}
          />
        </label>
      </div>
      <label>
        {' '}
        {t('活动介绍')}{' '}
        <textarea
          name='description'
          value={draft.description}
          onChange={change}
          required
          maxLength={4000}
          rows={5}
          placeholder={t('我们为什么相遇？会读什么、聊什么，需要做哪些准备？')}
        />
      </label>
      <div className={styles.twoColumns}>
        <label>
          {' '}
          {t('开始时间')}{' '}
          <input
            type='datetime-local'
            name='startsAt'
            value={draft.startsAt}
            onChange={change}
            required
          />
        </label>
        <label>
          {' '}
          {t('结束时间')}{' '}
          <input
            type='datetime-local'
            name='endsAt'
            value={draft.endsAt}
            onChange={change}
            required
          />
        </label>
        <label>
          {' '}
          {t('预约截止')}{' '}
          <input
            type='datetime-local'
            name='deadline'
            value={draft.deadline}
            onChange={change}
          />
          <small>{t('留空时，活动开始前均可预约。')}</small>
        </label>
        <label>
          {' '}
          {t('参与名额')}{' '}
          <input
            type='number'
            name='capacity'
            value={draft.capacity}
            onChange={change}
            required
            min={1}
            max={500}
          />
          <small>{t('不含发起人；已有预约后不能减少到已预约人数以下。')}</small>
        </label>
        <label>
          {' '}
          {t('活动形式')}{' '}
          <select name='format' value={draft.format} onChange={change}>
            <option value='online'>{t('线上')}</option>
            <option value='offline'>{t('线下')}</option>
          </select>
        </label>
        <label>
          {' '}
          {t('城市、场地或线上方式')}{' '}
          <input
            name='location'
            value={draft.location}
            onChange={change}
            maxLength={160}
            required
            placeholder={t('例如：线上语音 / 杭州·某书店')}
          />
          <small>{t('此处公开展示，请勿填写私人联系方式。')}</small>
        </label>
      </div>
      <label>
        {' '}
        {t('活动交流')}{' '}
        <select
          name='discussion'
          value={draft.discussion}
          onChange={change}
          disabled={event?.booked > 0}
        >
          <option value='site'>{t('本站活动交流群')}</option>
          <option value='wechat'>WeChat</option>
          <option value='qq'>QQ</option>
          <option value='telegram'>Telegram</option>
          <option value='whatsapp'>WhatsApp</option>
          <option value='line'>LINE</option>
          <option value='other'>{t('其他')}</option>
        </select>
      </label>
      <label>
        {draft.discussion === 'wechat'
          ? t('入群与参与说明')
          : t('预约后的参与说明')}
        <textarea
          name='joinInstructions'
          value={draft.joinInstructions}
          onChange={change}
          maxLength={1000}
          rows={3}
          required={draft.discussion !== 'site'}
          placeholder={
            draft.discussion === 'wechat'
              ? t('选择渠道，填写群链接、入群方式或联系说明。')
              : t('可填写线上会议入口、集合提示等。')
          }
        />
        <small>{t('仅向发起人和已预约的参与者显示。')}</small>
      </label>
      <div className={styles.actions}>
        <button className={styles.primary} disabled={busy} type='submit'>
          {busy ? t('正在保存…') : event ? t('保存安排') : t('保存草稿')}
        </button>
        <button
          className={styles.secondary}
          type='button'
          disabled={busy}
          onClick={onClose}
        >
          {' '}
          {t('返回')}{' '}
        </button>
      </div>
    </form>
  )
}
