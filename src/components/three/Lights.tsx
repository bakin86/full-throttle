"use client";

export function Lights() {
  // Bridge road at Y≈12.5, motorcycle at [0, 12.5, 5]
  return (
    <>
      <ambientLight intensity={0.15} color="#8899bb" />
      <directionalLight position={[10, 30, 10]} intensity={0.5} color="#b8c4e0" />

      {/* Street lamps on bridge deck */}
      <pointLight position={[-4, 20, 10]} intensity={10} color="#ffaa55" distance={25} decay={2} />
      <pointLight position={[4, 20, -5]} intensity={8} color="#ffaa55" distance={25} decay={2} />
      <pointLight position={[-4, 20, -25]} intensity={6} color="#ffaa55" distance={20} decay={2} />
      <pointLight position={[4, 20, -45]} intensity={5} color="#ff9944" distance={20} decay={2} />

      {/* Motorcycle headlight */}
      <pointLight position={[0, 13.5, 3]} intensity={5} color="#ffffee" distance={30} decay={2} />

      {/* Gold accent */}
      <pointLight position={[-3, 15, 6]} intensity={3} color="#DC2626" distance={10} decay={2} />
    </>
  );
}
