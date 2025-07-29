// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useOrderbookStore } from '../store/orderbookStore';
// import * as THREE from 'three';

// const OrderbookBars = () => {
//   const group = useRef<THREE.Group>(null);
//   const { data } = useOrderbookStore();

//   useFrame(() => {
//     if (group.current) {
//       group.current.rotation.y += 0.001;
//     }
//   });

//   return (
//     <group ref={group}>
//       {data.map((entry, i) => {
//         const height = entry.size * 0.5;
//         return (
//           <mesh key={i} position={[i * 1.2, height / 2, 0]}>
//             <boxGeometry args={[1, height, 1]} />
//             <meshStandardMaterial color={entry.side === 'buy' ? 'green' : 'red'} />
//           </mesh>
//         );
//       })}
//     </group>
//   );
// };

// export default function ThreeScene() {
//   return (
//     <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <OrderbookBars />
//     </Canvas>
//   );
// }

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Group } from 'three';

interface OrderbookData {
  bids: number[][];
  asks: number[][];
}

interface ThreeSceneProps {
  orderbookData: OrderbookData;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ orderbookData }) => {
  const groupRef = useRef<Group>(null);

  const cubes = useMemo(() => {
    const bids = orderbookData?.bids || [];
    const asks = orderbookData?.asks || [];

    return [...bids, ...asks].map(([price, volume], index) => {
      const height = volume * 10;
      const color = index < bids.length ? 'green' : 'red';

      return (
        <mesh key={index} position={[index * 0.5, height / 2, 0]}>
          <boxGeometry args={[0.4, height, 0.4]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    });
  }, [orderbookData]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <group ref={groupRef}>{cubes}</group>
    </>
  );
};
