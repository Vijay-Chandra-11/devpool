import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

interface FloatingSphereProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  distort?: number;
}

export const FloatingSphere = ({ 
  position, 
  color, 
  scale = 1, 
  speed = 1,
  distort = 0.4
}: FloatingSphereProps) => {
  const meshRef = useRef<Mesh>(null);
  
  const colorObj = useMemo(() => new Color(color), [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={colorObj}
        envMapIntensity={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0}
        metalness={0.1}
        roughness={0.2}
        distort={distort}
        speed={2}
      />
    </mesh>
  );
};

export default FloatingSphere;
