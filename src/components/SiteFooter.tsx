import {
  AGENTS,
  DOCS_AGENT_COOKBOOK,
  DOCS_CONTRACTS,
  DOCS_SDK,
  GITHUB,
  LICENSE,
  QUICK_START,
  RECEIPTS,
  TWITTER,
  UPLOADER_APP,
} from '../lib/links'
import { MORSE_WORDMARK } from '../lib/morse'
import { MorseMark } from '../ui/MorseMark'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'The Morse kit', href: '#kit' },
      { label: 'Morse Receipts', href: RECEIPTS },
      { label: 'Morse Agents', href: AGENTS },
      { label: 'Morse Uploader', href: UPLOADER_APP, external: true },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Quick start', href: QUICK_START },
      { label: 'Contracts', href: DOCS_CONTRACTS },
      { label: 'SDK', href: DOCS_SDK },
      { label: 'Agent cookbook', href: DOCS_AGENT_COOKBOOK },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: GITHUB, external: true },
      { label: 'X', href: TWITTER, external: true },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="foot on-ink">
      <div className="container foot__top">
        <div className="foot__brand">
          <div className="lock">
            <MorseMark size={28} />
            <span>morse</span>
          </div>
          <p>
            The app kit for content on Walrus and Sui. Built by Arcadia Systems with a grant from the Walrus
            Foundation.
          </p>
          <span className="sig" aria-hidden="true">
            {MORSE_WORDMARK}
          </span>
        </div>

        <nav className="foot__cols" aria-label="Footer">
          {COLUMNS.map(col => {
            const titleId = `footer-${col.title.toLowerCase()}`
            return (
              <div key={col.title} className="foot__col">
                <p id={titleId}>{col.title}</p>
                <ul aria-labelledby={titleId}>
                  {col.links.map(link => (
                    <li key={link.label}>
                      <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
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

      {/* The year is prerendered at build time; a visit in a later year keeps
          the build's year rather than failing hydration. */}
      <div className="container foot__legal" suppressHydrationWarning>
        © {new Date().getFullYear()} Morse Protocol · Arcadia Systems ·{' '}
        <a href={LICENSE} target="_blank" rel="noopener noreferrer">
          Open source, MIT licence
        </a>
      </div>
    </footer>
  )
}
