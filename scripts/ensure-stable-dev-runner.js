const userAgent = process.env.npm_config_user_agent || ''

if (/^yarn\/1\./.test(userAgent)) {
  console.error('\n[dev] yarn 1 is disabled for local development in this repository.')
  console.error('[dev] It can cause next dev to exit after startup in this environment.')
  console.error('[dev] Use one of these instead:')
  console.error('[dev]   npm run dev')
  console.error('[dev]   ./node_modules/.bin/next dev')
  console.error('[dev] If you must use Yarn Classic, switch to Node 20 first.\n')
  process.exit(1)
}