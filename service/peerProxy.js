const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer, path: '/ws' });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Detect multi-device
    if (socketServer.clients.size > 1) {
        socketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "MULTI_DEVICE" }));
        }
        });
    }
    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
        socket.isAlive = true;
    });
    });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };