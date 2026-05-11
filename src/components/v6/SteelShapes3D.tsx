import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ── Procedural metal textures ──────────────────────────────────────────────────

// Roughness map — más contraste, rayones de tren laminador
function makeScratchMap(baseRoughness: number): THREE.CanvasTexture {
  const sz = 512;
  const canvas = document.createElement("canvas");
  canvas.width = sz;
  canvas.height = sz;
  const ctx = canvas.getContext("2d")!;
  const base = Math.round(baseRoughness * 255);
  ctx.fillStyle = `rgb(${base},${base},${base})`;
  ctx.fillRect(0, 0, sz, sz);
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * sz;
    const brt = Math.random() > 0.5
      ? Math.min(255, base + Math.floor(Math.random() * 150))
      : Math.max(0, base - Math.floor(Math.random() * 80));
    ctx.strokeStyle = `rgba(${brt},${brt},${brt},${0.1 + Math.random() * 0.7})`;
    ctx.lineWidth = Math.random() < 0.75 ? 0.3 + Math.random() * 0.5 : 1.5 + Math.random() * 3;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + (Math.random() - 0.5) * 6, sz);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  return tex;
}

// Normal map — scratches en X + undulación en Y + micro-bumps
function makeNormalMap(): THREE.CanvasTexture {
  const sz = 512;
  const canvas = document.createElement("canvas");
  canvas.width = sz;
  canvas.height = sz;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgb(128,128,255)";
  ctx.fillRect(0, 0, sz, sz);
  const id = ctx.getImageData(0, 0, sz, sz);
  const d = id.data;
  for (let i = 0; i < 300; i++) {
    const x = Math.floor(Math.random() * sz);
    const dr = Math.round((Math.random() - 0.5) * 32);
    const w = Math.max(1, Math.floor(Math.random() * 2));
    for (let dx = 0; dx < w; dx++) {
      const col = Math.min(sz - 1, x + dx);
      for (let y = 0; y < sz; y++) {
        const idx = (y * sz + col) * 4;
        d[idx] = Math.min(255, Math.max(0, d[idx] + dr));
      }
    }
  }
  for (let i = 0; i < 80; i++) {
    const y = Math.floor(Math.random() * sz);
    const dg = Math.round((Math.random() - 0.5) * 22);
    const h = Math.max(1, Math.floor(Math.random() * 3));
    for (let dy = 0; dy < h; dy++) {
      const row = Math.min(sz - 1, y + dy);
      for (let x = 0; x < sz; x++) {
        const idx = (row * sz + x) * 4;
        d[idx + 1] = Math.min(255, Math.max(0, d[idx + 1] + dg));
      }
    }
  }
  for (let i = 0; i < 2000; i++) {
    const px = Math.floor(Math.random() * sz);
    const py = Math.floor(Math.random() * sz);
    const idx = (py * sz + px) * 4;
    d[idx]     = Math.min(255, Math.max(0, d[idx]     + Math.round((Math.random() - 0.5) * 14)));
    d[idx + 1] = Math.min(255, Math.max(0, d[idx + 1] + Math.round((Math.random() - 0.5) * 14)));
  }
  ctx.putImageData(id, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  return tex;
}

// Color map — variación de tonos del tren laminador + zonas cálidas/frías
function makeColorMap(): THREE.CanvasTexture {
  const sz = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = sz;
  canvas.height = sz;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgb(190,190,196)";
  ctx.fillRect(0, 0, sz, sz);
  // Marcas de laminación — rayas oscuras verticales
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * sz;
    const w = 0.5 + Math.random() * 7;
    const alpha = 0.04 + Math.random() * 0.18;
    const grad = ctx.createLinearGradient(x - w, 0, x + w, 0);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.5, `rgba(0,0,0,${alpha})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(x - w * 2, 0, w * 4, sz);
  }
  // Zonas cálidas (calor residual del proceso)
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * sz;
    const y = Math.random() * sz;
    const r = 80 + Math.random() * 220;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(215,198,175,0.12)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, sz, sz);
  }
  // Zonas frías azuladas (oxidación superficial de acero frío)
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * sz;
    const y = Math.random() * sz;
    const r = 60 + Math.random() * 160;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(175,185,215,0.11)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, sz, sz);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Texturas compartidas — se crean una sola vez
const metalRoughnessMap = makeScratchMap(0.22);
const metalNormalMap    = makeNormalMap();
const metalColorMap     = makeColorMap();
const billetRoughnessMap = makeScratchMap(0.38);

// ── Redondo ────────────────────────────────────────────────────────────────────
const RoundBar = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.55, 0.04);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.55 + delta * 0.12, 0.04);
  });
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
      <mesh ref={ref} rotation={[Math.PI * 0.08, 0.3, Math.PI / 6]}>
        <cylinderGeometry args={[0.28, 0.28, 5.2, 96]} />
        <meshPhysicalMaterial
          map={metalColorMap}
          metalness={0.92}
          roughness={0.22}
          roughnessMap={metalRoughnessMap}
          normalMap={metalNormalMap}
          normalScale={[0.55, 0.55] as unknown as THREE.Vector2}
          envMapIntensity={6}
          clearcoat={0.08}
          clearcoatRoughness={0.4}
          anisotropy={0.9}
          anisotropyRotation={Math.PI / 2}
        />
      </mesh>
    </Float>
  );
};

// ── Cuadrado ───────────────────────────────────────────────────────────────────
const SquareBar = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.5, 0.04);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.5 + delta * 0.1, 0.04);
  });
  return (
    <Float speed={1} rotationIntensity={0.14} floatIntensity={0.3}>
      <mesh ref={ref} rotation={[Math.PI * 0.06, 0.5, Math.PI / 5]}>
        <boxGeometry args={[0.52, 5.2, 0.52]} />
        <meshPhysicalMaterial
          map={metalColorMap}
          metalness={0.92}
          roughness={0.25}
          roughnessMap={metalRoughnessMap}
          normalMap={metalNormalMap}
          normalScale={[0.6, 0.6] as unknown as THREE.Vector2}
          envMapIntensity={6}
          clearcoat={0.06}
          clearcoatRoughness={0.45}
          anisotropy={0.85}
          anisotropyRotation={Math.PI / 2}
        />
      </mesh>
    </Float>
  );
};

// ── Hexagonal ──────────────────────────────────────────────────────────────────
const HexBar = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.55, 0.04);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.55 + delta * 0.11, 0.04);
  });
  return (
    <Float speed={1} rotationIntensity={0.14} floatIntensity={0.3}>
      <mesh ref={ref} rotation={[Math.PI * 0.07, 0.3, Math.PI / 6]}>
        <cylinderGeometry args={[0.32, 0.32, 5.2, 6]} />
        <meshPhysicalMaterial
          map={metalColorMap}
          metalness={0.93}
          roughness={0.18}
          roughnessMap={metalRoughnessMap}
          normalMap={metalNormalMap}
          normalScale={[0.5, 0.5] as unknown as THREE.Vector2}
          envMapIntensity={6.5}
          clearcoat={0.1}
          clearcoatRoughness={0.35}
          anisotropy={1.0}
          anisotropyRotation={Math.PI / 2}
        />
      </mesh>
    </Float>
  );
};

// ── Palanquilla ────────────────────────────────────────────────────────────────
const Billet = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.4, 0.03);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.4 + delta * 0.08, 0.03);
  });
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.25}>
      <mesh ref={ref} rotation={[Math.PI * 0.12, 0.4, Math.PI / 10]}>
        <boxGeometry args={[1.3, 3.6, 1.3]} />
        <meshPhysicalMaterial
          map={metalColorMap}
          metalness={0.88}
          roughness={0.38}
          roughnessMap={billetRoughnessMap}
          normalMap={metalNormalMap}
          normalScale={[0.75, 0.75] as unknown as THREE.Vector2}
          envMapIntensity={4.5}
          clearcoat={0}
          clearcoatRoughness={0}
        />
      </mesh>
    </Float>
  );
};

// ── Planchuela ─────────────────────────────────────────────────────────────────
const FlatBar = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.45, 0.04);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.5 + delta * 0.1, 0.04);
  });
  return (
    <Float speed={1} rotationIntensity={0.12} floatIntensity={0.3}>
      <mesh ref={ref} rotation={[Math.PI * 0.05, 0.5, Math.PI / 7]}>
        <boxGeometry args={[1.6, 4.2, 0.18]} />
        <meshPhysicalMaterial
          map={metalColorMap}
          metalness={0.92}
          roughness={0.24}
          roughnessMap={metalRoughnessMap}
          normalMap={metalNormalMap}
          normalScale={[0.58, 0.58] as unknown as THREE.Vector2}
          envMapIntensity={6}
          clearcoat={0.07}
          clearcoatRoughness={0.42}
          anisotropy={0.8}
          anisotropyRotation={Math.PI / 2}
        />
      </mesh>
    </Float>
  );
};

// ── Chispas rojas ──────────────────────────────────────────────────────────────
const SPARK_COUNT = 120;

const Sparks = () => {
  const ref = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const [positions, vel] = useMemo(() => {
    const pos = new Float32Array(SPARK_COUNT * 3);
    const v   = new Float32Array(SPARK_COUNT * 3);
    for (let i = 0; i < SPARK_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      v[i * 3]       = (Math.random() - 0.5) * 0.007;
      v[i * 3 + 1]   = Math.random() * 0.018 + 0.004;
      v[i * 3 + 2]   = (Math.random() - 0.5) * 0.007;
    }
    return [pos, v];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    for (let i = 0; i < SPARK_COUNT; i++) {
      const i3 = i * 3;
      arr[i3]     += vel[i3]     + Math.sin(t * 1.2 + i * 0.7) * 0.0015 + pointer.x * 0.003;
      arr[i3 + 1] += vel[i3 + 1] + pointer.y * 0.001;
      arr[i3 + 2] += vel[i3 + 2];
      if (arr[i3 + 1] > 5.5) {
        arr[i3]     = (Math.random() - 0.5) * 12;
        arr[i3 + 1] = -5;
        arr[i3 + 2] = (Math.random() - 0.5) * 6;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={SPARK_COUNT} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C01A21"
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// ── Partículas plateadas ───────────────────────────────────────────────────────
const DUST_COUNT = 55;

const MetalDust = () => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.elapsedTime * 0.3;
    for (let i = 0; i < DUST_COUNT; i++) {
      const i3 = i * 3;
      arr[i3]     = Math.sin(t + i * 1.3) * 4;
      arr[i3 + 1] = Math.cos(t * 0.7 + i * 0.9) * 3.5;
      arr[i3 + 2] = Math.sin(t * 0.5 + i) * 2;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={DUST_COUNT} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#d8e4f8"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// ── Shape map ──────────────────────────────────────────────────────────────────
const shapeComponents: Record<string, React.FC> = {
  redondo:     RoundBar,
  cuadrado:    SquareBar,
  hexagonal:   HexBar,
  palanquilla: Billet,
  planchuela:  FlatBar,
};

interface SteelShapes3DProps {
  activeShape: string;
  className?: string;
}

const SteelShapes3D = ({ activeShape, className = "" }: SteelShapes3DProps) => {
  const ShapeComponent = shapeComponents[activeShape] || RoundBar;

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[4, 6, 4]}  intensity={2.2} color="#fff5e8" />
        <directionalLight position={[-4, -3, 3]} intensity={0.8} color="#c0d4ff" />
        <directionalLight position={[-2, 2, -5]} intensity={1.4} color="#C01A21" />
        <pointLight position={[0, 5, 1]} intensity={0.7} color="#ffeecc" />

        <Suspense fallback={null}>
          <ShapeComponent />
          <ContactShadows position={[0, -3.2, 0]} opacity={0.3} scale={8} blur={2.5} far={4} />
          <Environment preset="city" />
        </Suspense>

        <Sparks />
        <MetalDust />
      </Canvas>
    </div>
  );
};

export default SteelShapes3D;
