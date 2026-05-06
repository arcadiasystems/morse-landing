import { useEffect, useMemo, useRef } from 'react'

const STYLE_BASE_ID = 'morse-mesh-base'
const baseCss = `
.morse-mesh {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.morse-mesh__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  -webkit-filter: blur(120px);
  will-change: transform, opacity;
  pointer-events: none;
}
.morse-mesh__grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 36px 36px;
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 75%);
  mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 75%);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .morse-mesh__blob { animation: none !important; }
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

// Mulberry32 — small, fast, deterministic if you pass a seed; here we just use Math.random
function rand(min, max) {
  return min + Math.random() * (max - min)
}
function randInt(min, max) {
  return Math.floor(rand(min, max + 1))
}

// Build a unique @keyframes block for one blob: 4 waypoints of translate + scale.
function buildKeyframes(name) {
  const point = () => ({
    x: rand(-22, 22),
    y: rand(-22, 22),
    s: rand(0.85, 1.25),
    o: rand(0.55, 1),
  })
  const stops = [0, 25, 50, 75, 100].map(point)
  // close the loop
  stops[stops.length - 1] = stops[0]

  const frames = [0, 25, 50, 75, 100]
    .map((pct, i) => {
      const p = stops[i]
      return `  ${pct}% { transform: translate3d(${p.x.toFixed(2)}%, ${p.y.toFixed(2)}%, 0) scale(${p.s.toFixed(3)}); opacity: ${p.o.toFixed(2)}; }`
    })
    .join('\n')

  return `@keyframes ${name} {\n${frames}\n}`
}

// Lay out N blobs roughly across the container — slight jitter from a regular grid
// so they don't clump.
function buildBlobConfig(colors, instanceId) {
  const n = colors.length
  return colors.map((color, i) => {
    const col = i % Math.max(2, Math.ceil(Math.sqrt(n)))
    const totalCols = Math.max(2, Math.ceil(Math.sqrt(n)))
    const totalRows = Math.ceil(n / totalCols)
    const row = Math.floor(i / totalCols)

    const cellW = 100 / totalCols
    const cellH = 100 / totalRows
    const baseLeft = col * cellW + cellW / 2
    const baseTop = row * cellH + cellH / 2

    return {
      color,
      // jittered center position (% of container)
      left: baseLeft + rand(-cellW * 0.4, cellW * 0.4),
      top: baseTop + rand(-cellH * 0.4, cellH * 0.4),
      size: randInt(360, 540), // px
      opacity: rand(0.10, 0.18),
      duration: rand(8, 16), // s
      delay: -rand(0, 16), // negative to desync starts
      direction: Math.random() < 0.5 ? 'normal' : 'reverse',
      animName: `morse-mesh-${instanceId}-${i}`,
    }
  })
}

export default function MeshGradient({
  colors = DEFAULT_COLORS,
  showGrid = true,
  className = '',
  style,
}) {
  const instanceId = useRef(Math.random().toString(36).slice(2, 9)).current
  const blobs = useMemo(() => buildBlobConfig(colors, instanceId), [colors, instanceId])
  const styleElRef = useRef(null)

  useEffect(() => { injectBaseStyles() }, [])

  // Inject per-instance keyframes once per (instanceId + colors) and clean up on unmount
  useEffect(() => {
    const el = document.createElement('style')
    el.dataset.morseMeshInstance = instanceId
    el.textContent = blobs.map((b) => buildKeyframes(b.animName)).join('\n\n')
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
      {blobs.map((b, i) => (
        <span
          key={i}
          className="morse-mesh__blob"
          style={{
            background: b.color,
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `calc(${b.left}% - ${b.size / 2}px)`,
            top: `calc(${b.top}% - ${b.size / 2}px)`,
            opacity: b.opacity,
            animation: `${b.animName} ${b.duration.toFixed(2)}s ${b.direction} ${b.delay.toFixed(2)}s infinite cubic-bezier(0.45, 0, 0.55, 1)`,
          }}
        />
      ))}
      {showGrid && <div className="morse-mesh__grid" />}
    </div>
  )
}
