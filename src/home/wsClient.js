let socket = null;
let listeners = [];

// Connect immediately when imported
export function initWebSocket() {
  if (socket) return socket;

  // If backend HTTP server runs at same host/port:
  // const url = (window.location.origin.replace(/^http/, 'ws')) + '/ws';
  let port = window.location.port;
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

  // socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("🌐 WebSocket connected");
    socket.send(JSON.stringify({ type: "connected" }));
  };

  socket.onmessage = async (event) => {
    try {
      let raw = event.data;

    // Convert Blob to string
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

// Allow components to subscribe to WS messages
export function onMessage(callback) {
  listeners.push(callback);
}

// Send data through WebSocket
export function sendMessage(obj) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify(obj));
}