"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects } from "@/data/projects";

export function Projects() {
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

      // Project cards emerge from darkness
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        });
      });

      // Exit
      gsap.to(containerRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 50%",
          end: "bottom 15%",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="w-12 h-px bg-[#DC2626] mb-8" />
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-yapari)] text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-8 sm:mb-16"
        >
          Төсөл
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group relative border border-white/10 bg-black/40 backdrop-blur-md p-4 sm:p-6 md:p-8 hover:border-[#DC2626]/30 transition-all duration-700"
            >
              {/* Year badge */}
              <div className="absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase text-[#DC2626]/50">
                {project.year}
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#DC2626] transition-colors duration-500">
                {project.title}
              </h3>

              <p className="text-sm text-[#A1A1AA] font-light leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-white/10 text-[#A1A1AA]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-t from-[#DC2626]/[0.02] to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
