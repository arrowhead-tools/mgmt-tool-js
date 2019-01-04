import networkService from '../services/networkServiceSR'
import { getAutoCompleteData, groupServicesByServices, groupServicesBySystems } from '../utils/utils'

export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'

function receiveServices(groupBySystems, groupByServices, autoCompleteData) {
  const serviceObject = {
    type: RECEIVE_SERVICES,
    groupByServices,
    groupBySystems
  }

  if (autoCompleteData) {
    serviceObject.systemList = autoCompleteData.systemList
    serviceObject.serviceList = autoCompleteData.serviceList
    serviceObject.interfaceList = autoCompleteData.interfaceList
  }

  return serviceObject
}

export function getServices() {
  return (dispatch, getState) => {
    networkService.get('/serviceregistry/mgmt/all')
      .then(response => {
        dispatch(receiveServices(groupServicesBySystems(response.data), groupServicesByServices(response.data), getAutoCompleteData(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getFilteredServices(queryData) {
  return (dispatch, getState) => {
    networkService.put('/serviceregistry/mgmt/query', queryData)
      .then(response => {
        dispatch(receiveServices(groupServicesBySystems({ serviceQueryData: response.data }), groupServicesByServices({ serviceQueryData: response.data })))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addService(serviceData) {
  return (dispatch, getState) => {
    networkService.post('/mgmt/services', [serviceData])
      .then(response => {
        console.log(response)
        dispatch(getServices())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addSystem(systemName, address, port, authenticationInfo) {
  if (!systemName || !address || !port) {
    return
  }

  const systemData = {
    systemName, address, port, authenticationInfo
  }

  return (dispatch, getState) => {
    networkService.post('/mgmt/systems', [systemData])
      .then(response => {
        console.log(response)
        dispatch(getServices())
      })
      .catch(error => {
        console.log(error)
      })
  }

}