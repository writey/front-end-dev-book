const WebSocket = require('ws');
const client = new WebSocket('http://localhost:3001');

class ChatMessage {
  constructor({
    message: m,
    user: u = 'bot',
    timestamp: t = (new Date()).getTime(),
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp,
    };
  }
}

console.log('client started');
client.on('open', () => {
  // console.log('connected');
  client.send(Date.now());
});

client.on('close', () => {
  // console.log('disconnected');
});

client.on('message', (data) => {
  // console.log(`Roundtrip time: ${Date.now() - data} ms`);
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  if (jsonData.user === 'bot' || jsonData.user === undefined) return;
  let msg = jsonData.message;
  console.log(msg);
  msg = msg.replace('吗', '');
  msg = msg.replace('?', '!');
  msg = msg.replace('？', '！');
  client.send(JSON.stringify(new ChatMessage({ message: msg }).serialize()));
});
