const WebSocket = require('ws');
const { saveMessageToDB } = require('./controllers/chatController.js');

const server = new WebSocket.Server({ port: 8080 });
const users = new Map();

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    let decoder = new TextDecoder('utf-8');
    let str = decoder.decode(message);
    const parsedMessage = JSON.parse(str);

    if (parsedMessage.type === 'register') {
      const userId = parsedMessage.senderId;
      users.set(userId, ws);
      ws.userId = userId;
      ws.send(JSON.stringify({ type: 'registered' }));
      console.log(`User registered: ${userId}`);
    } else if (parsedMessage.type === 'message') {
      const recipientId = parsedMessage.recipientId;
      const text = parsedMessage.text;
      const senderId = ws.userId || parsedMessage.senderId;

      if (users.has(recipientId)) {
        const recipientSocket = users.get(recipientId);
        if (recipientSocket.readyState === WebSocket.OPEN) {
          recipientSocket.send(JSON.stringify({ senderId, recipientId, text }));
        }
      }

      saveMessageToDB({ fromUser: senderId, toUser: recipientId, text });
    } else if (parsedMessage.type === 'listUsers') {
      const userList = Array.from(users.keys());
      ws.send(JSON.stringify({ type: 'userList', users: userList }));
    }
  });

  ws.on('close', () => {
    users.delete(ws.userId);
    console.log(`User ${ws.userId} left chat`);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
