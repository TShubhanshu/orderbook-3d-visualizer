// ❌ Don't use socket.io-client
// ✅ Use built-in WebSocket API

export const subscribeToOrderbook = (callback: Function) => {
  const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    const bids = data.b?.slice(0, 15).map((b: any) => ({
      price: parseFloat(b[0]),
      quantity: parseFloat(b[1]),
      side: 'buy',
    })) || [];
    const asks = data.a?.slice(0, 15).map((a: any) => ({
      price: parseFloat(a[0]),
      quantity: parseFloat(a[1]),
      side: 'sell',
    })) || [];
    callback([...bids, ...asks]);
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  socket.onclose = () => {
    console.warn("WebSocket connection closed.");
  };
};
