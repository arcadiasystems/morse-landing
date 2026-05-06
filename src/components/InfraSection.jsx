import { useEffect } from 'react'

const STYLE_ID = 'morse-infra-styles'

const css = `
.morse-infra {
  background: #05070f;
  padding: 100px 28px;
  width: 100%;
}
.morse-infra__inner {
  max-width: 1120px;
  margin: 0 auto;
}

.morse-infra__eyebrow {
  font-family: var(--mono);
  color: var(--highlight);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 1.25rem;
}

.morse-infra__h2 {
  font-family: var(--font);
  font-size: 44px;
  line-height: 1.1;
  font-weight: 700;
  color: var(--text-bright);
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  max-width: 820px;
}
.morse-infra__h2 .accent {
  color: var(--highlight);
}

.morse-infra__sub {
  font-size: 1.125rem;
  line-height: 1.65;
  color: var(--text-muted);
  max-width: 720px;
  margin-bottom: 4rem;
}

.morse-infra__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.morse-infra__col {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.morse-infra__col--morse {
  border-color: var(--accent);
  box-shadow: var(--accent-glow);
  background: linear-gradient(180deg, rgba(68, 76, 231, 0.08), var(--bg-card) 60%);
}

.morse-infra__col-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}
.morse-infra__col-title {
  font-family: var(--font);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-bright);
}
.morse-infra__col-tag {
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.morse-infra__col--morse .morse-infra__col-tag {
  color: var(--accent-bright);
}

.morse-infra__row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 0.9375rem;
  color: var(--text);
  line-height: 1.4;
}
.morse-infra__row svg {
  flex-shrink: 0;
}
.morse-infra__row--muted { color: var(--text-muted); }
.morse-infra__row--accent { color: var(--text-bright); }

.morse-infra__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
.morse-infra__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 9999px;
  font-family: var(--mono);
  font-size: 0.8125rem;
  color: var(--text-bright);
  white-space: nowrap;
}
.morse-infra__pill .pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--accent-bright);
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.7);
}

@media (max-width: 900px) {
  .morse-infra__grid { grid-template-columns: 1fr; }
  .morse-infra__h2 { font-size: 34px; }
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

const COLUMNS = [
  {
    title: 'Legacy CMS',
    tag: '2005 →',
    tone: 'muted',
    rows: [
      'Single host, single point of failure',
      'Per-seat licensing & vendor lock',
      'Manual backups, opaque revisions',
      'Plugin-driven security surface',
      'Invisible to AI agents',
    ],
  },
  {
    title: 'Vercel-era',
    tag: '2018 →',
    tone: 'default',
    rows: [
      'Edge-deployed, CDN-backed',
      'API-first, headless content',
      'Centralized vendor still owns data',
      'Mutable history, no proofs',
      'AI-readable via REST, not by default',
    ],
  },
  {
    title: 'Morse',
    tag: 'NOW',
    tone: 'accent',
    rows: [
      'Walrus-permanent, host-independent',
      'Open protocol, no vendor, no lock-in',
      'On-chain governance & verifiable revisions',
      'Move smart contracts as security boundary',
      'AI-native — readable by any agent',
    ],
  },
]

const PILLS = [
  'Deploy in <3s',
  'AI-readable by default',
  'On-chain governance',
  'Walrus-permanent',
]

const MutedDot = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="3" fill="var(--text-subtle)" />
  </svg>
)

const NeutralCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const AccentCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-bright)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function rowIcon(tone) {
  if (tone === 'accent') return <AccentCheck />
  if (tone === 'muted')  return <MutedDot />
  return <NeutralCheck />
}

export default function InfraSection() {
  useEffect(() => { injectStyles() }, [])

  return (
    <section className="morse-infra">
      <div className="morse-infra__inner">
        <div className="morse-infra__eyebrow">The infrastructure layer</div>

        <h2 className="morse-infra__h2">
          The Vercel of Web3. <span className="accent">Built for AI.</span>
        </h2>

        <p className="morse-infra__sub">
          Morse does for decentralized content what Vercel did for deployment —
          makes it invisible, instant, and developer-first. Your content lives
          permanently on Walrus, versioned on-chain, and is natively readable
          by any AI agent.
        </p>

        <div className="morse-infra__grid">
          {COLUMNS.map((col) => {
            const isMorse = col.tone === 'accent'
            return (
              <div
                key={col.title}
                className={`morse-infra__col ${isMorse ? 'morse-infra__col--morse' : ''}`}
              >
                <div className="morse-infra__col-head">
                  <div className="morse-infra__col-title">{col.title}</div>
                  <div className="morse-infra__col-tag">{col.tag}</div>
                </div>
                {col.rows.map((row) => (
                  <div
                    key={row}
                    className={`morse-infra__row ${isMorse ? 'morse-infra__row--accent' : col.tone === 'muted' ? 'morse-infra__row--muted' : ''}`}
                  >
                    {rowIcon(col.tone)}
                    <span>{row}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        <div className="morse-infra__pills">
          {PILLS.map((p) => (
            <span key={p} className="morse-infra__pill">
              <span className="pill-dot" />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
