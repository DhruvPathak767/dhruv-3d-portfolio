import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll()
  const scrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  // Create a subtle shift in background glow based on scroll
  const bgX = useTransform(scrollY, [0, 1], ['0%', '2%'])
  const bgY = useTransform(scrollY, [0, 1], ['0%', '2%'])
  const opacity = useTransform(scrollY, [0, 0.1], [0.4, 0.7])

  return (
    <div className="ambient-background-system" style={{ 
      position: 'fixed', 
      inset: 0, 
      pointerEvents: 'none', 
      zIndex: -1,
      overflow: 'hidden' 
    }}>
      {/* Animated Grid Overlay */}
      <div className="ambient-grid" style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        opacity: 0.5,
      }} />

      {/* Floating Dust Particles */}
      <div className="ambient-particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="ambient-particle"
            initial={{ 
              x: Math.random() * 100 + 'vw', 
              y: Math.random() * 100 + 'vh', 
              opacity: Math.random() * 0.5 
            }}
            animate={{ 
              y: [0, -100], 
              opacity: [0.2, 0.5, 0.2],
              x: (Math.random() - 0.5) * 50 
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              position: 'absolute',
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              backgroundColor: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
              borderRadius: '50%',
              filter: 'blur(1px)',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Dynamic Glow Pulses */}
      <motion.div 
        className="ambient-glow-pulse"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          borderRadius: '50%'
        }}
      />
      <motion.div 
        className="ambient-glow-pulse"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%'
        }}
      />
    </div>
  )
}
