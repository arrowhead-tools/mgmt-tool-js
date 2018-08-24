import networkService from '../services/networkServiceGK'
import { services } from '../utils/utils'

export const RECEIVE_RELAYS = 'RECEIVE_RELAYS'
export const ADD_RELAY = 'ADD_RELAY'
export const DELETE_RELAY = 'DELETE_RELAY'
export const UPDATE_RELAY = 'UPDATE_RELAY'

function receiveRelays(items, page) {
  return {
    type: RECEIVE_RELAYS,
    data: { items, page }
  }
}

function newRelayAdded(items, page) {
  return {
    type: ADD_RELAY,
    data: { items, page }
  }
}

function relayDeleted(items, page) {
  return {
    type: DELETE_RELAY,
    data: { items, page }
  }
}

function relayUpdated(items, page) {
  return {
    type: UPDATE_RELAY,
    data: { items, page }
  }
}

export function getRelays() {
  return (dispatch, getState) => {
    networkService.get('/gatekeeper/mgmt/brokers')
      .then(response => {
        dispatch(receiveRelays(services.digestRelay(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
  
  export function addRelay(newRelay) {
    return (dispatch, getState) => {
      networkService.post('/gatekeeper/mgmt/brokers', newRelay)
      .then(response => {
        dispatch(newRelayAdded())
        window.location.reload()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  export function deleteRelay(name) {
    return (dispatch, getState) => {
      networkService.delete('/gatekeeper/mgmt/brokers/brokername/' + name)
      .then(response => {
        dispatch(relayDeleted())
        window.location.reload()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  export function updateRelay(updatedRelay) {
    return (dispatch, getState) => {
      networkService.put('/gatekeeper/mgmt/brokers', updatedRelay)
      .then(response => {
        dispatch(relayUpdated())
        window.location.reload()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
