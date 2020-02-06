import factory from './networkServiceFactory'

const instance = factory.createWithBaseURLFromEnv("REACT_APP_ARROWHEAD_GK_URL");

export default instance
