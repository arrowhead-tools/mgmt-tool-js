import factory from './networkServiceFactory'

const instance = factory.createWithBaseURLFromEnv("REACT_APP_ARROWHEAD_ORCH_URL");

export default instance
