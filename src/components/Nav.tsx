import { useEffect, useState } from 'react'
import { LogoIcon } from './LogoIcon'
import Button from './ui/Button'
import styles from './Nav.module.css'

const DOCS = 'https://morse-docs.vercel.app'
const GITHUB = 'https://github.com/TheDivic/morse-dcms'

const protocolLinks = [
  { label: 'Overview', href: `${DOCS}/index.html` },
  { label: 'How It Works', href: `${DOCS}/core-concepts.html` },
  { label: 'Architecture', href: `${DOCS}/index.html#architecture` },
  { label: 'Security', href: `${DOCS}/access-control.html` },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [protocolOpen, setProtocolOpen] = useState(false) // for mobile click-to-open

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // ring-offset-color override so Primary button on transparent nav matches site bg (#05070f)
  // Button uses var(--tw-ring-offset-color, #141414); we set it locally per spec.
  const ringOffsetOverride = { ['--tw-ring-offset-color' as never]: '#05070f' } as React.CSSProperties

  return (
    <div className={styles.wrapper}>
      {/* ── Announcement banner ─────────────────────────── */}
      <div className={styles.banner}>
        <span className={styles.bannerText}>
          Morse Protocol v1 je live — pročitaj announcement →
        </span>
        <div className={styles.bannerRight}>
          <a href={`${DOCS}/index.html`} className={styles.bannerLink}>Docs</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={styles.bannerLink}>GitHub</a>
        </div>
      </div>

      {/* ── Main nav ────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <a href="/" className={styles.logo} aria-label="Morse home">
            <LogoIcon />
            <span className={styles.wordmark}>MORSE</span>
          </a>

          <div className={styles.links}>
            {/* Protocol dropdown */}
            <div className={styles.dropParent}>
              <button
                className={styles.dropTrigger}
                onClick={() => setProtocolOpen(v => !v)}
                aria-expanded={protocolOpen}
              >
                Protocol
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className={styles.dropChevron}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`${styles.dropdown} ${protocolOpen ? styles.dropdownOpenMobile : ''}`}>
                <div className={styles.dropdownInner}>
                  {protocolLinks.map((l) => (
                    <a key={l.label} href={l.href} className={styles.dropItem} onClick={() => setProtocolOpen(false)}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href={`${DOCS}/contracts.html`} className={styles.link}>Contracts</a>
          </div>

          <div className={styles.actions}>
            {/* GitHub icon + star count */}
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghLink}
              aria-label="GitHub repository"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className={styles.ghCount}>1.2k ★</span>
            </a>

            <Button variant="ghost" color="off-white" size="small" href={`${DOCS}/index.html`}>
              Docs
            </Button>

            <span style={ringOffsetOverride} className={styles.ctaWrap}>
              <Button variant="primary" color="ultraviolet" size="small" href={`${DOCS}/quick-start.html`}>
                Start Building
              </Button>
            </span>

            {/* Hamburger */}
            <button
              className={styles.menuToggle}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
            >
              <span className={`${styles.menuBar} ${mobileOpen ? styles.menuBarTopOpen : ''}`} />
              <span className={`${styles.menuBar} ${mobileOpen ? styles.menuBarMidOpen : ''}`} />
              <span className={`${styles.menuBar} ${mobileOpen ? styles.menuBarBotOpen : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile collapse ──────────────────────────────── */}
      <div className={`${styles.mobile} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileInner}>
          <div className={styles.mobileGroupLabel}>Protocol</div>
          {protocolLinks.map((l) => (
            <a key={l.label} href={l.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}

          <div className={styles.mobileSep} />
          <a href={`${DOCS}/index.html`} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Docs</a>
          <a href={`${DOCS}/contracts.html`} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contracts</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            GitHub
          </a>

          <div className={styles.mobileCta} style={ringOffsetOverride}>
            <Button
              variant="primary"
              color="ultraviolet"
              href={`${DOCS}/quick-start.html`}
              onClick={() => setMobileOpen(false)}
            >
              Start Building
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
