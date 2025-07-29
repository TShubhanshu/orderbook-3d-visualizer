export const subscribeToOrderbook = (venue: string, callback: Function) => {
  let wsUrl = '';

  switch (venue) {
    case 'binance':
      wsUrl = 'wss://stream.binance.com:9443/ws/btcusdt@depth';
      break;
    case 'okx':
      wsUrl = 'wss://ws.okx.com:8443/ws/v5/public'; // You’ll need to send subscription msg
      break;
    case 'bybit':
      wsUrl = 'wss://stream.bybit.com/v5/public/linear'; // Also needs message
      break;
    default:
      console.warn(`Unknown venue: ${venue}`);
      return () => {};
  }

  const socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    if (venue === 'okx') {
      socket.send(JSON.stringify({
        op: 'subscribe',
        args: [{ channel: 'books5', instId: 'BTC-USDT' }],
      }));
    } else if (venue === 'bybit') {
      socket.send(JSON.stringify({
        op: 'subscribe',
        args: ['orderbook.50.BTCUSDT'],
      }));
    }
  };

  socket.onmessage = (msg) => {
    try {
      const data = JSON.parse(msg.data);

      let bids = [], asks = [];

      if (venue === 'binance') {
        bids = data.b?.slice(0, 15).map((b: any) => ({
          price: parseFloat(b[0]),
          quantity: parseFloat(b[1]),
          side: 'buy',
        })) || [];

        asks = data.a?.slice(0, 15).map((a: any) => ({
          price: parseFloat(a[0]),
          quantity: parseFloat(a[1]),
          side: 'sell',
        })) || [];
      } else if (venue === 'okx' && data.arg?.channel === 'books5') {
        const book = data.data?.[0];
        bids = book?.bids?.slice(0, 15).map((b: any) => ({
          price: parseFloat(b[0]),
          quantity: parseFloat(b[1]),
          side: 'buy',
        })) || [];
        asks = book?.asks?.slice(0, 15).map((a: any) => ({
          price: parseFloat(a[0]),
          quantity: parseFloat(a[1]),
          side: 'sell',
        })) || [];
      } else if (venue === 'bybit' && data.topic?.startsWith('orderbook')) {
        const orderbook = data.data;
        bids = orderbook?.b?.slice(0, 15).map((b: any) => ({
          price: parseFloat(b[0]),
          quantity: parseFloat(b[1]),
          side: 'buy',
        })) || [];
        asks = orderbook?.a?.slice(0, 15).map((a: any) => ({
          price: parseFloat(a[0]),
          quantity: parseFloat(a[1]),
          side: 'sell',
        })) || [];
      }

      callback([...bids, ...asks]);
    } catch (err) {
      console.error('WebSocket parsing error:', err);
    }
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  socket.onclose = () => {
    console.warn("WebSocket connection closed.");
  };

  return () => {
    socket.close();
  };
};






// export const subscribeToOrderbook = (callback: Function) => {
//   const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

//   socket.onmessage = (msg) => {
//     const data = JSON.parse(msg.data);
//     const bids = data.b?.slice(0, 15).map((b: any) => ({
//       price: parseFloat(b[0]),
//       quantity: parseFloat(b[1]),
//       side: 'buy',
//     })) || [];
//     const asks = data.a?.slice(0, 15).map((a: any) => ({
//       price: parseFloat(a[0]),
//       quantity: parseFloat(a[1]),
//       side: 'sell',
//     })) || [];
//     callback([...bids, ...asks]);
//   };

//   socket.onerror = (err) => {
//     console.error("WebSocket error:", err);
//   };

//   socket.onclose = () => {
//     console.warn("WebSocket connection closed.");
//   };
// };