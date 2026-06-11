"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useCameraTimeline } from "@/hooks/useCameraTimeline";

export function CameraRig() {
  const [fov, setFov] = useState(50);

  useEffect(() => {
    const update = () => setFov(window.innerWidth < 768 ? 65 : 50);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const lookAtTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 0));
  const smoothLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 0));
  const shakeOffset = useRef<THREE.Vector3>(new THREE.Vector3());

  useCameraTimeline({ cameraRef, lookAtTarget });

  useFrame((state) => {
    if (!cameraRef.current) return;

    const t = state.clock.elapsedTime;

    // Subtle trackside camera shake — handheld feel
    const shakeX = Math.sin(t * 7.3) * 0.004 + Math.sin(t * 13.7) * 0.003;
    const shakeY = Math.sin(t * 9.1) * 0.003 + Math.sin(t * 5.3) * 0.002;
    const shakeZ = Math.sin(t * 6.7) * 0.002;

    shakeOffset.current.set(shakeX, shakeY, shakeZ);

    // Apply shake to camera position
    cameraRef.current.position.x += shakeOffset.current.x;
    cameraRef.current.position.y += shakeOffset.current.y;
    cameraRef.current.position.z += shakeOffset.current.z;

    // Smooth lookAt
    smoothLookAt.current.lerp(lookAtTarget.current, 0.08);
    cameraRef.current.lookAt(smoothLookAt.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={fov}
      near={0.1}
      far={500}
      position={[7, 1.2, 3]}
    />
  );
}
