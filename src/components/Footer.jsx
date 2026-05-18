import { socialLinks } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a className="footer-logo" href="#home" aria-label="Dhruv Pathak home">
          DP
        </a>
        <div className="footer-line" aria-hidden="true" />
        <div className="footer-socials">
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
        <p>© 2026 Dhruv Pathak. All rights reserved.</p>
      </div>
    </footer>
  )
}
