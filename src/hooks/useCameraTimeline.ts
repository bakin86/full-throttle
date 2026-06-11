"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/constants";
import * as THREE from "three";

interface CameraTimelineProps {
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  lookAtTarget: React.RefObject<THREE.Vector3 | null>;
}

export function useCameraTimeline({
  cameraRef,
  lookAtTarget,
}: CameraTimelineProps) {
  useEffect(() => {
    if (!cameraRef.current || !lookAtTarget.current) return;

    const camera = cameraRef.current;
    const target = lookAtTarget.current;

    // Set initial position
    camera.position.set(...CHAPTERS[0].camera.position);
    target.set(...CHAPTERS[0].camera.lookAt);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Build camera keyframes from chapters
    for (let i = 1; i < CHAPTERS.length; i++) {
      const chapter = CHAPTERS[i];
      const prev = CHAPTERS[i - 1];
      const duration = chapter.end - prev.end;

      tl.to(
        camera.position,
        {
          x: chapter.camera.position[0],
          y: chapter.camera.position[1],
          z: chapter.camera.position[2],
          duration,
          ease: "power2.inOut",
        },
        prev.end
      );

      tl.to(
        target,
        {
          x: chapter.camera.lookAt[0],
          y: chapter.camera.lookAt[1],
          z: chapter.camera.lookAt[2],
          duration,
          ease: "power2.inOut",
        },
        prev.end
      );
    }

    return () => {
      tl.kill();
    };
  }, [cameraRef, lookAtTarget]);
}
