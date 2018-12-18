import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment';

function createGravatarUrl(username) {
  const userhash = md5(username);
  return `http://www.gravatar.com/avatar/${userhash}`;
}

export function promptForUsername() {
  const username = prompt('Enter a username');
  return username.toLowerCase();
}

export class ChatForm {
  constructor(formSel, inputSel) {
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }

  // 初始化 给其一个回调函数，在提交时执行发送消息方法
  init(submitCallback) {
    this.$form.submit((event) => {
      event.preventDefault();
      const val = this.$input.val();
      if (val === '') return;
      submitCallback(val);
      this.$input.val('');
    });
    // 点击事件监听
    this.$form.find('button').on('click', () => this.$form.submit());
  }
}

export class ChatList {
  constructor(listSel, username) {
    this.$list = $(listSel);
    this.username = username;
    this.$list.empty();
  }

  drawMessage({ user: u, timestamp: t, message: m }) {
    // 消息行容器
    const $messageRow = ($('<li>', {
      class: 'message-row',
    }));
    // 如果是我发送的添加'me'样式
    if (this.username === u) {
      $messageRow.addClass('me');
    }
    // 消息容器
    const $message = $('<p>');
    // 添加用户名
    $message.append($('<span>', {
      class: 'message-username',
      text: u,
    }));
    // 添加时间
    $message.append($('<span>', {
      class: 'timestamp',
      'data-time': t,
      text: moment(t).fromNow(),
    }));
    // 添加内容
    $message.append($('<span>', {
      class: 'message-message',
      text: m,
    }));

    const $img = $('<img>', {
      src: createGravatarUrl(u),
      title: u,
    });

    $messageRow.append($img);
    $messageRow.append($message);
    this.$list.append($messageRow);
    // 滚动道可视区域
    $messageRow.get(0).scrollIntoView();
  }

  timeInit() {
    this.timer = setInterval(() => {
      $('[data-time]').each((index, element) => {
        const $element = $(element);
        const timestamp = new Date().setTime($element.attr('data-time'));
        const ago = moment(timestamp).fromNow();
        $element.html(ago);
      }, 1000);
    });
  }
}
