import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const SteelTubeMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  // Create tube geometry along a curved path
  const tubeGeometry = useMemo(() => {
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, -1.5, 0),
      new THREE.Vector3(-1, 0.5, 1),
      new THREE.Vector3(1, -0.3, -0.5),
      new THREE.Vector3(3, 1, 0.5),
    ]);
    return new THREE.TubeGeometry(path, 128, 0.25, 32, false);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Slow auto-rotate
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.z += delta * 0.05;
    // Mouse interaction
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.3,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.5,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={tubeGeometry}>
        <meshPhysicalMaterial
          color="#888888"
          metalness={1}
          roughness={0.15}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
};

const SteelTube3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-3, -2, 4]} intensity={0.8} color="#C01A21" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#C01A21" />
        <SteelTubeMesh />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default SteelTube3D;
