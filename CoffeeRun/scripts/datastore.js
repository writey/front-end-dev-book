(function init(window) {
  // 初始化App变量
  const App = window.App || {};
  // DataStore的私有属性
  const data = {};
  //  promise
  const Promise = window.Promise;
  // DataStore构造函数
  function DataStore() {
  }

  function promiseResolvedWith(value) {
    const promise = new Promise(((resolve, reject) => {
      resolve(value);
    }));
    return promise;
  }
  // DataStore的add方法
  DataStore.prototype.add = function add(key, val) {
    data[key] = val;
    return promiseResolvedWith(null);
  };
  // DataStore的get方法
  DataStore.prototype.get = function get(key) {
    return promiseResolvedWith(data[key]);
  };
  // DataStore的getAll方法
  DataStore.prototype.getAll = function getAll() {
    return promiseResolvedWith(data);
  };
  // DataStore的remove方法
  DataStore.prototype.remove = function remove(key) {
    delete data[key];
    return promiseResolvedWith(null);
  };
  // App添加DataStore属性
  App.DataStore = DataStore;
  // 把App添加到全局变量
  window.App = App;
}(window));
