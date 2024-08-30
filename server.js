const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Map();

server.on('connection', (ws) => {
  const id = Math.random().toString(36).substring(2);
  clients.set(id, ws);
  
  ws.on('message', (message) => {
    // Envía el mensaje a todos los clientes excepto al remitente
    clients.forEach((client, key) => {
      if (key !== id) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients.delete(id);
  });
});

console.log('Servidor WebSocket está corriendo en ws://localhost:8080');
