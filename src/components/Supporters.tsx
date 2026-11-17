import { MystenLabsLogo, SealWordmark, SuiLogo, WalrusWordmark } from '../ui/PartnerLogos'

/** Partner shelf: a paper card that straddles the hero's bottom edge. Cells stay unlinked. */
export function Supporters() {
  return (
    <section className="shelf-sec" aria-labelledby="supporters-title">
      <div className="container">
        <div className="shelf">
          <div className="shelf__label">
            <h2 id="supporters-title">Supported by</h2>
            <span>Walrus Foundation grant · open source, MIT</span>
          </div>
          <ul className="shelf__logos">
            <li>
              <MystenLabsLogo className="mysten" />
            </li>
            <li>
              <WalrusWordmark className="walrus" />
            </li>
            <li>
              <SuiLogo className="sui" />
            </li>
            <li>
              <SealWordmark className="seal" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
