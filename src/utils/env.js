if (!window.$ENV) {
  window.$ENV = {}
}
export default {
  get: (name) => window.$ENV[name],
}
