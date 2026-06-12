import { DOCS, GITHUB, TWITTER } from '../lib/links'
import { MorseGlyphs } from '../ui/MorseGlyphs'
import styles from './SiteFooter.module.css'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const COLUMNS: FooterColumn[] = [
  {
    title: 'Protocol',
    links: [
      { label: 'Overview', href: `${DOCS}/index.html` },
      { label: 'How it works', href: `${DOCS}/core-concepts.html` },
      { label: 'Architecture', href: `${DOCS}/architecture.html` },
      { label: 'Security', href: `${DOCS}/security.html` },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Quick start', href: `${DOCS}/quick-start.html` },
      { label: 'Contracts', href: `${DOCS}/contracts.html` },
      { label: 'Entries', href: `${DOCS}/entries.html` },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: GITHUB, external: true },
      { label: 'Twitter', href: TWITTER, external: true },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className={`${styles.footer} hairline-top`}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logoBox}>
              <span className={styles.logoWord}>Morse</span>
              <MorseGlyphs word="MORSE" className={styles.logoMorse} />
            </div>
            <p className={styles.tagline}>DECENTRALIZED CMS. BUILT ON SUI + WALRUS.</p>
            <span title="FOREVER" aria-hidden="true">
              <MorseGlyphs word="FOREVER" className={styles.forever} />
            </span>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {COLUMNS.map(col => {
              const titleId = `footer-${col.title.toLowerCase()}`
              return (
                <div key={col.title}>
                  <p className={styles.colTitle} id={titleId}>
                    {col.title}
                  </p>
                  <ul className={styles.colList} aria-labelledby={titleId}>
                    {col.links.map(link => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(link.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </nav>
        </div>

        <div className={styles.meta}>
          <p className={styles.copyright}>© 2026 MORSE PROTOCOL — OPEN SOURCE</p>
          <MorseGlyphs word="MORSE" className={styles.metaMorse} />
        </div>
      </div>

      <div className={styles.giantRow} aria-hidden="true">
        <span className={styles.giant}>
          {'MORSE'.split('').map((letter, i) => (
            <span key={i} className={styles.giantLetter}>
              {letter}
            </span>
          ))}
        </span>
      </div>
    </footer>
  )
}
