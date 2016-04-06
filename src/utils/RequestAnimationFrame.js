let requestAnimationFrame;
let cancelAnimationFrame;

const vendors = ['webkit', 'moz'];

vendors.forEach((vendor) => {
  const raf = window[`${vendor}RequestAnimationFrame`];
  const caf = window[`${vendor}CancelAnimationFrame`] || window[`${vendor}CancelRequestAnimationFrame`];
  if (raf) {
    requestAnimationFrame = raf;
  }

  if (caf) {
    cancelAnimationFrame = caf;
  }
});

if (!requestAnimationFrame) {
  let lastTime = 0;
  requestAnimationFrame = (callback) => {
    const currentTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currentTime + timeToCall);
    }, timeToCall);
    lastTime = currentTime + timeToCall;
    return id;
  };
}

if (!cancelAnimationFrame) {
  cancelAnimationFrame = (id) => clearTimeout(id);
}

export { requestAnimationFrame, cancelAnimationFrame };
