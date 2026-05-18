import { useState } from 'react'
import { FiArrowUpRight, FiSend } from 'react-icons/fi'
import { contactCards, profile, socialLinks } from '../data/portfolio'
import MagneticButton from './ui/MagneticButton'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section section-contact">
      <div className="container">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build scalable MERN products with a sharp AI workflow."
          description="For collaborations, internship conversations, hackathon builds, and full stack web development opportunities."
        />

        <div className="contact-layout">
          <Reveal className="contact-info glass-glow">
            <div className="contact-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h3>Dhruv Pathak</h3>
            <p>{profile.role}</p>
            <div className="contact-cards">
              {contactCards.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <Icon />
                    <span>
                      <small>{item.label}</small>
                      {item.value}
                    </span>
                  </>
                )

                return item.href ? (
                  <a key={item.label} href={item.href}>
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>
            <div className="contact-socials">
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
          </Reveal>

          <Reveal className="contact-form-wrap glass-glow" delay={0.08}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input name="name" value={form.name} onChange={handleChange} autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" value={form.message} onChange={handleChange} rows="6" required />
              </label>
              <MagneticButton variant="primary" type="submit" className="form-submit">
                <FiSend />
                <span>Send Message</span>
                <FiArrowUpRight />
              </MagneticButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
