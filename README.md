# Morse Landing

Landing page for **Morse** — an open, decentralized CMS protocol on
[Sui](https://sui.io) and [Walrus](https://walrus.xyz). Entries anchored
on-chain, payloads stored forever, every revision verifiable.

## Design system

The site follows the **Signal Brutalist** direction: morse code as the brand
grammar, a single owned accent (signal amber `#FFB000` on near-black), Unbounded
display type, Space Grotesk body, Space Mono for everything on-chain.

- [`brand.md`](brand.md) — palette, typography, voice, anti-patterns
- [`DESIGN-SPEC.md`](DESIGN-SPEC.md) — binding per-section build spec

Design tokens live in `src/index.css`; shared primitives in `src/ui/`
(Cta, Reveal, Terminal, MorseDivider, MorseGlyphs); section components in
`src/components/`.

## Develop

```sh
npm install
npm run dev      # vite dev server
npm run build    # tsc + production build
npm run lint     # eslint
```

Stack: Vite + React 19 + TypeScript (strict), CSS Modules, zero runtime
dependencies beyond React.
