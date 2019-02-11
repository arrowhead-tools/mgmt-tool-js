import networkService from '../services/networkServiceEH'
import { showNotification } from './global'
import { groupEventHandlersByEventType } from '../utils/eventHandlerUtils'

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'

function receiveEventHandlerData(data) {
  return {
    type: RECEIVE_EVENTS,
    data
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

export function deleteSubscription(eventHandlerId) {
  return dispatch => {
    networkService
      .delete(`/eventhandler/subscription/${eventHandlerId}`)
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
