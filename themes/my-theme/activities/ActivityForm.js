import { useState } from 'react'
import styles from './activities.module.css'

const localTime = value =>
  value ? new Date(Date.parse(value) + 28800000).toISOString().slice(0, 16) : ''
export default function ActivityForm({ event, busy, onSave, onClose }) {
  const [draft, setDraft] = useState(() => ({
    title: event?.title || '',
    book: event?.book || '',
    description: event?.description || '',
    startsAt: localTime(event?.startsAt),
    endsAt: localTime(event?.endsAt),
    deadline: localTime(event?.deadline),
    capacity: event?.capacity || 12,
    format: event?.format || 'online',
    kind: event?.kind || 'reading',
    location: event?.location || '',
    discussion: event?.discussion || 'site',
    joinInstructions: event?.joinInstructions || ''
  }))
  const change = e =>
    setDraft(value => ({ ...value, [e.target.name]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    onSave({
      ...draft,
      startsAt: `${draft.startsAt}:00+08:00`,
      endsAt: `${draft.endsAt}:00+08:00`,
      deadline: draft.deadline
        ? `${draft.deadline}:00+08:00`
        : `${draft.startsAt}:00+08:00`,
      capacity: Number(draft.capacity)
    })
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <p className={styles.eyebrow}>留一段时间，邀请彼此走近</p>
      <h2>{event ? '编辑活动安排' : '发起一次相遇'}</h2>
      <p className={styles.muted}>
        先保存为草稿，确认安排后再公开发布。所有时间均为北京时间。
      </p>
      <label>
        活动名称
        <input
          name='title'
          value={draft.title}
          onChange={change}
          required
          minLength={2}
          maxLength={80}
          placeholder='例如：一起读《我与你》'
        />
      </label>
      <div className={styles.twoColumns}>
        <label>
          相遇的方式
          <select name='kind' value={draft.kind} onChange={change}>
            <option value='reading'>共读</option>
            <option value='conversation'>交流</option>
          </select>
        </label>
        <label>
          想读的书或材料
          <input
            name='book'
            value={draft.book}
            onChange={change}
            maxLength={120}
            placeholder='书名、篇章或主题，可选'
          />
        </label>
      </div>
      <label>
        活动介绍
        <textarea
          name='description'
          value={draft.description}
          onChange={change}
          required
          maxLength={4000}
          rows={5}
          placeholder='我们为什么相遇？会读什么、聊什么，需要做哪些准备？'
        />
      </label>
      <div className={styles.twoColumns}>
        <label>
          开始时间
          <input
            type='datetime-local'
            name='startsAt'
            value={draft.startsAt}
            onChange={change}
            required
          />
        </label>
        <label>
          结束时间
          <input
            type='datetime-local'
            name='endsAt'
            value={draft.endsAt}
            onChange={change}
            required
          />
        </label>
        <label>
          预约截止
          <input
            type='datetime-local'
            name='deadline'
            value={draft.deadline}
            onChange={change}
          />
          <small>留空时，活动开始前均可预约。</small>
        </label>
        <label>
          参与名额
          <input
            type='number'
            name='capacity'
            value={draft.capacity}
            onChange={change}
            required
            min={1}
            max={500}
          />
          <small>不含发起人；已有预约后不能减少到已预约人数以下。</small>
        </label>
        <label>
          活动形式
          <select name='format' value={draft.format} onChange={change}>
            <option value='online'>线上</option>
            <option value='offline'>线下</option>
          </select>
        </label>
        <label>
          城市、场地或线上方式
          <input
            name='location'
            value={draft.location}
            onChange={change}
            maxLength={160}
            required
            placeholder='例如：线上语音 / 杭州·某书店'
          />
          <small>此处公开展示，请勿填写私人联系方式。</small>
        </label>
      </div>
      <label>
        活动交流
        <select
          name='discussion'
          value={draft.discussion}
          onChange={change}
          disabled={event?.booked > 0}
        >
          <option value='site'>本站活动交流群</option>
          <option value='wechat'>发起人自建微信群</option>
        </select>
      </label>
      <label>
        {draft.discussion === 'wechat' ? '微信群加入说明' : '预约后的参与说明'}
        <textarea
          name='joinInstructions'
          value={draft.joinInstructions}
          onChange={change}
          maxLength={1000}
          rows={3}
          required={draft.discussion === 'wechat'}
          placeholder={
            draft.discussion === 'wechat'
              ? '填写如何联系你入群、入群口令等，由你建立和维护活动微信群。'
              : '可填写线上会议入口、集合提示等。'
          }
        />
        <small>仅向发起人和已预约的参与者显示。</small>
      </label>
      <div className={styles.actions}>
        <button className={styles.primary} disabled={busy} type='submit'>
          {busy ? '正在保存…' : event ? '保存安排' : '保存草稿'}
        </button>
        <button
          className={styles.secondary}
          type='button'
          disabled={busy}
          onClick={onClose}
        >
          返回
        </button>
      </div>
    </form>
  )
}
