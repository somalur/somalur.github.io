# Repository instructions for agents

## Scope and working approach

These instructions apply throughout this repository. Follow the user's current
request when it overrides a project preference here.

- Make requested changes directly in the repository. Routine, reversible edits
  within the requested scope do not require another confirmation.
- Inspect relevant files and the current Git diff before editing. Preserve
  unrelated work and do not revert changes made by the owner or other agents.
- Keep changes focused. Preserve the existing folder structure and component
  boundaries; avoid broad rewrites, dependency upgrades, or formatting sweeps.
- Ask for missing information only when it affects correctness. Do not invent
  career facts, credentials, addresses, dates, achievements, or contact details.
- Explain what changed, what was checked, and any remaining limitations.

## Stack and deployment constraints

- This is a Next.js App Router portfolio using TypeScript, React, CSS Modules,
  and Motion. Use the existing libraries before adding dependencies.
- Preserve `output: "export"` in `next.config.ts` and GitHub Pages compatibility.
  Do not introduce server-only routes, runtime APIs, or secrets into this static
  site without an explicit request to change its architecture.
- Keep browser APIs inside client components and out of server rendering paths.
- Put site assets in `public/` and reference repository assets, never absolute
  paths on the owner's computer. Use static-export-compatible image handling.
- Do not manually edit generated directories such as `.next/`, `out/`, or
  `node_modules/`. Update the lockfile when intentionally changing dependencies.

## Where to make changes

- `src/app/page.tsx`: introduction, skills, detailed work experience, projects,
  achievements, education, contact links, and site navigation.
- `src/app/page.module.css`: main responsive layout and visual styling.
- `src/components/CareerJourney.tsx`: newest-first career timeline and summaries.
- `src/components/CareerGlobe.tsx` and `Aircraft.tsx`: globe and flight animation.
- `src/components/FlightGame.tsx` and its CSS module: optional flight game,
  destination landings, and locally saved passport progress.
- `src/components/LocationDetail.tsx` and its CSS module: workplace and campus
  address details shown after zooming into a globe location.
- `src/components/NavEnhancer.tsx`: navigation highlighting and section reveals.

When a fact appears in multiple components, check all relevant occurrences and
keep them consistent. Avoid duplicate skills and unnecessary duplication of data.

## Design and interaction rules

- Preserve the restrained black-and-white design, readable typography, bordered
  skill tags, and compact spacing unless the user requests a design change.
- Keep the normal portfolio usable without playing the optional game.
- Keep career history ordered from latest to earliest.
- The timeline's `.flightVisual` widget is hidden at widths of 760px and below.
  Preserve its desktop behavior and the mobile timeline's scroll offsets.
- Show street maps only through the globe's zoom flow. Keep workplace and
  education markers distinguishable with a legend; do not imply city markers
  represent exact building coordinates.
- Use Motion for animations and respect reduced-motion preferences. Clean up
  animation frames, observers, and event listeners when components unmount.
- Support keyboard navigation, visible focus, semantic headings, and accessible
  labels on icon-only links. Decorative images should have empty alt text.
- Keep navigation highlights aligned with scrolling and direct section links,
  including short sections near the footer and the mobile menu.
- Do not trap normal page scrolling in the globe or game. Handle browser storage
  being unavailable without breaking the page.

## Verification

- For simple text or CSS edits, inspect the changed content and run
  `git diff --check`. Do not add tests that merely repeat static copy.
- For behavior, component, or dependency changes, run `npm run lint` and
  `npm run build`. The build must still produce a static export.
- For layout or interaction changes, use the available local preview to check
  desktop and mobile behavior. Check relevant controls, keyboard access, scroll
  offsets, and overflow. For navigation changes, check Education and Contact
  near the bottom as well as long sections such as Experience.
- Use `npm run dev` for local preview. Reuse an existing working server when
  possible. Do not install packages merely to validate a minor edit.
- If a check cannot run, report the limitation accurately; do not claim it passed.

## Git, privacy, and publishing

- Never commit credentials, API keys, private configuration, or personal files
  unrelated to the requested site changes.
- Do not reset, clean, force-push, or discard repository work without explicit
  authorization. Do not commit, push, or deploy unless the user requests it.
- A push to `main` triggers the GitHub Pages deployment; treat it as publishing.
- Contact links may use the details the owner supplied for this portfolio, but
  adding links does not authorize sending messages or placing calls.
- Keep documentation consistent with behavior when making substantial changes.
