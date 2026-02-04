import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';

interface FloatingTorusProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}

export const FloatingTorus = ({ 
  position, 
  color, 
  scale = 1, 
  speed = 1 
}: FloatingTorusProps) => {
  const meshRef = useRef<Mesh>(null);
  
  const colorObj = useMemo(() => new Color(color), [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.4, 32, 64]} />
      <meshStandardMaterial
        color={colorObj}
        emissive={colorObj}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

export default FloatingTorus;
