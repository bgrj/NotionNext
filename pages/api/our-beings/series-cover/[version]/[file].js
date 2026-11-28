const PINNED_VERSION = 'curated-20261128-v2'
const PINNED_COMMIT = '39b0811837faa183e2a732fcbf04e6dfa8784d87'
const FILE = /^(capital|hanshu|lunyu|xianwen|biography|human-thought|chinese-thought|arendt|wittgenstein|luxun|seven-up|friends)-[123]\.jpg$/

// Read the immutable backup on the mini program's existing request-legal host.
// Neither a caller-provided URL nor an arbitrary repository path is accepted.
export default async function seriesCover(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  const { version, file } = req.query
  if (version !== PINNED_VERSION || typeof file !== 'string' || !FILE.test(file)) return res.status(404).json({ error: 'not_found' })
  try {
    const url = `https://raw.githubusercontent.com/bgrj/bgrj-images/${PINNED_COMMIT}/ourbeing/series/${PINNED_VERSION}/${file}`
    const response = await fetch(url, { signal: AbortSignal.timeout(10000), redirect: 'error' })
    if (!response.ok || !/^image\/jpeg(?:;|$)/i.test(response.headers.get('content-type') || '')) throw Error('Invalid upstream image')
    const image = Buffer.from(await response.arrayBuffer())
    if (image.length < 1200 || image.length > 512 * 1024 || image[0] !== 0xff || image[1] !== 0xd8 || image[2] !== 0xff) throw Error('Invalid JPEG')
    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return res.status(200).send(image)
  } catch {
    return res.status(502).json({ error: 'cover_unavailable' })
  }
}
