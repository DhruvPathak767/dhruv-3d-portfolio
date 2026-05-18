import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function AmbientCursor() {
  const x = useSpring(useMotionValue(-120), { stiffness: 90, damping: 28 })
  const y = useSpring(useMotionValue(-120), { stiffness: 90, damping: 28 })

  useEffect(() => {
    const handleMove = (event) => {
      x.set(event.clientX - 160)
      y.set(event.clientY - 160)
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [x, y])

  return <motion.div className="ambient-cursor" style={{ x, y }} aria-hidden="true" />
}
