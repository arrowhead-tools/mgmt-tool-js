import getNetworkService from '../services/getNetworkServiceSR'

export const RECEIVE_SYSTEMS = 'RECEIVE_SYSTEMS'

function receiveSystems(systems) {
  return {
    type: RECEIVE_SYSTEMS,
    systems
  }
}

export function getSystems() {
  return dispatch => {
    getNetworkService.then(ns => ns
      .get('/mgmt/systems')
      .then(response => {
        dispatch(receiveSystems(response.data))
      })
      .catch(error => {
        console.log(error)
      }))
  }
}
