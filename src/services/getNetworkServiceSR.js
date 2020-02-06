import factory from './networkServiceFactory'

const instance = factory.createWithBaseURLFromEnv("REACT_APP_ARROWHEAD_SR_URL");

export default instance
