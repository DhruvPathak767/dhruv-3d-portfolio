import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { projects } from '../data/portfolio'
import MagneticButton from './ui/MagneticButton'
import SectionHeader from './ui/SectionHeader'
import TiltCard from './ui/TiltCard'
import CinematicSection from './ui/CinematicSection'

export default function Projects() {
  return (
    <CinematicSection id="projects" className="section-projects">
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="Futuristic project cards with practical full stack substance."
          description="Featured work spanning donation management, coding club web presence, and upcoming AI-powered SaaS direction."
        />

        <div className="projects-grid">
          {projects.map((project, index) => (
            <TiltCard key={project.title} className="project-card holographic-card" delay={index * 0.12}>
              <div className="project-preview">
                <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                {project.upcoming ? <span className="project-ribbon">Upcoming</span> : null}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="badge-row">
                  {project.stack.map((item) => (
                    <span key={item} className="project-badge">{item}</span>
                  ))}
                </div>
                {project.details.length ? (
                  <ul className="project-details">
                    {project.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <div className="project-actions">
                  <MagneticButton 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    variant="icon" 
                    disabled={!project.github} 
                    ariaLabel={`${project.title} GitHub`}
                  >
                    <FaGithub />
                    <span className="action-label">GitHub</span>
                  </MagneticButton>
                  <MagneticButton
                    href={project.live}
                    target={project.live ? '_blank' : undefined}
                    rel={project.live ? 'noreferrer' : undefined}
                    disabled={!project.live}
                    variant="icon"
                    ariaLabel={`${project.title} live demo`}
                  >
                    <FiExternalLink />
                    <span className="action-label">Live demo</span>
                  </MagneticButton>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </CinematicSection>
  )
}
