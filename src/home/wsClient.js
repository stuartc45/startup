let socket = null;
let listeners = [];

export function initWebSocket() {
  if (socket) return socket;

  let port = window.location.port;
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);


  socket.onopen = () => {
    console.log("WebSocket connected");
    socket.send(JSON.stringify({ type: "connected" }));
  };

  socket.onmessage = async (event) => {
    try {
      let raw = event.data;

    if (raw instanceof Blob) {
      raw = await raw.text();
    }

    const message = JSON.parse(raw);
      listeners.forEach((cb) => cb(message));
    } catch (err) {
      console.error("Invalid WS message:", err);
    }
  };

  socket.onclose = () => {
    console.warn("⚠️ WebSocket closed. Reconnecting in 2s...");
    setTimeout(initWebSocket, 2000);
  };

  return socket;
}

export function onMessage(callback) {
  listeners.push(callback);
}

export function sendMessage(obj) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify(obj));
}