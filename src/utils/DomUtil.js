export function getOffset(el) {
  const rect = el === window ? { top: 0, left: 0 } : el.getBoundingClientRect();
  // 相对于视窗的坐标 + 视窗滚动的距离
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  };
}

export function getStyle(el, prop) {
  return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
}


export function getScrollParent(el) {
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

export function inViewport(el, container = window, customOffset = { top: 0, left: 0 }) {
  const elementOffset = getOffset(el);
  const containerOffset = getOffset(container);
  const width = container === window ? window.innerWidth : container.offsetWidth;
  const height = container === window ? window.innerHeight : container.offsetHeight;
  const xVisible = containerOffset.left + width + customOffset.left > elementOffset.left;
  const yVisible = containerOffset.top + height + customOffset.top > elementOffset.top;
  return xVisible && yVisible;
}

