import styles from './Features.module.css'

const DOCS = 'https://morse-docs.vercel.app'

function DeployVisual() {
  return (
    <div className={styles.codeCard}>
      <div className={styles.codeBar}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span className={`${styles.dot} ${styles.dotYel}`} />
        <span className={`${styles.dot} ${styles.dotGrn}`} />
        <span className={styles.codeFile}>deploy.ts</span>
      </div>
      <pre className={styles.codePre}><code>
        <span className={styles.kw}>const</span>{' pub = '}<span className={styles.kw}>await</span>{' client\n  .'}
        <span className={styles.fn}>createPublication</span>{'({\n    slug: '}
        <span className={styles.str}>'my-blog'</span>{',\n    policy: '}
        <span className={styles.str}>'public'</span>{',\n  })\n\n'}
        <span className={styles.cmt}>{'// publish to Walrus\n'}</span>
        <span className={styles.kw}>await</span>{' pub.'}
        <span className={styles.fn}>publish</span>{'({ entry })\n\n'}
        <span className={styles.cmt}>{'// → stored on-chain + Walrus\n'}</span>
        <span className={styles.kw}>console</span>{'.'}
        <span className={styles.fn}>log</span>{'(pub.'}
        <span className={styles.acc}>txHash</span>{') '}
        <span className={styles.cmt}>{'// verifiable'}</span>
      </code></pre>
    </div>
  )
}

function GovernanceVisual() {
  const nodes = [
    { label: 'OwnerCap', color: '#444CE7', x: 50, y: 10 },
    { label: 'PublisherCap', color: '#6366f1', x: 10, y: 55 },
    { label: 'Denylist', color: '#3730a3', x: 88, y: 55 },
    { label: 'Publication', color: '#dbff4b', textColor: '#000', x: 50, y: 78 },
  ]
  return (
    <div className={styles.diagCard}>
      <div className={styles.diagLabel}>On-chain permission model</div>
      <svg viewBox="0 0 300 180" className={styles.diagSvg}>
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.2)" />
          </marker>
        </defs>
        {/* Edges */}
        <line x1="150" y1="28" x2="50" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" markerEnd="url(#arr)" />
        <line x1="150" y1="28" x2="250" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" markerEnd="url(#arr)" />
        <line x1="50" y1="108" x2="140" y2="138" stroke="rgba(255,255,255,0.12)" strokeWidth="1" markerEnd="url(#arr)" />
        <line x1="250" y1="108" x2="160" y2="138" stroke="rgba(255,255,255,0.12)" strokeWidth="1" markerEnd="url(#arr)" />
        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.label} transform={`translate(${n.x * 3}, ${n.y * 1.8})`}>
            <rect x="-38" y="-12" width="76" height="24" rx="6" fill={n.color} opacity="0.15" stroke={n.color} strokeOpacity="0.4" strokeWidth="1" />
            <text x="0" y="5" textAnchor="middle" fontSize="10" fill={n.textColor ?? '#d0d8f0'} fontFamily="var(--mono)" fontWeight="500">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function RevisionVisual() {
  const revisions = [
    { hash: 'rev_7f3a', label: 'Published', time: '2 min ago', active: true },
    { hash: 'rev_4b2c', label: 'Draft', time: '18 min ago', active: false },
    { hash: 'rev_1e9d', label: 'Published', time: '2h ago', active: false },
    { hash: 'rev_0c8f', label: 'Published', time: '1d ago', active: false },
  ]
  return (
    <div className={styles.revCard}>
      <div className={styles.revHeader}>
        <span className={styles.revTitle}>posts/hello-world</span>
        <span className={styles.revCount}>4 revisions</span>
      </div>
      <div className={styles.revList}>
        {revisions.map((r, i) => (
          <div key={r.hash} className={`${styles.revItem} ${r.active ? styles.revItemActive : ''}`}>
            <div className={styles.revLine}>
              <div className={`${styles.revDot} ${r.active ? styles.revDotActive : ''}`} />
              {i < revisions.length - 1 && <div className={styles.revConnector} />}
            </div>
            <div className={styles.revInfo}>
              <span className={styles.revHash}>{r.hash}</span>
              <span className={`${styles.revBadge} ${r.label === 'Draft' ? styles.revBadgeDraft : ''}`}>{r.label}</span>
            </div>
            <span className={styles.revTime}>{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const sections = [
  {
    eyebrow: 'Deploy with confidence',
    h2: 'Ship content that lives forever.',
    body: 'Every publication, collection, and entry is anchored on Sui. Payloads are stored in Walrus — content-addressed and redundant. No database to migrate, no backups to manage.',
    cta: { label: 'Quick Start', href: `${DOCS}/quick-start.html` },
    visual: <DeployVisual />,
    reverse: false,
  },
  {
    eyebrow: 'On-chain governance',
    h2: 'Permissions you actually control.',
    body: 'OwnerCap and PublisherCap are Move objects — transferable, revocable, and verifiable on-chain. No admin panel, no support ticket. Access is auditable by anyone.',
    cta: { label: 'How Access Control Works', href: `${DOCS}/access-control.html` },
    visual: <GovernanceVisual />,
    reverse: true,
  },
  {
    eyebrow: 'Verifiable revisions',
    h2: 'An audit trail baked into the protocol.',
    body: 'Every content update creates a new on-chain revision. Draft and public heads enable real editorial workflows. Nothing is ever deleted — only appended.',
    cta: { label: 'Read About Entries', href: `${DOCS}/entries.html` },
    visual: <RevisionVisual />,
    reverse: false,
  },
]

export function Features() {
  return (
    <>
      {sections.map((s) => (
        <section key={s.eyebrow} className={`${styles.section} section-pad section-primary`}>
          <div className={`${styles.inner} ${s.reverse ? styles.reverse : ''}`}>
            <div className={styles.text}>
              <p className={styles.eyebrow}>{s.eyebrow}</p>
              <h2 className={styles.h2}>{s.h2}</h2>
              <p className={styles.body}>{s.body}</p>
              <a href={s.cta.href} className={styles.cta}>
                {s.cta.label}
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
            <div className={styles.visual}>{s.visual}</div>
          </div>
        </section>
      ))}
    </>
  )
}
