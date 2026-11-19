# Brand — Morse Protocol

_Status: active_
_Direction: Bone & Ultramarine (October 2026 redesign; site v3 "one kit, two products", November 2026)_

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
`src/lib/pulse.ts`). It is the page's motif: the hero signal field, the
How-it-works wire, the plug on the Morse Agents card, the closing band and
the link-preview card all use it. The word MORSE in dot-dash
(`MORSE_WORDMARK`) is its typographic echo, used in the footer and on the
Morse Uploader card.

**Morse glyphs** are the icon system: rows of dots and dashes in
`currentColor`, rendered by `src/ui/Morse.tsx` from the text they key out, so
they are always real Morse. KIT sits under the headline and in the manifest
header, each kit job carries its initial, and each numbered section eyebrow
carries its number. They are decorative and `aria-hidden`.

**Product lockups** stack "morse" over the product word
(`src/ui/Lockup.tsx`). A product's lockup carries its own colour wherever it
appears, so Morse Receipts, Morse Agents, Morse Press, Morse Uploader, Morse
Agent Publisher and Morse Site Importer each show their icon tile, the mark
on the product's own field exactly as in its favicon
(`src/ui/ProductTiles.tsx`): paper `#F6F2E7` on `#09090A`, lime `#C6F135` on
`#080A07`, the Trace over the vermilion `#FF5A36` press bed on `#0A0807`, the
white Trace on Ultramarine, the Trace over a Process Magenta `#FF3EA5` dot
and dash on `#0A070A`, and the Trace over three Marker Yellow `#FFE62E`
segments on `#0A0A06`. On ink the product word is in the product's colour
(`--agents`, `--ultra-lift`). On paper, where paper, lime, vermilion,
magenta (3.2:1) and yellow (1.3:1) miss 4.5:1, the colour stays in the tile
and the word takes a tone that passes: `--receipts-word` (6.4:1);
`--press-word`, vermilion deepened (4.8:1); `--publisher-word` `#C73081`,
magenta deepened by the same factor (5.0:1); and `--importer-word`
`#615F54`, Site Importer's caption tone `#999684` deepened for paper (6.4:1).

A filled accent pill means LIVE on the Roadmap; every other status there is
an outline. Elsewhere a chip says what is true: green for live, an
ultramarine tint for dated and next, a dashed outline for not live.

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
| `--struck` | `#6F6B62` | Struck-through display text on bone (4.6:1) |
| `--line` | `#DAD6CC` | Rules and card borders on bone |
| `--line-2` | `#BDB8AC` | Dashed and outlined borders on bone |
| `--ultra-tint` | `#EEF0FF` | Ground for ultramarine labels on paper |
| `--ink-2` | `#1B1D24` | Raised plates on ink |
| `--ink-line` | `#2A2C33` | Rules on ink |
| `--ink-grid` | `#23262E` | Hero signal-field grid |
| `--on-ink-2…4` | `#C9CBD2` / `#A3A5AE` / `#8E909A` | Secondary text on ink, descending |
| `--code` | `#E9E7E0` | Code on ink |
| `--ok`, `--ok-bg`, `--ok-line` | `#0F7A5C` / `#EAF6F0` / `#A9DCC5` | Live status on bone |
| `--ok-lift` | `#6FD3A6` | Live status on ink |
| `--warn`, `--warn-bg`, `--warn-line` | `#8A5A00` / `#FFF6E0` / `#F0D48A` | Caution status; used by the product pages |

`--on-ink-4` is the floor for text on ink (5.8:1). Nothing on the page is set
under 11px.

## Type

- **Display:** Bricolage Grotesque 800 for headlines (700 for card, step and
  roadmap titles). Tight tracking, `-0.03em` to `-0.045em`.
- **Body:** Instrument Sans 400–600.
- **Mono:** IBM Plex Mono 400/500 for code, hashes, dates and eyebrow labels.

Single Google Fonts request in `index.html`.

## Layout

- Grounds alternate: ink hero, bone (statement, kit), ink (How it works),
  bone (built on the kit), ink (Roadmap), ultramarine band, ink footer.
- Container 1200px, gutter 32px (20px under 860px). One breakpoint, 860px,
  with one exception: the hero stacks at 1000px.
- Cards radius 22px; buttons and nav are pills.

## Motion

- No animation library and no JS timers. The travelling pulses are SVG SMIL:
  every animated SVG goes through `useSmilPlayback`, which pauses it
  off-screen and holds it on its opening frame under `prefers-reduced-motion`
  (SMIL ignores CSS `animation` rules, so CSS alone cannot stop it).
- The hero devices are CSS animations, all inside
  `prefers-reduced-motion: no-preference`: copy rises in sequence, KIT keys
  in, the signal board lights one row at a time on a 5 second loop, and the
  status label pings, scrolls its tape and sends a light round its frame.
  The switchboard sends a pulse down each cord.
- Hover: buttons lift 1px, cards 3px with a soft shadow, on hover-capable
  devices only.

## Voice

Plain, specific, declarative, sentence case. Every product claim must match
the `arcadiasystems/morse-dcms` repository: real package names
(`@arcadiasystems/morse-sdk`, `@arcadiasystems/morse-cli`,
`@arcadiasystems/morse-uploader`), real commands, real feature status.
Roadmap statuses: LIVE, BUILDING, PLANNED, PROPOSED.

Copy rules for every string:

- Not used anywhere: "one click", "plug and play", "immutable", "cannot be
  taken down", and the old line "Content no one can take down. Not even us."
- No em dashes.
- The network is "Walrus Mainnet", never "Sui mainnet".
- Nothing labelled Next, Planned, In design, Proposed or Concept is described
  as live.
- Morse's own fee is "$0 today". Keep the word "today" until a fee exists.

## Rules

- Partner marks are official artwork only, kept in
  `src/ui/PartnerLogos.tsx` and recoloured only through `currentColor`.
  Walrus, Sui and Seal come from the SVGs on walrus.xyz; the Mysten Labs
  lockup is the logomark and wordmark from mystenlabs.com, spaced as in
  that site's header. They appear only in the supporters shelf.
- Network status reads LIVE, WALRUS MAINNET in the hero status label and
  "Protocol live on Walrus Mainnet" in the roadmap.
- No live counters (entries, publications, revisions) until they are read
  from chain. Never placeholders, fake stats or fake logos.
- Keep "storage is funded per epoch and renewable" visible near any
  permanence claim.
