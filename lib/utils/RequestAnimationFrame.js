'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requestAnimationFrame = undefined;
var cancelAnimationFrame = undefined;

var vendors = ['webkit', 'moz'];

vendors.forEach(function (vendor) {
  var raf = window[vendor + 'RequestAnimationFrame'];
  var caf = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
  if (raf) {
    exports.requestAnimationFrame = requestAnimationFrame = raf;
  }

  if (caf) {
    exports.cancelAnimationFrame = cancelAnimationFrame = caf;
  }
});

if (!requestAnimationFrame) {
  (function () {
    var lastTime = 0;
    exports.requestAnimationFrame = requestAnimationFrame = function requestAnimationFrame(callback) {
      var currentTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currentTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currentTime + timeToCall);
      }, timeToCall);
      lastTime = currentTime + timeToCall;
      return id;
    };
  })();
}

if (!cancelAnimationFrame) {
  exports.cancelAnimationFrame = cancelAnimationFrame = function cancelAnimationFrame(id) {
    return clearTimeout(id);
  };
}

exports.requestAnimationFrame = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;