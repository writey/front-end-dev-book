(function init(window) {
  const App = window.App || {};
  const $ = window.jQuery;
  function RemoteDateStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied');
    }
    this.serverUrl = url;
  }
  RemoteDateStore.prototype.add = function add(key, value) {
    return $.post(this.serverUrl, value, (serverResponse) => {
      console.log(serverResponse);
    });
  };
  RemoteDateStore.prototype.getAll = function getAll(cb) {
    return $.get(this.serverUrl, (serverResponse) => {
      if (cb) {
        cb(serverResponse);
      }
    });
  };
  RemoteDateStore.prototype.get = function get(key, cb) {
    return $.get(`${this.serverUrl}/${key}`, (serverResponse) => {
      if (cb) {
        console.log(serverResponse);
      }
    });
  };
  RemoteDateStore.prototype.remove = function remove(key) {
    return $.ajax(`${this.serverUrl}/${key}`, {
      type: 'DELETE',
    });
  };
  App.RemoteDateStore = RemoteDateStore;
  window.App = App;
}(window));
