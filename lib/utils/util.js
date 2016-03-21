"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function valueBetween(_ref) {
  var max = _ref.max;
  var min = _ref.min;
  var value = _ref.value;

  return Math.min(max, Math.max(min, value));
}

exports.valueBetween = valueBetween;