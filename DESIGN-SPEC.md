# Morse Landing — Build Spec

Read `brand.md` first. Stack: Vite + React 19 + TypeScript (strict), CSS
Modules, no runtime dependencies beyond React.

The October 2026 redesign ports the designer's self-contained `index.html`
handover into this codebase section by section. Where the handover's copy
disagreed with the `arcadiasystems/morse-dcms` repository, the repository won;
see "Verified facts" below.

## Structure

| Order | Component | Ground | Anchor |
|---|---|---|---|
| — | `SiteNav` | floating ink pill | — |
| 1 | `Hero` (+ signal field, `WalrusBadge`) | ink | `#top` |
| — | `Supporters` (paper shelf straddling the hero edge) | paper | — |
| 2 | `Statement` | bone | — |
| 3 | `UseCases` (+ `UseCaseArt`) | bone | `#use-cases` |
| 4 | `HowItWorks` | ink | `#how` |
| 5 | `ForDevelopers` | bone | — |
| 6 | `LiveDemo` | bone | — |
| 7 | `Roadmap` | ink | `#roadmap` |
| 8 | `FinalCta` | ultramarine | — |
| — | `SiteFooter` | ink | — |

Every section component is a named export in `src/components/` with one
`.module.css` of the same basename.

## Shared pieces

- `src/index.css`: tokens and global utilities (`.container`, `.eyebrow`,
  `.section-title`, `.on-ink`, `.sr-only`, `.skip-link`).
- `src/ui/Button.tsx`: `<Cta tone size hint external>`. Tones: `bone`, `ink`,
  `ultra`, `outline-light`, `outline-dark`, `outline-white`. `<CtaLabel>` is
  the same look on a span, for a button inside a card that is itself a link.
- `src/ui/MorseMark.tsx`: the mark in `currentColor`.
- `src/ui/PartnerLogos.tsx`: official Mysten Labs, Walrus, Sui and Seal
  marks plus the Walrus "W" symbol, all in `currentColor`.
- `src/ui/TravellingPulse.tsx`: one pulse sliding along a wire (SMIL).
- `src/lib/pulse.ts`: `pulsePath()` and `MARK_PATH`.
- `src/lib/useSmilPlayback.ts`: ref for any SVG with SMIL animation; pauses
  off-screen and under reduced motion. Every animated SVG must use it.
- `src/lib/links.ts`: every external URL. Do not hard-code URLs in components.

## Build and assets

- `vite build` prerenders the page into `dist/index.html` (the `prerender`
  plugin in `vite.config.ts` renders `src/entry-server.tsx`), and
  `src/main.tsx` hydrates it. Render output must not depend on the browser:
  read `window`, `document` or media queries in effects or through
  `useSyncExternalStore` with a server snapshot, never during render.
- `public/og.png`, the 1200×630 link preview, is exported from
  `design/og-card.html`. Re-export it after a brand change.
- `public/apple-touch-icon.png` (180×180) is exported from
  `design/apple-touch-icon.svg`. Re-export it after a brand change.

## Rules

1. Semantic HTML: each `<section>` is `aria-labelledby` its heading; lists
   are `ul`/`ol`; real `<a>`/`<button>` only.
2. Decorative SVGs are `aria-hidden`; the surrounding text carries meaning.
3. Dark grounds add the `on-ink` class so the focus ring switches to
   `--ultra-lift`. The ultramarine band sets `--focus-ring: #fff`.
4. Transitions name their properties; never `transition: all`. Hover lifts
   sit inside `@media (hover: hover)`.
5. One breakpoint, `max-width: 860px`. The nav's JS mirror is
   `(min-width: 861px)`.
6. External links (demo blog, GitHub, X, licence) open in a new tab with
   `rel="noopener noreferrer"`; docs links stay in the same tab.

## Verified facts (checked against morse-dcms, 2026-10-15)

- Network status on the page is "Live on Walrus mainnet" (product owner's
  call, 2026-10-15). Contracts are unaudited.
- Packages: `@arcadiasystems/morse-sdk`, `@arcadiasystems/morse-cli`. Licence MIT.
- SDK flow: `morseConfig` → `createPublication` → `createCollection` →
  `addEntryFromBytes` (`upload: { epochs, deletable: true }` is required;
  Move rejects non-deletable blobs).
- CLI flow: `config add`, `account import`, `publication create`,
  `collection create`, `entry add`, `cap issue`, `entry list`. There is no
  `morse publish` or `morse cap grant`.
- Seal policies today: public and publisher. The subscription policy is
  reserved, not shipped, so copy must not promise subscriber gating.
- Indexer and content API are planned.

## Open items from the handover

1. Roadmap dates (Q4 2026, Nov 2026, Q1 2027) are proposals; confirm them.

## Verification

```sh
npm run build   # tsc -b + vite build
npm run lint
```

Check 1440px and 390px: no horizontal scroll, mobile sheet opens and closes
(toggle, Escape, outside tap, link tap), code tabs respond to arrow keys, the
CLI tab's copy button copies the install command. `dist/index.html` must
contain the page text, and a `NODE_ENV=development` build must hydrate with
no warnings in the console.
