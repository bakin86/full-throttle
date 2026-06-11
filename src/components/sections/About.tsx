"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      tl.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      textRefs.current.forEach((el, i) => {
        tl.from(
          el,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          `-=0.5`
        );
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
    <section ref={containerRef} className="min-h-screen flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        <div className="w-12 h-px bg-[#DC2626] mb-8" />
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-yapari)] text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-10"
        >
          Миний тухай
        </h2>

        <div className="space-y-6 text-[#A1A1AA] font-light leading-[1.8] tracking-wide">
          <p ref={(el) => { if (el) textRefs.current[0] = el; }}>
            Хөгжүүлэгчийн замд богино зам гэж байдаггүй.
          </p>
          <p ref={(el) => { if (el) textRefs.current[1] = el; }}>
            Би React, Next.js, Node.js ашиглан веб бүтээгдэхүүн хөгжүүлдэг
            junior full-stack developer. Төсөл бүрээс шинэ зүйл сурч, алдаа
            бүрээс туршлага авч, алхам алхмаар урагшилж байна.
          </p>
          <p ref={(el) => { if (el) textRefs.current[2] = el; }}>
            Миний хувьд хамгийн чухал нь төгсгөл биш — харин тэр хүртэлх
            аялал юм.
          </p>
        </div>
      </div>
    </section>
  );
}
