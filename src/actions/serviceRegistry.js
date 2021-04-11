import networkService from '../services/networkServiceSR'
import { hideModal } from './modal'
import { showNotification } from './global'

export const RECEIVE_SR_ENTRIES_VIEW = 'RECEIVE_SR_ENTRIES_VIEW'
export const RECEIVE_SR_ENTRIES = 'RECEIVE_SR_ENTRIES'
export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'
export const RECEIVE_SERVICE = 'RECEIVE_SERVICE'
export const RECEIVE_SYSTEMS = 'RECEIVE_SYSTEMS'

/*
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
} */

function receiveServiceDataById(serviceId, serviceData) {
  return {
    type: RECEIVE_SERVICE,
    serviceId,
    serviceData,
  }
}

function receiveServices(services) {
  return {
    type: RECEIVE_SERVICES,
    data: services.data,
  }
}

function receiveSystems(systems) {
  return {
    type: RECEIVE_SYSTEMS,
    data: systems.data,
  }
}

function receiveServiceRegistryEntriesView(data) {
  console.log('data', data)
  return {
    type: RECEIVE_SR_ENTRIES_VIEW,
    data,
  }
}

function receiveServiceRegistryEntries(data) {
  return {
    type: RECEIVE_SR_ENTRIES,
    data,
  }
}

export function getSystems(cb) {
  return (dispatch) => {
    networkService
      .get('/serviceregistry/mgmt/systems')
      .then((response) => {
        dispatch(receiveSystems(response.data))
        if (cb) {
          cb()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function createSystem(system, cb, notification = false) {
  return (dispatch) => {
    networkService
      .post('/serviceregistry/mgmt/systems', system)
      .then((response) => {
        console.log(response.data)
        if (notification) {
          dispatch(
            showNotification(
              {
                title: 'Saving was successful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5,
              },
              'success',
            ),
          )
        }
        if (cb) {
          cb()
        }
      })
      .catch((error) => {
        if (notification) {
          dispatch(
            showNotification(
              {
                title: 'Saving was unsuccessful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 10,
              },
              'error',
            ),
          )
        }
        console.log(error)
      })
  }
}

export function getServices(cb) {
  return (dispatch) => {
    networkService
      .get('/serviceregistry/mgmt/services')
      .then((response) => {
        dispatch(receiveServices(response.data))
        if (cb) {
          cb()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function deleteService(serviceId, cb) {
  return (dispatch) => {
    networkService
      .delete(`/serviceregistry/mgmt/services/${serviceId}`)
      .then((response) => {
        console.log(response.data)
        if (cb) {
          cb()
        }
      })
  }
}

export function deleteServiceRegistryEntry(entryId, cb) {
  return (dispatch) => {
    networkService
      .delete(`/serviceregistry/mgmt/${entryId}`)
      .then((response) => {
        console.log(response.data)
        if (cb) {
          cb()
        }
      })
  }
}

export function deleteSystem(systemId, cb) {
  return (dispatch) => {
    networkService
      .delete(`/serviceregistry/mgmt/systems/${systemId}`)
      .then((response) => {
        console.log(response.data)
        if (cb) {
          cb()
        }
      })
  }
}

export function getServiceRegistryEntries(cb) {
  return (dispatch) => {
    networkService
      .get('/serviceregistry/mgmt')
      .then((response) => {
        dispatch(receiveServiceRegistryEntries(response.data))
        if (cb) {
          cb()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function getServiceRegistryEntriesView() {
  return (dispatch) => {
    networkService
      .get('/serviceregistry/mgmt/grouped')
      .then((response) => {
        dispatch(receiveServiceRegistryEntriesView(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function getFilteredServices(queryData, queryDataObject) {
  return (dispatch, getState) => {
    networkService
      .put('/serviceregistry/mgmt/query', queryData)
      .then((response) => {
        dispatch()
        /*
          receiveServices(
            groupServicesBySystems({ serviceQueryData: response.data }),
            groupServicesByServices({ serviceQueryData: response.data }),
            undefined,
            queryDataObject
          )
             */
        dispatch(hideModal())
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function addService(serviceDefinition) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    networkService
      .post('/mgmt/services', serviceDefinition)
      .then((response) => {
        // dispatch(getServiceRegistryEntriesView()) // is this necessary?
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export function addSREntry(entry, cb) {
  return (dispatch, getState) => {
    networkService
      .post('/serviceregistry/mgmt', entry)
      .then((response) => {
        dispatch(
          showNotification(
            {
              title: 'Saving was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'success',
          ),
        )
        dispatch(getServiceRegistryEntriesView())
        if (cb) {
          cb()
        }
      })
      .catch((error) => {
        dispatch(
          showNotification(
            {
              title: 'Saving was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 10,
            },
            'error',
          ),
        )
        console.log(error)
      })
  }
}

export function deleteServiceById(serviceId) {
  return (dispatch, getState) => {
    networkService
      .delete(`/serviceregistry/mgmt/${serviceId}`)
      .then((response) => {
        dispatch(
          showNotification(
            {
              title: 'Deletion was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'success',
          ),
        )
        dispatch(getServiceRegistryEntriesView())
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Deletion was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'error',
          ),
        )
      })
  }
}

export function editSREntry(entry) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    networkService
      .put(`/serviceregistry/mgmt/${entry.id}`, entry)
      .then((response) => {
        dispatch(
          showNotification(
            {
              title: 'Edit was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'success',
          ),
        )
        dispatch(getServiceRegistryEntriesView())
        resolve()
      })
      .catch((error) => {
        dispatch(
          showNotification(
            {
              title: 'Edit was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 10,
            },
            'error',
          ),
        )
        console.log(error)
        reject(error)
      })
  })
}

export function getServiceById(serviceId) {
  return (dispatch) => {
    networkService
      .get(`/serviceregistry/mgmt/id/${serviceId}`)
      .then((response) => {
        dispatch(receiveServiceDataById(serviceId, response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function editService(serviceId, serviceDefinition) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    networkService
      .put(`/mgmt/services/${serviceId}`, { serviceDefinition })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export function editSystem(
  systemId,
  systemName,
  address,
  port,
  authenticationInfo,
) {
  const systemData = {
    systemName,
    address,
    port,
    authenticationInfo,
  }
  return (dispatch, getState) => new Promise((resolve, reject) => {
    networkService
      .put(`/mgmt/systems/${systemId}`, systemData)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

// TODO is this needed?
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
  SREntryId,
) {
  return (dispatch, getState) => {
    dispatch(
      editSystem(systemId, systemName, address, port, authenticationInfo),
    )
      .then(
        dispatch(
          editService(
            providedServiceId,
            serviceDefinition,
            interfaces,
            serviceMetadata,
          ),
        ),
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
            SREntryId,
          ),
        ),
      )
  }
}
