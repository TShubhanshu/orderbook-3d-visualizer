// import React, { useState } from 'react';
// import { ThreeScene } from './ThreeScene';
// import { ControlPanel } from './ControlPanel';
// import { Canvas } from '@react-three/fiber';

// // Mock orderbook data for testing
// const dummyData = {
//   bids: [[1, 2], [2, 1]],
//   asks: [[3, 1.5], [4, 0.5]],
// };

// export const Orderbook = () => {
//   const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

//   return (
//     <div className="flex h-screen">
//       <ControlPanel rotation={rotation} setRotation={setRotation} />
//       <div className="flex-1">
//         <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
//           <ThreeScene orderbookData={dummyData} rotation={rotation} />
//         </Canvas>
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ThreeScene } from '../components/ThreeScene';
import { useOrderbookStore } from '../hooks/orderbookStore';
import { useOrderbookStream } from '../hooks/useOrderbookStream';

export const Orderbook = () => {
  const { venue } = useOrderbookStore();
  const { data: orderbookData } = useOrderbookStream(venue); // ✅ Fixed here

  return (
    <div className="flex-2 h-screen bg-black">
      <Canvas camera={{ position: [-5, -10, -5] }}>
        <ThreeScene orderbookData={orderbookData} />
      </Canvas>
    </div>
  );
};