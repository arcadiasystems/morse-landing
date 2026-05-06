import { LogoIcon } from './LogoIcon'
import styles from './Nav.module.css'

const DOCS = 'https://morse-docs.vercel.app'

const protocolLinks = [
  { label: 'Overview', href: `${DOCS}/index.html` },
  { label: 'How It Works', href: `${DOCS}/core-concepts.html` },
  { label: 'Architecture', href: `${DOCS}/index.html#architecture` },
  { label: 'Access Control', href: `${DOCS}/access-control.html` },
]

export function Nav() {
  return (
    <div className={styles.wrapper}>
      {/* Announcement banner */}
      <div className={styles.banner}>
        <span>
          Morse Protocol v1 is live on Sui Testnet — read the announcement
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginLeft: 6, verticalAlign: 'middle' }}>
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
        <div className={styles.bannerRight}>
          <a href={`${DOCS}/index.html`} className={styles.bannerLink}>Docs</a>
          <a href="https://github.com/TheDivic/morse-dcms" target="_blank" rel="noopener noreferrer" className={styles.bannerLink}>GitHub</a>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <a href="/" className={styles.logo}>
            <LogoIcon />
            <span className={styles.wordmark}>MORSE</span>
          </a>

          <div className={styles.links}>
            {/* Protocol dropdown — CSS-only hover */}
            <div className={styles.dropParent}>
              <button className={styles.dropTrigger}>
                Protocol
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className={styles.dropChevron}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div className={styles.dropdown}>
                <div className={styles.dropdownInner}>
                  {protocolLinks.map((l) => (
                    <a key={l.label} href={l.href} className={styles.dropItem}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href={`${DOCS}/index.html`} className={styles.link}>Docs</a>
            <a href={`${DOCS}/contracts.html`} className={styles.link}>Contracts</a>
            <a
              href="https://github.com/TheDivic/morse-dcms"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className={styles.starBadge}>★ 1.2k</span>
            </a>
          </div>

          <div className={styles.actions}>
            <a href={`${DOCS}/quick-start.html`} className={styles.btnPrimary}>
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
