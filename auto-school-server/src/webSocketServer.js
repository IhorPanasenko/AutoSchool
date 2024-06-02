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
      ws.userId = userId;
      ws.send(JSON.stringify({ type: 'registered', userId }));
      console.log(`User registered: ${userId}`);
    } else if (parsedMessage.type === 'message') {
      const recipientId = parsedMessage.recipientId;
      const text = parsedMessage.text;
      const senderId = parsedMessage.senderId;
      const senderIdInWs = ws.userId;

      console.log('senderIdInWs: ', senderIdInWs);

      if (users.has(recipientId)) {
        const recipientSocket = users.get(recipientId);
        if (recipientSocket.readyState === WebSocket.OPEN) {
          recipientSocket.send(JSON.stringify({ senderId, recipientId, text }));
        }
        //TODO: save message in db
      } else {
        //TODO: save message in db
      }
    } else if (parsedMessage.type === 'listUsers') {
      const userList = Array.from(users.keys());
      ws.send(JSON.stringify({ type: 'userList', users: userList }));
    }

    ws.send('Response from server');
  });

  ws.on('close', () => {
    //users.delete(userId);
    console.log(`User ${ws.userId} left chat`);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
