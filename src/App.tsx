import { SiteNav } from './components/SiteNav'
import { Hero } from './components/Hero'
import { Supporters } from './components/Supporters'
import { Statement } from './components/Statement'
import { UseCases } from './components/UseCases'
import { HowItWorks } from './components/HowItWorks'
import { ForDevelopers } from './components/ForDevelopers'
import { LiveDemo } from './components/LiveDemo'
import { Ecosystem } from './components/Ecosystem'
import { Roadmap } from './components/Roadmap'
import { FinalCta } from './components/FinalCta'
import { SiteFooter } from './components/SiteFooter'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <Supporters />
        <Statement />
        <UseCases />
        <HowItWorks />
        <ForDevelopers />
        <LiveDemo />
        <Ecosystem />
        <Roadmap />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
