import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useRef, Suspense, useState } from 'react';
import * as THREE from 'three';

const REGIONS = [
  { name: 'Tamil Nadu', position: [0.3, -1.0, 1.6] as [number,number,number], color: '#f97316', artisans: 24320 },
  { name: 'Rajasthan', position: [-1.2, 0.6, 1.2] as [number,number,number], color: '#6366f1', artisans: 28450 },
  { name: 'West Bengal', position: [1.1, 0.3, 1.3] as [number,number,number], color: '#16a34a', artisans: 19820 },
  { name: 'Gujarat', position: [-1.4, -0.1, 1.1] as [number,number,number], color: '#0891b2', artisans: 22100 },
  { name: 'Odisha', position: [0.9, 0.1, 1.5] as [number,number,number], color: '#dc2626', artisans: 12340 },
  { name: 'Uttar Pradesh', position: [0.0, 0.7, 1.6] as [number,number,number], color: '#ca8a04', artisans: 21420 },
];

function Globe() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.12; });
  return (
    <Sphere ref={ref} args={[1.6, 32, 32]}>
      <meshStandardMaterial color="#1e40af" roughness={0.6} metalness={0.2} emissive="#1e3a8a" emissiveIntensity={0.2} />
    </Sphere>
  );
}

function RegionDot({ position, color, onClick }: { position: [number,number,number]; color: string; onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <Sphere ref={ref} args={[0.08, 12, 12]} position={position} onClick={onClick}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
    </Sphere>
  );
}

function Scene({ onRegionClick }: { onRegionClick: (name: string) => void }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 3]} intensity={0.8} color="#f97316" />
      <Globe />
      {REGIONS.map((r) => (
        <RegionDot key={r.name} position={r.position} color={r.color} onClick={() => onRegionClick(r.name)} />
      ))}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </>
  );
}

export default function IndiaMap3D({ onRegionClick }: { onRegionClick?: (region: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const handleClick = (name: string) => { setSelected(name); onRegionClick?.(name); };
  const region = REGIONS.find((r) => r.name === selected);
  return (
    <div className="relative w-full" style={{ height: 360 }}>
      <Suspense fallback={<div className="w-full h-full bg-blue-950 rounded-xl animate-pulse" />}>
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ background: 'transparent', borderRadius: 12 }}>
          <Scene onRegionClick={handleClick} />
        </Canvas>
      </Suspense>
      {selected && region && (
        <div className="absolute bottom-3 left-3 bg-black/80 text-white text-xs rounded-lg px-3 py-2">
          <div className="font-bold">{region.name}</div>
          <div>{region.artisans.toLocaleString('en-IN')} artisans</div>
        </div>
      )}
      <div className="absolute top-3 left-3 text-white/60 text-xs bg-black/40 px-2 py-1 rounded">Click a dot to explore</div>
    </div>
  );
}
