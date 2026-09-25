"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Stop = {
  center: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

function makeGuideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createLinearGradient(0, 0, 1024, 640);
  gradient.addColorStop(0, "#F4DE8D");
  gradient.addColorStop(.58, "#EAD485");
  gradient.addColorStop(1, "#C9A73A");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1024, 640);

  const glow = context.createRadialGradient(760, 60, 10, 760, 60, 520);
  glow.addColorStop(0, "rgba(255,255,255,.34)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, 1024, 640);

  context.fillStyle = "#172333";
  context.font = "700 34px Arial, sans-serif";
  context.fillText("CARDEIFY", 64, 80);
  context.globalAlpha = .55;
  context.font = "600 17px Arial, sans-serif";
  context.fillText("ONLINE", 66, 112);

  context.globalAlpha = 1;
  context.font = "700 54px Arial, sans-serif";
  context.fillText("BEST MOVE", 64, 482);
  context.globalAlpha = .54;
  context.font = "500 20px Arial, sans-serif";
  context.fillText("•••• 4821", 64, 572);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
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
      <RoundedBox args={[3.3, 2.08, .14]} radius={.15} smoothness={7}>
        <meshPhysicalMaterial
          color="#EAD485"
          map={texture ?? undefined}
          metalness={.28}
          roughness={.24}
          clearcoat={.42}
          clearcoatRoughness={.28}
        />
      </RoundedBox>
      <RoundedBox args={[.58, .42, .035]} radius={.055} smoothness={5} position={[-1.03, .18, .094]}>
        <meshStandardMaterial color="#D8C17A" metalness={.72} roughness={.2} />
      </RoundedBox>
      <mesh position={[1.1, -.68, .091]}>
        <circleGeometry args={[.12, 32]} />
        <meshStandardMaterial color="#172333" metalness={.18} roughness={.4} />
      </mesh>
      <mesh position={[1.27, -.68, .093]}>
        <circleGeometry args={[.12, 32]} />
        <meshStandardMaterial color="#172333" transparent opacity={.42} />
      </mesh>
    </group>
  );
}

function CardJourney({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const stopsRef = useRef<Stop[]>([]);
  const revealRef = useRef(0);
  const { viewport, invalidate } = useThree();

  const refreshStops = useCallback(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-story-stop]"));
    stopsRef.current = nodes.map((node) => ({
      center: node.offsetTop + node.offsetHeight * .5,
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
    const revealStart = first.center - window.innerHeight * 1.02;
    const revealEnd = first.center - window.innerHeight * .48;
    const rawReveal = THREE.MathUtils.clamp((scrollCenter - revealStart) / Math.max(1, revealEnd - revealStart), 0, 1);
    const reveal = rawReveal * rawReveal * (3 - 2 * rawReveal);
    revealRef.current = THREE.MathUtils.damp(revealRef.current, reveal, reducedMotion ? 18 : 7, delta);

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
    const scale = THREE.MathUtils.lerp(before.scale, after.scale, local) * revealRef.current;

    const x = (nx - .5) * viewport.width;
    const y = (.5 - ny) * viewport.height;
    const pointerX = reducedMotion ? 0 : state.pointer.x * .09;
    const pointerY = reducedMotion ? 0 : state.pointer.y * .045;

    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, x, reducedMotion ? 22 : 7, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, y, reducedMotion ? 22 : 7, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, .25 + Math.sin(local * Math.PI) * .16, 6, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, rotation, 7, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointerX, 6, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -.04 - pointerY, 6, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, scale, reducedMotion ? 20 : 8, delta));

    const unsettled =
      Math.abs(group.current.position.x - x) > .002 ||
      Math.abs(group.current.position.y - y) > .002 ||
      Math.abs(group.current.scale.x - scale) > .002;

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
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 7]} intensity={4.1} color="#FFF4C7" />
        <pointLight position={[-4, -2, 4]} intensity={2.6} color="#6D8DB3" />
        <CardJourney reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
