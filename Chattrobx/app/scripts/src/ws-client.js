let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
  return socket;
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    console.log('message', e.data);
    const data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

function close(fn) {
  socket.close();
  if (socket.readyState === socket.CLOSED) {
    fn();
  }
}

function registerCloseHandler(handlerFunction) {
  socket.onclose = () => {
    console.log('onclose');
    handlerFunction();
  };
}

function reconnection(client) {
  return new WebSocket(client.getUrl());
}

function readyState() {
  return socket.readyState;
}

function getUrl() {
  return socket.url;
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage,
  close,
  registerCloseHandler,
  reconnection,
  readyState,
  getUrl,
};
