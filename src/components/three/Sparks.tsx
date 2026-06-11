"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPARK_COUNT = 200;

export function Sparks() {
  const pointsRef = useRef<THREE.Points>(null);

  // Per-particle velocities and lifetimes
  const particleData = useMemo(() => {
    const velocities = new Float32Array(SPARK_COUNT * 3);
    const lifetimes = new Float32Array(SPARK_COUNT);
    const ages = new Float32Array(SPARK_COUNT);

    for (let i = 0; i < SPARK_COUNT; i++) {
      lifetimes[i] = 0.15 + Math.random() * 0.35; // 0.15–0.5s lifespan
      ages[i] = Math.random() * lifetimes[i]; // stagger start
      // velocity: slight X spread, tiny Y upward, Z backward
      velocities[i * 3] = (Math.random() - 0.5) * 4;
      velocities[i * 3 + 1] = Math.random() * 2 + 0.5;
      velocities[i * 3 + 2] = Math.random() * 8 + 4;
    }
    return { velocities, lifetimes, ages };
  }, []);

  const geometry = useMemo(() => {
    const positions = new Float32Array(SPARK_COUNT * 3);
    const opacities = new Float32Array(SPARK_COUNT);

    for (let i = 0; i < SPARK_COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      opacities[i] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#ff8822"),
        size: 0.04,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const { velocities, lifetimes, ages } = particleData;

    for (let i = 0; i < SPARK_COUNT; i++) {
      ages[i] += delta;

      if (ages[i] >= lifetimes[i]) {
        // Reset particle
        ages[i] = 0;
        lifetimes[i] = 0.15 + Math.random() * 0.35;
        // Originate from under the car
        pos[i * 3] = (Math.random() - 0.5) * 1.2; // X spread under car
        pos[i * 3 + 1] = -0.05 + Math.random() * 0.1; // Y near ground
        pos[i * 3 + 2] = 0.5 + Math.random() * 0.5; // Z just behind car center
        // New random velocity
        velocities[i * 3] = (Math.random() - 0.5) * 4;
        velocities[i * 3 + 1] = Math.random() * 2 + 0.5;
        velocities[i * 3 + 2] = Math.random() * 8 + 4;
      } else {
        // Update position
        pos[i * 3] += velocities[i * 3] * delta;
        pos[i * 3 + 1] += velocities[i * 3 + 1] * delta;
        // Gravity pull
        velocities[i * 3 + 1] -= 6 * delta;
        pos[i * 3 + 2] += velocities[i * 3 + 2] * delta;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
