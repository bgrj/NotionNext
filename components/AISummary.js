import styles from './AISummary.module.css'
import { useGlobal } from '@/lib/global'

const AISummary = ({ aiSummary, provider }) => {
  const { locale, lang } = useGlobal()
  if (typeof aiSummary !== 'string' || !aiSummary.trim()) return null
  const isChinese = !lang || lang.startsWith('zh')
  return (
    <details className={styles.container} data-ai-summary open>
      <summary className={styles.header}>
        <span className={styles.title}>
          {locale?.AI_SUMMARY?.NAME || 'AI 智能摘要'}
        </span>
        {provider && <span className={styles.provider}>{provider}</span>}
        <svg
          className={styles.chevron}
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          aria-hidden='true'
        >
          <path d='m6 9 6 6 6-6' />
        </svg>
      </summary>
      <div className={styles.content}>
        <p className={styles.text}>{aiSummary}</p>
        <p className={styles.note}>
          {isChinese
            ? 'AI 根据正文节选生成，仅作导读，请以原文为准。'
            : 'AI-generated from article excerpts. Please refer to the original text.'}
        </p>
      </div>
    </details>
  )
}

export default AISummary
