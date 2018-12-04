(function init(window) {
  // 初始化App变量
  const App = window.App || {};
  // DataStore的私有属性
  const data = {};
  // DataStore构造函数
  function DataStore() {
  }
  // DataStore的add方法
  DataStore.prototype.add = function add(key, val) {
    data[key] = val;
  };
  // DataStore的get方法
  DataStore.prototype.get = function get(key) {
    return data[key];
  };
  // DataStore的getAll方法
  DataStore.prototype.getAll = function getAll() {
    return data;
  };
  // DataStore的remove方法
  DataStore.prototype.remove = function remove(key) {
    delete data[key];
  };
  // App添加DataStore属性
  App.DataStore = DataStore;
  // 把App添加到全局变量
  window.App = App;
}(window));
