"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vert = /* glsl */ `
uniform float uProgress, uTime, uSize, uPixelRatio; uniform vec2 uPointer;
attribute vec3 aT0, aT1, aT2, aT3, aT4; attribute float aRand;
varying float vAlpha;
vec3 pick(float i){ return i<1.?aT0:i<2.?aT1:i<3.?aT2:i<4.?aT3:aT4; }
void main(){
  float i = floor(uProgress); float f = smoothstep(0., 1., fract(uProgress));
  vec3 p = mix(pick(i), pick(min(i+1., 4.)), f);
  p += 0.04 * vec3(sin(uTime*0.8 + aRand*40.), cos(uTime*0.7 + aRand*30.), sin(uTime*0.6 + aRand*20.));
  vec2 d = p.xy - uPointer * 1.4; float k = exp(-dot(d,d)*3.0); p.xy += normalize(d + 1e-4) * k * 0.18;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixelRatio * (0.6 + aRand) / -mv.z;
  vAlpha = 0.2 + 0.4 * aRand;
}`;
const frag = /* glsl */ `
uniform vec3 uColor; varying float vAlpha;
void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(uColor, vAlpha * smoothstep(0.5, 0.1, d)); }`;

export function SignalField({ count, targets, progress, pointer, color, offsetX = 0, scale = 1 }: {
  offsetX?: number; scale?: number; count: number; targets: Float32Array[]; progress: { current: number }; pointer: { current: [number, number] }; color: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const target = useRef(new THREE.Vector2());
  const gl = useThree((s) => s.gl);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const t = [...targets, ...Array(5 - targets.length).fill(targets[targets.length - 1])];
    g.setAttribute("position", new THREE.BufferAttribute(t[0], 3));
    t.forEach((arr, i) => g.setAttribute(`aT${i}`, new THREE.BufferAttribute(arr, 3)));
    const rand = new Float32Array(count); for (let i = 0; i < count; i++) rand[i] = ((i * 9301 + 49297) % 233280) / 233280;
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    return g;
  }, [targets, count]);
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: vert, fragmentShader: frag, transparent: true, depthWrite: false,
    uniforms: { uProgress: { value: 0 }, uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() }, uColor: { value: new THREE.Color("#0D7C72") }, uSize: { value: 17 }, uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) } },
  }), [gl]);
  useEffect(() => { material.uniforms.uColor.value.set(color); }, [material, color]);
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((state) => {
    const u = material.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uProgress.value += (progress.current - u.uProgress.value) * 0.08;
    u.uPointer.value.lerp(target.current.set(...pointer.current), 0.1);
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
  });
  return <points ref={ref} geometry={geometry} material={material} position={[offsetX, 0, 0]} scale={scale} />;
}
