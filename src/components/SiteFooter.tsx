import { DEMO_BLOG, DOCS, GITHUB, TWITTER } from '../lib/links'
import { GitHubIcon } from '../ui/GitHubIcon'
import { MorseGlyphs } from '../ui/MorseGlyphs'
import styles from './SiteFooter.module.css'

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  )
}

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
      { label: 'Architecture', href: `${DOCS}/index.html#architecture` },
      { label: 'Security', href: `${DOCS}/access-control.html` },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Quick start', href: `${DOCS}/quick-start.html` },
      { label: 'Contracts', href: `${DOCS}/contracts-overview.html` },
      { label: 'Entries', href: `${DOCS}/entries.html` },
      { label: 'Demo blog', href: DEMO_BLOG, external: true },
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
    <footer className={styles.footer}>
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
            <div className={styles.social}>
              <a
                href={GITHUB}
                className={`${styles.socialTile} border-glow-soft`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Morse on GitHub"
              >
                <GitHubIcon size={16} />
              </a>
              <a
                href={TWITTER}
                className={`${styles.socialTile} border-glow-soft`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Morse on X"
              >
                <XIcon />
              </a>
            </div>
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
