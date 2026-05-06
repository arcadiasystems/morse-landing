import { useEffect, useState } from 'react'
import { LogoIcon } from './LogoIcon'
import Button from './ui/Button'
import styles from './Nav.module.css'

const DOCS = 'https://morse-docs.vercel.app'

const protocolLinks = [
  { label: 'Overview', href: `${DOCS}/index.html` },
  { label: 'How It Works', href: `${DOCS}/core-concepts.html` },
  { label: 'Architecture', href: `${DOCS}/index.html#architecture` },
  { label: 'Access Control', href: `${DOCS}/access-control.html` },
]

const flatLinks = [
  { label: 'Docs', href: `${DOCS}/index.html` },
  { label: 'Contracts', href: `${DOCS}/contracts.html` },
  { label: 'GitHub', href: 'https://github.com/TheDivic/morse-dcms', external: true },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <div className={styles.wrapper}>
      {/* Announcement strip */}
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <span className={styles.bannerDot} />
          <span className={styles.bannerText}>
            Morse Protocol v1 is live on Sui Testnet
          </span>
          <a href={`${DOCS}/index.html`} className={styles.bannerLink}>
            Read the announcement
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.inner}>
          <a href="/" className={styles.logo} aria-label="Morse home">
            <LogoIcon />
            <span className={styles.wordmark}>MORSE</span>
          </a>

          <div className={styles.links}>
            <div className={styles.dropParent}>
              <button className={styles.dropTrigger}>
                Protocol
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className={styles.dropChevron}>
                  <polyline points="6 9 12 15 18 9" />
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
              <span className={styles.starBadge}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                1.2k
              </span>
            </a>
          </div>

          <div className={styles.actions}>
            <Button variant="primary" color="ultraviolet" size="small" href={`${DOCS}/quick-start.html`}>
              Get Started
            </Button>
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

      {/* Mobile menu sheet */}
      <div className={`${styles.mobileSheet} ${mobileOpen ? styles.mobileSheetOpen : ''}`}>
        <div className={styles.mobileInner}>
          <div className={styles.mobileGroupLabel}>Protocol</div>
          {protocolLinks.map((l) => (
            <a key={l.label} href={l.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className={styles.mobileSep} />
          <div className={styles.mobileGroupLabel}>Resources</div>
          {flatLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={styles.mobileLink}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className={styles.mobileCta}>
            <Button
              variant="primary"
              color="ultraviolet"
              href={`${DOCS}/quick-start.html`}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
