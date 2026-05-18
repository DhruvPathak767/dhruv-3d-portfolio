import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, Float, PerspectiveCamera, Sparkles, Stars, MeshDistortMaterial, GradientTexture } from '@react-three/drei'
import * as THREE from 'three'

function SceneRig({ children }) {
  const group = useRef(null)
  const { pointer } = useThree()

  useFrame(() => {
    if (!group.current) return

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.18, 0.045)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.08, 0.045)
  })

  return <group ref={group}>{children}</group>
}

function AnimatedCamera() {
  const camera = useRef(null)
  const { pointer } = useThree()

  useFrame((state) => {
    if (!camera.current) return

    const time = state.clock.elapsedTime
    
    // Cinematic drift: subtle floating movement independent of mouse
    const driftX = Math.sin(time * 0.3) * 0.1
    const driftY = Math.cos(time * 0.2) * 0.1

    // Smooth inertia-based mouse response
    camera.current.position.x = THREE.MathUtils.lerp(
      camera.current.position.x, 
      pointer.x * 0.6 + driftX, 
      0.025
    )
    camera.current.position.y = THREE.MathUtils.lerp(
      camera.current.position.y,
      0.25 + pointer.y * 0.3 + driftY,
      0.025,
    )
    
    // Depth movement: subtle Z-axis oscillation for "breathing" effect
    camera.current.position.z = 5.35 + Math.sin(time * 0.5) * 0.15

    camera.current.lookAt(0, 0.15, 0)
  })

  return <PerspectiveCamera ref={camera} makeDefault position={[0, 0.25, 5.35]} fov={45} />
}

function HolographicPanel({ position, rotation, title, lines, accent = '#3b82f6' }) {
  const titleWidth = Math.min(1.32, 0.26 + title.length * 0.038)

  return (
    <Float speed={1.2} rotationIntensity={0.28} floatIntensity={0.32}>
      <group position={position} rotation={rotation}>
        <mesh>
          <planeGeometry args={[1.9, 1.08]} />
          <meshStandardMaterial
            color="#10213f"
            emissive={accent}
            emissiveIntensity={0.35}
            roughness={0.42}
            metalness={0.55}
            transparent
            opacity={0.34}
            side={THREE.DoubleSide}
          />
          <Edges color={accent} scale={1.01} />
        </mesh>
        <mesh position={[-0.84 + titleWidth / 2, 0.38, 0.026]}>
          <planeGeometry args={[titleWidth, 0.04]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.86} />
        </mesh>
        {lines.map((line, index) => (
          <mesh key={line} position={[-0.84 + (1.05 - index * 0.12) / 2, 0.16 - index * 0.18, 0.026]}>
            <planeGeometry args={[1.05 - index * 0.12, 0.032]} />
            <meshBasicMaterial color={index === 0 ? accent : '#94a3b8'} transparent opacity={index === 0 ? 0.9 : 0.58} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function TechSymbols() {
  const symbols = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 12,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.05 + Math.random() * 0.15,
      speed: 0.1 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  return (
    <group>
      {symbols.map((s, i) => (
        <Float 
          key={i} 
          position={s.position} 
          rotation={s.rotation} 
          speed={s.speed} 
          floatIntensity={0.6}
          rotationIntensity={0.5}
        >
          <mesh>
            <torusGeometry args={[0.1, 0.02, 16, 32]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              emissive="#3b82f6" 
              emissiveIntensity={0.8} 
              transparent 
              opacity={0.3 + Math.sin(s.phase) * 0.2} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function NeonTrails() {
  const lineRef = useRef([])
  const count = 60

  const points = useMemo(() => {
    const p = []
    for (let i = 0; i < count; i++) {
      p.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 18),
        speed: 0.001 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
      })
    }
    return p
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    // We don't use lineRef here because we are using Float, 
    // but we can add a custom group for global movement
  })

  return (
    <group>
      {points.map((p, i) => (
        <Float 
          key={i} 
          position={p.pos} 
          speed={1 + p.speed * 100} 
          floatIntensity={0.3}
          rotationIntensity={0.2}
        >
          <mesh>
            <cylinderGeometry args={[0.004, 0.004, 0.6, 8]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              emissive="#3b82f6" 
              emissiveIntensity={1.5} 
              transparent 
              opacity={0.4 + Math.sin(p.phase) * 0.2} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Workstation() {
  const screen = useRef(null)
  const keys = Array.from({ length: 10 }, (_, index) => index)

  useFrame((state) => {
    if (!screen.current) return
    screen.current.material.emissiveIntensity = 0.75 + Math.sin(state.clock.elapsedTime * 2.4) * 0.18
  })

  return (
    <group position={[0, -0.58, 0]} rotation={[0.02, -0.15, 0]}>
      <mesh position={[0, -0.35, 0]} receiveShadow>
        <boxGeometry args={[3.65, 0.08, 1.55]} />
        <meshStandardMaterial color="#111827" metalness={0.55} roughness={0.32} />
      </mesh>

      <group position={[0, 0.18, -0.08]}>
        <mesh position={[0, 0.54, 0]}>
          <boxGeometry args={[1.9, 1.08, 0.08]} />
          <meshStandardMaterial color="#050816" metalness={0.65} roughness={0.2} />
          <Edges color="#3b82f6" />
        </mesh>
        <mesh ref={screen} position={[0, 0.54, 0.045]}>
          <planeGeometry args={[1.7, 0.9]} />
          <meshStandardMaterial color="#081225" emissive="#3b82f6" emissiveIntensity={0.8} transparent opacity={0.92} />
        </mesh>
        {[
          ['#7dd3fc', 1.28, 0.82],
          ['#a78bfa', 1.05, 0.62],
          ['#94a3b8', 0.82, 0.43],
        ].map(([color, width, y]) => (
          <mesh key={`${color}-${y}`} position={[-0.74 + width / 2, y, 0.095]}>
            <planeGeometry args={[width, 0.035]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
          </mesh>
        ))}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.12, 0.48, 0.08]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, -0.31, 0.06]}>
          <boxGeometry args={[0.62, 0.08, 0.34]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} />
        </mesh>
      </group>

      <group position={[0, -0.26, 0.55]}>
        <mesh>
          <boxGeometry args={[1.42, 0.07, 0.42]} />
          <meshStandardMaterial color="#0f172a" metalness={0.48} roughness={0.35} />
          <Edges color="#8b5cf6" />
        </mesh>
        {keys.map((key) => (
          <mesh key={key} position={[-0.57 + key * 0.126, 0.055, 0]}>
            <boxGeometry args={[0.08, 0.025, 0.22]} />
            <meshStandardMaterial color={key % 3 === 0 ? '#3b82f6' : '#1e293b'} emissive="#3b82f6" emissiveIntensity={0.18} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function OrbitingTech() {
  const group = useRef(null)
  const labels = ['React', 'Node', 'API', 'AI', 'DB']

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.24
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.42) * 0.08
  })

  return (
    <group ref={group} position={[0.05, 0.15, 0.1]}>
      {labels.map((label, index) => {
        const angle = (index / labels.length) * Math.PI * 2
        const x = Math.cos(angle) * 1.85
        const z = Math.sin(angle) * 1.2
        const y = 0.5 + Math.sin(angle) * 0.25

        return (
          <Float key={label} speed={1.5 + index * 0.12} floatIntensity={0.42} rotationIntensity={0.3}>
            <group position={[x, y, z]} rotation={[0, -angle, 0]}>
              <mesh>
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshStandardMaterial
                  color={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
                  emissive={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
                  emissiveIntensity={0.72}
                  roughness={0.2}
                  metalness={0.45}
                />
              </mesh>
              <mesh position={[0, -0.34, 0]}>
                <boxGeometry args={[0.28 + label.length * 0.018, 0.026, 0.026]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
              </mesh>
            </group>
          </Float>
        )
      })}
    </group>
  )
}

function EnergyRings() {
  const ring = useRef(null)

  useFrame((state) => {
    if (!ring.current) return
    ring.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    ring.current.rotation.z = state.clock.elapsedTime * 0.15
  })

  return (
    <group ref={ring} position={[0, -0.42, 0]}>
      {[1.35, 1.82, 2.25].map((radius, index) => (
        <mesh key={radius}>
          <torusGeometry args={[radius, 0.008, 12, 120]} />
          <meshBasicMaterial color={index === 1 ? '#8b5cf6' : '#3b82f6'} transparent opacity={0.34 - index * 0.06} />
        </mesh>
      ))}
    </group>
  )
}

function DeveloperWorld() {
  return (
    <>
      <color attach="background" args={['#050816']} />
      <fog attach="fog" args={['#050816', 8, 18]} />
      <ambientLight intensity={0.6} />
      <AnimatedCamera />
      
      {/* Dynamic Lighting System */}
      <pointLight position={[-4, 3, 2]} intensity={4} color="#3b82f6" />
      <pointLight position={[4, 2, 3]} intensity={3} color="#8b5cf6" />
      <spotLight position={[0, 5, 4]} angle={0.5} penumbra={0.8} intensity={3} color="#ffffff" />
      
      <Stars radius={50} depth={30} count={1500} factor={4} saturation={0} fade speed={0.3} />
      <Sparkles count={100} scale={[6, 4, 4]} size={1.2} speed={0.4} color="#7dd3fc" opacity={0.4} />

      <SceneRig>
        <EnergyRings />
        <Workstation />
        <OrbitingTech />
        <TechSymbols />
        <NeonTrails />
        <HolographicPanel
          position={[-1.8, 0.7, -0.4]}
          rotation={[0.08, 0.6, 0.03]}
          title="MERN SYSTEM"
          lines={['Node + Express', 'MongoDB data flow', 'REST API layer']}
          accent="#3b82f6"
        />
        <HolographicPanel
          position={[1.8, 0.9, -0.2]}
          rotation={[0.08, -0.6, -0.03]}
          title="AI WORKFLOW"
          lines={['Copilot + Cursor', 'Rapid prototype loop', 'Clean handoff']}
          accent="#8b5cf6"
        />
      </SceneRig>
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.55]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <DeveloperWorld />
    </Canvas>
  )
}
