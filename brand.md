# Brand — Morse Protocol

_Status: active_
_Direction: Bone & Ultramarine (October 2026 redesign; replaces Signal Brutalist)_

## Mark

One SVG path on a 100-unit viewBox, stroke 16, round caps and joins:

```
M8 72 V30 H36 V72 H64 V30 H92 V72
```

Two square humps: the morse pulse, closed into a letterform. It is drawn in
`currentColor` by `src/ui/MorseMark.tsx` and exported as `MARK_PATH` from
`src/lib/pulse.ts`. The favicon (`public/favicon.svg`) is the mark in bone on
an ink rounded square.

The **pulse** is the same shape laid on a wire (`pulsePath()` in
`src/lib/pulse.ts`). It is the page's only motif: the hero signal field, the
How-it-works wire, the use-case illustrations and the closing band all use it.

## Colour

Tokens live on `:root` in `src/index.css`. Change the brand there and
nowhere else; SVG illustrations read the same tokens through CSS classes.

| Token | Value | Role |
|---|---|---|
| `--bone` | `#F2EFE8` | Page ground; text on ink |
| `--paper` | `#FFFFFF` | Cards and plates on bone |
| `--ink` | `#121418` | Dark sections; primary text on bone |
| `--ultra` | `#2B3BE0` | The accent on bone; the closing band |
| `--ultra-lift` | `#7D8BFF` | The accent on ink |
| `--stone` | `#5F6168` | Captions and labels on bone |
| `--ink-soft` | `#45474E` | Body copy on bone |
| `--line` | `#DAD6CC` | Rules and card borders on bone |
| `--ink-line` | `#2A2C33` | Rules on ink |
| `--ink-grid` | `#23262E` | Hero signal-field grid |
| `--on-ink-2…4` | `#C9CBD2` / `#A3A5AE` / `#80828B` | Secondary text on ink, descending |

`--on-ink-4` is the floor for text on ink (4.8:1). The handover's `#7A7C85`
measured 4.4:1 and failed AA for the 11–12px labels it carries.

## Type

- **Display:** Bricolage Grotesque 800 for headlines (700 for card, step and
  roadmap titles). Tight tracking, `-0.03em` to `-0.045em`.
- **Body:** Instrument Sans 400–600.
- **Mono:** IBM Plex Mono 400/500 for code, hashes, dates and eyebrow labels.

Single Google Fonts request in `index.html`.

## Layout

- Grounds alternate: ink hero, bone, ink (How it works), bone (Developers,
  See it live), ink (Roadmap), ultramarine band, ink footer.
- Container 1200px, gutter 32px (20px under 860px). One breakpoint: 860px.
- Cards radius 22px; buttons and nav are pills.

## Motion

- All ambient motion is SVG SMIL: no animation library and no JS timers.
  Every animated SVG goes through `useSmilPlayback`, which pauses it
  off-screen and holds it on its opening frame under `prefers-reduced-motion`
  (SMIL ignores CSS `animation` rules, so CSS alone cannot stop it).
- Hero copy rises in sequence on load (CSS, motion-safe only).
- Hover: buttons lift 1px, cards 3px with a soft shadow, on hover-capable
  devices only.

## Voice

Plain, specific, declarative, sentence case. Every product claim must match
the `arcadiasystems/morse-dcms` repository: real package names
(`@arcadiasystems/morse-sdk`, `@arcadiasystems/morse-cli`), real commands,
real feature status. Roadmap statuses: LIVE, BUILDING, PLANNED, PROPOSED.

## Rules

- Partner marks are official artwork only, kept in
  `src/ui/PartnerLogos.tsx` and recoloured only through `currentColor`.
  Walrus, Sui and Seal come from the SVGs on walrus.xyz; the Mysten Labs
  lockup is the logomark and wordmark from mystenlabs.com, spaced as in
  that site's header.
- Network status reads "Live on Walrus Mainnet", in the hero badge and the
  roadmap.
- No live counters (entries, publications, revisions) until they are read
  from chain. Never placeholders, fake stats or fake logos.
- Keep "storage is funded per epoch and renewable" visible near any
  permanence claim.
