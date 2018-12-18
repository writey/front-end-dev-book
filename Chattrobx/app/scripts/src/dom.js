import $ from 'jquery';

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
      text: (new Date(t)).getTime(),
    }));
    // 添加内容
    $message.append($('<span>', {
      class: 'message-message',
      text: m,
    }));

    $messageRow.append($message);
    this.$list.append($messageRow);
    // 滚动道可视区域
    $messageRow.get(0).scrollIntoView();
  }
}
