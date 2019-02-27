import networkService from '../services/networkServiceAuth'
import { showNotification } from './global'
import { hideModal } from './modal'
import {
  groupAuthDataByConsumer,
  groupAuthDataByProvider,
  groupAuthDataByService
} from '../utils/utils'
import {
  groupInterCloudDataByClouds,
  groupInterCloudDataByServices
} from '../utils/authUtils'

export const RECEIVE_AUTH_DATA = 'RECEIVE_AUTH_DATA'
export const RECEIVE_AUTH_SYSTEMS = 'RECEIVE_AUTH_SYSTEMS'
export const RECEIVE_AUTH_SERVICES = 'RECEIVE_AUTH_SERVICES'
export const RECEIVE_INTERCLOUD_DATA = 'RECEIVE_INTERCLOUD_DATA'
export const RECEIVE_CLOUD_DATA = 'RECEIV_CLOUD_DATA'

function receiveAuthData(consumer, provider, service) {
  return {
    type: RECEIVE_AUTH_DATA,
    consumer,
    provider,
    service
  }
}

function receiveAuthSystems(systems) {
  return {
    type: RECEIVE_AUTH_SYSTEMS,
    systems
  }
}

function receiveAuthServices(services) {
  return {
    type: RECEIVE_AUTH_SERVICES,
    services
  }
}

function receiveInterCloudAuthData(cloud, service) {
  return {
    type: RECEIVE_INTERCLOUD_DATA,
    cloud,
    service
  }
}

function getCloudData(clouds) {
  return {
    type: RECEIVE_CLOUD_DATA,
    clouds
  }
}

export function getIntraCloudAuthData() {
  return (dispatch, getState) => {
    networkService
      .get('/authorization/mgmt/intracloud')
      .then(response => {
        dispatch(
          receiveAuthData(
            groupAuthDataByConsumer(response.data),
            groupAuthDataByProvider(response.data),
            groupAuthDataByService(response.data)
          )
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getInterCloudAuthData() {
  return dispatch => {
    networkService
      .get('/authorization/mgmt/intercloud')
      .then(response => {
        dispatch(
          receiveInterCloudAuthData(
            groupInterCloudDataByClouds(response.data),
            groupInterCloudDataByServices(response.data)
          )
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getAuthSystems() {
  return dispatch => {
    networkService
      .get('/mgmt/systems')
      .then(response => {
        dispatch(receiveAuthSystems(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getAuthServices() {
  return dispatch => {
    networkService
      .get('/mgmt/services')
      .then(response => {
        dispatch(receiveAuthServices(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addAuthData(consumer, providerList, service, interfaces) {
  service.interfaces = interfaces
  const authData = {
    consumer,
    providerList: providerList,
    serviceList: [service]
  }
  return dispatch => {
    networkService
      .post('/authorization/mgmt/intracloud', authData)
      .then(response => {
        console.log(response.data)
        dispatch(getIntraCloudAuthData())
        dispatch(hideModal())
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

export function addInterCloudEntry(interCloudEntry) {
  return dispatch => {
    networkService
      .post('/authorization/mgmt/intercloud', interCloudEntry)
      .then(response => {
        dispatch(getInterCloudAuthData())
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
      })
      .catch(error => {
        console.log(error)
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
      })
  }
}

export function deleteAuthEntry(authEntryId) {
  return dispatch => {
    networkService
      .delete(`/authorization/mgmt/intracloud/${authEntryId}`)
      .then(response => {
        dispatch(getIntraCloudAuthData())
        dispatch(hideModal())
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

export function deleteInterCloudEntry(entryId) {
  return dispatch => {
    networkService
      .delete(`/authorization/mgmt/intercloud/${entryId}`)
      .then(response => {
        dispatch(getInterCloudAuthData())
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

export function getClouds() {
  return dispatch => {
    networkService
      .get('/mgmt/clouds')
      .then(response => {
        dispatch(getCloudData(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
