"use client";

import { Environment as DreiEnv } from "@react-three/drei";

export function Environment() {
  return (
    <>
      {/* Fog — adjusted for bridge length (~277 units along Z) */}
      <fog attach="fog" args={["#050505", 30, 150]} />

      {/* Subtle environment map for reflections */}
      <DreiEnv preset="night" environmentIntensity={0.3} />
    </>
  );
}
