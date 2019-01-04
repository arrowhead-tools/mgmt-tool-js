import { RECEIVE_SERVICES } from '../actions/serviceRegistry'

export const initialState = {
  groupBySystems: [],
  groupByServices: [],
  systemList: [],
  serviceList: [],
  interfaceList: [],
  queryData: {}
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SERVICES:
      const servicesObject = {
        ...state,
        groupBySystems: action.groupBySystems,
        groupByServices: action.groupByServices
      }
      if (action.systemList) {
        servicesObject.systemList = action.systemList
      }
      if (action.serviceList) {
        servicesObject.serviceList = action.serviceList
      }
      if (action.interfaceList) {
        servicesObject.interfaceList = action.interfaceList
      }
      if (action.queryData) {
        servicesObject.queryData = action.queryData
      }
      return servicesObject
    default:
      return state
  }
}
