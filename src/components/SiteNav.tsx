import { useEffect, useId, useRef, useState } from 'react'
import { DOCS, GITHUB, QUICK_START_CLI } from '../lib/links'
import { MorseMark } from '../ui/MorseMark'
import styles from './SiteNav.module.css'

const SECTION_LINKS = [
  { label: 'Use cases', href: '#use-cases' },
  { label: 'How it works', href: '#how' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Docs', href: `${DOCS}/` },
]

/** Matches the CSS breakpoint: above 860px the sheet does not exist. */
const DESKTOP_QUERY = '(min-width: 861px)'

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const sheetId = useId()

  /* While open: Escape closes and returns focus to the toggle; a pointer
     press anywhere outside the nav closes. */
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  /* Crossing to desktop dismisses the sheet. */
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <header ref={headerRef} className={`${styles.header} on-ink`}>
      <div className={styles.pill}>
        <a className={styles.brand} href="#top" aria-label="Morse home">
          <MorseMark size={26} />
          <span className={styles.wordmark} aria-hidden="true">
            morse
          </span>
        </a>

        <nav aria-label="Primary">
          <ul className={styles.links}>
            {SECTION_LINKS.map(link => (
              <li key={link.label}>
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className={styles.cta} href={QUICK_START_CLI}>
          Start building
        </a>

        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls={sheetId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </div>

      <nav id={sheetId} className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} aria-label="Mobile">
        <ul className={styles.sheetList}>
          {SECTION_LINKS.map(link => (
            <li key={link.label}>
              <a className={styles.sheetLink} href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a className={styles.sheetLink} href={GITHUB} target="_blank" rel="noopener noreferrer" onClick={close}>
              GitHub
            </a>
          </li>
          <li>
            <a className={`${styles.sheetLink} ${styles.sheetCta}`} href={QUICK_START_CLI} onClick={close}>
              Start building
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
