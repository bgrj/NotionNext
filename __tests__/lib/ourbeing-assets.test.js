/** @jest-environment node */
import {
  localizeOurbeingAssetUrl,
  localizeOurbeingAssetReferences,
  localizeOurbeingConfig
} from '@/lib/utils/ourbeingAssets'
import assets from '@/lib/ourbeing-assets.json'
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { materializeSiteAssets } = require('@/scripts/materialize-site-assets')
const originalFlag = process.env.NEXT_PUBLIC_LOCAL_SITE_ASSETS

afterEach(() => {
  if (originalFlag === undefined)
    delete process.env.NEXT_PUBLIC_LOCAL_SITE_ASSETS
  else process.env.NEXT_PUBLIC_LOCAL_SITE_ASSETS = originalFlag
})
test.each(assets)(
  'localizes known artwork $source, including cache-busting queries',
  asset => {
    expect(localizeOurbeingAssetUrl(asset.source + '?t=old')).toBe(asset.path)
    expect(
      localizeOurbeingAssetUrl(asset.source.replace('https://', 'http://'))
    ).toBe(asset.path)
    expect(
      localizeOurbeingAssetUrl(
        'https://raw.githubusercontent.com/bgrj/bgrj-images/refs/heads/main/' +
          asset.source.split('/').pop()
      )
    ).toBe(asset.path)
  }
)
test.each([
  'https://cdn.jsdelivr.net/gh/other/bgrj-images@main/web-mainpage-uphand.png',
  'https://cdn.jsdelivr.net/gh/bgrj/bgrj-images@pinned/web-mainpage-uphand.png',
  'https://evil.example/web-mainpage-uphand.png',
  '/local/image.png',
  null
])('does not rewrite unrelated source %s', value => {
  expect(localizeOurbeingAssetUrl(value)).toBe(value)
})
test('localizes known assets inside the config sent to the browser', () => {
  const config = localizeOurbeingConfig({
    GLOBAL_CSS: `#wrapper { background-image: url('${assets[0].source}'); }`,
    BLOG_FAVICON: assets[2].source,
    nested: { keep: 'https://cdn.jsdelivr.net/npm/left-pad' }
  })
  expect(config.GLOBAL_CSS).toContain(assets[0].path)
  expect(config.GLOBAL_CSS).not.toContain('jsdelivr')
  expect(config.BLOG_FAVICON).toBe(assets[2].path)
  expect(config.nested.keep).toContain('left-pad')
})
test('rewrites only URLs in CSS without changing layout declarations', () => {
  const css = `#wrapper { background:url('${assets[0].source}'); color:red; }`
  expect(localizeOurbeingAssetReferences(css)).toBe(
    `#wrapper { background:url('${assets[0].path}'); color:red; }`
  )
})
test('local asset optimization has an explicit rollback switch', () => {
  process.env.NEXT_PUBLIC_LOCAL_SITE_ASSETS = 'false'
  expect(localizeOurbeingAssetUrl(assets[0].source)).toBe(assets[0].source)
})
test('materializes valid content-addressed assets and rejects tampering/traversal', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ourbeing-assets-'))
  const fixture = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), 'assets/ourbeing/manifest.json'),
      'utf8'
    )
  )
  const manifestFile = path.join(root, 'assets/ourbeing/manifest.json')
  fs.mkdirSync(path.dirname(manifestFile), { recursive: true })
  try {
    fs.writeFileSync(manifestFile, JSON.stringify(fixture))
    materializeSiteAssets(root)
    for (const asset of fixture.assets)
      expect(
        fs.statSync(path.join(root, 'public/assets/ourbeing', asset.file)).size
      ).toBe(asset.bytes)
    fixture.assets[0].sha256 = '0'.repeat(64)
    fs.writeFileSync(manifestFile, JSON.stringify(fixture))
    expect(() => materializeSiteAssets(root)).toThrow('integrity')
    fixture.assets[0].file = '../escape.png'
    fs.writeFileSync(manifestFile, JSON.stringify(fixture))
    expect(() => materializeSiteAssets(root)).toThrow('filename')
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
