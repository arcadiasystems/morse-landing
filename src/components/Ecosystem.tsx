import { useId, type ReactNode } from 'react'
import {
  DOCS_AGENT_COOKBOOK,
  DOCS_SITE_IMPORTER,
  ECOSYSTEM_LISTING,
  PRESS,
  UPLOADER_APP,
} from '../lib/links'
import { MORSE_WORDMARK } from '../lib/morse'
import { CtaLabel } from '../ui/Button'
import { Chip } from '../ui/Chip'
import { Lockup } from '../ui/Lockup'
import { MorseMark } from '../ui/MorseMark'
import { AgentPublisherMark, SiteImporterMark } from '../ui/ProductMarks'
import { PressTile, UploaderTile } from '../ui/ProductTiles'

const UPLOADER_TAGS = ['Non-custodial', 'Open source']

const UPLOADER_FACTS = [
  { value: '1 GiB', label: 'per file, in the browser' },
  { value: '666', label: 'files in one quilt' },
  { value: '0', label: 'keys held by us' },
]

/** Morse Uploader, the featured app. The whole card is the link. */
function UploaderCard() {
  const ctaId = useId()
  return (
    <a
      className="eco__feat on-ink"
      href={UPLOADER_APP}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby={ctaId}
    >
      <span className="sig" aria-hidden="true">
        {MORSE_WORDMARK}
      </span>
      <Lockup mark={<UploaderTile size={40} />} product="uploader" tone="uploader" />
      <h3>A transfer client for Walrus where your wallet holds the keys.</h3>
      <p>
        Stage a drop, see the price from chain, sign in your wallet, and watch the storage time left. Pack a
        folder as a quilt, verify a blob against its id, share a link, or attach a file to a Morse
        publication.
      </p>
      <div className="tags">
        <span className="tag on">Live</span>
        {UPLOADER_TAGS.map(tag => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="facts">
        {UPLOADER_FACTS.map(fact => (
          <div key={fact.label}>
            <b>{fact.value}</b>
            <span>{fact.label}</span>
          </div>
        ))}
      </div>
      <span className="host">uploader.morsecms.xyz</span>
      <CtaLabel tone="ultra" id={ctaId}>
        Open Morse Uploader
      </CtaLabel>
    </a>
  )
}

/** Morse Press, journals run by agents. The whole card is the link. */
function PressCard() {
  return (
    <a className="eco__press" href={PRESS}>
      <Lockup mark={<PressTile size={34} />} product="press" tone="press" />
      <p>
        Journals run by agents. Set the sources, the brain and the voice in a form, and it publishes for you,
        with a receipt on every post.
      </p>
      <div className="ft">
        <Chip tone="live">Live</Chip>
        <span className="go">
          Open Morse Press <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  )
}

/* The four layers Morse plugs into. Each cord leaves the plate at `from` and
   lands on its jack at `to`, on a 400-unit canvas stretched to the card, so
   the jack centres sit at 12.5, 37.5, 62.5 and 87.5 percent. */
const LAYERS = [
  { name: 'Walrus', role: 'holds the bytes', from: 170, to: 50 },
  { name: 'Sui', role: 'keeps the record', from: 190, to: 150 },
  { name: 'Seal', role: 'guards the keys', from: 210, to: 250 },
  { name: 'WalMem', role: 'agent memory', from: 230, to: 350 },
]

/** Seconds between one cord's pulse and the next. */
const CORD_STAGGER = 0.85

/** "Morse runs on": an ink plate, four cords and four plugged jacks. */
function Switchboard() {
  return (
    <div className="sw" role="group" aria-label="Morse runs on Walrus, Sui, Seal and WalMem">
      <h3 className="sw__plate">
        <MorseMark size={20} />
        MORSE RUNS ON
      </h3>
      <svg className="sw__cords" viewBox="0 0 400 88" preserveAspectRatio="none" aria-hidden="true">
        {LAYERS.map((layer, i) => {
          const cord = `M${layer.from} 0 C${layer.from} 62 ${layer.to} 30 ${layer.to} 88`
          return (
            <g key={layer.name}>
              <path pathLength={100} d={cord} />
              <path pathLength={100} className="sig" d={cord} style={{ animationDelay: `${i * CORD_STAGGER}s` }} />
            </g>
          )
        })}
      </svg>
      <ol className="sw__jacks">
        {LAYERS.map(layer => (
          <li key={layer.name}>
            <span className="jack" aria-hidden="true">
              <i />
            </span>
            <b>{layer.name}</b>
            <small>{layer.role}</small>
            <Chip tone="live">Live</Chip>
          </li>
        ))}
      </ol>
      <p className="sw__ft">Only the Sui contracts are the source of truth. Every other layer can be swapped.</p>
    </div>
  )
}

interface Recipe {
  /** The word set under "morse" in the lockup. */
  product: string
  mark: ReactNode
  title: string
  description: string
  /** Foot line: the recipe's kind and tooling. */
  kind: string
  link: string
}

/* Adding a recipe to the bottom row is one entry here; the open slot follows them. */
const RECIPES: Recipe[] = [
  {
    product: 'agent publisher',
    mark: <AgentPublisherMark size={32} />,
    title: 'Let any agent publish, under rights you can revoke.',
    description: 'A cookbook and a CLAUDE.md snippet to start from.',
    kind: 'Docs recipe · CLI or SDK',
    link: DOCS_AGENT_COOKBOOK,
  },
  {
    product: 'site importer',
    mark: <SiteImporterMark size={32} />,
    title: 'Bring a Hugo, Astro or Markdown site in.',
    description: 'One entry per post, safe to re-run, with CI publishing on push.',
    kind: 'Docs recipe · bash',
    link: DOCS_SITE_IMPORTER,
  },
]

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const titleId = useId()
  return (
    <a className="eco__item" href={recipe.link} aria-labelledby={titleId}>
      <div className="top">
        <Lockup mark={recipe.mark} product={recipe.product} />
        <Chip tone="live">Live</Chip>
      </div>
      <h3 id={titleId}>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <span className="m">{recipe.kind}</span>
    </a>
  )
}

/** The open slot that invites the next product. */
function ListingCard() {
  const titleId = useId()
  const goId = useId()
  return (
    <a
      className="eco__item cta"
      href={ECOSYSTEM_LISTING}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby={`${titleId} ${goId}`}
    >
      <div className="top">
        <span className="ic" aria-hidden="true">
          +
        </span>
      </div>
      <h3 id={titleId}>Your product here</h3>
      <p>
        Building on Morse? Open an issue with a link and a line about what it does. Anything that reads or
        writes Morse records qualifies.
      </p>
      <span className="go">
        <span id={goId}>Get listed</span> <span aria-hidden="true">→</span>
      </span>
    </a>
  )
}

/**
 * Built on the kit, part two: the Apps and Recipes rows. It continues the
 * Products section above and keeps the #ecosystem anchor the nav links to.
 */
export function Ecosystem() {
  const appsId = useId()
  return (
    <section className="eco" id="ecosystem" aria-labelledby={appsId}>
      <div className="container">
        <p className="rowlab">
          <b id={appsId}>Apps</b>open them today
        </p>
        <div className="eco__grid">
          <UploaderCard />
          <div className="eco__col">
            <PressCard />
            <Switchboard />
          </div>
        </div>
        <p className="rowlab">
          <b>Recipes</b>and a place for yours
        </p>
        <ul className="eco__list">
          {RECIPES.map(recipe => (
            <li key={recipe.product}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
          <li>
            <ListingCard />
          </li>
        </ul>
      </div>
    </section>
  )
}
