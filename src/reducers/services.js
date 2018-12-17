import { RECEIVE_SERVICES } from '../actions/serviceRegistry'

export const initialState = {
  groupBySystems: [],
  groupByServices: [],
  systemList: [],
  serviceList: []
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SERVICES:
      return {
        ...state,
        groupBySystems: action.groupBySystems,
        groupByServices: action.groupByServices,
        systemList: action.systemList,
        serviceList: action.serviceList
      }
    default:
      return state
  }
}
