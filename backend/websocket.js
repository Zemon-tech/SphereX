const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const { admin } = require('./config/firebase');

const clients = new Map();

const setupWebSocket = (wss) => {
  wss.on('connection', async (ws, req) => {
    try {
      const token = req.url.split('token=')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;

      // Store client connection
      clients.set(userId, ws);

      ws.on('close', () => {
        clients.delete(userId);
      });

    } catch (error) {
      console.error('WebSocket connection error:', error);
      ws.terminate();
    }
  });
};

const notifyUser = (userId, notification) => {
  const client = clients.get(userId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(notification));
  }
};

module.exports = { setupWebSocket, notifyUser }; 