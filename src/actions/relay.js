import getNetworkService from '../services/getNetworkServiceGK'
import { showNotification } from './global'

export const RECEIVE_RELAYS = 'RECEIVE_RELAYS'

function receiveRelays(data) {
  return {
    type: RECEIVE_RELAYS,
    data
  }
}

export function getRelays() {
  return (dispatch, getState) => {
    getNetworkService.then(ns => ns
      .get('/gatekeeper/mgmt/relays')
      .then(response => {
        dispatch(receiveRelays(response.data.data))
      })
      .catch(error => {
        console.log(error)
      }))
  }
}

export function addRelay(relayData) {
  const newRelay = [relayData]
  return (dispatch, getState) => {
    getNetworkService.then(ns => ns
      .post('/gatekeeper/mgmt/relays', newRelay)
      .then(response => {
        dispatch(getRelays())
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
      }))
  }
}

export function deleteRelay(id) {
  return (dispatch, getState) => {
    getNetworkService.then(ns => ns
      .delete(`/gatekeeper/mgmt/relays/${id}`)
      .then(response => {
        dispatch(getRelays())
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
      }))
  }
}

export function updateRelay(updatedRelay) {
  return (dispatch, getState) => {
    getNetworkService.then(ns => ns
      .put(`/gatekeeper/mgmt/relays/${updatedRelay.id}`, updatedRelay)
      .then(response => {
        dispatch(getRelays())
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
      }))
  }
}
