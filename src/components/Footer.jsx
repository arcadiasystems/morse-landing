import { useEffect } from 'react'
import { LogoIcon } from './LogoIcon'

const STYLE_ID = 'morse-footer-styles'

const css = `
.morse-footer {
  background: #030508;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 56px 28px;
}

.morse-footer__inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
}

/* ── Left: logo + tagline ───────────────────────────────── */
.morse-footer__left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.morse-footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: rgba(200, 215, 235, 0.4);
  transition: color 0.15s cubic-bezier(.4, 0, .2, 1);
}
.morse-footer__logo:hover { color: rgba(200, 215, 235, 0.7); }

.morse-footer__tagline {
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.02em;
  color: rgba(200, 215, 235, 0.2);
}

/* ── Center: link row ───────────────────────────────────── */
.morse-footer__links {
  display: flex;
  flex-direction: row;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.morse-footer__link {
  font-size: 13px;
  color: rgba(200, 215, 235, 0.35);
  transition: color 0.15s cubic-bezier(.4, 0, .2, 1);
}
.morse-footer__link:hover { color: rgba(200, 215, 235, 0.7); }

/* ── Right: copyright ───────────────────────────────────── */
.morse-footer__right {
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  color: rgba(200, 215, 235, 0.2);
  letter-spacing: 0.02em;
}

/* ── Mobile: stack vertically, center align ─────────────── */
@media (max-width: 768px) {
  .morse-footer { padding: 48px 24px; }
  .morse-footer__inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }
  .morse-footer__left { align-items: center; }
  .morse-footer__logo { justify-content: center; }
  .morse-footer__links { justify-content: center; }
}
`

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = css
  document.head.appendChild(s)
}

const DOCS = 'https://morse-docs.vercel.app'
const GITHUB = 'https://github.com/TheDivic/morse-dcms'

const LINKS = [
  { label: 'Docs',      href: `${DOCS}/index.html` },
  { label: 'GitHub',    href: GITHUB, external: true },
  { label: 'Protocol',  href: `${DOCS}/core-concepts.html` },
  { label: 'Community', href: GITHUB, external: true },
  { label: 'Twitter',   href: 'https://twitter.com/morseprotocol', external: true },
]

export function Footer() {
  useEffect(() => { injectStyles() }, [])

  return (
    <footer className="morse-footer">
      <div className="morse-footer__inner">
        <div className="morse-footer__left">
          <a href="/" className="morse-footer__logo" aria-label="Morse home">
            <LogoIcon size={20} />
            <span>MORSE</span>
          </a>
          <span className="morse-footer__tagline">Decentralized CMS. Built on Walrus.</span>
        </div>

        <nav className="morse-footer__links" aria-label="Footer">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="morse-footer__link"
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="morse-footer__right">© 2025 Morse Protocol. Open source.</div>
      </div>
    </footer>
  )
}
