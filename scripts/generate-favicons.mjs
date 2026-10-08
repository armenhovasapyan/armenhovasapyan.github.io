#!/usr/bin/env node
/**
 * Generates the favicon set from `public/favicon.svg` (the single source).
 *
 * Steps:
 *   1. Rasterise the SVG at 512x512 with headless Chrome (transparent corners).
 *   2. Downscale with macOS `sips` to the sizes browsers/bookmarks ask for.
 *   3. Pack the PNGs into a multi-resolution `favicon.ico`.
 *
 * Usage: node scripts/generate-favicons.mjs
 *
 * The dev server must be running (`npm run dev`, http://localhost:3000) so the
 * SVG can be loaded by headless Chrome. Requires Chrome in /Applications.
 */
import { spawn, execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 3000
const TMP = path.join(tmpdir(), 'ah-favicon-512.png')
const PROFILE = path.join(tmpdir(), 'ah-favicon-chrome-profile')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'ignore' })

// 1. Rasterise the source SVG at 512x512 with a transparent background.
//    Headless Chrome can linger after writing the screenshot, so run it in its
//    own process group and kill it as soon as the file lands.
rmSync(TMP, { force: true })
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--user-data-dir=${PROFILE}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--virtual-time-budget=3000',
    '--default-background-color=00000000',
    '--window-size=512,512',
    `--screenshot=${TMP}`,
    `http://localhost:${PORT}/favicon.svg`,
  ],
  { stdio: 'ignore', detached: true },
)
try {
  const deadline = Date.now() + 20_000
  while (!existsSync(TMP) && Date.now() < deadline) await sleep(250)
  await sleep(500)
} finally {
  try {
    process.kill(-chrome.pid, 'SIGKILL')
  } catch {}
  rmSync(PROFILE, { recursive: true, force: true })
}
if (!existsSync(TMP)) {
  console.error(
    '✖ favicon render failed — is Chrome installed and the dev server running on :' + PORT + '?',
  )
  process.exit(1)
}

// 2. Downscale to the sizes used by browsers, bookmarks, and home screens.
for (const s of [16, 32, 48, 180, 192]) {
  const out = `public/favicon-${s}.png`
  run('sips', ['-z', String(s), String(s), TMP, '--out', out])
  console.log(`✔ ${out}`)
}

// Apple touch icon (iOS home-screen shortcut).
run('cp', ['public/favicon-180.png', 'public/apple-touch-icon.png'])

// 3. Pack the small PNGs into a multi-resolution .ico (ICO containers may embed
//    PNG bytes directly, which every modern browser accepts).
const images = [16, 32, 48].map((size) => ({
  size,
  data: readFileSync(`public/favicon-${size}.png`),
}))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(images.length, 4)
let offset = 6 + images.length * 16
const entries = images.map(({ size, data }) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(size >= 256 ? 0 : size, 0) // width  (0 = 256)
  e.writeUInt8(size >= 256 ? 0 : size, 1) // height (0 = 256)
  e.writeUInt8(0, 2) // palette
  e.writeUInt8(0, 3) // reserved
  e.writeUInt16LE(1, 4) // colour planes
  e.writeUInt16LE(32, 6) // bits per pixel
  e.writeUInt32LE(data.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += data.length
  return e
})
writeFileSync(
  'public/favicon.ico',
  Buffer.concat([header, ...entries, ...images.map((i) => i.data)]),
)
console.log('✔ public/favicon.ico (16/32/48)')
rmSync(TMP, { force: true })
console.log('✔ favicon set regenerated from public/favicon.svg')