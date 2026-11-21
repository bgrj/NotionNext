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
  const playPart = async (index, selectedVoice = voiceRef.current) => {
    const parts = prepare(),
      player = audio.current
    if (!player || !parts.length) {
      setError('empty')
      return
    }
    const target = Math.max(0, Math.min(index, parts.length - 1))
    const attempt = ++requestId.current
    wantsPlay.current = true
    loading.current = true
    player.pause()
    player.src = daoSpeechUrl(parts[target].text, selectedVoice)
    player.playbackRate = rateRef.current
    current.current = target
    setPosition(target)
    setError('')
    setState('loading')
    mark(target)
    try {
      await player.play()
      if (requestId.current === attempt) {
        loading.current = false
        setState('playing')
      }
    } catch (reason) {
      if (requestId.current !== attempt) return
      wantsPlay.current = false
      loading.current = false
      setState('paused')
      setError(reason.name === 'NotAllowedError' ? 'gesture' : 'network')
    }
  }
  const stop = () => {
    requestId.current++
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
    if (state === 'paused' && !error && player?.getAttribute('src')) {
      wantsPlay.current = true
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
    } catch (_) {}
    const player = audio.current
    const pendingRequest = requestId
    return () => {
      mounted.current = false
      pendingRequest.current++
      wantsPlay.current = false
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
                  {DAO_VOICES.map(item => (
                    <option key={item.id} value={item.id}>
                      {english ? item.english : item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {english ? 'Speed' : '播放速度'}
                <select
                  value={rate}
                  onChange={event => {
                    const value = Number(event.target.value)
                    setRate(value)
                    rateRef.current = value
                    if (audio.current) audio.current.playbackRate = value
                  }}
                >
                  {[0.8, 1, 1.15, 1.3].map(value => (
                    <option key={value} value={value}>
                      {value}×
                    </option>
                  ))}
                </select>
              </label>
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
        #theme-my-theme.ob-dao-reading [data-ob-speaking='true'] {
          background: var(--ob-inset);
          border-radius: 4px;
        }
      `}</style>
    </aside>
  )
}
