import networkService from '../services/networkServiceGK'
import { digestRelays } from '../utils/utils'

export const RECEIVE_RELAYS = 'RECEIVE_RELAYS'
export const ADD_RELAY = 'ADD_RELAY'
export const DELETE_RELAY = 'DELETE_RELAY'
export const UPDATE_RELAY = 'UPDATE_RELAY'

function receiveRelays(data) {
  return {
    type: RECEIVE_RELAYS,
    data
  }
}

function newRelayAdded(data) {
  return {
    type: ADD_RELAY,
    data
  }
}

function relayDeleted(data) {
  return {
    type: DELETE_RELAY,
    data
  }
}

function relayUpdated(data) {
  return {
    type: UPDATE_RELAY,
    data
  }
}

export function getRelays() {
  return (dispatch, getState) => {
    networkService.get('/gatekeeper/mgmt/brokers')
      .then(response => {
        dispatch(receiveRelays(response.data))
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
        console.log('relay add', response.data)
        dispatch(newRelayAdded())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function deleteRelay(id) {
  return (dispatch, getState) => {
    networkService.delete(`/gatekeeper/mgmt/brokers/${id}`)
      .then(response => {
        console.log('relay delete', response.data)
        dispatch(relayDeleted())
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
        console.log('relay update', response.data)
        dispatch(relayUpdated())
      })
      .catch(error => {
        console.log(error)
      })
  }
}
