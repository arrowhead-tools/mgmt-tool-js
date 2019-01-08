import networkService from '../services/networkServiceSR'
import { getAutoCompleteData, groupServicesByServices, groupServicesBySystems } from '../utils/utils'
import { hideModal } from './modal'
import { showNotification } from './global'

export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'

function receiveServices(groupBySystems, groupByServices, autoCompleteData, queryDataObject = {}) {
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

  if (queryDataObject) {
    serviceObject.queryData = queryDataObject
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

export function getFilteredServices(queryData, queryDataObject) {
  return (dispatch, getState) => {
    networkService.put('/serviceregistry/mgmt/query', queryData)
      .then(response => {
        dispatch(receiveServices(groupServicesBySystems({ serviceQueryData: response.data }), groupServicesByServices({ serviceQueryData: response.data }), undefined, queryDataObject))
        dispatch(hideModal())
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

export function addSREntry(
  systemId, systemName, address, port, authenticationInfo,
  serviceDefinition, serviceMetadata = [], interfaces = [], serviceURI,
  udp, endOfValidity, version) {
  const serviceMetadataHelper = {}
  for (const item of serviceMetadata) {
    if (item.name !== '' || item.value !== '') {
      serviceMetadataHelper[item.name] = item.value
    }
  }

  const SREObject = {
    providedService: {
      serviceDefinition,
      interfaces,
      serviceMetadata: serviceMetadataHelper
    },
    provider: {
      systemName,
      address,
      port,
      authenticationInfo
    },
    serviceURI,
    udp,
    endOfValidity,
    version
  }

  if (systemId) {
    SREObject.provider.id = systemId
  }

  return (dispatch, getState) => {
    networkService.post('/serviceregistry/register', SREObject)
      .then(response => {
        dispatch(
          showNotification(
            {
              title: 'Sikeres mentés',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5
            },
            'success'
          )
        )
        dispatch(getServices())
        dispatch(hideModal())
      })
      .catch(error => {
        dispatch(
          showNotification(
            {
              title: 'Sikertelen mentés',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 10
            },
            'error'
          )
        )
        console.log(error)
      })
  }
}
