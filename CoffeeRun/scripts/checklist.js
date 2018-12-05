(function init(window) {
  const App = window.App || {};
  const $ = window.jQuery;
  // 构造函数 传入一个checklist
  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    this.timeJob = {};
    if (this.$element.length === 0) {
      throw new Error(`Could not find element with selector:${selector}`);
    }
  }
  // 构造函数 用于显示dom的一行数据
  function Row(coffeeOrder) {
    const $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      class: 'checkbox',
    });
    const $label = $('<label></label>');
    const $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress,
    });
    let description = `strength:${coffeeOrder.strength},`;
    description += `${coffeeOrder.size} `;
    if (coffeeOrder.flavor) {
      description += `${coffeeOrder.flavor} `;
    }
    description += ',';
    description += `(${coffeeOrder.emailAddress}) `;
    $label.append($checkbox);
    $label.append(description);
    $div.append($label);
    const rgb = changeRGBofNumber(coffeeOrder.strength);
    $div.css('background-color', rgb);
    this.$element = $div;
  }
  // 添加一行dom
  CheckList.prototype.addRow = function addRow(coffeeOrder) {
    this.removeRow(coffeeOrder.emailAddress);
    const rowElement = new Row(coffeeOrder);
    this.$element.append(rowElement.$element);
  };
  // 删除一行dom
  CheckList.prototype.removeRow = function removeRow(email) {
    this.$element
      .find(`[value="${email}"]`)
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };
  // 点击事件监听
  CheckList.prototype.addClickHandler = function addClickHandler(remove, loadOder) {
    this.$element.on('click', 'input', (event) => {
      const email = event.target.value;
      const editCss = 'checklist-checkbox-edit';
      // 点击变灰 5秒后删除
      if (this.timeJob[email] == null || this.timeJob[email] === '') {
        this.$element
          .find(`[value="${email}"]`)
          .closest('[data-coffee-order="checkbox"]')
          .addClass(editCss);
        this.timeJob[email] = window.setTimeout(() => {
          this.removeRow(email);
          remove(email);
          this.timeJob[email] = '';
        }, 3000);
      } else {
        this.$element
          .find(`[value="${email}"]`)
          .closest('[data-coffee-order="checkbox"]')
          .removeClass(editCss);
        window.clearTimeout(this.timeJob[email]);
        loadOder(window.myTruck.getOrder(email));
        this.timeJob[email] = '';
      }
    });
  };
  App.CheckList = CheckList;
  window.App = App;
}(window));
