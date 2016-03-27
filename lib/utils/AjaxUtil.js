'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trunc = require('babel-runtime/core-js/math/trunc');

var _trunc2 = _interopRequireDefault(_trunc);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ajax = function () {
  function Ajax() {
    (0, _classCallCheck3.default)(this, Ajax);
  }

  (0, _createClass3.default)(Ajax, [{
    key: 'objToFormStr',
    value: function objToFormStr(obj) {
      var paramStr = '';
      (0, _keys2.default)(obj).forEach(function (key) {
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
      (0, _keys2.default)(paramDic).forEach(function (key) {
        var value = paramDic[key];
        if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
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
          onLoad((0, _trunc2.default)(e.loaded / e.total * 100));
        }
      };
      req.open('POST', url, true);
      req.send(formData);
    }
  }]);
  return Ajax;
}();

var instance = new Ajax();

exports.default = instance;