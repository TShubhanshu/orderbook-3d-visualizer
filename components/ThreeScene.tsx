import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useOrderbookStore } from '../store/orderbookStore';
import * as THREE from 'three';

const OrderbookBars = () => {
  const group = useRef<THREE.Group>(null);
  const { data } = useOrderbookStore();

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={group}>
      {data.map((entry, i) => {
        const height = entry.size * 0.5;
        return (
          <mesh key={i} position={[i * 1.2, height / 2, 0]}>
            <boxGeometry args={[1, height, 1]} />
            <meshStandardMaterial color={entry.side === 'buy' ? 'green' : 'red'} />
          </mesh>
        );
      })}
    </group>
  );
};

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrderbookBars />
    </Canvas>
  );
}
