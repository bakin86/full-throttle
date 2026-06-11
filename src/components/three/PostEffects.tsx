"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import * as THREE from "three";

export function PostEffects() {
  const composerRef = useRef<EffectComposer | null>(null);
  const { gl, scene, camera, size } = useThree();

  useEffect(() => {
    const composer = new EffectComposer(gl);
    composer.setSize(size.width, size.height);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.3,  // strength (reduced)
      0.4,  // radius
      0.9   // threshold (higher = less bloom)
    );
    composer.addPass(bloomPass);

    composerRef.current = composer;

    return () => {
      composer.dispose();
    };
  }, [gl, scene, camera, size]);

  // Take over rendering - priority 1 runs AFTER default,
  // but we disable default render
  useFrame((_state, _delta) => {
    if (composerRef.current) {
      composerRef.current.render();
    }
  }, 1);

  // Disable default R3F render to avoid double-render
  useEffect(() => {
    gl.autoClear = false;
    return () => {
      gl.autoClear = true;
    };
  }, [gl]);

  return null;
}
