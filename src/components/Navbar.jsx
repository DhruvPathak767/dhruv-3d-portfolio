import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { navItems } from '../data/portfolio'
import MagneticButton from './ui/MagneticButton'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24 })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18)
      
      // Simple intersection observer for active state
      navItems.forEach(item => {
        const element = document.querySelector(item.href)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveItem(item.href)
          }
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <nav className="nav-inner" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Dhruv Pathak home">
          <span>DP</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <motion.a 
              key={item.href} 
              href={item.href}
              className={`nav-item ${activeItem === item.href ? 'is-active' : ''}`}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {item.label}
              {activeItem === item.href && (
                <motion.div 
                  layoutId="nav-active"
                  className="nav-indicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        <button className="nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
