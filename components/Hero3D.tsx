'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import type { Group } from 'three';

// The glowing blob + orbiting rings. Tilts gently toward the mouse.
function Scene({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current || !animate) return;
    const { x, y } = state.pointer; // -1..1
    group.current.rotation.y += (x * 0.5 - group.current.rotation.y) * delta * 2;
    group.current.rotation.x += (-y * 0.3 - group.current.rotation.x) * delta * 2;
  });

  return (
    <group ref={group}>
      <Float speed={animate ? 1.5 : 0} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh scale={1.6}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color="#3b82f6"
            emissive="#4c1d95"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.35}
            distort={0.4}
            speed={animate ? 2 : 0}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.6, 0.015, 16, 120]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.6, 0]}>
        <torusGeometry args={[3.1, 0.01, 16, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </mesh>

      <Sparkles count={60} scale={7} size={2} speed={animate ? 0.4 : 0} color="#93c5fd" />
    </group>
  );
}

export default function Hero3D() {
  // Respect "reduce motion" accessibility settings: draw once, don't animate.
  const animate =
    typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]} // cap resolution so cheap phones stay smooth
      frameloop={animate ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#8b5cf6" />
      <pointLight position={[4, 2, -2]} intensity={20} color="#22d3ee" />
      <Scene animate={animate} />
    </Canvas>
  );
}
