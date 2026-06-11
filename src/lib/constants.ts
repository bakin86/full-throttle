import { Chapter } from "@/types";

// Road: 12 wide, 300 long (Z axis), motorcycle at [2, 0.25, 10]

export const CHAPTERS: Chapter[] = [
  {
    id: "intro",
    label: "Intro",
    start: 0,
    end: 0.2,
    camera: {
      // Trackside — low, wide, dramatic
      position: [7, 1.2, 3],
      lookAt: [0, 0.8, 0],
    },
  },
  {
    id: "about",
    label: "About",
    start: 0.2,
    end: 0.4,
    camera: {
      // Closer, lower — almost ground level
      position: [5.5, 0.5, 1],
      lookAt: [0, 0.6, -1],
    },
  },
  {
    id: "skills",
    label: "Skills",
    start: 0.4,
    end: 0.6,
    camera: {
      // Other side of track, pulled back
      position: [-12, 2.5, 8],
      lookAt: [0, 0.5, -3],
    },
  },
  {
    id: "projects",
    label: "Projects",
    start: 0.6,
    end: 0.8,
    camera: {
      // High TV camera angle
      position: [5, 4, 5],
      lookAt: [0, 0.5, -2],
    },
  },
  {
    id: "contact",
    label: "Contact",
    start: 0.8,
    end: 1.0,
    camera: {
      // Ultra low front — car coming at you
      position: [3, 0.4, -6],
      lookAt: [0, 0.8, 0],
    },
  },
];

export const SCROLL_PAGES = 7;

export const COLORS = {
  background: "#050505",
  text: "#F5F5F5",
  muted: "#A1A1AA",
  accent: "#DC2626",
} as const;
