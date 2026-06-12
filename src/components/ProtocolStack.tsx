import type { CSSProperties } from 'react'
import { Reveal } from '../ui/Reveal'
import { MorseGlyphs } from '../ui/MorseGlyphs'
import styles from './ProtocolStack.module.css'

type LayerStatus = 'live' | 'progress' | 'planned'

interface StackLayer {
  name: string
  desc: string
  status: LayerStatus
}

const LAYERS: StackLayer[] = [
  {
    name: 'SUI BLOCKCHAIN',
    desc: 'Publications, collections, entries, capabilities',
    status: 'live',
  },
  {
    name: 'WALRUS STORAGE',
    desc: 'Blob + quilt storage, content payloads',
    status: 'live',
  },
  {
    name: 'SEAL ENCRYPTION',
    desc: 'Publisher and subscription access policies',
    status: 'live',
  },
  {
    name: 'TYPESCRIPT SDK',
    desc: 'Wraps Sui and Walrus for app developers',
    status: 'progress',
  },
  {
    name: 'INDEXER + CONTENT API',
    desc: 'Event-driven read layer, REST',
    status: 'planned',
  },
]

const STATUS_LABEL: Record<LayerStatus, string> = {
  live: 'LIVE',
  progress: 'IN PROGRESS',
  planned: 'PLANNED',
}

const STAMP_CLASS: Record<LayerStatus, string> = {
  live: styles.stampLive,
  progress: styles.stampProgress,
  planned: styles.stampPlanned,
}

interface LayerPoint {
  lead: string
  text: string
}

const POINTS: LayerPoint[] = [
  {
    lead: 'Control layer',
    text: 'on Sui handles identity and permissions. Nobody can take that away from you.',
  },
  {
    lead: 'Storage layer',
    text: 'on Walrus holds content payloads. Contracts hold verifiable references, not bytes.',
  },
  {
    lead: 'Read layer',
    text: 'is served by indexers anyone can run, pointed at the same on-chain contracts.',
  },
  {
    lead: 'Developer layer',
    text: 'via TypeScript SDK and CLI makes it ergonomic, not mandatory.',
  },
]

export function ProtocolStack() {
  return (
    <section
      id="architecture"
      className="section-pad hairline-top glow-field"
      style={{ '--glow-x': '82%', '--glow-y': '24%' } as CSSProperties}
      aria-labelledby="protocol-stack-title"
    >
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <p className="eyebrow">ARCHITECTURE</p>
            <h2 id="protocol-stack-title" className="display-h2">
              EVERY LAYER
              <br />
              IS REPLACEABLE.
            </h2>
            <p className="section-lead">
              Only the Sui contracts are the source of truth. Everything else
              can be swapped, self-hosted, or run by anyone.
            </p>
            <ul className={styles.points}>
              {POINTS.map(point => (
                <li key={point.lead} className={styles.point}>
                  {/* Amber morse bullet: the point's lead-in initial, encoded for real. */}
                  <MorseGlyphs word={point.lead.charAt(0)} className={styles.bullet} />
                  <p className={styles.pointText}>
                    <strong>{point.lead}</strong> {point.text}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className={styles.stackWrap}>
            <div className={styles.stack}>
              <span className={styles.connector} aria-hidden="true" />
              <ul className={styles.layers}>
                {LAYERS.map(layer => (
                  <li key={layer.name} className={styles.layer}>
                    <div className={styles.layerInfo}>
                      <h3 className={styles.layerName}>{layer.name}</h3>
                      <p className={styles.layerDesc}>{layer.desc}</p>
                    </div>
                    <span className={`mono-stamp ${STAMP_CLASS[layer.status]}`}>
                      {layer.status === 'live' && (
                        <span className={styles.liveDot} aria-hidden="true" />
                      )}
                      {STATUS_LABEL[layer.status]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
