import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, OrbitControls } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

const ORBIT_COLORS = ['#f97316','#de5a37','#4f46e5','#16a34a','#0891b2','#dc2626','#9333ea','#ca8a04'];
const STEP_LABELS = ['Product','Signals','Demand','Analysis','Recommend','Action','Feedback','Learns'];

function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <Sphere ref={ref} args={[0.9, 32, 32]}>
      <meshStandardMaterial color="#f97316" wireframe={false} roughness={0.1} metalness={0.8} emissive="#c2590d" emissiveIntensity={0.4} />
    </Sphere>
  );
}

function WireOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.elapsedTime * 0.25;
    }
  });
  return (
    <Sphere ref={ref} args={[1.1, 16, 16]}>
      <meshStandardMaterial color="#f97316" wireframe transparent opacity={0.2} />
    </Sphere>
  );
}

function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Torus ref={ref} args={[2.5, 0.015, 8, 120]}>
      <meshStandardMaterial color="#f97316" transparent opacity={0.4} emissive="#f97316" emissiveIntensity={0.6} />
    </Torus>
  );
}

function OrbitingSphere({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = 0.5 + index * 0.05;
  const offset = (index / total) * Math.PI * 2;
  const color = ORBIT_COLORS[index % ORBIT_COLORS.length];
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * 2.5;
      ref.current.position.y = Math.sin(t * 0.5) * 0.4;
      ref.current.position.z = Math.sin(t) * 2.5;
    }
  });
  return (
    <Sphere ref={ref} args={[0.18, 16, 16]}>
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} emissive={color} emissiveIntensity={0.5} />
    </Sphere>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={2} color="#f97316" />
      <pointLight position={[-3, 3, -2]} intensity={1} color="#4f46e5" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <CentralOrb />
      <WireOrb />
      <OrbitRing />
      {STEP_LABELS.map((_, i) => (
        <OrbitingSphere key={i} index={i} total={STEP_LABELS.length} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </>
  );
}

export default function GrowthOrb3D() {
  return (
    <div style={{ width: '100%', height: '320px' }}>
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-orange-400">Loading 3D...</div>}>
        <Canvas camera={{ position: [0, 1, 5.5], fov: 50 }} style={{ background: 'transparent' }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
