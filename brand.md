# Brand — Morse Protocol

_Status: active_
_Direction: Signal Brutalist ("Carrier Wave")_

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
| `--verified` | `#4ADE80` | ONLY for on-chain verified/live status dots and hash strings. |
| `--hairline` | `rgba(242,242,239,0.10)` | All rules and borders. |

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

## Texture & motion signature

- Film grain: SVG feTurbulence data-URI overlay, opacity ~0.08, soft-light.
- Morse-encoded dot-dash dividers and patterns (real encodings, e.g.
  MORSE = `-- --- ·-· ··· ·`).
- ONE signature kinetic moment: the hero transmission-decode + carrier-wave
  pulse + living diff. Everything else: a single 600ms ease-out reveal per
  section + 100–150ms micro-interactions. No ambient motion elsewhere.
- Marquees pause on hover; `prefers-reduced-motion` gets static layouts.

## Anti-patterns (hard bans)

Indigo/violet gradients. Multi-hue palettes. Node-network hero art. Glowing-coin
3D renders. "Get started" CTAs. Fake stats, fake logos, fake star counts. Emoji
icons. Uniform 3-col icon-card grids as first section. `transition: all`.
Pure `#000` backgrounds.
