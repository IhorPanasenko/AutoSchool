const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const users = new Map();

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    let decoder = new TextDecoder('utf-8');
    let str = decoder.decode(message);
    const parsedMessage = JSON.parse(str);
    console.log('Receive: ', parsedMessage);

    if (parsedMessage.type === 'register') {
      const userId = parsedMessage.userId;
      users.set(userId, ws);
      ws.userId = userId; // Store userId in the WebSocket object
      ws.send(JSON.stringify({ type: 'registered', userId })); // Respond to the requesting client
      console.log(`User registered: ${userId}`);
    } else if (parsedMessage.type === 'message') {
      const recipientId = parsedMessage.recipientId;
      const text = parsedMessage.text;
      const senderId = ws.userId;

      if (users.has(recipientId)) {
        const recipientSocket = users.get(recipientId);
        if (recipientSocket.readyState === WebSocket.OPEN) {
          recipientSocket.send(
            JSON.stringify({ senderId: userId, recipientId, text })
          );
        }
      } else {
        //TODO: save message in db
      }
    }

    ws.send('Response from server');
  });

  ws.on('close', () => {
    //users.delete(userId);
    console.log('User left chat');
  });
});

function generateUniqueId() {
  return Math.random().toString(36).slice(2, 9);
}

console.log('WebSocket server is running on ws://localhost:8080');
