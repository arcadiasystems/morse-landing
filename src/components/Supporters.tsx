import walrusFoundationLogo from '../assets/partners/walrus-foundation.png'
import { SealWordmark, SuiLogo, WalrusWordmark } from '../ui/PartnerLogos'
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
              {/* Supplied as a colour raster on white, so it sits on --paper as is. */}
              <img
                className={styles.foundation}
                src={walrusFoundationLogo}
                alt="Walrus Foundation"
                width={915}
                height={247}
              />
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
