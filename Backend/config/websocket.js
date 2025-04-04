import { WebSocketServer } from 'ws';

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log("🌐 WebSocket client connected");

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        const { sender } = data;

        // Broadcast the message to all other clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(JSON.stringify(data));
          }
        });

      } catch (err) {
        console.error("❌ Error handling message:", err.message);
      }
    });

    ws.on('close', () => {
      console.log("❎ WebSocket client disconnected");
    });

    ws.on('error', (err) => {
      console.error("❌ WebSocket error:", err.message);
    });
  });
};
