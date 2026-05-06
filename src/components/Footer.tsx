import { LogoIcon } from './LogoIcon'
import styles from './Footer.module.css'

const DOCS = 'https://morse-docs.vercel.app'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <a href="/" className={styles.logo}>
            <LogoIcon size={28} />
            <span className={styles.wordmark}>MORSE</span>
          </a>
          <div className={styles.links}>
            <a href={`${DOCS}/index.html`} className={styles.link}>Docs</a>
            <a href={`${DOCS}/quick-start.html`} className={styles.link}>Quick Start</a>
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
        </div>
        <div className={styles.right}>Built on Sui and Walrus</div>
      </div>
    </footer>
  )
}
