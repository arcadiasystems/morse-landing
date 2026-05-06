import styles from './Features.module.css'

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'On-chain Governance',
    desc: 'Publication identity, write permissions, and state transitions are enforced by Move smart contracts. Transparent and auditable by anyone.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
    title: 'Capability-Based Auth',
    desc: 'OwnerCap and PublisherCap separate governance from publishing. Capabilities can be revoked instantly. No passwords, no sessions, no central authority.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Immutable Revisions',
    desc: 'Every content update appends a new revision. Draft and public heads enable editorial workflows without losing history. Nothing is ever deleted.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Flexible Access Policies',
    desc: 'Public, publisher-gated, and subscription policies control payload retrieval via Seal encryption. Gate content at the protocol level, not the API level.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    title: 'Headless by Design',
    desc: 'No prescribed frontend. Integrate via SDK, CLI, or raw contract calls. Serve content through any delivery layer you choose.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Open Protocol',
    desc: 'Anyone can build integrations directly on the contracts. Off-chain services are optional ergonomics, not gatekeepers. The protocol belongs to no one company.',
  },
]

export function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.label}>Features</p>
            <h2 className={styles.h2}>Built for permanence</h2>
          </div>
          <p className={styles.lead}>
            Every design decision in Morse prioritizes long-term ownership over short-term convenience.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <div className={styles.title}>{f.title}</div>
              <div className={styles.desc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
