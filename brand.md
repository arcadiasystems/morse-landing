# Brand — Morse Protocol

_Status: active_
_Direction: Signal Brutalist v2 ("Carrier Wave") — brutalist skeleton, lit atmosphere_

## Concept

Morse code is the brand, taken literally and industrially: the protocol as a
transmission system. Dots and dashes are a complete visual grammar — dividers,
texture, motion rhythm. Telegraph heritage (amber dial light on black iron)
reframes "content on chain" as "content, transmitted forever". This identity is
non-derivative: no competitor named anything else can use it.

## Palette (single owned color)

All variation comes from opacity and glow of ONE accent. Never introduce new hues.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0A0A0A` | Page background. True near-black, no blue cast. |
| `--ink-raised` | `#121210` | Raised surfaces (cards, terminal chrome). |
| `--ink-plate` | `#141412` | Code plates. |
| `--paper` | `#F2F2EF` | Primary text. Warm white. |
| `--paper-dim` | `#9A9A90` | Secondary text (AA on ink). |
| `--paper-faint` | `#55554E` | Tertiary/disabled text, ghost numerals. |
| `--signal` | `#FFB000` | THE accent. Radio-dial amber. CTAs, eyebrows, live states, carrier wave. |
| `--signal-glow` | `rgba(255,176,0,0.25)` | Glow shadows only. |
| `--signal-wash` | `rgba(255,176,0,0.14)` | Glow fields, frame washes, aurora core. |
| `--signal-faint` | `rgba(255,176,0,0.07)` | Faint glow fields, cell washes, icon tiles. |
| `--verified` | `#4ADE80` | ONLY for on-chain verified/live status dots and hash strings. |
| `--verified-faint` | `rgba(74,222,128,0.07)` | Wash on verification-themed surfaces only. |
| `--paper-wash` | `rgba(242,242,239,0.05)` | Neutral surface wash. |
| `--glass` | `rgba(18,18,16,0.66)` | Fake-glass chip surfaces (no backdrop-filter). |
| `--hairline` | `rgba(242,242,239,0.10)` | All rules and borders. |
| `--border-glow(-soft)` | gradient | Gradient hairline borders on lit plates/chips. |

Amber slab sections (marquee, stamps) invert: `--ink` text on `--signal` background.

## Typography

Single Google Fonts request. Display blocks, body swaps.

- **Display:** Unbounded 500/700/900 — wide geometric caps, web3 provenance
  (funded on-chain by Polkadot treasury). H1 `clamp(3rem, 8.5vw, 8rem)`,
  tracking `-0.04em`, line-height `0.95`, always uppercase.
- **Body/UI:** Space Grotesk 400/500/700 — 16–18px, line-height 1.6.
- **Mono:** Space Mono 400/700 — all hashes, object IDs, code, tags, tickers,
  eyebrows. 12–14px. Hash strings tinted `--verified`.
- CTA labels: Unbounded 500, 13–15px, uppercase, `+0.08em` tracking.

## Voice

Terse, declarative, transmission-style. All-caps headlines read like telegrams:
"CONTENT, TRANSMITTED FOREVER." / "WRITE ONCE. VERIFY ALWAYS." No adjective
stacks, no "revolutionary", no "next-generation". Every claim concrete and
verifiable. CTAs: "Start building" (primary), "Read the protocol" (secondary) —
never "Get started".

## Depth & lighting (v2)

Light is the carrier signal. The page reads as a sequence of lit scenes —
brutalist iron under amber dial light — never as flat plates.

- **Glow fields.** A section may carry ONE static radial amber glow field
  (`--signal-faint`/`--signal-wash`, alpha ≤ 0.14), positioned per section via
  `--glow-x/y` so each scene has its own light source. Glow is gradient paint.
  `filter: blur()` is banned page-wide.
- **Accent temperature, not new hues.** Variation comes from amber at three
  intensities (`--signal-faint` 0.07 / `--signal-wash` 0.14 / `--signal-glow`
  0.25), plus two sanctioned shifts: `--verified-faint` ONLY on
  verification-themed surfaces, `--paper-wash` as a neutral. Never a new hue.
- **Radius.** Structural grids, ledgers, and bento skeletons stay radius 0.
  Raised "framed plates" (product frames, beacon, floating chips) may use
  `--r-plate: 12px` / `--r-chip: 8px`. The square-grid-vs-soft-plate contrast
  IS the hybrid signature.
- **Shadows.** `--shadow-plate` on framed plates, `--shadow-glow` on lit
  elements. Animated shadows are banned — a pulse is a pre-rendered gradient
  halo element animating opacity/scale.
- **Glass.** Fake glass only: `--glass` rgba surface + gradient hairline border
  (`--border-glow`). `backdrop-filter` budget: exactly one, on the fixed nav.

## Texture & motion signature

- Film grain: SVG feTurbulence data-URI overlay, opacity ~0.08, soft-light.
- Morse-encoded dot-dash dividers and patterns (real encodings, e.g.
  MORSE = `-- --- ·-· ··· ·`).
- **Choreography system (v2):** entrances use Reveal variants
  (`rise / fade / scale / slide / mask / draw`) with staggered delays per
  section. `mask` (clip-path) is one-time, headlines and slabs only.
  Micro-interactions stay 100–150ms.
- **Ambient (infinite) motion is allowed in exactly TWO zones:** the hero
  Transmission Ring and the FinalTransmission aurora. Budget: ≤ 6 concurrent
  infinite animations in the hero viewport, ≤ 2 elsewhere; transform/opacity
  only; loops pause off-viewport.
- Marquees pause on hover; `prefers-reduced-motion` gets static final-state
  layouts (lit, complete, motionless).

## Anti-patterns (hard bans)

Indigo/violet gradients. Multi-hue palettes. Generic node-network hero art —
connected-dots globes, particle meshes, abstract "blockchain" decoration. (The
Transmission Ring is NOT this: a radial telegraph-dial diagram of the real
stack — Sui contracts, Walrus storage, Seal encryption — whose arcs carry real
morse dash rhythm. Named parts only; never decorative dots.) Glowing-coin
3D renders. "Get started" CTAs. Fake stats, fake logos, fake star counts. Emoji
icons. Uniform 3-col icon-card grids as first section. `transition: all`.
Pure `#000` backgrounds. `filter: blur()` anywhere; `backdrop-filter` beyond
the nav.
