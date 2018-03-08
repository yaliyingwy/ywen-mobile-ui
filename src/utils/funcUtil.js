export function debounce(func, wait = 500, immediate = false) {
  let timeout = null;
  return (args) => {
    const callNow = !timeout && immediate;
    if (callNow) {
      func(args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => { 
      if (!immediate) func(args);
      timeout = null;
    }, wait);
  };
}

export function cssMultiple(css, multipleBy) {
  const number = parseFloat(css);
  const unit = css.replace(number, '');
  return `${number * multipleBy}${unit}`;
}
