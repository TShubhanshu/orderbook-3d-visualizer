import { useEffect } from 'react';
import { subscribeToOrderbook } from '../lib/utils';
import { useOrderbookStore } from '../store/orderbookStore';
import { OrderbookEntry } from '../types'

export const useOrderbookStream = () => {
  const setData = useOrderbookStore((state) => state.setData);

  useEffect(() => {
    const unsubscribe = subscribeToOrderbook((entries: OrderbookEntry[]) => {
      setData(entries);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe;
    };
  }, [setData]);
};
