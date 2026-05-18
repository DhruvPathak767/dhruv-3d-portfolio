import { skills } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import TiltCard from './ui/TiltCard'

export default function Skills() {
  const maxCount = Math.max(...skills.map((group) => group.skills.length))

  return (
    <section id="skills" className="section section-skills">
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="Interactive stack map for modern full stack delivery."
          description="A focused toolkit across frontend, backend, databases, AI-assisted development, and deployment workflows."
        />

        <div className="skills-grid">
          {skills.map((group, index) => {
            const CategoryIcon = group.icon
            const coverage = `${(group.skills.length / maxCount) * 100}%`

            return (
              <TiltCard key={group.category} className="skill-category" delay={index * 0.06}>
                <div className="skill-category-head">
                  <span style={{ '--accent': group.accent }}>
                    <CategoryIcon />
                  </span>
                  <div>
                    <h3>{group.category}</h3>
                    <p>{group.skills.length} tools</p>
                  </div>
                </div>
                <div className="skill-meter" aria-hidden="true">
                  <span style={{ width: coverage, background: `linear-gradient(90deg, ${group.accent}, #ffffff)` }} />
                </div>
                <div className="skill-list">
                  {group.skills.map((skill) => {
                    const SkillIcon = skill.icon
                    return (
                      <div key={skill.name} className="skill-pill" style={{ '--accent': group.accent }}>
                        <SkillIcon />
                        <span>{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
