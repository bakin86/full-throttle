export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  url?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools";
}

export interface CameraKeyframe {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
}

export interface Chapter {
  id: string;
  label: string;
  start: number; // scroll progress 0-1
  end: number;
  camera: CameraKeyframe;
}
