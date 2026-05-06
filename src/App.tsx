import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { Architecture } from './components/Architecture'
import { CodeSection } from './components/CodeSection'
import { WhyMorse } from './components/WhyMorse'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Architecture />
        <CodeSection />
        <WhyMorse />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
