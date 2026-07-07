import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { DOCS, GITHUB } from '../lib/links'
import { Cta } from '../ui/Button'
import { GitHubIcon } from '../ui/GitHubIcon'
import { MorseGlyphs } from '../ui/MorseGlyphs'
import styles from './SiteNav.module.css'

const NAV_LINKS = [
  { label: 'PROTOCOL', href: `${DOCS}/core-concepts.html` },
  { label: 'ARCHITECTURE', href: '#architecture' },
  { label: 'CONTRACTS', href: `${DOCS}/contracts-overview.html` },
  { label: 'DOCS', href: `${DOCS}/index.html` },
]

const MENU_STAGGER_MS = 40

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  /* Body scroll lock + focus containment while the mobile menu is open:
     the page content behind the overlay is made inert. */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const main = document.getElementById('main')
    const footer = document.querySelector('footer')
    main?.toggleAttribute('inert', true)
    footer?.toggleAttribute('inert', true)
    return () => {
      document.body.style.overflow = prev
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
    }
  }, [open])

  /* Escape closes the menu and returns focus to the toggle. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* Crossing to desktop dismisses the overlay (and releases the scroll lock). */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <div className={`container ${styles.bannerInner}`}>
          <p className={styles.bannerMsg}>MORSE PROTOCOL V1 — LIVE ON SUI TESTNET</p>
          <div className={styles.bannerLinks}>
            <a className={styles.bannerLink} href={`${DOCS}/index.html`}>
              DOCS
            </a>
            <a className={styles.bannerLink} href={GITHUB} target="_blank" rel="noopener noreferrer">
              GITHUB
            </a>
          </div>
        </div>
      </div>

      <nav className={styles.bar} aria-label="Primary">
        <div className={`container ${styles.barInner}`}>
          <a className={styles.logo} href="/" aria-label="Morse — home">
            <span className={styles.wordmark}>MORSE</span>
            <MorseGlyphs word="MORSE" className={styles.logoCode} />
          </a>

          <ul className={styles.links}>
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a
              className={styles.github}
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Morse on GitHub"
            >
              <GitHubIcon size={18} />
            </a>
            <Cta variant="solid" size="sm" href={`${DOCS}/quick-start.html`}>
              START BUILDING
            </Cta>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <span className={styles.burgerBar} />
            <span className={styles.burgerBar} />
            <span className={styles.burgerBar} />
          </button>
        </div>
      </nav>

      <div id={menuId} className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}>
        <nav aria-label="Mobile">
          <ul className={styles.menuList}>
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.label}
                className={styles.menuItem}
                style={{ '--stagger': `${i * MENU_STAGGER_MS}ms` } as CSSProperties}
              >
                <a className={styles.menuLink} href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
            <li
              className={styles.menuItem}
              style={{ '--stagger': `${NAV_LINKS.length * MENU_STAGGER_MS}ms` } as CSSProperties}
            >
              <a
                className={styles.menuLink}
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
              >
                GITHUB
              </a>
            </li>
          </ul>
        </nav>
        <div
          className={`${styles.menuItem} ${styles.menuFoot}`}
          style={{ '--stagger': `${(NAV_LINKS.length + 1) * MENU_STAGGER_MS}ms` } as CSSProperties}
        >
          <Cta variant="solid" href={`${DOCS}/quick-start.html`}>
            START BUILDING
          </Cta>
        </div>
      </div>
    </header>
  )
}
