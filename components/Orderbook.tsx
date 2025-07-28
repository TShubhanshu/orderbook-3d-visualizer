import React from 'react';
import { useOrderbookStore } from '../store/orderbookStore';
import { useOrderbookStream } from '../hooks/useOrderbookStream';

export const Orderbook = () => {
  useOrderbookStream(); // hook handles the live data

  const data = useOrderbookStore((state) => state.data);

  return (
    <div>
      <h2>Orderbook</h2>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>
            {entry.side.toUpperCase()}: {entry.price} x {entry.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};
