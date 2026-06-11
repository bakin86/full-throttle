"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { skills } from "@/data/skills";

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading entrance
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // Staggered card entrance
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top ${60 - i * 5}%`,
            end: `top ${35 - i * 5}%`,
            scrub: 1,
          },
        });
      });

      // Exit
      gsap.to(containerRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 60%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center md:justify-end px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-md w-full">
        <div className="w-12 h-px bg-[#DC2626] mb-8" />
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-yapari)] text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-12"
        >
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="hud-glow border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-4 group hover:border-[#DC2626]/30 transition-colors duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-normal tracking-wide text-[#F5F5F5]">
                  {skill.name}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#DC2626]/60">
                  {skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
