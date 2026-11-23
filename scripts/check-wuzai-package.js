const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { createRequire } = require('node:module')
const assert = require('node:assert/strict')
const os = require('node:os')
const { spawnSync } = require('node:child_process')
const root = path.resolve(__dirname, '../apps/wuzai')
const project = JSON.parse(
  fs.readFileSync(path.join(root, 'project.config.json'), 'utf8')
)
const native = path.join(root, project.miniprogramRoot)
const app = JSON.parse(fs.readFileSync(path.join(native, 'app.json'), 'utf8'))
let files = 0
function check(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name)
    if (item.name === 'node_modules') continue
    if (item.isDirectory()) check(file)
    else {
      files += 1
      const source = fs.readFileSync(file, 'utf8')
      if (file.endsWith('.json')) JSON.parse(source)
      if (file.endsWith('.js')) new vm.Script(source, { filename: file })
      if (
        file.includes(`${path.sep}miniprogram${path.sep}`) &&
        file.endsWith('.js')
      ) {
        assert(
          !/from ['"]react|require\(['"]react|document\.|window\.|process\.env/.test(
            source
          ),
          `Non-native dependency: ${file}`
        )
      }
    }
  }
}
check(native)
check(path.join(root, project.cloudfunctionRoot, 'wuzaiApi'))
for (const page of app.pages) {
  const base = path.join(native, page)
  for (const ext of ['js', 'json', 'wxml', 'wxss'])
    assert(fs.existsSync(`${base}.${ext}`), `Missing ${page}.${ext}`)
  let config
  vm.runInNewContext(
    fs.readFileSync(`${base}.js`, 'utf8'),
    {
      Page: value => {
        config = value
      },
      require: createRequire(`${base}.js`)
    },
    { filename: `${base}.js` }
  )
  const wxml = fs.readFileSync(`${base}.wxml`, 'utf8')
  for (const binding of wxml.matchAll(/\{\{[\s\S]*?\}\}/g))
    assert(
      !/&amp;\s*&amp;/.test(binding[0]),
      `Invalid WXML expression in ${page}: use && directly, not HTML entities`
    )
  for (const match of wxml.matchAll(
    /(?:bind|catch)(?:tap|input|change|submit|confirm)=["']([A-Za-z][\w]*)["']/g
  ))
    assert.equal(
      typeof config[match[1]],
      'function',
      `Unbound handler ${page}: ${match[1]}`
    )
}
for (const tab of app.tabBar.list)
  assert(app.pages.includes(tab.pagePath), `Unknown tab page: ${tab.pagePath}`)
assert(
  fs.existsSync(path.join(root, project.cloudfunctionRoot, 'wuzaiApi/index.js'))
)
assert(
  !app.requiredPrivateInfos,
  'Activity pages should not require precise location or phone APIs'
)
console.log(
  `Native package validated: ${app.pages.length} pages, ${files} source/config files; JSON, JS, page routes and WXML handlers checked.`
)

const compilerOption = process.argv.indexOf('--compiler-dir')
if (compilerOption !== -1) {
  const compilerDirectory = process.argv[compilerOption + 1]
  assert(compilerDirectory, '--compiler-dir requires the wcc-exec directory')
  const outputDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'wuzai-compile-')
  )
  try {
    for (const [name, args, output] of [
      ['wcc', app.pages.map(page => `${page}.wxml`), 'wxml.js'],
      [
        'wcsc',
        ['-lc', 'app.wxss', ...app.pages.map(page => `${page}.wxss`)],
        'wxss.js'
      ]
    ]) {
      const executable = path.join(
        compilerDirectory,
        name + (process.platform === 'win32' ? '.exe' : '')
      )
      const result = spawnSync(
        executable,
        ['-o', path.join(outputDirectory, output), ...args],
        {
          cwd: native,
          encoding: 'utf8',
          timeout: 30000,
          windowsHide: true
        }
      )
      assert.equal(
        result.status,
        0,
        `${name} failed: ${result.error?.message || result.stderr || result.stdout}`
      )
      console.log(
        `${name}: official compiler passed for all ${app.pages.length} pages`
      )
    }
  } finally {
    for (const output of ['wxml.js', 'wxss.js']) {
      const file = path.join(outputDirectory, output)
      if (fs.existsSync(file)) fs.unlinkSync(file)
    }
    fs.rmdirSync(outputDirectory)
  }
}
