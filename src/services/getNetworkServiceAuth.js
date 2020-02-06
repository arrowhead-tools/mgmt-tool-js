import factory from './networkServiceFactory'

const instance = factory.createWithBaseURLFromEnv("REACT_APP_ARROWHEAD_AUTH_URL");

export default instance
