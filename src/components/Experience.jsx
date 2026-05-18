import { FiMapPin } from 'react-icons/fi'
import { experiences } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import CinematicSection from './ui/CinematicSection'

export default function Experience() {
  return (
    <CinematicSection id="experience" className="section-experience">
      <div className="container">
        <SectionHeader
          eyebrow="Experience"
          title="Hackathon velocity and backend ownership."
          description="A timeline shaped by MERN builds, fast team execution, backend systems, and AI-assisted development."
        />

        <div className="timeline">
          {experiences.map((experience, index) => (
            <Reveal key={`${experience.role}-${experience.duration}`} className="timeline-item" delay={index * 0.12}>
              <div className="timeline-node" aria-hidden="true" />
              <div className="timeline-card glass-glow">
                <div className="timeline-meta">
                  <span>{experience.duration}</span>
                  {experience.location ? (
                    <span>
                      <FiMapPin />
                      {experience.location}
                    </span>
                  ) : null}
                </div>
                <h3>{experience.role}</h3>
                {experience.organization ? <p className="timeline-org">{experience.organization}</p> : null}
                <ul>
                  {experience.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </CinematicSection>
  )
}
