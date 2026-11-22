# Restore automatic article summaries

The Our beings theme now displays a collapsible DeepSeek summary above the article body. The existing configured Worker is used during server-side article generation; no client request carries its credential.

## Configuration

- Vercel project `ourbeing`, Production: `AI_SUMMARY_KEY` is a Secret containing the original Worker's authentication token, not the provider API key.
- Notion configuration center: `AI_SUMMARY_API`, `AI_SUMMARY_WORD_LIMIT` and `AI_SUMMARY_CACHE_TIME` remain enabled. Existing values are retained: 1,000 input characters and 1,800 seconds of summary cache.
- The old Notion credential row is disabled and cleared. Its remark no longer contains a provider credential. Cached public props are also stripped of `AI_SUMMARY_KEY` on every read.

Publishing or editing a public article automatically generates a summary when Next.js builds or revalidates its article page. This follows the site's existing ISR refresh cycle; changes are not instantaneous. Long articles are sampled at five positions, with title and headings included within the existing input budget. The card explicitly identifies the summary as an excerpt-based AI reading guide.

Successful summaries are cached by article ID and a hash of the full source, endpoint and input limit. Concurrent requests within a process share one request. Failed/invalid responses are not cached; a 20-second request timeout keeps the original article available. Password-protected posts and the existing 我的存在 exclusion are preserved.

## Validation

- Existing Worker authenticated probe: returned a nonempty summary.
- Regression tests cover request contract, server credential isolation, input budget and coverage, content invalidation, caching/concurrency, excluded posts, timeout and provider/cache failure handling.
- UI checks cover initial HTML, article changes and empty summaries; release verification checks desktop/mobile, dark mode and credential absence from public props.

Do not put credentials in Notion configuration values, remarks, Git, public environment variables or browser requests. Preview environments need their own authorized server credential before generating summaries; only Production was configured for this restoration.
