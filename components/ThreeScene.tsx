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

// import React, { useMemo, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import { Group } from 'three';

// interface OrderbookData {
//   bids: number[][];
//   asks: number[][];
// }

// interface ThreeSceneProps {
//   orderbookData: OrderbookData;
// }

// export const ThreeScene: React.FC<ThreeSceneProps> = ({ orderbookData }) => {
//   const groupRef = useRef<Group>(null);

//   const cubes = useMemo(() => {
//     const bids = orderbookData?.bids || [];
//     const asks = orderbookData?.asks || [];

//     return [...bids, ...asks].map(([price, volume], index) => {
//       const height = volume * 5;
//       const color = index < bids.length ? 'green' : 'red';

//       return (
//         <mesh key={index} position={[index * 0.5, height/2, 0]}>
//           <boxGeometry args={[0.4, height, 0.4]} />
//           <meshStandardMaterial color={color} />
//         </mesh>
//       );
//     });
//   }, [orderbookData]);

//   useFrame(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[0, 5, 5]} />
//       <group ref={groupRef}>{cubes}</group>
//     </>
//   );
// };






import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { Group } from 'three';
import { Html } from '@react-three/drei';


interface OrderbookData {
  bids: number[][];
  asks: number[][];
}

interface ThreeSceneProps {
  orderbookData: OrderbookData;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ orderbookData }) => {
  const groupRef = useRef<Group>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  // Show light direction for debugging
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  // === Rotation state ===
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const cubes = useMemo(() => {
    const bids = orderbookData?.bids || [];
    const asks = orderbookData?.asks || [];

    return [...bids, ...asks].map(([price, volume], index) => {
      const height = volume * 5;
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
      groupRef.current.rotation.x = rotation.x;
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.z = rotation.z;
    }
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={1}
        castShadow
      />
      {/* Vertical grid */}
      <gridHelper args={[20, 20]} rotation={[0, 0, Math.PI / 2]} />
      <axesHelper args={[10]} />

      <group ref={groupRef}>{cubes}</group>

      {/* Rotation sliders */}
      <Html position={[-5, -10, 5]}>
        <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
          <label>
            X Rotation:
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.01"
              value={rotation.x}
              onChange={(e) =>
                setRotation((prev) => ({ ...prev, x: parseFloat(e.target.value) }))
              }
            />
          </label>
          <br />
          <label>
            Y Rotation:
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.01"
              value={rotation.y}
              onChange={(e) =>
                setRotation((prev) => ({ ...prev, y: parseFloat(e.target.value) }))
              }
            />
          </label>
          <br />
          <label>
            Z Rotation:
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.01"
              value={rotation.z}
              onChange={(e) =>
                setRotation((prev) => ({ ...prev, z: parseFloat(e.target.value) }))
              }
            />
          </label>
        </div>
      </Html>
    </>
  );
};
