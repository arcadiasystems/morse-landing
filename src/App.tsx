import { SiteNav } from './components/SiteNav'
import { SignalHero } from './components/SignalHero'
import { SignalTicker } from './components/SignalTicker'
import { Transmission } from './components/Transmission'
import { LiveSignal } from './components/LiveSignal'
import { CapabilitiesBento } from './components/CapabilitiesBento'
import { InfraShift } from './components/InfraShift'
import { ProtocolStack } from './components/ProtocolStack'
import { AgentConsole } from './components/AgentConsole'
import { FailureModes } from './components/FailureModes'
import { FinalTransmission } from './components/FinalTransmission'
import { SiteFooter } from './components/SiteFooter'
import { MorseDivider } from './ui/MorseDivider'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <SiteNav />
      <main id="main" style={{ paddingTop: 'var(--nav-offset)' }}>
        <SignalHero />
        <SignalTicker />
        <Transmission />
        <LiveSignal />
        <CapabilitiesBento />
        <MorseDivider word="VERIFY" />
        <InfraShift />
        <ProtocolStack />
        <AgentConsole />
        <MorseDivider word="SIGNAL" />
        <FailureModes />
        <FinalTransmission />
      </main>
      <SiteFooter />
    </>
  )
}
