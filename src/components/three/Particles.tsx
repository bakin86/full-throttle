"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 200;

export function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spread particles in a volume around the scene
      pos[i3] = (Math.random() - 0.5) * 40;
      pos[i3 + 1] = Math.random() * 15;
      pos[i3 + 2] = (Math.random() - 0.5) * 60 - 10;

      // Slow drift velocities
      vel[i3] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Reset particles that drift too far
      if (Math.abs(posArray[i3]) > 25) velocities[i3] *= -1;
      if (posArray[i3 + 1] > 15 || posArray[i3 + 1] < 0)
        velocities[i3 + 1] *= -1;
      if (Math.abs(posArray[i3 + 2] + 10) > 35) velocities[i3 + 2] *= -1;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
