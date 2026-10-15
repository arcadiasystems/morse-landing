import { MystenLabsLogo, SealWordmark, SuiLogo, WalrusWordmark } from '../ui/PartnerLogos'
import styles from './Supporters.module.css'

/** Partner shelf: a paper card that straddles the hero's bottom edge. */
export function Supporters() {
  return (
    <section className={styles.supporters} aria-labelledby="supporters-title">
      <div className="container">
        <div className={styles.shelf}>
          <h2 id="supporters-title" className={`eyebrow ${styles.label}`}>
            Supported by
          </h2>
          <ul className={styles.logos}>
            <li className={styles.cell}>
              <MystenLabsLogo className={styles.mysten} />
            </li>
            <li className={styles.cell}>
              <WalrusWordmark className={styles.walrus} />
            </li>
            <li className={styles.cell}>
              <SuiLogo className={styles.sui} />
            </li>
            <li className={styles.cell}>
              <SealWordmark className={styles.seal} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
