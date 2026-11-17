import { DOCS_CONTRACTS, QUICK_START } from '../lib/links'
import { Cta } from '../ui/Button'

interface Track {
  name: string
  /** Left of the TODAY line: what works now. */
  today: string
  /** Right of the line: what is next, and its target. Never described as live. */
  next: string
  target: string
}

const TRACKS: Track[] = [
  { name: 'Sign-in', today: 'A Sui wallet or a key', next: 'Social and zkLogin sign-in', target: 'Q4 2026' },
  { name: 'Paying', today: 'SUI for gas, WAL for storage', next: 'Card on-ramps', target: 'Q4 2026' },
  {
    name: 'Starting point',
    today: 'Quick starts, cookbooks, llms.txt',
    next: 'One official starter, the agent template',
    target: '60 DAYS',
  },
  { name: 'Stability', today: 'Pre-1.0 SDK and CLI', next: 'SDK 1.0 and a stable CLI', target: 'Q4 2026' },
]

/** A four-track mini roadmap: one TODAY line crosses every track, solid before it and dashed after. */
export function Tracks() {
  return (
    <div className="tn">
      <h3>What is true today, and what is next.</h3>
      <div className="trk" role="group" aria-label="What works today and what is next, by track">
        <span className="trk__side l">SHIPPED</span>
        <span className="trk__now">TODAY</span>
        <span className="trk__side r">NEXT</span>
        {TRACKS.map(track => (
          <div key={track.name} className="trk__row">
            <b>{track.name}</b>
            <div className="trk__line" aria-hidden="true">
              <i className="a" />
              <i className="n" />
              <i className="z" />
            </div>
            <div className="trk__txt">
              <span>{track.today}</span>
              <em>
                {track.next}
                <small>{track.target}</small>
              </em>
            </div>
          </div>
        ))}
      </div>
      <p className="note">
        A developer with a funded wallet publishes in about five minutes. Everything right of the line is
        what turns the kit into something you drop in. Dates are targets. Encryption works out of the box
        on testnet; on mainnet, Seal needs your own key-server credentials.
      </p>
      <div className="tn__btns">
        <Cta tone="ink" size="md" href={QUICK_START}>
          Quick start
        </Cta>
        <Cta tone="outline-dark" size="md" href={DOCS_CONTRACTS}>
          Contracts
        </Cta>
      </div>
    </div>
  )
}
