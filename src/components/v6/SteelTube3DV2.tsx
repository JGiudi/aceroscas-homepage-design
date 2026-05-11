import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// ---- Steel Tube ----
const SteelTubeMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const tubeGeometry = useMemo(() => {
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.5, -1, 0),
      new THREE.Vector3(-0.8, 0.8, 1.2),
      new THREE.Vector3(0.8, -0.5, -0.8),
      new THREE.Vector3(2.5, 0.6, 0.3),
    ]);
    return new THREE.TubeGeometry(path, 128, 0.2, 32, false);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.4,
      0.03
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.6,
      0.03
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} geometry={tubeGeometry}>
        <meshPhysicalMaterial
          color="#999999"
          metalness={1}
          roughness={0.12}
          clearcoat={0.8}
          clearcoatRoughness={0.05}
          envMapIntensity={2.5}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
};

// ---- Metallic Particles ----
const PARTICLE_COUNT = 80;

const MetallicParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.02 + 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3] + Math.sin(time + i) * 0.002;
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Mouse influence
      posArray[i3] += pointer.x * 0.003;
      posArray[i3 + 1] += pointer.y * 0.002;

      // Reset particles that go too far
      if (posArray[i3 + 1] > 5) {
        posArray[i3] = (Math.random() - 0.5) * 12;
        posArray[i3 + 1] = -4;
        posArray[i3 + 2] = (Math.random() - 0.5) * 6;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C01A21"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const SteelTube3DV2 = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-3, -2, 4]} intensity={1} color="#C01A21" />
        <pointLight position={[0, 3, 2]} intensity={0.6} color="#ff4444" />
        <spotLight position={[-5, 5, 0]} intensity={0.4} color="#aaaaaa" angle={0.5} />
        <SteelTubeMesh />
        <MetallicParticles />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default SteelTube3DV2;
