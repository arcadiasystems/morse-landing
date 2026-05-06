import { useEffect } from 'react'

const STYLE_ID = 'morse-features-styles'

const css = `
.morse-features {
  background: #080b18;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 100px 28px;
  position: relative;
  overflow: hidden;
}

.morse-features__inner {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
}

/* ── Header row ─────────────────────────────────────────── */
.morse-features__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 48px;
  margin-bottom: 56px;
  flex-wrap: wrap;
}

.morse-features__head-left {
  max-width: 460px;
  flex: 1 1 460px;
}

.morse-features__head-right {
  max-width: 360px;
  text-align: right;
  flex: 0 1 360px;
}

/* ── Cards grid (gap-as-border) ─────────────────────────── */
.morse-features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
}

.morse-features__card {
  background: #080b18;
  padding: 32px 28px;
  position: relative;
  transition: background 0.15s ease;
  cursor: default;
}

.morse-features__card:hover {
  background: #0c0f1e;
}

.morse-features__card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0, rgba(68, 76, 231, 0.07), transparent 60%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.morse-features__card:hover::after {
  opacity: 1;
}

/* ── Card content ───────────────────────────────────────── */
.morse-features__icon {
  width: 40px;
  height: 40px;
  background: rgba(68, 76, 231, 0.10);
  border: 1px solid rgba(68, 76, 231, 0.20);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  color: #7f86f1;
  position: relative;
  z-index: 1;
}
.morse-features__icon svg { display: block; }

.morse-features__title {
  font-size: 15px;
  font-weight: 600;
  color: #f0f2f8;
  margin-bottom: 8px;
  letter-spacing: -0.005em;
  position: relative;
  z-index: 1;
}

.morse-features__desc {
  font-size: 14px;
  color: rgba(200, 215, 235, 0.45);
  line-height: 1.65;
  position: relative;
  z-index: 1;
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 900px) {
  .morse-features__header {
    flex-direction: column;
    align-items: flex-start;
  }
  .morse-features__head-right {
    text-align: left;
    max-width: 460px;
  }
  .morse-features__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .morse-features__grid { grid-template-columns: 1fr; }
  .morse-features { padding: 72px 24px; }
}
`

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = css
  document.head.appendChild(s)
}

// ── Icons (18×18 strokes, currentColor) ────────────────────

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const ChipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="2" x2="9" y2="6" />
    <line x1="15" y1="2" x2="15" y2="6" />
    <line x1="9" y1="18" x2="9" y2="22" />
    <line x1="15" y1="18" x2="15" y2="22" />
    <line x1="18" y1="9" x2="22" y2="9" />
    <line x1="18" y1="15" x2="22" y2="15" />
    <line x1="2" y1="9" x2="6" y2="9" />
    <line x1="2" y1="15" x2="6" y2="15" />
  </svg>
)

const ChainIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const TerminalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)

const SearchCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
    <polyline points="8 11 10.5 13.5 14 9.5" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
  </svg>
)

const FEATURES = [
  {
    icon: LockIcon,
    title: 'Immutable by default',
    desc: 'Every revision stored permanently on Walrus. Nothing disappears.',
  },
  {
    icon: ChipIcon,
    title: 'AI-readable',
    desc: 'Structured content any LLM can query via open REST API.',
  },
  {
    icon: ChainIcon,
    title: 'On-chain governance',
    desc: 'Version history and access control recorded on Sui.',
  },
  {
    icon: TerminalIcon,
    title: 'One-command deploy',
    desc: 'morse publish ./content — that\'s it. No config files.',
  },
  {
    icon: SearchCheckIcon,
    title: 'Verifiable revisions',
    desc: 'Every edit has an on-chain proof. No hidden changes.',
  },
  {
    icon: GlobeIcon,
    title: 'Open protocol',
    desc: 'No vendor lock-in. Self-host or use the network.',
  },
]

export function Features() {
  useEffect(() => { injectStyles() }, [])

  return (
    <section className="morse-features">
      <div className="dot-grid dot-grid-fade" aria-hidden="true" />

      <div className="morse-features__inner">
        <div className="morse-features__header">
          <div className="morse-features__head-left">
            <span className="eyebrow">Capabilities</span>
            <h2 className="section-h2">
              Built for permanence,<br />not platforms.
            </h2>
          </div>
          <p className="section-lead morse-features__head-right">
            Six primitives that make decentralized publishing actually work —
            without sacrificing developer ergonomics or AI-native readability.
          </p>
        </div>

        <div className="morse-features__grid">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="morse-features__card">
                <div className="morse-features__icon"><Icon /></div>
                <h3 className="morse-features__title">{f.title}</h3>
                <p className="morse-features__desc">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
