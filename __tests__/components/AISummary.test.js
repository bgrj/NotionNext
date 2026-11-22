import { render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server.node'
import AISummary from '@/components/AISummary'

jest.mock('@/lib/global', () => ({
  useGlobal: () => ({
    lang: 'zh-CN',
    locale: { AI_SUMMARY: { NAME: 'AI 智能摘要' } }
  })
}))

test('summary is immediately available in HTML and can be collapsed without animation', () => {
  const html = renderToStaticMarkup(
    <AISummary aiSummary='这是文章导读。' provider='DeepSeek' />
  )
  expect(html).toContain('这是文章导读。')
  expect(html).toContain('<details')
  expect(html).toContain('<summary')
  expect(html).toContain('DeepSeek')
  expect(html).not.toContain('GPT')
  render(<AISummary aiSummary='这是文章导读。' provider='DeepSeek' />)
  expect(screen.getByText('这是文章导读。')).toBeVisible()
  expect(screen.getByText(/仅作导读/)).toBeVisible()
})

test('changing articles displays the new summary immediately', () => {
  const { rerender } = render(<AISummary aiSummary='第一篇摘要' />)
  rerender(<AISummary aiSummary='第二篇摘要' />)
  expect(screen.getByText('第二篇摘要')).toBeVisible()
  expect(screen.queryByText('第一篇摘要')).toBeNull()
})

test.each([null, undefined, '', '   '])(
  'does not render an empty card (%j)',
  aiSummary => {
    const { container } = render(<AISummary aiSummary={aiSummary} />)
    expect(container).toBeEmptyDOMElement()
  }
)
