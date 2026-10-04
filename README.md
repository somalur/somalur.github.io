# somalur.github.io

Personal site deployed to GitHub Pages.

## Career journey

The original Next.js App Router, CSS modules, and static export structure are retained.
`src/components/CareerJourney.tsx` adds a Motion-powered globe and chronological
timeline. Career locations, dates,
and summaries are defined in the component's `stops` array. Detailed
résumé content remains in `src/app/page.tsx`.

`src/components/CareerGlobe.tsx` renders an orthographic Earth globe using D3 Geo
and Natural Earth coastline data bundled locally through [world-atlas](https://github.com/topojson/world-atlas).
Motion rotates the globe between cities, with great-circle routes and hidden-hemisphere
clipping. No map API key or external map service is required. Select a chapter or use Play flyover/Pause
tour, and switch between Full globe and a 2× Close-up centered on the selected city.
Drag the globe to rotate it, or scroll over it to zoom between 1× and 3×. Wheel
scrolling passes through to the page at the zoom limits. With the globe focused,
arrow keys rotate, +/− zoom, and Home resets to the selected city at 1×. On touch
screens, horizontal swipes rotate while vertical swipes preserve page scrolling.
Motion respects the system reduced-motion preference.

Motion also handles section reveals in the existing `NavEnhancer` component.

Verification: run lint and the production build, then check the timeline controls,
flyover play/pause, all five chapters, globe controls, and mobile
navigation in the local preview.

## Requirements

- Node.js 20+ and npm

Check:

```bash
node -v
npm -v
```

## Local development

Install dependencies:

```bash
npm ci
```

Run dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Lint

```bash
npm run lint
```

## Production build + static export

This repo is configured for GitHub Pages static export (`output: "export"` in `next.config.ts`).

Build:

```bash
npm run build
```

The static site output is written to:

- `out/`

## Deploy (GitHub Pages)

- Deployment runs on every push to `main` via GitHub Actions.
- The workflow builds and uploads `out/` to GitHub Pages.

If Pages isn’t publishing:

1. Repo Settings → Pages
2. Source: GitHub Actions

## Deploy

Deployment runs on push to `main` via GitHub Actions (static export to `out/`).
