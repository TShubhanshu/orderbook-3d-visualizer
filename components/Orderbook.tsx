import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ThreeScene } from '../components/ThreeScene';
import { useOrderbookStore } from '../hooks/orderbookStore';
import { useOrderbookStream } from '../hooks/useOrderbookStream';

export const Orderbook = () => {
  const { venue } = useOrderbookStore();
  const { data: orderbookData } = useOrderbookStream(venue); // ✅ Fixed here

  return (
    <div className="flex-1 h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ThreeScene orderbookData={orderbookData} />
      </Canvas>
    </div>
  );
};

// import React from 'react';
// import { useOrderbookStore } from '../store/orderbookStore';
// import { useOrderbookStream } from '../hooks/useOrderbookStream';

// export const Orderbook = () => {
//   useOrderbookStream(); // hook handles the live data

//   const data = useOrderbookStore((state) => state.data);

//   return (
//     <div>
//       <h2>Orderbook</h2>
//       <ul>
//         {data.map((entry, index) => (
//           <li key={index}>
//             {entry.side.toUpperCase()}: {entry.price} x {entry.quantity}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };