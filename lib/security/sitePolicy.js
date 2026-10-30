const DEFAULT_IMAGE_HOSTS = [
  'www.notion.so',
  'notion.so',
  'app.notion.com',
  'images.unsplash.com',
  'plus.unsplash.com',
  'source.unsplash.com',
  's3.us-west-2.amazonaws.com',
  'prod-files-secure.s3.us-west-2.amazonaws.com',
  'public.notion-static.com',
  'secure.notion-static.com',
  'raw.githubusercontent.com',
  'avatars.githubusercontent.com',
  'cdn.jsdelivr.net',
  'bgrj.github.io'
]

function getImageRemotePatterns(
  extraHosts = process.env.NEXT_IMAGE_ALLOWED_HOSTS || ''
) {
  const additions = String(extraHosts)
    .split(',')
    .map(host => host.trim().toLowerCase())
    .filter(Boolean)
  for (const host of additions) {
    if (
      !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(host) ||
      host.endsWith('.local') ||
      host.endsWith('.localhost') ||
      host.endsWith('.internal')
    ) {
      throw new Error(
        'NEXT_IMAGE_ALLOWED_HOSTS must contain exact public DNS hostnames'
      )
    }
  }
  return [...new Set([...DEFAULT_IMAGE_HOSTS, ...additions])].map(hostname => ({
    protocol: 'https',
    hostname
  }))
}

function getSecurityHeaders() {
  return [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()'
    },
    // Do not block the owner's custom scripts, styles or article embeds.
    // This baseline is not a complete script-source/XSS policy.
    {
      key: 'Content-Security-Policy',
      value: "object-src 'none'; base-uri 'self'; frame-ancestors 'self'"
    }
  ]
}

module.exports = { getImageRemotePatterns, getSecurityHeaders }
