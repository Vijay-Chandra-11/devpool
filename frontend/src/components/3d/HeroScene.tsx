import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Stars } from '@react-three/drei';
import FloatingSphere from './FloatingSphere';
import FloatingTorus from './FloatingTorus';
import FloatingIcosahedron from './FloatingIcosahedron';

const MouseTracker = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    mouse.current.x += (state.mouse.x * 0.5 - mouse.current.x) * 0.05;
    mouse.current.y += (state.mouse.y * 0.3 - mouse.current.y) * 0.05;
    
    camera.position.x = mouse.current.x * 2;
    camera.position.y = mouse.current.y * 1;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const SceneContent = () => {
  return (
    <>
      <MouseTracker />
      
      {/* Ambient and point lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d9ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#00d9ff"
        castShadow
      />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Floating 3D elements */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <FloatingSphere position={[-3, 1, -2]} color="#00d9ff" scale={0.8} speed={0.8} />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <FloatingSphere position={[3.5, -0.5, -3]} color="#a855f7" scale={1.2} speed={0.6} distort={0.3} />
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <FloatingTorus position={[0, 2, -4]} color="#00d9ff" scale={0.6} speed={1.2} />
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.9}>
        <FloatingTorus position={[-4, -1, -5]} color="#f472b6" scale={0.4} speed={0.9} />
      </Float>
      
      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
        <FloatingIcosahedron position={[4, 1.5, -3]} color="#3b82f6" scale={0.5} speed={1.5} />
      </Float>
      
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1}>
        <FloatingIcosahedron position={[-2, -1.5, -2]} color="#a855f7" scale={0.4} speed={1.1} />
      </Float>

      {/* Large background sphere */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <FloatingSphere position={[0, 0, -8]} color="#1e293b" scale={3} speed={0.3} distort={0.2} />
      </Float>

      <Environment preset="night" />
    </>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
