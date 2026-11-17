# Morse Landing

Landing page for **Morse**, the app kit for content on
[Walrus](https://walrus.xyz) and [Sui](https://sui.io): blobs, revisions,
encryption and access behind one SDK, one CLI and a set of contracts.

## Design system

The site follows the **Bone & Ultramarine** direction: bone and ink grounds,
one ultramarine accent, the two-hump pulse mark as the only motif, Bricolage
Grotesque display type, Instrument Sans body, IBM Plex Mono for code and labels.

- [`brand.md`](brand.md) — mark, palette, typography, motion, voice
- [`DESIGN-SPEC.md`](DESIGN-SPEC.md) — section structure, rules, verified facts

Design tokens live in `src/index.css`; every section and device class in the
shared stylesheet `src/site.css`; shared primitives in `src/ui/` (Cta, Chip,
Lockup, Morse, MorseMark, TravellingPulse); helpers in `src/lib/`; section
components in `src/components/`.

## Develop

```sh
npm install
npm run dev      # vite dev server
npm run build    # tsc + production build, prerendered to static HTML
npm run lint     # eslint
```

Stack: Vite + React 19 + TypeScript (strict), plain CSS, zero runtime
dependencies beyond React.
