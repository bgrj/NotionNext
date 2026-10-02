const fs = require('node:fs')
const path = require('node:path')
const { createHash } = require('node:crypto')

// Keep the source assets text-safe for repository tooling. The production
// files are deterministic, content-addressed binaries, never client JS data.
function materializeSiteAssets(root = path.resolve(__dirname, '..')) {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, 'assets/ourbeing/manifest.json'), 'utf8')
  )
  const output = path.join(root, 'public/assets/ourbeing')
  if (manifest.version !== 1 || !Array.isArray(manifest.assets)) {
    throw new Error('Invalid site asset manifest')
  }
  fs.mkdirSync(output, { recursive: true })
  for (const asset of manifest.assets) {
    if (!/^[a-z0-9-]+\.[a-f0-9]{12}\.(webp|png)$/.test(asset.file)) {
      throw new Error('Invalid site asset filename')
    }
    const buffer = Buffer.from(asset.base64, 'base64')
    const digest = createHash('sha256').update(buffer).digest('hex')
    if (
      digest !== asset.sha256 ||
      buffer.length !== asset.bytes ||
      !asset.file.includes(`.${digest.slice(0, 12)}.`)
    ) {
      throw new Error(`Site asset integrity check failed: ${asset.file}`)
    }
    const destination = path.join(output, asset.file)
    if (
      !fs.existsSync(destination) ||
      !fs.readFileSync(destination).equals(buffer)
    ) {
      fs.writeFileSync(destination, buffer)
    }
  }
}

if (require.main === module) materializeSiteAssets()
module.exports = { materializeSiteAssets }
