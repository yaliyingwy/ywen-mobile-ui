function isHidden(el) {
  return el.offsetParent === null;
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  };
}

function getStyle(el, prop) {
  return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
}


function getScrollParent(el) {
  if (!(el instanceof HTMLElement)) {
    return window;
  }

  let parent = el;
  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }

    if (!parent.parentNode) {
      break;
    }

    const overflow = getStyle(parent, 'overflow') + getStyle(parent, 'overflow-y') + getStyle(parent, 'overflow-x');

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

  let top;
  let left;
  let bottom;
  let right;
  if (typeof container === 'undefined' || container === window) {
    top = window.pageYOffset;
    left = window.pageXOffset;
    bottom = top + window.innerHeight;
    right = left + window.innerWidth;
  } else {
    const containerOffset = getOffset(container);
    top = containerOffset.top;
    left = containerOffset.left;
    bottom = top + container.offsetHeight;
    right = left + container.offsetWidth;
  }

  const elementOffset = getOffset(el);

  return (
    top < elementOffset.top + customOffset.bottom + el.offsetHeight &&
    bottom > elementOffset.top - customOffset.top &&
    left < elementOffset.left + customOffset.right + el.offsetWidth &&
    right > elementOffset.left - customOffset.left
  );
}

export {
  isHidden,
  getOffset,
  getScrollParent,
  getStyle,
  inViewport,
};
