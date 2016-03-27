'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isHidden(el) {
  return el.offsetParent === null;
}

function getOffset(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

function getStyle(el, prop) {
  return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
}

function getScrollParent(el) {
  if (!(el instanceof HTMLElement)) {
    return window;
  }

  var parent = el;
  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }

    if (!parent.parentNode) {
      break;
    }

    var overflow = getStyle(parent, 'overflow') + getStyle(parent, 'overflow-y') + getStyle(parent, 'overflow-x');

    if (/(scroll|auto)/.test(overflow)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return window;
}

function inViewport(el, container, customOffset) {
  if (isHidden(el)) {
    return false;
  }

  var top = undefined;
  var left = undefined;
  var bottom = undefined;
  var right = undefined;
  if (typeof container === 'undefined' || container === window) {
    top = window.pageYOffset;
    left = window.pageXOffset;
    bottom = top + window.innerHeight;
    right = left + window.innerWidth;
  } else {
    var containerOffset = getOffset(container);
    top = containerOffset.top;
    left = containerOffset.left;
    bottom = top + container.offsetHeight;
    right = left + container.offsetWidth;
  }

  var elementOffset = getOffset(el);

  return top < elementOffset.top + customOffset.bottom + el.offsetHeight && bottom > elementOffset.top - customOffset.top && left < elementOffset.left + customOffset.right + el.offsetWidth && right > elementOffset.left - customOffset.left;
}

exports.isHidden = isHidden;
exports.getOffset = getOffset;
exports.getScrollParent = getScrollParent;
exports.getStyle = getStyle;
exports.inViewport = inViewport;