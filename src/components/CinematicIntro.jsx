import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Stars, Sparkles, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

function IntroScene({ onComplete }) {
  const cameraRef = useRef(null)
  const groupRef = useRef(null)
  const { pointer } = useThree()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (cameraRef.current) {
      // Cinematic Deep Dive: Accelerate forward on Z axis
      // Use a non-linear interpolation for a "warp" feel
      const targetZ = 0
      const currentZ = cameraRef.current.position.z
      const diff = currentZ - targetZ
      
      cameraRef.current.position.z -= diff * 0.03
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 0.25, 0.02)
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.02)
      
      // Cinematic rotation: subtle roll as we dive
      cameraRef.current.rotation.z = Math.sin(time * 0.5) * 0.1
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15
    }

    // Trigger completion when camera reaches target with a small threshold
    if (cameraRef.current && cameraRef.current.position.z < 1.0) {
      onComplete()
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1, 25]} fov={60} />
      <color attach="background" args={['#050816']} />
      <fog attach="fog" args={['#050816', 10, 40]} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b5cf6" />

      <Stars radius={150} depth={80} count={10000} factor={4} saturation={0} fade speed={1.5} />
      <Sparkles count={400} scale={[30, 30, 30]} size={0.4} speed={0.8} color="#7dd3fc" />

      <group ref={groupRef}>
        {/* Holographic Tunnels: Concentric rings that create a tunnel effect */}
        {[...Array(12)].map((_, i) => (
          <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <mesh position={[0, 0, -i * 4]}>
              <torusGeometry args={[3 + i * 0.3, 0.03, 16, 100]} />
              <meshBasicMaterial color="#3b82f6" transparent opacity={0.4 - i * 0.03} />
            </mesh>
          </Float>
        ))}

        {/* Floating Code Fragments / Geometry */}
        {[...Array(40)].map((_, i) => (
          <Float key={`geo-${i}`} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, -i * 3]} speed={1.2}>
            <mesh>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  )
}

export default function CinematicIntro() {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fallback to ensure intro finishes
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-primary flex items-center justify-center"
        >
          <Canvas>
            <IntroScene onComplete={() => setIsComplete(true)} />
          </Canvas>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                INITIALIZING <span className="text-blue-500">SYSTEM</span>
              </h1>
              <div className="h-1 w-48 bg-white/10 mx-auto overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-blue-500"
                />
              </div>
            </motion.div>
          </div>

          <button 
            onClick={() => setIsComplete(true)}
            className="absolute bottom-10 right-10 px-6 py-2 text-xs font-medium text-white/50 hover:text-white transition-colors uppercase tracking-widest z-transparent"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
