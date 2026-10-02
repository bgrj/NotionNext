import type { NextApiRequest, NextApiResponse } from 'next'
import { completeNotionOAuth } from '@/lib/security/notionOAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await completeNotionOAuth(req, res)
  if (!result.ok)
    return res.status(result.status).json({ error: result.message })
  return res.redirect(
    303,
    `/auth/result?${new URLSearchParams({ msg: result.message }).toString()}`
  )
}
