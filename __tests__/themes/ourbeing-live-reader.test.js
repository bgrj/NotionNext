import React from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import DaoReaderTools from '@/themes/my-theme/components/DaoReaderTools'
import { collectDaoSpeech, splitSpeechText } from '@/lib/reading/daoSpeech'

jest.mock('styled-jsx/style', () => () => null)
const mockGlobal = {
  lang: 'zh-CN',
  isDarkMode: false,
  changeLang: jest.fn(),
  setDarkMode: jest.fn()
}
jest.mock('@/lib/global', () => ({ useGlobal: () => mockGlobal }))
jest.mock('@/lib/config', () => ({ siteConfig: (key, fallback) => fallback }))
const view = (props = {}, locked = false) =>
  render(
    <div id='theme-my-theme' className='ob-dao-reading'>
      <div className='ob-article-body'>
        {!locked && (
          <div id='notion-article'>
            <p className='notion-text'>第一段，当前文章的原文。</p>
            <p className='notion-text'>第二段，继续按原文朗读。</p>
            <p className='notion-text'>最后一段。</p>
          </div>
        )}
      </div>
      <DaoReaderTools articleId='article' {...props} />
    </div>
  )
beforeEach(() => {
  jest.clearAllMocks()
  localStorage.clear()
  global.fetch = jest.fn()
  jest
    .spyOn(HTMLMediaElement.prototype, 'play')
    .mockImplementation(function () {
      this.dispatchEvent(new Event('playing'))
      return Promise.resolve()
    })
  jest
    .spyOn(HTMLMediaElement.prototype, 'pause')
    .mockImplementation(function () {
      this.dispatchEvent(new Event('pause'))
    })
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {})
})
afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

test('starts live speech on click, pauses/resumes the same stream, advances and switches natural voice', async () => {
  const { container, unmount } = view()
  const audio = container.querySelector('audio')
  expect(audio.getAttribute('src')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: '文章朗读' }))
  expect(audio.getAttribute('src')).toBeNull()
  expect(
    screen.getByLabelText('朗读音色').querySelectorAll('option')
  ).toHaveLength(3)
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: '播放', exact: true }))
  )
  const first = new URL(audio.src)
  expect(first.pathname).toBe('/api/dao-speech')
  expect(first.searchParams.get('text')).toBe('第一段，当前文章的原文。')
  expect(first.searchParams.get('voice')).toBe('xiaoxiao')
  expect(screen.getByRole('button', { name: '暂停' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: '暂停' }))
  const pausedSrc = audio.getAttribute('src')
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: '播放', exact: true }))
  )
  expect(audio.getAttribute('src')).toBe(pausedSrc)
  await act(async () => fireEvent.ended(audio))
  expect(new URL(audio.src).searchParams.get('text')).toBe(
    '第二段，继续按原文朗读。'
  )
  await act(async () =>
    fireEvent.change(screen.getByLabelText('朗读音色'), {
      target: { value: 'yunxi' }
    })
  )
  expect(new URL(audio.src).searchParams.get('voice')).toBe('yunxi')
  expect(localStorage.getItem('ob-reading-voice')).toBe('yunxi')
  fireEvent.change(screen.getByLabelText('播放速度'), {
    target: { value: '1.15' }
  })
  expect(audio.playbackRate).toBe(1.15)
  fireEvent.click(screen.getByRole('button', { name: '停止' }))
  expect(audio.getAttribute('src')).toBeNull()
  expect(fetch).not.toHaveBeenCalled()
  unmount()
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled()
})

test('handles browser gesture restrictions with a manual retry instead of silent failure', async () => {
  HTMLMediaElement.prototype.play.mockRejectedValueOnce(
    Object.assign(new Error('gesture'), { name: 'NotAllowedError' })
  )
  view()
  fireEvent.click(screen.getByRole('button', { name: '文章朗读' }))
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: '播放', exact: true }))
  )
  expect(screen.getByRole('alert')).toHaveTextContent('手动点击播放')
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: '播放', exact: true }))
  )
  expect(screen.queryByRole('alert')).toBeNull()
  expect(screen.getByRole('button', { name: '暂停' })).toBeTruthy()
})

test('never reads locked content and exposes working language, appearance and TOC controls', async () => {
  const contents = jest.fn()
  view({ onOpenContents: contents }, true)
  fireEvent.click(screen.getByRole('button', { name: '文章朗读' }))
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: '播放', exact: true }))
  )
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
  expect(screen.getByRole('alert')).toHaveTextContent('正文尚在载入')
  fireEvent.click(screen.getByRole('button', { name: '界面语言' }))
  fireEvent.change(screen.getByLabelText('选择语言'), {
    target: { value: 'en-US' }
  })
  expect(mockGlobal.changeLang).toHaveBeenCalledWith('en-US')
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(screen.queryByRole('dialog')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: '切换深色模式' }))
  expect(mockGlobal.setDarkMode).toHaveBeenCalledWith(true)
  fireEvent.click(screen.getByRole('button', { name: '打开文章目录' }))
  expect(contents).toHaveBeenCalledTimes(1)
})

test('splits long Chinese and English text without losing characters or duplicating nested callouts', () => {
  const original =
    ('这是一个完整的句子。' + 'English words belong together. ').repeat(70) +
    '😀结尾。'
  const pieces = splitSpeechText(original)
  expect(pieces.every(piece => piece.length <= 280)).toBe(true)
  expect(pieces.join('').replace(/\s/g, '')).toBe(original.replace(/\s/g, ''))
  const root = document.createElement('div')
  root.innerHTML =
    '<div class="notion-callout"><p class="notion-text">只读一次。</p></div><pre><span class="notion-text">不读代码</span></pre>'
  expect(collectDaoSpeech(root).map(x => x.text)).toEqual(['只读一次。'])
})
