const WebSocket = require('ws');
const client = new WebSocket('http://localhost:3001');

console.log('client started');
client.on('open', () => {
  console.log('connected');
  client.send(Date.now());
});

client.on('close', () => {
  console.log('disconnected');
});

client.on('message', (data) => {
  console.log(`Roundtrip time: ${Date.now() - data} ms`);

  setTimeout(() => {
    client.send(Date.now());
  }, 500);
});
