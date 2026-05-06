import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { LogoMarquee } from './components/LogoMarquee'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import InfraSection from './components/InfraSection'
import { Architecture } from './components/Architecture'
import { CodeSection } from './components/CodeSection'
import { WhyMorse } from './components/WhyMorse'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '104px' }}>
        <Hero />
        <LogoMarquee />
        <HowItWorks />
        <Features />
        <InfraSection />
        <Architecture />
        <CodeSection />
        <WhyMorse />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
