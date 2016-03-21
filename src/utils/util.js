function valueBetween({ max, min, value }) {
  return Math.min(max, Math.max(min, value));
}

export {
  valueBetween,
};
