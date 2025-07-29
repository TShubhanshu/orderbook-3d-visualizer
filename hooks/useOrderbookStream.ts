// import { useEffect, useState } from 'react';
// import { subscribeToOrderbook } from '../lib/utils';

// type OrderbookEntry = [number, number];

// interface OrderbookData {
//   bids: OrderbookEntry[];
//   asks: OrderbookEntry[];
// }

// export const useOrderbookStream = (venue: string) => {
//   const [data, setData] = useState<OrderbookData>({ bids: [], asks: [] });

//   useEffect(() => {
//     const unsubscribe = subscribeToOrderbook(venue.toLowerCase(), (entries: any[]) => {
//       const bids = entries
//         .filter((e) => e.side === 'buy')
//         .map((e) => [e.price, e.quantity]);

//       const asks = entries
//         .filter((e) => e.side === 'sell')
//         .map((e) => [e.price, e.quantity]);

//       setData({ bids, asks });
//     });

//     return () => {
//       unsubscribe?.();
//     };
//   }, [venue]);

//   return { data };
// };









// import { useEffect, useState } from 'react';

// type OrderbookEntry = [number, number];

// interface OrderbookData {
//   bids: OrderbookEntry[];
//   asks: OrderbookEntry[];
// }

// export const useOrderbookStream = (venue: string) => {
//   const [data, setData] = useState<OrderbookData>({ bids: [], asks: [] });

//   useEffect(() => {
//     const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       const bids: OrderbookEntry[] = message.b?.map(([price, quantity]: [string, string]) => [
//         parseFloat(price),
//         parseFloat(quantity),
//       ]) || [];
//       const asks: OrderbookEntry[] = message.a?.map(([price, quantity]: [string, string]) => [
//         parseFloat(price),
//         parseFloat(quantity),
//       ]) || [];

//       setData({ bids, asks });
//     };

//     return () => ws.close();
//   }, []);

//   return { data };
// };


// import { useEffect } from 'react';
// import { subscribeToOrderbook } from '../lib/utils';
// import { useOrderbookStore } from '../store/orderbookStore';
// import { OrderbookEntry } from '../types'

// export const useOrderbookStream = () => {
//   const setData = useOrderbookStore((state) => state.setData);

//   useEffect(() => {
//     const unsubscribe = subscribeToOrderbook((entries: OrderbookEntry[]) => {
//       setData(entries);
//     });

//     return () => {
//       if (typeof unsubscribe === 'function') unsubscribe;
//     };
//   }, [setData]);
// };


                                                                                                                                                                                                               import { useEffect, useState } from 'react';

// type OrderbookEntry = [number, number];

// interface OrderbookData {
//   bids: OrderbookEntry[];
//   asks: OrderbookEntry[];
// }

// export const useOrderbookStream = (venue: string) => {
//   const [data, setData] = useState<OrderbookData>({ bids: [], asks: [] });

//   useEffect(() => {
//     const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       const bids: OrderbookEntry[] = message.b?.map(([price, quantity]: [string, string]) => [
//         parseFloat(price),
//         parseFloat(quantity),
//       ]) || [];
//       const asks: OrderbookEntry[] = message.a?.map(([price, quantity]: [string, string]) => [
//         parseFloat(price),
//         parseFloat(quantity),
//       ]) || [];

//       setData({ bids, asks });
//     };

//     return () => ws.close();
//   }, []);

//   return { data };
// };









//import { useEffect, useState } from 'react';
import { subscribeToOrderbook } from '../lib/utils';

type OrderbookEntry = [number, number];

interface OrderbookData {
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
}

export const useOrderbookStream = (venue: string) => {
  const [data, setData] = useState<OrderbookData>({ bids: [], asks: [] });

  useEffect(() => {
    const unsubscribe = subscribeToOrderbook(venue.toLowerCase(), (entries: any[]) => {
      const bids = entries
        .filter((e) => e.side === 'buy')
        .map((e) => [e.price, e.quantity]);

      const asks = entries
        .filter((e) => e.side === 'sell')
        .map((e) => [e.price, e.quantity]);

      setData({ bids, asks });
    });

    return () => {
      unsubscribe?.();
    };
  }, [venue]);

  return { data };
};
