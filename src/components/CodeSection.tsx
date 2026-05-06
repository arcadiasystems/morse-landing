import styles from './CodeSection.module.css'

const DOCS = 'https://morse-docs.vercel.app'

export function CodeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.text}>
            <p className={styles.label}>Developer Experience</p>
            <h2 className={styles.h2}>Agent-first by design</h2>
            <p className={styles.lead}>
              A coding agent can define content structures, provision publications, publish entries,
              and operate the entire backend via CLI or SDK without waiting for centralized provisioning.
            </p>
            <a href={`${DOCS}/quick-start.html`} className={styles.btn}>
              View Quick Start
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          <div className={styles.frame}>
            <div className={styles.bar}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYel}`} />
              <span className={`${styles.dot} ${styles.dotGrn}`} />
              <span className={styles.file}>publish.ts</span>
            </div>
            <pre className={styles.pre}><code>{[
              <span key="1"><span className={styles.kw}>import</span> {'{ MorseClient }'} <span className={styles.kw}>from</span> <span className={styles.str}>'@morse/sdk'</span>{'\n\n'}</span>,
              <span key="2"><span className={styles.kw}>const</span> client = <span className={styles.kw}>new</span> <span className={styles.fn}>MorseClient</span>{'({ network: '}<span className={styles.str}>'testnet'</span>{' })\n\n'}</span>,
              <span key="3"><span className={styles.cmt}>{'// create a publication on-chain\n'}</span></span>,
              <span key="4"><span className={styles.kw}>const</span> {' pub = '}<span className={styles.kw}>await</span>{' client.'}<span className={styles.fn}>createPublication</span>{'({\n'}</span>,
              <span key="5">{'  slug: '}<span className={styles.str}>'my-blog'</span>{',\n'}</span>,
              <span key="6">{'  policy: '}<span className={styles.str}>'public'</span>{',\n'}{'}))\n\n'}</span>,
              <span key="7"><span className={styles.cmt}>{'// define a collection schema\n'}</span></span>,
              <span key="8"><span className={styles.kw}>await</span>{' pub.'}<span className={styles.fn}>createCollection</span>{'({ name: '}<span className={styles.str}>'posts'</span>{' })\n\n'}</span>,
              <span key="9"><span className={styles.cmt}>{'// publish an entry to Walrus\n'}</span></span>,
              <span key="10"><span className={styles.kw}>await</span>{' pub.'}<span className={styles.fn}>publish</span>{'({\n'}</span>,
              <span key="11">{'  collection: '}<span className={styles.str}>'posts'</span>{',\n'}</span>,
              <span key="12">{'  slug: '}<span className={styles.str}>'hello-world'</span>{',\n'}</span>,
              <span key="13">{'  content: { title: '}<span className={styles.str}>'Hello World'</span>{', body },\n})'}</span>,
            ]}</code></pre>
          </div>
        </div>
      </div>
    </section>
  )
}
