import styles from './WhyMorse.module.css'

const cards = [
  {
    num: '01',
    title: 'Trust concentration',
    text: 'One vendor backend controls all identity and data. If that vendor changes pricing, policies, or shuts down, your content and permissions go with it.',
  },
  {
    num: '02',
    title: 'Weak portability',
    text: 'Publication identity and permissions are stored in proprietary systems. They don\'t travel with you. Migrating means rebuilding from scratch.',
  },
  {
    num: '03',
    title: 'Opaque history',
    text: 'Change and authorization history is hidden inside a closed system. Auditing who changed what, and when, is impossible without vendor cooperation.',
  },
]

export function WhyMorse() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Why Morse</p>
        <h2 className={styles.h2}>Traditional CMSs trade your future for convenience today</h2>

        <div className={styles.grid}>
          {cards.map((c) => (
            <div key={c.num} className={styles.card}>
              <div className={styles.num}>{c.num}</div>
              <div className={styles.title}>{c.title}</div>
              <div className={styles.text}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
