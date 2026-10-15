import styles from './Statement.module.css'

export function Statement() {
  return (
    <section className={styles.statement} aria-labelledby="statement-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="statement-title" className={`eyebrow ${styles.eyebrow}`}>
          Why a protocol
        </h2>
        <p className={styles.body}>
          A hosted CMS keeps your content, your history and your permissions in a database someone else
          controls. Morse keeps them on Sui and Walrus, where no vendor, no host and no one at Morse can
          change or remove them.
        </p>
      </div>
    </section>
  )
}
