export default () =>
  Date.now().toString() +
  Math.random()
    .toString(36)
    .slice(-8);
