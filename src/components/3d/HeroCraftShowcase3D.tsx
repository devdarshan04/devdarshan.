import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Box, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const count = 180;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.04;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#f97316" transparent opacity={0.6} />
    </points>
  );
}

function FloatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });
  return (
    <Torus ref={ref} args={[1, 0.32, 16, 60]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#f97316" roughness={0.3} metalness={0.6} emissive="#c2590d" emissiveIntensity={0.2} />
    </Torus>
  );
}

function FloatingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 2.2;
      ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.8 + 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Sphere ref={ref} args={[0.5, 32, 32]} position={[2, 0, 0]}>
      <MeshDistortMaterial color="#de5a37" distort={0.3} speed={2} roughness={0.2} metalness={0.4} />
    </Sphere>
  );
}

function FloatingBox() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4;
      ref.current.rotation.z = state.clock.elapsedTime * 0.3;
      ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 2.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.8 - 0.5;
    }
  });
  return (
    <Box ref={ref} args={[0.7, 0.7, 0.7]} position={[-2, 0, 0]}>
      <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.7} emissive="#312e81" emissiveIntensity={0.15} />
    </Box>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#fff7ed" />
      <pointLight position={[-3, 3, 2]} intensity={1.5} color="#f97316" />
      <pointLight position={[3, -2, -2]} intensity={0.8} color="#4f46e5" />
      <FloatingTorus />
      <FloatingSphere />
      <FloatingBox />
      <Particles />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

export default function HeroCraftShowcase3D() {
  return (
    <div style={{ width: '100%', height: '320px' }}>
      <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl animate-pulse" />}>
        <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} style={{ background: 'transparent' }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
