const CHORES = ['uploads', 'versions', 'encryption', 'access rules', 'proof of what was stored']

export function Statement() {
  return (
    <section className="statement" aria-labelledby="statement-title">
      <div className="container">
        <p className="eyebrow">Why a kit</p>
        <h2 id="statement-title" className="statement__line">
          Every app on Walrus ends up building the same five things.
        </h2>
        <ul className="chores">
          {CHORES.map(chore => (
            <li key={chore}>{chore}</li>
          ))}
        </ul>
        <p className="statement__line">
          Morse is that layer, built once and recorded on Sui. <em>You install it.</em>
        </p>
      </div>
    </section>
  )
}
