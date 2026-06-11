"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Entrance animation
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(lineRef.current, {
        scaleX: 0,
        duration: 1,
        ease: "power3.inOut",
      })
        .from(
          nameRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          roleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          taglineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Scroll-driven exit
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=40%",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col justify-end pb-12 md:pb-24 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-3xl">
        <div
          ref={lineRef}
          className="w-16 h-px bg-[#DC2626] mb-8 origin-left"
        />
        <h1
          ref={nameRef}
          className="font-[family-name:var(--font-yapari)] text-3xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-[-0.03em] leading-[0.9] mb-5 text-shadow-cinematic"
        >
          FULL <span className="text-[#DC2626]">THROTTLE</span>
        </h1>
        <p
          ref={roleRef}
          className="text-sm md:text-base font-light tracking-[0.35em] uppercase text-[#A1A1AA] mb-6"
        >
          Davaajargal Lodonjamts
        </p>
        <p
          ref={taglineRef}
          className="text-base md:text-lg font-light text-[#A1A1AA]/60 max-w-lg leading-relaxed tracking-wide"
        >
          Шинээр төгссөн junior full-stack developer. Суралцаж, бүтээж байна.
        </p>
      </div>
    </section>
  );
}
