"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const courses = [
  { name: "Өгөгдлийн санг зохион байгуулах, удирдах", score: 95, grade: "A+" },
  { name: "Вэб хөгжүүлэлтийн үндэс суурь", score: 92, grade: "A" },
  { name: "Програмчлалын логик болон алгоритмын үндэс суурь", score: 86, grade: "B+" },
  { name: "Серверийн архитектур зохион байгуулах ба хэрэгжүүлэх", score: 90, grade: "A" },
  { name: "React ашиглан динамик вэб хэрэглүүр бүтээх", score: 92, grade: "A" },
  { name: "Вэб загвар дизайн", score: 90, grade: "A" },
  { name: "Төсөл", score: 86, grade: "B+" },
];

export function Education() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      });

      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          cardRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          coursesRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

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
      className="min-h-screen flex items-center px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="w-full max-w-2xl">
        <div className="w-12 h-px bg-[#DC2626] mb-8" />
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-yapari)] text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-10"
        >
          Боловсрол
        </h2>

        {/* Institution card */}
        <div
          ref={cardRef}
          className="border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 md:p-8 mb-6"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">
                Indra Cyber Institute
              </h3>
              <p className="text-sm text-[#A1A1AA] font-light tracking-wide">
                IBM FullStack Diploma
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA]">
                2026
              </span>
              <div className="mt-1">
                <span className="text-sm font-bold text-[#DC2626]">GPA 3.5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course grades */}
        <div ref={coursesRef} className="space-y-2">
          {courses.map((course, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border border-white/5 bg-white/[0.02] px-3 sm:px-4 py-2.5"
            >
              <span className="text-xs sm:text-sm font-light text-[#A1A1AA] leading-tight">
                {course.name}
              </span>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="text-xs text-[#A1A1AA]/60">{course.score}</span>
                <span className={`text-xs font-bold tracking-wider ${
                  course.grade === "A+" ? "text-[#DC2626]" : "text-white"
                }`}>
                  {course.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
