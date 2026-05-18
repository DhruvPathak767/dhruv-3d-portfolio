import { motion } from 'framer-motion'

export default function Reveal({ children, className = '', delay = 0, y = 34, as = 'div' }) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  )
}
