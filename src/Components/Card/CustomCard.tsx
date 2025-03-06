"use client";
import { Canvas } from "@react-three/fiber";
import { Html, Environment, OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

export default function CustomCard({
  position = [0, 0, 0],
  fov = 30,
  transparent = true,
}) {
  return (
    <div className="relative w-full h-screen bg-black flex justify-center items-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[5, 5, 5]} intensity={2} castShadow />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />

        <Physics gravity={[0, -9.81, 0]}>
          <RigidBody type="dynamic" position={[0, 0, 0]}>
            <CuboidCollider args={[1.1, 1.6, 0.05]} />
            <mesh>
              <boxGeometry args={[2.2, 3.2, 0.1]} />
              <meshPhysicalMaterial color="#ffffff" clearcoat={1} clearcoatRoughness={0.1} roughness={0.2} metalness={0.5} />
              <Html
                position={[0, 0, 0.06]}
                transform
                occlude
                center
                scale={0.8}
              >
                <img
                  src="/logo.svg"
                  alt="企業ロゴ"
                  style={{ width: "100px", height: "100px" }}
                />
              </Html>
            </mesh>
          </RigidBody>
        </Physics>
      </Canvas>
    </div>
  );
}