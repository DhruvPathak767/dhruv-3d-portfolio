import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children, className = '', glow = true, delay = 0 }) {
  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)
  const rotateX = useSpring(rotateXValue, { stiffness: 120, damping: 25, mass: 0.8 })
  const rotateY = useSpring(rotateYValue, { stiffness: 120, damping: 25, mass: 0.8 })
  const shineX = useTransform(rotateY, [-10, 10], ['-10%', '110%'])
  const shineY = useTransform(rotateX, [-10, 10], ['110%', '-10%'])

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    
    // Enhanced tilt range for more cinematic feel
    rotateYValue.set((px - 0.5) * 15)
    rotateXValue.set((0.5 - py) * 12)
  }

  const reset = () => {
    rotateXValue.set(0)
    rotateYValue.set(0)
  }

  return (
    <motion.div
      className={`tilt-card ${glow ? 'tilt-card-glow' : ''} ${className}`}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <motion.span className="tilt-shine" style={{ left: shineX, top: shineY }} aria-hidden="true" />
      <div className="tilt-inner">{children}</div>
    </motion.div>
  )
}
