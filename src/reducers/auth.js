import {
  RECEIVE_AUTH_DATA,
  RECEIVE_AUTH_SERVICES,
  RECEIVE_AUTH_SYSTEMS,
  RECEIVE_INTERCLOUD_DATA,
  RECEIVE_CLOUD_DATA
} from '../actions/auth'

export const initialState = {
  groupByConsumer: [],
  groupByProvider: [],
  groupByService: [],
  authRules: [],
  interCloudCloudData: [],
  interCloudServiceData: [],
  clouds: []
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_AUTH_DATA:
      return {
        ...state,
        authRules: action.authRules,
        groupByConsumer: action.consumer,
        groupByProvider: action.provider,
        groupByService: action.service
      }
    case RECEIVE_INTERCLOUD_DATA:
      return {
        ...state,
        interCloudCloudData: action.cloud,
        interCloudServiceData: action.service
      }
    case RECEIVE_CLOUD_DATA:
      return {
        ...state,
        clouds: action.clouds
      }
    default:
      return state
  }
}
