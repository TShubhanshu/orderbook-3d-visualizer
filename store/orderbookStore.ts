import { create } from 'zustand';

interface OrderbookState {
  venue: string;
  setVenue: (venue: string) => void;
  data: any[]; // placeholder; adjust type as needed
  setData: (data: any[]) => void;
}

export const useOrderbookStore = create<OrderbookState>((set) => ({
  venue: 'binance',
  setVenue: (venue) => set({ venue }),

  data: [],
  setData: (data) => set({ data }),
}));
