import { useState } from 'react'
import styles from './Hero.module.css'

const DOCS = 'https://morse-docs.vercel.app'

type Lang = 'typescript' | 'javascript' | 'cli'

const snippets: Record<Lang, React.ReactNode> = {
  typescript: (
    <>
      <span className={styles.kw}>import</span>
      {' { MorseClient } '}
      <span className={styles.kw}>from</span>
      {' '}
      <span className={styles.str}>'@morse/sdk'</span>
      {'\n\n'}
      <span className={styles.kw}>const</span>
      {' client = '}
      <span className={styles.kw}>new</span>
      {' '}
      <span className={styles.fn}>MorseClient</span>
      {'({ network: '}
      <span className={styles.str}>'testnet'</span>
      {' })\n\n'}
      <span className={styles.cmt}>{'// create a publication on-chain\n'}</span>
      <span className={styles.kw}>const</span>
      {' pub = '}
      <span className={styles.kw}>await</span>
      {' client.'}
      <span className={styles.fn}>createPublication</span>
      {'({\n  slug: '}
      <span className={styles.str}>'my-blog'</span>
      {',\n  policy: '}
      <span className={styles.str}>'public'</span>
      {',\n})\n\n'}
      <span className={styles.cmt}>{'// publish to Walrus\n'}</span>
      <span className={styles.kw}>await</span>
      {' pub.'}
      <span className={styles.fn}>publish</span>
      {'({\n  collection: '}
      <span className={styles.str}>'posts'</span>
      {',\n  slug: '}
      <span className={styles.str}>'hello-world'</span>
      {',\n  content: { title, body },\n})'}
    </>
  ),
  javascript: (
    <>
      <span className={styles.kw}>const</span>
      {' { MorseClient } = '}
      <span className={styles.fn}>require</span>
      {'('}
      <span className={styles.str}>'@morse/sdk'</span>
      {')\n\n'}
      <span className={styles.kw}>const</span>
      {' client = '}
      <span className={styles.kw}>new</span>
      {' '}
      <span className={styles.fn}>MorseClient</span>
      {'({ network: '}
      <span className={styles.str}>'testnet'</span>
      {' })\n\n'}
      <span className={styles.cmt}>{'// create a publication\n'}</span>
      <span className={styles.kw}>const</span>
      {' pub = '}
      <span className={styles.kw}>await</span>
      {' client.'}
      <span className={styles.fn}>createPublication</span>
      {'({ slug: '}
      <span className={styles.str}>'my-blog'</span>
      {' })\n\n'}
      <span className={styles.cmt}>{'// publish content\n'}</span>
      <span className={styles.kw}>await</span>
      {' pub.'}
      <span className={styles.fn}>publish</span>
      {'({\n  collection: '}
      <span className={styles.str}>'posts'</span>
      {',\n  slug: '}
      <span className={styles.str}>'hello-world'</span>
      {',\n  content,\n})'}
    </>
  ),
  cli: (
    <>
      <span className={styles.cmt}>{'# initialise a new publication\n'}</span>
      <span className={styles.acc}>{'morse'}</span>
      {' init '}
      <span className={styles.str}>my-blog</span>
      {' --network testnet\n\n'}
      <span className={styles.cmt}>{'# create a collection schema\n'}</span>
      <span className={styles.acc}>{'morse'}</span>
      {' collections create posts\n\n'}
      <span className={styles.cmt}>{'# publish an entry\n'}</span>
      <span className={styles.acc}>{'morse'}</span>
      {' publish posts/hello-world.md\n\n'}
      <span className={styles.cmt}>{'# list all entries\n'}</span>
      <span className={styles.acc}>{'morse'}</span>
      {' entries list --pub my-blog'}
    </>
  ),
}

export function Hero() {
  const [lang, setLang] = useState<Lang>('typescript')

  return (
    <section className={styles.hero}>
      {/* Blur blobs */}
      <div className={`${styles.blob} ${styles.blobPink}`} />
      <div className={`${styles.blob} ${styles.blobYellow}`} />
      <div className={`${styles.blob} ${styles.blobGreen}`} />

      {/* Dot grid */}
      <div className={styles.grid} />

      <div className={styles.inner}>
        {/* Left col */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Built on Sui and Walrus
          </div>

          <h1 className={styles.h1}>
            What if your content<br />
            <span className={styles.accent}>never broke?</span>
          </h1>

          <p className={styles.sub}>
            Morse is a decentralized CMS protocol built for permanence.
            On-chain governance. Verifiable revisions. Open protocol.
          </p>

          <div className={styles.actions}>
            <a href={`${DOCS}/quick-start.html`} className={styles.btnPrimary}>
              Start Building
            </a>
            <a href={`${DOCS}/index.html`} className={styles.btnOutline}>
              Read the Docs
            </a>
          </div>

          <div className={styles.stack}>
            <div className={styles.stackItem}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Move Smart Contracts
            </div>
            <div className={styles.stackSep} />
            <div className={styles.stackItem}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <ellipse cx="12" cy="12" rx="10" ry="4"/>
                <path d="M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4"/>
                <path d="M2 12v6c0 2.21 4.48 4 10 4s10-1.79 10-4v-6"/>
              </svg>
              Walrus Storage
            </div>
            <div className={styles.stackSep} />
            <div className={styles.stackItem}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Seal Encryption
            </div>
          </div>
        </div>

        {/* Right col — terminal */}
        <div className={styles.right}>
          <div className={styles.terminal}>
            {/* macOS dots */}
            <div className={styles.termBar}>
              <span className={`${styles.termDot} ${styles.dotRed}`} />
              <span className={`${styles.termDot} ${styles.dotYel}`} />
              <span className={`${styles.termDot} ${styles.dotGrn}`} />
              <div className={styles.termTabs}>
                {(['typescript', 'javascript', 'cli'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    className={`${styles.termTab} ${lang === l ? styles.termTabActive : ''}`}
                    onClick={() => setLang(l)}
                  >
                    {l === 'cli' ? 'CLI' : l === 'typescript' ? 'TypeScript' : 'JavaScript'}
                  </button>
                ))}
              </div>
            </div>
            <pre className={styles.termCode}>
              <code>{snippets[lang]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
