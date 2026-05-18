import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function CinematicSection({ children, id, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax movement for the entire section content
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])

  // Smooth out the parallax movement
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 1 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30, mass: 1 })

  return (
    <section 
      id={id} 
      ref={ref} 
      className={`section ${className}`}
      style={{ position: 'relative' }}
    >
      <motion.div 
        style={{ 
          y: smoothY, 
          opacity, 
          scale: smoothScale,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  )
}
