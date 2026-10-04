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
clipping. `src/components/Aircraft.tsx` provides an original aircraft silhouette that
travels between locations as visitors scroll through the newest-first career timeline.
The globe stays beside the current role on desktop and above it on mobile. Location
links also jump directly to a role. No map API key or external map service is required.
Full globe and Close-up controls remain available. Drag to rotate; Alt + wheel or
+/− keys zoom. Ordinary wheel scrolling advances the page. Home resets the view.
On touch screens, horizontal swipes rotate and vertical swipes scroll the page.
Motion respects the system reduced-motion preference.

The Contact section in `src/app/page.tsx` provides direct email and LinkedIn links.

Motion also handles section reveals in the existing `NavEnhancer` component.

Verification: run lint and the production build, then check the timeline controls,
scrolling in both directions, all five roles, globe controls, contact links, and mobile
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
