import networkService from '../services/networkServiceSR'
import {
  getAutoCompleteData,
  groupServicesByServices,
  groupServicesBySystems
} from '../utils/utils'
import { hideModal } from './modal'
import { showNotification } from './global'

export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'
export const RECEIVE_SERVICE = 'RECEIVE_SERVICE'

function receiveServices(
  groupBySystems,
  groupByServices,
  autoCompleteData,
  queryDataObject = {}
) {
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

function receiveServiceDataById(serviceId, serviceData) {
  return {
    type: RECEIVE_SERVICE,
    serviceId,
    serviceData
  }
}

export function getServices() {
  return (dispatch, getState) => {
    networkService
      .get('/serviceregistry/mgmt/all')
      .then(response => {
        dispatch(
          receiveServices(
            groupServicesBySystems(response.data),
            groupServicesByServices(response.data),
            getAutoCompleteData(response.data)
          )
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getFilteredServices(queryData, queryDataObject) {
  return (dispatch, getState) => {
    networkService
      .put('/serviceregistry/mgmt/query', queryData)
      .then(response => {
        dispatch(
          receiveServices(
            groupServicesBySystems({ serviceQueryData: response.data }),
            groupServicesByServices({ serviceQueryData: response.data }),
            undefined,
            queryDataObject
          )
        )
        dispatch(hideModal())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addService(serviceData) {
  return (dispatch, getState) => {
    networkService
      .post('/mgmt/services', [serviceData])
      .then(response => {
        dispatch(getServices())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addSREntry(entry) {
  return (dispatch, getState) => {
    networkService
      .post('/serviceregistry/register', entry)
      .then(response => {
        dispatch(
          showNotification(
            {
              title: 'Saving was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5
            },
            'success'
          )
        )
        dispatch(getServices())
      })
      .catch(error => {
        dispatch(
          showNotification(
            {
              title: 'Saving was unsuccessful',
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

export function deleteServiceById(serviceId) {
  return (dispatch, getState) => {
    networkService
      .delete(`/serviceregistry/mgmt/${serviceId}`)
      .then(response => {
        dispatch(
          showNotification(
            {
              title: 'Deletion was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5
            },
            'success'
          )
        )
        dispatch(getServices())
      })
      .catch(error => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Deletion was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5
            },
            'error'
          )
        )
      })
  }
}

export function editSREntry(entry) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      networkService
        .put(`/serviceregistry/mgmt/update/${entry.id}`, entry)
        .then(response => {
          dispatch(
            showNotification(
              {
                title: 'Edit was successful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5
              },
              'success'
            )
          )
          dispatch(getServices())
          resolve()
        })
        .catch(error => {
          dispatch(
            showNotification(
              {
                title: 'Edit was unsuccessful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 10
              },
              'error'
            )
          )
          console.log(error)
          reject(error)
        })
    })
  }
}

export function getServiceById(serviceId) {
  return dispatch => {
    networkService
      .get(`/serviceregistry/mgmt/id/${serviceId}`)
      .then(response => {
        dispatch(receiveServiceDataById(serviceId, response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function editService(
  serviceId,
  serviceDefinition,
  interfaces,
  serviceMetadata
) {
  const serviceMetadataHelper = {}
  for (const item of serviceMetadata) {
    if (item.name !== '' || item.value !== '') {
      serviceMetadataHelper[item.name] = item.value
    }
  }
  const serviceData = {
    id: serviceId,
    serviceDefinition,
    interfaces,
    serviceMetadata: serviceMetadataHelper
  }
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      networkService
        .put(`/mgmt/services/${serviceId}`, serviceData)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}

export function editSystem(
  systemId,
  systemName,
  address,
  port,
  authenticationId
) {
  const systemData = {
    id: systemId,
    systemName,
    address,
    port,
    authenticationId
  }
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      networkService
        .put(`/mgmt/systems/${systemId}`, systemData)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}

export function editSREntryCollection(
  systemId,
  systemName,
  address,
  port,
  authenticationInfo,
  serviceDefinition,
  serviceMetadata = [],
  interfaces = [],
  serviceURI,
  udp,
  endOfValidity,
  version,
  providedServiceId,
  serviceId,
  SREntryId
) {
  return (dispatch, getState) => {
    dispatch(
      editSystem(systemId, systemName, address, port, authenticationInfo)
    )
      .then(
        dispatch(
          editService(
            providedServiceId,
            serviceDefinition,
            interfaces,
            serviceMetadata
          )
        )
      )
      .then(
        dispatch(
          editSREntry(
            systemId,
            systemName,
            address,
            port,
            authenticationInfo,
            serviceDefinition,
            serviceMetadata,
            interfaces,
            serviceURI,
            udp,
            endOfValidity,
            version,
            SREntryId
          )
        )
      )
  }
}
