# Morse Landing: Build Spec

Read `brand.md` first. Stack: Vite + React 19 + TypeScript (strict), plain
CSS, no runtime dependencies beyond React.

Site v3 (November 2026) is "one kit, two products": the landing sells the
kit, and Morse Receipts and Morse Agents get their own pages. This repo holds
the landing. It ports the designer's self-contained `index.html` handover
section by section.

## Structure

| Order | Component | Ground | Anchor |
|---|---|---|---|
| | `SiteNav` | floating ink pill | |
| 1 | `Hero` (signal field, status label, signal board) | ink | `#top` |
| | `Supporters` (paper shelf straddling the hero edge) | paper | |
| 2 | `Statement` (why a kit, the five struck chores) | bone | |
| 3 | `Kit` (manifest, `CodePanel`, `Tracks`, `Cost`) | bone | `#kit`, `#cost` |
| 4 | `HowItWorks` | ink | `#how` |
| 5 | `Products` (head, Morse Receipts, Morse Agents) | bone | `#products` |
| 6 | `Ecosystem` (Apps row, switchboard, Recipes row) | bone | `#ecosystem` |
| 7 | `Roadmap` | ink | `#roadmap` |
| 8 | `FinalCta` | ultramarine | |
| | `SiteFooter` | ink | |

`Products` and `Ecosystem` read as one "Built on the kit" section with three
row labels (Products, Apps, Recipes). They are two components so the
`#ecosystem` anchor lands on the Apps row.

Every section component is a named export in `src/components/`.

## Shared pieces

- `src/index.css`: tokens, base rules and global utilities (`.container`,
  `.eyebrow`, `.on-ink`, `.sr-only`, `.skip-link`).
- `src/site.css`: the one shared stylesheet. Every section and device class
  lives here under the class names the design handover uses (`.hstat`,
  `.board`, `.shelf`, `.chores`, `.mani`, `.trk`, `.cost`, `.prod`, `.mini`,
  `.sw`, `.jack`, `.mc`, `.chip`, `.rowlab`), so the Receipts and Agents pages
  can share it.
- `src/ui/Button.tsx`: `<Cta tone size hint external>`. Tones: `bone`, `ink`,
  `ultra`, `outline-light`, `outline-dark`, `outline-white`. `<CtaLabel>` is
  the same look on a span, for a button inside a card that is itself a link.
- `src/ui/Morse.tsx`: `<Morse word size>`, a word in real Morse as a row of
  dots and dashes. `src/ui/SectionEyebrow.tsx` prefixes a section label with
  its number in Morse.
- `src/ui/Chip.tsx`: `<Chip tone onInk>`. Tones: `live`, `next`, `plan`.
- `src/ui/Lockup.tsx`: stacked product lockups; `tone` sets the product word
  in the product's own colour. `src/ui/ProductTiles.tsx`: the icon tiles of
  Receipts, Agents, Press and Uploader, drawn from each product's favicon.
  `src/ui/ProductMarks.tsx`: the Agent Publisher and Site Importer marks.
- `src/ui/MorseMark.tsx`: the mark in `currentColor`.
- `src/ui/PartnerLogos.tsx`: official Mysten Labs, Walrus, Sui and Seal
  marks, all in `currentColor`, each with `role="img"` and an `aria-label`.
- `src/ui/TravellingPulse.tsx`: one pulse sliding along a wire (SMIL).
- `src/lib/pulse.ts`: `pulsePath()` and `MARK_PATH`.
- `src/lib/morse.ts`: `toMorse()`, `morseMarks()` and `MORSE_WORDMARK`.
- `src/lib/useSmilPlayback.ts`: ref for any SVG with SMIL animation; pauses
  off-screen and under reduced motion. Every animated SVG must use it.
- `src/lib/useDaysSince.ts`: the DAY n count in the hero status label.
- `src/lib/links.ts`: every external URL. Do not hard-code URLs in components.

## Build and assets

- `vite build` prerenders the page into `dist/index.html` (the `prerender`
  plugin in `vite.config.ts` renders `src/entry-server.tsx`), and
  `src/main.tsx` hydrates it. Render output must not depend on the browser:
  read `window`, `document`, the clock or media queries in effects or through
  `useSyncExternalStore` with a server snapshot, never during render.
- `public/og.png`, the 1200×630 link preview, is exported from
  `design/og-card.html`. Re-export it after a brand or headline change.
- `public/apple-touch-icon.png` (180×180) is exported from
  `design/apple-touch-icon.svg`. Re-export it after a brand change.

## Rules

1. Semantic HTML: each `<section>` is `aria-labelledby` its heading; lists
   are `ul`/`ol`; real `<a>`/`<button>` only.
2. Decorative SVGs and every Morse glyph row are `aria-hidden`; the
   surrounding text carries meaning.
3. Dark grounds add the `on-ink` class so the focus ring switches to
   `--ultra-lift`. The ultramarine band sets `--focus-ring: #fff`. Cards that
   clip or mask their edge (`.mani`, `.prod.slip`) draw the ring inside it.
4. Transitions name their properties; never `transition: all`. Hover lifts
   sit inside `@media (hover: hover)`. CSS animations sit inside
   `@media (prefers-reduced-motion: no-preference)`.
5. Breakpoint `max-width: 860px`; the hero alone stacks at 1000px. The nav's
   JS mirror is `(min-width: 861px)`.
6. External links (apps, GitHub, X, licence) open in a new tab with
   `rel="noopener noreferrer"`; docs links stay in the same tab.
7. Copy follows the rules in `brand.md`, "Voice".

## Verified facts (checked 2026-11-17)

- Packages on npm: `@arcadiasystems/morse-sdk` 0.11.0,
  `@arcadiasystems/morse-cli` 0.13.0, `@arcadiasystems/morse-uploader` 0.5.0.
  Licence MIT.
- Code panel, CLI tab: every command and flag was checked against
  `morse <command> --help` on morse-cli 0.13.0: `config add <name>` with the
  global `--network`, `account import`, `publication create --name --slug`,
  `collection create <name>`, `entry add <name> --file`,
  `entry read <entryId>` (reads from storage nodes with client-side blob
  verification unless `--via-aggregator` is passed). TypeScript tab: the
  snippet was type-checked against morse-sdk 0.11.0 by the design handover.
  Neither snippet has been run end to end against a funded wallet.
- Encryption works out of the box on testnet only. On mainnet, Seal needs the
  developer's own key-server credentials; the page says so under the tracks.
- Every docs link on the page resolves, and so do uploader.morsecms.xyz,
  receipts.morsecms.xyz, agents.morsecms.xyz and press.morsecms.xyz.
- The `ecosystem` label exists on `arcadiasystems/morse-dcms`, so "Your
  product here" opens a labelled issue.
- Morse Uploader's own page states "up to 1 GiB per file in the browser" and
  "one quilt of up to 666 files".
- The mainnet date in the hero status label is 9 Sep 2026
  (`MAINNET_SINCE` in `Hero.tsx`). The count is public and exact.

## Not shipped yet

1. **The "live from chain" strip** (`#pulse` in the design: publications,
   entries, revisions). It is not rendered. The contracts emit
   `PublicationCreated` and `PublicationDeleted` but no entry or revision
   events, so two of the three counts would mean walking every publication's
   collections from the browser on each page load. It needs running totals
   on a shared object, entry and revision events, or the planned indexer.
   Until one exists, `brand.md` holds: no counters that are not read from
   chain.
2. **Cost figures** are dated worked examples (Walrus docs rate, 17 Nov
   2026), not live data. Re-read the Walrus storage-costs page before launch.
3. Roadmap dates are targets; Walrus Sessions 9 is "proposed" until confirmed.

## Verification

```sh
npm run build   # tsc -b + vite build
npm run lint
```

Check 1440px and 390px (and the hero at 1000px): no horizontal scroll, mobile
sheet opens and closes (toggle, Escape, outside tap, link tap), code tabs
respond to arrow keys, the DAY n count appears in the status label.
`dist/index.html` must contain the page text, and a `NODE_ENV=development`
build must hydrate with no warnings in the console.
