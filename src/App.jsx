import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AmbientCursor from './components/ui/AmbientCursor'
import CinematicIntro from './components/CinematicIntro'
import AmbientBackground from './components/AmbientBackground'

export default function App() {
  const lenisRef = useRef(null)
// ...existing code...
  return (
    <div className="site-shell bg-primary text-white min-h-screen font-sans">
      <CinematicIntro />
      <AmbientBackground />
      <AmbientCursor />
      <Navbar />
      <main>


        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
