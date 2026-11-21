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
const firstText =
  '第一段，当前文章的原文。' + '让每个完整论点都能自然连贯地被听见。'.repeat(8)
const secondText =
  '第二段，继续按原文朗读。' +
  '句子之间保持自然节奏，不必反复等待连接。'.repeat(8)
const thirdText =
  '最后一段。' + '读完这一段后可以停止，也可以回到文章开头。'.repeat(8)
const view = (props = {}, locked = false) =>
  render(
    <div id='theme-my-theme' className='ob-dao-reading'>
      <div className='ob-article-body'>
        {!locked && (
          <div id='notion-article'>
            <p className='notion-text'>{firstText}</p>
            <p className='notion-text'>{secondText}</p>
            <p className='notion-text'>{thirdText}</p>
          </div>
        )}
      </div>
      <DaoReaderTools articleId='article' {...props} />
    </div>
  )
beforeEach(() => {
  jest.clearAllMocks()
  localStorage.clear()
  global.fetch = jest
    .fn()
    .mockResolvedValue({
      ok: true,
      headers: { get: () => 'audio/mpeg' },
      blob: async () => new Blob(['live audio'], { type: 'audio/mpeg' })
    })
  URL.createObjectURL = jest
    .fn()
    .mockImplementation(
      () => 'blob:passage-' + URL.createObjectURL.mock.calls.length
    )
  URL.revokeObjectURL = jest.fn()
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
  ).toHaveLength(10)
  expect(
    screen
      .getByLabelText('朗读音色')
      .querySelectorAll('optgroup')[0]
      .querySelectorAll('option')
  ).toHaveLength(5)
  expect(
    screen
      .getByLabelText('朗读音色')
      .querySelectorAll('optgroup')[1]
      .querySelectorAll('option')
  ).toHaveLength(5)
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: '播放', exact: true }))
  )
  const first = new URL(audio.src)
  expect(first.pathname).toBe('/api/dao-speech')
  expect(first.searchParams.get('text')).toBe(firstText)
  expect(first.searchParams.get('voice')).toBe('xiaoxiao')
  expect(screen.getByRole('button', { name: '暂停' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: '暂停' }))
  const pausedSrc = audio.getAttribute('src')
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: '播放', exact: true }))
  )
  expect(audio.getAttribute('src')).toBe(pausedSrc)
  await act(async () => fireEvent.ended(audio))
  expect(audio.src).toMatch(/^blob:/)
  expect(
    new URL(fetch.mock.calls[0][0], 'https://ourbeings.com').searchParams.get(
      'text'
    )
  ).toBe(secondText)
  await act(async () =>
    fireEvent.change(screen.getByLabelText('朗读音色'), {
      target: { value: 'yunxi' }
    })
  )
  expect(new URL(audio.src).searchParams.get('voice')).toBe('yunxi')
  expect(localStorage.getItem('ob-reading-voice')).toBe('yunxi')
  fireEvent.change(screen.getByLabelText('播放速度'), {
    target: { value: '0.5' }
  })
  expect(audio.playbackRate).toBe(0.5)
  fireEvent.change(screen.getByLabelText('播放速度'), {
    target: { value: '3.5' }
  })
  expect(audio.playbackRate).toBe(3.5)
  expect(localStorage.getItem('ob-reading-rate')).toBe('3.5')
  fireEvent.click(screen.getByRole('button', { name: '停止' }))
  expect(audio.getAttribute('src')).toBeNull()
  expect(URL.revokeObjectURL).toHaveBeenCalled()
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
  root.innerHTML =
    '<p class="notion-text">短段一。</p><p class="notion-text">短段二。</p>'
  const combined = collectDaoSpeech(root)
  expect(combined).toHaveLength(1)
  expect(combined[0].text).toContain('短段一。\n\n短段二。')
})

test('falls back to temporary in-memory audio when a browser rejects the live HTTP stream', async () => {
  HTMLMediaElement.prototype.play.mockRejectedValueOnce(
    Object.assign(new Error('stream'), { name: 'NotSupportedError' })
  )
  const { container } = view()
  fireEvent.click(screen.getByRole('button', { name: '文章朗读' }))
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: '播放', exact: true }))
  )
  const audio = container.querySelector('audio')
  expect(audio.src).toMatch(/^blob:/)
  expect(screen.getByRole('button', { name: '暂停' })).toBeTruthy()
  const active = audio.src
  fireEvent.click(screen.getByRole('button', { name: '停止' }))
  expect(URL.revokeObjectURL).toHaveBeenCalledWith(active)
})
