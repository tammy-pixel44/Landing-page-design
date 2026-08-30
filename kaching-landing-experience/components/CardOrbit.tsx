"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const cardLooks = [
  { body: "#d5ff69", ink: "#082019", edge: "#a9d94f", metalness: 0.08, roughness: 0.36 },
  { body: "#eee9df", ink: "#142e25", edge: "#c8c1b6", metalness: 0.04, roughness: 0.52 },
  { body: "#172e27", ink: "#d7ff72", edge: "#315448", metalness: 0.2, roughness: 0.28 },
  { body: "#839990", ink: "#071d17", edge: "#627a70", metalness: 0.42, roughness: 0.24 },
  { body: "#c7a85f", ink: "#10251e", edge: "#987d3e", metalness: 0.48, roughness: 0.23 },
  { body: "#263a33", ink: "#f2eee4", edge: "#3c5149", metalness: 0.14, roughness: 0.4 },
];

function Chip() {
  return (
    <group position={[-0.94, 0.2, 0.09]}>
      <RoundedBox args={[0.62, 0.46, 0.045]} radius={0.055} smoothness={5}>
        <meshStandardMaterial color="#c9aa63" metalness={0.78} roughness={0.22} />
      </RoundedBox>
      {[-0.18, 0, 0.18].map((x) => (
        <mesh key={`v-${x}`} position={[x, 0, 0.026]}>
          <boxGeometry args={[0.018, 0.35, 0.008]} />
          <meshStandardMaterial color="#8e7137" metalness={0.7} roughness={0.28} />
        </mesh>
      ))}
      {[-0.11, 0.11].map((y) => (
        <mesh key={`h-${y}`} position={[0, y, 0.027]}>
          <boxGeometry args={[0.5, 0.016, 0.008]} />
          <meshStandardMaterial color="#8e7137" metalness={0.7} roughness={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function Contactless({ color }: { color: string }) {
  return (
    <group position={[1.03, 0.58, 0.09]} rotation={[0, 0, -0.12]}>
      {[0.12, 0.2, 0.28].map((radius) => (
        <mesh key={radius} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[radius, 0.013, 6, 26, Math.PI]} />
          <meshStandardMaterial color={color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function PhysicalCard({ index }: { index: number }) {
  const look = cardLooks[index % cardLooks.length];

  return (
    <group>
      <RoundedBox args={[3.36, 2.12, 0.14]} radius={0.13} smoothness={8}>
        <meshStandardMaterial color={look.body} metalness={look.metalness} roughness={look.roughness} />
      </RoundedBox>

      <mesh position={[0, 0, -0.079]}>
        <boxGeometry args={[2.92, 0.31, 0.018]} />
        <meshStandardMaterial color={look.edge} roughness={0.55} />
      </mesh>

      <Chip />
      <Contactless color={look.ink} />

      <mesh position={[0.74, 0.72, 0.091]}>
        <boxGeometry args={[0.94, 0.052, 0.022]} />
        <meshStandardMaterial color={look.ink} />
      </mesh>
      <mesh position={[0.98, 0.54, 0.091]}>
        <boxGeometry args={[0.46, 0.052, 0.022]} />
        <meshStandardMaterial color={look.ink} transparent opacity={0.68} />
      </mesh>

      <mesh position={[-0.7, -0.58, 0.091]}>
        <boxGeometry args={[1.34, 0.036, 0.022]} />
        <meshStandardMaterial color={look.ink} transparent opacity={0.72} />
      </mesh>
      <mesh position={[-1.05, -0.75, 0.091]}>
        <boxGeometry args={[0.64, 0.036, 0.022]} />
        <meshStandardMaterial color={look.ink} transparent opacity={0.42} />
      </mesh>

      <mesh position={[1.18, -0.68, 0.091]}>
        <circleGeometry args={[0.18, 34]} />
        <meshStandardMaterial color={look.ink} transparent opacity={0.65} />
      </mesh>
      <mesh position={[1.37, -0.68, 0.092]}>
        <circleGeometry args={[0.18, 34]} />
        <meshStandardMaterial color={look.ink} transparent opacity={0.36} />
      </mesh>
    </group>
  );
}

function OrbitScene({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Group | null)[]>([]);
  const scrollProgress = useRef(0);
  const total = cardLooks.length;

  useEffect(() => {
    if (reducedMotion) return;
    const trigger = ScrollTrigger.create({
      trigger: ".hero-shell",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  useFrame((state, delta) => {
    const p = reducedMotion ? 0.66 : scrollProgress.current;
    const selection = THREE.MathUtils.smoothstep(p, 0.38, 0.92);
    const orbitSpeed = THREE.MathUtils.lerp(0.12, 0.025, selection);
    const t = state.clock.elapsedTime * (reducedMotion ? 0 : orbitSpeed);

    if (rig.current) {
      const px = reducedMotion ? 0 : state.pointer.x * 0.11 * (1 - selection * 0.55);
      const py = reducedMotion ? 0 : state.pointer.y * 0.065 * (1 - selection * 0.55);
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, px, 3.2, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -py + 0.04, 3.2, delta);
    }

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const angle = (index / total) * Math.PI * 2 + t;
      const depth = Math.sin(angle);
      const orbitPosition = new THREE.Vector3(
        Math.cos(angle) * 4.15,
        Math.sin(angle * 1.75) * 0.52,
        depth * 2.25,
      );

      if (index === 0) {
        const target = new THREE.Vector3(0.25, -0.12, 2.65);
        card.position.lerpVectors(orbitPosition, target, selection);
        card.rotation.set(
          THREE.MathUtils.lerp(-0.08 + depth * 0.06, -0.03, selection),
          THREE.MathUtils.lerp(-angle + Math.PI / 2, -0.13, selection),
          THREE.MathUtils.lerp(Math.sin(angle) * 0.035, -0.025, selection),
        );
        const scale = THREE.MathUtils.lerp(0.82 + (depth + 1) * 0.08, 1.16, selection);
        card.scale.setScalar(scale);
      } else {
        const side = index % 2 === 0 ? 1 : -1;
        const retreat = new THREE.Vector3(side * (5.6 + index * 0.18), (index - 3) * 0.22, -2.3 - index * 0.24);
        card.position.lerpVectors(orbitPosition, retreat, selection);
        card.rotation.set(
          -0.08 + depth * 0.06,
          -angle + Math.PI / 2 + side * selection * 0.2,
          Math.sin(angle) * 0.035,
        );
        const scale = THREE.MathUtils.lerp(0.78 + (depth + 1) * 0.075, 0.62, selection);
        card.scale.setScalar(scale);
      }
    });
  });

  return (
    <group ref={rig} rotation={[0.06, 0, 0]}>
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
      <Canvas
        camera={{ position: [0, 0.05, 8.45], fov: 36 }}
        dpr={[1, 1.45]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#071a15", 8, 16]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[3.8, 5.5, 5]} intensity={4.4} color="#fff4d8" />
        <pointLight position={[-4.5, -1.5, 3.4]} intensity={3.1} color="#a7ffbd" />
        <pointLight position={[4.6, 1.8, -2.5]} intensity={2.15} color="#d6b568" />
        <OrbitScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
