import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// ---- Shape components ----

const RoundBar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.5, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.5 + delta * 0.1, 0.03);
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.25, 0.25, 5, 64]} />
        <meshPhysicalMaterial color="#888" metalness={1} roughness={0.1} clearcoat={0.9} clearcoatRoughness={0.05} envMapIntensity={2.5} reflectivity={1} />
      </mesh>
    </Float>
  );
};

const SquareBar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.5, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.5 + delta * 0.1, 0.03);
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.5, 5, 0.5]} />
        <meshPhysicalMaterial color="#999" metalness={1} roughness={0.08} clearcoat={0.9} clearcoatRoughness={0.05} envMapIntensity={2.5} reflectivity={1} />
      </mesh>
    </Float>
  );
};

const HexBar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.5, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.5 + delta * 0.1, 0.03);
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.3, 0.3, 5, 6]} />
        <meshPhysicalMaterial color="#aaa" metalness={1} roughness={0.06} clearcoat={1} clearcoatRoughness={0.03} envMapIntensity={2.8} reflectivity={1} />
      </mesh>
    </Float>
  );
};

const Billet = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.4, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.4 + delta * 0.08, 0.03);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.25}>
      <mesh ref={meshRef} rotation={[Math.PI / 8, 0, Math.PI / 12]}>
        <boxGeometry args={[1.2, 3.5, 1.2]} />
        <meshPhysicalMaterial color="#777" metalness={1} roughness={0.15} clearcoat={0.7} clearcoatRoughness={0.1} envMapIntensity={2} reflectivity={0.9} />
      </mesh>
    </Float>
  );
};

const FlatBar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.4, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.5 + delta * 0.1, 0.03);
  });

  return (
    <Float speed={1} rotationIntensity={0.12} floatIntensity={0.3}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.5, 4, 0.15]} />
        <meshPhysicalMaterial color="#999" metalness={1} roughness={0.1} clearcoat={0.8} clearcoatRoughness={0.06} envMapIntensity={2.2} reflectivity={1} />
      </mesh>
    </Float>
  );
};

// ---- Metallic Particles ----
const PARTICLE_COUNT = 60;

const MetallicParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = Math.random() * 0.015 + 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3] + Math.sin(time + i) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];
      posArray[i3] += pointer.x * 0.002;
      posArray[i3 + 1] += pointer.y * 0.001;
      if (posArray[i3 + 1] > 5) {
        posArray[i3] = (Math.random() - 0.5) * 10;
        posArray[i3 + 1] = -4;
        posArray[i3 + 2] = (Math.random() - 0.5) * 5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={PARTICLE_COUNT} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#C01A21" transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

// ---- Shape map ----
const shapeComponents: Record<string, React.FC> = {
  redondo: RoundBar,
  cuadrado: SquareBar,
  hexagonal: HexBar,
  palanquilla: Billet,
  planchuela: FlatBar,
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
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-3, -2, 4]} intensity={0.8} color="#C01A21" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#ff4444" />
        <spotLight position={[-5, 5, 0]} intensity={0.3} color="#aaaaaa" angle={0.5} />
        <ShapeComponent />
        <MetallicParticles />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default SteelShapes3D;
