import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useEffect, useId, useRef, useState } from 'react'
import {
  collectDaoSpeech,
  DAO_VOICES,
  daoSpeechUrl
} from '@/lib/reading/daoSpeech'
import CONFIG from '../config'
import { UI_LANGUAGE_LABELS, uiLanguageOptions } from '../readingSettings'

function Icon({ name }) {
  const paths = {
    audio: 'M4 14v-4a8 8 0 0 1 16 0v4M4 12H2v7h4v-7H4m16 0h2v7h-4v-7h2',
    language:
      'M3 5h12M9 2v3M5 5c0 6 5 10 9 12M13 5c-1 6-5 10-10 12M14 21l4-11 4 11m-6-4h4',
    theme: 'M20 15a8 8 0 0 1-11-11A8 8 0 1 0 20 15Z',
    contents: 'M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01',
    comments: 'M21 11a8 8 0 0 1-8 8H7l-4 3 1-6a8 8 0 1 1 17-5Z',
    top: 'M12 20V4m-7 7 7-7 7 7'
  }
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d={paths[name]} />
    </svg>
  )
}

export default function DaoReaderTools({
  articleId,
  title,
  onOpenContents,
  onOpenComments
}) {
  const {
    lang = 'zh-CN',
    changeLang,
    isDarkMode,
    setDarkMode,
    toggleDarkMode
  } = useGlobal() || {}
  const english = lang.startsWith('en')
  const [panel, setPanel] = useState(null)
  const [voice, setVoice] = useState('xiaoxiao')
  const [rate, setRate] = useState(1)
  const [state, setState] = useState('idle')
  const [position, setPosition] = useState(0)
  const [count, setCount] = useState(0)
  const [error, setError] = useState('')
  const [follow, setFollow] = useState(false)
  const container = useRef(null),
    audio = useRef(null),
    trigger = useRef(null)
  const chunks = useRef([]),
    current = useRef(0),
    wantsPlay = useRef(false)
  const requestId = useRef(0),
    loading = useRef(false),
    voiceRef = useRef('xiaoxiao'),
    rateRef = useRef(1)
  const marked = useRef(null)
  const mounted = useRef(true)
  const mediaCommands = useRef({})
  const pendingFetch = useRef(null)
  const temporaryAudio = useRef(null)
  const nextBuffer = useRef(null)
  const panelId = useId()
  const languages = uiLanguageOptions(
    siteConfig('OURBEINGS_UI_LANGUAGES', CONFIG.OURBEINGS_UI_LANGUAGES, CONFIG),
    lang
  )
  const prepare = () => {
    if (!chunks.current.length) {
      const root = document.querySelector(
        '#theme-my-theme.ob-dao-reading .ob-article-body #notion-article'
      )
      chunks.current = collectDaoSpeech(root, title)
      setCount(chunks.current.length)
    }
    return chunks.current
  }
  const mark = index => {
    marked.current?.removeAttribute('data-ob-speaking')
    marked.current = chunks.current[index]?.node || null
    marked.current?.setAttribute('data-ob-speaking', 'true')
    if (follow)
      marked.current?.scrollIntoView({
        block: 'center',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth'
      })
  }
  const releaseBuffer = () => {
    pendingFetch.current?.abort()
    pendingFetch.current = null
    if (temporaryAudio.current) {
      URL.revokeObjectURL(temporaryAudio.current)
      temporaryAudio.current = null
    }
  }
  const releaseNext = () => {
    const next = nextBuffer.current
    nextBuffer.current = null
    if (!next) return
    next.cancelled = true
    next.controller?.abort()
    if (next.url) URL.revokeObjectURL(next.url)
  }
  const preloadNext = (index, selectedVoice) => {
    if (typeof URL.createObjectURL !== 'function' || !chunks.current[index + 1])
      return
    if (
      nextBuffer.current?.index === index + 1 &&
      nextBuffer.current.voice === selectedVoice
    )
      return
    releaseNext()
    const slot = {
      index: index + 1,
      voice: selectedVoice,
      controller:
        typeof AbortController === 'function' ? new AbortController() : null,
      url: null,
      cancelled: false
    }
    nextBuffer.current = slot
    slot.promise = (async () => {
      try {
        const response = await fetch(
          daoSpeechUrl(chunks.current[slot.index].text, selectedVoice),
          { cache: 'no-store', signal: slot.controller?.signal }
        )
        if (
          !response.ok ||
          !response.headers.get('content-type')?.includes('audio/mpeg')
        )
          return null
        const blob = await response.blob()
        if (slot.cancelled) return null
        slot.url = URL.createObjectURL(blob)
        return slot.url
      } catch (_) {
        return null
      }
    })()
  }
  const playPart = async (index, selectedVoice = voiceRef.current) => {
    const parts = prepare(),
      player = audio.current
    if (!player || !parts.length) {
      setError('empty')
      return
    }
    const target = Math.max(0, Math.min(index, parts.length - 1))
    const attempt = ++requestId.current
    const queued =
      nextBuffer.current?.index === target &&
      nextBuffer.current.voice === selectedVoice
        ? nextBuffer.current
        : null
    if (queued) nextBuffer.current = null
    else releaseNext()
    releaseBuffer()
    wantsPlay.current = true
    loading.current = true
    player.pause()
    if (!queued) player.src = daoSpeechUrl(parts[target].text, selectedVoice)
    player.playbackRate = rateRef.current
    current.current = target
    setPosition(target)
    setError('')
    setState('loading')
    mark(target)
    try {
      if (queued) {
        pendingFetch.current = queued.controller
        const source = queued.url || (await queued.promise)
        if (requestId.current !== attempt) {
          if (source) URL.revokeObjectURL(source)
          return
        }
        if (source) {
          temporaryAudio.current = source
          player.src = source
        } else player.src = daoSpeechUrl(parts[target].text, selectedVoice)
      }
      player.defaultPlaybackRate = rateRef.current
      player.playbackRate = rateRef.current
      if ('preservesPitch' in player) player.preservesPitch = true
      await player.play()
      if (requestId.current === attempt) {
        loading.current = false
        setState('playing')
        preloadNext(target, selectedVoice)
      }
    } catch (reason) {
      if (requestId.current !== attempt) return
      // Some embedded browsers cannot play an HTTP stream without byte ranges.
      // Generate this passage now and buffer it only in memory, then use the same
      // native player. No recordings are created or persisted on the server.
      if (
        reason.name !== 'NotAllowedError' &&
        reason.name !== 'AbortError' &&
        typeof URL.createObjectURL === 'function'
      ) {
        try {
          loading.current = true
          setState('loading')
          const controller =
            typeof AbortController === 'function' ? new AbortController() : null
          pendingFetch.current = controller
          const response = await fetch(
            daoSpeechUrl(parts[target].text, selectedVoice),
            { cache: 'no-store', signal: controller?.signal }
          )
          if (
            !response.ok ||
            !response.headers.get('content-type')?.includes('audio/mpeg')
          )
            throw new Error('audio')
          const blob = await response.blob()
          if (requestId.current !== attempt) return
          temporaryAudio.current = URL.createObjectURL(blob)
          player.src = temporaryAudio.current
          player.playbackRate = rateRef.current
          wantsPlay.current = true
          await player.play()
          if (requestId.current === attempt) {
            loading.current = false
            setState('playing')
            preloadNext(target, selectedVoice)
          }
          return
        } catch (fallbackError) {
          if (requestId.current !== attempt) return
          reason = fallbackError
        }
      }
      wantsPlay.current = false
      loading.current = false
      setState('paused')
      setError(reason.name === 'NotAllowedError' ? 'gesture' : 'network')
    }
  }
  const stop = () => {
    requestId.current++
    releaseBuffer()
    releaseNext()
    wantsPlay.current = false
    loading.current = false
    audio.current?.pause()
    audio.current?.removeAttribute('src')
    audio.current?.load()
    marked.current?.removeAttribute('data-ob-speaking')
    current.current = 0
    setPosition(0)
    setState('idle')
    setError('')
  }
  const pause = () => {
    if (loading.current) {
      requestId.current++
      pendingFetch.current?.abort()
      loading.current = false
    }
    wantsPlay.current = false
    audio.current?.pause()
    setState('paused')
  }
  const play = async () => {
    if (state === 'playing') {
      pause()
      return
    }
    if (state === 'ended') {
      await playPart(0)
      return
    }
    // Resuming the same HTML audio element preserves the buffered live stream.
    const player = audio.current
    if (
      state === 'paused' &&
      (!error || error === 'gesture') &&
      player?.getAttribute('src')
    ) {
      wantsPlay.current = true
      setError('')
      try {
        await player.play()
        setState('playing')
      } catch (_) {
        wantsPlay.current = false
        setError('gesture')
      }
      return
    }
    await playPart(current.current)
  }
  const selectPart = index => {
    if (wantsPlay.current) {
      playPart(index)
      return
    }
    requestId.current++
    releaseBuffer()
    releaseNext()
    audio.current?.pause()
    audio.current?.removeAttribute('src')
    audio.current?.load()
    current.current = index
    setPosition(index)
    setState('paused')
    setError('')
    mark(index)
  }
  mediaCommands.current = {
    play,
    pause,
    stop,
    previoustrack: () => selectPart(Math.max(0, current.current - 1)),
    nexttrack: () =>
      selectPart(Math.min(chunks.current.length - 1, current.current + 1))
  }
  useEffect(() => {
    const session = navigator.mediaSession
    if (!session?.setActionHandler) return undefined
    if (typeof window.MediaMetadata === 'function')
      session.metadata = new window.MediaMetadata({
        title: title || '道 · 系列文章',
        artist: 'Our beings'
      })
    const actions = ['play', 'pause', 'stop', 'previoustrack', 'nexttrack']
    for (const action of actions) {
      try {
        session.setActionHandler(action, () =>
          mediaCommands.current[action]?.()
        )
      } catch (_) {}
    }
    return () => {
      for (const action of actions) {
        try {
          session.setActionHandler(action, null)
        } catch (_) {}
      }
    }
  }, [title])
  useEffect(() => {
    if (navigator.mediaSession) {
      try {
        navigator.mediaSession.playbackState =
          state === 'playing'
            ? 'playing'
            : state === 'paused'
              ? 'paused'
              : 'none'
      } catch (_) {}
    }
  }, [state])
  useEffect(() => {
    mounted.current = true
    try {
      const saved = localStorage.getItem('ob-reading-voice')
      if (DAO_VOICES.some(item => item.id === saved)) {
        setVoice(saved)
        voiceRef.current = saved
      }
      const savedRate = Number(localStorage.getItem('ob-reading-rate'))
      if (savedRate >= 0.5 && savedRate <= 3.5) {
        setRate(savedRate)
        rateRef.current = savedRate
      }
    } catch (_) {}
    const player = audio.current
    const pendingRequest = requestId
    const fetchInProgress = pendingFetch
    const bufferedUrl = temporaryAudio
    const queuedAudio = nextBuffer
    return () => {
      mounted.current = false
      pendingRequest.current++
      wantsPlay.current = false
      fetchInProgress.current?.abort()
      if (bufferedUrl.current) URL.revokeObjectURL(bufferedUrl.current)
      if (queuedAudio.current) {
        queuedAudio.current.cancelled = true
        queuedAudio.current.controller?.abort()
        if (queuedAudio.current.url)
          URL.revokeObjectURL(queuedAudio.current.url)
      }
      player?.pause()
      player?.removeAttribute('src')
      player?.load()
      marked.current?.removeAttribute('data-ob-speaking')
    }
  }, [articleId])
  useEffect(() => {
    if (!panel) return undefined
    const closeOutside = event => {
      if (!container.current?.contains(event.target)) setPanel(null)
    }
    const closeEscape = event => {
      if (event.key === 'Escape') {
        setPanel(null)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeEscape)
    container.current?.querySelector('[role="dialog"] button')?.focus()
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeEscape)
    }
  }, [panel])
  const open = (name, event) => {
    trigger.current = event.currentTarget
    if (name === 'audio') prepare()
    setPanel(value => (value === name ? null : name))
  }
  const switchVoice = value => {
    voiceRef.current = value
    setVoice(value)
    try {
      localStorage.setItem('ob-reading-voice', value)
    } catch (_) {}
    if (wantsPlay.current) playPart(current.current, value)
    else {
      requestId.current++
      releaseBuffer()
      releaseNext()
      audio.current?.removeAttribute('src')
      audio.current?.load()
      setState('paused')
      setError('')
    }
  }
  return (
    <aside
      className='ob-reader'
      ref={container}
      aria-label={english ? 'Reading tools' : '阅读工具'}
    >
      <audio
        ref={audio}
        preload='none'
        onLoadedMetadata={() => {
          if (audio.current) audio.current.playbackRate = rateRef.current
        }}
        onPlaying={() => {
          if (!mounted.current) return
          loading.current = false
          setState('playing')
        }}
        onPause={() => {
          if (!mounted.current) return
          if (!loading.current && !audio.current?.ended) setState('paused')
        }}
        onEnded={() => {
          if (!wantsPlay.current) return
          if (current.current + 1 < chunks.current.length)
            playPart(current.current + 1)
          else {
            wantsPlay.current = false
            setState('ended')
            marked.current?.removeAttribute('data-ob-speaking')
          }
        }}
        onError={() => {
          if (!mounted.current) return
          if (audio.current?.getAttribute('src')) {
            loading.current = false
            wantsPlay.current = false
            setState('paused')
            setError('network')
          }
        }}
      />
      <div className='ob-reader-bar'>
        <button
          type='button'
          aria-label={english ? 'Listen to article' : '文章朗读'}
          title={english ? 'Listen' : '文章朗读'}
          aria-expanded={panel === 'audio'}
          aria-controls={panel === 'audio' ? panelId : undefined}
          onClick={event => open('audio', event)}
          data-playing={state === 'playing'}
        >
          <Icon name='audio' />
        </button>
        <button
          type='button'
          aria-label={english ? 'Interface language' : '界面语言'}
          title={english ? 'Language' : '界面语言'}
          aria-expanded={panel === 'language'}
          aria-controls={panel === 'language' ? panelId : undefined}
          onClick={event => open('language', event)}
        >
          <Icon name='language' />
        </button>
        <button
          type='button'
          aria-label={
            english
              ? isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
              : isDarkMode
                ? '切换浅色模式'
                : '切换深色模式'
          }
          title={english ? 'Appearance' : '深浅色模式'}
          onClick={() =>
            setDarkMode ? setDarkMode(!isDarkMode) : toggleDarkMode?.()
          }
        >
          <Icon name='theme' />
        </button>
        {onOpenContents && (
          <button
            type='button'
            aria-label={english ? 'Article contents' : '打开文章目录'}
            title={english ? 'Contents' : '文章目录'}
            onClick={() => {
              setPanel(null)
              onOpenContents()
            }}
          >
            <Icon name='contents' />
          </button>
        )}
        {onOpenComments && (
          <button
            type='button'
            aria-label={english ? 'Go to comments' : '前往评论区'}
            title={english ? 'Comments' : '评论区'}
            onClick={() => {
              setPanel(null)
              onOpenComments()
            }}
          >
            <Icon name='comments' />
          </button>
        )}
        <button
          type='button'
          aria-label={english ? 'Back to top' : '回到文章顶部'}
          title={english ? 'Top' : '回到顶部'}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches
                ? 'instant'
                : 'smooth'
            })
          }
        >
          <Icon name='top' />
        </button>
      </div>
      {panel && (
        <section
          className='ob-reader-panel'
          role='dialog'
          id={panelId}
          aria-label={
            panel === 'audio'
              ? english
                ? 'Article narration'
                : '文章朗读设置'
              : english
                ? 'Interface language'
                : '界面语言设置'
          }
        >
          <div className='ob-reader-panel-head'>
            <strong>
              {panel === 'audio'
                ? english
                  ? 'Listen to this article'
                  : '听一篇文章'
                : english
                  ? 'Interface language'
                  : '界面语言'}
            </strong>
            <button
              type='button'
              aria-label={english ? 'Close reading settings' : '关闭阅读设置'}
              onClick={() => {
                setPanel(null)
                trigger.current?.focus()
              }}
            >
              ×
            </button>
          </div>
          {panel === 'audio' ? (
            <>
              <p className='ob-reader-note'>
                {english
                  ? 'Live AI narration · Original article text'
                  : '实时 AI 朗读 · 按当前原文生成'}
              </p>
              <label>
                {english ? 'Voice' : '朗读音色'}
                <select
                  value={voice}
                  onChange={event => switchVoice(event.target.value)}
                >
                  {['female', 'male'].map(gender => (
                    <optgroup
                      key={gender}
                      label={
                        english
                          ? gender === 'female'
                            ? 'Female voices · 5'
                            : 'Male voices · 5'
                          : gender === 'female'
                            ? '女声 · 五种'
                            : '男声 · 五种'
                      }
                    >
                      {DAO_VOICES.filter(item => item.gender === gender).map(
                        item => (
                          <option key={item.id} value={item.id}>
                            {english ? item.english : item.name}
                          </option>
                        )
                      )}
                    </optgroup>
                  ))}
                </select>
              </label>
              <p className='ob-reader-note ob-reader-voice-advice'>
                {english
                  ? 'For essays: Xiaoxiao for warm narration, Yunyang for analysis, Yunjian for expressive history.'
                  : '思辨分析可选云扬，温和叙事可选晓晓，历史叙事可试云健。'}
              </p>
              <label
                className='ob-reader-speed-label'
                htmlFor={panelId + '-rate'}
              >
                {english ? 'Speed' : '播放速度'}
                <span aria-hidden='true'>{rate.toFixed(2)}×</span>
              </label>
              <input
                type='range'
                id={panelId + '-rate'}
                aria-label={english ? 'Speed' : '播放速度'}
                aria-valuetext={rate.toFixed(2) + (english ? ' times' : '倍速')}
                min='0.5'
                max='3.5'
                step='0.05'
                value={rate}
                onChange={event => {
                  const value = Number(event.target.value)
                  setRate(value)
                  rateRef.current = value
                  if (audio.current) {
                    audio.current.defaultPlaybackRate = value
                    audio.current.playbackRate = value
                  }
                  try {
                    localStorage.setItem('ob-reading-rate', String(value))
                  } catch (_) {}
                }}
              />
              <div className='ob-reader-time'>
                <span>0.5×</span>
                <span>3.5×</span>
              </div>
              <div className='ob-reader-playback'>
                <button
                  type='button'
                  disabled={!count || position === 0 || state === 'loading'}
                  onClick={() => selectPart(position - 1)}
                  aria-label={english ? 'Previous passage' : '上一段'}
                >
                  ‹
                </button>
                <button
                  type='button'
                  className='ob-reader-play'
                  disabled={state === 'loading'}
                  onClick={play}
                >
                  {state === 'playing'
                    ? english
                      ? 'Pause'
                      : '暂停'
                    : state === 'loading'
                      ? english
                        ? 'Connecting…'
                        : '正在连接…'
                      : english
                        ? 'Play'
                        : '播放'}
                </button>
                <button type='button' onClick={stop}>
                  {english ? 'Stop' : '停止'}
                </button>
                <button
                  type='button'
                  disabled={
                    !count || position >= count - 1 || state === 'loading'
                  }
                  onClick={() => selectPart(position + 1)}
                  aria-label={english ? 'Next passage' : '下一段'}
                >
                  ›
                </button>
              </div>
              <input
                type='range'
                aria-label={english ? 'Reading position' : '朗读位置'}
                min='0'
                max={Math.max(0, count - 1)}
                step='1'
                value={position}
                disabled={!count || state === 'loading'}
                onChange={event => selectPart(Number(event.target.value))}
              />
              <p className='ob-reader-note' role='status'>
                {count
                  ? english
                    ? 'Passage ' + (position + 1) + ' of ' + count
                    : '第 ' + (position + 1) + ' / ' + count + ' 段'
                  : english
                    ? 'Press play when the article has loaded.'
                    : '正文载入后即可播放。'}
              </p>
              <label className='ob-reader-follow'>
                <input
                  type='checkbox'
                  checked={follow}
                  onChange={event => setFollow(event.target.checked)}
                />
                {english ? 'Follow the current passage' : '跟随朗读段落'}
              </label>
              {error && (
                <p className='ob-reader-error' role='alert'>
                  {english
                    ? error === 'gesture'
                      ? 'Tap play to continue in this browser.'
                      : error === 'empty'
                        ? 'The article is still loading. Please try again.'
                        : 'Narration could not connect. Tap play to retry.'
                    : error === 'gesture'
                      ? '当前浏览器需要手动点击播放，请点播放继续。'
                      : error === 'empty'
                        ? '正文尚在载入，请稍后再点播放。'
                        : '朗读暂时无法连接，请点播放重试。'}
                </p>
              )}
            </>
          ) : (
            <>
              <label>
                {english ? 'Select language' : '选择语言'}
                <select
                  value={lang}
                  onChange={event => changeLang?.(event.target.value)}
                >
                  {languages.map(code => (
                    <option key={code} value={code}>
                      {UI_LANGUAGE_LABELS[code]}
                    </option>
                  ))}
                </select>
              </label>
              <p className='ob-reader-note'>
                {english
                  ? 'Changes the interface. Articles and narration remain in their original language.'
                  : '切换界面文字，文章与朗读保持原文。'}
              </p>
            </>
          )}
        </section>
      )}
      <style jsx global>{`
        .ob-reader {
          position: fixed;
          right: max(18px, env(safe-area-inset-right));
          bottom: 14vh;
          z-index: 45;
          color: var(--ob-ink);
          font:
            14px/1.6 system-ui,
            sans-serif;
        }
        .ob-reader audio {
          display: none;
        }
        .ob-reader-bar {
          display: flex;
          flex-direction: column;
          padding: 4px;
          background: var(--ob-paper);
          border: 1px solid var(--ob-rule);
          border-radius: 28px;
          box-shadow: 0 6px 24px #00000012;
        }
        .ob-reader button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-height: 44px;
          min-width: 44px;
          border-radius: 22px;
          background: transparent;
          color: inherit;
          cursor: pointer;
          border: 0;
        }
        .ob-reader button:hover,
        .ob-reader button[aria-expanded='true'] {
          background: var(--ob-inset);
        }
        .ob-reader button[data-playing='true'] {
          color: var(--ob-link);
          background: var(--ob-inset);
        }
        .ob-reader button:disabled {
          opacity: 0.45;
          cursor: default;
        }
        .ob-reader-panel {
          position: absolute;
          right: 68px;
          bottom: 0;
          width: 320px;
          max-height: min(640px, 80dvh);
          overflow: auto;
          padding: 20px;
          background: var(--ob-paper);
          border: 1px solid var(--ob-rule);
          border-radius: 18px;
          box-shadow: 0 12px 40px #00000020;
        }
        .ob-reader-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: -8px -8px 4px 0;
        }
        .ob-reader-panel-head strong {
          font-size: 17px;
          font-weight: 600;
        }
        .ob-reader-panel-head button {
          font-size: 26px;
        }
        .ob-reader-note,
        .ob-reader-time {
          color: var(--ob-muted);
          font-size: 12px;
        }
        .ob-reader-note {
          margin: 0 0 16px;
        }
        .ob-reader-panel label {
          display: block;
          margin-top: 14px;
        }
        .ob-reader-panel select {
          display: block;
          width: 100%;
          min-height: 44px;
          margin-top: 6px;
          padding: 8px 10px;
          border: 1px solid var(--ob-rule);
          border-radius: 8px;
          color: var(--ob-ink);
          background: var(--ob-paper);
          font: inherit;
        }
        .ob-reader-playback {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin: 20px 0 12px;
        }
        .ob-reader-playback .ob-reader-play {
          flex: 1;
          background: var(--ob-inset);
          border: 1px solid var(--ob-rule);
        }
        .ob-reader input[type='range'] {
          width: 100%;
          height: 24px;
          accent-color: var(--ob-link);
        }
        .ob-reader-time {
          display: flex;
          justify-content: space-between;
        }
        .ob-reader-error {
          margin-top: 12px;
          color: var(--ob-link);
        }
        @media (max-width: 1023px) {
          .ob-reader {
            right: 50%;
            bottom: max(12px, env(safe-area-inset-bottom));
            transform: translateX(50%);
          }
          .ob-reader-bar {
            flex-direction: row;
          }
          .ob-reader-panel {
            right: 50%;
            transform: translateX(50%);
            bottom: 66px;
            width: min(340px, calc(100vw - 28px));
            max-height: calc(100dvh - 110px);
          }
          #theme-my-theme.ob-dao-reading #wrapper {
            padding-bottom: 100px;
          }
        }

        .ob-reader-panel .ob-reader-follow {
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          margin-top: 0;
        }
        .ob-reader-follow input {
          width: 18px;
          height: 18px;
          accent-color: var(--ob-link);
        }
        .ob-reader-panel .ob-reader-speed-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ob-reader-voice-advice {
          margin: 8px 0 0;
        }
        #theme-my-theme.ob-dao-reading [data-ob-speaking='true'] {
          background: var(--ob-inset);
          border-radius: 4px;
        }
      `}</style>
    </aside>
  )
}
