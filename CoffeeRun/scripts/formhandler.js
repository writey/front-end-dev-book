(function init(window) {
  const App = window.App || {};
  // 初始化jQuery
  const $ = window.jQuery;

  // 构造函数，传入一个 form表单
  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    // 使用jQuery选择器选择form元素
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error(`Could not find element with selector: ${selector}`);
    }
    // 添加 addSubmitHandler方法
    FormHandler.prototype.addSubmitHandler = function addSubmitHandler(fn) {
      console.log('Setting submit handler for form');
      // 监听submit事件
      this.$formElement.on('submit', function formSubmit(event) {
        // 组织表单提交
        event.preventDefault();
        // 将表单中元素以key,value存入data
        const data = {};
        $(this).serializeArray().forEach((item) => {
          data[item.name] = item.value;
          console.log(`${item.name} is ${item.value}`);
        });
        console.log(data);
        // 执行传入的fn函数
        fn(data)
          .then(() => {
            // 重置表单
            this.reset();
            this.elements[0].focus();
          });
      });
    };
  }

  // 添加邮箱监听校验
  FormHandler.prototype.addInputHandler = function addInputHandler(fn) {
    this.$formElement.on('input', '[name="emailAddress"]', (event) => {
      const emailAddress = event.target.value;
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        const message = `${emailAddress}is not an authorized email address`;
        event.target.setCustomValidity(message);
      }
    });
  };

  FormHandler.prototype.addHasEmailHandler = function addHasEmailHandler(fn) {
    this.$formElement.on('input', '[name="emailAddress"]', (event) => {
      const emailAddress = event.target.value;
      window.myTruck.db.getAll().then((orders) => {
        if (fn(emailAddress, orders)) {
          event.target.setCustomValidity('');
        } else {
          const message = `${emailAddress} db is has email address`;
          event.target.setCustomValidity(message);
        }
      });
    });
  };

  // 添加coffeeOrder input 监听
  FormHandler.prototype.addCoffeeInputHandler = function addCoffeeInputHandler(fn) {
    this.$formElement.on('input', '[name="coffee"]', (event) => {
      const coffee = event.target.value;
      const strengthLevel = this.$formElement.find('[data-coffee-strength="range"]').val();
      if (fn(coffee, strengthLevel)) {
        event.target.setCustomValidity('');
      } else {
        const message = `${coffee} ${strengthLevel} is a decaf`;
        event.target.setCustomValidity(message);
      }
    });
  };
  // 添加coffeeOrder 浓度监听
  FormHandler.prototype.addCoffeeRange = function addCoffeeRange(fn) {
    this.$formElement.on('range', '[name="strength"]', (event) => {
      const coffee = this.$formElement.find('[name="coffee"]').val();
      const strengthLevel = event.target.value;
      if (fn(coffee, strengthLevel)) {
        event.target.setCustomValidity('');
      } else {
        const message = `${coffee} ${strengthLevel} is a decaf`;
        event.target.setCustomValidity(message);
      }
    });
  };

  FormHandler.prototype.formJSON = function formJSON(data) {
    $.each(data, (key, value) => {
      const $elem = $(`[name="${key}"]`, this.$element);
      const type = $elem.first().attr('type');
      if (type === 'radio') {
        $(`[name="${key}"][value="${value}"]`).prop('checked', true);
      } else if (type === 'checkbox' && (value === true || value === 'true')) {
        $(`[name="${key}"]`).porp('checked', true);
      } else {
        $elem.val(value);
      }
    });
  };

  FormHandler.prototype.loadOder = function loadTruck(data) {
    console.log(`loadTruck for ${data}`);
    this.$element.formJSON(data);
  };

  App.FormHandler = FormHandler;
  window.App = App;
}(window));
/*
function (event) {
  event.preventDefault();
  const data = $(this).serializeArray();
  console.log(data);
});
(event) => {
  event.preventDefault();
  const data = $(this).serializeArray();
  console.log(data);
});
*/
