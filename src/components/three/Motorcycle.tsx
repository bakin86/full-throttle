"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

useGLTF.preload("/models/motorcycle.glb");

export function Motorcycle() {
  const { scene } = useGLTF("/models/motorcycle.glb", true);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMapIntensity = 1.2;
        }
      }
    });
  }, [clonedScene]);

  // Center of garage floor, facing the open door (+Z)
  return (
    <group ref={ref} position={[0, 0.25, 0]} scale={[2, 2, 2]} rotation={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}
