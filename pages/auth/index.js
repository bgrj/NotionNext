import { completeNotionOAuth } from '@/lib/security/notionOAuth'

// Support the legacy callback without putting credentials in page props.
export async function getServerSideProps(ctx) {
  const result = await completeNotionOAuth(
    {
      method: ctx.req.method,
      headers: ctx.req.headers,
      cookies: ctx.req.cookies,
      query: ctx.query
    },
    ctx.res
  )
  return {
    redirect: {
      destination: `/auth/result?${new URLSearchParams({ msg: result.message }).toString()}`,
      permanent: false
    }
  }
}

export default function AuthCallback() {
  return null
}
