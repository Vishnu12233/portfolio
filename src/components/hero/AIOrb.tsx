import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
} from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useIsDesktop } from '../../hooks/useIsDesktop'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Quality = 'high' | 'low'

function OrbitalRing({
  radius,
  color,
  opacity,
  rotation,
  speed,
  reduced,
}: {
  radius: number
  color: string
  opacity: number
  rotation: [number, number, number]
  speed: number
  reduced: boolean
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current || reduced) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })

  return (
    <group rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 12, 180]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>
      <group ref={ref}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  )
}

function Core({
  reduced,
  quality,
}: {
  reduced: boolean
  quality: Quality
}) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)
  const high = quality === 'high'

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime

    if (!reduced) {
      group.current.rotation.y = t * 0.17 + state.pointer.x * 0.42
      group.current.rotation.x = Math.sin(t * 0.36) * 0.1 + state.pointer.y * 0.22
      group.current.rotation.z = Math.cos(t * 0.22) * 0.05
    }

    if (inner.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.025
      inner.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={inner}>
        <sphereGeometry args={[0.58, high ? 64 : 32, high ? 64 : 32]} />
        <MeshDistortMaterial
          color="#7C3AED"
          emissive="#2563EB"
          emissiveIntensity={1.25}
          roughness={0.24}
          metalness={0.35}
          distort={reduced ? 0.12 : 0.28}
          speed={reduced ? 0.4 : 1.8}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.82, high ? 64 : 32, high ? 64 : 32]} />
        <meshPhysicalMaterial
          color="#f5f3ff"
          transparent
          opacity={0.24}
          roughness={0.04}
          metalness={0.02}
          transmission={high ? 1 : 0}
          thickness={0.7}
          ior={1.42}
          clearcoat={1}
          clearcoatRoughness={0.08}
          attenuationColor="#c4b5fd"
          attenuationDistance={2.6}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.06, high ? 64 : 32, high ? 64 : 32]} />
        <meshPhysicalMaterial
          color="#e0e7ff"
          transparent
          opacity={0.16}
          roughness={0.02}
          metalness={0.05}
          transmission={high ? 0.92 : 0}
          thickness={0.5}
          ior={1.38}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          depthWrite={false}
        />
      </mesh>

      <OrbitalRing
        radius={1.42}
        color="#7C3AED"
        opacity={0.55}
        rotation={[Math.PI / 2.25, 0.28, 0.14]}
        speed={0.18}
        reduced={reduced}
      />
      <OrbitalRing
        radius={1.62}
        color="#06B6D4"
        opacity={0.4}
        rotation={[0.4, Math.PI / 3, 0.78]}
        speed={-0.13}
        reduced={reduced}
      />
      <OrbitalRing
        radius={1.26}
        color="#2563EB"
        opacity={0.3}
        rotation={[1.1, -0.35, 1.2]}
        speed={0.24}
        reduced={reduced}
      />

      {[
        { position: [1.92, 0.42, 0.3], size: 0.14, color: '#7C3AED' },
        { position: [-1.78, -0.48, 0.62], size: 0.12, color: '#06B6D4' },
        { position: [0.38, 1.82, -0.78], size: 0.1, color: '#2563EB' },
        { position: [-0.82, 1.34, 1.1], size: 0.09, color: '#A78BFA' },
        { position: [1.18, -1.52, -0.52], size: 0.11, color: '#67E8F9' },
        { position: [0.2, -1.82, 0.6], size: 0.08, color: '#7C3AED' },
      ].map((fragment, index) => (
        <Float
          key={index}
          speed={reduced ? 0.3 : 1.1 + index * 0.12}
          rotationIntensity={reduced ? 0.15 : 0.85}
          floatIntensity={reduced ? 0.2 : 0.9}
        >
          <mesh
            position={fragment.position as [number, number, number]}
            rotation={[index, index * 0.6, 0]}
          >
            {index % 2 === 0 ? (
              <octahedronGeometry args={[fragment.size, 0]} />
            ) : (
              <icosahedronGeometry args={[fragment.size, 0]} />
            )}
            <meshStandardMaterial
              color={fragment.color}
              emissive={fragment.color}
              emissiveIntensity={0.45}
              metalness={0.55}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

function ParticleField({
  count,
  reduced,
}: {
  count: number
  reduced: boolean
}) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)
    for (let index = 0; index < count; index++) {
      const radius = 2.2 + seededRandom(index + 1) * 2.6
      const theta = seededRandom(index + 2) * Math.PI * 2
      const phi = Math.acos(2 * seededRandom(index + 3) - 1)
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      values[index * 3 + 2] = radius * Math.cos(phi)
    }
    return values
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    if (!reduced) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.035
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color="#7C3AED"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Scene({
  reduced,
  quality,
  particles,
}: {
  reduced: boolean
  quality: Quality
  particles: number
}) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3.5, -2, 2]} intensity={2.2} color="#7C3AED" />
      <pointLight position={[3.4, 2.2, -2]} intensity={1.8} color="#06B6D4" />
      <pointLight position={[0, 0, 1]} intensity={0.7} color="#ffffff" />

      <Float
        speed={reduced ? 0.35 : 1.05}
        rotationIntensity={0.12}
        floatIntensity={reduced ? 0.2 : 0.55}
      >
        <Core reduced={reduced} quality={quality} />
      </Float>

      <ParticleField count={particles} reduced={reduced} />

      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={0.2}
        scale={7}
        blur={3.5}
        far={4}
        resolution={quality === 'high' ? 256 : 128}
        color="#7C3AED"
      />

      <Environment resolution={quality === 'high' ? 256 : 128} frames={1}>
        <Lightformer
          form="ring"
          intensity={3}
          position={[0, 5, -9]}
          scale={8}
          color="#c4b5fd"
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[-6, 1, 1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[10, 10, 1]}
          color="#bfdbfe"
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[6, -1, 1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[10, 10, 1]}
          color="#a5f3fc"
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          position={[0, -5, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 8, 1]}
          color="#ffffff"
        />
      </Environment>
    </>
  )
}

export function AIOrb() {
  const reduced = usePrefersReducedMotion()
  const isDesktop = useIsDesktop()
  const quality: Quality = isDesktop ? 'high' : 'low'
  const particles = reduced ? 50 : isDesktop ? 190 : 80

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={isDesktop ? [1, 1.5] : [1, 1.15]}
        camera={{ position: [0, 0, 5.35], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene reduced={reduced} quality={quality} particles={particles} />
      </Canvas>
    </div>
  )
}
