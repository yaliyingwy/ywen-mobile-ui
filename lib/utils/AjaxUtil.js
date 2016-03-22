'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Ajax = (function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, [{
    key: 'objToFormStr',
    value: function objToFormStr(obj) {
      var paramStr = '';
      Object.keys(obj).forEach(function (key) {
        return paramStr += key + '=' + encodeURIComponent(obj[key]) + '&';
      });
      if (paramStr.endsWith('&')) {
        paramStr = paramStr.slice(0, -1);
      }
      return paramStr;
    }
  }, {
    key: 'request',
    value: function request(_ref) {
      var _ref$method = _ref.method;
      var method = _ref$method === undefined ? 'GET' : _ref$method;
      var url = _ref.url;
      var _ref$paramDic = _ref.paramDic;
      var paramDic = _ref$paramDic === undefined ? {} : _ref$paramDic;
      var success = _ref.success;
      var error = _ref.error;

      var paramStr = this.objToFormStr(paramDic);
      var req = new XMLHttpRequest();
      req.overrideMimeType('text/xml');
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status >= 200 && req.status <= 300) {
            success(req.responseText);
          } else {
            error(req.responseText);
          }
        }
      };
      req.open(method, method === 'POST' ? url : url + '?' + paramStr, true);
      req.send(method === 'POST' ? paramStr : null);
    }
  }, {
    key: 'upload',
    value: function upload(_ref2) {
      var url = _ref2.url;
      var _ref2$paramDic = _ref2.paramDic;
      var paramDic = _ref2$paramDic === undefined ? {} : _ref2$paramDic;
      var success = _ref2.success;
      var error = _ref2.error;
      var onLoad = _ref2.onLoad;

      var formData = new FormData();
      Object.keys(paramDic).forEach(function (key) {
        var value = paramDic[key];
        if (typeof value === 'object') {
          if (value.constructor === Array) {
            value.forEach(function (file) {
              formData.append(key, file, 'file.jpg');
            });
          } else {
            formData.append(key, value, 'file.jpg');
          }
        } else {
          formData.append(key, value);
        }
      });

      var req = new XMLHttpRequest();
      req.overrideMimeType('text/xml');
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status >= 200 && req.status <= 300) {
            success(req.responseText);
          } else {
            error(req.responseText);
          }
        }
      };
      req.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          onLoad(Math.trunc(e.loaded / e.total * 100));
        }
      };
      req.open('POST', url, true);
      req.send(formData);
    }
  }]);

  return Ajax;
})();

var instance = new Ajax();

exports['default'] = instance;
module.exports = exports['default'];