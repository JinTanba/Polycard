import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface EmployeeCardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onPointerOver?: (e: any) => void;
  onPointerOut?: (e: any) => void;
  onPointerUp?: (e: any) => void;
  onPointerDown?: (e: any) => void;
}

export function EmployeeCard({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  onPointerOver,
  onPointerOut,
  onPointerUp,
  onPointerDown
}: EmployeeCardProps) {
  const cardRef = useRef<THREE.Mesh>(null);
  
  // 縦長のカードサイズ - ID カードの一般的な比率
  const cardWidth = 2.125;
  const cardHeight = 3.37; // 縦長に変更
  const cardDepth = 0.03;
  
  // ロゴテクスチャの読み込み
  const logoTexture = useTexture('./logo.svg');
  
  // カード部分の素材を作成
  const cardMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.2,
    roughness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
  });
  
  const holderMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    metalness: 0.7,
    roughness: 0.2,
  });
  
  // カードのテクスチャを作成
  const cardTexture = createCardTexture();
  
  return (
    <group 
      position={new THREE.Vector3(...position)} 
      rotation={new THREE.Euler(...rotation)} 
      scale={scale}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
    >
      {/* メインカード */}
      <mesh ref={cardRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[cardWidth, cardHeight, cardDepth]} />
        <meshPhysicalMaterial 
          map={cardTexture}
          color={0xffffff}
          metalness={0.2}
          roughness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
      
      {/* カードの穴（ストラップ用） */}
      <mesh position={[0, cardHeight/2 + 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial color={0x111111} />
      </mesh>
      
      {/* カードホルダー/クリップ */}
      <mesh position={[0, cardHeight/2 + 0.4, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 0.15]} />
        <primitive object={holderMaterial} />
      </mesh>
    </group>
  );
}

// カードテクスチャを作成するヘルパー関数
function createCardTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768; // 縦長比率に調整
  const ctx = canvas.getContext('2d')!;
  
  // 背景色
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 枠線
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  // ロゴ用の中央スペース
  const logoSize = 200;
  const logoX = canvas.width / 2 - logoSize / 2;
  const logoY = canvas.height / 2 - logoSize / 2;
  
  // ロゴプレースホルダー
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(logoX, logoY, logoSize, logoSize);
  
  // テクスチャの作成
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  
  return texture;
}

// カスタムGLTFモデルの代わりに使用する関数
export function useCustomCardModel() {
  // 外部GLBの代わりに使用できるシンプルなカードモデルを作成
  
  return {
    nodes: {
      card: {
        geometry: new THREE.BoxGeometry(2.125, 3.37, 0.03) // 縦長に変更
      },
      clip: {
        geometry: new THREE.BoxGeometry(0.6, 0.3, 0.15)
      },
      clamp: {
        geometry: new THREE.CylinderGeometry(0.15, 0.15, 0.1, 32)
      }
    },
    materials: {
      base: {
        map: createCardTexture()
      },
      metal: new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 0.7,
        roughness: 0.2
      })
    }
  };
}