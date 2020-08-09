const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const noop = () => {
  // do nothing
};


export {
  extend,
  noop,
};
