"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, Html } from "@react-three/drei";
import { Track } from "./Track";
import { F1Car } from "./F1Car";
import { Rain, StreetlightRain, WaterSpray } from "./Rain";
import { CameraRig } from "./CameraRig";
import { CRTEffect } from "./CRTEffect";
import { Sparks } from "./Sparks";

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-sm tracking-widest uppercase">
        Loading...
      </div>
    </Html>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient — night race under floodlights */}
      <ambientLight intensity={0.6} color="#aabbcc" />

      {/* Main overhead floodlight feel */}
      <directionalLight position={[0, 10, -5]} intensity={1.2} color="#ddeeff" />

      {/* Side fill */}
      <directionalLight position={[8, 5, 0]} intensity={0.8} color="#bbccdd" />
      <directionalLight position={[-8, 5, 0]} intensity={0.6} color="#aabbcc" />

      {/* Front light on car */}
      <directionalLight position={[0, 3, -15]} intensity={0.7} color="#ccddee" />

      {/* Spotlight directly on car */}
      <pointLight position={[0, 6, 0]} intensity={15} color="#ffffff" distance={20} decay={2} />

      {/* Fog — pushed way back */}
      <fog attach="fog" args={["#0a0c10", 25, 80]} />

      <Suspense fallback={<LoadingFallback />}>
        <Track />
        <F1Car />
      </Suspense>

      <Rain />
      <StreetlightRain />
      <WaterSpray />
      <Sparks />

      {/* CRT post-processing */}
      <CRTEffect />

      <CameraRig />
      <Preload all />
    </>
  );
}

export function Experience() {
  return (
    <div className="scene-canvas">
      <Canvas
        dpr={[1, 1.2]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        shadows={false}
        style={{ background: "#0a0c10" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
