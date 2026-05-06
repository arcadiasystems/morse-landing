import styles from './Architecture.module.css'

const layers = [
  { icon: '⛓', name: 'Sui Blockchain', desc: 'Publications, collections, entries, capabilities', badge: 'Live', badgeType: 'live' },
  { icon: '🦭', name: 'Walrus Storage', desc: 'Blob storage, quilt storage, content payloads', badge: 'Live', badgeType: 'live' },
  { icon: '🔏', name: 'Seal Encryption', desc: 'Publisher and subscription access policies', badge: 'Live', badgeType: 'live' },
  { icon: '📦', name: 'TypeScript SDK', desc: 'Wraps Sui and Walrus interactions for app developers', badge: 'In Progress', badgeType: 'wip' },
  { icon: '📡', name: 'Indexer + Content API', desc: 'Event-driven read layer, REST API', badge: 'Planned', badgeType: 'soon' },
]

export function Architecture() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.text}>
            <p className={styles.label}>Architecture</p>
            <h2 className={styles.h2}>Every layer is replaceable</h2>
            <p className={styles.lead}>
              Only the Sui contracts are the source of truth. All other components can be swapped,
              self-hosted, or run by anyone.
            </p>
            <div className={styles.points}>
              {[
                ['Control layer', 'on Sui handles identity and permissions. Nobody can take that away from you.'],
                ['Storage layer', 'on Walrus holds content payloads. Contracts hold verifiable references, not bytes.'],
                ['Read layer', 'is served by indexers anyone can run, pointed at the same on-chain contracts.'],
                ['Developer layer', 'via TypeScript SDK and CLI makes it ergonomic, not mandatory.'],
              ].map(([strong, rest]) => (
                <div key={strong} className={styles.point}>
                  <span className={styles.pointDot} />
                  <span className={styles.pointText}>
                    <strong>{strong}</strong> {rest}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.stack}>
            {layers.map((l, i) => (
              <div key={l.name}>
                <div className={styles.layer}>
                  <div className={styles.layerIcon}>{l.icon}</div>
                  <div className={styles.layerInfo}>
                    <div className={styles.layerName}>{l.name}</div>
                    <div className={styles.layerDesc}>{l.desc}</div>
                  </div>
                  <span className={`${styles.badge} ${styles[`badge_${l.badgeType}`]}`}>
                    {l.badge}
                  </span>
                </div>
                {i < layers.length - 1 && (
                  <div className={styles.divider}>
                    <div className={styles.dividerLine} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
