# somalur.github.io

Personal site deployed to GitHub Pages.

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
