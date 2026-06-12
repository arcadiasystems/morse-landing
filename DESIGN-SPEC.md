# Morse Landing — Build Spec (Signal Brutalist)

Read `brand.md` first. This file is the binding spec for every section component.
Stack: Vite + React 19 + TypeScript, CSS Modules. No new dependencies.

## Files you may rely on (already written, do not edit)

- `src/index.css` — all design tokens + global utilities. USE THESE TOKENS. Never
  hardcode colors; never invent spacing values outside the scale.
- `src/lib/morse.ts` — `toMorse(text)` returns the dot/dash encoding; `MORSE_WORDMARK`.
- `src/lib/links.ts` — `DOCS`, `GITHUB`, `TWITTER` URL constants. All external links
  use these.
- `src/ui/Button.tsx` — `<Cta>` component: `variant="solid" | "ghost"`, renders `<a>`.
- `src/ui/Reveal.tsx` — `<Reveal>` IntersectionObserver wrapper: children get a
  one-time 600ms translateY+opacity entrance. `delay` prop (ms). Reduced-motion safe.
- `src/ui/MorseDivider.tsx` — `<MorseDivider word="VERIFY">` renders the word's real
  morse encoding as a decorative hairline divider.
- `src/ui/Terminal.tsx` — `<Terminal tabs={[{label, code}]}>` dark code plate with
  mono tabs, amber-tinted syntax accents, faux window chrome (no traffic lights —
  a mono filename tag instead).

## Global rules (every component)

1. Semantic HTML. `<section>` with `aria-labelledby` pointing at its `<h2>`.
   Real `<a>`/`<button>` only — never div onClick.
2. Every interactive element: visible `:focus-visible` ring (the global
   `index.css` already styles it amber — do not remove outlines).
3. Transitions: specify properties (`transform`, `opacity`, `color`,
   `background-color`, `border-color`). NEVER `transition: all`. Micro = 100–150ms
   ease-out. Hover state must have matching un-hover (CSS transitions only).
4. All animation beyond micro-interactions wrapped in
   `@media (prefers-reduced-motion: no-preference)`. Reduced motion = static final state.
5. Type: headings use `var(--font-display)` UPPERCASE with class `display-h2`
   (defined globally) or its rules; eyebrows use global class `eyebrow` (mono,
   amber, uppercase, letterspaced, prefixed with a real morse glyph via
   `data-morse` attr if desired). Body uses `var(--font-body)`. Hashes/tags/labels
   use `var(--font-mono)`.
6. Layout: max-width container = global class `container` (1280px, 24px gutter
   mobile / 40px desktop). Section vertical padding: `var(--section-pad)` (clamp
   96–160px). Hairline rules (`var(--hairline)`) between sections — flat
   brutalist grid, NOT floating cards with shadows. Border-radius: 0 on plates
   and structural blocks, `var(--r-pill)` only on pills/CTA. No drop shadows
   except `--signal-glow` on primary CTA hover.
7. Numbers: `font-variant-numeric: tabular-nums` on anything that changes.
8. Mobile: must hold at 375px, 768px, 1280px. Grid collapses: 4→2→1, bento→1col.
   Hit targets ≥ 40px on touch.
9. Copy: terse, declarative, specific. No "may help", no "cutting-edge".
   Headlines ALL CAPS display type.
10. NO fake data: no invented partner logos, star counts, or usage stats.
11. Icons: inline SVG, `stroke="currentColor"`, `strokeWidth 1.75`, `aria-hidden`.
    No emoji.
12. Ghost numerals: sections may place an absolutely-positioned Unbounded 900
    numeral (`01`…) at `clamp(120px, 18vw, 280px)`, `color: var(--paper)`,
    `opacity: 0.04`, `aria-hidden`, `pointer-events:none`, behind content.

## Section components (exact files + exports)

Every component: named export, no default. One `.module.css` per component,
same basename. Do not create or edit ANY file outside your assigned set.

### 1. `src/components/SiteNav.tsx` + `SiteNav.module.css` — export `SiteNav`
Fixed top. Two layers:
- Banner strip (28px): bg `--signal`, ink text, mono 11px uppercase:
  "MORSE PROTOCOL V1 — LIVE ON SUI TESTNET" left; right: DOCS / GITHUB links (ink,
  underline on hover). On mobile only the message shows.
- Nav bar (64px): bg `rgba(10,10,10,0.92)` + `backdrop-filter: blur(12px)`,
  hairline bottom. Left: logo = bordered box (1px paper) containing wordmark
  "MORSE" in Unbounded 700 13px + below it the real morse `-- --- ·-· ··· ·`
  rendered as 3px dots/dashes in amber (use `toMorse('MORSE')`). Center-left links
  (Space Mono 13px uppercase, paper-dim → paper on hover, amber `[` `]` brackets
  appear on hover): PROTOCOL→`${DOCS}/core-concepts.html`, ARCHITECTURE→`#architecture`,
  CONTRACTS→`${DOCS}/contracts.html`, DOCS→`${DOCS}/index.html`.
  Right: GitHub icon link (svg, aria-label) + `<Cta variant="solid" size="sm">`
  "START BUILDING" → `${DOCS}/quick-start.html`.
- Mobile (<900px): hamburger `<button>` (3 bars → X transform), full-screen ink
  overlay menu, links in Unbounded 700 28px uppercase, staggered 40ms reveal,
  body scroll locked while open, Escape closes. No dropdowns anywhere.

### 2. `src/components/SignalHero.tsx` + `SignalHero.module.css` + `src/components/LivingDiff.tsx` + `LivingDiff.module.css` — exports `SignalHero`, `LivingDiff`
Layout: container, two-col grid (7/5) ≥1024px, stacked below. Min-height ~88vh.
Left:
- Eyebrow (mono amber): `TRANSMISSION 001 — DECENTRALIZED CMS PROTOCOL`
- H1 (Unbounded 900, `clamp(3rem, 8.5vw, 7.5rem)`, line-height 0.95):
  "CONTENT," / "TRANSMITTED" / "FOREVER." on three lines.
  DECODE ANIMATION: on mount each character first renders as its morse encoding
  (dots/dashes in amber, Space Mono) then snaps to the final glyph,
  left-to-right, ~30ms/char, total under 1.6s. Implement with a hook that ticks
  through chars (single interval, cleanup on unmount). While decoding, char
  occupies same width (use `ch`-stable wrapper or inline-block with min-width)
  to avoid layout shift. Reduced motion / after decode: plain headline.
- Carrier wave: a 2px amber line under the headline that continuously pulses a
  travelling lighter segment (CSS keyframe translateX on a gradient, 4s linear
  infinite, GPU-only). Static amber line under reduced motion.
- Sub (Space Grotesk 18px, paper-dim, max 52ch): "Morse is an open CMS protocol.
  Entries anchored on Sui. Payloads stored on Walrus. Every revision carries an
  on-chain proof — no vendor in the loop."
- CTAs: solid "START BUILDING" → `${DOCS}/quick-start.html`; ghost
  "READ THE PROTOCOL" → `${DOCS}/core-concepts.html`.
- Stack line (mono 12px, paper-faint, separated by amber middots):
  MOVE CONTRACTS · WALRUS STORAGE · SEAL ENCRYPTION
Right: `<LivingDiff />`.

LivingDiff — the product demo as art. A flat plate (`--ink-raised`, hairline
border, radius 0): header row mono: `posts/hello-world.md` left,
`rev 0042` right (tabular-nums). Body shows a short markdown doc (3 lines
prose). Loop (~12s, three scripted variations):
  1. one sentence gets `del`-styled strikethrough (amber-tinted red? NO — use
     paper-faint strikethrough),
  2. replacement text types in char-by-char (mono caret),
  3. gutter line types `$ morse entry commit`,
  4. digest spools out char-by-char in `--verified` mono:
     `tx 0x4f2a…9c1b ✓ VERIFIED`,
  5. stamp element "ON-CHAIN" (mono, amber border box) snaps in with a
     1.05→1.0 scale settle (150ms),
  6. rev counter increments 0042→0043 with a tabular-nums roll.
Pause when not in viewport (IntersectionObserver) and under reduced motion
(render final verified state). All timers in one effect with full cleanup.

### 3. `src/components/SignalTicker.tsx` + `SignalTicker.module.css` — export `SignalTicker`
Full-bleed amber slab (bg `--signal`, ink text), ~96px tall, rotated 0deg (keep
horizontal), hairline top+bottom. Inside: infinite marquee (duplicate-track
translateX(-50%), ~30s linear, `width: max-content`): items in Unbounded 700
`clamp(20px, 2.6vw, 34px)` uppercase ink:
ON-CHAIN GOVERNANCE / VERIFIABLE REVISIONS / WALRUS-PERMANENT / SEAL-ENCRYPTED /
OPEN PROTOCOL / AI-READABLE — separated by that word's real morse encoding
(`toMorse(word)` first word is fine) rendered as chunky ink dots/dashes.
Edge fade mask. Pause on hover. Second track `aria-hidden`. Reduced motion:
static row, overflow hidden. This section replaces the old fake "trusted by"
logo marquee — no logos, no fake claims.

### 4. `src/components/Transmission.tsx` + `Transmission.module.css` — export `Transmission`
id="protocol". Eyebrow `THE PROTOCOL`; H2 "FOUR STEPS." / "NO MIDDLEMAN."
(two lines); lead (max 56ch): "Each step is independently verifiable,
deterministically reproducible, and runs on infrastructure anyone can host."
Then a 4-col hairline grid (gap-as-border style: 1px `--hairline` lines, no
radius). Each cell: ghost numeral 01–04 top-right (Unbounded, 64px, opacity
0.12 amber), title (Unbounded 700 18px uppercase): PUBLISH / STORE / VERIFY /
SERVE; desc (15px paper-dim, existing copy tightened):
- PUBLISH: "One command pushes markdown, schemas, and metadata into the
  protocol. No provisioning. No vendor queue."
- STORE: "Payloads land on Walrus as immutable blobs. Revisions append;
  nothing overwrites, nothing disappears."
- VERIFY: "A Move contract on Sui records every blob reference and capability
  change. Every permission is on-chain."
- SERVE: "Indexers anyone can run watch contract events and serve fast,
  queryable state — to your app or any agent."
Mono tag bottom (amber, 12px): `morse publish` / `walrus.store()` /
`sui.record()` / `morse.network/api`.
Above the grid: a horizontal "signal path" — thin hairline with 4 nodes (amber
dots) and an animated dash travelling across (CSS, 6s linear infinite,
reduced-motion static). Each cell wrapped in `<Reveal delay={i*80}>`.

### 5. `src/components/CapabilitiesBento.tsx` + `CapabilitiesBento.module.css` — export `CapabilitiesBento`
Eyebrow `CAPABILITIES`; H2 "BUILT FOR PERMANENCE," / "NOT PLATFORMS."
Bento grid (hairline-separated flat cells, desktop 6-col template):
- A (span 4, tall): ON-CHAIN GOVERNANCE — "Version history and access control
  recorded on Sui. Capabilities are objects: grant them, revoke them, prove
  them." Visual: mini capability ledger — 3 mono rows
  (`EditorCap → 0x7be4…`, `AdminCap → 0x21ff…`, `revoked ✗ 0x9a02…` last one
  paper-faint strikethrough), each with `--verified` dot, hairline separated.
- B (span 2): VERIFIABLE REVISIONS — "Every edit has an on-chain proof. No
  hidden changes, ever." Visual: 3-dot rev timeline, latest amber.
- C (span 2): SEAL ENCRYPTION — "Publisher and subscription access policies,
  enforced by keys — not by promises."
- D (span 2): AI-READABLE — "Structured content any agent can query over an
  open REST surface." Visual: two-line mono JSON snippet.
- E (span 2): ONE-COMMAND DEPLOY — mono chip `morse publish ./content` with
  amber `$` prefix — "That's it. No config files."
- F (span 6, wide strip): OPEN PROTOCOL — "No vendor lock-in. Self-host every
  layer or use the network. The contracts are the only source of truth." plus
  ghost link "READ ABOUT ENTRIES →" `${DOCS}/entries.html` (mono, amber on hover).
Cell hover: background shifts to `--ink-raised` (150ms), 1px amber line slides
in at top (transform scaleX 0→1, 150ms ease-out). Titles Unbounded 700 16px
uppercase. Collapse: 2-col ≤1024, 1-col ≤640.

### 6. `src/components/InfraShift.tsx` + `InfraShift.module.css` — export `InfraShift`
Eyebrow `THE SHIFT`; H2 "LEGACY DIES." / "PROTOCOLS DON'T."
Lead: "Morse does for content what Vercel did for deployment — makes it
invisible, instant, developer-first. Then it removes the vendor."
Ledger table, three columns separated by hairlines (no cards):
- LEGACY CMS — mono tag `2005 →` — rows (paper-faint, each prefixed by a small
  paper-faint ✕): Single host, single point of failure / Per-seat licensing,
  vendor lock / Manual backups, opaque revisions / Plugin-driven attack surface /
  Invisible to AI agents.
- VERCEL-ERA — tag `2018 →` — rows (paper-dim, neutral – prefix): Edge-deployed,
  CDN-backed / API-first headless content / Vendor still owns the data / Mutable
  history, no proofs / AI-readable via REST, not by default.
- MORSE — tag `NOW` in amber stamp box — rows (paper, amber ✓): Walrus-permanent,
  host-independent / Open protocol — no vendor, no lock-in / On-chain governance,
  verifiable revisions / Move contracts as the security boundary / AI-native,
  readable by any agent.
Morse column: 1px amber border, subtle `--signal-glow` only here. Collapse to
stacked blocks ≤900px (MORSE first on mobile).

### 7. `src/components/ProtocolStack.tsx` + `ProtocolStack.module.css` — export `ProtocolStack`
id="architecture". Eyebrow `ARCHITECTURE`; H2 "EVERY LAYER" / "IS REPLACEABLE."
Two-col (5/7): left text — lead "Only the Sui contracts are the source of
truth. Everything else can be swapped, self-hosted, or run by anyone." + 4
points, each: amber morse glyph bullet + bold lead-in (Control layer / Storage
layer / Read layer / Developer layer) + existing descriptions.
Right: vertical stack of 5 layer rows (hairline separated, flat):
SUI BLOCKCHAIN ("Publications, collections, entries, capabilities")
WALRUS STORAGE ("Blob + quilt storage, content payloads")
SEAL ENCRYPTION ("Publisher and subscription access policies")
TYPESCRIPT SDK ("Wraps Sui and Walrus for app developers")
INDEXER + CONTENT API ("Event-driven read layer, REST")
Status stamps (mono 11px, bordered): LIVE (amber border+text, pulsing dot under
motion-safe) ×3, IN PROGRESS (paper-dim) for SDK, PLANNED (paper-faint) for
Indexer. HONESTY: keep statuses exactly as listed. A thin amber connector line
runs through the layer rows (left edge) with animated dash flow
(motion-safe only). Layer names Unbounded 700 15px uppercase.

### 8. `src/components/AgentConsole.tsx` + `AgentConsole.module.css` — export `AgentConsole`
Eyebrow `DEVELOPER EXPERIENCE`; H2 "AGENT-FIRST" / "BY DESIGN."
Two-col (5/7): left — lead: "A coding agent can define schemas, provision
publications, publish entries, and operate the entire backend through the CLI
or SDK. No dashboard required. No human in the provisioning loop." + ghost CTA
"VIEW QUICK START →" `${DOCS}/quick-start.html`.
Right: `<Terminal>` with tabs:
- TYPESCRIPT: the existing SDK snippet (createPublication / createCollection /
  publish — reuse copy from spec author notes; keep it 14 lines max)
- CLI: `morse init my-blog --network testnet` / `morse collections create posts`
  / `morse publish posts/hello-world.md` / `morse entries list --pub my-blog`
  with `#` comments.

### 9. `src/components/FailureModes.tsx` + `FailureModes.module.css` — export `FailureModes`
Eyebrow `WHY MORSE`; H2 "THE CENTRALIZED CMS" / "FAILS THREE WAYS."
Three hairline-separated columns (1-col mobile), each: huge mono index
`01 / 02 / 03` (Space Mono 700, 48px, amber), title (Unbounded 700 16px
uppercase): TRUST CONCENTRATION / WEAK PORTABILITY / OPAQUE HISTORY, body
(15px paper-dim) — reuse existing card copy verbatim from the old WhyMorse
section (the three "cards" texts). `<Reveal>` stagger 80ms.

### 10. `src/components/FinalTransmission.tsx` + `FinalTransmission.module.css` — export `FinalTransmission`
Full-bleed closing block, extra padding (160px+), centered.
Eyebrow `FINAL TRANSMISSION`; giant display (Unbounded 900,
`clamp(2.8rem, 7vw, 6.5rem)`): "YOUR CONTENT." / "YOUR CONTRACTS."
Sub: "Deploy on Sui Testnet in minutes. No signup. No vendor. No lock-in."
CTAs row: solid "START BUILDING" + ghost "VIEW ON GITHUB" (GitHub icon).
Below: copyable CLI chip — `<button>` mono plate `$ morse init my-blog`
with copy icon; on click `navigator.clipboard.writeText('morse init my-blog')`,
label flips to "COPIED ✓" (amber) for 1.5s then reverts; `aria-live="polite"`.
Behind the headline: faint giant morse encoding of "MORSE" as background
texture (opacity 0.05, aria-hidden).

### 11. `src/components/SiteFooter.tsx` + `SiteFooter.module.css` — export `SiteFooter`
Designed surface, not an afterthought. Hairline top. Three zones:
- Row 1: link columns (mono 13px): PROTOCOL (Overview / How it works /
  Architecture / Security → docs URLs), BUILD (Quick start / Contracts /
  Entries → docs URLs), COMMUNITY (GitHub / Twitter → links.ts). Left of
  columns: wordmark box (same as nav logo) + tagline mono paper-faint:
  "DECENTRALIZED CMS. BUILT ON SUI + WALRUS." + the real morse encoding of
  "FOREVER" as tiny amber dots/dashes with `title="FOREVER"`.
- Row 2: hairline, then © 2026 MORSE PROTOCOL — OPEN SOURCE (mono 11px,
  paper-faint) left, "−− −−− ·−· ··· ·" right.
- Row 3 (the wow): giant cropped wordmark "MORSE" in Unbounded 900 at
  `clamp(120px, 22vw, 340px)`, uppercase, color `--paper` opacity 0.06,
  `line-height: 0.75`, cropped by `overflow: hidden` at the page bottom
  (negative margin-bottom), `aria-hidden`, `user-select: none`. On hover the
  letters individually flash amber (per-letter spans, 100ms color transition,
  hover only on `(hover: hover)`).

## Copy bank (verbatim where referenced)

WhyMorse card texts (reuse in FailureModes):
1. "One vendor backend controls all identity and data. If that vendor changes
   pricing, policies, or shuts down, your content and permissions go with it."
2. "Publication identity and permissions are stored in proprietary systems.
   They don't travel with you. Migrating means rebuilding from scratch."
3. "Change and authorization history is hidden inside a closed system. Auditing
   who changed what, and when, is impossible without vendor cooperation."

SDK snippet (Terminal TYPESCRIPT tab):
```ts
import { MorseClient } from '@morse/sdk'

const client = new MorseClient({ network: 'testnet' })

// create a publication on-chain
const pub = await client.createPublication({
  slug: 'my-blog',
  policy: 'public',
})

// define a collection schema
await pub.createCollection({ name: 'posts' })

// publish an entry to Walrus
await pub.publish({
  collection: 'posts',
  slug: 'hello-world',
  content: { title: 'Hello World', body },
})
```

## Verification (every agent, before finishing)

Run from `/Users/manda/morselanding/morse-landing`:

```
npx tsc --noEmit --ignoreConfig --strict --jsx react-jsx --module esnext --moduleResolution bundler \
  --target es2022 --lib es2022,dom,dom.iterable --skipLibCheck \
  --types vite/client src/components/<YourFile>.tsx
```

Zero errors required. Do NOT run `npm run build` (other agents' files are in
flight). Do not edit any file outside your assigned set.

## Appendix — Signal Brutalist v2 elevation (depth, lighting, choreography)

Binding addendum. Where this conflicts with sections above, v2 wins.
brand.md "Depth & lighting (v2)" defines the vocabulary; this appendix defines
the build.

### New primitives

| Primitive | Path | Contract |
|---|---|---|
| `Stagger` | `src/ui/Stagger.tsx` | Wraps each child in `<Reveal delay={from + i*step} variant>`. Props: `step` (default 80), `from` (0), `variant`. Replaces manual `delay={i*80}` math. |
| `FramePlate` | `src/ui/FramePlate.tsx` | Gradient-washed framed plate: `--r-plate`, `.border-glow`, `--ink-raised`, `--shadow-plate`, bottom-half wash. Props: `caption?` (mono 12px hairline-top row), `tint?: 'signal' \| 'verified' \| 'paper'` (default signal). |
| `TransmissionRing` | `src/components/TransmissionRing.tsx` | Hero centerpiece. See § Transmission Ring. |
| `LiveSignal` | `src/components/LiveSignal.tsx` | Section framing `LivingDiff` in a `FramePlate`. Eyebrow `ON AIR`. |

### Extended Reveal API (`src/ui/Reveal.tsx`)

`variant: 'rise' | 'fade' | 'scale' | 'slide' | 'mask' | 'draw'` (default
`rise` = v1 behavior, all existing call sites unchanged). Plus `duration`
(600), `distance` (24), `threshold` (0.15), `as` (div). Variants are CSS-only
via `data-variant`; reduced-motion renders final state instantly.
`mask` (clip-path) is one-time, headlines/slabs only. `draw` is for lines
(scaleX/scaleY from origin); gate infinite dash loops behind the parent's
`.reveal-in` so they start after the draw completes.

### Per-section choreography & lighting map

| Section | Glow field | Entrance |
|---|---|---|
| SignalHero | `--glow-x: 72%; --glow-y: 30%` | decode (existing); ring `scale` 150ms; chips pop 120ms after decode done |
| SignalTicker | none (amber slab) | `mask` wipe, one-time |
| Transmission | `--glow-x: 18%` | path `draw` → dash loop; cells `Stagger step=80` |
| LiveSignal | bottom-center lamp | plate `scale` |
| CapabilitiesBento | none (cell washes instead) | cells `Stagger step=60 variant=scale` |
| InfraShift | none (MORSE column is the light) | columns `Stagger step=100 variant=slide`; MORSE rows cascade 30ms |
| ProtocolStack | right side | rows `Stagger step=80 variant=slide`; connector `draw` → dash loop |
| AgentConsole | none | copy `rise`; frame `scale` 120ms |
| FailureModes | none | `Stagger step=80` |
| FinalTransmission | aurora (3-layer, bottom) | headline per-line `mask` 120ms apart; CTAs 300ms; chip 420ms |

### Transmission Ring (hero right column)

≈560×560, `aspect-ratio: 1` (zero CLS), `aria-hidden` + preceding `sr-only`
description. One SVG: three concentric arcs r≈150/210/270, hairline stroke,
`stroke-dasharray` derived from `toMorse('MORSE')` (dot→4px, dash→14px) — the
arcs spell MORSE; outer arc 270° sweep. Two travelling amber dots riding
rotating full-size wrappers (percentage-positioned at the ring tangent —
scales with the box, transform-only, universal support; 14s/22s, opposite);
off-viewport/reduced fallback: static lit dots; `will-change: transform` on
the two spinning wrappers only.
Center beacon: 96px `--r-plate` plate, `.border-glow`, morse "M" glyphs +
MORSE Unbounded 700; pulse = gradient-halo element, opacity .5→1 +
scale .96→1.04, 4s alternate. Orbit chips `SUI`/`WALRUS`/`SEAL` at fixed
angles: 40px inline-SVG icon tile + mono label, `--glass`, `--r-chip`,
`.border-glow-soft`, `--shadow-plate`; float ±4px 7s alternate phase-staggered.
Horizon dome below: 1px SVG ellipse arc + `--signal-wash` radial field.
Three static 1px vertical light streaks. <1024px: ring stacks under copy
(max 420px). <640px: chips become a static flex row, travellers off.

### Performance guardrails (binding)

- All glow = gradient paint. `filter: blur()` banned. `backdrop-filter`
  budget: 1 (SiteNav).
- Infinite loops: transform/opacity only. `will-change` only on persistently
  animating nodes. Ring + LivingDiff pause off-viewport via IO.
- ≤ 6 concurrent infinite animations in hero viewport, ≤ 2 elsewhere.
- Animated shadows banned. `clip-path` reveals one-time only.
- Layout stability: ring reserves space via `aspect-ratio`; CLS = 0.
- Budget gate: 4×-CPU-throttled scroll ≥ 55fps median; ≤ 14 composited layers.

### Reduced-motion fallback table

Ring travellers/float/pulse → static lit final state. Arc/chip entrances →
rendered complete. Reveal variants → existing static pattern. Aurora → static
gradient field. Draw-gated loops → line fully drawn, no dash flow.
