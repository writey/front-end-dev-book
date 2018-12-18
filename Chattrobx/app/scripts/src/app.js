import socket from './ws-client';

class ChatMessage {
  constructor({
    message: m,
    user: u = 'xx',
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

function socketInit(url) {
  socket.init(url);
  socket.registerOpenHandler(() => window.switchClass('on'));
  socket.registerMessageHandler((data) => {
    console.log(data);
  });
  socket.registerCloseHandler(() => window.switchClass('off'));
  return socket;
}

class ChatApp {
  constructor() {
    // console.log('hello es 6!');
    this.socket = socketInit('ws://localhost:3001');
  }
}
ChatApp.prototype.reconnection = function reocnnection(client) {
  this.socket = socketInit(client.getUrl());
};

export default ChatApp;
