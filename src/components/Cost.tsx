interface CostExample {
  /** Yearly storage cost at the dated rate below. */
  amount: string
  title: string
  working: string
}

/* Worked examples, not live data: the rate published in the Walrus docs on
   17 Nov 2026, $0.023 per GB a month on encoded size. Re-read the Walrus
   storage-costs page before changing a figure, and keep the date in the
   footer line in step. */
const EXAMPLES: CostExample[] = [
  { amount: '$0.02', title: 'One post, kept for a year', working: '64 MB billed × $0.023 per GB a month × 12' },
  {
    amount: '$0.02',
    title: '600 short posts in one quilt',
    working: '0.09 GB billed. As 600 separate blobs: $10.60',
  },
  { amount: '$1.26', title: '1 GB of media', working: '4.56 GB billed × $0.023 per GB a month × 12' },
]

/** What it costs: Morse's own fee, then three dated worked examples of what the networks charge. */
export function Cost() {
  return (
    <div className="cost" id="cost">
      <div className="cost__hd">
        <h3>WHAT IT COSTS</h3>
        <span>PAID TO THE NETWORKS · WAL FOR STORAGE, SUI FOR GAS</span>
      </div>
      <div className="cost__grid">
        {/* "today" stays on both lines about Morse's fee until the day a fee is introduced. */}
        <div className="cost__cell free">
          <span className="amt">$0</span>
          <b>Morse's own fee, today</b>
          <code>nothing on top. you pay the networks directly</code>
        </div>
        {EXAMPLES.map(example => (
          <div key={example.title} className="cost__cell">
            <span className="amt">
              {example.amount}
              <small>a year</small>
            </span>
            <b>{example.title}</b>
            <code>{example.working}</code>
          </div>
        ))}
      </div>
      <p className="cost__ft">
        Morse adds no fee of its own today. Walrus bills $0.023 per GB a month on encoded size: about 4.5
        times the file, plus 64 MB per blob, which is why small files belong in a quilt. Sui gas and the
        Walrus write fee come on top and are small. Rate from the Walrus docs, 17 Nov 2026. Run{' '}
        <code>walrus info</code> for the live figure.
      </p>
    </div>
  )
}
