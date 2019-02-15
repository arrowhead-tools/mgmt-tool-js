import networkService from '../services/networkServiceEH'
import { showNotification } from './global'
import { groupEventHandlersByEventType } from '../utils/eventHandlerUtils'

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const RECEIVE_EH_SYSTEMS = 'RECEIVE_EH_SYSTEMS'

function receiveEventHandlerData(data) {
  return {
    type: RECEIVE_EVENTS,
    payload: data
  }
}

function receiveEventHandlerSystems(data) {
  return {
    type: RECEIVE_EH_SYSTEMS,
    payload: data
  }
}

export function getEventHandlerData() {
  return (dispatch, getState) => {
    networkService
      .get('/eventhandler/mgmt/subscriptions')
      .then(response => {
        dispatch(
          receiveEventHandlerData(groupEventHandlersByEventType(response.data))
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function createSubscription(subscriptionData) {
  return (dispatch, getState) => {
    networkService
      .post('/eventhandler/subscription', subscriptionData)
      .then(response => {
        dispatch(getEventHandlerData())
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

export function modifySubscription(subscriptionData, subscriptionId) {
  return (dispatch, getState) => {
    networkService
      .put(`/eventhandler/mgmt/subscriptions/${subscriptionId}`, subscriptionData)
      .then(response => {
        dispatch(getEventHandlerData())
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

export function deleteSubscription(eventHandlerId) {
  return dispatch => {
    networkService
      .delete(`/eventhandler/mgmt/subscriptions/${eventHandlerId}`)
      .then(response => {
        dispatch(getEventHandlerData())
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

export function getEventHandlerSystems() {
  return dispatch => {
    networkService
      .get('/mgmt/systems')
      .then(response => {
        dispatch(receiveEventHandlerSystems(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
