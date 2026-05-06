import { useEffect } from 'react'

const DOCS = 'https://morse-docs.vercel.app'

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

/* ── Deep-dive block (text + visual) ────────────────────── */
.morse-features__block {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 80px;
  align-items: center;
}

.morse-features__block + .morse-features__block,
.morse-features__capabilities {
  margin-top: 96px;
}

.morse-features__block--reverse { direction: rtl; }
.morse-features__block--reverse > * { direction: ltr; }

.morse-features__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.morse-features__h2 {
  font-size: clamp(26px, 3.5vw, 38px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #f0f2f8;
  line-height: 1.18;
  margin-bottom: 16px;
}

.morse-features__body {
  font-size: 16px;
  color: rgba(200, 215, 235, 0.55);
  line-height: 1.75;
  margin-bottom: 28px;
}

.morse-features__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #7f86f1;
  transition: gap 0.15s ease, color 0.15s ease;
}
.morse-features__cta:hover {
  gap: 12px;
  color: #b664ff;
}

.morse-features__visual { width: 100%; }

/* ── Code card (Deploy visual) ──────────────────────────── */
.morse-features__codeCard {
  background: #05080f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
}

.morse-features__codeBar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 13px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}

.morse-features__macDot { width: 10px; height: 10px; border-radius: 50%; opacity: 0.5; }
.morse-features__macDot--red { background: #df2f08; }
.morse-features__macDot--yel { background: #fda110; }
.morse-features__macDot--grn { background: #03a963; }

.morse-features__codeFile {
  font-family: 'Noto Sans Mono', ui-monospace, monospace;
  font-size: 12px;
  color: rgba(200, 215, 235, 0.5);
  margin-left: auto;
}

.morse-features__codePre {
  font-family: 'Noto Sans Mono', ui-monospace, monospace;
  font-size: 13px;
  line-height: 1.8;
  padding: 22px 24px 26px;
  overflow-x: auto;
  color: rgb(127, 134, 241);
  margin: 0;
}

.morse-features__kw  { color: #ff6bff; }
.morse-features__fn  { color: #dbff4b; }
.morse-features__str { color: #f9a8d4; }
.morse-features__acc { color: #dbff4b; }
.morse-features__cmt { color: rgb(124, 143, 177); font-style: italic; }

/* ── Revision card (Revisions visual) ───────────────────── */
.morse-features__revCard {
  background: #0c0f1e;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

.morse-features__revHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}

.morse-features__revTitle {
  font-family: 'Noto Sans Mono', ui-monospace, monospace;
  font-size: 13px;
  color: rgba(200, 215, 235, 0.85);
  font-weight: 500;
}

.morse-features__revCount {
  font-size: 12px;
  color: rgba(200, 215, 235, 0.45);
}

.morse-features__revList {
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
}

.morse-features__revItem {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 10px 0;
}

.morse-features__revLine {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.morse-features__revDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(200, 215, 235, 0.15);
  border: 2px solid #0c0f1e;
  flex-shrink: 0;
}
.morse-features__revDot--active {
  background: #444ce7;
  box-shadow: 0 0 0 3px rgba(68, 76, 231, 0.2);
}

.morse-features__revConnector {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.07);
  margin-top: 2px;
}

.morse-features__revInfo {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.morse-features__revHash {
  font-family: 'Noto Sans Mono', ui-monospace, monospace;
  font-size: 13px;
  color: rgba(200, 215, 235, 0.45);
}
.morse-features__revItem--active .morse-features__revHash { color: #f0f2f8; }

.morse-features__revBadge {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(68, 76, 231, 0.12);
  color: #7f86f1;
  border: 1px solid rgba(68, 76, 231, 0.25);
}
.morse-features__revBadge--draft {
  background: rgba(245, 166, 35, 0.10);
  color: #f5a623;
  border-color: rgba(245, 166, 35, 0.25);
}

.morse-features__revTime {
  font-size: 12px;
  color: rgba(200, 215, 235, 0.30);
  margin-left: auto;
}

/* ── Capabilities header ────────────────────────────────── */
.morse-features__capHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 48px;
  margin-bottom: 56px;
  flex-wrap: wrap;
}

.morse-features__capLeft {
  max-width: 460px;
  flex: 1 1 460px;
}

.morse-features__capRight {
  max-width: 360px;
  text-align: right;
  flex: 0 1 360px;
}

/* ── Capabilities grid (gap-as-border) ──────────────────── */
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
.morse-features__card:hover { background: #0c0f1e; }

.morse-features__card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0, rgba(68, 76, 231, 0.07), transparent 60%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.morse-features__card:hover::after { opacity: 1; }

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
  .morse-features__block {
    grid-template-columns: 1fr;
    gap: 48px;
    direction: ltr;
  }
  .morse-features__capHeader {
    flex-direction: column;
    align-items: flex-start;
  }
  .morse-features__capRight { text-align: left; max-width: 460px; }
  .morse-features__grid { grid-template-columns: repeat(2, 1fr); }
  .morse-features__block + .morse-features__block,
  .morse-features__capabilities { margin-top: 72px; }
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

// ── Deploy code visual ─────────────────────────────────────
function DeployVisual() {
  const c = 'morse-features__'
  return (
    <div className={`${c}codeCard`}>
      <div className={`${c}codeBar`}>
        <span className={`${c}macDot ${c}macDot--red`} />
        <span className={`${c}macDot ${c}macDot--yel`} />
        <span className={`${c}macDot ${c}macDot--grn`} />
        <span className={`${c}codeFile`}>deploy.ts</span>
      </div>
      <pre className={`${c}codePre`}>
        <code>
          <span className={`${c}kw`}>const</span>{' pub = '}
          <span className={`${c}kw`}>await</span>{' client\n  .'}
          <span className={`${c}fn`}>createPublication</span>{'({\n    slug: '}
          <span className={`${c}str`}>'my-blog'</span>{',\n    policy: '}
          <span className={`${c}str`}>'public'</span>{',\n  })\n\n'}
          <span className={`${c}cmt`}>{'// publish to Walrus\n'}</span>
          <span className={`${c}kw`}>await</span>{' pub.'}
          <span className={`${c}fn`}>publish</span>{'({ entry })\n\n'}
          <span className={`${c}cmt`}>{'// → stored on-chain + Walrus\n'}</span>
          <span className={`${c}kw`}>console</span>{'.'}
          <span className={`${c}fn`}>log</span>{'(pub.'}
          <span className={`${c}acc`}>txHash</span>{') '}
          <span className={`${c}cmt`}>{'// verifiable'}</span>
        </code>
      </pre>
    </div>
  )
}

// ── Revisions visual ───────────────────────────────────────
function RevisionsVisual() {
  const c = 'morse-features__'
  const revisions = [
    { hash: 'rev_7f3a', label: 'Published', time: '2 min ago',  active: true,  draft: false },
    { hash: 'rev_4b2c', label: 'Draft',     time: '18 min ago', active: false, draft: true  },
    { hash: 'rev_1e9d', label: 'Published', time: '2h ago',     active: false, draft: false },
    { hash: 'rev_0c8f', label: 'Published', time: '1d ago',     active: false, draft: false },
  ]
  return (
    <div className={`${c}revCard`}>
      <div className={`${c}revHeader`}>
        <span className={`${c}revTitle`}>posts/hello-world</span>
        <span className={`${c}revCount`}>4 revisions</span>
      </div>
      <div className={`${c}revList`}>
        {revisions.map((r, i) => (
          <div
            key={r.hash}
            className={`${c}revItem ${r.active ? `${c}revItem--active` : ''}`}
          >
            <div className={`${c}revLine`}>
              <div className={`${c}revDot ${r.active ? `${c}revDot--active` : ''}`} />
              {i < revisions.length - 1 && <div className={`${c}revConnector`} />}
            </div>
            <div className={`${c}revInfo`}>
              <span className={`${c}revHash`}>{r.hash}</span>
              <span className={`${c}revBadge ${r.draft ? `${c}revBadge--draft` : ''}`}>
                {r.label}
              </span>
            </div>
            <span className={`${c}revTime`}>{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Capability icons ───────────────────────────────────────
const Lock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const Chip = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="2" x2="9" y2="6" /><line x1="15" y1="2" x2="15" y2="6" />
    <line x1="9" y1="18" x2="9" y2="22" /><line x1="15" y1="18" x2="15" y2="22" />
    <line x1="18" y1="9" x2="22" y2="9" /><line x1="18" y1="15" x2="22" y2="15" />
    <line x1="2" y1="9" x2="6" y2="9" /><line x1="2" y1="15" x2="6" y2="15" />
  </svg>
)
const Chain = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)
const Term = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)
const Verify = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
    <polyline points="8 11 10.5 13.5 14 9.5" />
  </svg>
)
const Globe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
  </svg>
)

const FEATURES = [
  { icon: Lock,   title: 'Immutable by default', desc: 'Every revision stored permanently on Walrus. Nothing disappears.' },
  { icon: Chip,   title: 'AI-readable',          desc: 'Structured content any LLM can query via open REST API.' },
  { icon: Chain,  title: 'On-chain governance',  desc: 'Version history and access control recorded on Sui.' },
  { icon: Term,   title: 'One-command deploy',   desc: 'morse publish ./content — that\'s it. No config files.' },
  { icon: Verify, title: 'Verifiable revisions', desc: 'Every edit has an on-chain proof. No hidden changes.' },
  { icon: Globe,  title: 'Open protocol',        desc: 'No vendor lock-in. Self-host or use the network.' },
]

const ARROW = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export function Features() {
  useEffect(() => { injectStyles() }, [])

  return (
    <section className="morse-features">
      <div className="dot-grid dot-grid-fade" aria-hidden="true" />

      <div className="morse-features__inner">
        {/* Block 1 — Deploy */}
        <div className="morse-features__block">
          <div className="morse-features__text">
            <span className="eyebrow">Deploy with confidence</span>
            <h2 className="morse-features__h2">Ship content that lives forever.</h2>
            <p className="morse-features__body">
              Every publication, collection, and entry is anchored on Sui.
              Payloads are stored in Walrus — content-addressed and redundant.
              No database to migrate, no backups to manage.
            </p>
            <a href={`${DOCS}/quick-start.html`} className="morse-features__cta">
              Quick Start {ARROW}
            </a>
          </div>
          <div className="morse-features__visual">
            <DeployVisual />
          </div>
        </div>

        {/* Block 2 — Revisions (reverse layout) */}
        <div className="morse-features__block morse-features__block--reverse">
          <div className="morse-features__text">
            <span className="eyebrow">Verifiable revisions</span>
            <h2 className="morse-features__h2">An audit trail baked into the protocol.</h2>
            <p className="morse-features__body">
              Every content update creates a new on-chain revision. Draft and
              public heads enable real editorial workflows. Nothing is ever
              deleted — only appended.
            </p>
            <a href={`${DOCS}/entries.html`} className="morse-features__cta">
              Read About Entries {ARROW}
            </a>
          </div>
          <div className="morse-features__visual">
            <RevisionsVisual />
          </div>
        </div>

        {/* Block 3 — Capabilities grid */}
        <div className="morse-features__capabilities">
          <div className="morse-features__capHeader">
            <div className="morse-features__capLeft">
              <span className="eyebrow">Capabilities</span>
              <h2 className="section-h2">
                Built for permanence,<br />not platforms.
              </h2>
            </div>
            <p className="section-lead morse-features__capRight">
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
      </div>
    </section>
  )
}
