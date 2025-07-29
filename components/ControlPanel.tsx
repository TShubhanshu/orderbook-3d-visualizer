'use client';

export const ControlPanel = () => {
  return (
    <div className="w-64 bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4">Control Panel</h2>
      <p>3D Orderbook Depth Visualizer</p>
    </div>
  );
};


// import React from 'react';
// import { useOrderbookStore } from '../store/orderbookStore';

// export const ControlPanel = () => {
//   const { venue, setVenue } = useOrderbookStore();

//   return (
//     <aside className="w-64 p-4 bg-gray-900 border-r border-gray-700 flex flex-col gap-4">
//       <h2 className="text-xl font-bold text-teal-400">Control Panel</h2>

//       <div className="flex flex-col gap-1">
//         <label htmlFor="venue" className="text-sm text-gray-300">Select Venue</label>
//         <select
//           id="venue"
//           value={venue}
//           onChange={(e) => setVenue(e.target.value)}
//           className="p-2 rounded bg-gray-800 text-white border border-gray-600"
//         >
//           <option value="binance">Binance</option>
//           <option value="okx">OKX</option>
//           <option value="bybit">Bybit</option>
//         </select>
//       </div>
//     </aside>
//   );
// };