import { RECEIVE_SERVICES, RECEIVE_SERVICE, RECEIVE_SR_ENTRIES } from '../actions/serviceRegistry'

export const initialState = {
  groupBySystems: [],
  groupByServices: [],
  autoCompleteData: [],
  systemList: [],
  serviceList: [],
  interfaceList: [],
  serviceData: {},
  queryData: {}
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SR_ENTRIES:
      return {
        ...state,
        groupBySystems: action.data.servicesGroupedBySystems,
        groupByServices: action.data.servicesGroupedByServiceDefinitionAndInterface,
        autoCompleteData: action.data.autoCompleteData
      }
    case RECEIVE_SERVICES:
      const servicesObject = {
        ...state,
        groupBySystems: action.groupBySystems,
        groupByServices: action.groupByServices,
        autocompleteData: action.autocompleteData
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
    case RECEIVE_SERVICE:
      const sData = { ...state.serviceData }
      sData[action.serviceId] = action.serviceData
      return {
        ...state,
        serviceData: sData
      }
    default:
      return state
  }
}
