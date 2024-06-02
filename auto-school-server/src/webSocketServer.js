const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
//const users = new Map();

server.on('connection', (ws) => {
  // const userId = generateUniqueId();
  // users.set(userId, ws);

  // Notify the client of their userId
  //ws.send(JSON.stringify({ type: 'init', userId }));

  ws.on('message', (message) => {
    // const parsedMessage = JSON.parse(message);
    // const recipientId = parsedMessage.recipientId;
    // const text = parsedMessage.text;
    console.log(message);

    // if (users.has(recipientId)) {
    //   const recipientSocket = users.get(recipientId);
    //   if (recipientSocket.readyState === WebSocket.OPEN) {
    //     recipientSocket.send(JSON.stringify({ senderId: userId, recipientId, text }));
    //   }
    // }
    ws.send('Response from server');
  });

  ws.on('close', () => {
    //users.delete(userId);
    console.log('User left chat');
  });
});

// function generateUniqueId() {
//   return Math.random().toString(36).substr(2, 9);
// }

console.log('WebSocket server is running on ws://localhost:8080');
