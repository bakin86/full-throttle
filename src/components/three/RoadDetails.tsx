"use client";

import { useMemo } from "react";

export function RoadDetails() {
  const dashes = useMemo(() => {
    const items = [];
    for (let z = -120; z < 120; z += 8) {
      items.push(z);
    }
    return items;
  }, []);

  // Fewer lamps to reduce GPU load (every 30 units)
  const lamps = useMemo(() => {
    const items = [];
    for (let z = -100; z < 100; z += 30) {
      items.push(z);
    }
    return items;
  }, []);

  return (
    <group>
      {/* Center lane dashes */}
      {dashes.map((z) => (
        <mesh key={`c-${z}`} position={[0, 12.55, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, 2.5]} />
          <meshStandardMaterial
            color="#eeeeee"
            emissive="#eeeeee"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Lamp glow spheres + lights */}
      {lamps.map((z, i) => (
        <group key={`lamp-${i}`}>
          <mesh position={[-7, 19, z]}>
            <sphereGeometry args={[0.2, 6, 6]} />
            <meshStandardMaterial
              color="#ffaa44"
              emissive="#ffaa44"
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[7, 19, z]}>
            <sphereGeometry args={[0.2, 6, 6]} />
            <meshStandardMaterial
              color="#ffaa44"
              emissive="#ffaa44"
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
          <pointLight position={[-5, 16, z]} intensity={4} color="#ffaa44" distance={18} decay={2} />
          <pointLight position={[5, 16, z]} intensity={4} color="#ffaa44" distance={18} decay={2} />
        </group>
      ))}
    </group>
  );
}
