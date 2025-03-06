// SimpleCard.tsx
"use client";
import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";

// シンプルなカードコンポーネント
const CardModel: React.FC<{
  onClick?: () => void;
  cardColor?: string;
  accentColor?: string;
  userData?: {
    name: string;
    title: string;
    id: string;
    department: string;
  };
}> = ({ 
  onClick = () => {}, 
  cardColor = "#ffffff", 
  accentColor = "#2563eb",
  userData = {
    name: "山田太郎",
    title: "デベロッパー",
    id: "DEV-2025-03",
    department: "エンジニアリング部"
  }
}) => {
  // シンプルな回転アニメーション
  const meshRef = React.useRef<THREE.Mesh>(null);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      position={[0, 0, 0]}
    >
      {/* カードの形状 */}
      <boxGeometry args={[10, 6, 0.2]} />
      
      {/* カードのマテリアル */}
      <meshStandardMaterial 
        color={cardColor} 
        metalness={0.5}
        roughness={0.2}
      />
      
      {/* アクセント色の部分 (カードの上部) */}
      <mesh position={[0, 2.5, 0.11]}>
        <planeGeometry args={[10, 1]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>
      
      {/* ID情報 - テキストの代わりにシンプルな図形で表現 */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* チップのシミュレーション */}
      <mesh position={[-3, 1, 0.11]}>
        <boxGeometry args={[2, 1.5, 0.05]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} />
      </mesh>
    </mesh>
  );
};

// IDカードコンポーネント
const SimpleCard: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <CardModel />
        
        <OrbitControls enableZoom={true} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default SimpleCard;