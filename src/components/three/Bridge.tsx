"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";

const ROAD_LENGTH = 300;
const ROAD_WIDTH = 12;
const BARRIER_HEIGHT = 1;
const LAMP_SPACING = 25;
const LAMP_COUNT = Math.floor(ROAD_LENGTH / LAMP_SPACING);

export function Bridge() {
  const ref = useRef<THREE.Group>(null);

  // Road surface material - dark asphalt
  const roadMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2d2d2d"),
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  // Sidewalk / edge material
  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3d3d3d"),
        roughness: 0.75,
        metalness: 0.05,
      }),
    []
  );

  // Barrier / guard rail material
  const barrierMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#505050"),
        roughness: 0.45,
        metalness: 0.6,
      }),
    []
  );

  // Lamp pole material
  const poleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#707070"),
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  // Lane marking material - white with glow
  const markingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 0.15,
        roughness: 0.6,
      }),
    []
  );

  // Lamp glow material
  const glowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffaa44"),
        emissive: new THREE.Color("#ffaa44"),
        emissiveIntensity: 6,
        toneMapped: false,
      }),
    []
  );

  // Bridge support pillar material
  const pillarMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3a3a3a"),
        roughness: 0.8,
        metalness: 0.1,
      }),
    []
  );

  // Generate lane dashes
  const dashes = useMemo(() => {
    const items = [];
    for (let z = -ROAD_LENGTH / 2; z < ROAD_LENGTH / 2; z += 6) {
      items.push(z);
    }
    return items;
  }, []);

  // Generate lamp positions
  const lamps = useMemo(() => {
    const items = [];
    for (let i = 0; i < LAMP_COUNT; i++) {
      items.push(-ROAD_LENGTH / 2 + i * LAMP_SPACING + 10);
    }
    return items;
  }, []);

  // Generate pillar positions (every 50 units)
  const pillars = useMemo(() => {
    const items = [];
    for (let z = -ROAD_LENGTH / 2; z < ROAD_LENGTH / 2; z += 50) {
      items.push(z);
    }
    return items;
  }, []);

  return (
    <group ref={ref}>
      {/* ===== ROAD SURFACE ===== */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} material={roadMaterial}>
        <planeGeometry args={[ROAD_WIDTH, ROAD_LENGTH]} />
      </mesh>

      {/* ===== ROAD EDGES / SIDEWALKS ===== */}
      {/* Left edge */}
      <mesh position={[-(ROAD_WIDTH / 2 + 0.5), 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} material={edgeMaterial}>
        <planeGeometry args={[1, ROAD_LENGTH]} />
      </mesh>
      {/* Right edge */}
      <mesh position={[(ROAD_WIDTH / 2 + 0.5), 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} material={edgeMaterial}>
        <planeGeometry args={[1, ROAD_LENGTH]} />
      </mesh>

      {/* ===== GUARD RAILS ===== */}
      {/* Left barrier */}
      <mesh position={[-(ROAD_WIDTH / 2 + 1), BARRIER_HEIGHT / 2, 0]} material={barrierMaterial}>
        <boxGeometry args={[0.15, BARRIER_HEIGHT, ROAD_LENGTH]} />
      </mesh>
      {/* Right barrier */}
      <mesh position={[(ROAD_WIDTH / 2 + 1), BARRIER_HEIGHT / 2, 0]} material={barrierMaterial}>
        <boxGeometry args={[0.15, BARRIER_HEIGHT, ROAD_LENGTH]} />
      </mesh>
      {/* Lower rail left */}
      <mesh position={[-(ROAD_WIDTH / 2 + 1), 0.2, 0]} material={barrierMaterial}>
        <boxGeometry args={[0.1, 0.08, ROAD_LENGTH]} />
      </mesh>
      {/* Lower rail right */}
      <mesh position={[(ROAD_WIDTH / 2 + 1), 0.2, 0]} material={barrierMaterial}>
        <boxGeometry args={[0.1, 0.08, ROAD_LENGTH]} />
      </mesh>

      {/* ===== BARRIER POSTS ===== */}
      {Array.from({ length: Math.floor(ROAD_LENGTH / 3) }, (_, i) => {
        const z = -ROAD_LENGTH / 2 + i * 3;
        return (
          <group key={`post-${i}`}>
            <mesh position={[-(ROAD_WIDTH / 2 + 1), BARRIER_HEIGHT / 2, z]} material={barrierMaterial}>
              <boxGeometry args={[0.08, BARRIER_HEIGHT, 0.08]} />
            </mesh>
            <mesh position={[(ROAD_WIDTH / 2 + 1), BARRIER_HEIGHT / 2, z]} material={barrierMaterial}>
              <boxGeometry args={[0.08, BARRIER_HEIGHT, 0.08]} />
            </mesh>
          </group>
        );
      })}

      {/* ===== CENTER LANE DASHES ===== */}
      {dashes.map((z) => (
        <mesh key={`cd-${z}`} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]} material={markingMaterial}>
          <planeGeometry args={[0.15, 3]} />
        </mesh>
      ))}

      {/* ===== SIDE LANE MARKINGS (solid lines) ===== */}
      {/* Left lane line */}
      <mesh position={[-3.5, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={markingMaterial}>
        <planeGeometry args={[0.12, ROAD_LENGTH]} />
      </mesh>
      {/* Right lane line */}
      <mesh position={[3.5, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={markingMaterial}>
        <planeGeometry args={[0.12, ROAD_LENGTH]} />
      </mesh>
      {/* Edge lines */}
      <mesh position={[-(ROAD_WIDTH / 2 - 0.2), 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={markingMaterial}>
        <planeGeometry args={[0.15, ROAD_LENGTH]} />
      </mesh>
      <mesh position={[(ROAD_WIDTH / 2 - 0.2), 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={markingMaterial}>
        <planeGeometry args={[0.15, ROAD_LENGTH]} />
      </mesh>

      {/* ===== STREET LAMPS ===== */}
      {lamps.map((z, i) => (
        <group key={`lamp-${i}`}>
          {/* Left pole */}
          <mesh position={[-(ROAD_WIDTH / 2 + 0.8), 4, z]} material={poleMaterial}>
            <cylinderGeometry args={[0.06, 0.08, 8, 6]} />
          </mesh>
          {/* Left arm */}
          <mesh position={[-(ROAD_WIDTH / 2 - 0.5), 7.8, z]} rotation={[0, 0, Math.PI / 6]} material={poleMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 2.5, 4]} />
          </mesh>
          {/* Left lamp globe */}
          <mesh position={[-(ROAD_WIDTH / 2 - 1), 8.2, z]} material={glowMaterial}>
            <sphereGeometry args={[0.2, 8, 8]} />
          </mesh>
          {/* Left lamp light */}
          <pointLight position={[-(ROAD_WIDTH / 2 - 1), 7.5, z]} intensity={8} color="#ffaa44" distance={25} decay={2} />

          {/* Right pole */}
          <mesh position={[(ROAD_WIDTH / 2 + 0.8), 4, z]} material={poleMaterial}>
            <cylinderGeometry args={[0.06, 0.08, 8, 6]} />
          </mesh>
          {/* Right arm */}
          <mesh position={[(ROAD_WIDTH / 2 - 0.5), 7.8, z]} rotation={[0, 0, -Math.PI / 6]} material={poleMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 2.5, 4]} />
          </mesh>
          {/* Right lamp globe */}
          <mesh position={[(ROAD_WIDTH / 2 - 1), 8.2, z]} material={glowMaterial}>
            <sphereGeometry args={[0.2, 8, 8]} />
          </mesh>
          {/* Right lamp light */}
          <pointLight position={[(ROAD_WIDTH / 2 - 1), 7.5, z]} intensity={8} color="#ffaa44" distance={25} decay={2} />
        </group>
      ))}

      {/* ===== BRIDGE SUPPORT PILLARS ===== */}
      {pillars.map((z, i) => (
        <group key={`pillar-${i}`}>
          {/* Left pillar */}
          <mesh position={[-(ROAD_WIDTH / 2 + 0.5), -5, z]} material={pillarMaterial}>
            <boxGeometry args={[1.5, 10, 1.5]} />
          </mesh>
          {/* Right pillar */}
          <mesh position={[(ROAD_WIDTH / 2 + 0.5), -5, z]} material={pillarMaterial}>
            <boxGeometry args={[1.5, 10, 1.5]} />
          </mesh>
        </group>
      ))}

      {/* ===== BRIDGE DECK UNDERSIDE ===== */}
      <mesh position={[0, -0.15, 0]} material={pillarMaterial}>
        <boxGeometry args={[ROAD_WIDTH + 3, 0.3, ROAD_LENGTH]} />
      </mesh>
    </group>
  );
}
