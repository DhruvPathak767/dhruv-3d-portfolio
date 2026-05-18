import Reveal from './Reveal'

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <Reveal className="section-header">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </Reveal>
  )
}
