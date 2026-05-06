import { useEffect } from 'react'

const STYLE_ID = 'morse-how-styles'

const css = `
.morse-how {
  background: #05070f;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 100px 28px;
  position: relative;
  overflow: hidden;
}

.morse-how__accent {
  position: absolute;
  left: -200px;
  top: 30%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(68, 76, 231, 0.06);
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.morse-how__inner {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
}

.morse-how__eyebrow {
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #dbff4b;
  margin-bottom: 14px;
  display: block;
}

.morse-how__h2 {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  color: #f0f2f8;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 16px;
}

.morse-how__lead {
  font-size: 17px;
  color: rgba(200, 215, 235, 0.55);
  line-height: 1.65;
  max-width: 500px;
}

/* ── Grid (gap-as-border) ───────────────────────────────── */
.morse-how__grid {
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
}

.morse-how__card {
  background: #05070f;
  padding: 36px 28px;
  position: relative;
  transition: background 0.15s cubic-bezier(.4, 0, .2, 1);
}
.morse-how__card:hover {
  background: #080b18;
}

.morse-how__num {
  position: absolute;
  top: 20px;
  right: 20px;
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgba(68, 76, 231, 0.5);
}

.morse-how__icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(68, 76, 231, 0.10);
  border: 1px solid rgba(68, 76, 231, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: #444ce7;
}
.morse-how__icon svg {
  display: block;
}

.morse-how__title {
  font-size: 16px;
  font-weight: 600;
  color: #f0f2f8;
  margin-bottom: 10px;
  letter-spacing: -0.005em;
}

.morse-how__desc {
  font-size: 14px;
  color: rgba(200, 215, 235, 0.5);
  line-height: 1.7;
}

.morse-how__tag {
  display: inline-block;
  margin-top: 20px;
  padding: 3px 10px;
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  color: rgba(68, 76, 231, 0.7);
  background: rgba(68, 76, 231, 0.08);
  border: 1px solid rgba(68, 76, 231, 0.20);
  border-radius: 4px;
  letter-spacing: 0.01em;
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 1024px) {
  .morse-how__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .morse-how__grid { grid-template-columns: 1fr; }
  .morse-how { padding: 72px 24px; }
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

// ── Icons (20×20, currentColor stroke) ─────────────────────

const PublishIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <polyline points="9 15 12 12 15 15" />
  </svg>
)

const StoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
  </svg>
)

const VerifyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const ServeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
)

const STEPS = [
  {
    num: '01',
    title: 'Publish',
    desc: 'Run a single command to push your markdown, schemas, and metadata into the protocol — no provisioning, no waiting on a vendor.',
    tag: 'morse publish',
    icon: PublishIcon,
  },
  {
    num: '02',
    title: 'Store',
    desc: 'Content payloads land on Walrus as immutable blobs. Revisions append to history; nothing overwrites and nothing disappears.',
    tag: 'walrus.store()',
    icon: StoreIcon,
  },
  {
    num: '03',
    title: 'Verify',
    desc: 'A Sui Move contract records the verifiable blob reference and capability changes. Every permission and every revision is on-chain.',
    tag: 'sui.record()',
    icon: VerifyIcon,
  },
  {
    num: '04',
    title: 'Serve',
    desc: 'Indexers anyone can run watch contract events and serve fast, queryable state — readable by your app or any AI agent.',
    tag: 'morse.network/api',
    icon: ServeIcon,
  },
]

export function HowItWorks() {
  useEffect(() => { injectStyles() }, [])

  return (
    <section className="morse-how">
      <div className="morse-how__accent" aria-hidden="true" />

      <div className="morse-how__inner">
        <header>
          <span className="morse-how__eyebrow">The Protocol</span>
          <h2 className="morse-how__h2">
            From editor to Walrus<br />in four steps.
          </h2>
          <p className="morse-how__lead">
            Each step is independently verifiable, deterministically reproducible,
            and runs on infrastructure anyone can host.
          </p>
        </header>

        <div className="morse-how__grid">
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.num} className="morse-how__card">
                <span className="morse-how__num">{s.num}</span>
                <div className="morse-how__icon"><Icon /></div>
                <h3 className="morse-how__title">{s.title}</h3>
                <p className="morse-how__desc">{s.desc}</p>
                <span className="morse-how__tag">{s.tag}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
