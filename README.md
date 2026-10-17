# Morse Landing

Landing page for **Morse** — an open, decentralized CMS protocol on
[Sui](https://sui.io) and [Walrus](https://walrus.xyz). Entries anchored
on-chain, payloads on Walrus, every revision verifiable.

## Design system

The site follows the **Bone & Ultramarine** direction: bone and ink grounds,
one ultramarine accent, the two-hump pulse mark as the only motif, Bricolage
Grotesque display type, Instrument Sans body, IBM Plex Mono for code and labels.

- [`brand.md`](brand.md) — mark, palette, typography, motion, voice
- [`DESIGN-SPEC.md`](DESIGN-SPEC.md) — section structure, rules, verified facts

Design tokens live in `src/index.css`; shared primitives in `src/ui/`
(Cta, MorseMark, TravellingPulse); helpers in `src/lib/`; section components
in `src/components/`.

## Develop

```sh
npm install
npm run dev      # vite dev server
npm run build    # tsc + production build, prerendered to static HTML
npm run lint     # eslint
```

Stack: Vite + React 19 + TypeScript (strict), CSS Modules, zero runtime
dependencies beyond React.
