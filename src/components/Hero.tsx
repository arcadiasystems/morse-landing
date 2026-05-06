import styles from './Hero.module.css'

const DOCS = 'https://morse-docs.vercel.app'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Built on Sui and Walrus
        </div>

        <h1 className={styles.h1}>
          Content infrastructure<br />you actually <span className={styles.accent}>own</span>
        </h1>

        <p className={styles.sub}>
          Morse is a <strong>decentralized headless CMS protocol</strong> where publication identity,
          write permissions, and revision history live in Move smart contracts. No vendor controls your backend.
        </p>

        <div className={styles.actions}>
          <a href={`${DOCS}/quick-start.html`} className={styles.btnPrimary}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
            </svg>
            Quick Start
          </a>
          <a href={`${DOCS}/index.html`} className={styles.btnOutline}>
            Read the Docs
          </a>
        </div>

        <div className={styles.stack}>
          <div className={styles.stackItem}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Move Smart Contracts
          </div>
          <div className={styles.stackSep} />
          <div className={styles.stackItem}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <ellipse cx="12" cy="12" rx="10" ry="4"/>
              <path d="M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4"/>
              <path d="M2 12v6c0 2.21 4.48 4 10 4s10-1.79 10-4v-6"/>
            </svg>
            Walrus Decentralized Storage
          </div>
          <div className={styles.stackSep} />
          <div className={styles.stackItem}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Seal Encryption
          </div>
        </div>
      </div>
    </section>
  )
}
