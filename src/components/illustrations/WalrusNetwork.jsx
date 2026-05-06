import { useEffect, useRef } from 'react'

/**
 * WalrusNetwork — Canvas animation of the Morse protocol network.
 *
 * Typed nodes drift with soft boundary bounce:
 *   publisher (indigo)  →  walrus (mint)
 *                       ←  sui (yellow)  ←  ai (pink)
 *
 * - Connection lines appear when two nodes are within 180px,
 *   opacity fades with distance.
 * - Every 80 frames a publisher emits a packet that travels to a
 *   random walrus node with a glowing trail.
 * - Each node has a radial-gradient glow.
 * - DPR-aware via ResizeObserver.
 */

const NODE_TYPES = {
  publisher: { color: '#444ce7', radius: 5,   glow: 26 },
  walrus:    { color: '#1ff1a5', radius: 4.5, glow: 22 },
  ai:        { color: '#ff6bff', radius: 4,   glow: 20 },
  sui:       { color: '#dbff4b', radius: 4.5, glow: 22 },
}

const NODE_COUNTS = {
  publisher: 2,
  walrus:    6,
  ai:        4,
  sui:       3,
}

const CONNECTION_DIST = 180
const PACKET_SPAWN_FRAMES = 80
const PACKET_SPEED = 0.012   // progress per frame → ~83 frames to traverse
const DRIFT_MAX = 0.22       // px per frame max velocity

function rand(min, max) { return min + Math.random() * (max - min) }

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function spawnNodes(width, height) {
  const nodes = []
  for (const [type, count] of Object.entries(NODE_COUNTS)) {
    const cfg = NODE_TYPES[type]
    for (let i = 0; i < count; i++) {
      nodes.push({
        type,
        color: cfg.color,
        rgb: hexToRgb(cfg.color),
        radius: cfg.radius,
        glow: cfg.glow,
        x: rand(cfg.glow, width  - cfg.glow),
        y: rand(cfg.glow, height - cfg.glow),
        vx: rand(-DRIFT_MAX, DRIFT_MAX),
        vy: rand(-DRIFT_MAX, DRIFT_MAX),
      })
    }
  }
  return nodes
}

export default function WalrusNetwork({ className = '', style }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, dpr = 1
    let nodes = []
    const packets = []
    let frame = 0
    let rafId = 0

    function resize() {
      const rect = container.getBoundingClientRect()
      const newW = Math.max(1, rect.width)
      const newH = Math.max(1, rect.height)
      dpr = window.devicePixelRatio || 1

      canvas.width = Math.round(newW * dpr)
      canvas.height = Math.round(newH * dpr)
      canvas.style.width = `${newW}px`
      canvas.style.height = `${newH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (nodes.length === 0) {
        nodes = spawnNodes(newW, newH)
      } else {
        // re-clamp existing positions on resize
        for (const n of nodes) {
          n.x = Math.min(Math.max(n.x, n.glow), newW - n.glow)
          n.y = Math.min(Math.max(n.y, n.glow), newH - n.glow)
        }
      }
      w = newW
      h = newH

      if (reduced) drawFrame() // single static draw
    }

    function drawFrame() {
      ctx.clearRect(0, 0, w, h)

      // ── Connection lines ───────────────────────────────────
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < CONNECTION_DIST) {
            const a = (1 - d / CONNECTION_DIST) * 0.28
            ctx.strokeStyle = `rgba(146, 164, 195, ${a.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // ── Packets (publisher → walrus) ──────────────────────
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i]
        if (pk.progress >= 1) { packets.splice(i, 1); continue }
        const fx = pk.from.x, fy = pk.from.y
        const tx = pk.to.x,   ty = pk.to.y
        const x = fx + (tx - fx) * pk.progress
        const y = fy + (ty - fy) * pk.progress
        const trailP = Math.max(0, pk.progress - 0.10)
        const trailX = fx + (tx - fx) * trailP
        const trailY = fy + (ty - fy) * trailP

        const grad = ctx.createLinearGradient(trailX, trailY, x, y)
        grad.addColorStop(0, `rgba(${pk.rgb.r}, ${pk.rgb.g}, ${pk.rgb.b}, 0)`)
        grad.addColorStop(1, `rgba(${pk.rgb.r}, ${pk.rgb.g}, ${pk.rgb.b}, 0.85)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(trailX, trailY)
        ctx.lineTo(x, y)
        ctx.stroke()

        // bright head dot with a tiny glow
        const headGrad = ctx.createRadialGradient(x, y, 0, x, y, 8)
        headGrad.addColorStop(0, pk.color)
        headGrad.addColorStop(1, `rgba(${pk.rgb.r}, ${pk.rgb.g}, ${pk.rgb.b}, 0)`)
        ctx.fillStyle = headGrad
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = pk.color
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Nodes (glow + core) ───────────────────────────────
      for (const n of nodes) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.glow)
        g.addColorStop(0,    `rgba(${n.rgb.r}, ${n.rgb.g}, ${n.rgb.b}, 0.55)`)
        g.addColorStop(0.45, `rgba(${n.rgb.r}, ${n.rgb.g}, ${n.rgb.b}, 0.18)`)
        g.addColorStop(1,    `rgba(${n.rgb.r}, ${n.rgb.g}, ${n.rgb.b}, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.glow, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = n.color
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fill()

        // tiny white-hot center for crispness
        ctx.fillStyle = `rgba(255, 255, 255, 0.85)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius * 0.35, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function tick() {
      frame++

      // update node positions with soft boundary bounce
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < n.glow)        { n.x = n.glow;        n.vx = Math.abs(n.vx) }
        if (n.x > w - n.glow)    { n.x = w - n.glow;    n.vx = -Math.abs(n.vx) }
        if (n.y < n.glow)        { n.y = n.glow;        n.vy = Math.abs(n.vy) }
        if (n.y > h - n.glow)    { n.y = h - n.glow;    n.vy = -Math.abs(n.vy) }
      }

      // advance packets
      for (const pk of packets) pk.progress += PACKET_SPEED

      // spawn a new packet
      if (frame % PACKET_SPAWN_FRAMES === 0) {
        const pubs   = nodes.filter(n => n.type === 'publisher')
        const targets = nodes.filter(n => n.type === 'walrus')
        if (pubs.length && targets.length) {
          const from = pubs[Math.floor(Math.random() * pubs.length)]
          const to   = targets[Math.floor(Math.random() * targets.length)]
          packets.push({ from, to, progress: 0, color: from.color, rgb: from.rgb })
        }
      }

      drawFrame()
      rafId = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    if (!reduced) {
      rafId = requestAnimationFrame(tick)
    }

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
        aria-hidden="true"
      />
    </div>
  )
}
