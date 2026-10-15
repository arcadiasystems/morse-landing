import type { ComponentType } from 'react'
import { DEMO_BLOG, DOCS, QUICK_START } from '../lib/links'
import { AgentArt, ArchiveArt, GateArt, PublishArt } from './UseCaseArt'
import styles from './UseCases.module.css'

interface UseCase {
  title: string
  body: string
  href: string
  external?: boolean
  Art: ComponentType
}

const CASES: UseCase[] = [
  {
    title: 'Own your blog or docs site',
    body: 'Publish markdown to a site whose content lives on Walrus and whose permissions live on Sui. Change hosts, keep everything.',
    href: DEMO_BLOG,
    external: true,
    Art: PublishArt,
  },
  {
    title: 'Gate premium content with keys',
    body: 'Seal encrypts the payload, and a rule on Sui decides who can decrypt it. Access lives on-chain, not in a vendor’s database.',
    href: `${DOCS}/access-control.html`,
    Art: GateArt,
  },
  {
    title: 'Let an agent run the backend',
    body: 'Publications, collections and entries through the CLI or SDK. An agent can provision and operate the whole thing with no dashboard.',
    href: QUICK_START,
    Art: AgentArt,
  },
  {
    title: 'Keep an archive nobody can edit',
    body: 'Revisions append, nothing overwrites. Who changed what, and when, is on Sui and readable by anyone.',
    href: `${DOCS}/entries.html`,
    Art: ArchiveArt,
  },
]

export function UseCases() {
  return (
    <section id="use-cases" aria-labelledby="use-cases-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <h2 id="use-cases-title" className={styles.title}>
            Four things Morse does today that a hosted CMS cannot.
          </h2>
          <p className={`eyebrow ${styles.eyebrow}`}>All four live today</p>
        </div>

        <ul className={styles.grid}>
          {CASES.map(({ title, body, href, external, Art }) => (
            <li key={title}>
              <a
                className={styles.card}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardBody}>{body}</p>
                  </div>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className={styles.artSlot}>
                  <Art />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
