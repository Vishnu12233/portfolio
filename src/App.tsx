import { useCallback, useState } from 'react'
import { About } from './components/about/About'
import { Contact } from './components/contact/Contact'
import { Education } from './components/education/Education'
import { Hero } from './components/hero/Hero'
import { CustomCursor } from './components/layout/CustomCursor'
import { Footer } from './components/layout/Footer'
import { Loader } from './components/layout/Loader'
import { Navbar } from './components/layout/Navbar'
import { PageProgress } from './components/layout/PageProgress'
import { Projects } from './components/projects/Projects'
import { Services } from './components/services/Services'
import { Skills } from './components/skills/Skills'

export default function App() {
  const [ready, setReady] = useState(false)
  const onLoaderComplete = useCallback(() => setReady(true), [])

  return (
    <>
      <Loader onComplete={onLoaderComplete} />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />
      <a
        href="#main"
        className="focus-ring fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      {ready ? <PageProgress /> : null}

      <div
        className={
          ready
            ? 'opacity-100 transition-opacity duration-700'
            : 'pointer-events-none opacity-0'
        }
      >
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
