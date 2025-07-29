// import { create } from 'zustand';

// interface OrderbookState {
//   venue: string;
//   setVenue: (venue: string) => void;
//   data: any[]; // placeholder; adjust type as needed
//   setData: (data: any[]) => void;
// }

// export const useOrderbookStore = create<OrderbookState>((set) => ({
//   venue: 'binance',
//   setVenue: (venue) => set({ venue }),

//   data: [],
//   setData: (data) => set({ data }),
// }));

import { create } from 'zustand';

interface OrderbookStore {
  venue: string;
  setVenue: (venue: string) => void;
}

export const useOrderbookStore = create<OrderbookStore>((set) => ({
  venue: 'BINANCE',
  setVenue: (venue: string) => set({ venue }),
}));
