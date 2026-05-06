import { useEffect, useMemo, useRef } from 'react'

/**
 * MeshGradient — Temporal-grade animated background.
 *
 * - Radial-gradient blobs with mix-blend-mode: screen (additive color mixing)
 * - Tinted base floor (deep indigo) instead of pure black
 * - SVG turbulence grain at very low opacity for filmic texture
 * - Soft vignette so foreground text retains contrast
 * - Per-blob unique keyframes with slow, organic drift (18–32s)
 * - Curated default positions for the 5 brand colors; falls back to a
 *   jittered grid for arbitrary palette sizes.
 */

const STYLE_BASE_ID = 'morse-mesh-base'

// Tiny SVG turbulence baked into a data URI — browser-native film grain.
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
const NOISE_URL = `data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG)}`

const baseCss = `
.morse-mesh {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  isolation: isolate;
  background:
    radial-gradient(ellipse 120% 90% at 50% 30%, #0d1330 0%, #07091c 50%, #04050f 100%);
}

.morse-mesh__blobs {
  position: absolute;
  inset: -10%;            /* let blobs bleed past edges */
}

.morse-mesh__blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: screen;
  will-change: transform, opacity;
  /* gradient is applied via inline style per blob */
}

.morse-mesh__aurora {
  position: absolute;
  inset: -20%;
  pointer-events: none;
  background:
    conic-gradient(from 200deg at 50% 60%,
      rgba(68, 76, 231, 0.10) 0deg,
      rgba(182, 100, 255, 0.08) 90deg,
      rgba(31, 241, 165, 0.06) 180deg,
      rgba(255, 107, 255, 0.07) 270deg,
      rgba(68, 76, 231, 0.10) 360deg);
  filter: blur(60px);
  mix-blend-mode: screen;
  opacity: 0.55;
  animation: morse-mesh-aurora 38s linear infinite;
}

.morse-mesh__grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask-image: radial-gradient(ellipse 90% 75% at 50% 45%, black 10%, transparent 80%);
  mask-image: radial-gradient(ellipse 90% 75% at 50% 45%, black 10%, transparent 80%);
  pointer-events: none;
  opacity: 0.6;
}

.morse-mesh__noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("${NOISE_URL}");
  background-size: 200px 200px;
  opacity: 0.07;
  mix-blend-mode: overlay;
}

.morse-mesh__vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 110% 90% at 50% 50%, transparent 35%, rgba(4, 5, 15, 0.55) 80%, rgba(4, 5, 15, 0.85) 100%);
}

@keyframes morse-mesh-aurora {
  0%   { transform: rotate(0deg)   scale(1); }
  50%  { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .morse-mesh__blob,
  .morse-mesh__aurora { animation: none !important; }
}
`

function injectBaseStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_BASE_ID)) return
  const s = document.createElement('style')
  s.id = STYLE_BASE_ID
  s.textContent = baseCss
  document.head.appendChild(s)
}

const DEFAULT_COLORS = ['#444ce7', '#b664ff', '#1ff1a5', '#ff6bff', '#dbff4b']

// Curated layout for the 5-color default palette — covers full canvas with
// strong overlap (ultraviolet anchors top-left, lime balances bottom-right).
const DEFAULT_LAYOUT = [
  { left: 12, top: 18, size: 1000, opacity: 0.85 }, // ultraviolet
  { left: 78, top: 22, size:  900, opacity: 0.70 }, // violet
  { left: 50, top: 78, size:  820, opacity: 0.55 }, // mint
  { left: 22, top: 70, size:  900, opacity: 0.65 }, // pink
  { left: 88, top: 60, size:  720, opacity: 0.55 }, // lime
]

function rand(min, max) { return min + Math.random() * (max - min) }

function buildKeyframes(name) {
  const stops = [0, 25, 50, 75, 100].map((pct, i, arr) => {
    if (i === arr.length - 1) return null // filled below
    return {
      pct,
      x: rand(-15, 15),
      y: rand(-12, 12),
      s: rand(0.9, 1.18),
      o: rand(0.75, 1),
    }
  })
  // close the loop seamlessly
  stops[stops.length - 1] = { ...stops[0], pct: 100 }

  const frames = stops
    .map(p => `  ${p.pct}% { transform: translate3d(${p.x.toFixed(2)}%, ${p.y.toFixed(2)}%, 0) scale(${p.s.toFixed(3)}); opacity: ${p.o.toFixed(2)}; }`)
    .join('\n')

  return `@keyframes ${name} {\n${frames}\n}`
}

function buildBlobConfig(colors, instanceId) {
  return colors.map((color, i) => {
    const layout = DEFAULT_LAYOUT[i] ?? null
    let left, top, size, opacity
    if (layout) {
      left = layout.left + rand(-3, 3)
      top  = layout.top  + rand(-3, 3)
      size = layout.size + rand(-60, 60)
      opacity = layout.opacity
    } else {
      // Fallback: jittered grid for >5 colors
      const cols = Math.max(2, Math.ceil(Math.sqrt(colors.length)))
      const rows = Math.ceil(colors.length / cols)
      const col = i % cols
      const row = Math.floor(i / cols)
      const cw = 100 / cols
      const ch = 100 / rows
      left = col * cw + cw / 2 + rand(-cw * 0.3, cw * 0.3)
      top  = row * ch + ch / 2 + rand(-ch * 0.3, ch * 0.3)
      size = Math.round(rand(700, 1000))
      opacity = rand(0.55, 0.8)
    }

    return {
      color,
      left,
      top,
      size: Math.round(size),
      opacity,
      duration: rand(18, 32),       // slow, aurora-like drift
      delay: -rand(0, 30),          // negative to desync starts
      direction: Math.random() < 0.5 ? 'normal' : 'reverse',
      animName: `morse-mesh-${instanceId}-${i}`,
    }
  })
}

export default function MeshGradient({
  colors = DEFAULT_COLORS,
  showGrid = true,
  showNoise = true,
  showVignette = true,
  showAurora = true,
  className = '',
  style,
}) {
  const instanceId = useRef(Math.random().toString(36).slice(2, 9)).current
  const blobs = useMemo(() => buildBlobConfig(colors, instanceId), [colors, instanceId])
  const styleElRef = useRef(null)

  useEffect(() => { injectBaseStyles() }, [])

  useEffect(() => {
    const el = document.createElement('style')
    el.dataset.morseMeshInstance = instanceId
    el.textContent = blobs.map(b => buildKeyframes(b.animName)).join('\n\n')
    document.head.appendChild(el)
    styleElRef.current = el
    return () => {
      if (styleElRef.current && styleElRef.current.parentNode) {
        styleElRef.current.parentNode.removeChild(styleElRef.current)
      }
    }
  }, [blobs, instanceId])

  return (
    <div className={`morse-mesh ${className}`} style={style} aria-hidden="true">
      {showAurora && <div className="morse-mesh__aurora" />}

      <div className="morse-mesh__blobs">
        {blobs.map((b, i) => (
          <span
            key={i}
            className="morse-mesh__blob"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `calc(${b.left}% - ${b.size / 2}px)`,
              top: `calc(${b.top}% - ${b.size / 2}px)`,
              opacity: b.opacity,
              background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, ${b.color}99 18%, ${b.color}33 38%, transparent 65%)`,
              animation: `${b.animName} ${b.duration.toFixed(2)}s ${b.direction} ${b.delay.toFixed(2)}s infinite cubic-bezier(0.45, 0, 0.55, 1)`,
            }}
          />
        ))}
      </div>

      {showGrid     && <div className="morse-mesh__grid" />}
      {showNoise    && <div className="morse-mesh__noise" />}
      {showVignette && <div className="morse-mesh__vignette" />}
    </div>
  )
}
