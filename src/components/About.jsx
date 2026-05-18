import { motion } from 'framer-motion'
import { aboutHighlights, stats } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import TiltCard from './ui/TiltCard'
import Reveal from './ui/Reveal'

export default function About() {
  return (
    <section id="about" className="section section-about">
      <div className="container">
        <SectionHeader
          eyebrow="About"
          title="A full stack builder blending MERN systems with AI-assisted speed."
          description="Dhruv Pathak builds scalable applications with a strong frontend and backend foundation, rapid prototyping habits, hackathon-tested collaboration, and a user-centric design approach."
        />

        <div className="about-layout">
          <Reveal className="about-panel glass-glow">
            <p>
              Focused on MERN stack development, Dhruv combines clean interface execution with backend services,
              authentication flows, API design, and data flow management. His workflow uses AI-powered development
              tools to move quickly while keeping the experience professional, scalable, and practical for real users.
            </p>
            <div className="highlight-grid">
              {aboutHighlights.map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </Reveal>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <TiltCard key={stat.label} className="stat-card" delay={index * 0.06}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.detail}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
