"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import * as THREE from "three";

const CRTShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(1, 1) },
    scanlineIntensity: { value: 0.08 },
    scanlineCount: { value: 400.0 },
    rgbShift: { value: 0.0015 },
    barrelDistortion: { value: 0.04 },
    vignetteStrength: { value: 0.4 },
    noiseIntensity: { value: 0.03 },
    flickerIntensity: { value: 0.01 },
    brightness: { value: 1.2 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform vec2 resolution;
    uniform float scanlineIntensity;
    uniform float scanlineCount;
    uniform float rgbShift;
    uniform float barrelDistortion;
    uniform float vignetteStrength;
    uniform float noiseIntensity;
    uniform float flickerIntensity;
    uniform float brightness;

    varying vec2 vUv;

    vec2 distort(vec2 uv) {
      vec2 centered = uv - 0.5;
      float r2 = dot(centered, centered);
      float distort = 1.0 + barrelDistortion * r2;
      return centered * distort + 0.5;
    }

    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = distort(vUv);

      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
      }

      // Chromatic aberration
      float shift = rgbShift;
      float r = texture2D(tDiffuse, vec2(uv.x + shift, uv.y)).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, vec2(uv.x - shift, uv.y)).b;
      vec3 color = vec3(r, g, b);

      // Scanlines
      float scanline = sin(uv.y * scanlineCount * 3.14159) * 0.5 + 0.5;
      scanline = pow(scanline, 1.5);
      color *= 1.0 - scanlineIntensity * (1.0 - scanline);

      // Grain
      float noise = rand(uv * resolution + time * 100.0);
      color += (noise - 0.5) * noiseIntensity;

      // Flicker
      float flicker = 1.0 + flickerIntensity * sin(time * 8.0) * sin(time * 13.0);
      color *= flicker;

      // Vignette
      vec2 vigUv = vUv - 0.5;
      float vig = 1.0 - dot(vigUv, vigUv) * vignetteStrength * 2.0;
      vig = smoothstep(0.0, 1.0, clamp(vig, 0.0, 1.0));
      color *= vig;

      color *= brightness;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

export function CRTEffect() {
  const composerRef = useRef<EffectComposer | null>(null);
  const crtRef = useRef<ShaderPass | null>(null);
  const { gl, scene, camera, size } = useThree();

  useEffect(() => {
    const composer = new EffectComposer(gl);
    composer.setSize(size.width, size.height);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 1. Render the scene
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // 2. Depth of field (bokeh)
    const bokehPass = new BokehPass(scene, camera, {
      focus: 7.0,        // focus distance — on the car from trackside
      aperture: 0.004,   // lens aperture — shallow DOF, background blur
      maxblur: 0.012,    // max blur — barriers and far track blurred
    });
    composer.addPass(bokehPass);

    // 3. CRT shader on top
    const crtPass = new ShaderPass(CRTShader);
    crtPass.uniforms.resolution.value.set(size.width, size.height);
    composer.addPass(crtPass);

    composerRef.current = composer;
    crtRef.current = crtPass;

    return () => {
      composer.dispose();
    };
  }, [gl, scene, camera, size]);

  useFrame((_state, delta) => {
    if (crtRef.current) {
      crtRef.current.uniforms.time.value += delta;
    }
    if (composerRef.current) {
      composerRef.current.render();
    }
  }, 1);

  useEffect(() => {
    gl.autoClear = false;
    return () => {
      gl.autoClear = true;
    };
  }, [gl]);

  return null;
}
