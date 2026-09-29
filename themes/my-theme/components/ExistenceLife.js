import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import CONFIG from '../config'
import {
  EXISTENCE_DEFAULTS,
  addYearsIso,
  daysBetween,
  dimOfMonth,
  formatDotDate,
  formatZhDate,
  isoDay,
  newLifeStats,
  ordinalInYear,
  parseIso,
  parseSearchQuery,
  postMapFrom,
  shanghaiToday,
  shiftIso,
  slimExistencePosts,
  weekdaySun0
} from '../existence'

const YEAR_START = Number(EXISTENCE_DEFAULTS.birth.slice(0, 4))
const COLS = 366
const MONTH_TICKS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
const MONTH_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const STATE = {
  MENGMEI: 'mengmei',
  AWAKE: 'awake',
  WRITTEN: 'written',
  FUTURE: 'future'
}

const colorsOf = dark =>
  dark
    ? {
        ink: '#F6F1E8',
        muted: '#D2C4B0',
        line: 'rgba(246, 241, 232, 0.22)',
        mengmei: 'rgba(210, 196, 176, 0.42)',
        awake: 'rgba(210, 196, 176, 0.42)',
        written: '#F0D9A0',
        mark: '#F0D9A0',
        future: 'rgba(246, 241, 232, 0.16)',
        gold: '#E2C48A',
        goldDeep: '#F0D9A0',
        card: '#1a1714',
        labelShadow: 'rgba(0, 0, 0, 0.65)'
      }
    : {
        ink: '#2C241C',
        muted: '#5A4D40',
        line: 'rgba(44, 36, 28, 0.18)',
        mengmei: 'rgba(56, 48, 42, 0.38)',
        awake: 'rgba(56, 48, 42, 0.38)',
        written: '#8A5A1F',
        mark: '#8A5A1F',
        future: 'rgba(44, 36, 28, 0.12)',
        gold: '#C9A66B',
        goldDeep: '#8A5A1F',
        card: '#fff',
        labelShadow: 'rgba(255, 255, 255, 0.7)'
      }

const isDarkNow = () =>
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('dark')

const dayState = (iso, { birth, awakening, today, end, postMap }) => {
  if (iso < birth || iso >= end) return null
  if (postMap[iso]) return STATE.WRITTEN
  if (iso > today) return STATE.FUTURE
  if (awakening && iso < awakening) return STATE.MENGMEI
  return STATE.AWAKE
}

const buildCells = meta => {
  const { birth, end } = meta
  const start = parseIso(birth)
  const stop = parseIso(shiftIso(end, -1))
  const cells = []
  let y = start.y
  let m = start.m
  let d = start.d
  const pad = n => String(n).padStart(2, '0')
  while (y < stop.y || (y === stop.y && (m < stop.m || (m === stop.m && d <= stop.d)))) {
    const iso = `${y}-${pad(m)}-${pad(d)}`
    const state = dayState(iso, meta)
    if (state) {
      cells.push({
        iso,
        year: y,
        col: ordinalInYear(y, m, d) - 1,
        state
      })
    }
    d += 1
    const dim = [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (d > dim[m - 1]) {
      d = 1
      m += 1
      if (m > 12) {
        m = 1
        y += 1
      }
    }
  }
  return cells
}

const isLeapYear = year =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

const nf = n => n.toLocaleString('zh-CN')

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const pad2 = n => String(n).padStart(2, '0')

const isoOf = (y, m, d) => `${y}-${pad2(m)}-${pad2(d)}`

const phaseLabel = state =>
  state === STATE.MENGMEI
    ? '蒙昧'
    : state === STATE.AWAKE
      ? '不断摆脱蒙昧'
      : state === STATE.WRITTEN
        ? '不断摆脱蒙昧'
        : '尚未到来'

const YearSheet = ({
  year,
  minYear,
  maxYear,
  meta,
  focusIso,
  onPick,
  onClose,
  onShift
}) => {
  const months = []
  for (let m = 1; m <= 12; m += 1) {
    const days = []
    const dim = dimOfMonth(year, m)
    const first = weekdaySun0(isoOf(year, m, 1))
    for (let i = 0; i < first; i += 1) days.push(null)
    for (let d = 1; d <= dim; d += 1) {
      const iso = isoOf(year, m, d)
      const state = dayState(iso, meta)
      days.push({ iso, d, state, post: state ? meta.postMap[iso] : null })
    }
    months.push({ m, days })
  }
  return (
    <div className='ob-ex-sheet' role='dialog' aria-label={`${year} 年`}>
      <div className='ob-ex-sheet-bar'>
        <button
          type='button'
          className='ob-ex-sheet-nav'
          disabled={year <= minYear}
          onClick={() => onShift(-1)}
          aria-label='上一年'>
          ‹
        </button>
        <div className='ob-ex-sheet-year'>{year}</div>
        <button
          type='button'
          className='ob-ex-sheet-nav'
          disabled={year >= maxYear}
          onClick={() => onShift(1)}
          aria-label='下一年'>
          ›
        </button>
        <button type='button' className='ob-ex-sheet-close' onClick={onClose}>
          收起
        </button>
      </div>
      <p className='ob-ex-sheet-hint'>点某一天。亮着的可以进去。</p>
      <div className='ob-ex-months'>
        {months.map(month => (
          <div className='ob-ex-month' key={month.m}>
            <div className='ob-ex-month-name'>{month.m} 月</div>
            <div className='ob-ex-cal'>
              {WEEKDAYS.map(w => (
                <span className='ob-ex-wd' key={w}>
                  {w}
                </span>
              ))}
              {month.days.map((day, i) =>
                day ? (
                  <button
                    key={day.iso}
                    type='button'
                    disabled={!day.state}
                    className={`ob-ex-day is-${day.state || 'out'}${
                      focusIso === day.iso ? ' is-focus' : ''
                    }${day.post ? ' is-link' : ''}`}
                    title={
                      day.post
                        ? `${day.post.title}${
                            day.post.note ? ` · ${day.post.note}` : ''
                          }`
                        : day.state
                          ? `${formatDotDate(day.iso)} ${phaseLabel(day.state)}`
                          : ''
                    }
                    onClick={() => day.state && onPick(day)}>
                    {day.d}
                  </button>
                ) : (
                  <span className='ob-ex-day is-pad' key={`p-${month.m}-${i}`} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ExistenceLife = props => {
  const router = useRouter()
  const birth = isoDay(
    siteConfig('EXISTENCE_BIRTH', EXISTENCE_DEFAULTS.birth, CONFIG)
  ) || EXISTENCE_DEFAULTS.birth
  const years = Number(
    siteConfig('EXISTENCE_YEARS', EXISTENCE_DEFAULTS.years, CONFIG)
  ) || EXISTENCE_DEFAULTS.years
  const firstWritten =
    isoDay(
      siteConfig(
        'EXISTENCE_FIRST_WRITTEN',
        EXISTENCE_DEFAULTS.firstWritten,
        CONFIG
      )
    ) || EXISTENCE_DEFAULTS.firstWritten
  const awakening =
    isoDay(
      siteConfig('EXISTENCE_AWAKENING', EXISTENCE_DEFAULTS.awakening, CONFIG)
    ) || EXISTENCE_DEFAULTS.awakening
  const newYears =
    Number(
      siteConfig('EXISTENCE_NEW_YEARS', EXISTENCE_DEFAULTS.newYears, CONFIG)
    ) || EXISTENCE_DEFAULTS.newYears
  const newEnd =
    isoDay(siteConfig('EXISTENCE_NEW_END', EXISTENCE_DEFAULTS.newEnd, CONFIG)) ||
    EXISTENCE_DEFAULTS.newEnd
  const motto = siteConfig(
    'EXISTENCE_MOTTO',
    EXISTENCE_DEFAULTS.motto,
    CONFIG
  )
  const end = addYearsIso(birth, years)
  const today = shanghaiToday()
  const written = useMemo(
    () => slimExistencePosts(props.existencePosts || props.posts),
    [props.existencePosts, props.posts]
  )
  const postMap = useMemo(() => postMapFrom(written), [written])
  const meta = useMemo(
    () => ({ birth, awakening, today, end, postMap }),
    [birth, awakening, today, end, postMap]
  )
  const cells = useMemo(() => buildCells(meta), [meta])
  const cellIndex = useMemo(() => {
    const map = new Map()
    cells.forEach(cell => map.set(`${cell.year}-${cell.col}`, cell))
    return map
  }, [cells])
  const yearCount = Number(end.slice(0, 4)) - YEAR_START + 1
  const mengmeiEnd = shiftIso(awakening, -1)
  const lastLived = today < end ? (today < birth ? birth : today) : shiftIso(end, -1)
  const mengmeiDays = daysBetween(birth, mengmeiEnd)
  const awakeDays = today >= awakening ? daysBetween(awakening, lastLived) : 0
  const futureDays = daysBetween(shiftIso(today, 1), shiftIso(end, -1))
  const totalDays = daysBetween(birth, shiftIso(end, -1))
  const livedDays = Math.min(totalDays, daysBetween(birth, lastLived))
  const [clock, setClock] = useState(() => newLifeStats(awakening, newEnd))
  useEffect(() => {
    const tick = () => setClock(newLifeStats(awakening, newEnd))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [awakening, newEnd])
  const writtenDays = written.length
  const mottoText = String(motto || '').replace(/\s+/g, ' ').trim()
  const lifeMarks = useMemo(
    () => [
      { iso: birth, label: '生命的起点' },
      { iso: awakening, label: '（新）生命的终（起）点' },
      { iso: newEnd, label: '（预计）新生命的终点' }
    ],
    [birth, awakening, newEnd]
  )
  const lastYear = YEAR_START + yearCount - 1
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const layoutRef = useRef(null)
  const sheetRef = useRef(null)
  const composingRef = useRef(false)
  const [dark, setDark] = useState(false)
  const [tip, setTip] = useState(null)
  const [links, setLinks] = useState([])
  const [marks, setMarks] = useState([])
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [expandedYear, setExpandedYear] = useState(null)
  const [focusIso, setFocusIso] = useState(null)
  const parsedQuery = useMemo(() => parseSearchQuery(query), [query])
  const hits = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const byText = written.filter(post => {
      const hay = `${post.title} ${post.date} ${formatDotDate(post.date)} ${
        post.spanEnd || ''
      }`.toLowerCase()
      return hay.includes(q) || (parsedQuery.date && post.date === parsedQuery.date)
    })
    const mapped = parsedQuery.date ? postMap[parsedQuery.date] : null
    if (mapped && !byText.some(post => post.href === mapped.href)) {
      byText.unshift(mapped)
    }
    if (parsedQuery.date && !byText.some(post => post.date === parsedQuery.date || post.href === mapped?.href)) {
      const state = dayState(parsedQuery.date, meta)
      if (state) {
        return [
          {
            id: parsedQuery.date,
            date: parsedQuery.date,
            title: `${formatDotDate(parsedQuery.date)} · ${phaseLabel(state)}`,
            href: '',
            state
          },
          ...byText
        ]
      }
    }
    return byText.slice(0, 8)
  }, [query, parsedQuery, written, meta, postMap])

  useEffect(() => {
    setDark(isDarkNow())
    const root = document.documentElement
    const obs = new MutationObserver(() => setDark(isDarkNow()))
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined

    const paint = () => {
      const width = Math.max(wrap.clientWidth, 280)
      const labelW = width < 640 ? 42 : 48
      const topH = width < 640 ? 16 : 18
      const rowH = width < 640 ? 7.1 : 8.2
      const bottomH = 36
      const height = topH + yearCount * rowH + bottomH
      const pal = colorsOf(dark)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const innerW = width - labelW - 4
      const colW = innerW / COLS
      const layout = { labelW, topH, rowH, colW, width, height }
      layoutRef.current = layout

      ctx.font = '10px ui-sans-serif, system-ui, sans-serif'
      ctx.fillStyle = pal.muted
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      MONTH_TICKS.forEach((ord, i) => {
        const x = labelW + (ord - 1) * colW
        ctx.fillStyle = pal.line
        ctx.fillRect(x, topH - 3, 1, yearCount * rowH + 3)
        ctx.fillStyle = pal.muted
        ctx.fillText(MONTH_LABELS[i], x + 1, 2)
      })

      const dot = Math.max(1.05, Math.min(colW, rowH) * 0.72)
      const writtenR = Math.max(2.2, Math.min(3.6, Math.min(colW, rowH) * 1.15))

      cells.forEach(cell => {
        const x = labelW + cell.col * colW + colW / 2
        const y = topH + (cell.year - YEAR_START) * rowH + rowH / 2
        if (cell.state === STATE.WRITTEN) {
          ctx.fillStyle = pal.written
          ctx.beginPath()
          ctx.arc(x, y, writtenR, 0, Math.PI * 2)
          ctx.fill()
          return
        }
        if (cell.state === STATE.AWAKE) return
        ctx.fillStyle =
          cell.state === STATE.FUTURE ? pal.future : pal.mengmei
        const r = cell.state === STATE.FUTURE ? dot / 2 : dot * 0.82
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      const lastYear = YEAR_START + yearCount - 1
      for (let year = YEAR_START; year <= lastYear; year += 1) {
        const special = year === YEAR_START || year === 2025 || year === lastYear
        const every = year % 5 === 0
        if (year === lastYear - 1 && lastYear % 5 === 1) continue
        if (!special && !every) continue
        const y = topH + (year - YEAR_START) * rowH + rowH / 2
        ctx.font = `${special ? 10 : 9}px ui-sans-serif, system-ui, sans-serif`
        ctx.lineWidth = 3
        ctx.strokeStyle = pal.labelShadow
        ctx.strokeText(String(year), labelW - 6, y)
        ctx.fillStyle = year === 2025 ? pal.goldDeep : pal.ink
        ctx.fillText(String(year), labelW - 6, y)
      }

      if (focusIso) {
        const { y, m, d } = parseIso(focusIso)
        const fx = labelW + (ordinalInYear(y, m, d) - 1) * colW + colW / 2
        const fy = topH + (y - YEAR_START) * rowH + rowH / 2
        ctx.strokeStyle = pal.goldDeep
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(fx, fy, Math.max(writtenR + 2.5, 5), 0, Math.PI * 2)
        ctx.stroke()
      }

      const nextMarks = lifeMarks.map(marker => {
        if (marker.iso < birth || marker.iso >= end) return null
        const { y, m, d } = parseIso(marker.iso)
        const x = labelW + (ordinalInYear(y, m, d) - 1) * colW + colW / 2
        const cy = topH + (y - YEAR_START) * rowH + rowH / 2
        ctx.strokeStyle = pal.mark
        ctx.fillStyle = pal.written
        ctx.lineWidth = 1.8
        ctx.beginPath()
        ctx.arc(x, cy, Math.max(writtenR + 3.2, 6), 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(x, cy, 1.6, 0, Math.PI * 2)
        ctx.fill()
        return {
          ...marker,
          left: x,
          top: cy,
          flip: x > width * 0.58
        }
      }).filter(Boolean)
      setMarks(nextMarks)

      const nextLinks = Object.keys(postMap).map(iso => {
        const post = postMap[iso]
        const { y, m, d } = parseIso(iso)
        const x = labelW + (ordinalInYear(y, m, d) - 1) * colW + colW / 2
        const cy = topH + (y - YEAR_START) * rowH + rowH / 2
        const hit = Math.max(width < 640 ? 18 : 12, writtenR * 3)
        return {
          ...post,
          date: iso,
          left: x - hit / 2,
          top: cy - hit / 2,
          size: hit
        }
      })
      setLinks(nextLinks)
    }

    paint()
    const ro = new ResizeObserver(paint)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [cells, dark, yearCount, postMap, focusIso, birth, end, lifeMarks])

  const onMove = event => {
    const layout = layoutRef.current
    const canvas = canvasRef.current
    if (!layout || !canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const col = Math.floor((x - layout.labelW) / layout.colW)
    const row = Math.floor((y - layout.topH) / layout.rowH)
    if (col < 0 || col >= COLS || row < 0 || row >= yearCount) {
      setTip(null)
      return
    }
    const year = YEAR_START + row
    const cell = cellIndex.get(`${year}-${col}`)
    if (!cell) {
      setTip(null)
      return
    }
    const post = postMap[cell.iso]
    const phase =
      cell.state === STATE.MENGMEI
        ? '蒙昧'
        : cell.state === STATE.AWAKE
          ? '不断摆脱蒙昧'
          : cell.state === STATE.WRITTEN
            ? post?.title || '不断摆脱蒙昧'
            : '尚未到来'
    const extra = post?.note ? ` · ${post.note}` : ''
    setTip({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      text: `${formatDotDate(cell.iso)}  ${phase}${extra}`
    })
  }

  const openYear = year => {
    const y = Math.min(lastYear, Math.max(YEAR_START, year))
    setExpandedYear(y)
  }

  const onCanvasClick = event => {
    const layout = layoutRef.current
    const canvas = canvasRef.current
    if (!layout || !canvas) return
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    const row = Math.floor((y - layout.topH) / layout.rowH)
    if (row < 0 || row >= yearCount) return
    const year = YEAR_START + row
    const col = Math.floor((event.clientX - rect.left - layout.labelW) / layout.colW)
    const cell = cellIndex.get(`${year}-${col}`)
    if (cell) setFocusIso(cell.iso)
    openYear(year)
  }

  useEffect(() => {
    if (expandedYear == null) return undefined
    sheetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    return undefined
  }, [expandedYear])

  const pickDay = day => {
    setFocusIso(day.iso)
    openYear(parseIso(day.iso).y)
    if (day.post?.href) router.push(day.post.href)
  }

  const commitQuery = value => setQuery(value)

  const onSearchPick = item => {
    setDraft(item.title)
    setQuery('')
    setDraft('')
    if (item.href) {
      router.push(item.href)
      return
    }
    pickDay({
      iso: item.date,
      post: null,
      state: item.state
    })
  }

  return (
    <div id='notion-article' className='ob-ex'>
      <style>{`
        .ob-ex {
          --ob-gold: #C9A66B;
          --ob-gold-deep: #8A5A1F;
          --ob-ink: #2C241C;
          --ob-muted: #5A4D40;
          --ob-line: rgba(44, 36, 28, 0.16);
          --ob-card: rgba(255, 252, 247, 0.86);
          --ob-panel: rgba(255, 252, 247, 0.78);
          color: var(--ob-ink);
          width: 100%;
          max-width: 100%;
          padding: 0.2rem 0 2.5rem;
        }
        .dark .ob-ex {
          --ob-gold: #E2C48A;
          --ob-gold-deep: #F0D9A0;
          --ob-ink: #F6F1E8;
          --ob-muted: #D2C4B0;
          --ob-line: rgba(246, 241, 232, 0.18);
          --ob-card: rgba(26, 23, 20, 0.82);
          --ob-panel: rgba(22, 19, 16, 0.78);
        }
        .ob-ex-title {
          margin: 0 0 8px;
          font-size: 1.7rem;
          letter-spacing: 0.16em;
          font-weight: 700;
          line-height: 1.3;
        }
        .ob-ex-motto {
          margin: 0.65rem 0 1.15rem;
          padding: 0.85rem 0 0.85rem 1rem;
          border-left: 3px solid var(--ob-gold);
          font-size: 1.02rem;
          font-weight: 700;
          line-height: 1.7;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .ob-ex-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin: 0 0 1.25rem;
          padding: 1rem 1rem 1.15rem;
          border: 1px solid var(--ob-line);
          border-radius: 14px;
          background: var(--ob-card);
          backdrop-filter: blur(10px);
        }
        .ob-ex-hg {
          position: relative;
          width: 86px;
          height: 148px;
          margin: 0.1rem auto 0.15rem;
          filter: drop-shadow(0 6px 10px rgba(28, 22, 16, 0.12));
        }
        .ob-ex-hg-top,
        .ob-ex-hg-bot {
          position: relative;
          width: 86px;
          height: 64px;
          overflow: hidden;
          background: color-mix(in srgb, var(--ob-ink) 7%, transparent);
        }
        .ob-ex-hg-top {
          clip-path: polygon(4% 0, 96% 0, 56% 100%, 44% 100%);
        }
        .ob-ex-hg-bot {
          clip-path: polygon(44% 0, 56% 0, 96% 100%, 4% 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .ob-ex-hg-neck {
          width: 12px;
          height: 12px;
          margin: -2px auto;
          border-radius: 2px;
          background: linear-gradient(to bottom, var(--ob-gold), var(--ob-gold-deep));
          box-shadow: 0 0 10px color-mix(in srgb, var(--ob-gold) 70%, transparent);
          animation: ob-ex-pulse 1.8s ease-in-out infinite;
          z-index: 2;
        }
        .ob-ex-hg-sand-top {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--ob-gold) 35%, transparent),
            color-mix(in srgb, var(--ob-gold) 70%, transparent)
          );
        }
        .ob-ex-hg-sand-bot {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .ob-ex-hg-sand-bot .is-mengmei {
          background: color-mix(in srgb, var(--ob-ink) 38%, transparent);
        }
        .ob-ex-hg-sand-bot .is-awake {
          background: linear-gradient(180deg, var(--ob-gold), var(--ob-gold-deep));
        }
        .ob-ex-hg-grain {
          position: absolute;
          left: 50%;
          width: 4px;
          height: 4px;
          margin-left: -2px;
          border-radius: 50%;
          background: var(--ob-gold);
          animation: ob-ex-fall 1.7s linear infinite;
        }
        .ob-ex-hg-grain.g2 { animation-delay: 0.55s; width: 3px; height: 3px; }
        .ob-ex-hg-grain.g3 { animation-delay: 1.1s; width: 5px; height: 5px; }
        @keyframes ob-ex-fall {
          0% { top: 42%; opacity: 0; }
          18% { opacity: 1; }
          100% { top: 78%; opacity: 0.1; }
        }
        @keyframes ob-ex-pulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.08); filter: brightness(1.25); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-ex-hg-grain, .ob-ex-hg-neck { animation: none; }
        }
        .ob-ex-urgent {
          margin: 0;
          font-size: 0.98rem;
          line-height: 1.75;
          letter-spacing: 0.02em;
          font-weight: 600;
        }
        .ob-ex-urgent b {
          color: var(--ob-gold-deep);
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        .ob-ex-count {
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .ob-ex-why {
          margin: 0.45rem 0 0;
          font-size: 12px;
          line-height: 1.65;
          color: var(--ob-muted);
          letter-spacing: 0.02em;
        }
        .ob-ex-phases {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin: 0.85rem 0 0.7rem;
        }
        .ob-ex-phase-name {
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.16em;
        }
        .ob-ex-phase-range {
          margin-top: 4px;
          font-size: 12px;
          color: var(--ob-muted);
          letter-spacing: 0.04em;
        }
        .ob-ex-phase-count {
          margin-top: 2px;
          font-size: 12px;
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums;
        }
        .ob-ex-phase.is-awake .ob-ex-phase-name { color: var(--ob-gold-deep); }
        .ob-ex-bar {
          display: flex;
          height: 8px;
          margin: 0;
          overflow: hidden;
          border-radius: 999px;
          background: color-mix(in srgb, var(--ob-ink) 8%, transparent);
        }
        .ob-ex-bar span { display: block; height: 100%; }
        .ob-ex-bar .is-mengmei { background: color-mix(in srgb, var(--ob-ink) 28%, transparent); }
        .ob-ex-bar .is-awake { background: var(--ob-gold); }
        .ob-ex-bar .is-future { background: transparent; }
        .ob-ex-chart {
          margin-top: 0.15rem;
          padding: 0.95rem 0.9rem 1.05rem;
          border: 1px solid var(--ob-line);
          border-radius: 14px;
          background: var(--ob-panel);
          backdrop-filter: blur(12px);
        }
        .ob-ex-chart-head {
          margin: 0 0 0.7rem;
          padding-bottom: 0.7rem;
          border-bottom: 1px solid var(--ob-line);
        }
        .ob-ex-note {
          margin: 0;
          font-size: 12px;
          line-height: 1.75;
          color: var(--ob-muted);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .ob-ex-search {
          position: relative;
          margin-top: 0.75rem;
          width: 100%;
        }
        .ob-ex-search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 12px;
          border: 1px solid var(--ob-line);
          border-radius: 10px;
          background: color-mix(in srgb, var(--ob-card) 88%, transparent);
        }
        .ob-ex-search-box:focus-within {
          border-color: color-mix(in srgb, var(--ob-gold-deep) 70%, var(--ob-line));
        }
        .ob-ex-search-box input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          color: var(--ob-ink);
          font: inherit;
          font-size: 14px;
          outline: none;
          min-height: 44px;
        }
        .ob-ex-search-box input::placeholder {
          color: var(--ob-muted);
        }
        .ob-ex-search-hits {
          position: absolute;
          z-index: 8;
          left: 0;
          right: 0;
          top: calc(100% + 4px);
          margin: 0;
          padding: 6px 0;
          list-style: none;
          border: 1px solid var(--ob-line);
          border-radius: 10px;
          background: var(--ob-card);
          backdrop-filter: blur(10px);
          box-shadow: 0 12px 32px rgba(28, 22, 16, 0.12);
          max-height: 16rem;
          overflow: auto;
        }
        .ob-ex-search-hits button {
          display: block;
          width: 100%;
          text-align: left;
          border: 0;
          background: none;
          color: var(--ob-ink);
          font: inherit;
          font-size: 13px;
          padding: 10px 12px;
          cursor: pointer;
        }
        .ob-ex-search-hits button:hover,
        .ob-ex-search-hits button:focus-visible {
          background: color-mix(in srgb, var(--ob-gold) 16%, transparent);
        }
        .ob-ex-focusline {
          margin: 0.35rem 0 0;
          font-size: 12px;
          color: var(--ob-gold-deep);
          letter-spacing: 0.04em;
        }
        .ob-ex-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 18px;
          margin: 0.7rem 0 0.85rem;
          font-size: 12px;
          color: var(--ob-muted);
          letter-spacing: 0.04em;
        }
        .ob-ex-legend b {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 6px;
          border-radius: 50%;
          vertical-align: 1px;
        }
        .ob-ex-legend .dot-m { background: color-mix(in srgb, var(--ob-ink) 28%, transparent); }
        .ob-ex-legend .dot-w { background: var(--ob-gold); width: 8px; height: 8px; }
        .ob-ex-mark {
          position: absolute;
          z-index: 4;
          pointer-events: none;
          transform: translate(-50%, 8px);
        }
        .ob-ex-mark.is-flip {
          transform: translate(calc(-100% + 10px), 8px);
        }
        .ob-ex-mark-lab {
          display: block;
          padding: 4px 7px;
          border-radius: 8px;
          background: var(--ob-card);
          border: 1px solid var(--ob-gold);
          color: var(--ob-ink);
          font-size: 10px;
          line-height: 1.35;
          letter-spacing: 0.02em;
          white-space: nowrap;
          box-shadow: 0 6px 16px rgba(28, 22, 16, 0.1);
        }
        .ob-ex-mark-lab em {
          display: block;
          font-style: normal;
          font-weight: 700;
          color: var(--ob-gold-deep);
        }
        .ob-ex-legend .dot-f {
          background: transparent;
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ob-ink) 18%, transparent);
        }
        .ob-ex-field {
          position: relative;
          width: 100%;
          min-height: 36rem;
        }
        .ob-ex-field canvas {
          display: block;
          width: 100%;
          cursor: crosshair;
        }
        .ob-ex-hit {
          position: absolute;
          display: block;
          border-radius: 50%;
          z-index: 2;
        }
        .ob-ex-hit:focus-visible {
          outline: 2px solid var(--ob-gold-deep);
          outline-offset: 1px;
        }
        .ob-ex-tip {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          transform: translate(-10px, -140%);
          padding: 6px 8px;
          border-radius: 8px;
          background: var(--ob-card);
          backdrop-filter: blur(10px);
          color: var(--ob-ink);
          border: 1px solid var(--ob-line);
          font-size: 12px;
          letter-spacing: 0.03em;
          white-space: nowrap;
          max-width: min(80vw, 22rem);
          overflow: hidden;
          text-overflow: ellipsis;
          box-shadow: 0 8px 24px rgba(28, 22, 16, 0.12);
        }
        .ob-ex .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .ob-ex-sheet {
          margin-top: 0.9rem;
          padding-top: 0.9rem;
          border-top: 1px solid var(--ob-line);
        }
        .ob-ex-sheet-bar {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ob-ex-sheet-year {
          font-weight: 700;
          letter-spacing: 0.14em;
          min-width: 3.5rem;
          text-align: center;
        }
        .ob-ex-sheet-nav,
        .ob-ex-sheet-close {
          border: 1px solid var(--ob-line);
          background: transparent;
          color: var(--ob-ink);
          border-radius: 8px;
          min-height: 40px;
          min-width: 40px;
          cursor: pointer;
          font: inherit;
        }
        .ob-ex-sheet-close {
          margin-left: auto;
          padding: 0 12px;
          letter-spacing: 0.08em;
        }
        .ob-ex-sheet-nav:disabled { opacity: 0.35; cursor: default; }
        .ob-ex-sheet-hint {
          margin: 8px 0 12px;
          font-size: 12px;
          color: var(--ob-muted);
        }
        .ob-ex-months {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem 1.25rem;
        }
        .ob-ex-month-name {
          font-size: 12px;
          letter-spacing: 0.12em;
          margin-bottom: 6px;
          font-weight: 700;
        }
        .ob-ex-cal {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 3px;
        }
        .ob-ex-wd {
          text-align: center;
          font-size: 10px;
          color: var(--ob-muted);
          letter-spacing: 0.08em;
        }
        .ob-ex-day {
          min-height: 36px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--ob-ink);
          font: inherit;
          font-size: 12px;
          font-variant-numeric: tabular-nums;
          cursor: pointer;
        }
        .ob-ex-day.is-pad,
        .ob-ex-day:disabled {
          cursor: default;
          opacity: 0.25;
        }
        .ob-ex-day.is-mengmei { background: color-mix(in srgb, var(--ob-ink) 10%, transparent); }
        .ob-ex-day.is-awake { background: transparent; }
        .ob-ex-day.is-written,
        .ob-ex-day.is-link {
          background: var(--ob-gold);
          color: #2C241C;
          font-weight: 700;
        }
        .ob-ex-day.is-future {
          box-shadow: inset 0 0 0 1px var(--ob-line);
        }
        .ob-ex-day.is-focus {
          outline: 2px solid var(--ob-gold-deep);
          outline-offset: 1px;
        }
        @media (max-width: 639px) {
          .ob-ex { padding: 0 0 2rem; }
          .ob-ex-title {
            font-size: 1.45rem;
            letter-spacing: 0.1em;
          }
          .ob-ex-motto {
            font-size: 0.95rem;
            padding: 0.65rem 0 0.65rem 0.8rem;
            white-space: normal;
          }
          .ob-ex-note { white-space: normal; }
          .ob-ex-mark-lab { white-space: normal; max-width: 9.2rem; }
          .ob-ex-hero { padding: 0.85rem 0.8rem 1rem; }
          .ob-ex-urgent { font-size: 0.92rem; }
          .ob-ex-count { white-space: normal; }
          .ob-ex-chart { padding: 0.75rem 0.6rem 0.9rem; }
          .ob-ex-note { font-size: 12px; }
          .ob-ex-day { min-height: 40px; }
          .ob-ex-field { min-height: 0; }
        }
        @media (min-width: 640px) {
          .ob-ex-title { font-size: 2rem; }
          .ob-ex-motto { font-size: 1.12rem; }
          .ob-ex-search { max-width: 22.5rem; }
          .ob-ex-hero {
            grid-template-columns: 7.2rem minmax(0, 1fr);
            align-items: center;
            column-gap: 1.4rem;
          }
          .ob-ex-hg { margin: 0; }
          .ob-ex-phases { grid-template-columns: 1fr 1fr; gap: 16px; }
          .ob-ex-months { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .ob-ex { padding-top: 0.35rem; }
          .ob-ex-months { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
      `}</style>

      <header>
        <h1 className='ob-ex-title'>我的存在</h1>
        <blockquote className='ob-ex-motto'>{mottoText}</blockquote>
      </header>

      <div className='ob-ex-hero'>
        <div
          className='ob-ex-hg'
          role='img'
          aria-label={`新生命已过 ${nf(clock.elapsedDays)} / ${nf(clock.totalDays)} 日，剩余 ${nf(clock.remainHours)} 小时`}>
          <div className='ob-ex-hg-top'>
            <div
              className='ob-ex-hg-sand-top'
              style={{
                height: `${Math.max(8, (clock.days / Math.max(clock.totalDays, 1)) * 100)}%`
              }}
            />
          </div>
          <div className='ob-ex-hg-neck' />
          <div className='ob-ex-hg-bot'>
            <div
              className='ob-ex-hg-sand-bot'
              style={{
                height: `${Math.max(8, (clock.elapsedDays / Math.max(clock.totalDays, 1)) * 100)}%`
              }}>
              <span className='is-awake' style={{ flexGrow: 1, display: 'block', minHeight: 0 }} />
            </div>
          </div>
          <span className='ob-ex-hg-grain' />
          <span className='ob-ex-hg-grain g2' />
          <span className='ob-ex-hg-grain g3' />
        </div>
        <div>
          <p className='ob-ex-urgent' suppressHydrationWarning>
            如果我的存在将终结于 {newYears} 岁，那么截至 {clock.todayZh}，已经过去{' '}
            <b>
              {nf(clock.elapsedDays)} / {nf(clock.totalDays)}
            </b>
            ，仅剩余 <b>{nf(clock.remainHours)}</b> 个小时。还剩余{' '}
            <span className='ob-ex-count'>
              {nf(clock.days)} 日 {pad2(clock.hours)} 时 {pad2(clock.minutes)} 分{' '}
              {pad2(clock.seconds)} 秒
            </span>
            。
          </p>
          <p className='ob-ex-why'>
            图按八十岁画这一生。倒计时从 2025.3.28 零点起，按五十岁走到 2075.3.27 23:59。
          </p>
          <div className='ob-ex-phases'>
            <div className='ob-ex-phase is-mengmei'>
              <div className='ob-ex-phase-name'>蒙昧</div>
              <div className='ob-ex-phase-range'>
                {formatDotDate(birth)} — {formatDotDate(mengmeiEnd)}
              </div>
              <div className='ob-ex-phase-count'>{nf(mengmeiDays)} 日</div>
            </div>
            <div className='ob-ex-phase is-awake'>
              <div className='ob-ex-phase-name'>不断摆脱蒙昧</div>
              <div className='ob-ex-phase-range'>
                {formatDotDate(firstWritten)}-{formatDotDate(awakening)}—今
              </div>
              <div className='ob-ex-phase-count'>
                已过 {nf(awakeDays)} 日 · 已发布 {nf(writtenDays)} 篇
              </div>
            </div>
          </div>
          <div
            className='ob-ex-bar'
            role='img'
            aria-label={`按 ${years} 岁计共 ${nf(totalDays)} 日`}>
            <span className='is-mengmei' style={{ flexGrow: mengmeiDays }} />
            <span className='is-awake' style={{ flexGrow: Math.max(awakeDays, 1) }} />
            <span className='is-future' style={{ flexGrow: Math.max(futureDays, 0) }} />
          </div>
        </div>
      </div>

      <section className='ob-ex-chart' aria-label='生命点图'>
      <div className='ob-ex-chart-head'>
        <p className='ob-ex-note'>
          按 {years} 岁计，从 {formatDotDate(birth)} 到 {formatDotDate(shiftIso(end, -1))}，共 {nf(totalDays)} 日。每一个点是一天。亮着的日子，可以进去。点一行年份，可以按月点开那一年。
        </p>
        <form
          className='ob-ex-search'
          role='search'
          onSubmit={event => event.preventDefault()}>
          <label className='sr-only' htmlFor='ob-ex-search-input'>
            找站主的那一天
          </label>
          <div className='ob-ex-search-box'>
            <i className='fa-solid fa-magnifying-glass' aria-hidden='true' />
            <input
              id='ob-ex-search-input'
              type='text'
              name='q'
              value={draft}
              autoComplete='off'
              spellCheck='false'
              enterKeyHint='search'
              placeholder='找站主的那一天，例如 2025.3.28'
              onChange={event => {
                const value = event.target.value
                setDraft(value)
                if (!composingRef.current) commitQuery(value)
              }}
              onCompositionStart={() => {
                composingRef.current = true
              }}
              onCompositionEnd={event => {
                composingRef.current = false
                const value = event.target.value
                setDraft(value)
                commitQuery(value)
              }}
            />
          </div>
          {query.trim() ? (
            <ul className='ob-ex-search-hits'>
              {hits.length ? (
                hits.map(item => (
                  <li key={item.id || item.date}>
                    <button type='button' onClick={() => onSearchPick(item)}>
                      {item.title}
                    </button>
                  </li>
                ))
              ) : (
                <li>
                  <button type='button' disabled>
                    没有这一天的留下
                  </button>
                </li>
              )}
            </ul>
          ) : null}
        </form>
        {focusIso ? (
          <p className='ob-ex-focusline'>
            {formatDotDate(focusIso)}
            {' · '}
            {phaseLabel(dayState(focusIso, meta) || STATE.FUTURE)}
            {postMap[focusIso] ? ` · ${postMap[focusIso].title}` : ''}
            {postMap[focusIso]?.note ? ` · ${postMap[focusIso].note}` : ''}
          </p>
        ) : null}
      </div>
      <div className='ob-ex-legend' aria-hidden='true'>
        <span>
          <b className='dot-m' />
          蒙昧
        </span>
        <span>
          <b className='dot-w' />
          不断摆脱蒙昧
        </span>
        <span>
          <b className='dot-f' />
          尚未到来
        </span>
      </div>

      <div className='ob-ex-field' ref={wrapRef}>
        <canvas
          ref={canvasRef}
          onMouseMove={onMove}
          onMouseLeave={() => setTip(null)}
          onClick={onCanvasClick}
          aria-hidden='true'
        />
        {links.map(link => (
          <SmartLink
            key={`${link.href}-${link.date}`}
            className='ob-ex-hit'
            href={link.href}
            title={link.title}
            style={{
              left: link.left,
              top: link.top,
              width: link.size,
              height: link.size
            }}
          />
        ))}
        {marks.map(mark => (
          <div
            key={mark.iso}
            className={`ob-ex-mark${mark.flip ? ' is-flip' : ''}`}
            style={{ left: mark.left, top: mark.top }}>
            <span className='ob-ex-mark-lab'>
              {formatDotDate(mark.iso)}
              <em>{mark.label}</em>
            </span>
          </div>
        ))}
        {tip ? (
          <div className='ob-ex-tip' style={{ left: tip.x, top: tip.y }}>
            {tip.text}
          </div>
        ) : null}
      </div>
      {expandedYear ? (
        <div ref={sheetRef}>
          <YearSheet
            year={expandedYear}
            minYear={YEAR_START}
            maxYear={lastYear}
            meta={meta}
            focusIso={focusIso}
            onPick={pickDay}
            onClose={() => setExpandedYear(null)}
            onShift={delta => openYear(expandedYear + delta)}
          />
        </div>
      ) : null}
      </section>

      <nav className='sr-only' aria-label='不断摆脱蒙昧的日子'>
        <ul>
          {written.map(post => (
            <li key={post.id || post.date}>
              <a href={post.href}>{post.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default ExistenceLife
