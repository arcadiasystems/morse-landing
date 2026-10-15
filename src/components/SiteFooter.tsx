import { DEMO_BLOG, DOCS, GITHUB, LICENSE, QUICK_START, TWITTER } from '../lib/links'
import { MORSE_WORDMARK } from '../lib/morse'
import { MorseMark } from '../ui/MorseMark'
import styles from './SiteFooter.module.css'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Protocol',
    links: [
      { label: 'Overview', href: `${DOCS}/index.html` },
      { label: 'How it works', href: `${DOCS}/core-concepts.html` },
      { label: 'Security', href: `${DOCS}/access-control.html` },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Quick start', href: QUICK_START },
      { label: 'Contracts', href: `${DOCS}/contracts-overview.html` },
      { label: 'Entries', href: `${DOCS}/entries.html` },
      { label: 'Demo blog', href: DEMO_BLOG, external: true },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: GITHUB, external: true },
      { label: 'X', href: TWITTER, external: true },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className={`${styles.footer} on-ink`}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <div className={styles.lockup}>
            <MorseMark size={28} />
            <span className={styles.wordmark}>morse</span>
          </div>
          <p className={styles.blurb}>
            Decentralized CMS protocol. Built on Sui and Walrus by Arcadia Systems with a grant from the
            Walrus Foundation.
          </p>
          <span className={styles.signature} aria-hidden="true">
            {MORSE_WORDMARK}
          </span>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {COLUMNS.map(col => {
            const titleId = `footer-${col.title.toLowerCase()}`
            return (
              <div key={col.title} className={styles.column}>
                <p id={titleId} className={styles.columnTitle}>
                  {col.title}
                </p>
                <ul className={styles.columnList} aria-labelledby={titleId}>
                  {col.links.map(link => (
                    <li key={link.label}>
                      <a
                        className={styles.link}
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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

      <div className={`container ${styles.legal}`}>
        © {new Date().getFullYear()} Morse Protocol · Arcadia Systems ·{' '}
        <a className={styles.link} href={LICENSE} target="_blank" rel="noopener noreferrer">
          Open source, MIT licence
        </a>
      </div>
    </footer>
  )
}
