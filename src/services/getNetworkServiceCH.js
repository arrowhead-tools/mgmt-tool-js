import factory from './networkServiceFactory'

const instance = factory.createWithBaseURLFromEnv("REACT_APP_ARROWHEAD_CHOREOGRAPHER_URL");

export default instance
