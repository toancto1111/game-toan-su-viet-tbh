import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Một component "Tướng Dummy" làm từ các khối cơ bản
function DummyHero(props: any) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Tạo hiệu ứng lắc nhẹ (thở)
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 0.5;
    }
  });

  return (
    <group 
      {...props} 
      ref={group}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      onClick={(e) => { e.stopPropagation(); setActive(!active); }}
    >
      {/* Thân người (Capsule) */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.3, 1, 4, 16]} />
        <meshStandardMaterial 
          color={active ? '#ef4444' : hovered ? '#fca5a5' : '#b45309'} 
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Đầu */}
      <mesh castShadow position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#fca5a5" roughness={0.3} />
      </mesh>

      {/* Cây kiếm (Box) */}
      <mesh castShadow position={[0.4, 0.5, 0.3]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.05, 1, 0.1]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Cán kiếm */}
      <mesh castShadow position={[0.4, 0, 0.3]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.15]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
    </group>
  );
}

export default function Hero3DDemo({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      {/* Header UI */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 pointer-events-none">
        <div>
          <h2 className="text-3xl font-cinzel font-black text-amber-500 tracking-wider" style={{ textShadow: '0 0 10px rgba(245,158,11,0.5)' }}>
            ĐẤU TRƯỜNG 3D (THỬ NGHIỆM)
          </h2>
          <p className="text-stone-400 mt-2">Dùng chuột trái để xoay, lăn chuột để zoom. Click vào Tướng để đổi màu.</p>
        </div>
        <button 
          onClick={onClose}
          className="pointer-events-auto bg-stone-800 hover:bg-red-900 text-white px-6 py-2 rounded-xl font-bold border border-stone-600 hover:border-red-500 transition-colors"
        >
          Đóng 3D
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 6], fov: 50 }} shadows>
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={1024}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ef4444" />
          
          <Environment preset="city" />

          {/* Tướng bên trái */}
          <DummyHero position={[-1.5, 0, 0]} />
          
          {/* Tướng bên phải (đối thủ) */}
          <DummyHero position={[1.5, 0, 0]} rotation={[0, -Math.PI, 0]} />

          {/* Bóng dưới sàn */}
          <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
          
          {/* Sàn vô hình để hứng bóng */}
          <mesh receiveShadow position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <shadowMaterial opacity={0.2} />
          </mesh>

          <OrbitControls 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minDistance={2}
            maxDistance={10}
          />
        </Canvas>
      </div>
    </div>
  );
}
