const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
  port,
});
// 用于存放记录
const messages = [];

console.log('WebSockets server started');

// 连接事件
ws.on('connection', (socket) => {
  console.log('client connection established');
  // 发送历史记录
  messages.forEach(msg => socket.send(msg));
  // 消息事件
  socket.on('message', (data) => {
    console.log(`message received ${data}`);
    messages.push(data);
    // 广播（默认socket对象为当前客户端，广播则可通过遍历所有客户端发送信息）
    ws.clients.forEach((client) => {
      if (client !== socket) {
        client.send(data);
      }
    });
    // 重复执行
    // messages.forEach(() => {
    //   ws.clients.forEach((client) => {
    //     (client.send(data));
    //   });
    // });
    // socket.send(data);
  });
});
