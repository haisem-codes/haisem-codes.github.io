"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  ExtrudeGeometry,
  InstancedMesh,
  Material,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Object3D,
  PlaneGeometry,
  QuadraticBezierCurve3,
  Shape,
  ShapeGeometry,
  Sprite,
  SpriteMaterial,
  TubeGeometry,
  Vector3,
  type Texture,
} from "three";
import { storyProgress } from "@/lib/story";
import { ANCHORS, ARC_LIFT, RIDGE, SILHOUETTE, WATER_Y, WIN_H, WIN_W, WINDOWS, windowsLit } from "./skylineData";

type Progress = { current: number };

const BG = "#08090B";
const AMBER = new Color("#FFB547");
const ICE = new Color("#7DD3FC");
const DARK_WIN = new Color("#151D24");
const HALO = AMBER.clone().multiplyScalar(0.32);
const BLACK = new Color(0);
const SEGMENTS = 72;
const RADIAL = 6;
const FRONT_Z = 0.55;

/** View-box units → world units: 100 per unit, origin at the waterline in the middle of the view. */
const wx = (x: number) => (x - 720) / 100;
const wy = (y: number) => (WATER_Y - y) / 100;

function shapeOf(pts: readonly (readonly [number, number])[]) {
  const s = new Shape();
  pts.forEach(([x, y], i) => (i ? s.lineTo(wx(x), wy(y)) : s.moveTo(wx(x), wy(y))));
  return s;
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.25, "rgba(255,255,255,0.45)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

function useAssets() {
  const assets = useMemo(() => {
    const city = new ExtrudeGeometry(shapeOf(SILHOUETTE), { depth: 0.5, bevelEnabled: false });
    city.translate(0, 0, -0.5);
    const ridge = new ShapeGeometry(shapeOf(RIDGE));
    const win = new PlaneGeometry(WIN_W / 100, WIN_H / 100);
    const halo = new PlaneGeometry(0.2, 0.2);
    const water = new PlaneGeometry(60, 14);
    const glow = glowTexture();
    const hops = ANCHORS.slice(1).map(([x, y], i) => {
      const [px, py] = ANCHORS[i];
      const a = new Vector3(wx(px), wy(py), FRONT_Z);
      const b = new Vector3(wx(x), wy(y), FRONT_Z);
      const mid = a.clone().lerp(b, 0.5).setY(Math.max(a.y, b.y) + ARC_LIFT / 100);
      return new QuadraticBezierCurve3(a, mid, b);
    });
    const core = hops.map((c) => new TubeGeometry(c, SEGMENTS, 0.011, RADIAL, false));
    const aura = hops.map((c) => new TubeGeometry(c, SEGMENTS, 0.04, RADIAL, false));
    const mats = {
      city: new MeshLambertMaterial({ color: "#182B37" }),
      mirror: new MeshBasicMaterial({ color: "#0A1218" }),
      ridge: new MeshBasicMaterial({ color: "#0C141A" }),
      win: new MeshBasicMaterial({ toneMapped: false }),
      halo: new MeshBasicMaterial({ map: glow, blending: AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false }),
      water: new MeshBasicMaterial({ color: BG, transparent: true, opacity: 0.74, depthWrite: false }),
      core: new MeshBasicMaterial({ color: "#D6F1FF", toneMapped: false }),
      aura: new MeshBasicMaterial({ color: ICE, transparent: true, opacity: 0.22, blending: AdditiveBlending, depthWrite: false, toneMapped: false }),
    };
    return { city, ridge, win, halo, water, glow, hops, core, aura, mats };
  }, []);
  useEffect(
    () => () => {
      const { city, ridge, win, halo, water, glow, core, aura, mats } = assets;
      [city, ridge, win, halo, water, ...core, ...aura].forEach((g: BufferGeometry) => g.dispose());
      Object.values(mats).forEach((m: Material) => m.dispose());
      (glow as Texture).dispose();
    },
    [assets],
  );
  return assets;
}

type Assets = ReturnType<typeof useAssets>;

/** One copy of the town (the reflection is a second, squashed copy); returns its two instanced window layers. */
function Town({ a, mirror, layers }: { a: Assets; mirror?: boolean; layers: { current: InstancedMesh[] } }) {
  const win = useRef<InstancedMesh>(null);
  const halo = useRef<InstancedMesh>(null);
  useEffect(() => {
    const d = new Object3D();
    WINDOWS.forEach(([x, y], i) => {
      d.position.set(wx(x + WIN_W / 2), wy(y + WIN_H / 2), 0.004);
      d.updateMatrix();
      win.current!.setMatrixAt(i, d.matrix);
      win.current!.setColorAt(i, DARK_WIN);
      d.position.z = 0.01;
      d.updateMatrix();
      halo.current!.setMatrixAt(i, d.matrix);
      halo.current!.setColorAt(i, BLACK);
    });
    for (const m of [win.current!, halo.current!]) {
      m.instanceMatrix.needsUpdate = true;
      m.instanceColor!.needsUpdate = true;
    }
    const mine = [win.current!, halo.current!];
    layers.current.push(...mine);
    return () => {
      layers.current = layers.current.filter((m) => !mine.includes(m));
    };
  }, [layers]);
  return (
    <group scale={mirror ? [1, -0.55, 1] : 1}>
      <mesh geometry={a.city} material={mirror ? a.mats.mirror : a.mats.city} />
      <instancedMesh ref={win} args={[a.win, a.mats.win, WINDOWS.length]} />
      <instancedMesh ref={halo} args={[a.halo, a.mats.halo, WINDOWS.length]} />
    </group>
  );
}

function Scene({ progress, inView }: { progress: Progress; inView: boolean }) {
  const a = useAssets();
  const { camera, size } = useThree();
  const layers = useRef<InstancedMesh[]>([]);
  const shown = useRef(-1);
  const travel = useRef(0);
  const nudge = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const head = useRef<Sprite>(null);
  const marks = useRef<Sprite[]>([]);
  const look = useMemo(() => new Vector3(), []);
  const fit = useMemo(() => {
    const aspect = size.width / Math.max(1, size.height);
    const h = Math.min(4.6, Math.max(2.6, 13.4 / aspect));
    return {
      d: h / 2 / Math.tan((15 * Math.PI) / 180) + FRONT_Z,
      cx: 0.4 * (1 - Math.min(1, (h * aspect) / 13.4)),
      cy: 0.3 * h,
    };
  }, [size]);

  useEffect(() => {
    if (!inView) return;
    const move = (e: PointerEvent) => {
      nudge.current.tx = (e.clientX / innerWidth - 0.5) * 2;
      nudge.current.ty = (e.clientY / innerHeight - 0.5) * 2;
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, [inView]);

  useFrame((state, dt) => {
    const p = progress.current;
    const k = Math.min(1, dt * 6);

    const n = nudge.current;
    n.x += (n.tx - n.x) * k;
    n.y += (n.ty - n.y) * k;
    const { d, cx, cy } = fit;
    const yaw = n.x * 0.035;
    const pitch = 0.08 - n.y * 0.035;
    camera.position.set(cx + Math.sin(yaw) * d, cy + Math.sin(pitch) * d, Math.cos(yaw) * d);
    camera.lookAt(look.set(cx, cy, 0));

    const lit = windowsLit(p, WINDOWS.length);
    if (lit !== shown.current) {
      for (const m of layers.current) {
        const isHalo = m.geometry === a.halo;
        for (let i = 0; i < WINDOWS.length; i++) m.setColorAt(i, i < lit ? (isHalo ? HALO : AMBER) : isHalo ? BLACK : DARK_WIN);
        m.instanceColor!.needsUpdate = true;
      }
      shown.current = lit;
    }

    travel.current += ((storyProgress(p).progress - 1) / 3 - travel.current) * k;
    const f = travel.current * a.hops.length;
    a.hops.forEach((_, i) => {
      const t = Math.min(1, Math.max(0, f - i));
      const count = Math.round(t * SEGMENTS) * RADIAL * 6;
      a.core[i].setDrawRange(0, count);
      a.aura[i].setDrawRange(0, count);
    });
    const hop = Math.min(a.hops.length - 1, Math.floor(f));
    if (head.current) {
      a.hops[hop].getPoint(Math.min(1, f - hop), head.current.position);
      head.current.scale.setScalar(0.34 + Math.sin(state.clock.elapsedTime * 3) * 0.04);
    }
    const step = Math.min(3, Math.round(f));
    marks.current.forEach((s, i) => {
      const reached = f >= i - 0.02;
      (s.material as SpriteMaterial).color.copy(reached ? AMBER : ICE);
      (s.material as SpriteMaterial).opacity = reached ? 0.95 : 0.3;
      const ring = i === step ? 1 + Math.abs(Math.sin(state.clock.elapsedTime * 2.4)) * 0.35 : 1;
      s.scale.setScalar(0.26 * ring);
    });
  });

  return (
    <>
      <fog attach="fog" args={[BG, fit.d + 1, fit.d + 5]} />
      <ambientLight intensity={0.7} color="#9FB4C4" />
      <directionalLight position={[-2, 6, 3]} intensity={1.1} color="#BFE6FF" />
      <mesh geometry={a.ridge} material={a.mats.ridge} position={[0, 0, -2.4]} scale={[1.5, 1, 1]} />
      <Town a={a} layers={layers} />
      <Town a={a} mirror layers={layers} />
      <mesh geometry={a.water} material={a.mats.water} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} renderOrder={1} />
      {a.hops.map((_, i) => (
        <group key={i}>
          <mesh geometry={a.core[i]} material={a.mats.core} renderOrder={2} />
          <mesh geometry={a.aura[i]} material={a.mats.aura} renderOrder={3} />
        </group>
      ))}
      {ANCHORS.map(([x, y], i) => (
        <sprite
          key={i}
          ref={(s) => {
            if (s) marks.current[i] = s;
          }}
          position={[wx(x), wy(y), FRONT_Z]}
          renderOrder={4}
        >
          <spriteMaterial map={a.glow} blending={AdditiveBlending} transparent depthWrite={false} toneMapped={false} />
        </sprite>
      ))}
      <sprite ref={head} renderOrder={5}>
        <spriteMaterial map={a.glow} color="#E6F7FF" blending={AdditiveBlending} transparent depthWrite={false} toneMapped={false} />
      </sprite>
    </>
  );
}

/** Full-tier skyline: one canvas, rendering only while on screen. */
export default function NightSkyline({ progress, onReady }: { progress: Progress; onReady?: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={box} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        flat
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        camera={{ fov: 30, near: 0.1, far: 40, position: [0, 1, 10] }}
        onCreated={() => onReady?.()}
        style={{ pointerEvents: "none" }}
      >
        <Scene progress={progress} inView={inView} />
      </Canvas>
    </div>
  );
}
