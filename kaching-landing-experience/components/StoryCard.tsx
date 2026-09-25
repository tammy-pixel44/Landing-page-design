"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Stop = {
  center: number;
  bottom: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

function makeGuideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 800;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createLinearGradient(0, 0, 1280, 800);
  gradient.addColorStop(0, "#F7E7A8");
  gradient.addColorStop(.46, "#EAD485");
  gradient.addColorStop(1, "#C7A63B");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1280, 800);

  const glow = context.createRadialGradient(980, 40, 0, 980, 40, 640);
  glow.addColorStop(0, "rgba(255,255,255,.34)");
  glow.addColorStop(.55, "rgba(255,255,255,.06)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, 1280, 800);

  context.save();
  context.globalAlpha = .055;
  context.strokeStyle = "#172333";
  context.lineWidth = 1;
  for (let x = -450; x < 1650; x += 58) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x + 520, 800);
    context.stroke();
  }
  context.restore();

  context.fillStyle = "#172333";
  context.globalAlpha = .9;
  context.font = "700 36px Arial, sans-serif";
  context.fillText("CARDEIFY", 76, 92);

  context.globalAlpha = .42;
  context.font = "600 18px Arial, sans-serif";
  context.fillText("ILLUSTRATIVE WALLET", 78, 125);

  context.globalAlpha = 1;
  context.font = "700 64px Arial, sans-serif";
  context.fillText("ONLINE", 76, 612);

  context.globalAlpha = .48;
  context.font = "500 23px Arial, sans-serif";
  context.fillText("•••• 4821", 78, 704);

  context.textAlign = "right";
  context.font = "600 17px Arial, sans-serif";
  context.fillText("BEST MOVE", 1202, 706);
  context.textAlign = "left";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function GuideCard() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const next = makeGuideTexture();
    setTexture(next);
    return () => next?.dispose();
  }, []);

  return (
    <group>
      <RoundedBox args={[3.3, 2.08, .145]} radius={.15} smoothness={8}>
        <meshPhysicalMaterial
          color="#EAD485"
          map={texture ?? undefined}
          metalness={.34}
          roughness={.22}
          clearcoat={.46}
          clearcoatRoughness={.24}
        />
      </RoundedBox>

      <mesh position={[0, 0, -.08]}>
        <boxGeometry args={[2.93, .23, .012]} />
        <meshStandardMaterial color="#8A7023" metalness={.34} roughness={.38} />
      </mesh>

      <group position={[-1.02, .16, .096]}>
        <RoundedBox args={[.58, .42, .035]} radius={.055} smoothness={5}>
          <meshStandardMaterial color="#D6C079" metalness={.8} roughness={.19} />
        </RoundedBox>
        {[-.17, 0, .17].map((x) => (
          <mesh key={x} position={[x, 0, .023]}>
            <boxGeometry args={[.012, .3, .008]} />
            <meshStandardMaterial color="#806824" metalness={.62} roughness={.28} />
          </mesh>
        ))}
        {[-.1, .1].map((y) => (
          <mesh key={y} position={[0, y, .024]}>
            <boxGeometry args={[.45, .012, .008]} />
            <meshStandardMaterial color="#806824" metalness={.62} roughness={.28} />
          </mesh>
        ))}
      </group>

      <group position={[1.1, .63, .099]} rotation={[0, 0, -.05]}>
        {[.09, .15, .21].map((radius) => (
          <mesh key={radius} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[radius, .009, 6, 24, Math.PI]} />
            <meshStandardMaterial color="#172333" transparent opacity={.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CardJourney({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const stopsRef = useRef<Stop[]>([]);
  const revealRef = useRef(0);
  const visibilityRef = useRef(0);
  const { viewport, invalidate } = useThree();

  const refreshStops = useCallback(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-story-stop]"));
    stopsRef.current = nodes.map((node) => ({
      center: node.offsetTop + node.offsetHeight * .5,
      bottom: node.offsetTop + node.offsetHeight,
      x: Number(node.dataset.cardX ?? .5),
      y: Number(node.dataset.cardY ?? .5),
      rotation: Number(node.dataset.cardRotation ?? 0),
      scale: Number(node.dataset.cardScale ?? .72),
    }));
    invalidate();
  }, [invalidate]);

  useEffect(() => {
    refreshStops();

    const onScroll = () => invalidate();
    const onResize = () => refreshStops();
    const onReady = () => {
      refreshStops();
      invalidate();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("cardeify:ready", onReady);
    document.fonts?.ready.then(refreshStops).catch(() => undefined);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("cardeify:ready", onReady);
    };
  }, [invalidate, refreshStops]);

  useFrame((state, delta) => {
    if (!group.current || !stopsRef.current.length) return;

    const stops = stopsRef.current;
    const scrollCenter = window.scrollY + window.innerHeight * .5;
    const first = stops[0];
    const last = stops[stops.length - 1];

    const revealStart = first.center - window.innerHeight * 1.08;
    const revealEnd = first.center - window.innerHeight * .48;
    const rawReveal = THREE.MathUtils.clamp(
      (scrollCenter - revealStart) / Math.max(1, revealEnd - revealStart),
      0,
      1
    );
    const reveal = rawReveal * rawReveal * (3 - 2 * rawReveal);

    const exitStart = last.bottom - window.innerHeight * .22;
    const exitEnd = last.bottom + window.innerHeight * .48;
    const rawExit = THREE.MathUtils.clamp(
      (scrollCenter - exitStart) / Math.max(1, exitEnd - exitStart),
      0,
      1
    );
    const exit = 1 - rawExit * rawExit * (3 - 2 * rawExit);

    revealRef.current = THREE.MathUtils.damp(revealRef.current, reveal, reducedMotion ? 18 : 7, delta);
    visibilityRef.current = THREE.MathUtils.damp(visibilityRef.current, exit, reducedMotion ? 18 : 7, delta);

    let before = stops[0];
    let after = stops[0];
    let local = 0;

    for (let index = 0; index < stops.length - 1; index += 1) {
      if (scrollCenter >= stops[index].center && scrollCenter <= stops[index + 1].center) {
        before = stops[index];
        after = stops[index + 1];
        local = (scrollCenter - before.center) / Math.max(1, after.center - before.center);
        break;
      }

      if (scrollCenter > stops[stops.length - 1].center) {
        before = stops[stops.length - 1];
        after = before;
        local = 0;
      }
    }

    local = local * local * (3 - 2 * local);

    const nx = THREE.MathUtils.lerp(before.x, after.x, local);
    const ny = THREE.MathUtils.lerp(before.y, after.y, local);
    const rotation = THREE.MathUtils.lerp(before.rotation, after.rotation, local);
    const baseScale = THREE.MathUtils.lerp(before.scale, after.scale, local);
    const visibleScale = baseScale * revealRef.current * visibilityRef.current;

    const x = (nx - .5) * viewport.width;
    const y = (.5 - ny) * viewport.height;
    const pointerX = reducedMotion ? 0 : state.pointer.x * .06;
    const pointerY = reducedMotion ? 0 : state.pointer.y * .025;
    const travelLift = Math.sin(local * Math.PI) * .12;

    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, x, reducedMotion ? 22 : 7, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, y, reducedMotion ? 22 : 7, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, .24 + travelLift, 6, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, rotation, 7, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointerX, 6, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -.035 - pointerY, 6, delta);
    group.current.scale.setScalar(
      THREE.MathUtils.damp(group.current.scale.x, visibleScale, reducedMotion ? 20 : 8, delta)
    );

    const unsettled =
      Math.abs(group.current.position.x - x) > .002 ||
      Math.abs(group.current.position.y - y) > .002 ||
      Math.abs(group.current.scale.x - visibleScale) > .002;

    if (unsettled) invalidate();
  });

  return (
    <group ref={group} scale={0}>
      <GuideCard />
    </group>
  );
}

export default function StoryCard() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="story-card-layer" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        dpr={[1, 1.3]}
        frameloop="demand"
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[3.2, 5.6, 7]} intensity={4.0} color="#FFF4C7" />
        <pointLight position={[-4.4, -1.6, 4]} intensity={2.2} color="#6D8DB3" />
        <pointLight position={[4.2, 1.2, 3]} intensity={1.6} color="#D4B33B" />
        <CardJourney reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
