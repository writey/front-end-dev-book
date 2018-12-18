import socket from './ws-client';
import { ChatForm, ChatList, promptForUsername } from './dom';
import { UserStore } from './storage';
const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

const userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
  username = promptForUsername();
  userStore.set(username);
}

class ChatMessage {
  constructor({
    message: m,
    user: u = username,
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

class ChatApp {
  constructor() {
    // 初始化当前客户端表单
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    // console.log('hello es 6!');
    this.socket = this.socketInit('ws://localhost:3001');
  }
}
ChatApp.prototype.socketInit = function socketInit(url) {
  socket.init(url);
  // 初始化当前客户端的聊天列表
  this.chatList = new ChatList(LIST_SELECTOR, username);
  this.chatList.timeInit();
  socket.registerOpenHandler(() => {
    // 切换按钮状态
    window.switchClass('on');
    this.chatForm.init((data) => {
      const message = new ChatMessage({ message: data });
      socket.sendMessage(message.serialize());
    });
  });
  socket.registerMessageHandler((data) => {
    console.log(data);
    const message = new ChatMessage(data);
    this.chatList.drawMessage(message.serialize());
  });
  socket.registerCloseHandler(() => window.switchClass('off'));
  return socket;
};
ChatApp.prototype.reconnection = function reocnnection(client) {
  this.socket = this.socketInit(client.getUrl());
};

export default ChatApp;
