"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

useGLTF.preload("/models/f1car.glb");

export function F1Car() {
  const { scene } = useGLTF("/models/f1car.glb", true);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    ref.current.position.y = -0.02 + Math.sin(t * 12) * 0.002 + Math.sin(t * 18.7) * 0.001;
    ref.current.rotation.y = Math.PI + Math.sin(t * 3.1) * 0.003;
  });

  return (
    <group ref={ref} position={[0, -0.02, 0]} scale={[2.2, 2.2, 2.2]} rotation={[0, Math.PI, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}
