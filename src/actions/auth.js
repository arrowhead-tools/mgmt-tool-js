import networkService from '../services/networkServiceAuth'
import { showNotification } from './global'
import { hideModal } from './modal'

export const RECEIVE_AUTH_DATA = 'RECEIVE_AUTH_DATA'
export const RECEIVE_AUTH_SYSTEMS = 'RECEIVE_AUTH_SYSTEMS'
export const RECEIVE_AUTH_SERVICES = 'RECEIVE_AUTH_SERVICES'

function receiveAuthData(authData) {
  return {
    type: RECEIVE_AUTH_DATA,
    data: authData
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

export function getAuthData() {
  return (dispatch, getState) => {
    networkService.get('/authorization/mgmt/intracloud')
      .then(response => {
        dispatch(receiveAuthData(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getAuthSystems() {
  return dispatch => {
    networkService.get('/mgmt/systems')
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
    networkService.get('/mgmt/services')
      .then(response => {
        dispatch(receiveAuthServices(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addAuthData(consumer, providerList, service) {
  const authData = {
    consumer,
    providerList: [providerList],
    serviceList: [service]
  }
  return dispatch => {
    networkService.post('/authorization/mgmt/intracloud', authData)
      .then(response => {
        console.log(response.data)
        dispatch(getAuthData())
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