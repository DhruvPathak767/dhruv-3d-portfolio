import { education } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import CinematicSection from './ui/CinematicSection'

export default function Education() {
  return (
    <CinematicSection id="education" className="section-education">
      <div className="container">
        <SectionHeader
          eyebrow="Education"
          title="Academic foundation and technical specialization."
          description="A journey of continuous learning, from core engineering principles to advanced full-stack development."
        />

        <div className="timeline">
          {education.map((edu, index) => (
            <Reveal key={`${edu.degree}-${edu.duration}`} className="timeline-item" delay={index * 0.12}>
              <div className="timeline-node" aria-hidden="true" />
              <div className="timeline-card glass-glow">
                <div className="timeline-meta">
                  <span className="timeline-date">{edu.duration}</span>
                </div>
                <h3 className="education-degree">{edu.degree}</h3>
                <p className="education-institute">{edu.institute}</p>
                <ul className="education-details">
                  {edu.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
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
