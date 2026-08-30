"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const cardLooks = [
  { body: "#c9ff6a", detail: "#092019", metalness: 0.12, roughness: 0.38 },
  { body: "#ece7db", detail: "#17342a", metalness: 0.05, roughness: 0.48 },
  { body: "#132d25", detail: "#d7ff7c", metalness: 0.22, roughness: 0.3 },
  { body: "#8ea69c", detail: "#071d17", metalness: 0.48, roughness: 0.27 },
  { body: "#d8b96b", detail: "#10271f", metalness: 0.52, roughness: 0.25 },
  { body: "#273a34", detail: "#f4f0e8", metalness: 0.18, roughness: 0.44 },
];

function PhysicalCard({ index }: { index: number }) {
  const look = cardLooks[index % cardLooks.length];
  return (
    <group>
      <RoundedBox args={[3.25, 2.02, 0.12]} radius={0.12} smoothness={6}>
        <meshStandardMaterial color={look.body} metalness={look.metalness} roughness={look.roughness} />
      </RoundedBox>

      <RoundedBox args={[0.54, 0.42, 0.045]} radius={0.055} smoothness={4} position={[-0.92, 0.25, 0.086]}>
        <meshStandardMaterial color="#c9b273" metalness={0.72} roughness={0.27} />
      </RoundedBox>

      <mesh position={[0.86, 0.62, 0.09]}>
        <boxGeometry args={[0.72, 0.055, 0.025]} />
        <meshStandardMaterial color={look.detail} />
      </mesh>
      <mesh position={[1.02, 0.45, 0.09]}>
        <boxGeometry args={[0.4, 0.055, 0.025]} />
        <meshStandardMaterial color={look.detail} />
      </mesh>
      <mesh position={[-0.62, -0.55, 0.09]}>
        <boxGeometry args={[1.14, 0.04, 0.025]} />
        <meshStandardMaterial color={look.detail} transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.93, -0.72, 0.09]}>
        <boxGeometry args={[0.52, 0.04, 0.025]} />
        <meshStandardMaterial color={look.detail} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function OrbitScene({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Group | null)[]>([]);
  const total = cardLooks.length;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * (reducedMotion ? 0 : 0.11);
    if (rig.current) {
      const px = reducedMotion ? 0 : state.pointer.x * 0.12;
      const py = reducedMotion ? 0 : state.pointer.y * 0.08;
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, px, 3.5, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -py, 3.5, delta);
    }

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const angle = (index / total) * Math.PI * 2 + t;
      const depth = Math.sin(angle);
      card.position.set(Math.cos(angle) * 3.8, Math.sin(angle * 2) * 0.42, depth * 2.1);
      card.rotation.set(-0.08 + depth * 0.08, -angle + Math.PI / 2, Math.sin(angle) * 0.04);
      const scale = 0.72 + (depth + 1) * 0.1;
      card.scale.setScalar(scale);
    });
  });

  return (
    <group ref={rig} rotation={[0.08, 0, 0]}>
      {cardLooks.map((_, index) => (
        <group
          key={index}
          ref={(element) => {
            cardRefs.current[index] = element;
          }}
        >
          <PhysicalCard index={index} />
        </group>
      ))}
    </group>
  );
}

export default function CardOrbit() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="orbit-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8.2], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={4.1} color="#fff7dd" />
        <pointLight position={[-5, -2, 3]} intensity={3.2} color="#8cffb4" />
        <pointLight position={[4, 1, -3]} intensity={2.3} color="#d3b76d" />
        <OrbitScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
