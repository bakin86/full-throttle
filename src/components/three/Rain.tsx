"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RAIN_COUNT = 3000;
const SPRAY_COUNT = 500;
const RAIN_AREA = { x: 20, y: 15, z: 40 };
const RAIN_SPEED = 55;

export function Rain() {
  const rainRef = useRef<THREE.Points>(null);
  const sprayRef = useRef<THREE.Points>(null);

  // Rain streaks
  const rainGeo = useMemo(() => {
    const positions = new Float32Array(RAIN_COUNT * 3);
    for (let i = 0; i < RAIN_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * RAIN_AREA.x;
      positions[i * 3 + 1] = Math.random() * RAIN_AREA.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * RAIN_AREA.z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const rainMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#aabbcc",
        size: 0.08,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  // Rear wheel spray
  const sprayGeo = useMemo(() => {
    const positions = new Float32Array(SPRAY_COUNT * 3);
    for (let i = 0; i < SPRAY_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2.5;
      positions[i * 3 + 1] = Math.random() * 1.5;
      positions[i * 3 + 2] = Math.random() * 6 + 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const sprayMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#99aabc",
        size: 0.12,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!rainRef.current) return;
    const positions = rainRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < RAIN_COUNT; i++) {
      // Fall down and slightly forward (wind)
      positions[i * 3 + 1] -= RAIN_SPEED * delta;
      positions[i * 3 + 2] += RAIN_SPEED * 0.15 * delta;

      // Reset when below ground
      if (positions[i * 3 + 1] < -1) {
        positions[i * 3] = (Math.random() - 0.5) * RAIN_AREA.x;
        positions[i * 3 + 1] = RAIN_AREA.y;
        positions[i * 3 + 2] = (Math.random() - 0.5) * RAIN_AREA.z;
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;

    // Animate spray — constant churn
    if (!sprayRef.current) return;
    const sprayPos = sprayRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < SPRAY_COUNT; i++) {
      sprayPos[i * 3 + 1] += (Math.random() - 0.3) * 3 * delta;
      sprayPos[i * 3 + 2] += (Math.random() * 8 + 2) * delta;
      sprayPos[i * 3] += (Math.random() - 0.5) * 2 * delta;

      // Reset spray
      if (sprayPos[i * 3 + 2] > 10 || sprayPos[i * 3 + 1] > 2) {
        sprayPos[i * 3] = (Math.random() - 0.5) * 2;
        sprayPos[i * 3 + 1] = Math.random() * 0.3;
        sprayPos[i * 3 + 2] = Math.random() * 1.5 + 1.5;
      }
    }
    sprayRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={rainRef} geometry={rainGeo} material={rainMat} />
      <points ref={sprayRef} geometry={sprayGeo} material={sprayMat} />
    </>
  );
}
