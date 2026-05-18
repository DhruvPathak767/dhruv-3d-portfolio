import { FiAward } from 'react-icons/fi'
import { certifications } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import TiltCard from './ui/TiltCard'

export default function Certifications() {
  return (
    <section id="certifications" className="section section-certifications">
      <div className="container">
        <SectionHeader
          eyebrow="Certifications"
          title="Hackathon credentials with a polished badge system."
          description="Recognitions and participation credentials from university hackathon environments."
        />

        <div className="cert-grid">
          {certifications.map((certification, index) => (
            <TiltCard key={certification.title} className="cert-card" delay={index * 0.08}>
              <div className="cert-icon">
                <FiAward />
              </div>
              <span>{certification.date}</span>
              <h3>{certification.title}</h3>
              <p>{certification.issuer}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
