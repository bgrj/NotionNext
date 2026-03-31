/**
 * Cloudflare Worker — AI 文章摘要接口
 *
 * 协议（与 NotionNext 项目完全兼容）：
 *   请求：POST  body: { token: string, content: string }
 *   响应：JSON  { summary: string }
 *
 * 部署步骤：
 *   1. 登录 https://dash.cloudflare.com → Workers & Pages → 新建 Worker
 *   2. 把本文件全部内容粘贴到编辑器，点击 Deploy
 *   3. 在 Worker 的 Settings → Variables 里添加两个环境变量：
 *        ACCESS_TOKEN   你自己设定的密钥（填到 Notion 配置中心的 AI_SUMMARY_KEY）
 *        AI_API_KEY     你的 DeepSeek API Key（从 https://platform.deepseek.com 获取）
 *   4. 把 Worker 的请求 URL（如 https://ai-summary.your-name.workers.dev）
 *      填到 Notion 配置中心的 AI_SUMMARY_API
 *
 * 可选调整：
 *   - 换用其他 OpenAI 兼容接口（如 Qwen）只需改 AI_BASE_URL 和 AI_MODEL
 *   - 修改 SYSTEM_PROMPT 来调整摘要风格
 */

// ── 可配置常量（也可以改成 Worker 环境变量） ──────────────────────────────
const AI_BASE_URL = 'https://api.deepseek.com/v1/chat/completions'
const AI_MODEL = 'deepseek-chat'
const MAX_CONTENT_LENGTH = 3000  // 最多传给 AI 的正文字符数，避免超出 token 限制
const SYSTEM_PROMPT =
  '你是一个专业的文章摘要助手。请用简洁中文对用户提供的文章内容进行总结，字数控制在 80～150 字，突出文章核心观点，不要加任何前缀或说明文字，直接输出摘要内容。'

// ── 主入口 ────────────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    // 跨域预检
    if (request.method === 'OPTIONS') {
      return corsResponse('', 204)
    }

    // 只接受 POST
    if (request.method !== 'POST') {
      return corsResponse(JSON.stringify({ error: 'Method Not Allowed' }), 405)
    }

    // 解析请求体
    let body
    try {
      body = await request.json()
    } catch {
      return corsResponse(JSON.stringify({ error: 'Invalid JSON body' }), 400)
    }

    const { token, content } = body ?? {}

    // 校验 token（与 Notion 配置中心的 AI_SUMMARY_KEY 比对）
    const expectedToken = env.ACCESS_TOKEN
    if (!expectedToken) {
      return corsResponse(
        JSON.stringify({ error: 'Server misconfigured: ACCESS_TOKEN not set' }),
        500
      )
    }
    if (!token || token !== expectedToken) {
      return corsResponse(JSON.stringify({ error: 'Unauthorized' }), 401)
    }

    // 校验正文
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return corsResponse(JSON.stringify({ error: 'content is required' }), 400)
    }

    // 截断正文，防止超 token
    const truncated = content.slice(0, MAX_CONTENT_LENGTH)

    // 调用 DeepSeek（OpenAI 兼容）
    const aiApiKey = env.AI_API_KEY
    if (!aiApiKey) {
      return corsResponse(
        JSON.stringify({ error: 'Server misconfigured: AI_API_KEY not set' }),
        500
      )
    }

    let summary
    try {
      const aiRes = await fetch(AI_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aiApiKey}`
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: truncated }
          ],
          temperature: 0.5,
          max_tokens: 300,
          stream: false
        })
      })

      if (!aiRes.ok) {
        const errText = await aiRes.text()
        console.error('[AI_SUMMARY_WORKER] AI API 错误:', aiRes.status, errText)
        return corsResponse(
          JSON.stringify({ error: `AI API error: ${aiRes.status}` }),
          502
        )
      }

      const aiData = await aiRes.json()
      summary = aiData?.choices?.[0]?.message?.content?.trim()

      if (!summary) {
        console.error('[AI_SUMMARY_WORKER] AI 返回结构异常:', JSON.stringify(aiData))
        return corsResponse(
          JSON.stringify({ error: 'AI returned empty summary' }),
          502
        )
      }
    } catch (err) {
      console.error('[AI_SUMMARY_WORKER] 请求 AI 失败:', err)
      return corsResponse(JSON.stringify({ error: 'Failed to reach AI API' }), 502)
    }

    // 返回摘要（符合 NotionNext 协议）
    return corsResponse(JSON.stringify({ summary }), 200)
  }
}

// ── 工具函数 ──────────────────────────────────────────────────────────────
function corsResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
