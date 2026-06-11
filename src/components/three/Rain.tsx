"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RAIN_COUNT = 1500;
const RAIN_AREA = { x: 20, y: 15, z: 40 };
const RAIN_SPEED = 40;
const SPRAY_COUNT = 600;

export function Rain() {
  const rainRef = useRef<THREE.Points>(null);

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

  // Round raindrop texture
  const rainTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createLinearGradient(8, 0, 8, 32);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.3, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0.2)");
    ctx.fillStyle = gradient;
    ctx.fillRect(6, 0, 4, 32);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  const rainMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#99aacc",
        size: 0.12,
        map: rainTexture,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [rainTexture]
  );

  useFrame((_, delta) => {
    if (!rainRef.current) return;
    const pos = rainRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < RAIN_COUNT; i++) {
      pos[i * 3 + 1] -= RAIN_SPEED * delta;
      pos[i * 3 + 2] += RAIN_SPEED * 0.1 * delta;

      if (pos[i * 3 + 1] < -1) {
        pos[i * 3] = (Math.random() - 0.5) * RAIN_AREA.x;
        pos[i * 3 + 1] = RAIN_AREA.y;
        pos[i * 3 + 2] = (Math.random() - 0.5) * RAIN_AREA.z;
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={rainRef} geometry={rainGeo} material={rainMat} />;
}

// Rain visible in streetlight cones — moves with the track
const LIGHT_RAIN_COUNT = 300;
const LIGHT_RAIN_HEIGHT = 13;
const LIGHT_RAIN_SPEED = 45;
const SEGMENT_LENGTH = 60;
const SPEED = 90;
const hw = 6;

// Floodlight X positions (left and right towers)
const LIGHT_X = [-(hw + 4), (hw + 4)];

export function StreetlightRain() {
  const groupRef = useRef<THREE.Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refs = useRef<any[]>([]);

  // One rain cluster per light (2 lights × 2 segments with lights = 4 clusters)
  const clusters = useMemo(() => {
    const result: { positions: Float32Array; x: number; z: number }[] = [];
    for (let seg = 0; seg < 4; seg++) {
      if (seg % 2 !== 0) continue; // only segments 0, 2 have lights
      const zBase = SEGMENT_LENGTH / 2 - seg * SEGMENT_LENGTH;
      for (const lx of LIGHT_X) {
        const positions = new Float32Array(LIGHT_RAIN_COUNT * 3);
        for (let i = 0; i < LIGHT_RAIN_COUNT; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 4;
          positions[i * 3 + 1] = Math.random() * LIGHT_RAIN_HEIGHT;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
        result.push({ positions, x: lx, z: zBase });
      }
    }
    return result;
  }, []);

  const geos = useMemo(() => {
    return clusters.map((c) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(c.positions, 3));
      return geo;
    });
  }, [clusters]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#ddeeff",
        size: 0.08,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    // Move with the track
    if (groupRef.current) {
      groupRef.current.position.z += SPEED * delta;
      if (groupRef.current.position.z > SEGMENT_LENGTH) {
        groupRef.current.position.z -= SEGMENT_LENGTH;
      }
    }

    // Animate each cluster
    for (const points of refs.current) {
      if (!points) continue;
      const pos = points.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < LIGHT_RAIN_COUNT; i++) {
        pos[i * 3 + 1] -= LIGHT_RAIN_SPEED * delta;
        if (pos[i * 3 + 1] < -1) {
          pos[i * 3] = (Math.random() - 0.5) * 4;
          pos[i * 3 + 1] = LIGHT_RAIN_HEIGHT;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
      }
      points.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {clusters.map((c, i) => (
        <points
          key={i}
          ref={(el) => { if (el) refs.current[i] = el; }}
          geometry={geos[i]}
          material={mat}
          position={[c.x, 0, c.z]}
        />
      ))}
    </group>
  );
}

export function WaterSpray() {
  const sprayRef = useRef<THREE.Points>(null);

  const sprayGeo = useMemo(() => {
    const positions = new Float32Array(SPRAY_COUNT * 3);
    for (let i = 0; i < SPRAY_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2.5;
      positions[i * 3 + 1] = Math.random() * 1.2;
      positions[i * 3 + 2] = Math.random() * 5 + 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const sprayMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#aabbcc",
        size: 0.1,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!sprayRef.current) return;
    const pos = sprayRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < SPRAY_COUNT; i++) {
      // Spray rises and spreads backward
      pos[i * 3 + 1] += (Math.random() - 0.25) * 3 * delta;
      pos[i * 3 + 2] += (Math.random() * 10 + 3) * delta;
      pos[i * 3] += (Math.random() - 0.5) * 2.5 * delta;

      // Reset when too far or too high
      if (pos[i * 3 + 2] > 12 || pos[i * 3 + 1] > 2.5 || pos[i * 3 + 1] < -0.1) {
        pos[i * 3] = (Math.random() - 0.5) * 2;
        pos[i * 3 + 1] = Math.random() * 0.2;
        pos[i * 3 + 2] = Math.random() * 1.5 + 1.5;
      }
    }
    sprayRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={sprayRef} geometry={sprayGeo} material={sprayMat} />;
}
