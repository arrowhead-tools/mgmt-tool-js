if (!window.$ENV) {
  window.$ENV = {};
}
export default {
  get: (name) => {
    return window.$ENV[name];
  }
};
