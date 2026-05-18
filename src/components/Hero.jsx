import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi'
import { heroActions, profile, socialLinks } from '../data/portfolio'
import MagneticButton from './ui/MagneticButton'

const HeroScene = lazy(() => import('./three/HeroScene'))

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-noise" aria-hidden="true" />
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-kicker">
            <span />
            AI-powered full stack engineer portfolio
          </div>
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-subtitle">{profile.subtitle}</p>

          <div className="hero-actions">
            {heroActions.map((action) => (
              <MagneticButton key={action.label} href={action.href} variant={action.variant} download={action.download}>
                <span>{action.label}</span>
                <FiArrowUpRight />
              </MagneticButton>
            ))}
          </div>

          <div className="social-row" aria-label="Social links">
            {socialLinks.map((item) => {
              const Icon = item.icon
              return item.href ? (
                <a key={item.label} href={item.href} aria-label={item.label} title={item.label}>
                  <Icon />
                </a>
              ) : (
                <button key={item.label} type="button" aria-label={item.label} title={item.label}>
                  <Icon />
                </button>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Suspense fallback={<div className="hero-canvas-fallback" aria-hidden="true" />}>
            <HeroScene />
          </Suspense>
          <div className="hero-status-panel">
            <span>Backend</span>
            <strong>Node.js + Express.js</strong>
          </div>
          <div className="hero-code-panel">
            <span>workflow.run()</span>
            <strong>MERN + AI Tools</strong>
          </div>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <FiChevronDown />
      </a>
    </section>
  )
}
