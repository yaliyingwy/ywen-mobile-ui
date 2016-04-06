'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function value(callback, type, quality) {
      var binStr = atob(this.toDataURL(type, quality).split(',')[1]);
      var len = binStr.length;
      var arr = new Uint8Array(len);

      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }

      callback(new Blob([arr], { type: type || 'image/png' }));
    }
  });
}

var ImageUtil = function () {
  function ImageUtil() {
    _classCallCheck(this, ImageUtil);
  }

  _createClass(ImageUtil, [{
    key: 'convertToImg',
    value: function convertToImg(file) {
      var image = new Image();
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      var promise = new Promise(function (resolve, reject) {
        reader.onload = function (event) {
          var blob = new Blob([event.target.result]);
          window.URL = window.URL || window.webkitURL;
          var blobURL = window.URL.createObjectURL(blob);
          image.src = blobURL;
          image.onload = function () {
            resolve(image);
          };
          image.onerror = function (e) {
            reject(e);
          };
        };
      });
      return promise;
    }
  }, {
    key: 'compress',
    value: function compress(imgFile, rate) {
      var _this = this;

      var promise = new Promise(function (resolve, reject) {
        _this.convertToImg(imgFile).then(function (img) {
          var width = img.width;
          var height = img.height;

          var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          var dataUrl = canvas.toDataURL('image/jpeg', rate);
          canvas.toBlob(function (blob) {
            resolve({ dataUrl: dataUrl, blob: blob });
          }, 'image/jpeg', rate);
        }, function (err) {
          reject(err);
        });
      });
      return promise;
    }
  }]);

  return ImageUtil;
}();

var instance = new ImageUtil();
exports.default = instance;