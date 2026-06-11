"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";

const GARAGE_WIDTH = 10;
const GARAGE_DEPTH = 14;
const GARAGE_HEIGHT = 5;
const WALL_THICKNESS = 0.3;

export function Garage() {
  const ref = useRef<THREE.Group>(null);

  // --- Materials ---
  const floorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#5a5a5a"),
        roughness: 0.95,
        metalness: 0.0,
      }),
    []
  );

  const floorStainMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#444444"),
        roughness: 1.0,
        metalness: 0.0,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#6a6a6a"),
        roughness: 0.85,
        metalness: 0.0,
      }),
    []
  );

  const ceilingMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#555555"),
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  const metalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#5a5a5a"),
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  const darkMetalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3d3d3d"),
        roughness: 0.4,
        metalness: 0.7,
      }),
    []
  );

  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#5c4033"),
        roughness: 0.8,
        metalness: 0.0,
      }),
    []
  );

  const pegboardMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#6b6b6b"),
        roughness: 0.7,
        metalness: 0.1,
      }),
    []
  );

  const redMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8b2020"),
        roughness: 0.6,
        metalness: 0.2,
      }),
    []
  );

  const bulbMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffcc"),
        emissive: new THREE.Color("#ffeeaa"),
        emissiveIntensity: 5,
        toneMapped: false,
      }),
    []
  );

  const fluorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        emissive: new THREE.Color("#eeeeff"),
        emissiveIntensity: 3,
        toneMapped: false,
      }),
    []
  );

  const garageDoorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#555555"),
        roughness: 0.5,
        metalness: 0.6,
      }),
    []
  );

  const concreteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#484848"),
        roughness: 0.9,
        metalness: 0.05,
      }),
    []
  );

  const tireMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#222222"),
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  const cardboardMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8b7355"),
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  // Oil stain positions
  const stains = useMemo(
    () => [
      { pos: [0, 0.005, 1] as [number, number, number], scale: 1.2 },
      { pos: [-1.5, 0.005, -1] as [number, number, number], scale: 0.8 },
      { pos: [2, 0.005, 3] as [number, number, number], scale: 0.6 },
      { pos: [0.5, 0.005, -3] as [number, number, number], scale: 1.0 },
    ],
    []
  );

  const hw = GARAGE_WIDTH / 2;
  const hd = GARAGE_DEPTH / 2;

  return (
    <group ref={ref}>
      {/* ===== FLOOR ===== */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} material={floorMat}>
        <planeGeometry args={[GARAGE_WIDTH, GARAGE_DEPTH]} />
      </mesh>

      {/* Floor oil stains */}
      {stains.map((s, i) => (
        <mesh
          key={`stain-${i}`}
          position={s.pos}
          rotation={[-Math.PI / 2, 0, i * 1.3]}
          material={floorStainMat}
        >
          <circleGeometry args={[s.scale, 16]} />
        </mesh>
      ))}

      {/* ===== WALLS ===== */}
      {/* Back wall (Z-) */}
      <mesh position={[0, GARAGE_HEIGHT / 2, -hd]} material={wallMat}>
        <boxGeometry args={[GARAGE_WIDTH, GARAGE_HEIGHT, WALL_THICKNESS]} />
      </mesh>

      {/* Left wall (X-) */}
      <mesh position={[-hw, GARAGE_HEIGHT / 2, 0]} material={wallMat}>
        <boxGeometry args={[WALL_THICKNESS, GARAGE_HEIGHT, GARAGE_DEPTH]} />
      </mesh>

      {/* Right wall (X+) */}
      <mesh position={[hw, GARAGE_HEIGHT / 2, 0]} material={wallMat}>
        <boxGeometry args={[WALL_THICKNESS, GARAGE_HEIGHT, GARAGE_DEPTH]} />
      </mesh>

      {/* ===== CEILING ===== */}
      <mesh position={[0, GARAGE_HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]} material={ceilingMat}>
        <planeGeometry args={[GARAGE_WIDTH, GARAGE_DEPTH]} />
      </mesh>

      {/* ===== GARAGE DOOR (front, partially open) ===== */}
      {/* Door frame */}
      <mesh position={[-hw + 0.15, GARAGE_HEIGHT / 2, hd]} material={darkMetalMat}>
        <boxGeometry args={[0.3, GARAGE_HEIGHT, 0.2]} />
      </mesh>
      <mesh position={[hw - 0.15, GARAGE_HEIGHT / 2, hd]} material={darkMetalMat}>
        <boxGeometry args={[0.3, GARAGE_HEIGHT, 0.2]} />
      </mesh>
      <mesh position={[0, GARAGE_HEIGHT - 0.1, hd]} material={darkMetalMat}>
        <boxGeometry args={[GARAGE_WIDTH, 0.2, 0.2]} />
      </mesh>

      {/* Rolled-up door panels (at top, door is open ~70%) */}
      <mesh position={[0, GARAGE_HEIGHT - 0.6, hd - 0.05]} material={garageDoorMat}>
        <boxGeometry args={[GARAGE_WIDTH - 0.6, 1.0, 0.1]} />
      </mesh>
      {/* Door panel segments (rolled look) */}
      {[0, 0.12, 0.22].map((y, i) => (
        <mesh key={`roll-${i}`} position={[0, GARAGE_HEIGHT - 0.15 + y, hd - 0.02]} material={garageDoorMat}>
          <boxGeometry args={[GARAGE_WIDTH - 0.6, 0.08, 0.12]} />
        </mesh>
      ))}

      {/* Door tracks (side rails) */}
      <mesh position={[-hw + 0.4, GARAGE_HEIGHT / 2, hd - 0.05]} material={darkMetalMat}>
        <boxGeometry args={[0.05, GARAGE_HEIGHT, 0.1]} />
      </mesh>
      <mesh position={[hw - 0.4, GARAGE_HEIGHT / 2, hd - 0.05]} material={darkMetalMat}>
        <boxGeometry args={[0.05, GARAGE_HEIGHT, 0.1]} />
      </mesh>

      {/* ===== OUTSIDE GROUND (visible through open door) ===== */}
      <mesh position={[0, -0.01, hd + 5]} rotation={[-Math.PI / 2, 0, 0]} material={concreteMat}>
        <planeGeometry args={[20, 10]} />
      </mesh>

      {/* ===== WORKBENCH (back wall, left side) ===== */}
      {/* Bench top */}
      <mesh position={[-2.5, 0.9, -hd + 0.6]} material={woodMat}>
        <boxGeometry args={[3.5, 0.08, 1.0]} />
      </mesh>
      {/* Bench legs */}
      {[-4.2, -2.5, -0.8].map((x, i) => (
        <mesh key={`bleg-${i}`} position={[x, 0.45, -hd + 0.6]} material={metalMat}>
          <boxGeometry args={[0.06, 0.9, 0.06]} />
        </mesh>
      ))}
      {/* Lower shelf */}
      <mesh position={[-2.5, 0.3, -hd + 0.6]} material={woodMat}>
        <boxGeometry args={[3.5, 0.05, 0.9]} />
      </mesh>
      {/* Bench vice */}
      <mesh position={[-4.0, 1.05, -hd + 0.4]} material={darkMetalMat}>
        <boxGeometry args={[0.2, 0.2, 0.3]} />
      </mesh>
      <mesh position={[-4.0, 1.05, -hd + 0.2]} material={darkMetalMat}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
      </mesh>

      {/* ===== PEGBOARD / TOOL WALL (back wall, behind workbench) ===== */}
      <mesh position={[-2.5, 2.5, -hd + 0.2]} material={pegboardMat}>
        <boxGeometry args={[3.5, 2.5, 0.05]} />
      </mesh>

      {/* Tools on pegboard — wrench shapes */}
      {[0, 0.4, 0.8, 1.2].map((offset, i) => (
        <mesh key={`wrench-${i}`} position={[-3.8 + offset, 2.8, -hd + 0.25]} material={metalMat}>
          <boxGeometry args={[0.06, 0.5, 0.02]} />
        </mesh>
      ))}
      {/* Screwdriver shapes */}
      {[0, 0.35, 0.7].map((offset, i) => (
        <mesh key={`screw-${i}`} position={[-1.8 + offset, 2.6, -hd + 0.25]} material={metalMat}>
          <boxGeometry args={[0.04, 0.6, 0.02]} />
        </mesh>
      ))}
      {/* Screwdriver handles */}
      {[0, 0.35, 0.7].map((offset, i) => (
        <mesh key={`screwh-${i}`} position={[-1.8 + offset, 2.25, -hd + 0.25]} material={redMat}>
          <boxGeometry args={[0.06, 0.15, 0.03]} />
        </mesh>
      ))}

      {/* ===== SHELVING UNIT (right wall) ===== */}
      {/* Shelf frame - uprights */}
      {[-2, 2].map((zOff, i) => (
        <group key={`shelf-frame-${i}`}>
          <mesh position={[hw - 0.5, 1.5, zOff]} material={metalMat}>
            <boxGeometry args={[0.05, 3, 0.05]} />
          </mesh>
          <mesh position={[hw - 1.2, 1.5, zOff]} material={metalMat}>
            <boxGeometry args={[0.05, 3, 0.05]} />
          </mesh>
        </group>
      ))}
      {/* Shelf platforms */}
      {[0.5, 1.3, 2.1, 2.9].map((y, i) => (
        <mesh key={`shelf-${i}`} position={[hw - 0.85, y, 0]} material={metalMat}>
          <boxGeometry args={[0.8, 0.04, 4.2]} />
        </mesh>
      ))}

      {/* Items on shelves */}
      {/* Red toolbox on shelf */}
      <mesh position={[hw - 0.85, 0.7, -1.5]} material={redMat}>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
      </mesh>
      {/* Cardboard boxes */}
      <mesh position={[hw - 0.85, 0.7, 0.5]} material={cardboardMat}>
        <boxGeometry args={[0.5, 0.35, 0.4]} />
      </mesh>
      <mesh position={[hw - 0.85, 0.7, 1.5]} material={cardboardMat}>
        <boxGeometry args={[0.4, 0.3, 0.35]} />
      </mesh>
      {/* Oil cans / bottles */}
      {[0, 0.3, 0.6].map((z, i) => (
        <mesh key={`can-${i}`} position={[hw - 0.85, 1.45, -1.2 + z]} material={darkMetalMat}>
          <cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
        </mesh>
      ))}
      {/* Spray cans */}
      {[0, 0.25].map((z, i) => (
        <mesh key={`spray-${i}`} position={[hw - 0.85, 1.45, 0.8 + z]} material={redMat}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 8]} />
        </mesh>
      ))}

      {/* ===== SPARE TIRES (left wall, front) ===== */}
      <mesh position={[-hw + 0.5, 0.35, 4]} rotation={[0, 0, Math.PI / 2]} material={tireMat}>
        <torusGeometry args={[0.3, 0.12, 8, 16]} />
      </mesh>
      <mesh position={[-hw + 0.5, 0.35, 3.3]} rotation={[0, 0, Math.PI / 2]} material={tireMat}>
        <torusGeometry args={[0.3, 0.12, 8, 16]} />
      </mesh>
      {/* Tire leaning against wall */}
      <mesh position={[-hw + 0.3, 0.55, 2.3]} rotation={[0, 0, Math.PI / 2 + 0.15]} material={tireMat}>
        <torusGeometry args={[0.35, 0.12, 8, 16]} />
      </mesh>

      {/* ===== FLOOR JACK (left side) ===== */}
      <mesh position={[-hw + 1.5, 0.1, 0]} material={redMat}>
        <boxGeometry args={[0.4, 0.15, 0.8]} />
      </mesh>
      <mesh position={[-hw + 1.5, 0.22, -0.2]} material={darkMetalMat}>
        <boxGeometry args={[0.15, 0.1, 0.3]} />
      </mesh>
      {/* Jack handle */}
      <mesh position={[-hw + 1.5, 0.2, 0.5]} rotation={[0.3, 0, 0]} material={darkMetalMat}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
      </mesh>

      {/* ===== TOOL CHEST (left wall, back area) ===== */}
      <mesh position={[-hw + 0.6, 0.5, -4]} material={redMat}>
        <boxGeometry args={[0.8, 1.0, 0.5]} />
      </mesh>
      {/* Drawer lines */}
      {[0.15, 0.35, 0.55, 0.75].map((y, i) => (
        <mesh key={`drawer-${i}`} position={[-hw + 0.21, y, -4]} material={darkMetalMat}>
          <boxGeometry args={[0.01, 0.01, 0.4]} />
        </mesh>
      ))}
      {/* Drawer handles */}
      {[0.2, 0.4, 0.6, 0.8].map((y, i) => (
        <mesh key={`handle-${i}`} position={[-hw + 0.19, y, -4]} material={metalMat}>
          <boxGeometry args={[0.02, 0.03, 0.1]} />
        </mesh>
      ))}

      {/* ===== BUCKET ===== */}
      <mesh position={[3, 0.2, -5]} material={metalMat}>
        <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
      </mesh>

      {/* ===== OVERHEAD FLUORESCENT LIGHTS ===== */}
      {[-3, 3].map((z, i) => (
        <group key={`fluor-${i}`}>
          {/* Light housing */}
          <mesh position={[0, GARAGE_HEIGHT - 0.15, z]} material={darkMetalMat}>
            <boxGeometry args={[1.2, 0.08, 0.2]} />
          </mesh>
          {/* Fluorescent tube */}
          <mesh position={[0, GARAGE_HEIGHT - 0.25, z]} material={fluorMat}>
            <boxGeometry args={[1.0, 0.05, 0.05]} />
          </mesh>
          {/* Actual light */}
          <pointLight
            position={[0, GARAGE_HEIGHT - 0.5, z]}
            intensity={20}
            color="#eeeeff"
            distance={16}
            decay={2}
          />
        </group>
      ))}

      {/* ===== HANGING WORK LIGHT (over motorcycle area) ===== */}
      {/* Chain */}
      <mesh position={[0, GARAGE_HEIGHT - 0.7, 0]} material={darkMetalMat}>
        <cylinderGeometry args={[0.01, 0.01, 1.2, 4]} />
      </mesh>
      {/* Lamp shade */}
      <mesh position={[0, GARAGE_HEIGHT - 1.4, 0]} material={metalMat}>
        <coneGeometry args={[0.3, 0.2, 8, 1, true]} />
      </mesh>
      {/* Bulb */}
      <mesh position={[0, GARAGE_HEIGHT - 1.5, 0]} material={bulbMat}>
        <sphereGeometry args={[0.08, 8, 8]} />
      </mesh>
      {/* Warm spotlight on motorcycle */}
      <pointLight
        position={[0, GARAGE_HEIGHT - 1.6, 0]}
        intensity={25}
        color="#ffddaa"
        distance={12}
        decay={2}
      />

      {/* ===== WINDOW (left wall, high) ===== */}
      {/* Window frame */}
      <mesh position={[-hw + 0.01, 3.5, -2]} material={darkMetalMat}>
        <boxGeometry args={[0.05, 1.2, 1.8]} />
      </mesh>
      {/* Window glass (slightly emissive — moonlight coming in) */}
      <mesh position={[-hw + 0.03, 3.5, -2]}>
        <boxGeometry args={[0.02, 1.0, 1.6]} />
        <meshStandardMaterial
          color="#1a2a44"
          emissive="#2244aa"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Window crossbar */}
      <mesh position={[-hw + 0.05, 3.5, -2]} material={darkMetalMat}>
        <boxGeometry args={[0.06, 0.04, 1.6]} />
      </mesh>
      <mesh position={[-hw + 0.05, 3.5, -2]} material={darkMetalMat}>
        <boxGeometry args={[0.06, 1.0, 0.04]} />
      </mesh>

      {/* ===== ELECTRIC PANEL (back wall, right) ===== */}
      <mesh position={[3.5, 2.5, -hd + 0.2]} material={darkMetalMat}>
        <boxGeometry args={[0.6, 0.8, 0.08]} />
      </mesh>

      {/* ===== EXPOSED PIPE (ceiling) ===== */}
      <mesh position={[3, GARAGE_HEIGHT - 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.04, 0.04, GARAGE_DEPTH, 8]} />
      </mesh>
      <mesh position={[-3, GARAGE_HEIGHT - 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={metalMat}>
        <cylinderGeometry args={[0.03, 0.03, GARAGE_DEPTH, 8]} />
      </mesh>

      {/* ===== EXTENSION CORD on floor ===== */}
      <mesh position={[1.5, 0.02, 2]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <torusGeometry args={[0.5, 0.015, 4, 20, Math.PI * 1.5]} />
        <meshStandardMaterial color="#ff6600" roughness={0.8} />
      </mesh>
    </group>
  );
}
