"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type CardLook = {
  name: string;
  sub: string;
  value: string;
  reason: string;
  from: string;
  to: string;
  ink: string;
  edge: string;
  metalness: number;
  roughness: number;
};

const cardLooks: CardLook[] = [
  { name: "Everyday Plus", sub: "CASHBACK", value: "₹62", reason: "Dining multiplier wins", from: "#173B64", to: "#0B2139", ink: "#F6F4ED", edge: "#071727", metalness: .16, roughness: .28 },
  { name: "Travel Metal", sub: "TRAVEL", value: "₹48", reason: "Better on flights", from: "#EAD485", to: "#B9922E", ink: "#172333", edge: "#80671E", metalness: .58, roughness: .18 },
  { name: "UPI Edge", sub: "UPI", value: "₹43", reason: "UPI reward rule", from: "#8DA5C2", to: "#4D6E96", ink: "#F6F4ED", edge: "#3C5877", metalness: .24, roughness: .24 },
  { name: "Dining Core", sub: "DINING", value: "₹39", reason: "Category bonus", from: "#272727", to: "#101010", ink: "#EAD485", edge: "#090909", metalness: .42, roughness: .2 },
  { name: "Online Max", sub: "ONLINE", value: "₹31", reason: "Online spend boost", from: "#244B77", to: "#152B47", ink: "#F6F4ED", edge: "#102036", metalness: .22, roughness: .27 },
  { name: "Fuel Smart", sub: "FUEL", value: "₹28", reason: "Fuel surcharge value", from: "#D9E4E7", to: "#8DA5C2", ink: "#173B64", edge: "#6A839F", metalness: .12, roughness: .34 },
  { name: "Premium Reserve", sub: "PREMIUM", value: "₹24", reason: "Premium base earn", from: "#1D1D1F", to: "#3A3322", ink: "#F4DE8D", edge: "#0D0D0E", metalness: .5, roughness: .19 },
  { name: "Cashback Flex", sub: "CASHBACK", value: "₹19", reason: "Simple flat reward", from: "#4C6788", to: "#1E3A5B", ink: "#F6F4ED", edge: "#17304C", metalness: .2, roughness: .29 },
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

  ctx.save();
  ctx.globalAlpha = .09;
  ctx.strokeStyle = look.ink;
  ctx.lineWidth = 1;
  for (let x = -420; x < 1300; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 500, 640);
    ctx.stroke();
  }
  ctx.restore();

  const bloom = ctx.createRadialGradient(810, 70, 0, 810, 70, 470);
  bloom.addColorStop(0, "rgba(255,255,255,.18)");
  bloom.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, 1024, 640);

  ctx.fillStyle = look.ink;
  ctx.globalAlpha = .92;
  ctx.font = "700 38px Arial, sans-serif";
  ctx.fillText("CARDEIFY", 58, 72);

  ctx.globalAlpha = .56;
  ctx.font = "600 17px Arial, sans-serif";
  ctx.fillText("SMART WALLET PROFILE", 60, 101);

  ctx.globalAlpha = 1;
  ctx.font = "700 50px Arial, sans-serif";
  ctx.fillText(look.name.toUpperCase(), 58, 454);
  ctx.globalAlpha = .64;
  ctx.font = "700 19px Arial, sans-serif";
  ctx.fillText(look.sub, 60, 489);

  ctx.globalAlpha = .55;
  ctx.font = "500 19px Arial, sans-serif";
  ctx.fillText("•••• 2841", 60, 575);
  ctx.textAlign = "right";
  ctx.fillText("ILLUSTRATIVE PROFILE", 962, 575);
  ctx.textAlign = "left";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function Chip() {
  return (
    <group position={[-1.05, .28, .092]}>
      <RoundedBox args={[.58, .43, .046]} radius={.055} smoothness={5}>
        <meshStandardMaterial color="#D8C17A" metalness={.84} roughness={.17} />
      </RoundedBox>
      {[-.17, 0, .17].map((x) => (
        <mesh key={x} position={[x, 0, .026]}><boxGeometry args={[.014, .32, .008]} /><meshStandardMaterial color="#886F2C" metalness={.72} roughness={.25} /></mesh>
      ))}
      {[-.1, .1].map((y) => (
        <mesh key={y} position={[0, y, .027]}><boxGeometry args={[.46, .014, .008]} /><meshStandardMaterial color="#886F2C" metalness={.72} roughness={.25} /></mesh>
      ))}
    </group>
  );
}

function Contactless({ color }: { color: string }) {
  return (
    <group position={[1.12, .65, .097]} rotation={[0, 0, -.08]}>
      {[.09, .15, .21].map((radius) => (
        <mesh key={radius} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[radius, .011, 6, 24, Math.PI]} /><meshStandardMaterial color={color} transparent opacity={.76} /></mesh>
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
      <RoundedBox args={[3.36, 2.12, .15]} radius={.14} smoothness={8}>
        <meshStandardMaterial color={look.from} map={texture ?? undefined} metalness={look.metalness} roughness={look.roughness} />
      </RoundedBox>
      <mesh position={[0, 0, -.082]}><boxGeometry args={[2.96, .27, .018]} /><meshStandardMaterial color={look.edge} roughness={.5} /></mesh>
      <Chip />
      <Contactless color={look.ink} />
    </group>
  );
}

function CarouselScene({ reducedMotion, onActiveChange }: { reducedMotion: boolean; onActiveChange: (index: number) => void }) {
  const rig = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Group | null)[]>([]);
  const activeRef = useRef(0);
  const phaseRef = useRef(0);

  useFrame((state, delta) => {
    phaseRef.current += reducedMotion ? 0 : delta * .19;
    const phase = phaseRef.current;

    if (rig.current) {
      const px = reducedMotion ? 0 : state.pointer.x * .055;
      const py = reducedMotion ? 0 : state.pointer.y * .025;
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, px, 3.4, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -.045 - py, 3.4, delta);
    }

    let closest = 0;
    let closestDepth = -Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const angle = (index / cardLooks.length) * Math.PI * 2 + phase;
      const depth = Math.cos(angle);
      const x = Math.sin(angle) * 5.05;
      const y = -.35 + Math.cos(angle) * .36;
      const z = depth * 2.18;
      const side = Math.sin(angle);

      card.position.set(x, y, z);
      card.rotation.set(-.035 + Math.abs(side) * .025, -side * .2, -side * .18);
      const scale = THREE.MathUtils.mapLinear(depth, -1, 1, .63, 1.05);
      card.scale.setScalar(scale);

      if (depth > closestDepth) {
        closestDepth = depth;
        closest = index;
      }
    });

    if (closest !== activeRef.current) {
      activeRef.current = closest;
      onActiveChange(closest);
    }
  });

  return (
    <group ref={rig} position={[0, -.1, 0]}>
      {cardLooks.map((look, index) => (
        <group key={look.name} ref={(element) => { cardRefs.current[index] = element; }}><PhysicalCard look={look} /></group>
      ))}
    </group>
  );
}

export default function CardOrbit() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = cardLooks[activeIndex] ?? cardLooks[0];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="orbit-stage">
      <div className="orbit-canvas" aria-hidden="true">
        <Canvas camera={{ position: [0, .1, 10.4], fov: 34 }} dpr={[1, 1.45]} frameloop={reducedMotion ? "demand" : "always"} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
          <fog attach="fog" args={["#171717", 11, 18]} />
          <ambientLight intensity={1.05} />
          <directionalLight position={[2.4, 5.2, 6.5]} intensity={4.2} color="#FFF5D1" />
          <pointLight position={[-5.2, -.7, 4.2]} intensity={2.9} color="#D4B33B" />
          <pointLight position={[5.4, 1.1, 2.6]} intensity={3.2} color="#7290B5" />
          <CarouselScene reducedMotion={reducedMotion} onActiveChange={setActiveIndex} />
        </Canvas>
      </div>

      <div className="orbit-readout" aria-live="polite">
        <span>BEST ILLUSTRATIVE CARD</span>
        <div><strong>{active.name}</strong><b>{active.value}</b></div>
        <p>{active.reason}</p>
      </div>
    </div>
  );
}
