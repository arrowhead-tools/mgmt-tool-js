import {
  RECEIVE_AUTH_DATA,
  RECEIVE_AUTH_SERVICES,
  RECEIVE_AUTH_SYSTEMS,
  RECEIVE_INTERCLOUD_DATA
} from '../actions/auth'

export const initialState = {
  groupByConsumer: [],
  groupByProvider: [],
  groupByService: [],
  systems: [],
  services: [],
  interCloudCloudData: [],
  interCloudServiceData: []
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_AUTH_DATA:
      return {
        ...state,
        groupByConsumer: action.consumer,
        groupByProvider: action.provider,
        groupByService: action.service
      }
    case RECEIVE_AUTH_SYSTEMS:
      return {
        ...state,
        systems: action.systems
      }
    case RECEIVE_AUTH_SERVICES:
      return {
        ...state,
        services: action.services
      }
    case RECEIVE_INTERCLOUD_DATA:
      return {
        ...state,
        interCloudCloudData: action.cloud,
        interCloudServiceData: action.service
      }
    default:
      return state
  }
}
