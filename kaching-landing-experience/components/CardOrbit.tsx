"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

type CardLook = {
  name: string;
  sub: string;
  from: string;
  to: string;
  ink: string;
  edge: string;
  metalness: number;
  roughness: number;
};

const cardLooks: CardLook[] = [
  { name: "CASHBACK", sub: "EVERYDAY", from: "#142A44", to: "#173B64", ink: "#F6FAFF", edge: "#0C1F35", metalness: .16, roughness: .3 },
  { name: "REWARDS", sub: "CORE", from: "#536C8B", to: "#8DA5C2", ink: "#F6FAFF", edge: "#425E80", metalness: .28, roughness: .28 },
  { name: "PREMIUM", sub: "UPI", from: "#1E1E1E", to: "#313131", ink: "#EAD485", edge: "#0F0F0F", metalness: .42, roughness: .2 },
  { name: "TRAVEL", sub: "SIGNATURE", from: "#173963", to: "#214D7E", ink: "#F4DE8D", edge: "#0C1F35", metalness: .25, roughness: .25 },
  { name: "METAL", sub: "CARD", from: "#F4DE8D", to: "#D4B33B", ink: "#173B64", edge: "#88711F", metalness: .55, roughness: .18 },
  { name: "ONLINE", sub: "PLUS", from: "#193456", to: "#0C1F35", ink: "#F6FAFF", edge: "#091725", metalness: .18, roughness: .26 },
  { name: "TRAVEL", sub: "REWARDS", from: "#8DA5C2", to: "#55759D", ink: "#0C1F35", edge: "#425E80", metalness: .22, roughness: .3 },
  { name: "EVERYDAY", sub: "EDGE", from: "#2C2C2C", to: "#1A1A1A", ink: "#EAD485", edge: "#0C0C0C", metalness: .38, roughness: .2 },
  { name: "SMART", sub: "SPEND", from: "#173B64", to: "#8DA5C2", ink: "#F6FAFF", edge: "#173963", metalness: .25, roughness: .24 },
];

function makeCardTexture(look: CardLook) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, 640, 1024);
  gradient.addColorStop(0, look.from);
  gradient.addColorStop(1, look.to);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 640, 1024);

  ctx.globalAlpha = .09;
  ctx.strokeStyle = look.ink;
  ctx.lineWidth = 1;
  for (let x = -500; x < 900; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 820, 1024);
    ctx.stroke();
  }

  const glow = ctx.createRadialGradient(500, 120, 0, 500, 120, 380);
  glow.addColorStop(0, "rgba(255,255,255,.18)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.globalAlpha = 1;
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 640, 1024);

  ctx.fillStyle = look.ink;
  ctx.globalAlpha = .9;
  ctx.font = "700 34px Arial, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("CARDEIFY", 54, 82);

  ctx.globalAlpha = .62;
  ctx.font = "500 18px Arial, sans-serif";
  ctx.fillText("SMART WALLET", 55, 112);

  ctx.globalAlpha = 1;
  ctx.font = "700 47px Arial, sans-serif";
  ctx.fillText(look.name, 54, 660);
  ctx.globalAlpha = .66;
  ctx.font = "600 21px Arial, sans-serif";
  ctx.fillText(look.sub, 56, 695);

  ctx.globalAlpha = .54;
  ctx.font = "500 18px Arial, sans-serif";
  ctx.fillText("•••• 2841", 55, 930);
  ctx.font = "600 15px Arial, sans-serif";
  ctx.fillText("CARD PROFILE", 430, 930);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function Chip() {
  return (
    <group position={[-.47, .55, .09]}>
      <RoundedBox args={[
        .5, .39, .045,
      ]} radius={.05} smoothness={5}>
        <meshStandardMaterial color="#D8C17A" metalness={.82} roughness={.18} />
      </RoundedBox>
      {[-.14, 0, .14].map((x) => (
        <mesh key={x} position={[x, 0, .025]}>
          <boxGeometry args={[.014, .29, .008]} />
          <meshStandardMaterial color="#8B7331" metalness={.7} roughness={.28} />
        </mesh>
      ))}
      {[-.09, .09].map((y) => (
        <mesh key={y} position={[0, y, .026]}>
          <boxGeometry args={[.4, .014, .008]} />
          <meshStandardMaterial color="#8B7331" metalness={.7} roughness={.28} />
        </mesh>
      ))}
    </group>
  );
}

function Contactless({ color }: { color: string }) {
  return (
    <group position={[.48, .78, .095]} rotation={[0, 0, -.08]}>
      {[.085, .145, .205].map((radius) => (
        <mesh key={radius} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[radius, .01, 6, 22, Math.PI]} />
          <meshStandardMaterial color={color} transparent opacity={.76} />
        </mesh>
      ))}
    </group>
  );
}

function PhysicalCard({ look }: { look: CardLook }) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const next = makeCardTexture(look);
    setTexture(next);
    return () => next?.dispose();
  }, [look]);

  return (
    <group>
      <RoundedBox args={[2.12, 3.36, .15]} radius={.13} smoothness={8}>
        <meshStandardMaterial
          color={look.from}
          map={texture ?? undefined}
          metalness={look.metalness}
          roughness={look.roughness}
        />
      </RoundedBox>
      <mesh position={[0, 0, -.082]}>
        <boxGeometry args={[1.84, .32, .018]} />
        <meshStandardMaterial color={look.edge} roughness={.5} />
      </mesh>
      <Chip />
      <Contactless color={look.ink} />
    </group>
  );
}

function FanScene({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Group | null)[]>([]);
  const scroll = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;
    const trigger = ScrollTrigger.create({
      trigger: ".hero-shell",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => { scroll.current = self.progress; },
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  useFrame((state, delta) => {
    const p = reducedMotion ? 0 : scroll.current;
    const spread = THREE.MathUtils.lerp(1, 1.1, p);
    const lift = THREE.MathUtils.smoothstep(p, .35, .9);

    if (rig.current) {
      const px = reducedMotion ? 0 : state.pointer.x * .08;
      const py = reducedMotion ? 0 : state.pointer.y * .035;
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, px, 3.5, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -.055 - py, 3.5, delta);
    }

    const middle = (cardLooks.length - 1) / 2;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const normalized = (index - middle) / middle;
      const angle = normalized * 1.04;
      const x = Math.sin(angle) * 4.25 * spread;
      const y = -1.05 + Math.cos(angle) * 1.08 + (index === middle ? lift * .45 : 0);
      const z = Math.cos(angle) * .72 + (index === middle ? .45 + lift * .6 : 0) - Math.abs(normalized) * .18;
      const idle = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * .55 + index * .45) * .012;

      card.position.set(x, y + idle, z);
      card.rotation.set(-.02, normalized * -.05, -angle * .9);
      const targetScale = index === middle ? 1.08 + lift * .08 : .92 - Math.abs(normalized) * .09;
      card.scale.setScalar(targetScale);
    });
  });

  return (
    <group ref={rig} position={[0, -.25, 0]}>
      {cardLooks.map((look, index) => (
        <group
          key={look.name + index}
          ref={(element) => { cardRefs.current[index] = element; }}
        >
          <PhysicalCard look={look} />
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
        camera={{ position: [0, .18, 10.6], fov: 34 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#1A1A1A", 10, 18]} />
        <ambientLight intensity={1.05} />
        <directionalLight position={[2.8, 6, 6]} intensity={4.6} color="#fff7d7" />
        <pointLight position={[-5, -.5, 3]} intensity={3.2} color="#D4B33B" />
        <pointLight position={[5, 1.2, 1]} intensity={3.1} color="#55759D" />
        <FanScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
