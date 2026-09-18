#!/usr/bin/env node
/**
 * Generates a position-specific CV PDF (`.NET` / `PHP` / `Node.js`) from the
 * site's single source of truth (`app/data/site.ts`) using pdf-lib — no
 * browser, no HTML, pure JS.
 *
 * Usage:
 *   node scripts/generate-cv-pdf.mjs                 # default position (.NET)
 *   node scripts/generate-cv-pdf.mjs --position=php  # one variant
 *   npm run generate:pdf                             # via package.json
 *
 * Run in CI on every push (see .github/workflows/deploy.yml) so the
 * downloadable CVs always reflect the latest skills / experience data.
 */
import { writeFile, stat, mkdir } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { PDFDocument, PDFString, StandardFonts, rgb } from 'pdf-lib'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Node >= 22.18 strips TypeScript types natively, so the data module can be
// imported directly. All of its imports are type-only and erased at runtime.
const site = await import(
  pathToFileURL(path.join(ROOT, 'app', 'data', 'site.ts')).href
)
const {
  profile,
  socials,
  skills,
  skillGroupLabels,
  cvExperience,
  summary,
  summaryBody,
  education,
  languages,
  POSITIONS,
  DEFAULT_POSITION,
} = site

/* ------------------------------------------------------------------ */
/* Position selection (.NET / PHP / Node.js variants)                  */
/* ------------------------------------------------------------------ */

const arg = process.argv.find((a) => a.startsWith('--position='))
const requested = arg?.split('=')[1]
const position =
  POSITIONS.find((p) => p.id === requested) ??
  POSITIONS.find((p) => p.id === DEFAULT_POSITION)
if (requested && !POSITIONS.some((p) => p.id === requested)) {
  console.error(
    `Unknown position "${requested}" — known: ${POSITIONS.map((p) => p.id).join(', ')}; using ${position.id}`,
  )
}
const OUTPUT = path.join(ROOT, 'public', position.pdf.replace(/^\//, ''))
const groupOrderIndex = new Map(position.groupOrder.map((g, i) => [g, i]))

/* ------------------------------------------------------------------ */
/* Palette & metrics                                                   */
/* ------------------------------------------------------------------ */

const COLORS = {
  text: rgb(0x18 / 255, 0x23 / 255, 0x1d / 255),
  heading: rgb(0x0e / 255, 0x1a / 255, 0x13 / 255),
  accent: rgb(0x04 / 255, 0x78 / 255, 0x57 / 255), // emerald-700
  accentBright: rgb(0x10 / 255, 0xb9 / 255, 0x81 / 255), // emerald-500
  muted: rgb(0x5c / 255, 0x6b / 255, 0x63 / 255),
}

const A4 = { W: 595.28, H: 841.89 }
const MARGIN = { top: 44, bottom: 52, left: 42, right: 42 }
const CONTENT_W = A4.W - MARGIN.left - MARGIN.right

/* ------------------------------------------------------------------ */
/* Document writer — cursor layout with wrapping and pagination        */
/* ------------------------------------------------------------------ */

const doc = await PDFDocument.create()
const font = await doc.embedFont(StandardFonts.Helvetica)
const bold = await doc.embedFont(StandardFonts.HelveticaBold)
doc.setTitle(`${profile.name} — CV (${position.label})`)
doc.setAuthor(profile.name)
doc.setSubject('Curriculum Vitae')
doc.setKeywords(['CV', 'resume', profile.name, 'Software Engineer'])
doc.setProducer('pdf-lib (generated from site data)')

let page = doc.addPage([A4.W, A4.H])
let y = A4.H - MARGIN.top

const newPage = () => {
  page = doc.addPage([A4.W, A4.H])
  y = A4.H - MARGIN.top
}
const ensure = (h) => {
  if (y - h < MARGIN.bottom) newPage()
}
const width = (str, f = font, size = 9.5) => f.widthOfTextAtSize(str, size)

/**
 * Wrap an array of segments [{ text, bold?, color?, url? }] into the
 * available width, wrapping words and honouring per-segment styling.
 */
const wrapSegments = (segments, size, maxWidth) => {
  const words = []
  for (const seg of segments) {
    for (const w of seg.text.split(/(\s+)/)) {
      if (w.length) words.push({ ...seg, text: w })
    }
  }
  const lines = []
  let line = []
  let lineW = 0
  for (const word of words) {
    const w = width(word.text, word.bold ? bold : font, size)
    if (lineW + w > maxWidth && lineW > 0) {
      lines.push(line)
      line = []
      lineW = 0
    }
    line.push({ ...word, w })
    lineW += w
  }
  if (line.length) lines.push(line)
  return lines.map((wordsOnLine) => ({
    words: wordsOnLine,
    width: wordsOnLine.reduce((s, w) => s + w.w, 0),
  }))
}

/** Flow styled segments at cursor, wrapping; returns height used. */
const flow = (segments, { size = 9.5, x = MARGIN.left, indent = 0, gap = 3, maxWidth = CONTENT_W } = {}) => {
  const lines = wrapSegments(segments, size, maxWidth - indent)
  lines.forEach((line, i) => {
    ensure(size * 1.35 + (i === lines.length - 1 ? gap : 0))
    let cx = x + indent
    for (const word of line.words) {
      const f = word.bold ? bold : font
      const color = word.color ?? COLORS.text
      page.drawText(word.text, { x: cx, y, size, font: f, color })
      if (word.url) {
        const link = doc.context.obj({
          Type: 'Annot',
          Subtype: 'Link',
          Rect: [cx, y - 1.5, cx + word.w, y + size + 1.5],
          Border: [0, 0, 0],
          C: [0.02, 0.47, 0.34],
          // URI must be a PDF string, not a name — context.obj() maps plain
          // JS strings to PDFName, which strict viewers reject as a link target.
          A: { Type: 'Action', S: 'URI', URI: PDFString.of(word.url) },
        })
        page.node.addAnnot(doc.context.register(link))
      }
      cx += word.w
    }
    y -= size * 1.35
  })
  y -= gap
  return (lines.length * size * 1.35 + gap)
}

const paragraph = (text, opts = {}) =>
  flow([{ text }], opts)

const bullet = (text, opts = {}) => {
  const size = opts.size ?? 9.5
  const indent = 12
  page.drawText('•', {
    x: MARGIN.left + 2,
    y,
    size,
    font: font,
    color: COLORS.accentBright,
  })
  flow([{ text }], { size, indent, gap: 2 })
}

const sectionTitle = (title) => {
  ensure(34)
  y -= 4
  page.drawText(title.toUpperCase(), {
    x: MARGIN.left,
    y,
    size: 10.5,
    font: bold,
    color: COLORS.accent,
  })
  y -= 7
  page.drawRectangle({
    x: MARGIN.left,
    y,
    width: CONTENT_W,
    height: 1.3,
    color: COLORS.accentBright,
  })
  y -= 15
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

page.drawText(profile.name, {
  x: MARGIN.left,
  y,
  size: 21,
  font: bold,
  color: COLORS.heading,
})
y -= 24

flow(
  [
    { text: profile.role, bold: true, color: COLORS.accent },
    { text: ` — ${profile.subRole} (${position.headline})`, bold: true, color: COLORS.accent },
  ],
  { size: 10.5, gap: 2 },
)

// Location and availability share one line, echoing the site's hero badges.
flow(
  [
    { text: profile.location, color: COLORS.muted },
    { text: '  ·  ', color: COLORS.accentBright },
    { text: profile.availability, bold: true, color: COLORS.accent },
  ],
  { size: 8.75, gap: 2 },
)

// The phone entry doubles as WhatsApp (same number); for print, the wa.me deep
// link is rewritten to a plain tel: URI, and Telegram is skipped as noisy on paper.
const pdfSocials = socials
  .filter((s) => s.id !== 'telegram')
  .map((s) =>
    s.id === 'phone'
      ? { ...s, href: `tel:${s.display.replace(/[^+\d]/g, '')}` }
      : s,
  )
const contactSegments = pdfSocials.flatMap((s, i) => {
  const seg = [{ text: s.display, url: s.href }]
  return i < pdfSocials.length - 1
    ? [...seg, { text: '  ·  ', color: COLORS.accentBright }]
    : seg
})

// Portfolio URL closes the line. Displayed clean (no query params), but the
// link annotation carries ?skill=<position> so it opens the site pre-switched
// to this CV's stack.
const siteDisplay = profile.siteUrl.replace(/^https?:\/\//, '')
const siteUrl = `${profile.siteUrl}/?skill=${position.id}`
contactSegments.push(
  { text: '  ·  ', color: COLORS.accentBright },
  { text: siteDisplay, url: siteUrl },
)
flow([...contactSegments], { size: 8.75, gap: 8 })

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

sectionTitle('Professional Summary')
paragraph(summary.intro, { gap: 3 })
summaryBody(position.id).forEach((line) => bullet(line))
y -= 6

sectionTitle('Technical Skills')
// Groups ordered for the selected position; its lead skills float to the front
// of their group.
const leadRank = new Map(position.leadSkills.map((id, i) => [id, i]))
for (const [group, label] of Object.entries(skillGroupLabels).sort(
  (a, b) =>
    (groupOrderIndex.get(a[0]) ?? 99) - (groupOrderIndex.get(b[0]) ?? 99),
)) {
  const items = skills
    .filter((s) => s.group === group)
    .sort(
      (a, b) =>
        (leadRank.get(a.id) ?? 99) - (leadRank.get(b.id) ?? 99),
    )
    .map((s) => s.title)
    .join(', ')
  if (!items) continue
  flow([{ text: `${label}: `, bold: true }, { text: items }], { size: 9, gap: 3 })
}
y -= 4

sectionTitle('Professional Experience')
for (const job of cvExperience) {
  // Company + period on one line.
  ensure(30)
  page.drawText(job.company, { x: MARGIN.left, y, size: 10.5, font: bold, color: COLORS.heading })
  const periodW = width(job.period, font, 8.75)
  page.drawText(job.period, {
    x: A4.W - MARGIN.right - periodW,
    y: y + 1,
    size: 8.75,
    font,
    color: COLORS.muted,
  })
  y -= 13

  flow(
    [
      { text: job.role, bold: true, color: COLORS.accent },
      { text: `  ·  ${job.location}`, color: COLORS.muted },
    ],
    { size: 9.25, gap: 3 },
  )

  for (const p of job.projects ?? []) {
    const urlShort = p.url
      ? p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
      : null
    const segments = [
      { text: p.name, bold: true },
      { text: ` — ${p.country}`, color: COLORS.muted },
    ]
    if (urlShort) segments.push({ text: `  ${urlShort}`, url: p.url, color: COLORS.accent })
    flow(segments, { size: 9.25, x: MARGIN.left + 11, gap: 1 })
    flow([{ text: `Stack: ${p.technologies.join(', ')}`, color: COLORS.muted }], {
      size: 8.75,
      x: MARGIN.left + 11,
      gap: 3,
    })
  }

  const meta = [
    job.technologies && ['Stack: ', job.technologies],
    job.architecturalPatterns && ['Architecture: ', job.architecturalPatterns],
    job.methodologies && ['Methodology: ', job.methodologies],
    job.designPrinciples && ['Principles: ', job.designPrinciples],
  ].filter(Boolean)
  for (const [label, value] of meta) {
    flow([{ text: label, bold: true }, { text: value }], { size: 8.75, gap: 2 })
  }

  job.achievements.forEach((a) => bullet(a))
  y -= 10
}

sectionTitle('Education')
for (const e of education) {
  flow([{ text: e.name, bold: true }], { size: 9.75, gap: 1 })
  flow(
    [
      { text: e.degree, color: COLORS.muted },
      { text: '  ·  ', color: COLORS.accentBright },
      { text: e.period, color: COLORS.muted },
    ],
    { size: 9, gap: 4 },
  )
}
y -= 4

sectionTitle('Languages')
const langSegments = languages.flatMap((l, i) => {
  const seg = [{ text: l.name, bold: true }, { text: ` — ${l.level}` }]
  return i < languages.length - 1
    ? [...seg, { text: '  ·  ', color: COLORS.accentBright }]
    : seg
})
flow(langSegments, { size: 9.25, gap: 0 })

/* ------------------------------------------------------------------ */
/* Footer: name · site  |  Page X of Y                                 */
/* ------------------------------------------------------------------ */

const pages = doc.getPages()
const footerLeft = `${profile.name} · ${profile.siteUrl.replace(/^https?:\/\//, '')}`
pages.forEach((p, i) => {
  const size = 7.5
  p.drawText(footerLeft, { x: MARGIN.left, y: 30, size, font, color: COLORS.muted })
  const right = `Page ${i + 1} of ${pages.length}`
  p.drawText(right, {
    x: A4.W - MARGIN.right - width(right, font, size),
    y: 30,
    size,
    font,
    color: COLORS.muted,
  })
})

/* ------------------------------------------------------------------ */
/* Save                                                                */
/* ------------------------------------------------------------------ */

await mkdir(path.dirname(OUTPUT), { recursive: true })
const bytes = await doc.save()
await writeFile(OUTPUT, bytes)
const { size } = await stat(OUTPUT)
console.log(
  `✔ CV PDF generated [${position.label}]: ${path.relative(ROOT, OUTPUT)} (${pages.length} page(s), ${(size / 1024).toFixed(1)} KB)`,
)
