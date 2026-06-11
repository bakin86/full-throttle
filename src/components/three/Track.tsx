"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TRACK_WIDTH = 12;
const SEGMENT_LENGTH = 60;
const SEGMENT_COUNT = 4;
const TOTAL_LENGTH = SEGMENT_LENGTH * SEGMENT_COUNT;
const SPEED = 90; // units per second

const BARRIER_HEIGHT = 1.2;
const BARRIER_POSTS_PER_SEGMENT = 15;

export function Track() {
  const groupRef = useRef<THREE.Group>(null);

  // Wet asphalt
  const roadMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#333333"),
        roughness: 0.2,
        metalness: 0.5,
      }),
    []
  );

  // Kerb red
  const kerbRedMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#cc2222"),
        roughness: 0.5,
        metalness: 0.1,
      }),
    []
  );

  // Kerb white
  const kerbWhiteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#cccccc"),
        roughness: 0.5,
        metalness: 0.1,
      }),
    []
  );

  // Barrier - armco
  const barrierMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#666666"),
        roughness: 0.35,
        metalness: 0.7,
      }),
    []
  );

  // Lane marking
  const markingMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#aaaaaa"),
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 0.1,
        roughness: 0.4,
      }),
    []
  );

  // Puddle material - reflective
  const puddleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111118"),
        roughness: 0.05,
        metalness: 0.9,
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  // Floodlight glow
  const floodGlowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        emissive: new THREE.Color("#ffffee"),
        emissiveIntensity: 8,
        toneMapped: false,
      }),
    []
  );

  // Floodlight pole
  const poleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#555555"),
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  // Grass/gravel runoff
  const runoffMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a2a1a"),
        roughness: 1.0,
        metalness: 0.0,
      }),
    []
  );

  // Kerb stripe positions
  const kerbStripes = useMemo(() => {
    const stripes = [];
    for (let z = 0; z < SEGMENT_LENGTH; z += 1.5) {
      stripes.push(z);
    }
    return stripes;
  }, []);

  // Barrier post positions
  const barrierPosts = useMemo(() => {
    const posts = [];
    for (let i = 0; i < BARRIER_POSTS_PER_SEGMENT; i++) {
      posts.push((i / BARRIER_POSTS_PER_SEGMENT) * SEGMENT_LENGTH);
    }
    return posts;
  }, []);

  // Puddle positions per segment (randomized feel)
  const puddles = useMemo(() => {
    return [
      { x: -1.5, z: 12, sx: 2.5, sz: 1.2 },
      { x: 2.0, z: 30, sx: 1.8, sz: 0.8 },
      { x: -0.5, z: 45, sx: 3.0, sz: 1.0 },
      { x: 3.0, z: 8, sx: 1.5, sz: 0.7 },
    ];
  }, []);

  // Scroll the track
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.z += SPEED * delta;
    if (groupRef.current.position.z > SEGMENT_LENGTH) {
      groupRef.current.position.z -= SEGMENT_LENGTH;
    }
  });

  const hw = TRACK_WIDTH / 2;

  return (
    <group ref={groupRef}>
      {Array.from({ length: SEGMENT_COUNT }, (_, seg) => {
        const zOff = -seg * SEGMENT_LENGTH;
        return (
          <group key={`seg-${seg}`} position={[0, 0, zOff]}>
            {/* Road surface */}
            <mesh
              position={[0, 0, SEGMENT_LENGTH / 2]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={roadMat}
            >
              <planeGeometry args={[TRACK_WIDTH, SEGMENT_LENGTH]} />
            </mesh>

            {/* Runoff areas */}
            <mesh
              position={[-(hw + 3), -0.02, SEGMENT_LENGTH / 2]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={runoffMat}
            >
              <planeGeometry args={[6, SEGMENT_LENGTH]} />
            </mesh>
            <mesh
              position={[(hw + 3), -0.02, SEGMENT_LENGTH / 2]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={runoffMat}
            >
              <planeGeometry args={[6, SEGMENT_LENGTH]} />
            </mesh>

            {/* Center line dashes */}
            {Array.from({ length: 10 }, (_, i) => (
              <mesh
                key={`cl-${i}`}
                position={[0, 0.01, i * 6 + 1.5]}
                rotation={[-Math.PI / 2, 0, 0]}
                material={markingMat}
              >
                <planeGeometry args={[0.15, 3]} />
              </mesh>
            ))}

            {/* Edge lines */}
            <mesh
              position={[-(hw - 0.3), 0.01, SEGMENT_LENGTH / 2]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={markingMat}
            >
              <planeGeometry args={[0.15, SEGMENT_LENGTH]} />
            </mesh>
            <mesh
              position={[(hw - 0.3), 0.01, SEGMENT_LENGTH / 2]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={markingMat}
            >
              <planeGeometry args={[0.15, SEGMENT_LENGTH]} />
            </mesh>

            {/* Kerb stripes (left and right) */}
            {kerbStripes.map((z, i) => (
              <group key={`kerb-${i}`}>
                <mesh
                  position={[-(hw + 0.3), 0.02, z + 0.375]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  material={i % 2 === 0 ? kerbRedMat : kerbWhiteMat}
                >
                  <planeGeometry args={[0.6, 0.75]} />
                </mesh>
                <mesh
                  position={[(hw + 0.3), 0.02, z + 0.375]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  material={i % 2 === 0 ? kerbRedMat : kerbWhiteMat}
                >
                  <planeGeometry args={[0.6, 0.75]} />
                </mesh>
              </group>
            ))}

            {/* Barriers (armco) */}
            <mesh position={[-(hw + 1.5), BARRIER_HEIGHT / 2, SEGMENT_LENGTH / 2]} material={barrierMat}>
              <boxGeometry args={[0.1, BARRIER_HEIGHT, SEGMENT_LENGTH]} />
            </mesh>
            <mesh position={[(hw + 1.5), BARRIER_HEIGHT / 2, SEGMENT_LENGTH / 2]} material={barrierMat}>
              <boxGeometry args={[0.1, BARRIER_HEIGHT, SEGMENT_LENGTH]} />
            </mesh>

            {/* Barrier posts */}
            {barrierPosts.map((z, i) => (
              <group key={`bp-${i}`}>
                <mesh position={[-(hw + 1.5), BARRIER_HEIGHT / 2, z]} material={barrierMat}>
                  <boxGeometry args={[0.08, BARRIER_HEIGHT, 0.08]} />
                </mesh>
                <mesh position={[(hw + 1.5), BARRIER_HEIGHT / 2, z]} material={barrierMat}>
                  <boxGeometry args={[0.08, BARRIER_HEIGHT, 0.08]} />
                </mesh>
              </group>
            ))}

            {/* Puddles on track */}
            {puddles.map((p, i) => (
              <mesh
                key={`puddle-${i}`}
                position={[p.x, 0.005, p.z]}
                rotation={[-Math.PI / 2, 0, 0]}
                material={puddleMat}
              >
                <circleGeometry args={[p.sx, 12]} />
              </mesh>
            ))}

            {/* Floodlight towers — one per segment */}
            {seg % 2 === 0 && (
              <>
                {/* Left tower */}
                <mesh position={[-(hw + 4), 6, SEGMENT_LENGTH / 2]} material={poleMat}>
                  <cylinderGeometry args={[0.08, 0.12, 12, 6]} />
                </mesh>
                <mesh position={[-(hw + 4), 12.5, SEGMENT_LENGTH / 2]} material={floodGlowMat}>
                  <boxGeometry args={[0.8, 0.3, 0.3]} />
                </mesh>
                <pointLight
                  position={[-(hw + 2), 11, SEGMENT_LENGTH / 2]}
                  intensity={50}
                  color="#ffffdd"
                  distance={45}
                  decay={2}
                />

                {/* Right tower */}
                <mesh position={[(hw + 4), 6, SEGMENT_LENGTH / 2]} material={poleMat}>
                  <cylinderGeometry args={[0.08, 0.12, 12, 6]} />
                </mesh>
                <mesh position={[(hw + 4), 12.5, SEGMENT_LENGTH / 2]} material={floodGlowMat}>
                  <boxGeometry args={[0.8, 0.3, 0.3]} />
                </mesh>
                <pointLight
                  position={[(hw + 2), 11, SEGMENT_LENGTH / 2]}
                  intensity={50}
                  color="#ffffdd"
                  distance={45}
                  decay={2}
                />
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}
