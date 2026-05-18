import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  download = false,
  disabled = false,
  target,
  rel,
  type = 'button',
  ariaLabel,
}) {
  const x = useSpring(useMotionValue(0), { stiffness: 120, damping: 12, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 120, damping: 12, mass: 0.5 })
  const Component = href && !disabled ? motion.a : motion.button

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    
    // Calculate distance from center for a more natural magnetic pull
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dist = Math.hypot(event.clientX - centerX, event.clientY - centerY)
    const maxDist = 60
    
    // Only apply magnetic effect if within range, with a smooth falloff
    const strength = Math.max(0, 1 - dist / maxDist)
    x.set((event.clientX - centerX) * 0.3 * strength)
    y.set((event.clientY - centerY) * 0.3 * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const props =
    href && !disabled
      ? { href, download, target, rel, 'aria-label': ariaLabel }
      : { type, onClick, disabled, 'aria-label': ariaLabel }

  return (
    <Component
      {...props}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: disabled ? 1 : 1.035 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`magnetic-button magnetic-${variant} ${disabled ? 'is-disabled' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}
