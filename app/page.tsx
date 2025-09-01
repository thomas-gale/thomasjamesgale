"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ProfileCard } from "@/components/ProfileCard";

export default function Home() {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 32.5 }}
      gl={{ localClippingEnabled: true }}
    >
      <ambientLight intensity={Math.PI} />
      <spotLight
        decay={0}
        position={[0, 5, 10]}
        angle={0.25}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <Environment preset="city" />
      <ProfileCard />
    </Canvas>
  );
}
