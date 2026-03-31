import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { siteConfig } from '@/lib/config'

/**
 * get Ai summary
 * @returns {Promise<string>}
 * @param aiSummaryAPI
 * @param aiSummaryKey
 * @param truncatedText
 */
export async function getAiSummary(aiSummaryAPI, aiSummaryKey, truncatedText) {
  if (!aiSummaryAPI) {
    console.warn('[AI_SUMMARY] 跳过摘要：缺少 AI_SUMMARY_API 配置')
    return null
  }
  if (!aiSummaryKey) {
    console.warn('[AI_SUMMARY] 跳过摘要：缺少 AI_SUMMARY_KEY 配置')
    return null
  }

  try {
    console.log('请求文章摘要', truncatedText.slice(0, 100))
    const response = await fetch(aiSummaryAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: aiSummaryKey,
        content: truncatedText
      })
    })

    if (response.ok) {
      const data = await response.json()
      if (!data?.summary) {
        console.warn('[AI_SUMMARY] 接口返回成功但缺少 summary 字段')
        return null
      }
      return data.summary
    } else {
      throw new Error(`Response not ok: ${response.status}`)
    }
  } catch (error) {
    console.error('ChucklePostAI：请求失败', error)
    return null
  }
}


/**
 * 获取文章摘要
 * @param props
 * @param pageContentText
 * @returns {Promise<void>}
 */
export async function getPageAISummary(post, pageContentText, notionConfig = {}) {
  const aiSummaryAPI = siteConfig('AI_SUMMARY_API', '', notionConfig)
  const aiSummaryKey = siteConfig('AI_SUMMARY_KEY', '', notionConfig)
  if (!aiSummaryAPI || !aiSummaryKey) {
    console.warn(
      `[AI_SUMMARY] 跳过文章摘要：${post?.slug || post?.id || 'unknown-post'}，缺少${!aiSummaryAPI ? ' AI_SUMMARY_API' : ''}${!aiSummaryAPI && !aiSummaryKey ? ' 和' : ''}${!aiSummaryKey ? ' AI_SUMMARY_KEY' : ''}`
    )
    return
  }

  if (aiSummaryAPI) {
    const cacheKey = `ai_summary_${post.id}`
    let aiSummary = await getDataFromCache(cacheKey)
    if (aiSummary) {
      post.aiSummary = aiSummary
    } else {
      const aiSummaryCacheTime = siteConfig(
        'AI_SUMMARY_CACHE_TIME',
        1800,
        notionConfig
      )
      const wordLimit = siteConfig('AI_SUMMARY_WORD_LIMIT', 1000, notionConfig)
      let content = ''
      for (let heading of post.toc) {
        content += heading.text + ' '
      }
      content += pageContentText
      const combinedText = post.title + ' ' + content
      const truncatedText = combinedText.slice(0, wordLimit)
      aiSummary = await getAiSummary(aiSummaryAPI, aiSummaryKey, truncatedText)
      await setDataToCache(cacheKey, aiSummary, aiSummaryCacheTime)
      post.aiSummary = aiSummary
    }
  }
}
