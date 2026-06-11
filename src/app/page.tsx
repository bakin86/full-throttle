"use client";

import dynamic from "next/dynamic";
import { useLenis } from "@/hooks/useLenis";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { SCROLL_PAGES } from "@/lib/constants";

// Dynamic import for the 3D scene to avoid SSR issues
const Experience = dynamic(
  () =>
    import("@/components/three/Experience").then((mod) => ({
      default: mod.Experience,
    })),
  { ssr: false }
);

export default function Home() {
  useLenis();
  useScrollProgress();

  return (
    <>
      {/* Fixed 3D scene */}
      <Experience />

      {/* Scrollable HTML overlay */}
      <div
        className="sections-overlay"
        style={{ height: `${SCROLL_PAGES * 100}vh` }}
      >
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
