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
        let data = {};
        $(this).serializeArray().forEach((item) => {
          data[item.name] = item.value;
          console.log(`${item.name} is ${item.value}`);
        });
        console.log(data);
        // 执行传入的fn函数
        fn(data);
        // 重置表单
        this.reset();
      });
    };
  }

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
