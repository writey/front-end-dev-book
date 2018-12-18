(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatMessage = function () {
  function ChatMessage(_ref) {
    var m = _ref.message,
        _ref$user = _ref.user,
        u = _ref$user === undefined ? 'xx' : _ref$user,
        _ref$timestamp = _ref.timestamp,
        t = _ref$timestamp === undefined ? new Date().getTime() : _ref$timestamp;

    _classCallCheck(this, ChatMessage);

    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  _createClass(ChatMessage, [{
    key: 'serialize',
    value: function serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }]);

  return ChatMessage;
}();

function socketInit(url) {
  _wsClient2.default.init(url);
  _wsClient2.default.registerOpenHandler(function () {
    return window.switchClass('on');
  });
  _wsClient2.default.registerMessageHandler(function (data) {
    console.log(data);
  });
  _wsClient2.default.registerCloseHandler(function () {
    return window.switchClass('off');
  });
  return _wsClient2.default;
}

var ChatApp = function ChatApp() {
  _classCallCheck(this, ChatApp);

  // console.log('hello es 6!');
  this.socket = socketInit('ws://localhost:3001');
};

ChatApp.prototype.reconnection = function reocnnection(client) {
  this.socket = socketInit(client.getUrl());
};

exports.default = ChatApp;

},{"./ws-client":3}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chatApp = new _app2.default();
window.chatApp = chatApp;

},{"./app":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socket = void 0;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
  return socket;
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = function () {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = function (e) {
    console.log('message', e.data);
    var data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

function close(fn) {
  socket.close();
  if (socket.readyState === socket.CLOSED) {
    fn();
  }
}

function registerCloseHandler(handlerFunction) {
  socket.onclose = function () {
    console.log('onclose');
    handlerFunction();
  };
}

function reconnection(client) {
  return new WebSocket(client.getUrl());
}

function readyState() {
  return socket.readyState;
}

function getUrl() {
  return socket.url;
}

exports.default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage,
  close: close,
  registerCloseHandler: registerCloseHandler,
  reconnection: reconnection,
  readyState: readyState,
  getUrl: getUrl
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFFTSxXO0FBQ0osNkJBSUc7QUFBQSxRQUhRLENBR1IsUUFIRCxPQUdDO0FBQUEseUJBRkQsSUFFQztBQUFBLFFBRkssQ0FFTCw2QkFGUyxJQUVUO0FBQUEsOEJBREQsU0FDQztBQUFBLFFBRFUsQ0FDVixrQ0FEZSxJQUFJLElBQUosRUFBRCxDQUFhLE9BQWIsRUFDZDs7QUFBQTs7QUFDRCxTQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsU0FBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNEOzs7O2dDQUVXO0FBQ1YsYUFBTztBQUNMLGNBQU0sS0FBSyxJQUROO0FBRUwsaUJBQVMsS0FBSyxPQUZUO0FBR0wsbUJBQVcsS0FBSztBQUhYLE9BQVA7QUFLRDs7Ozs7O0FBR0gsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCO0FBQ3ZCLHFCQUFPLElBQVAsQ0FBWSxHQUFaO0FBQ0EscUJBQU8sbUJBQVAsQ0FBMkI7QUFBQSxXQUFNLE9BQU8sV0FBUCxDQUFtQixJQUFuQixDQUFOO0FBQUEsR0FBM0I7QUFDQSxxQkFBTyxzQkFBUCxDQUE4QixVQUFDLElBQUQsRUFBVTtBQUN0QyxZQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0QsR0FGRDtBQUdBLHFCQUFPLG9CQUFQLENBQTRCO0FBQUEsV0FBTSxPQUFPLFdBQVAsQ0FBbUIsS0FBbkIsQ0FBTjtBQUFBLEdBQTVCO0FBQ0EsU0FBTyxrQkFBUDtBQUNEOztJQUVLLE8sR0FDSixtQkFBYztBQUFBOztBQUNaO0FBQ0EsT0FBSyxNQUFMLEdBQWMsV0FBVyxxQkFBWCxDQUFkO0FBQ0QsQzs7QUFFSCxRQUFRLFNBQVIsQ0FBa0IsWUFBbEIsR0FBaUMsU0FBUyxZQUFULENBQXNCLE1BQXRCLEVBQThCO0FBQzdELE9BQUssTUFBTCxHQUFjLFdBQVcsT0FBTyxNQUFQLEVBQVgsQ0FBZDtBQUNELENBRkQ7O2tCQUllLE87Ozs7O0FDMUNmOzs7Ozs7QUFFQSxJQUFNLFVBQVUsSUFBSSxhQUFKLEVBQWhCO0FBQ0EsT0FBTyxPQUFQLEdBQWlCLE9BQWpCOzs7Ozs7OztBQ0hBLElBQUksZUFBSjs7QUFFQSxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CO0FBQ2pCLFdBQVMsSUFBSSxTQUFKLENBQWMsR0FBZCxDQUFUO0FBQ0EsVUFBUSxHQUFSLENBQVksZUFBWjtBQUNBLFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsbUJBQVQsQ0FBNkIsZUFBN0IsRUFBOEM7QUFDNUMsU0FBTyxNQUFQLEdBQWdCLFlBQU07QUFDcEIsWUFBUSxHQUFSLENBQVksTUFBWjtBQUNBO0FBQ0QsR0FIRDtBQUlEOztBQUVELFNBQVMsc0JBQVQsQ0FBZ0MsZUFBaEMsRUFBaUQ7QUFDL0MsU0FBTyxTQUFQLEdBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQ3hCLFlBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsRUFBRSxJQUF6QjtBQUNBLFFBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxFQUFFLElBQWIsQ0FBYjtBQUNBLG9CQUFnQixJQUFoQjtBQUNELEdBSkQ7QUFLRDs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7QUFDNUIsU0FBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0Q7O0FBRUQsU0FBUyxLQUFULENBQWUsRUFBZixFQUFtQjtBQUNqQixTQUFPLEtBQVA7QUFDQSxNQUFJLE9BQU8sVUFBUCxLQUFzQixPQUFPLE1BQWpDLEVBQXlDO0FBQ3ZDO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTLG9CQUFULENBQThCLGVBQTlCLEVBQStDO0FBQzdDLFNBQU8sT0FBUCxHQUFpQixZQUFNO0FBQ3JCLFlBQVEsR0FBUixDQUFZLFNBQVo7QUFDQTtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsTUFBdEIsRUFBOEI7QUFDNUIsU0FBTyxJQUFJLFNBQUosQ0FBYyxPQUFPLE1BQVAsRUFBZCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxVQUFULEdBQXNCO0FBQ3BCLFNBQU8sT0FBTyxVQUFkO0FBQ0Q7O0FBRUQsU0FBUyxNQUFULEdBQWtCO0FBQ2hCLFNBQU8sT0FBTyxHQUFkO0FBQ0Q7O2tCQUVjO0FBQ2IsWUFEYTtBQUViLDBDQUZhO0FBR2IsZ0RBSGE7QUFJYiwwQkFKYTtBQUtiLGNBTGE7QUFNYiw0Q0FOYTtBQU9iLDRCQVBhO0FBUWIsd0JBUmE7QUFTYjtBQVRhLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcclxuXHJcbmNsYXNzIENoYXRNZXNzYWdlIHtcclxuICBjb25zdHJ1Y3Rvcih7XHJcbiAgICBtZXNzYWdlOiBtLFxyXG4gICAgdXNlcjogdSA9ICd4eCcsXHJcbiAgICB0aW1lc3RhbXA6IHQgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpLFxyXG4gIH0pIHtcclxuICAgIHRoaXMubWVzc2FnZSA9IG07XHJcbiAgICB0aGlzLnVzZXIgPSB1O1xyXG4gICAgdGhpcy50aW1lc3RhbXAgPSB0O1xyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlcjogdGhpcy51c2VyLFxyXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXHJcbiAgICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc29ja2V0SW5pdCh1cmwpIHtcclxuICBzb2NrZXQuaW5pdCh1cmwpO1xyXG4gIHNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHdpbmRvdy5zd2l0Y2hDbGFzcygnb24nKSk7XHJcbiAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoKGRhdGEpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gIH0pO1xyXG4gIHNvY2tldC5yZWdpc3RlckNsb3NlSGFuZGxlcigoKSA9PiB3aW5kb3cuc3dpdGNoQ2xhc3MoJ29mZicpKTtcclxuICByZXR1cm4gc29ja2V0O1xyXG59XHJcblxyXG5jbGFzcyBDaGF0QXBwIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdoZWxsbyBlcyA2IScpO1xyXG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXRJbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbiAgfVxyXG59XHJcbkNoYXRBcHAucHJvdG90eXBlLnJlY29ubmVjdGlvbiA9IGZ1bmN0aW9uIHJlb2NubmVjdGlvbihjbGllbnQpIHtcclxuICB0aGlzLnNvY2tldCA9IHNvY2tldEluaXQoY2xpZW50LmdldFVybCgpKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XHJcbiIsImltcG9ydCBDaGF0QXBwIGZyb20gJy4vYXBwJztcblxuY29uc3QgY2hhdEFwcCA9IG5ldyBDaGF0QXBwKCk7XG53aW5kb3cuY2hhdEFwcCA9IGNoYXRBcHA7XG4iLCJsZXQgc29ja2V0O1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLi4nKTtcclxuICByZXR1cm4gc29ja2V0O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlJywgZS5kYXRhKTtcclxuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xyXG4gIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2UoZm4pIHtcclxuICBzb2NrZXQuY2xvc2UoKTtcclxuICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IHNvY2tldC5DTE9TRUQpIHtcclxuICAgIGZuKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3RlckNsb3NlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBzb2NrZXQub25jbG9zZSA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvbmNsb3NlJyk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWNvbm5lY3Rpb24oY2xpZW50KSB7XHJcbiAgcmV0dXJuIG5ldyBXZWJTb2NrZXQoY2xpZW50LmdldFVybCgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZHlTdGF0ZSgpIHtcclxuICByZXR1cm4gc29ja2V0LnJlYWR5U3RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFVybCgpIHtcclxuICByZXR1cm4gc29ja2V0LnVybDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlLFxyXG4gIGNsb3NlLFxyXG4gIHJlZ2lzdGVyQ2xvc2VIYW5kbGVyLFxyXG4gIHJlY29ubmVjdGlvbixcclxuICByZWFkeVN0YXRlLFxyXG4gIGdldFVybCxcclxufTtcclxuIl19
