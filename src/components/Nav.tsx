import { LogoIcon } from './LogoIcon'
import styles from './Nav.module.css'

const DOCS = 'https://morse-docs.vercel.app'

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <LogoIcon />
          <span className={styles.wordmark}>MORSE</span>
        </a>

        <div className={styles.links}>
          <a href={`${DOCS}/index.html`} className={styles.link}>Docs</a>
          <a href={`${DOCS}/core-concepts.html`} className={styles.link}>Concepts</a>
          <a href={`${DOCS}/contracts.html`} className={styles.link}>Contracts</a>
          <a
            href="https://github.com/TheDivic/morse-dcms"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <div className={styles.actions}>
          <a href={`${DOCS}/quick-start.html`} className={styles.btnPrimary}>
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}
