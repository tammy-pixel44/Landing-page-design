"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type CardLook = {
  label: string;
  from: string;
  to: string;
  ink: string;
  edge: string;
  metalness: number;
  roughness: number;
};

const cardLooks: CardLook[] = [
  { label: "EVERYDAY", from: "#315A87", to: "#173B64", ink: "#F6F4ED", edge: "#0D233A", metalness: .16, roughness: .3 },
  { label: "DINING", from: "#284C75", to: "#142C49", ink: "#F6F4ED", edge: "#0D2036", metalness: .2, roughness: .27 },
  { label: "TRAVEL", from: "#223D5D", to: "#11253C", ink: "#F6F4ED", edge: "#081827", metalness: .28, roughness: .24 },
  { label: "ONLINE", from: "#F4DE8D", to: "#D4B33B", ink: "#172333", edge: "#8B7224", metalness: .38, roughness: .22 },
  { label: "FLEX", from: "#C6D4E5", to: "#8299B6", ink: "#173B64", edge: "#617895", metalness: .14, roughness: .32 },
];

function makeCardTexture(look: CardLook) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, 1024, 640);
  gradient.addColorStop(0, look.from);
  gradient.addColorStop(1, look.to);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 640);

  const glow = ctx.createRadialGradient(800, 20, 0, 800, 20, 520);
  glow.addColorStop(0, "rgba(255,255,255,.28)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1024, 640);

  ctx.save();
  ctx.globalAlpha = .055;
  ctx.strokeStyle = look.ink;
  ctx.lineWidth = 1;
  for (let x = -500; x < 1500; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 430, 640);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = look.ink;
  ctx.globalAlpha = .9;
  ctx.font = "700 30px Arial, sans-serif";
  ctx.fillText("CARDEIFY", 62, 72);

  ctx.globalAlpha = .5;
  ctx.font = "600 16px Arial, sans-serif";
  ctx.fillText("SMART WALLET", 64, 102);

  ctx.globalAlpha = .94;
  ctx.font = "700 54px Arial, sans-serif";
  ctx.fillText(look.label, 62, 475);

  ctx.globalAlpha = .46;
  ctx.font = "500 20px Arial, sans-serif";
  ctx.fillText("•••• 4821", 62, 570);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function Chip({ ink = "#8B7224" }: { ink?: string }) {
  return (
    <group position={[-1.03, .17, .094]}>
      <RoundedBox args={[.58, .43, .038]} radius={.055} smoothness={5}>
        <meshStandardMaterial color="#D9C47E" metalness={.8} roughness={.2} />
      </RoundedBox>
      {[-.17, 0, .17].map((x) => (
        <mesh key={x} position={[x, 0, .024]}>
          <boxGeometry args={[.012, .31, .008]} />
          <meshStandardMaterial color={ink} metalness={.62} roughness={.32} />
        </mesh>
      ))}
      {[-.1, .1].map((y) => (
        <mesh key={y} position={[0, y, .025]}>
          <boxGeometry args={[.45, .012, .008]} />
          <meshStandardMaterial color={ink} metalness={.62} roughness={.32} />
        </mesh>
      ))}
    </group>
  );
}

function Contactless({ color }: { color: string }) {
  return (
    <group position={[1.15, .66, .098]} rotation={[0, 0, -.06]}>
      {[.09, .15, .21].map((radius) => (
        <mesh key={radius} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[radius, .009, 6, 24, Math.PI]} />
          <meshStandardMaterial color={color} transparent opacity={.65} />
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
      <RoundedBox args={[3.36, 2.12, .15]} radius={.15} smoothness={8}>
        <meshPhysicalMaterial
          color={look.from}
          map={texture ?? undefined}
          metalness={look.metalness}
          roughness={look.roughness}
          clearcoat={.34}
          clearcoatRoughness={.26}
        />
      </RoundedBox>
      <mesh position={[0, 0, -.083]}>
        <boxGeometry args={[2.98, .24, .018]} />
        <meshStandardMaterial color={look.edge} roughness={.48} />
      </mesh>
      <Chip ink={look.edge} />
      <Contactless color={look.ink} />
    </group>
  );
}

const FAN_ANGLES = [-.72, -.37, 0, .37, .72];

function easeOutBack(value: number) {
  const c1 = 1.2;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
}

function FanScene({ started, reducedMotion }: { started: boolean; reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const cards = useRef<(THREE.Group | null)[]>([]);
  const progress = useRef(reducedMotion ? 1 : 0);

  useFrame((state, delta) => {
    if (started && progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta * .88);
    }

    const raw = reducedMotion ? 1 : progress.current;
    const fan = raw <= 0 ? 0 : easeOutBack(raw);
    const settle = THREE.MathUtils.smoothstep(raw, .55, 1);

    if (rig.current) {
      const px = reducedMotion ? 0 : state.pointer.x * .045;
      const py = reducedMotion ? 0 : state.pointer.y * .022;
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, px, 4, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -.035 - py, 4, delta);
    }

    cards.current.forEach((card, index) => {
      if (!card) return;

      const angle = FAN_ANGLES[index] * fan;
      const distance = 3.55;
      const x = Math.sin(angle) * distance;
      const y = -.75 - Math.abs(angle) * .54 + (1 - settle) * .28;
      const centerWeight = 1 - Math.abs(index - 2) / 2;
      const z = centerWeight * .16 + index * .015;
      const scale = .86 + settle * .09;

      card.position.x = THREE.MathUtils.damp(card.position.x, x, 8, delta);
      card.position.y = THREE.MathUtils.damp(card.position.y, y, 8, delta);
      card.position.z = THREE.MathUtils.damp(card.position.z, z, 8, delta);
      card.rotation.z = THREE.MathUtils.damp(card.rotation.z, angle * .88, 8, delta);
      card.rotation.y = THREE.MathUtils.damp(card.rotation.y, -angle * .08, 8, delta);
      card.scale.setScalar(THREE.MathUtils.damp(card.scale.x, scale, 8, delta));
    });
  });

  return (
    <group ref={rig} position={[0, -.08, 0]}>
      {cardLooks.map((look, index) => (
        <group
          key={look.label}
          ref={(node) => { cards.current[index] = node; }}
          position={[0, -.47, -index * .02]}
          scale={.84}
        >
          <PhysicalCard look={look} />
        </group>
      ))}
    </group>
  );
}

export default function CardOrbit() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const start = () => setStarted(true);
    window.addEventListener("cardeify:ready", start);

    if (!document.body.dataset.cardeifyLoading) {
      const timer = window.setTimeout(start, 80);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener("cardeify:ready", start);
      };
    }

    return () => window.removeEventListener("cardeify:ready", start);
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "18% 0px 18% 0px",
      threshold: .02,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="orbit-stage" ref={stageRef}>
      <div className="orbit-canvas" aria-hidden="true">
        <Canvas
          camera={{ position: [0, .05, 10.5], fov: 33 }}
          dpr={[1, 1.4]}
          frameloop={reducedMotion || !visible ? "demand" : "always"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[2.8, 5.4, 6.8]} intensity={4.5} color="#FFF4CC" />
          <pointLight position={[-5, -.8, 4]} intensity={2.4} color="#5078A6" />
          <pointLight position={[5, 1.6, 3]} intensity={2.4} color="#E4C65F" />
          <FanScene started={started} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
    </div>
  );
}
