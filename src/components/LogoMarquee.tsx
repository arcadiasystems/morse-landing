import styles from './LogoMarquee.module.css'

const logos = [
  'Acme Corp',
  'Sui Foundation',
  'Walrus Labs',
  'Vercel',
  'Chainlink',
  'Mysten Labs',
  'Arcadia Systems',
  'Fluent',
  'Prisma',
  'Notion',
]

export function LogoMarquee() {
  return (
    <div className={`${styles.wrapper} section-secondary`}>
      <p className={styles.label}>Trusted by builders on Sui</p>
      <div className={styles.track}>
        <div className={styles.inner}>
          {[...logos, ...logos].map((name, i) => (
            <span key={i} className={styles.item}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
