# Armen Hovasapyan — Personal CV site

Personal portfolio & CV website for Armen Hovasapyan, Software Engineer (.NET / Backend / Full-Stack Developer), built with **Nuxt 4** and **Tailwind CSS 4**.

> Live: https://armenhovasapyan.github.io

## Features

- Single-page portfolio (hero, stats, skills, experience, projects, contact)
- Full CV page at `/cv` with all experience details from the PDF resume
- Downloadable PDF CV (`public/Armen_Hovasapyan_CV_*.pdf`)
- Dark / light theme toggle (persisted in `localStorage`)
- Scrollspy navigation, typing effect, animated counters
- SEO: Open Graph, Twitter cards, JSON-LD (`Person` + `ItemList`), canonical URLs, `robots.txt`
- Static generation for GitHub Pages via GitHub Actions

## Setup

```bash
npm install
```

## Development

```bash
npm run dev        # http://localhost:3000
```

## Static build

```bash
npm run generate   # outputs static site into .output/public
npm run preview    # serve the built site locally
```

## CV PDF

The downloadable CV (`public/Armen_Hovasapyan_CV_*.pdf`) is **generated from the site data** — not maintained by hand:

```bash
npm run generate:pdf   # renders app/data/site.ts → public/Armen_Hovasapyan_CV_*.pdf
```

The script draws the CV directly with [pdf-lib](https://www.npmjs.com/package/pdf-lib) — pure JS, no browser dependency, ~1s runtime. On every push to `main`, the deploy workflow regenerates the PDF first and commits it back to the repo, so the "Download CV" buttons always serve the latest version.

## Deployment

GitHub Pages is wired up with [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Push to `main` (or run the workflow manually).
2. In the repository settings, set **Pages → Source → GitHub Actions**.
3. The workflow first regenerates + commits the CV PDF from `app/data/site.ts`, then runs `npm run generate` and publishes `.output/public` with the fresh PDF included.

## Structure

```
app/
├── assets/css/main.css        # Tailwind theme — emerald green accent palette
├── components/
│   ├── layout/                # Header (scrollspy nav), Footer
│   ├── sections/              # Hero, Skills, Experience, Projects, Contact
│   └── ui/                    # Cards, counters, social links, theme toggle
├── composables/               # useTyping, useScrollSpy, useCountUp, useTheme, useExperience
├── data/site.ts               # ← All CV content lives here (edit this)
├── layouts/default.vue
├── pages/                     # index.vue (portfolio), cv.vue (full CV)
└── types/site.ts              # Content model types
```

## Customizing

Edit `app/data/site.ts` — profile, stats, skills, companies, projects, experience, education and languages are all plain data. Colors live in the `@theme` block of `app/assets/css/main.css` (`--color-accent: #10b981`).
