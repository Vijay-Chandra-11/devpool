import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';

interface FloatingIcosahedronProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}

export const FloatingIcosahedron = ({ 
  position, 
  color, 
  scale = 1, 
  speed = 1 
}: FloatingIcosahedronProps) => {
  const meshRef = useRef<Mesh>(null);
  
  const colorObj = useMemo(() => new Color(color), [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.7 + 1) * 0.4;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={colorObj}
        emissive={colorObj}
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
    </mesh>
  );
};

export default FloatingIcosahedron;
